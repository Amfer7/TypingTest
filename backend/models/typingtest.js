const mongoose = require('mongoose');

const TypingTestSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
    required: true,
  },
  time: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('TypingTest', TypingTestSchema);
