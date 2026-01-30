/**
 * Workout Engine (Virtual Coach)
 * Generates personalized workouts based on user goals, activity level, and body stats.
 */

const workoutTemplates = {
    loss: {
        name: 'Fat Burn Intensity',
        type: 'HIIT / Cardio',
        exercises: [
            { name: 'Mountain Climbers', sets: 3, reps: '45 sec', rest: '15 sec' },
            { name: 'Burpees', sets: 3, reps: '10-15', rest: '30 sec' },
            { name: 'Jump Squats', sets: 3, reps: '15', rest: '30 sec' },
            { name: 'Plank Hold', sets: 3, reps: '60 sec', rest: '30 sec' }
        ],
        baseCalories: 120
    },
    muscle: {
        name: 'Hypertrophy Power',
        type: 'Strength Training',
        exercises: [
            { name: 'Pushups (Weighted if possible)', sets: 4, reps: '8-12', rest: '60 sec' },
            { name: 'Bodyweight Rows / Pullups', sets: 4, reps: '8-12', rest: '60 sec' },
            { name: 'Bulgarian Split Squats', sets: 4, reps: '10 each leg', rest: '60 sec' },
            { name: 'Dips', sets: 3, reps: '12', rest: '45 sec' }
        ],
        baseCalories: 100
    },
    fitness: {
        name: 'Functional Balance',
        type: 'General Health',
        exercises: [
            { name: 'Standard Pushups', sets: 3, reps: '12-15', rest: '45 sec' },
            { name: 'Bodyweight Squats', sets: 3, reps: '20', rest: '45 sec' },
            { name: 'Glute Bridges', sets: 3, reps: '15', rest: '30 sec' },
            { name: 'Bird-Dog', sets: 3, reps: '12 each side', rest: '30 sec' }
        ],
        baseCalories: 80
    },
    endurance: {
        name: 'Stamina Builder',
        type: 'Cardio focus',
        exercises: [
            { name: 'Steady State Jog / High Knees', sets: 1, reps: '15 mins', rest: 'None' },
            { name: 'Shadow Boxing', sets: 4, reps: '3 mins', rest: '60 sec' },
            { name: 'Jumping Jacks', sets: 4, reps: '50', rest: '30 sec' }
        ],
        baseCalories: 150
    }
};

const generateDailyWorkout = (user) => {
    const { goals, activityLevel } = user.settings;

    // Default to the first goal or fitness
    const primaryGoal = goals && goals.length > 0 ? goals[0] : 'fitness';
    const template = JSON.parse(JSON.stringify(workoutTemplates[primaryGoal] || workoutTemplates.fitness));

    // Scale intensity based on Activity Level
    let multiplier = 1.0;
    switch (activityLevel) {
        case 'sedentary': multiplier = 0.8; break;
        case 'light': multiplier = 1.0; break;
        case 'moderate': multiplier = 1.2; break;
        case 'active': multiplier = 1.4; break;
        case 'very_active': multiplier = 1.6; break;
        default: multiplier = 1.0;
    }

    // Scale reps and calories
    template.exercises = template.exercises.map(ex => {
        if (typeof ex.reps === 'string' && ex.reps.includes('-')) {
            const range = ex.reps.split('-').map(Number);
            ex.reps = `${Math.round(range[0] * multiplier)}-${Math.round(range[1] * multiplier)}`;
        } else if (!isNaN(parseInt(ex.reps)) && !ex.reps.includes('sec') && !ex.reps.includes('min')) {
            ex.reps = `${Math.round(parseInt(ex.reps) * multiplier)}`;
        }
        return ex;
    });

    template.calories = Math.round(template.baseCalories * multiplier);
    template.id = `wod-${new Date().toISOString().split('T')[0]}-${primaryGoal}`;
    template.generatedAt = new Date();

    return template;
};

export { generateDailyWorkout };
