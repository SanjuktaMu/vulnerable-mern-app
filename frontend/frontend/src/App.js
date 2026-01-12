import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Notes from "./pages/Notes";
import DashboardLayout from "./pages/DashboardLayout";
import ProtectedRoute from "./pages/ProtectedRoute";
import Dashboard from "./pages/Dashboard";

// Placeholder pages
const Settings = () => <div style={{ padding: 30 }}>⚙ Settings (Coming Soon)</div>;

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Auth */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Dashboard */}
        <Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <DashboardLayout>
        <Dashboard />
      </DashboardLayout>
    </ProtectedRoute>
  }
/>


        <Route
          path="/notes"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Notes />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/add-note"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Notes />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Settings />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
