import React, { useEffect, useState } from "react";
import axios from "axios";
import { api } from "../config/api";
import ContestTable from "../components/ContestTable";
import RatingGraph from "../components/RatingGraph";
import "../styles/ContestHistory.css";

const ContestHistory = () => {
  const [contestData, setContestData] = useState(null);

  useEffect(() => {
    const fetchContestData = async () => {
      try {
        const response = await axios.get(api.home, {
          withCredentials: true,
        });
        setContestData(response.data.userCFInfo.contestHistory);
      } catch (error) {
        console.error("Error fetching contest data:", error.message);
      }
    };

    fetchContestData();
  }, []);

  if (!contestData) return <p className="contest-loading-text">Loading...</p>;

  return (
    <div className="contesthistory-container">
      <h2 className="contesthistory-title">Contest History</h2>
      <div className="contest-history-content">
        <div className="table-wrapper">
          <ContestTable data={contestData.contestData} />
        </div>
        <div className="graph-wrapper">
          <RatingGraph data={contestData.ratingGraph} />
        </div>
      </div>
    </div>
  );
};

export default ContestHistory;

