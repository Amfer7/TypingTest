import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './LoginHome.css';

const Home = () => {
    const [leaderboard, setLeaderboard] = useState([]);
    const [error, setError] = useState(null);
    console.log(leaderboard); // Log the leaderboard to see what it is

    useEffect(() => {
        axios.get('/api/leaderboard')
            .then(response => {
                setLeaderboard(response.data);
            })
            .catch(error => {
                setError('Failed to load leaderboard');
                console.error('There was an error fetching the leaderboard!', error);
            });
    }, []);
    
    return (
        <div className="container">
            <div className="greeting">
                Welcome To TypeTest!
                <h6>Test your typing speed and stay on top of the leaderboard.</h6>
            </div>
            <div className="button-row">
                <Link to="/home/typing">
                    <button className="home-button">Go to game</button>
                </Link>
            </div>

            {/* Display error if exists */}
            {error && <div className="error">{error}</div>}

            {/* Render leaderboard data if available */}
            <div>
                {Array.isArray(leaderboard) && leaderboard.length > 0 ? (
                    <ul>
                        {leaderboard.map((entry, index) => (
                            <li key={index}>
                                {entry.username}: {entry.wpm} WPM
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No leaderboard data available</p>
                )}
            </div>
        </div>
    );
};

export default Home;
