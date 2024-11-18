import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './LoginHome.css';

const Home = () => {
    const [leaderboard, setLeaderboard] = useState([]);

    useEffect(() => {
        axios.get('/api/leaderboard')
            .then(response => {
                setLeaderboard(response.data);
            })
            .catch(error => {
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
            <div className="leaderboard">
                <h2>Leaderboard</h2>
                <ul>
                    {leaderboard.map((entry, index) => (
                        <li key={index}>
                            {entry.username}: {entry.score}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Home;
