import { Schema, model } from 'mongoose';

const feedbackSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    email: { type: String, required: true },
    feedback: { type: String, required: true },
});

export default model('Feedback', feedbackSchema);
