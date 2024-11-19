// server.js
import express from 'express';
import { connect } from 'mongoose';
import cors from 'cors';
import { json } from 'body-parser';
import User, { findOne } from './models/users';
import Result, { findOne as _findOne, aggregate } from './models/results';
import { sign } from 'jsonwebtoken';

const app = express();
const port = 5002;

app.use(cors());
app.use(json());

connect('mongodb://localhost:27017/typingtest', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    console.log('Request Body:', req.body);  // Log the incoming request body
    try {
        const user = new User({ username, password });
        await user.save();
        res.status(201).send('User registered successfully');
    } catch (error) {
        console.error('Error registering user:', error);  // Log the error
        res.status(400).send('Error registering user');
    }
});

app.post('/login', async (req, res) => {
    console.log('Request Body:', req.body);  // Log the incoming request body

    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: 'Missing username or password' });
    }

    try {
        const user = await findOne({ username });
        if (!user || !await user.comparePassword(password)) {
            return res.status(400).json({ message: 'Incorrect Username or Password!' });
        }

        const token = sign({ id: user._id }, process.env.JWT_SECRET || 'your_jwt_secret', { expiresIn: '1h' });
        res.status(200).json({ token });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Server error' });
    }
});




app.post('/results', async (req, res) => {
  const { userId, wpm, mistakes, accuracy } = req.body;
  try {
    let result = await _findOne({ userId });
    if (!result) {
      result = new Result({ userId, tests: [{ wpm, mistakes, accuracy }] });
    } else {
      result.tests.push({ wpm, mistakes, accuracy });
    }
    await result.save();
    res.status(201).send(result);
  } catch (error) {
    res.status(400).send('Error saving results');
  }
});

app.get('/results/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const result = await _findOne({ userId });
    if (!result) {
      return res.status(404).send('Results not found');
    }
    res.status(200).send(result.tests);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.get('/api/leaderboard', async (req, res) => {
    try {
      const leaderboard = await aggregate([
        { $lookup: { from: 'users', localField: 'userId', foreignField: '_id', as: 'user' }},
        { $unwind: '$user' },
        { $project: { username: '$user.username', wpm: { $max: '$tests.wpm' } }},  // Get the highest wpm
        { $sort: { wpm: -1 }},  // Sort by wpm in descending order
        { $limit: 10 }  // Limit to top 10 users
      ]);
  
      res.status(200).send(leaderboard);
    } catch (error) {
      res.status(500).send('Error fetching leaderboard');
    }
  });
  