import { generateResponse } from '../services/aiService.js';
import DailyLog from '../models/DailyLog.js';

// @desc    Chat with FitAI
// @route   POST /api/ai/chat
// @access  Private
const chatWithAI = async (req, res) => {
    const { message } = req.body;

    // 1. Gather Context
    const todayStr = new Date().toISOString().split('T')[0];
    const log = await DailyLog.findOne({ user: req.user._id, date: todayStr });

    const context = {
        name: req.user.name,
        goal: req.user.settings?.goal || 'General Fitness',
        calories: log ? log.calories : 0,
        hydration: log ? log.hydration : 0,
        steps: log ? log.steps : 0,
        workouts: log ? log.completedWorkouts : []
    };

    // 2. Call AI Service
    try {
        const response = await generateResponse(message, context);
        res.json(response);
    } catch (error) {
        res.status(503).json({ message: 'AI Service currently unavailable.' });
    }
};

export { chatWithAI };
