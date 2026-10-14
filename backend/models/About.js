import mongoose from 'mongoose';

const aboutSchema = new mongoose.Schema({
  heading: {
    type: String,
    required: true,
    default: 'Industrial Lineage & Mechanical Construction Leadership'
  },
  subheading: {
    type: String,
    default: 'A Partnership Built on Grounded Site Execution and Decades of Field Mastery'
  },
  companyIntro: {
    type: String,
    default: 'Thirupathi ENGINEERING is an industrial mechanical structural and equipment erection partnership firm founded on direct job-site execution leadership.'
  },
  history: {
    type: String,
    default: 'With lineage stretching back to 1985 in major steel plant construction and expanding into cement manufacturing facilities by 1990, managing partners M. Mohan and K. Gopalakrishnan deliver decades of combined industry lineage.'
  },
  mission: {
    type: String,
    default: 'To execute high-tonnage structural erection and mechanical equipment alignment with uncompromised engineering precision, zero-accident site safety, and schedule certainty.'
  },
  vision: {
    type: String,
    default: 'To stand as the most trusted execution partner for India’s cement, power, and heavy process manufacturing leaders.'
  },
  experienceYears: {
    type: Number,
    default: 50
  },
  foundingYear: {
    type: Number,
    default: 1985
  },
  imageUrl: {
    type: String,
    default: 'assets/images/ramco_cement_plant.jpg'
  },
  highlights: [{
    type: String
  }]
}, {
  timestamps: true
});

export const About = mongoose.model('About', aboutSchema);
