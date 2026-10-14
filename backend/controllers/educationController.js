import { Education } from '../models/Education.js';

// GET /api/education
export async function getEducation(req, res, next) {
  try {
    const isPublic = req.query.admin !== 'true';
    const filter = isPublic ? { isPublished: true } : {};
    const items = await Education.find(filter).sort({ order: 1 });
    res.json({ success: true, count: items.length, data: items });
  } catch (error) {
    next(error);
  }
}

// POST /api/education
export async function createEducation(req, res, next) {
  try {
    const item = await Education.create(req.body);
    res.status(201).json({ success: true, message: 'Education record created', data: item });
  } catch (error) {
    next(error);
  }
}

// PUT /api/education/:id
export async function updateEducation(req, res, next) {
  try {
    const item = await Education.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!item) return res.status(404).json({ success: false, message: 'Education record not found' });
    res.json({ success: true, message: 'Education record updated', data: item });
  } catch (error) {
    next(error);
  }
}

// DELETE /api/education/:id
export async function deleteEducation(req, res, next) {
  try {
    const item = await Education.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: 'Education record not found' });
    res.json({ success: true, message: 'Education record deleted' });
  } catch (error) {
    next(error);
  }
}
