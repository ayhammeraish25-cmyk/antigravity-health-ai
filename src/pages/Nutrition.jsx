import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import Button from '../components/Button';
import { useApp } from '../context/AppContext';
import { nutritionService } from '../services/api';
import './Nutrition.css';

const Nutrition = () => {
    const { today, logMeal, logWater, loading: appLoading } = useApp();
    const [targets, setTargets] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTargets = async () => {
            try {
                const data = await nutritionService.getTargets();
                setTargets(data);
            } catch (error) {
                console.error("Failed to fetch nutrition targets", error);
            } finally {
                setLoading(false);
            }
        };
        fetchTargets();
    }, []);

    if (appLoading || loading) {
        return (
            <div style={{ color: 'white', textAlign: 'center', paddingTop: '5rem' }}>
                Setting up your nutrition engine...
            </div>
        );
    }

    const SUGGESTED_MEALS = [
        { id: 1, name: 'High-Protein Breakfast', desc: 'Oatmeal & Whey', cal: 450, p: 30, c: 50, f: 10 },
        { id: 2, name: 'Lunch', desc: 'Grilled Chicken Salad', cal: 550, p: 45, c: 20, f: 20 },
        { id: 3, name: 'Snack', desc: 'Greek Yogurt & Honey', cal: 180, p: 12, c: 25, f: 2 },
        { id: 4, name: 'Dinner', desc: 'Salmon & Asparagus', cal: 600, p: 35, c: 10, f: 30 }
    ];

    const isMealLogged = (mealName) => {
        return today.meals.some(m => m.name === mealName);
    };

    const handleLogMeal = (meal) => {
        if (!isMealLogged(meal.name)) {
            logMeal(meal);
        } else {
            alert("Already logged!");
        }
    };

    return (
        <Layout>
            <div className="nutrition-container">

                {/* Macros Header */}
                <div className="macros-header glass-panel">
                    <div className="macro-circle">
                        <div className="macro-text-zero">
                            <span className="calories-big">{today?.calories ?? 0}</span>
                            <span className="calories-label">/ {targets?.calories ?? 2000} kcal</span>
                        </div>
                    </div>

                    <div className="macro-details">
                        <div className="macro-item">
                            <span className="label">Protein</span>
                            <div className="bar">
                                <div
                                    className="fill protein-fill"
                                    style={{ width: (targets?.macros?.protein ? Math.min(((today?.protein ?? 0) / targets.macros.protein) * 100, 100) : 0) + "%" }}
                                ></div>
                            </div>
                            <span className="value">{today?.protein ?? 0}g / {targets?.macros?.protein ?? 0}g</span>
                        </div>

                        <div className="macro-item">
                            <span className="label">Carbs</span>
                            <div className="bar">
                                <div
                                    className="fill carb-fill"
                                    style={{ width: (targets?.macros?.carbs ? Math.min(((today?.carbs ?? 0) / targets.macros.carbs) * 100, 100) : 0) + "%" }}
                                ></div>
                            </div>
                            <span className="value">{today?.carbs ?? 0}g / {targets?.macros?.carbs ?? 0}g</span>
                        </div>

                        <div className="macro-item">
                            <span className="label">Fats</span>
                            <div className="bar">
                                <div
                                    className="fill fat-fill"
                                    style={{ width: (targets?.macros?.fats ? Math.min(((today?.fats ?? 0) / targets.macros.fats) * 100, 100) : 0) + "%" }}
                                ></div>
                            </div>
                            <span className="value">{today?.fats ?? 0}g / {targets?.macros?.fats ?? 0}g</span>
                        </div>
                    </div>
                </div>

                <div className="split-view">

                    {/* Meals */}
                    <div className="meals-section">
                        <h3>Daily Checklist</h3>
                        <div className="meals-list-compact">
                            {SUGGESTED_MEALS.map(meal => {
                                const completed = isMealLogged(meal.name);
                                return (
                                    <div
                                        key={meal.id}
                                        className={`meal-item ${completed ? 'completed' : ''}`}
                                    >
                                        <div
                                            className="meal-checkbox"
                                            onClick={() => handleLogMeal(meal)}
                                        >
                                            {completed && '✓'}
                                        </div>

                                        <div className="meal-info">
                                            <h4>{meal.name}</h4>
                                            <p>{meal.desc}</p>
                                        </div>

                                        <div className="meal-action">
                                            <span className="meal-cal">{meal.cal} kcal</span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Hydration */}
                    <div className="hydration-section glass-panel">
                        <h3>Hydration</h3>
                        <div className="water-level">
                            <div
                                className="water-fill"
                                style={{ height: Math.min(((today?.hydration ?? 0) / 2.5) * 100, 100) + "%" }}
                            ></div>
                            <span className="water-val">{(today?.hydration ?? 0).toFixed(2)}L</span>
                        </div>
                        <p className="water-target">Target: 2.5L</p>
                        <Button
                            variant="primary"
                            className="btn-water"
                            onClick={() => logWater(0.25)}
                        >
                            + 250ml
                        </Button>
                    </div>

                </div>
            </div>
        </Layout>
    );
};

export default Nutrition;
