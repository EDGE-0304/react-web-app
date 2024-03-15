import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserProvider } from "./UserContext.js"; // Import UserProvider
import Dashboard from "./components/Dashboard/Dashboard";
import Login from "./components/Login/Login";
import "./App.css";

function App() {
  return (
    <UserProvider> {/* Wrap routes with UserProvider */}
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/" element={<Login />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
