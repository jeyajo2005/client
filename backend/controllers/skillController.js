import { Skill } from '../models/Skill.js';

// GET /api/skills
export async function getSkills(req, res, next) {
  try {
    const isPublic = req.query.admin !== 'true';
    const filter = isPublic ? { isPublished: true } : {};
    const skills = await Skill.find(filter).sort({ order: 1 });
    res.json({ success: true, count: skills.length, data: skills });
  } catch (error) {
    next(error);
  }
}

// POST /api/skills
export async function createSkill(req, res, next) {
  try {
    const skill = await Skill.create(req.body);
    res.status(201).json({ success: true, message: 'Skill created successfully', data: skill });
  } catch (error) {
    next(error);
  }
}

// PUT /api/skills/:id
export async function updateSkill(req, res, next) {
  try {
    const skill = await Skill.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!skill) return res.status(404).json({ success: false, message: 'Skill not found' });
    res.json({ success: true, message: 'Skill updated successfully', data: skill });
  } catch (error) {
    next(error);
  }
}

// DELETE /api/skills/:id
export async function deleteSkill(req, res, next) {
  try {
    const skill = await Skill.findByIdAndDelete(req.params.id);
    if (!skill) return res.status(404).json({ success: false, message: 'Skill not found' });
    res.json({ success: true, message: 'Skill deleted successfully' });
  } catch (error) {
    next(error);
  }
}
