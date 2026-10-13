import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Project title is required'],
    trim: true
  },
  category: {
    type: String,
    required: true,
    trim: true
  },
  client: {
    type: String,
    default: 'The Ramco Cements Ltd.'
  },
  location: {
    type: String,
    default: 'Tamil Nadu, India'
  },
  year: {
    type: String,
    default: '2022'
  },
  capacity: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    required: true
  },
  scope: [{
    type: String
  }],
  images: [{
    type: String
  }],
  mainImage: {
    type: String,
    default: 'assets/images/drymix_packing.jpg'
  },
  tags: [{
    type: String
  }],
  status: {
    type: String,
    enum: ['COMPLETED', 'ONGOING', 'COMMISSIONED'],
    default: 'COMPLETED'
  },
  isFeatured: {
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

export const Project = mongoose.model('Project', projectSchema);
