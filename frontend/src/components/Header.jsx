import React from "react";
import "../styles.css" // Import the CSS file

const Header = ({ user, onLogout }) => (
  <header className="app-header">
    <h1 className="logo">PastPeek</h1>
    <div className="user-section">
      <span className="username">{user.name}</span>
      <img src="user?.picture" alt="L" className="avatar" />
      <button className="logout-btn" onClick={onLogout}>
        Logout
      </button>
    </div>
  </header>
);

export default Header;
