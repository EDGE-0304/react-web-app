import React from "react";
import "./Dashboard.css";
import { useUser } from '../../UserContext'; // Adjust the import path as necessary


function Dashboard() {
  // can make this dynamic by passing props or fetching from an API
  const { userCredentials, setUserCredentials } = useUser();

  console.log(userCredentials);

  const stats = [
    { period: "Today", count: 0 },
    { period: "This week", count: 0 },
    { period: "This month", count: 0 },
    { period: "This year", count: 1 },
    { period: "All time", count: 12 },
  ];

  return (
    <div className="dashboard-container">
      <h1>Welcome, user!</h1>
      <p>You killed 0 bugs today!</p>
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card">
            <h2>{stat.period}</h2>
            <p>{stat.count}</p>
            <button>Leaderboard</button>
            <button>View Trend</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
