import mongoose from 'mongoose';

const achievementSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  year: {
    type: String,
    default: '2024'
  },
  category: {
    type: String,
    default: 'Industrial Erection'
  },
  organization: {
    type: String,
    default: 'The Ramco Cements Ltd.'
  },
  description: {
    type: String,
    default: ''
  },
  certificateUrl: {
    type: String,
    default: ''
  },
  badge: {
    type: String,
    default: 'Verified Milestone'
  },
  order: {
    type: Number,
    default: 0
  },
  isPublished: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

export const Achievement = mongoose.model('Achievement', achievementSchema);
