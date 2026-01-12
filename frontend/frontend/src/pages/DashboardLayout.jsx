import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { NotesContext } from "../context/NotesContext";
import "./DashboardLayout.css";

const DashboardLayout = ({ children }) => {
  const [notes, setNotes] = useState([]);

  return (
    <NotesContext.Provider value={{ notes, setNotes }}>
      <div className="dashboard-layout">
        <aside className="dashboard-sidebar">
          <Sidebar noteCount={notes.length} />
        </aside>

        <div className="dashboard-main">
          <header className="dashboard-header">
            <Header />
          </header>

          <main className="dashboard-content">
            {children}
          </main>
        </div>
      </div>
    </NotesContext.Provider>
  );
};

export default DashboardLayout;
