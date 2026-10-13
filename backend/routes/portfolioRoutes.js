import express from 'express';
import { getAllPortfolioData, getDashboardStats } from '../controllers/portfolioController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/all', getAllPortfolioData);
router.get('/dashboard/stats', protect, getDashboardStats);

export default router;
