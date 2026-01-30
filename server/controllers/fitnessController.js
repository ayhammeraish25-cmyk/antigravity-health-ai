import User from '../models/User.js';
import { generateDailyWorkout } from '../services/workoutEngine.js';

// @desc    Get Personalized Daily Workout
// @route   GET /api/fitness/daily-plan
// @access  Private
const getDailyPlan = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const workout = generateDailyWorkout(user);

        res.json(workout);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error generating workout plan' });
    }
};

export { getDailyPlan };
