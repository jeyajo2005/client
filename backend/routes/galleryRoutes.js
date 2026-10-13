import express from 'express';
import {
  getGallery,
  createGallery,
  updateGallery,
  deleteGallery,
  toggleGallery
} from '../controllers/galleryController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getGallery);
router.post('/', protect, createGallery);
router.put('/:id', protect, updateGallery);
router.delete('/:id', protect, deleteGallery);
router.patch('/:id/toggle', protect, toggleGallery);

export default router;
