import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Service title is required'],
    trim: true
  },
  category: {
    type: String,
    required: true,
    trim: true
  },
  shortDesc: {
    type: String,
    required: true
  },
  fullDesc: {
    type: String,
    default: ''
  },
  icon: {
    type: String,
    default: 'Factory'
  },
  tags: [{
    type: String
  }],
  features: [{
    type: String
  }],
  imageUrl: {
    type: String,
    default: ''
  },
  dataNum: {
    type: String,
    default: '01'
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

export const Service = mongoose.model('Service', serviceSchema);
