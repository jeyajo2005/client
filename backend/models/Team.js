import mongoose from 'mongoose';

const teamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  role: {
    type: String,
    required: true,
    trim: true
  },
  shortRole: {
    type: String,
    default: 'Partner'
  },
  experienceDisplay: {
    type: String,
    default: '50+ Years Industrial Experience'
  },
  description: {
    type: String,
    required: true
  },
  initials: {
    type: String,
    default: 'TE'
  },
  image: {
    type: String,
    default: ''
  },
  keyDisciplines: [{
    type: String
  }],
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

export const Team = mongoose.model('Team', teamSchema);
