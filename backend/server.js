const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB connection
mongoose.connect('mongodb+srv://<username>:<password>@cluster0.mongodb.net/myDatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.log(err));

// Routes (define your routes here)
app.get('/', (req, res) => res.send('API is running'));

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


const TypingTest = require('./models/typingtest');

// POST route to save typing test score
app.post('/api/score', async (req, res) => {
  try {
    const newScore = new TypingTest(req.body);
    await newScore.save();
    res.status(201).send('Score saved successfully');
  } catch (err) {
    res.status(400).send('Error saving score');
  }
});

// GET route to get leaderboard
app.get('/api/leaderboard', async (req, res) => {
  try {
    const leaderboard = await TypingTest.find().sort({ score: -1 }).limit(10);
    res.json(leaderboard);
  } catch (err) {
    res.status(400).send('Error fetching leaderboard');
  }
});
