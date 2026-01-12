import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const username = localStorage.getItem("username");

  const handleLogout = () => {
    localStorage.removeItem("username");
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="nav-left">
        <span className="logo">SecureNotes</span>
      </div>

      <div className="nav-right">
        {!username && location.pathname !== "/" && (
          <Link to="/">Login</Link>
        )}

        {!username && location.pathname !== "/register" && (
          <Link to="/register">Register</Link>
        )}

        {username && (
          <>
            <Link to="/notes">Notes</Link>
            <button onClick={handleLogout}>Logout</button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
