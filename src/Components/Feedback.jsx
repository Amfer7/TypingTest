import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Feed.css";
import pass from '../assets/tick2.jpg';

const Feed = () => {
    const [showPopup, setShowPopup] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const rating = e.target.rating.value;
        const feedback = e.target.comments.value; // Ensure this is collected correctly
        const userId = localStorage.getItem('userId');

        // Ensure feedback field name matches the schema
        const response = await fetch("http://localhost:5002/feedback", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, rating, feedback, userId,name }),
        });

        if (response.ok) {
            alert("Feedback submitted successfully");
            e.target.reset();
            setShowPopup(true);
            setTimeout(() => {
                navigate("/home");
            }, 5000);
        } else {
            alert("Error submitting feedback");
        }
    };

    return (
        <div className="feedback-wrapper">
            <header className="feedback-header">
                <h1>We Value Your Feedback!</h1>
                <p>Your input helps us improve and deliver a better typing experience. Thank you for taking the time to share your thoughts!</p>
            </header>
            <div className={`feedback-container ${showPopup ? "blur-background" : ""}`}>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Your Name</label>
                        <input type="text" id="name" name="name" placeholder="Enter your name" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Your Email</label>
                        <input type="email" id="email" name="email" placeholder="Enter your email" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="rating">Rate Your Experience</label>
                        <select id="rating" name="rating" required defaultValue="">
                            <option value="" disabled>
                                Select a rating
                            </option>
                            <option value="5">Excellent</option>
                            <option value="4">Good</option>
                            <option value="3">Average</option>
                            <option value="2">Poor</option>
                            <option value="1">Very Poor</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="comments">Your Feedback</label>
                        <textarea
                            id="comments"
                            name="comments"
                            placeholder="Let us know your thoughts, suggestions, or any issues you faced!"
                            required
                        ></textarea>
                    </div>
                    <button type="submit">Submit Feedback</button>
                </form>
            </div>
            {showPopup && (
                <div className="popup">
                    <div className="popup-content">
                        <img src={pass} alt="Success" className="tick-icon" />
                        <h2>Thank you for your feedback!</h2>
                        <p>Redirecting you to the homepage in a while...</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Feed;
