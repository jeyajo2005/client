import mongoose from 'mongoose';

const settingsSchema = new mongoose.Schema({
  companyName: {
    type: String,
    default: 'Thirupathi ENGINEERING'
  },
  businessType: {
    type: String,
    default: 'Partnership Firm'
  },
  tagline: {
    type: String,
    default: 'Mechanical Industrial Structures & Equipment Erection'
  },
  subtitle: {
    type: String,
    default: 'Delivering reliable industrial steel structure fabrication and erection, cement plant construction, and power plant structural solutions through experience, precision, and commitment to quality.'
  },
  phones: [{
    display: { type: String, default: '+91 9043288002' },
    value: { type: String, default: '9043288002' }
  }],
  emails: [{
    type: String,
    default: 'thirupathiengineerings@gmail.com'
  }],
  address: {
    type: String,
    default: 'Tamil Nadu, India'
  },
  gmapUrl: {
    type: String,
    default: ''
  },
  gstNumber: {
    type: String,
    default: '33AAHFT1234F1Z5'
  },
  copyrightText: {
    type: String,
    default: '© 2026 Thirupathi ENGINEERING. All rights reserved.'
  },
  socialLinks: {
    linkedin: { type: String, default: '' },
    twitter: { type: String, default: '' },
    facebook: { type: String, default: '' },
    instagram: { type: String, default: '' },
    youtube: { type: String, default: '' }
  },
  // SEO Meta
  siteTitle: {
    type: String,
    default: 'Thirupathi ENGINEERING | Mechanical Industrial Structure & Equipment Erection'
  },
  metaDescription: {
    type: String,
    default: 'Premier mechanical industrial structural and equipment erection partnership firm specializing in power plant non-IBR structures, ACC cooling towers, clinker silos, and cement machinery.'
  },
  metaKeywords: {
    type: String,
    default: 'Thirupathi ENGINEERING, Mechanical Industrial Structures, Erection, Ramco Cements, Power Plant Structures'
  },
  ogImageUrl: {
    type: String,
    default: 'assets/images/hero.jpg'
  },
  // Navigation settings
  navMenu: [{
    label: { type: String, required: true },
    link: { type: String, required: true },
    order: { type: Number, default: 0 },
    isVisible: { type: Boolean, default: true }
  }]
}, {
  timestamps: true
});

export const Settings = mongoose.model('Settings', settingsSchema);
