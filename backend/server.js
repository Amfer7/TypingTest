import express from 'express';
import cors from 'cors';
import mongoose, { connect } from 'mongoose'; 
import User from './models/users.js';
import Result from './models/results.js';
import Feedback from './models/feedback.js';
import pkg from 'jsonwebtoken';

const { sign } = pkg;

const app = express();
const port = 5002;

// Middleware
app.use(cors());
app.use(express.json());



// Connect to MongoDB
connect('mongodb://localhost:27017/typingtest', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});


// Routes 

app.post('/feedback', async (req, res) => {
  const { userId, email, rating, feedback, name } = req.body;
  console.log('Feedback:', req.body);  // Log the incoming request body
  try {
    const newFeedback = new Feedback({ userId, name, email, rating, feedback });
    await newFeedback.save();
    res.status(201).send('Feedback submitted successfully');
  } catch (error) {
    console.error('Error submitting feedback:', error);
    res.status(500).send('Error submitting feedback');
  }
});


app.post('/signup', async (req, res) => {
  const { username, password } = req.body;
  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).send('User already exists');
    }
    const user = new User({ username, password });
    await user.save();
    res.status(201).send('User registered successfully');
  } catch (error) {
    console.error('Error registering user:', error);  // Log the error
    res.status(500).send('Error registering user');
  }
});


app.post('/login', async (req, res) => {
  console.log('Request Body:', req.body);  // Log the incoming request body

  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: 'Missing username or password' });
  }

  try {
    const user = await User.findOne({ username });
    if (!user || !await user.comparePassword(password)) {
      return res.status(400).json({ message: 'Incorrect Username or Password!' });
    }

    const token = sign(
      { id: user._id },
      process.env.JWT_SECRET || 'your_jwt_secret',
      { expiresIn: '1h' }
    );

    // Include the userId in the response
    res.status(200).json({ token, userId: user._id, username: user.username });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Server error' });
  }
});


app.post('/api/saveResults', async (req, res) => {
  const { userId, wpm, mistakes, accuracy } = req.body;
  try {
    let result = await Result.findOne({ userId });
    if (!result) {
      result = new Result({ userId, tests: [{ wpm, mistakes, accuracy }] });
    } else {
      result.tests.push({ wpm, mistakes, accuracy });
    }
    await result.save();
    res.status(201).send(result);
  } catch (error) {
    console.error('Error saving results:', error);
    res.status(400).send('Error saving results');
  }
});


app.get('/api/leaderboard', async (req, res) => {
  try {
    const leaderboard = await Result.aggregate([
      { $lookup: { from: 'users', localField: 'userId', foreignField: '_id', as: 'user' } },
      { $unwind: '$user' },
      { $project: { username: '$user.username', wpm: { $max: '$tests.wpm' }, accuracy: { $max: '$tests.accuracy' }, mistakes: { $min: '$tests.mistakes' } } },  // Get the highest wpm
      { $sort: { wpm: -1 } },  // Sort by wpm in descending order
      { $limit: 10 }  // Limit to top 10 users
    ]);
    console.log(leaderboard);

    res.status(200).send(leaderboard);
  } catch (error) {
    res.status(500).send('Error fetching leaderboard');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
