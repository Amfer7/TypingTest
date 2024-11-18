import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginHome.css";
import User from "../assets/user.png";
import Pass from "../assets/pass.webp";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loginError, setLoginError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        const credentials = { username, password };
        try {
            const response = await fetch("http://localhost:5002/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(credentials),
            });
            if (response.ok) {
                const data = await response.json();
                // Save the token (you can store it in localStorage or state if needed)
                console.log("Login successful:", data);
                // Redirect to the home page after successful login
                navigate("/home");
            } else if (response.status === 404) {
                setLoginError("User not found");
            } else {
                const error = await response.text();
                setLoginError(error);
            }
        } catch (error) {
            setLoginError("Server error");
        }
    };

    const handleSignup = () => {
        navigate("/signup");
    };

    return (
        <div className="container">
            <div className="header">
                <div className="text">Login</div>
                <div className="underline"></div>
            </div>
            <div className="inputs">
                <div className="input">
                    <img src={User} alt="" />
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="input">
                    <img src={Pass} alt="" />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="submitContainer" onClick={handleLogin}>
                    <button className="submit">Login</button>
                </div>
                {loginError && <div className="error">{loginError}</div>}
                <div className="signupContainer" onClick={handleSignup}>
                    <button className="signup">Sign Up</button>
                </div>
            </div>
        </div>
    );
};

export default Login;
