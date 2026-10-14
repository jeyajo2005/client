import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema({
  name: {
    type: String,
    default: 'M. Mohan & K. Gopala Krishnan'
  },
  partner1: {
    type: String,
    default: 'M. Mohan'
  },
  partner2: {
    type: String,
    default: 'K. Gopala Krishnan'
  },
  title: {
    type: String,
    default: 'Managing Partners · Thirupathi Engineers'
  },
  companyName: {
    type: String,
    default: 'Thirupathi Engineers'
  },
  tagline: {
    type: String,
    default: 'Industrial Mechanical Structural & Equipment Erection Partnership Firm'
  },
  heroDescription: {
    type: String,
    default: 'Premier mechanical industrial structural & equipment erection partnership firm. Proven execution in 20 MW thermal power plant non-IBR structures, ACC cooling towers, cement plant clinker silos, packing plants, sizer crushers, and bulk handling systems.'
  },
  aboutHeading: {
    type: String,
    default: 'Industrial Lineage & Mechanical Construction Leadership'
  },
  aboutSubheading: {
    type: String,
    default: 'A Partnership Built on Grounded Site Execution and Decades of Field Mastery'
  },
  aboutDescription: {
    type: String,
    default: 'Thirupathi Engineers is an industrial mechanical structural and equipment erection partnership firm founded on direct job-site execution leadership. With lineage stretching back to 1985 in major steel plant construction and expanding into cement manufacturing facilities by 1990, managing partners M. Mohan and K. Gopalakrishnan deliver decades of combined industry lineage.'
  },
  experienceYears: {
    type: Number,
    default: 50
  },
  foundingYear: {
    type: Number,
    default: 1985
  },
  profileImage: {
    type: String,
    default: 'assets/images/ramco_cement_plant.jpg'
  },
  partner1Image: {
    type: String,
    default: 'assets/images/mohan.jpg'
  },
  partner2Image: {
    type: String,
    default: 'assets/images/gopalakrishnan.jpg'
  },
  highlights: [{
    type: String
  }]
}, {
  timestamps: true
});

export const Profile = mongoose.model('Profile', profileSchema);
