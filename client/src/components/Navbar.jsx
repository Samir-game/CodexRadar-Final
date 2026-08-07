import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="nav-container">
      <div className="nav-logo">CodexRadar</div>

      <div
        className={`nav-hamburger ${isOpen ? 'nav-hamburger-open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      <ul className={`nav-links ${isOpen ? 'nav-links-active' : ''}`}>
        <li><Link to="/home">Home</Link></li>
        <li><Link to="/contest-history">Contest History</Link></li>
        <li><Link to="/problem-history">Problem History</Link></li>
        <li><Link to="/ai-coach">AI Coach</Link></li>
        <li><Link to="/aboutus">About</Link></li>
        <li><Link to="/contact-us">Contact Us</Link></li>
        <li><Link to="/settings">Settings</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;

