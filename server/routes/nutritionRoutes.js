import express from 'express';
const router = express.Router();
import { getNutritionTargets } from '../controllers/nutritionController.js';
import { protect } from '../middleware/authMiddleware.js';

router.get('/targets', protect, getNutritionTargets);

export default router;
