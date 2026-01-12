import "./Sidebar.css";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Sidebar = ({ noteCount = 0 }) => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  const navClass = ({ isActive }) =>
    `nav-item ${isActive ? "active" : ""}`;

  return (
    <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      {/* Top */}
      <div className="sidebar-top">
        <h2 className="logo">{collapsed ? "SN" : "SecureNotes"}</h2>
        <button
          className="collapse-btn"
          onClick={() => setCollapsed(!collapsed)}
        >
          ☰
        </button>
      </div>

      {/* Nav */}
      <nav className="sidebar-nav">
        <NavLink to="/dashboard" className={navClass}>
          📊 {!collapsed && "Dashboard"}
        </NavLink>

        <NavLink to="/notes" className={navClass}>
          📝 {!collapsed && `Notes (${noteCount})`}
        </NavLink>

        <NavLink to="/add-note" className={navClass}>
          ➕ {!collapsed && "Add Note"}
        </NavLink>

        <NavLink to="/settings" className={navClass}>
          ⚙ {!collapsed && "Settings"}
        </NavLink>
      </nav>

      {/* Bottom */}
      <div className="sidebar-bottom">
        <button className="logout-btn" onClick={logout}>
          🚪 {!collapsed && "Logout"}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
