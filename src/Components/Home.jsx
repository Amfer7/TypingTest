import React from "react";
import { Link } from "react-router-dom";
import "./LoginHome.css";

const Home = () => {
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
        <Link to="/home/leader">
          <button className="home-button">View Leaderboards</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
