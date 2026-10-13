import { Service } from '../models/Service.js';

// GET /api/services
export async function getServices(req, res, next) {
  try {
    const filter = req.query.all === 'true' ? {} : { isPublished: true };
    const services = await Service.find(filter).sort({ order: 1, createdAt: 1 });
    res.json({ success: true, count: services.length, data: services });
  } catch (error) {
    next(error);
  }
}

// POST /api/services
export async function createService(req, res, next) {
  try {
    const service = await Service.create(req.body);
    res.status(201).json({ success: true, data: service, message: 'Service created successfully' });
  } catch (error) {
    next(error);
  }
}

// PUT /api/services/:id
export async function updateService(req, res, next) {
  try {
    const service = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!service) {
      return res.status(404).json({ success: false, message: 'Service not found' });
    }
    res.json({ success: true, data: service, message: 'Service updated successfully' });
  } catch (error) {
    next(error);
  }
}

// DELETE /api/services/:id
export async function deleteService(req, res, next) {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);
    if (!service) {
      return res.status(404).json({ success: false, message: 'Service not found' });
    }
    res.json({ success: true, message: 'Service deleted successfully' });
  } catch (error) {
    next(error);
  }
}

// PATCH /api/services/:id/toggle
export async function toggleService(req, res, next) {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ success: false, message: 'Service not found' });
    }
    service.isPublished = !service.isPublished;
    await service.save();
    res.json({ success: true, data: service, message: `Service ${service.isPublished ? 'published' : 'unpublished'}` });
  } catch (error) {
    next(error);
  }
}
