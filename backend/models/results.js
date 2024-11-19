import { Schema, model } from 'mongoose';

const resultSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  tests: [{
    wpm: Number,
    mistakes: Number,
    accuracy: Number,
    date: { type: Date, default: Date.now }
  }]
});

export default model('Result', resultSchema);
