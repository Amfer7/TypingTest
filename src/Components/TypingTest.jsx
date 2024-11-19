import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './TypingTest.css';

const paragraphs = [
  "The quick brown fox jumps over the lazy dog.",
  "A journey of a thousand miles begins with a single step.",
  "To be or not to be, that is the question.",
  "All that glitters is not gold.",
  "The only thing we have to fear is fear itself.",
  "I think, therefore I am.",
  "In the beginning, God created the heavens and the earth.",
  "To infinity and beyond!",
  "May the Force be with you.",
  "Elementary, my dear Watson."
];

const TypingTest = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.body.className = 'typing-test-body';
    return () => { document.body.className = ''; };
  }, []);

  const [text, setText] = useState([]);
  const [timeLeft, setTimeLeft] = useState(60);
  const [charIndex, setCharIndex] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(0);

  const inputRef = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => {
    loadParagraph();
    document.addEventListener('keydown', () => inputRef.current.focus());
  }, []);

  const loadParagraph = () => {
    const randomIndex = Math.floor(Math.random() * paragraphs.length);
    const chars = paragraphs[randomIndex].split("").map(char => ({
      char,
      class: ''
    }));
    setText(chars);
    setTimeLeft(60);
    setCharIndex(0);
    setMistakes(0);
    setIsTyping(false);
    setWpm(0);
    setAccuracy(0);
    clearInterval(timerRef.current);
  };

  const startTimer = () => {
    if (!isTyping) {
      timerRef.current = setInterval(() => {
        setTimeLeft(prevTime => {
          if (prevTime <= 1) {
            clearInterval(timerRef.current);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
      setIsTyping(true);
    }
  };

  const handleTyping = (e) => {
    const typedChar = e.target.value[charIndex];
    const currentChar = text[charIndex].char;

    startTimer();

    if (timeLeft > 0 && charIndex < text.length) {
      let updatedText = [...text];
      if (typedChar == null) {
        if (charIndex > 0) {
          setCharIndex(prevIndex => prevIndex - 1);
          if (updatedText[charIndex - 1].class === 'incorrect') {
            setMistakes(prevMistakes => prevMistakes - 1);
          }
          updatedText[charIndex - 1].class = '';
        }
      } else {
        if (typedChar === currentChar) {
          updatedText[charIndex].class = 'correct';
        } else {
          updatedText[charIndex].class = 'incorrect';
          setMistakes(prevMistakes => prevMistakes + 1);
        }
        setCharIndex(prevIndex => prevIndex + 1);
      }
      setText(updatedText);

      const calculatedWpm = Math.round(((charIndex - mistakes) / 5) / (60 - timeLeft) * 60);
      const rawWpm = Math.round((charIndex / 5) / (60 - timeLeft) * 60);
      const calculatedAccuracy = Math.floor((calculatedWpm * 100) / (rawWpm || 1));

      setWpm(calculatedWpm > 0 ? calculatedWpm : 0);
      setAccuracy(calculatedAccuracy > 0 ? calculatedAccuracy : 0);
    } else {
      clearInterval(timerRef.current);
      e.target.value = "";
    }
  };

  const resetGame = () => {
    loadParagraph();
    clearInterval(timerRef.current);
    inputRef.current.value = "";
  };

  const seeResults = async () => {
    const result = { wpm, mistakes, accuracy };
    console.log('Results:', result);
    try {
      const response = await fetch('http://localhost:5002/results', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(result)
      });
      if (response.ok) {
        navigate('results', { state: { wpm, mistakes, accuracy } });
      } else {
        console.error('Failed to save results');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="wrapper">
      <h1 className="heading">Typing Test</h1>
      <input 
        type="text" 
        className="input-field" 
        ref={inputRef} 
        onChange={handleTyping}
      />
      <div className="content-box">
        <div className="typing-text">
          <p>
            {text.map((item, index) => (
              <span key={index} className={index === charIndex ? 'active' : item.class}>
                {item.char}
              </span>
            ))}
          </p>
        </div>
        <div className="content">
          <ul className="result-details">
            <li className="time">
              <p>Time Left:</p>
              <span><b>{timeLeft}</b>s</span>
            </li>
            <li className="wpm">
              <p>WPM:</p>
              <span><b>{wpm}</b></span>
            </li>
            <li className="errors">
              <p>Errors:</p>
              <span><b>{mistakes}</b></span>
            </li>
          </ul>
          <button onClick={seeResults} disabled={timeLeft > 0}>See Results</button>
          <button onClick={resetGame}>Try Again</button>
        </div>
      </div>
    </div>
  );
};

export default TypingTest;
