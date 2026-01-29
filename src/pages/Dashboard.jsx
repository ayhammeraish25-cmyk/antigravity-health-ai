import React, { useState } from 'react';
import Layout from '../components/Layout';
import Button from '../components/Button';
import './Dashboard.css';

const Dashboard = () => {
    // SOP 1.2: Metrics must start at 0 or empty until data is verified/logged.
    const [metrics, setMetrics] = useState({
        calories: 0,
        hydration: 0,
        protein: 0,
        steps: 0,
        heartRate: 0
    });

    const [deviceConnected, setDeviceConnected] = useState(false);

    // Mock Device Connection Handler
    const handleConnectDevice = () => {
        // In a real app, this would trigger Bluetooth flow
        setDeviceConnected(true);
        // Simulate fetching initial synced data ONLY after connection
        setTimeout(() => {
            setMetrics(prev => ({
                ...prev,
                steps: 450, // Initial sync example
                heartRate: 72
            }));
        }, 1000);
    };

    return (
        <Layout>
            <div className="dashboard-grid">
                {/* Welcome / Motivation Section */}
                <section className="welcome-section glass-panel">
                    <div className="welcome-text">
                        <h2>Good Morning, Ahmed! ☀️</h2>
                        <p className="motivation-quote">
                            "Consistency is key. Start your day by logging your progress."
                        </p>
                    </div>
                    <div className="daily-progress">
                        <div className="progress-ring">
                            <span className="ring-value">0%</span>
                            <span className="ring-label">Daily Goal</span>
                        </div>
                    </div>
                </section>

                {/* Device Connection Warning / CTA */}
                {!deviceConnected && (
                    <div className="device-connect-banner">
                        <div className="banner-content">
                            <span className="banner-icon">⌚</span>
                            <div>
                                <h4>No Wearable Connected</h4>
                                <p>Connect your Apple Watch or Ring to sync steps and heart rate.</p>
                            </div>
                        </div>
                        <Button variant="primary" size="sm" onClick={handleConnectDevice}>Connect Device</Button>
                    </div>
                )}

                {/* Stats Cards - Now displaying 0 or "--" if not connected */}
                <div className="stats-row">
                    <div className="stat-card">
                        <div className="stat-icon bg-orange">🔥</div>
                        <div className="stat-info">
                            <span className="stat-label">Calories</span>
                            <span className="stat-value">{metrics.calories} / 2,000</span>
                        </div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-icon bg-blue">💧</div>
                        <div className="stat-info">
                            <span className="stat-label">Hydration</span>
                            <span className="stat-value">{metrics.hydration}L / 2.5L</span>
                        </div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-icon bg-green">👟</div>
                        <div className="stat-info">
                            <span className="stat-label">Steps</span>
                            <span className="stat-value">{deviceConnected ? metrics.steps : '--'}</span>
                        </div>
                    </div>
                </div>

                {/* Today's Tasks - Manual Checklist */}
                <section className="todays-tasks">
                    <h3>Today's Manual Log</h3>
                    <div className="task-list">

                        <div className="task-card">
                            <div className="task-check"></div>
                            <div className="task-content">
                                <h4>Log Breakfast</h4>
                                <p>Record your morning nutrition</p>
                            </div>
                            <Button variant="secondary" size="sm">Log</Button>
                        </div>

                        <div className="task-card">
                            <div className="task-check"></div>
                            <div className="task-content">
                                <h4>Log Workout</h4>
                                <p>Upper Body Strength</p>
                            </div>
                            <Button variant="secondary" size="sm">Mark Done</Button>
                        </div>

                        <div className="task-card">
                            <div className="task-check"></div>
                            <div className="task-content">
                                <h4>Log Hydration</h4>
                                <p>Track water intake</p>
                            </div>
                            <Button variant="secondary" size="sm">+250ml</Button>
                        </div>

                    </div>
                </section>
            </div>
        </Layout>
    );
};

export default Dashboard;
