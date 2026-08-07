import { useEffect, useState } from "react";
import axios from "axios";
import { api } from "../config/api";
import "../styles/Home.css";

const Home = () => {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get(api.home, {
          withCredentials: true,
        });
        setUserInfo(response.data);
      } catch (error) {
        console.error("Error fetching user info:", error.message);
      }
    };

    fetchUserInfo();
  }, []);

  if (!userInfo) return <p className="home-loading-text">Loading...</p>;

  const { userName, userEmail, userCFInfo } = userInfo;
  const {
    codeForcesHandle,
    currentRating,
    maxRating,
    currentRank,
    maxRank,
    titlePhoto,
    lastSyncedAt,
    problemSolved,
  } = userCFInfo;

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
  };

  return (
    <div className="home-container">
      <div className="home-profile-header">
        <img src={titlePhoto} alt="User" className="home-profile-photo" />
        <div className="home-profile-info">
          <h2 className="home-user-name">{userName}</h2>
          <p className="home-user-email">{userEmail}</p>
          <p><strong>Handle:</strong> {codeForcesHandle}</p>
          <p className="home-last-synced"><strong>Last Synced:</strong> {formatDate(lastSyncedAt)}</p>
        </div>
      </div>

      <div className="home-stats-grid">
        <div className="home-stat-card"><p className="home-label">Current Rating</p><p className="home-value">{currentRating}</p></div>
        <div className="home-stat-card"><p className="home-label">Max Rating</p><p className="home-value">{maxRating}</p></div>
        <div className="home-stat-card"><p className="home-label">Current Rank</p><p className="home-value">{currentRank}</p></div>
        <div className="home-stat-card"><p className="home-label">Max Rank</p><p className="home-value">{maxRank}</p></div>
        <div className="home-stat-card"><p className="home-label">Total Solved</p><p className="home-value">{problemSolved.totalSolved}</p></div>
        <div className="home-stat-card"><p className="home-label">Avg Rating Solved</p><p className="home-value">{problemSolved.averageRating}</p></div>
        <div className="home-stat-card"><p className="home-label">Highest Rating Solved</p><p className="home-value">{problemSolved.highestRatingSolved}</p></div>
      </div>
    </div>
  );
};

export default Home;
