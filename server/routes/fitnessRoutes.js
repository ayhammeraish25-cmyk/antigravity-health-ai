import express from 'express';
const router = express.Router();
import { getDailyPlan } from '../controllers/fitnessController.js';
import { protect } from '../middleware/authMiddleware.js';

router.get('/daily-plan', protect, getDailyPlan);

export default router;
