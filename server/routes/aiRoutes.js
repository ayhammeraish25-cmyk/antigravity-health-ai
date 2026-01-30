import express from 'express';
const router = express.Router();
import { chatWithAI } from '../controllers/aiController.js';
import { protect } from '../middleware/authMiddleware.js';

router.post('/chat', protect, chatWithAI);

export default router;
