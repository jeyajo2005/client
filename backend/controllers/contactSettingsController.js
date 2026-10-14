import { ContactSettings } from '../models/ContactSettings.js';

// GET /api/contact-settings
export async function getContactSettings(req, res, next) {
  try {
    let settings = await ContactSettings.findOne();
    if (!settings) {
      settings = await ContactSettings.create({
        email: 'thirupathiengineerings@gmail.com',
        phone: '+91 9043288002',
        secondaryPhone: '+91 9443728002',
        address: 'Industrial Estate, Virudhunagar / R.R. Nagar Works, Tamil Nadu, India - 626204',
        workingHours: 'Monday – Saturday: 8:00 AM – 7:00 PM (24/7 Emergency Erection Response)',
        mapLocation: 'Virudhunagar, Tamil Nadu, India',
        socialLinks: {
          linkedin: 'https://linkedin.com',
          whatsapp: 'https://wa.me/919043288002'
        }
      });
    }
    res.json({ success: true, data: settings });
  } catch (error) {
    next(error);
  }
}

// PUT /api/contact-settings
export async function updateContactSettings(req, res, next) {
  try {
    let settings = await ContactSettings.findOne();
    if (!settings) {
      settings = await ContactSettings.create(req.body);
    } else {
      settings = await ContactSettings.findByIdAndUpdate(settings._id, req.body, { new: true, runValidators: true });
    }
    res.json({ success: true, message: 'Contact settings updated successfully', data: settings });
  } catch (error) {
    next(error);
  }
}
