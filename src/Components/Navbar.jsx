import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import keyboard from "../assets/keyboard.png";
import User from "../assets/user.png";

const Navbar = () => {
  const [username, setUsername] = useState("");

  useEffect(() => {
    // Retrieve the username from localStorage
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src={keyboard} alt="Logo" />
        <h1>TypeTest</h1>
      </div>
      <ul className="navbar-links">
        <li>
          <Link to="/home">Home</Link>
        </li>
        <li>
          <Link to="/home/about">About</Link>
        </li>
        <li>
          <Link to="/home/typing">Typing Test</Link>
        </li>
        <li>
          <Link to="/home/leader">Leaderboards</Link>
        </li>
        <li>
          <Link to="/home/feed">Feedback</Link>
        </li>
        <li>
          <Link to="/">Logout</Link>
        </li>
      </ul>
      <div className="logged-in">
        <img src={User} alt="user" />
        <h2>{username || "User"}</h2>{" "}
        {/* Fallback to 'User' if username is not available */}
      </div>
    </nav>
  );
};

export default Navbar;
