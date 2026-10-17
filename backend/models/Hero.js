import mongoose from 'mongoose';

const heroSchema = new mongoose.Schema({
  heading: {
    type: String,
    default: 'M. Mohan, K. Gopala Krishnan'
  },
  name1: {
    type: String,
    default: 'M. Mohan'
  },
  name2: {
    type: String,
    default: 'K. Gopala Krishnan'
  },
  subtitle: {
    type: String,
    default: 'MANAGING PARTNERS · THIRUPATHI ENGINEERING'
  },
  description: {
    type: String,
    default: 'Premier mechanical industrial structural & equipment erection partnership firm. Proven execution in 20 MW thermal power plant non-IBR structures, ACC cooling towers, cement plant clinker silos, packing plants, sizer crushers, and bulk handling systems.'
  },
  badgeText: {
    type: String,
    default: 'MECHANICAL & INDUSTRIAL STRUCTURES'
  },
  badgeLoc: {
    type: String,
    default: 'TAMIL NADU · INDIA'
  },
  primaryCtaText: {
    type: String,
    default: 'Discuss Your Next Structure'
  },
  primaryCtaLink: {
    type: String,
    default: '#contact'
  },
  secondaryCtaText: {
    type: String,
    default: 'View Project Record'
  },
  secondaryCtaLink: {
    type: String,
    default: '#projects'
  },
  bgImageUrl: {
    type: String,
    default: 'assets/images/hero_colorful_plant.jpg'
  },
  logoUrl: {
    type: String,
    default: ''
  },
  contactEmail: {
    type: String,
    default: 'thirupathiengineerings@gmail.com'
  },
  contactPhone: {
    type: String,
    default: '+91 9043288002'
  }
}, {
  timestamps: true
});

export const Hero = mongoose.model('Hero', heroSchema);
