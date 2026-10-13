import { Gallery } from '../models/Gallery.js';

// GET /api/gallery
export async function getGallery(req, res, next) {
  try {
    const filter = req.query.all === 'true' ? {} : { isPublished: true };
    const items = await Gallery.find(filter).sort({ order: 1, createdAt: -1 });
    res.json({ success: true, count: items.length, data: items });
  } catch (error) {
    next(error);
  }
}

// POST /api/gallery
export async function createGallery(req, res, next) {
  try {
    const item = await Gallery.create(req.body);
    res.status(201).json({ success: true, data: item, message: 'Gallery item added successfully' });
  } catch (error) {
    next(error);
  }
}

// PUT /api/gallery/:id
export async function updateGallery(req, res, next) {
  try {
    const item = await Gallery.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!item) {
      return res.status(404).json({ success: false, message: 'Gallery item not found' });
    }
    res.json({ success: true, data: item, message: 'Gallery item updated successfully' });
  } catch (error) {
    next(error);
  }
}

// DELETE /api/gallery/:id
export async function deleteGallery(req, res, next) {
  try {
    const item = await Gallery.findByIdAndDelete(req.params.id);
    if (!item) {
      return res.status(404).json({ success: false, message: 'Gallery item not found' });
    }
    res.json({ success: true, message: 'Gallery item deleted successfully' });
  } catch (error) {
    next(error);
  }
}

// PATCH /api/gallery/:id/toggle
export async function toggleGallery(req, res, next) {
  try {
    const item = await Gallery.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ success: false, message: 'Gallery item not found' });
    }
    item.isPublished = !item.isPublished;
    await item.save();
    res.json({ success: true, data: item, message: `Gallery item ${item.isPublished ? 'published' : 'unpublished'}` });
  } catch (error) {
    next(error);
  }
}
