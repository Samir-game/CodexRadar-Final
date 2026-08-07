import { useEffect, useState } from "react";
import axios from "axios";
import { api } from "../config/api";
import "../styles/AICoach.css";

const AICoach = () => {
  const [insights, setInsights] = useState(null);
  const [error, setError] = useState("");
  useEffect(() => {
    const loadInsights = async () => {
      try {
        const response = await axios.get(api.aiCoach, { withCredentials: true });
        setInsights(response.data);
      } catch (requestError) { setError(requestError.response?.data?.message || "Unable to load your coaching plan."); }
    };
    loadInsights();
  }, []);
  if (error) return <p className="coach-message">{error}</p>;
  if (!insights) return <p className="coach-message">Creating your personalized practice plan...</p>;
  const { coach, source } = insights;
  return <main className="coach-container"><div className="coach-hero"><p className="coach-eyebrow">{source === "gemini" ? "AI-POWERED" : "DATA-POWERED"} PRACTICE GUIDE</p><h1>{coach.headline}</h1><p>{coach.summary}</p></div><section className="coach-grid"><CoachCard title="Your strengths" items={coach.strengths} /><CoachCard title="Focus next" items={coach.focusAreas} /></section><section className="coach-plan"><h2>7-day plan</h2><ol>{coach.sevenDayPlan.map((item, index) => <li key={index}>{item}</li>)}</ol></section><aside className="coach-next"><strong>Do this next:</strong> {coach.nextStep}</aside>{source === "local" && <p className="coach-note">Add <code>GEMINI_API_KEY</code> on the server for generative coaching. Until then, this plan is calculated directly from your Codeforces history.</p>}</main>;
};

const CoachCard = ({ title, items }) => <section className="coach-card"><h2>{title}</h2><ul>{items.map((item, index) => <li key={index}>{item}</li>)}</ul></section>;
export default AICoach;
