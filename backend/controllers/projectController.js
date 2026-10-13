import { Project } from '../models/Project.js';

// GET /api/projects
export async function getProjects(req, res, next) {
  try {
    const filter = req.query.all === 'true' ? {} : { isPublished: true };
    const projects = await Project.find(filter).sort({ order: 1, createdAt: -1 });
    res.json({ success: true, count: projects.length, data: projects });
  } catch (error) {
    next(error);
  }
}

// POST /api/projects
export async function createProject(req, res, next) {
  try {
    const project = await Project.create(req.body);
    res.status(201).json({ success: true, data: project, message: 'Project created successfully' });
  } catch (error) {
    next(error);
  }
}

// PUT /api/projects/:id
export async function updateProject(req, res, next) {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }
    res.json({ success: true, data: project, message: 'Project updated successfully' });
  } catch (error) {
    next(error);
  }
}

// DELETE /api/projects/:id
export async function deleteProject(req, res, next) {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }
    res.json({ success: true, message: 'Project deleted successfully' });
  } catch (error) {
    next(error);
  }
}

// PATCH /api/projects/:id/toggle
export async function toggleProject(req, res, next) {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }
    project.isPublished = !project.isPublished;
    await project.save();
    res.json({ success: true, data: project, message: `Project ${project.isPublished ? 'published' : 'unpublished'}` });
  } catch (error) {
    next(error);
  }
}
