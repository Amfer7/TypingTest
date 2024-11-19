import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Leader.css";

const Leader = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5002/api/leaderboard")
      .then((response) => {
        setLeaderboard(response.data);
      })
      .catch((error) => {
        setError("Failed to load leaderboard");
        console.error("There was an error fetching the leaderboard!", error);
      });
  }, []);

  return (
    <div className="wrappers">
      <h1 className="head">Leaderboards</h1>
      <div className="table-container">
        {Array.isArray(leaderboard) && leaderboard.length > 0 ? (
          <table className="leaderboard-table">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Username</th>
                <th>WPM</th>
                <th>Errors</th>
                <th>Accuracy (%)</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((entry, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{entry.username}</td>
                  <td>{entry.wpm}</td>
                  <td>{entry.mistakes}</td>
                  <td>{entry.accuracy}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="error">No leaderboard data available</p>
        )}
        {error && <div className="error">{error}</div>}
      </div>
    </div>
  );
};

export default Leader;
