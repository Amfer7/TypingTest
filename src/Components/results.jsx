import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './TypingTest.css';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import axios from 'axios';

const Results = () => {
  const location = useLocation();
  const { userId } = location.state || {};
  const [results, setResults] = React.useState([]);

  useEffect(() => {
    document.body.className = 'typing-test-body';
    return () => { document.body.className = ''; };
  }, []);

  useEffect(() => {
    if (userId) {
      axios.get(`http://localhost:5002/results/${userId}`)
        .then(response => {
          setResults(response.data);
        })
        .catch(error => {
          console.error('Error fetching results:', error);
        });
    }
  }, [userId]);

  const data = {
    labels: results.map(result => new Date(result.date).toLocaleDateString()),
    datasets: [
      {
        label: 'WPM',
        data: results.map(result => result.wpm),
        borderColor: 'rgba(75,192,192,1)',
        fill: false,
      },
      {
        label: 'Mistakes',
        data: results.map(result => result.mistakes),
        borderColor: 'rgba(255,99,132,1)',
        fill: false,
      },
      {
        label: 'Accuracy',
        data: results.map(result => result.accuracy),
        borderColor: 'rgba(153,102,255,1)',
        fill: false,
      },
    ],
  };

  return (
    <div>
      <h1>Results</h1>
      <Line data={data} />
    </div>
  );
};

export default Results;