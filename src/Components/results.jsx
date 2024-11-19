import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './TypingTest.css';

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate(); 

  const { wpm, mistakes, accuracy } = location.state || {};

  useEffect(() => {
    document.body.className = 'typing-test-body';
    return () => { document.body.className = ''; };
  }, []);


  const saveGame = async () => {
    const userId = localStorage.getItem('userId'); // Get the stored userId

    if (!userId) {
        console.error('User ID not found. Please log in again.');
        return;
    }

    const response = await fetch('/api/saveResults', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ wpm, mistakes, accuracy, userId })
    });

    if (response.ok) {
        navigate('/home/Leader');
    } else {
        console.error('Failed to save results');
    }
};


  return (
    <div className='wrapper'>
      <h1 className='heading'>Results</h1>
      <div className="content-box">
        <div className="typing-text">
          <p className='res'>
            Here are your results!<br />Would you like to save it to the leaderboards?
          </p>
        </div>
        <div className="content">
          <ul className="result-details">
            <li><p>WPM:</p> <span>{wpm}</span></li>
            <li><p>Mistakes:</p> <span>{mistakes}</span></li>
            <li><p>Accuracy (%):</p> <span>{accuracy}</span></li>
            <li><button onClick={saveGame}>Save</button></li>
          </ul>
        </div>
      </div>
    </div>  
  );
};

export default Results;
