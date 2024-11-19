import React from "react";

const Feed = () => {
    return (
        <div>
            <div className="container">
                <form action="/submit-feedback" method="post">
                    <div className="form-group">
                        <label htmlFor="name">Your UserName</label>
                        <input 
                            type="text" 
                            id="name" 
                            name="name" 
                            placeholder="Username" 
                            required 
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Your Email</label>
                        <input 
                            type="email" 
                            id="email" 
                            name="email" 
                            placeholder="Email" 
                            required 
                        />
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
                            placeholder="Share your thoughts, suggestions, or issues" 
                            required 
                        ></textarea>
                    </div>
                    <button type="submit">Submit Feedback</button>
                </form>
                <p>
                    &copy; 2024 TypeTest Inc. | 
                    <a href="/home" style={{ color: "#ffdd57", textDecoration: "none" }}>
                        Back to Home
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Feed;
