import mongoose from 'mongoose';

const analyticsSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['PAGE_VIEWS', 'CLICKS', 'CONVERSIONS'],
    required: true,
  },
  value: {
    type: Number,
    required: true,
  },
  url: String,
  element: String,
  goal: String,
});

export const AnalyticsModel = mongoose.model('Analytics', analyticsSchema);