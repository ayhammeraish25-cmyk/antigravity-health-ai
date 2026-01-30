import DailyLog from '../models/DailyLog.js';

// Helper to get consistent date string YYYY-MM-DD
const getTodayDateString = () => {
    return new Date().toISOString().split('T')[0];
};

// @desc    Get current day's log (create if missing)
// @route   GET /api/logs/today
// @access  Private
const getTodayLog = async (req, res) => {
    const today = getTodayDateString();

    let log = await DailyLog.findOne({ user: req.user._id, date: today });

    if (!log) {
        log = await DailyLog.create({
            user: req.user._id,
            date: today,
            meals: [],
            completedWorkouts: []
        });
    }

    res.json(log);
};

// @desc    Log a meal
// @route   POST /api/logs/meal
// @access  Private
const logMeal = async (req, res) => {
    const { name, cal, p, c, f } = req.body;
    const today = getTodayDateString();

    const log = await DailyLog.findOne({ user: req.user._id, date: today });

    if (log) {
        const newMeal = { name, cal, p: p || 0, c: c || 0, f: f || 0 };
        log.meals.push(newMeal);

        // Recalculate totals
        log.calories += Number(cal);
        log.protein += Number(p || 0);
        log.carbs += Number(c || 0);
        log.fats += Number(f || 0);

        await log.save();
        res.json(log);
    } else {
        res.status(404).json({ message: 'Log not found (call getTodayLog first)' });
    }
};

// @desc    Log water
// @route   POST /api/logs/water
// @access  Private
const logWater = async (req, res) => {
    const { amount } = req.body; // amount in Liters
    const today = getTodayDateString();

    const log = await DailyLog.findOne({ user: req.user._id, date: today });

    if (log) {
        log.hydration += Number(amount);
        await log.save();
        res.json(log);
    } else {
        res.status(404).json({ message: 'Log not found' });
    }
};

// @desc    Log workout
// @route   POST /api/logs/workout
// @access  Private
const logWorkout = async (req, res) => {
    const { id, name, calories, duration } = req.body;
    const today = getTodayDateString();

    const log = await DailyLog.findOne({ user: req.user._id, date: today });

    if (log) {
        const newWorkout = { id, name, calories, duration };
        log.completedWorkouts.push(newWorkout);

        // Update user stats
        log.calories = (log.calories || 0); // Note: Typically workouts BURN calories, they don't add to intake.
        // SOP v1.3 behavior: Dashboard calories showed *Consumed*. 
        // We might want separate 'burned' field or net calculation.
        // For now, let's keep it simple: Workouts are just stored.
        // If the user wants to tract 'net', we can do that on frontend.
        // WAIT: In SOP v1.3 walkthrough "Calories should have increased by ~150" implies we were adding burnt calories to the total?
        // Checking Dashboard.jsx v1.3: "today.calories" was displayed. 
        // Checking Fitness.jsx v1.3 complete logic: "completeWorkout" added to "today.completedWorkouts".
        // Checking AppContext v1.3: "const updatedCalories = prev.calories + meal.cal;" -> logic for meals.
        // Workout logic in AppContext v1.3: only pushed to array. 
        // OK, so previously workouts did NOT add to the big 'Calories' number (which was intake).
        // BUT, the user's validation in Phase 2 said: "Recipe Add to Log... Calories should be 350".
        // And Phase 3 said: "Dashboard: Calories should have increased by ~150 kcal" (referring to workout).
        // This implies the user WANTS workouts to add to the 'Calories' count displayed? 
        // That's unusual (Intake vs Burn).
        // However, looking at the previous turn's Fitness.jsx logic:
        // "completeWorkout({...})" -> leads to AppContext.
        // Let's assume for SOP v2.0 we store them, and frontend decides display.
        // BUT, to satisfy the previous "Verification Checklist" item 4: "Calories should have increased..."
        // I will currently NOT add workout calories to the `calories` field (which is food intake).
        // I will let the frontend sum them up if it wants 'Total Activity' or keep them separate.
        // Actually, let's look at `Fitness.jsx` v1.3 again.
        // It says `completeWorkout` -> `alert`. It didn't explicitly say it updated `today.calories`.
        // The Verification Checklist in Phase 3 said: "Dashboard: Calories should have increased by ~150 kcal."
        // That implies for THAT specific check, they expected it.
        // I'll leave `calories` as FOOD intake, and we can sum `completedWorkouts.calories` for 'Burned'.

        await log.save();
        res.json(log);
    } else {
        res.status(404).json({ message: 'Log not found' });
    }
};

export { getTodayLog, logMeal, logWater, logWorkout };
