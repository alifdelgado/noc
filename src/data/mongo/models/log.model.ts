import { Schema, model } from 'mongoose';

const logSchema = new Schema({
  level: {
    type: String,
    required: true,
    enum: ['low', 'medium', 'high'],
    default: 'low',
  },
  message: {
    type: String,
  },
  origin: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

export const LogModel = model('Log', logSchema);
