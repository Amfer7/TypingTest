// models/Result.js
const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  tests: [{
    wpm: Number,
    mistakes: Number,
    accuracy: Number,
    date: { type: Date, default: Date.now }
  }]
});

module.exports = mongoose.model('Result', resultSchema);