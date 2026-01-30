import User from '../models/User.js';
import { calculateNutritionTargets } from '../services/nutritionEngine.js';

// @desc    Get Personalized Nutrition Targets
// @route   GET /api/nutrition/targets
// @access  Private
const getNutritionTargets = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if user has required metrics
        const { age, height, weight } = user.settings;
        if (!age || !height || !weight) {
            return res.status(400).json({
                message: 'Profile incomplete. Please update age, height, and weight in settings or onboarding.'
            });
        }

        const targets = calculateNutritionTargets(user);

        res.json(targets);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error generating nutrition targets' });
    }
};

export { getNutritionTargets };
