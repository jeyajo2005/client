import mongoose from 'mongoose';

const gallerySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    default: 'machinery'
  },
  tag: {
    type: String,
    default: 'Ramco Cements Site'
  },
  imageUrl: {
    type: String,
    required: [true, 'Image URL is required']
  },
  thumbnailUrl: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  },
  isHD: {
    type: Boolean,
    default: true
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

export const Gallery = mongoose.model('Gallery', gallerySchema);
