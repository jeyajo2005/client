import { Testimonial } from '../models/Testimonial.js';

// GET /api/testimonials
export async function getTestimonials(req, res, next) {
  try {
    const filter = req.query.all === 'true' ? {} : { isPublished: true };
    const items = await Testimonial.find(filter).sort({ order: 1, createdAt: -1 });
    res.json({ success: true, count: items.length, data: items });
  } catch (error) {
    next(error);
  }
}

// POST /api/testimonials
export async function createTestimonial(req, res, next) {
  try {
    const item = await Testimonial.create(req.body);
    res.status(201).json({ success: true, data: item, message: 'Testimonial created successfully' });
  } catch (error) {
    next(error);
  }
}

// PUT /api/testimonials/:id
export async function updateTestimonial(req, res, next) {
  try {
    const item = await Testimonial.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!item) {
      return res.status(404).json({ success: false, message: 'Testimonial not found' });
    }
    res.json({ success: true, data: item, message: 'Testimonial updated successfully' });
  } catch (error) {
    next(error);
  }
}

// DELETE /api/testimonials/:id
export async function deleteTestimonial(req, res, next) {
  try {
    const item = await Testimonial.findByIdAndDelete(req.params.id);
    if (!item) {
      return res.status(404).json({ success: false, message: 'Testimonial not found' });
    }
    res.json({ success: true, message: 'Testimonial deleted successfully' });
  } catch (error) {
    next(error);
  }
}

// PATCH /api/testimonials/:id/toggle
export async function toggleTestimonial(req, res, next) {
  try {
    const item = await Testimonial.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ success: false, message: 'Testimonial not found' });
    }
    item.isPublished = !item.isPublished;
    await item.save();
    res.json({ success: true, data: item, message: `Testimonial ${item.isPublished ? 'published' : 'unpublished'}` });
  } catch (error) {
    next(error);
  }
}
