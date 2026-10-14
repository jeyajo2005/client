import mongoose from 'mongoose';

const educationSchema = new mongoose.Schema({
  degree: {
    type: String,
    required: [true, 'Degree / Certification title is required'],
    trim: true
  },
  institution: {
    type: String,
    required: [true, 'Institution / Authority is required'],
    trim: true
  },
  year: {
    type: String,
    default: '1985'
  },
  description: {
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

export const Education = mongoose.model('Education', educationSchema);
