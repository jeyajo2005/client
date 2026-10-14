import express from 'express';
import {
  getTimelineEntries,
  getTimelineEntryById,
  createTimelineEntry,
  updateTimelineEntry,
  deleteTimelineEntry,
  reorderTimeline
} from '../controllers/timelineController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getTimelineEntries);
router.get('/:id', getTimelineEntryById);
router.post('/', protect, createTimelineEntry);
router.put('/reorder', protect, reorderTimeline);
router.put('/:id', protect, updateTimelineEntry);
router.delete('/:id', protect, deleteTimelineEntry);

export default router;
