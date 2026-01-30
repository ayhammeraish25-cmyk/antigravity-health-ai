/**
 * Nutrition Engine
 * Calculates BMR, TDEE, and Macro targets based on user metrics.
 */

const calculateNutritionTargets = (user) => {
    const { gender, age, height, weight, activityLevel, goals } = user.settings;

    // 1. Calculate BMR (Mifflin-St Jeor Equation)
    let bmr;
    if (gender === 'male') {
        bmr = (10 * weight) + (6.25 * height) - (5 * age) + 5;
    } else {
        bmr = (10 * weight) + (6.25 * height) - (5 * age) - 161;
    }

    // 2. Apply Activity Multiplier (TDEE)
    let multiplier = 1.2; // Sedentary baseline
    switch (activityLevel) {
        case 'sedentary': multiplier = 1.2; break;
        case 'light': multiplier = 1.375; break;
        case 'moderate': multiplier = 1.55; break;
        case 'active': multiplier = 1.725; break;
        case 'very_active': multiplier = 1.9; break;
        default: multiplier = 1.2;
    }

    const tdee = Math.round(bmr * multiplier);

    // 3. Goal Adjustment
    // Default to 'fitness' (maintenance) if no goals or first goal is fitness
    const primaryGoal = goals && goals.length > 0 ? goals[0] : 'fitness';
    let targetCalories = tdee;

    if (goals.includes('loss')) {
        targetCalories = tdee - 500;
    } else if (goals.includes('muscle')) {
        targetCalories = tdee + 300;
    }

    // 4. Macro Calculation
    // Protein: ~2g per kg bodyweight
    const proteinGrams = Math.round(weight * 2.0);
    const proteinCalories = proteinGrams * 4;

    // Fats: 25% of total calories
    const fatCalories = Math.round(targetCalories * 0.25);
    const fatGrams = Math.round(fatCalories / 9);

    // Carbs: Remaining calories
    const carbCalories = targetCalories - proteinCalories - fatCalories;
    const carbGrams = Math.round(carbCalories / 4);

    return {
        calories: targetCalories,
        macros: {
            protein: proteinGrams,
            carbs: carbGrams,
            fats: fatGrams
        },
        breakdown: {
            bmr,
            tdee,
            goalAdjustment: targetCalories - tdee
        },
        primaryGoal,
        generatedAt: new Date()
    };
};

export { calculateNutritionTargets };
