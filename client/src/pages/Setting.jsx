import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { api } from "../config/api";
import '../styles/Setting.css';

const Setting = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(api.logout, {}, { withCredentials: true });
      alert("You've been logged out.");
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
      alert("Logout failed. Please try again.");
    }
  };

  const handleDelete = async () => {
    const confirmed = window.confirm("Are you sure you want to permanently delete your account? This action cannot be undone.");
    if (!confirmed) return;

    try {
      await axios.delete(api.deleteAccount, { withCredentials: true });
      alert("Your account has been permanently deleted.");
      navigate("/signup");
    } catch (error) {
      console.error("Account deletion failed:", error);
      alert("Failed to delete your account. Please try again.");
    }
  };

  return (
    <div className="setting-container">
      <h2 className="setting-title">Account Settings</h2>

      <div className="setting-section">
        <h3 className="setting-subheading">🔒 Log Out</h3>
        <p className="setting-description">End your current session and return to the login page.</p>
        <button className="setting-logout-btn" onClick={handleLogout}>Log Out</button>
      </div>

      <hr className="setting-divider" />

      <div className="setting-section">
        <h3 className="setting-subheading">⚠️ Delete Account</h3>
        <p className="setting-description">
          This will <strong>permanently delete</strong> your CodexRadar account, including your Codeforces tracking data. This action cannot be undone.
        </p>
        <button className="setting-delete-btn" onClick={handleDelete}>Delete My Account</button>
      </div>
    </div>
  );
};

export default Setting;
