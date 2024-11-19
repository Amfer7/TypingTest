import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './Leader.css'


const Leader = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5002/api/leaderboard')
      .then(response => {
        setLeaderboard(response.data);
      })
      .catch(error => {
        setError('Failed to load leaderboard');
        console.error('There was an error fetching the leaderboard!', error);
      });
  }, []);

  return (
    <div className='wrapper'>
        <h1 className='head'>Leaderboards</h1>
        <div className="conbox">
            <div className='contents'>
                {Array.isArray(leaderboard) && leaderboard.length > 0 ? (
                    <ul>
                        {leaderboard.map((entry, index) => (
                            <li key={index}>
                                {entry.username}: <span>{entry.wpm} WPM</span>, <span>Errors: {entry.mistakes}</span>, <span>Accuracy: {entry.accuracy}%</span>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No leaderboard data available</p>
                )}
                {error && <div className="error">{error}</div>}
            </div>
        </div>
    </div>
  );
};

export default Leader;
