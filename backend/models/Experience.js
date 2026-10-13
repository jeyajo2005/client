import mongoose from 'mongoose';

const experienceSchema = new mongoose.Schema({
  value: {
    type: String,
    required: true,
    default: '50+'
  },
  label: {
    type: String,
    required: true
  },
  subtext: {
    type: String,
    default: ''
  },
  year: {
    type: String,
    default: ''
  },
  client: {
    type: String,
    default: ''
  },
  site: {
    type: String,
    default: ''
  },
  imageUrl: {
    type: String,
    default: ''
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

export const Experience = mongoose.model('Experience', experienceSchema);
