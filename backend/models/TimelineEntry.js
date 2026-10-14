import mongoose from 'mongoose';

const timelineEntrySchema = new mongoose.Schema({
  stepNumber: {
    type: Number,
    required: true,
    default: 1
  },
  year: {
    type: String,
    required: [true, 'Milestone year is required'],
    trim: true,
    default: '2026'
  },
  title: {
    type: String,
    required: [true, 'Project title is required'],
    trim: true
  },
  client: {
    type: String,
    trim: true,
    default: 'The Ramco Cements Ltd.'
  },
  description: {
    type: String,
    required: [true, 'Project description is required'],
    trim: true
  },
  imageUrl: {
    type: String,
    default: 'assets/images/gallery/site-img-024.jpg'
  },
  alignment: {
    type: String,
    enum: ['left', 'right', 'center'],
    default: 'left'
  },
  themeClass: {
    type: String,
    default: 'theme-teal'
  },
  themeColor: {
    type: String,
    default: '#0D9488'
  },
  order: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ['COMPLETED', 'ONGOING', 'COMMISSIONED', 'PLANNED'],
    default: 'COMPLETED'
  },
  isPublished: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

export const TimelineEntry = mongoose.model('TimelineEntry', timelineEntrySchema);
