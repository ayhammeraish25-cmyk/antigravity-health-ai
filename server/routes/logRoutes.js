import express from 'express';
const router = express.Router();
import { getTodayLog, logMeal, logWater, logWorkout } from '../controllers/logController.js';
import { protect } from '../middleware/authMiddleware.js';

router.route('/today').get(protect, getTodayLog);
router.route('/meal').post(protect, logMeal);
router.route('/water').post(protect, logWater);
router.route('/workout').post(protect, logWorkout);

export default router;
