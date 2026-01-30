import mongoose from 'mongoose';

const mealSchema = mongoose.Schema({
    name: { type: String, required: true },
    cal: { type: Number, required: true },
    p: { type: Number, default: 0 },
    c: { type: Number, default: 0 },
    f: { type: Number, default: 0 },
    timestamp: { type: Date, default: Date.now }
});

const workoutSchema = mongoose.Schema({
    id: { type: Number }, // Ref to frontend constant ID
    name: { type: String, required: true },
    duration: { type: Number, required: true }, // minutes
    calories: { type: Number, required: true },
    timestamp: { type: Date, default: Date.now }
});

const dailyLogSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    date: {
        type: String,
        required: true,
        // Format: YYYY-MM-DD
    },
    calories: { type: Number, default: 0 },
    protein: { type: Number, default: 0 },
    carbs: { type: Number, default: 0 },
    fats: { type: Number, default: 0 },
    hydration: { type: Number, default: 0 },
    steps: { type: Number, default: 0 },
    meals: [mealSchema],
    completedWorkouts: [workoutSchema]
}, {
    timestamps: true
});

// Compound index to ensure one log per user per day
dailyLogSchema.index({ user: 1, date: 1 }, { unique: true });

const DailyLog = mongoose.model('DailyLog', dailyLogSchema);

export default DailyLog;
