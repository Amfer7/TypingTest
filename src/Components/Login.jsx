import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginHome.css';
import User from '../assets/user.png';
import Pass from '../assets/pass.webp';

const Login = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');
    const navigate = useNavigate();

    const handleLogin = () => {
        const validUser = '';
        const validPass = '';

        if (username === validUser && password === validPass) {
            navigate('/home');
        } else {
            setLoginError('Incorrect Username or Password!');
        }
    };

    return (
        <div className='container'>
            <div className="header">
                <div className="text">Login</div>
                <div className="underline"></div>
            </div>
            <div className="inputs">
                <div className="input">
                    <img src={User} alt=""/>
                    <input type="text" placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)}/>
                </div>
                <div className="input">
                    <img src={Pass} alt=""/>
                    <input type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <div className="submitContainer" onClick={handleLogin}>
                    <button className="submit">Login</button>
                </div>
                {loginError && (
                    <div className="error">{loginError}</div>
                )}
            </div>
        </div>
    );
};

export default Login;