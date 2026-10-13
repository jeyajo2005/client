import express from 'express';
import {
  sendContactMessage,
  getInquiries,
  updateInquiryStatus,
  deleteInquiry
} from '../controllers/contactController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Public route to submit messages
router.post('/', sendContactMessage);

// Protected admin routes for inquiries
router.get('/inquiries', protect, getInquiries);
router.patch('/inquiries/:id', protect, updateInquiryStatus);
router.delete('/inquiries/:id', protect, deleteInquiry);

export default router;
