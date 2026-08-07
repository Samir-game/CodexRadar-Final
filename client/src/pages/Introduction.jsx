import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Introduction.css';

const Introduction = () => {
  return (
    <div className="intro-container">
      <h1 className="intro-title">Welcome to CodexRadar 🚀</h1>
      <p className="intro-description">
        <strong>CodexRadar</strong> is a full-stack competitive programming performance tracking platform. Designed for
        <strong>Codeforces users </strong>, it automates data sync, visualizes performance,
        and sends helpful reminders to keep your competitive edge sharp.
      </p>

      <div className="intro-section">
        <h2 className="intro-subtitle">👨‍💻 For Coders</h2>
        <ul className="intro-list">
          <li>🔍 Track your <strong>Codeforces contests and problem-solving</strong> performance</li>
          <li>📈 View rating changes and submission stats in dynamic <strong>charts & graphs</strong></li>
          <li>📅 Never miss a contest with <strong>email alerts</strong> before every rated contest</li>
          <li>💡 Spot your weak areas and stay consistent with activity tracking</li>
        </ul>
      </div>

      <div className="intro-section">
        <h2 className="intro-subtitle">🔗 Real-Time Codeforces Integration</h2>
        <p className="intro-highlight">
          CodexRadar uses the official <strong>Codeforces API</strong> and <strong>Node Cron</strong> jobs to fetch real-time user data.
          It syncs every night and before every contest, keeping your dashboard always up-to-date.
        </p>
      </div>

      <div className="intro-cta">
        <p>Ready to get started?</p>
        <Link to="/signup" className="intro-button">Create an Account</Link>
        <span className="intro-or-text">or</span>
        <Link to="/login" className="intro-link">Log In</Link>
      </div>
    </div>
  );
};

export default Introduction;
