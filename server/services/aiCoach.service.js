const axios = require("axios");

const sumValues = (values) => Object.values(values || {}).reduce((total, value) => total + (Number(value) || 0), 0);

const buildSnapshot = (profile) => {
  const problems = profile.problemSolved || {};
  const contests = profile.contestHistory?.contestData || [];
  const recentContests = contests.slice(-5);
  const activity = Object.entries(problems.solvedPerday || {}).sort(([a], [b]) => new Date(b) - new Date(a)).slice(0, 14);
  return {
    handle: profile.codeForcesHandle, currentRating: profile.currentRating || 0, maxRating: profile.maxRating || 0,
    totalSolved: problems.totalSolved || 0, averageSolvedRating: problems.averageRating || 0,
    highestSolvedRating: problems.highestRatingSolved || 0, solvedInLast14RecordedDays: sumValues(Object.fromEntries(activity)),
    ratingBuckets: problems.ratingBucket || {},
    recentContests: recentContests.map(({ contestName, newRating, ratingChange, rank, unsolved }) => ({ contestName, newRating, ratingChange, rank, unsolved })),
  };
};

const buildLocalCoach = (snapshot) => {
  const changes = snapshot.recentContests.map((contest) => Number(contest.ratingChange) || 0);
  const averageChange = changes.length ? Math.round(changes.reduce((total, change) => total + change, 0) / changes.length) : 0;
  const targetLow = Math.max(800, Math.round((snapshot.currentRating || snapshot.averageSolvedRating || 1000) / 100) * 100 - 100);
  const targetHigh = targetLow + 300;
  return {
    headline: averageChange >= 0 ? "Build consistency, then stretch your rating range." : "Stabilize contest performance with focused practice.",
    summary: `${snapshot.solvedInLast14RecordedDays || "No"} problems appear in your latest recorded activity. Your recent contest rating trend is ${averageChange >= 0 ? "positive or stable" : "downward"} (${averageChange >= 0 ? "+" : ""}${averageChange} average change).`,
    strengths: [snapshot.totalSolved ? `${snapshot.totalSolved} total solved problems provide a strong practice base.` : "Start building a reliable solved-problem base.", snapshot.maxRating > snapshot.currentRating ? `You have already reached ${snapshot.maxRating}, so reclaiming that level is realistic.` : "Your current and peak rating are aligned."],
    focusAreas: [`Practice 4–6 problems in the ${targetLow}–${targetHigh} range before your next contest.`, averageChange < 0 ? "After each contest, upsolve one missed problem before starting new practice." : "Add one slightly harder problem after each comfortable solve."],
    sevenDayPlan: ["Days 1–2: solve two timed problems each day and write a one-line post-solve note.", "Days 3–4: review weak topics from unsolved contest problems and upsolve one problem.", "Day 5: run a 90-minute virtual contest.", "Day 6: upsolve the virtual-contest misses.", "Day 7: review mistakes and choose next week's rating range."],
    nextStep: `Open a ${targetLow}–${targetHigh} rated problem now and give yourself 35 minutes before reading hints.`,
  };
};

const sanitizeCoach = (coach, fallback) => ({
  headline: typeof coach?.headline === "string" ? coach.headline : fallback.headline,
  summary: typeof coach?.summary === "string" ? coach.summary : fallback.summary,
  strengths: Array.isArray(coach?.strengths) ? coach.strengths.slice(0, 3) : fallback.strengths,
  focusAreas: Array.isArray(coach?.focusAreas) ? coach.focusAreas.slice(0, 3) : fallback.focusAreas,
  sevenDayPlan: Array.isArray(coach?.sevenDayPlan) ? coach.sevenDayPlan.slice(0, 7) : fallback.sevenDayPlan,
  nextStep: typeof coach?.nextStep === "string" ? coach.nextStep : fallback.nextStep,
});

const getAICoach = async (profile) => {
  const snapshot = buildSnapshot(profile);
  const fallback = buildLocalCoach(snapshot);
  if (!process.env.GEMINI_API_KEY) return { coach: fallback, source: "local", generatedAt: new Date() };
  try {
    const model = process.env.GEMINI_MODEL || "gemini-2.5-pro";
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,
      {
        contents: [{ parts: [{ text: `You are a concise, encouraging competitive-programming coach. Use only this Codeforces data. Return JSON only with headline, summary, strengths (array), focusAreas (array), sevenDayPlan (array), and nextStep. Do not mention that you are an AI or invent statistics.\n\n${JSON.stringify(snapshot)}` }] }],
        generationConfig: {
          response_mime_type: "application/json",
          response_schema: {
            type: "OBJECT",
            properties: {
              headline: { type: "STRING" }, summary: { type: "STRING" },
              strengths: { type: "ARRAY", items: { type: "STRING" } },
              focusAreas: { type: "ARRAY", items: { type: "STRING" } },
              sevenDayPlan: { type: "ARRAY", items: { type: "STRING" } },
              nextStep: { type: "STRING" },
            },
            required: ["headline", "summary", "strengths", "focusAreas", "sevenDayPlan", "nextStep"],
          },
        },
      },
      { headers: { "x-goog-api-key": process.env.GEMINI_API_KEY, "Content-Type": "application/json" }, timeout: 15000 }
    );
    const candidate = response.data?.candidates?.[0];
    const content = candidate?.content;
    const output = (() => {
      if (!content) return "";
      if (typeof content === "string") return content;
      if (Array.isArray(content)) return content.map((item) => item.text || "").join("");
      if (Array.isArray(content.parts)) return content.parts.map((part) => part.text || "").join("");
      return JSON.stringify(content);
    })();

    let parsed;
    try {
      parsed = typeof output === "string" ? JSON.parse(output) : output;
    } catch (parseError) {
      console.error("Gemini coach parse failed:", parseError.message, "output:", output);
      parsed = null;
    }

    return { coach: sanitizeCoach(parsed, fallback), source: "gemini", generatedAt: new Date() };
  } catch (error) {
    console.error(
      "Gemini coach unavailable:",
      error.response?.status,
      error.response?.data ? JSON.stringify(error.response.data) : error.message
    );
    return { coach: fallback, source: "local", generatedAt: new Date() };
  }
};

module.exports = { getAICoach };
