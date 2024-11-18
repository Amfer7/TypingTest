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
    
    // In JSX, render the error message if it exists
    {error && <div className="error">{error}</div>}
    
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
            <div>
                {Array.isArray(leaderboard) ? (
                <ul>
                    {leaderboard.map((entry, index) => (
                    <li key={index}>
                        {entry.username}: {entry.wpm}
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
