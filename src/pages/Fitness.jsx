import React, { useState } from 'react';
import Layout from '../components/Layout';
import Button from '../components/Button';
import './Fitness.css';

const WORKOUTS = [
    {
        id: 1,
        title: 'Upper Body Strength',
        difficulty: 'Intermediate',
        duration: '45 mins',
        calories: '320 kcal',
        image: '💪',
        exercises: 6
    },
    {
        id: 2,
        title: 'HIIT Cardio Blast',
        difficulty: 'Advanced',
        duration: '30 mins',
        calories: '450 kcal',
        image: '🏃‍♂️',
        exercises: 8
    },
    {
        id: 3,
        title: 'Core Stability',
        difficulty: 'Beginner',
        duration: '20 mins',
        calories: '150 kcal',
        image: '🧘‍♀️',
        exercises: 5
    }
];

const Fitness = () => {
    const [activeTab, setActiveTab] = useState('routines');

    return (
        <Layout>
            <div className="fitness-container">
                <div className="fitness-header">
                    <h2>Your Training Plan</h2>
                    <div className="tabs">
                        <button
                            className={`tab-btn ${activeTab === 'routines' ? 'active' : ''}`}
                            onClick={() => setActiveTab('routines')}
                        >
                            Routines
                        </button>
                        <button
                            className={`tab-btn ${activeTab === 'exercises' ? 'active' : ''}`}
                            onClick={() => setActiveTab('exercises')}
                        >
                            Exercise Library
                        </button>
                    </div>
                </div>

                {activeTab === 'routines' && (
                    <div className="routines-grid">
                        {WORKOUTS.map(workout => (
                            <div key={workout.id} className="workout-card">
                                <div className="workout-icon-wrapper">
                                    <span className="workout-icon">{workout.image}</span>
                                </div>
                                <div className="workout-info">
                                    <div className="workout-tags">
                                        <span className={`tag ${workout.difficulty.toLowerCase()}`}>{workout.difficulty}</span>
                                        <span className="tag-text">{workout.duration}</span>
                                    </div>
                                    <h3>{workout.title}</h3>
                                    <p>{workout.exercises} Exercises • {workout.calories}</p>
                                </div>
                                <Button variant="primary" size="sm">Start Workout</Button>
                            </div>
                        ))}
                    </div>
                )}

                {/* Weekly Schedule Preview */}
                <div className="schedule-section">
                    <h3>Weekly Schedule</h3>
                    <div className="week-grid">
                        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => (
                            <div key={day} className={`day-card ${i === 2 ? 'today' : ''}`}>
                                <span className="day-name">{day}</span>
                                <div className="day-dot"></div>
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
