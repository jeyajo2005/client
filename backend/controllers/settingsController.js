import { Settings } from '../models/Settings.js';

// GET /api/settings
export async function getSettings(req, res, next) {
  try {
    let settings = await Settings.findOne();
    if (!settings) {
      settings = await Settings.create({});
    }
    res.json({ success: true, data: settings });
  } catch (error) {
    next(error);
  }
}

// PUT /api/settings
export async function updateSettings(req, res, next) {
  try {
    let settings = await Settings.findOne();
    if (!settings) {
      settings = await Settings.create(req.body);
    } else {
      settings = await Settings.findByIdAndUpdate(settings._id, req.body, { new: true, runValidators: true });
    }
    res.json({ success: true, data: settings, message: 'Settings saved successfully' });
  } catch (error) {
    next(error);
  }
}
