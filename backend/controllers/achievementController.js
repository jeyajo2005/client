import { Achievement } from '../models/Achievement.js';

// GET /api/achievements
export async function getAchievements(req, res, next) {
  try {
    const filter = req.query.all === 'true' ? {} : { isPublished: true };
    const items = await Achievement.find(filter).sort({ order: 1, year: -1 });
    res.json({ success: true, count: items.length, data: items });
  } catch (error) {
    next(error);
  }
}

// POST /api/achievements
export async function createAchievement(req, res, next) {
  try {
    const item = await Achievement.create(req.body);
    res.status(201).json({ success: true, data: item, message: 'Achievement created successfully' });
  } catch (error) {
    next(error);
  }
}

// PUT /api/achievements/:id
export async function updateAchievement(req, res, next) {
  try {
    const item = await Achievement.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!item) {
      return res.status(404).json({ success: false, message: 'Achievement not found' });
    }
    res.json({ success: true, data: item, message: 'Achievement updated successfully' });
  } catch (error) {
    next(error);
  }
}

// DELETE /api/achievements/:id
export async function deleteAchievement(req, res, next) {
  try {
    const item = await Achievement.findByIdAndDelete(req.params.id);
    if (!item) {
      return res.status(404).json({ success: false, message: 'Achievement not found' });
    }
    res.json({ success: true, message: 'Achievement deleted successfully' });
  } catch (error) {
    next(error);
  }
}

// PATCH /api/achievements/:id/toggle
export async function toggleAchievement(req, res, next) {
  try {
    const item = await Achievement.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ success: false, message: 'Achievement not found' });
    }
    item.isPublished = !item.isPublished;
    await item.save();
    res.json({ success: true, data: item, message: `Achievement ${item.isPublished ? 'published' : 'unpublished'}` });
  } catch (error) {
    next(error);
  }
}
