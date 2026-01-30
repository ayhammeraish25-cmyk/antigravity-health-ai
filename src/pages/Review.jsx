import React from 'react';
import Layout from '../components/Layout';
import { useApp } from '../context/AppContext';
import './Dashboard.css'; // Reuse dashboard styles for consistency

const Review = () => {
    const { user, today, loading } = useApp();

    if (loading || !user) return <div style={{ color: 'white', textAlign: 'center', paddingTop: '5rem' }}>Loading Review...</div>;

    // Calculate simple streak (mock logic: if > 0 steps/cals today, streak is active)
    const isStreakActive = today.steps > 0 || today.calories > 0 || today.completedWorkouts.length > 0;
    const currentStreak = isStreakActive ? (user.streak || 1) : (user.streak || 0);

    return (
        <Layout>
            <div className="dashboard-grid">
                <div className="glass-panel" style={{ textAlign: 'center', padding: '2rem' }}>
                    <h2>Daily Review</h2>
                    <p style={{ color: '#6b7280' }}>Summary of your progress today.</p>

                    <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center', gap: '3rem' }}>
                        <div className="streak-circle" style={{
                            width: '120px', height: '120px', borderRadius: '50%', background: '#fff7ed',
                            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                            border: '4px solid #fed7aa'
                        }}>
                            <span style={{ fontSize: '2rem', fontWeight: 'bold', color: '#c2410c' }}>{currentStreak}</span>
                            <span style={{ fontSize: '0.8rem', color: '#9a3412' }}>Day Streak</span>
                        </div>
                    </div>
                </div>

                <div className="stats-row">
                    <div className="stat-card">
                        <div className="stat-icon bg-orange">🔥</div>
                        <div className="stat-info">
                            <span className="stat-label">Total Calories</span>
                            <span className="stat-value">{today.calories} kcal</span>
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon bg-blue">💧</div>
                        <div className="stat-info">
                            <span className="stat-label">Total Water</span>
                            <span className="stat-value">{today.hydration.toFixed(1)} L</span>
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon bg-green">💪</div>
                        <div className="stat-info">
                            <span className="stat-label">Workouts</span>
                            <span className="stat-value">{today.completedWorkouts.length}</span>
                        </div>
                    </div>
                </div>

                <section className="todays-tasks">
                    <h3>Completed Activities</h3>
                    <div className="task-list">
                        {today.meals.length === 0 && today.completedWorkouts.length === 0 && (
                            <p style={{ color: '#9ca3af', fontStyle: 'italic' }}>No activities recorded yet.</p>
                        )}

                        {today.meals.map((meal, idx) => (
                            <div key={`meal-${idx}`} className="task-card completed">
                                <div className="task-check"></div>
                                <div className="task-content">
                                    <h4>{meal.name}</h4>
                                    <p>{meal.cal} kcal • Meal</p>
                                </div>
                            </div>
                        ))}

                        {today.completedWorkouts.map((workout, idx) => (
                            <div key={`workout-${idx}`} className="task-card completed">
                                <div className="task-check"></div>
                                <div className="task-content">
                                    <h4>{workout.name}</h4>
                                    <p>{workout.duration} min • {workout.calories} kcal</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </Layout>
    );
};

export default Review;
