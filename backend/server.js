// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const User = require('./models/users');
const Result = require('./models/results');
const jwt = require('jsonwebtoken');

const app = express();
const port = 5002;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/typingtest', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = new User({ username, password });
    await user.save();
    res.status(201).send('User registered successfully');
  } catch (error) {
    res.status(400).send('Error registering user');
  }
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).send('Incorrect Username or Password!');
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).send('Incorrect Username or Password!');
    }
    const token = jwt.sign({ id: user._id }, 'your_jwt_secret', { expiresIn: '1h' });
    res.status(200).send({ token });
  } catch (error) {
    res.status(500).send('Server error');
  }
});

app.post('/results', async (req, res) => {
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
    res.status(400).send('Error saving results');
  }
});

app.get('/results/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const result = await Result.findOne({ userId });
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