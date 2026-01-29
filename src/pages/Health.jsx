import React, { useState } from 'react';
import Layout from '../components/Layout';
import Button from '../components/Button';
import './Health.css';

const Health = () => {
    const [synced, setSynced] = useState(false);
    const [data, setData] = useState({
        sleep: 0,
        hr: 0,
        steps: 0,
        weight: 75.2 // User entered, kept as legacy or prompts for update
    });

    const handleSync = () => {
        // Mock Sync Process with loading state simulation
        setSynced(true);
        setTimeout(() => {
            setData({
                sleep: 465, // 7h 45m in minutes
                hr: 72,
                steps: 8432,
                weight: 75.2
            });
        }, 800);
    };

    const formatTime = (mins) => {
        if (mins === 0) return "--";
        const h = Math.floor(mins / 60);
        const m = mins % 60;
        return `${h}h ${m}m`;
    };

    return (
        <Layout>
            <div className="health-container">

                {/* Device Sync Header */}
                <div className="sync-header glass-panel">
                    <div className="sync-text">
                        <h3>Wearable Data</h3>
                        <p>{synced ? 'Synced just now' : 'Connect device to view metrics'}</p>
                    </div>
                    {!synced ? (
                        <Button variant="primary" onClick={handleSync}>Sync Device</Button>
                    ) : (
                        <Button variant="secondary" className="btn-synced">✓ Synced</Button>
                    )}
                </div>

                {/* Sleep Tracker */}
                <div className="health-card glass-panel sleep-card">
                    <div className="card-header">
                        <h3>Sleep Quality</h3>
                        {synced && <span className="badge">Good</span>}
                    </div>
                    <div className="sleep-visual">
                        <div className="sleep-time">
                            <span className="time-val">{formatTime(data.sleep)}</span>
                            <span className="time-label">Time Asleep</span>
                        </div>
                        <div className={`sleep-graph ${!synced ? 'empty-state-graph' : ''}`}>
                            {synced ? (
                                [40, 60, 30, 80, 50, 90, 70].map((h, i) => (
                                    <div key={i} className="bar" style={{ height: `${h}%` }}></div>
                                ))
                            ) : (
                                <p className="no-data-msg">No Data</p>
                            )}
                        </div>
                    </div>
                    <p className="insight-text">
                        {synced ? "You sleep better on workout days. Keep it up!" : "Sync your wearable to see sleep insights."}
                    </p>
                </div>

                {/* Mental Wellness */}
                <div className="health-card glass-panel mood-card">
                    <div className="card-header">
                        <h3>Daily Mood</h3>
                    </div>
                    <div className="mood-selector">
                        <button className="mood-btn">😫</button>
                        <button className="mood-btn">😐</button>
                        <button className="mood-btn active">🙂</button>
                        <button className="mood-btn">🤩</button>
                    </div>
                    <div className="meditation-cta">
                        <h4>Recommended</h4>
                        <p>10 min Mindfulness</p>
                    </div>
                </div>

                {/* Health Stats */}
                <div className="health-row">
                    <div className="stat-box">
                        <span className="icon">❤️</span>
                        <span className="val">{data.hr > 0 ? `${data.hr} bpm` : '--'}</span>
                        <span className="lbl">Resting Rate</span>
                    </div>
                    <div className="stat-box">
                        <span className="icon">👣</span>
                        <span className="val">{data.steps > 0 ? data.steps.toLocaleString() : '--'}</span>
                        <span className="lbl">Steps Today</span>
                    </div>
                    <div className="stat-box">
                        <span className="icon">⚖️</span>
                        <span className="val">{data.weight} kg</span>
                        <span className="lbl">Current Weight</span>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Health;
