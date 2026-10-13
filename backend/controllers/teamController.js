import { Team } from '../models/Team.js';

// GET /api/team
export async function getTeam(req, res, next) {
  try {
    const filter = req.query.all === 'true' ? {} : { isPublished: true };
    const members = await Team.find(filter).sort({ order: 1, createdAt: 1 });
    res.json({ success: true, count: members.length, data: members });
  } catch (error) {
    next(error);
  }
}

// POST /api/team
export async function createTeam(req, res, next) {
  try {
    const member = await Team.create(req.body);
    res.status(201).json({ success: true, data: member, message: 'Team member created successfully' });
  } catch (error) {
    next(error);
  }
}

// PUT /api/team/:id
export async function updateTeam(req, res, next) {
  try {
    const member = await Team.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!member) {
      return res.status(404).json({ success: false, message: 'Team member not found' });
    }
    res.json({ success: true, data: member, message: 'Team member updated successfully' });
  } catch (error) {
    next(error);
  }
}

// DELETE /api/team/:id
export async function deleteTeam(req, res, next) {
  try {
    const member = await Team.findByIdAndDelete(req.params.id);
    if (!member) {
      return res.status(404).json({ success: false, message: 'Team member not found' });
    }
    res.json({ success: true, message: 'Team member deleted successfully' });
  } catch (error) {
    next(error);
  }
}

// PATCH /api/team/:id/toggle
export async function toggleTeam(req, res, next) {
  try {
    const member = await Team.findById(req.params.id);
    if (!member) {
      return res.status(404).json({ success: false, message: 'Team member not found' });
    }
    member.isPublished = !member.isPublished;
    await member.save();
    res.json({ success: true, data: member, message: `Member ${member.isPublished ? 'published' : 'unpublished'}` });
  } catch (error) {
    next(error);
  }
}
