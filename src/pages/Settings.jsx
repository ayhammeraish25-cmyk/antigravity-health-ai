import React, { useState } from 'react';
import Layout from '../components/Layout';
import Button from '../components/Button';
import './Settings.css';

const Settings = () => {
    const [profile, setProfile] = useState({
        name: 'Ahmed',
        age: 28,
        height: 178,
        weight: 75,
        goal: 'muscle',
        notifications: true
    });

    const [devices, setDevices] = useState([
        { id: 1, name: 'Apple Watch Series 8', type: 'watch', connected: false },
        { id: 2, name: 'Oura Ring', type: 'ring', connected: false }
    ]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setProfile(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const toggleDevice = (id) => {
        setDevices(devices.map(dev =>
            dev.id === id ? { ...dev, connected: !dev.connected } : dev
        ));
    };

    const handleSave = () => {
        alert('Settings Saved! (Simulation)');
    };

    return (
        <Layout>
            <div className="settings-container">
                <h2>Settings & Preferences</h2>

                <div className="settings-grid">
                    {/* Profile Card */}
                    <div className="settings-card glass-panel">
                        <h3>UserProfile</h3>
                        <div className="form-group">
                            <label>Name</label>
                            <input type="text" name="name" value={profile.name} onChange={handleChange} />
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label>Age</label>
                                <input type="number" name="age" value={profile.age} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label>Weight (kg)</label>
                                <input type="number" name="weight" value={profile.weight} onChange={handleChange} />
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Height (cm)</label>
                            <input type="number" name="height" value={profile.height} onChange={handleChange} />
                        </div>
                        <Button variant="primary" onClick={handleSave}>Update Profile</Button>
                    </div>

                    {/* Device Manager */}
                    <div className="settings-card glass-panel">
                        <h3>Connected Devices</h3>
                        <p className="section-desc">Manage your verifiable data sources.</p>

                        <div className="device-list">
                            {devices.map(dev => (
                                <div key={dev.id} className="device-item">
                                    <div className="device-info">
                                        <span className="device-icon">{dev.type === 'watch' ? '⌚' : '💍'}</span>
                                        <span>{dev.name}</span>
                                    </div>
                                    <Button
                                        variant={dev.connected ? "secondary" : "primary"}
                                        size="sm"
                                        onClick={() => toggleDevice(dev.id)}
                                    >
                                        {dev.connected ? 'Disconnect' : 'Connect'}
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Preferences */}
                    <div className="settings-card glass-panel">
                        <h3>Notifications</h3>
                        <div className="toggle-row">
                            <span>Enable Daily Reminders</span>
                            <input
                                type="checkbox"
                                name="notifications"
                                checked={profile.notifications}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Settings;
