import mongoose from 'mongoose';

const contactSettingsSchema = new mongoose.Schema({
  email: {
    type: String,
    default: 'thirupathiENGINEERINGs@gmail.com'
  },
  phone: {
    type: String,
    default: '+91 9043288002'
  },
  secondaryPhone: {
    type: String,
    default: '+91 9443728002'
  },
  address: {
    type: String,
    default: 'Industrial Estate, Virudhunagar / R.R. Nagar Works, Tamil Nadu, India - 626204'
  },
  workingHours: {
    type: String,
    default: 'Monday – Saturday: 8:00 AM – 7:00 PM (24/7 Shutdown Emergency Response)'
  },
  mapLocation: {
    type: String,
    default: 'Tamil Nadu, India'
  },
  socialLinks: {
    linkedin: { type: String, default: 'https://linkedin.com' },
    whatsapp: { type: String, default: 'https://wa.me/919043288002' },
    twitter: { type: String, default: '' },
    facebook: { type: String, default: '' },
    youtube: { type: String, default: '' }
  }
}, {
  timestamps: true
});

export const ContactSettings = mongoose.model('ContactSettings', contactSettingsSchema);
