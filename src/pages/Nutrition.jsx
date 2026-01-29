import React, { useState } from 'react';
import Layout from '../components/Layout';
import Button from '../components/Button';
import './Nutrition.css';

const Nutrition = () => {
    // SOP 1.2: Zero-based stats. Only updated when user marks meals as done.
    const [stats, setStats] = useState({
        calories: 0,
        protein: 0,
        carbs: 0,
        fats: 0,
        hydration: 0
    });

    const [meals, setMeals] = useState([
        { id: 1, name: 'High-Protein Breakfast', desc: 'Oatmeal & Whey', cal: 450, p: 30, c: 50, f: 10, completed: false },
        { id: 2, name: 'Lunch', desc: 'Grilled Chicken Salad', cal: 550, p: 45, c: 20, f: 20, completed: false },
        { id: 3, name: 'Snack', desc: 'Greek Yogurt & Honey', cal: 180, p: 12, c: 25, f: 2, completed: false },
        { id: 4, name: 'Dinner', desc: 'Salmon & Asparagus', cal: 600, p: 35, c: 10, f: 30, completed: false }
    ]);

    const toggleMeal = (id) => {
        setMeals(meals.map(meal => {
            if (meal.id === id) {
                // Toggle logic: add or subtract macros based on new status
                const isCompleting = !meal.completed;
                setStats(prev => ({
                    calories: prev.calories + (isCompleting ? meal.cal : -meal.cal),
                    protein: prev.protein + (isCompleting ? meal.p : -meal.p),
                    carbs: prev.carbs + (isCompleting ? meal.c : -meal.c),
                    fats: prev.fats + (isCompleting ? meal.f : -meal.f),
                    hydration: prev.hydration // Unchanged by food
                }));
                return { ...meal, completed: isCompleting };
            }
            return meal;
        }));
    };

    const addWater = () => {
        setStats(prev => ({ ...prev, hydration: prev.hydration + 0.25 })); // Add 250ml
    };

    return (
        <Layout>
            <div className="nutrition-container">
                {/* Macros Header - Dynamic based on logs */}
                <div className="macros-header glass-panel">
                    <div className="macro-circle">
                        {/* Simplified Visual for Zero-State */}
                        <div className="macro-text-zero">
                            <span className="calories-big">{stats.calories}</span>
                            <span className="calories-label">kcal logged</span>
                        </div>
                    </div>

                    <div className="macro-details">
                        <div className="macro-item">
                            <span className="label">Protein</span>
                            <div className="bar"><div className="fill protein-fill" style={{ width: `${(stats.protein / 140) * 100}%` }}></div></div>
                            <span className="value">{stats.protein}g / 140g</span>
                        </div>
                        <div className="macro-item">
                            <span className="label">Carbs</span>
                            <div className="bar"><div className="fill carb-fill" style={{ width: `${(stats.carbs / 300) * 100}%` }}></div></div>
                            <span className="value">{stats.carbs}g / 300g</span>
                        </div>
                        <div className="macro-item">
                            <span className="label">Fats</span>
                            <div className="bar"><div className="fill fat-fill" style={{ width: `${(stats.fats / 70) * 100}%` }}></div></div>
                            <span className="value">{stats.fats}g / 70g</span>
                        </div>
                    </div>
                </div>

                <div className="split-view">
                    {/* Meal Plan Checklist */}
                    <div className="meals-section">
                        <h3>Daily Checklist</h3>
                        <div className="meals-list-compact">
                            {meals.map(meal => (
                                <div key={meal.id} className={`meal-item ${meal.completed ? 'completed' : ''}`}>
                                    <div className="meal-checkbox" onClick={() => toggleMeal(meal.id)}>
                                        {meal.completed && '✓'}
                                    </div>
                                    <div className="meal-info">
                                        <h4>{meal.name}</h4>
                                        <p>{meal.desc}</p>
                                    </div>
                                    <div className="meal-action">
                                        <span className="meal-cal">{meal.cal} kcal</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Interactive Hydration Module */}
                    <div className="hydration-section glass-panel">
                        <h3>Hydration</h3>
                        <div className="water-level">
                            <div className="water-fill" style={{ height: `${(stats.hydration / 2.5) * 100}%` }}></div>
                            <span className="water-val">{stats.hydration.toFixed(2)}L</span>
                        </div>
                        <p className="water-target">Target: 2.5L</p>
                        <Button variant="primary" className="btn-water" onClick={addWater}>+ 250ml</Button>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Nutrition;
