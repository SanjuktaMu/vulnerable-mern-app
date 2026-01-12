import React, { useContext } from "react";
import { NotesContext } from "../context/NotesContext";
import "./Dashboard.css";

function Dashboard() {
  const { notes } = useContext(NotesContext);

  const lastNote =
    notes.length > 0 ? notes[0].content.slice(0, 60) + "..." : "No notes yet";

  return (
    <div className="dashboard-wrapper">
      <h2 className="dashboard-title">Dashboard Overview</h2>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Notes</h3>
          <p className="stat-value">{notes.length}</p>
        </div>

        <div className="stat-card">
          <h3>Last Note</h3>
          <p className="stat-text">{lastNote}</p>
        </div>
      </div>

      {/* Security Banner */}
      <div className="security-banner">
        ⚠ <strong>Security Alert:</strong> This application intentionally
        demonstrates <b>Stored XSS</b> vulnerabilities for OWASP testing.
      </div>
    </div>
  );
}

export default Dashboard;
