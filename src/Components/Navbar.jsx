import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; 
import keyboard from '../assets/keyboard.png'


const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <img src={keyboard} alt="Logo"/>    
                <h1>TypeTest</h1> 
            </div>
            <ul className="navbar-links">
                <li><Link to="/home">Home</Link></li>
                <li><Link to="/home/typing">Typing Test</Link></li>
                <li><Link to="/">Logout</Link></li>
            </ul>
        </nav>
    );
};

export default Navbar;