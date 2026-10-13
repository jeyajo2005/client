import express from 'express';
import {
  getExperience,
  createExperience,
  updateExperience,
  deleteExperience,
  toggleExperience
} from '../controllers/experienceController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getExperience);
router.post('/', protect, createExperience);
router.put('/:id', protect, updateExperience);
router.delete('/:id', protect, deleteExperience);
router.patch('/:id/toggle', protect, toggleExperience);

export default router;
