import { About } from '../models/About.js';

// GET /api/about
export async function getAbout(req, res, next) {
  try {
    let about = await About.findOne();
    if (!about) {
      about = await About.create({});
    }
    res.json({ success: true, data: about });
  } catch (error) {
    next(error);
  }
}

// PUT /api/about
export async function updateAbout(req, res, next) {
  try {
    let about = await About.findOne();
    if (!about) {
      about = await About.create(req.body);
    } else {
      about = await About.findByIdAndUpdate(about._id, req.body, { new: true, runValidators: true });
    }
    res.json({ success: true, data: about, message: 'About section updated successfully' });
  } catch (error) {
    next(error);
  }
}
