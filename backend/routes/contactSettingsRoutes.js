import express from 'express';
import { getContactSettings, updateContactSettings } from '../controllers/contactSettingsController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getContactSettings);
router.put('/', protect, updateContactSettings);

export default router;
