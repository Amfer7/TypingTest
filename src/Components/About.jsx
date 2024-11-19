import React from "react";
import "./About.css";
import typingImage from "../assets/typing.jpg"; 

const About = () => {
  return (
    <div className="about-wrapper">
      <header className="about-header">
        <h1>About TypeTest</h1>
      </header>
      <div className="about-container">
        <div className="about-section">
          <img src={typingImage} alt="Typing" className="about-image" />
          <p>
            A typing test is an engaging way to measure your typing speed and accuracy. 
            Often used to assess keyboarding skills, it’s commonly measured in Words Per Minute (WPM) 
            and accuracy percentage. Typing tests are not just practical—they’re a fun way to boost your 
            productivity and keyboard mastery!
          </p>
        </div>

        <div className="about-section">
          <h2>How Does It Work?</h2>
          <p>
            In our typing test, you'll be presented with a random passage. Your goal is to type the content 
            quickly and accurately within a time limit. Once completed, you'll receive your results, 
            including WPM, accuracy, and the number of mistakes you've made.
          </p>
        </div>

        <div className="about-section">
          <h2>Why Take a Typing Test?</h2>
          <ul>
            <li>Sharpen typing speed and accuracy.</li>
            <li>Enhance focus and coordination.</li>
            <li>Prepare for professional roles requiring efficient typing.</li>
            <li>Track progress and challenge yourself.</li>
          </ul>
        </div>

        

        <div className="about-section">
          <h2>Tips for Improving Your Typing Skills</h2>
          <ul>
            <li>Practice regularly to develop muscle memory.</li>
            <li>Focus on accuracy before aiming for speed.</li>
            <li>Maintain proper finger placement and typing posture.</li>
            <li>Take breaks to avoid fatigue and maintain concentration.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default About;
