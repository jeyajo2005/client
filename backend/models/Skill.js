import mongoose from 'mongoose';

const skillSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Skill name is required'],
    trim: true
  },
  category: {
    type: String,
    enum: ['Mechanical', 'Structural', 'Safety', 'Engineering', 'Tools', 'Management'],
    default: 'Mechanical'
  },
  proficiency: {
    type: Number,
    min: 0,
    max: 100,
    default: 95
  },
  icon: {
    type: String,
    default: 'Wrench'
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

export const Skill = mongoose.model('Skill', skillSchema);
