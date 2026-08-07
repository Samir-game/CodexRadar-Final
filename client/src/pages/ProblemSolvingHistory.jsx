import React, { useEffect, useState } from "react";
import axios from "axios";
import { api } from "../config/api";
import SolvedPerDayChart from "../components/SolvedPerDayChart";
import RatingBucketChart from "../components/RatingBucketChart";
import "../styles/ProblemSolvingHistory.css";

const ProblemSolvingHistory = () => {
  const [problemData, setProblemData] = useState(null);

  useEffect(() => {
    const fetchProblemData = async () => {
      try {
        const response = await axios.get(api.home, {
          withCredentials: true,
        });

        setProblemData(response.data.userCFInfo.problemSolved);
      } catch (error) {
        console.error("Error fetching problem-solving data:", error.message);
      }
    };

    fetchProblemData();
  }, []);

  if (!problemData) {
    return <p className="psh-loading-text">Loading...</p>;
  }

  return (
    <div className="psh-container">
      <h2 className="psh-title">Problem Solving History</h2>
      <div className="psh-charts">
        <SolvedPerDayChart data={problemData.solvedPerday} />
        <RatingBucketChart data={problemData.ratingBucket} />
      </div>
    </div>
  );
};

export default ProblemSolvingHistory;

