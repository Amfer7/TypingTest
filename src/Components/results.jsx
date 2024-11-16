import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './TypingTest.css';


const Results = () => {
  const location = useLocation();
  const { wpm, mistakes, accuracy } = location.state || {};

  useEffect(() => {
    document.body.className = 'typing-test-body';
    return () => {document.body.className = '';};
    }, []);

  return (
    <div className='wrapper'>
      <h1 className='heading'>Results</h1>
      <div className="content-box">
        <div className="typing-text">
          <p>Here are your results.</p>
        </div>
        <div className="content">
             <ul className="result-details">
              <li><p>WPM:</p> <span>{wpm}</span></li>
              <li><p>Mistakes:</p> <span>{mistakes}</span></li>
              <li><p>Accuracy (%):</p> <span>{accuracy}</span></li>
            </ul>
          </div>
      </div>
    </div>  
  );
};

export default Results;
