import { Experience } from '../models/Experience.js';

// GET /api/experience
export async function getExperience(req, res, next) {
  try {
    const filter = req.query.all === 'true' ? {} : { isPublished: true };
    const items = await Experience.find(filter).sort({ order: 1, createdAt: 1 });
    res.json({ success: true, count: items.length, data: items });
  } catch (error) {
    next(error);
  }
}

// POST /api/experience
export async function createExperience(req, res, next) {
  try {
    const item = await Experience.create(req.body);
    res.status(201).json({ success: true, data: item, message: 'Experience item created successfully' });
  } catch (error) {
    next(error);
  }
}

// PUT /api/experience/:id
export async function updateExperience(req, res, next) {
  try {
    const item = await Experience.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!item) {
      return res.status(404).json({ success: false, message: 'Experience item not found' });
    }
    res.json({ success: true, data: item, message: 'Experience item updated successfully' });
  } catch (error) {
    next(error);
  }
}

// DELETE /api/experience/:id
export async function deleteExperience(req, res, next) {
  try {
    const item = await Experience.findByIdAndDelete(req.params.id);
    if (!item) {
      return res.status(404).json({ success: false, message: 'Experience item not found' });
    }
    res.json({ success: true, message: 'Experience item deleted successfully' });
  } catch (error) {
    next(error);
  }
}

// PATCH /api/experience/:id/toggle
export async function toggleExperience(req, res, next) {
  try {
    const item = await Experience.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ success: false, message: 'Experience item not found' });
    }
    item.isPublished = !item.isPublished;
    await item.save();
    res.json({ success: true, data: item, message: `Item ${item.isPublished ? 'published' : 'unpublished'}` });
  } catch (error) {
    next(error);
  }
}
