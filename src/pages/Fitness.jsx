import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import Button from '../components/Button';
import { useApp } from '../context/AppContext';
import { fitnessService } from '../services/api';
import './Fitness.css';

const Fitness = () => {
    const { completeWorkout, today, loading: appLoading } = useApp();
    const [dailyPlan, setDailyPlan] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('routines');
    const [activeSession, setActiveSession] = useState(null); // { status: 'idle' | 'active', workout: null }

    useEffect(() => {
        const fetchDailyPlan = async () => {
            try {
                const plan = await fitnessService.getDailyPlan();
                setDailyPlan(plan);
            } catch (error) {
                console.error("Failed to fetch daily plan", error);
            } finally {
                setLoading(false);
            }
        };
        fetchDailyPlan();
    }, []);

    if (appLoading || loading) return <div style={{ color: 'white', textAlign: 'center', paddingTop: '5rem' }}>Loading Your Training Plan...</div>;

    const isWorkoutCompleted = (id) => {
        return today?.completedWorkouts?.some(w => w.id === id) ?? false;
    };

    const handleStartWorkout = (workout) => {
        if (activeSession?.status === 'active') {
            if (confirm('End current workout efficiently?')) {
                handleComplete();
            }
            return;
        }
        setActiveSession({ status: 'active', workout: workout, startTime: Date.now() });
    };

    const handleComplete = () => {
        if (!activeSession) return;

        const workout = activeSession.workout;
        completeWorkout({
            id: workout.id,
            name: workout.name,
            calories: workout.calories,
            duration: "Generated" // Or map from engine if duration added
        });

        alert(`Great job! You crushed ${workout.name} and burned ~${workout.calories} kcal!`);
        setActiveSession(null);
    };

    return (
        <Layout>
            <div className="fitness-container">
                <div className="fitness-header">
                    <h2>Virtual Coach</h2>
                    {activeSession?.status === 'active' && (
                        <div className="active-session-banner">
                            <span className="pulse-dot"></span>
                            <span>Active: <strong>{activeSession.workout.name}</strong></span>
                            <Button variant="primary" size="sm" onClick={handleComplete}>Complete Workout</Button>
                        </div>
                    )}
                    <div className="tabs">
                        <button
                            className={`tab-btn ${activeTab === 'routines' ? 'active' : ''}`}
                            onClick={() => setActiveTab('routines')}
                        >
                            Daily Routine
                        </button>
                        <button
                            className={`tab-btn ${activeTab === 'exercises' ? 'active' : ''}`}
                            onClick={() => setActiveTab('exercises')}
                        >
                            Exercises
                        </button>
                    </div>
                </div>

                {activeTab === 'routines' && dailyPlan && (
                    <div className="daily-plan-view">
                        <div className={`workout-card main-wod ${isWorkoutCompleted(dailyPlan.id) ? 'completed-card' : ''}`}>
                            <div className="workout-header-main">
                                <div className="workout-icon-wrapper">
                                    <span className="workout-icon">{dailyPlan.type.includes('Strength') ? '💪' : '🏃‍♂️'}</span>
                                    {isWorkoutCompleted(dailyPlan.id) && <div className="overlay-check">✓</div>}
                                </div>
                                <div className="workout-meta">
                                    <span className="tag-pill">{dailyPlan.type}</span>
                                    <h3>{dailyPlan.name}</h3>
                                    <p>Est. Calories: <strong>{dailyPlan.calories} kcal</strong></p>
                                </div>
                                <Button
                                    variant={isWorkoutCompleted(dailyPlan.id) ? "secondary" : "primary"}
                                    onClick={() => handleStartWorkout(dailyPlan)}
                                >
                                    {isWorkoutCompleted(dailyPlan.id) ? 'Restart Plan' : 'Start Today\'s Plan'}
                                </Button>
                            </div>

                            <div className="exercise-list-detailed">
                                <h4>Session Breakdown</h4>
                                {dailyPlan.exercises.map((ex, idx) => (
                                    <div key={idx} className="exercise-item-row">
                                        <span className="ex-name">{ex.name}</span>
                                        <div className="ex-targets">
                                            <span className="target-capsule">{ex.sets} Sets</span>
                                            <span className="target-capsule">{ex.reps} Reps</span>
                                            <span className="target-capsule">{ex.rest} Rest</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Weekly Schedule Preview */}
                <div className="schedule-section glass-panel">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                        <h3>Weekly Schedule</h3>
                        <span style={{ fontSize: '0.8rem', color: '#6b7280' }}>Streak: {(today?.completedWorkouts?.length ?? 0) > 0 ? '🔥 Active' : '😴 Resting'}</span>
                    </div>
                    <div className="week-grid">
                        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => (
                            <div key={day} className={`day-card ${i === 2 ? 'today' : ''}`}>
                                <span className="day-name">{day}</span>
                                <div className={`day-dot ${i === 2 && (today?.completedWorkouts?.length ?? 0) > 0 ? 'active-dot' : ''}`}></div>
                                {i % 2 === 0 ? <span className="day-activity">Upper Body</span> : <span className="day-activity">Rest</span>}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Fitness;
