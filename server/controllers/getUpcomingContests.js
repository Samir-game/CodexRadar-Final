const axios = require("axios");

const getUpcomingContests=async()=>{
  try {
    const response=await axios.get(process.env.CODEFORCES_CONTEST_LIST);
    const contests=response?.data?.result;

    const now=Date.now();
    const threeDaysFromNow=now + 3*24*60*60*1000;

    return contests.filter(c =>
      c.phase === "BEFORE" &&
      c.startTimeSeconds*1000 > now &&
      c.startTimeSeconds*1000 <= threeDaysFromNow
    );
  } catch (error) {
    console.error("Error fetching contests:", error.message);
    return [];
  }
};

module.exports = {
  getUpcomingContests,
};
