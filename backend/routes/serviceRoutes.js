import express from 'express';
import {
  getServices,
  createService,
  updateService,
  deleteService,
  toggleService
} from '../controllers/serviceController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getServices);
router.post('/', protect, createService);
router.put('/:id', protect, updateService);
router.delete('/:id', protect, deleteService);
router.patch('/:id/toggle', protect, toggleService);

export default router;
