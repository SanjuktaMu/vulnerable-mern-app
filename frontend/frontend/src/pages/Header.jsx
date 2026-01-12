import React from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem("username") || "Admin";

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const toggleDarkMode = () => {
    document.body.classList.toggle("dark");
  };

  return (
    <div className="header-container">
      {/* Left */}
      <div className="header-left">
        <input
          type="text"
          placeholder="Search notes..."
          className="search-input"
        />
      </div>

      {/* Right */}
      <div className="header-right">
        <button className="icon-btn" onClick={toggleDarkMode}>🌙</button>

        <div className="user-info">
          <span className="username">{username}</span>
          <div className="avatar">{username.charAt(0).toUpperCase()}</div>
        </div>

        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Header;
