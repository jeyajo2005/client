import express from 'express';
import {
  getTeam,
  createTeam,
  updateTeam,
  deleteTeam,
  toggleTeam
} from '../controllers/teamController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getTeam);
router.post('/', protect, createTeam);
router.put('/:id', protect, updateTeam);
router.delete('/:id', protect, deleteTeam);
router.patch('/:id/toggle', protect, toggleTeam);

export default router;
