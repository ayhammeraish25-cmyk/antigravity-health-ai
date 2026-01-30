import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import Button from '../components/Button';
import './Onboarding.css';

const GOALS = [
    { id: 'loss', label: 'Weight Loss', icon: '🏃‍♂️', desc: 'Burn fat & get lean' },
    { id: 'muscle', label: 'Muscle Gain', icon: '💪', desc: 'Build strength & mass' },
    { id: 'fitness', label: 'General Fitness', icon: '🧘‍♀️', desc: 'Stay healthy & active' },
    { id: 'endurance', label: 'Endurance', icon: '🚴', desc: 'Improve stamina' },
];

const ACTIVITY_LEVELS = [
    { id: 'sedentary', label: 'Sedentary', desc: 'Little or no exercise' },
    { id: 'light', label: 'Lightly Active', desc: 'Exercise 1-3 times/week' },
    { id: 'moderate', label: 'Moderately Active', desc: 'Exercise 3-5 times/week' },
    { id: 'active', label: 'Active', desc: 'Exercise 6-7 times/week' },
    { id: 'very_active', label: 'Very Active', desc: 'Hard exercise & physical job' }
];

const Onboarding = () => {
    const navigate = useNavigate();
    const { register } = useApp();
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        age: '',
        height: '',
        weight: '',
        gender: 'male',
        activityLevel: 'moderate',
        goals: [],
        motivation: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSelect = (field, value) => {
        setFormData({ ...formData, [field]: value });
    };

    const handleGoalToggle = (goalId) => {
        setFormData(prev => {
            const currentGoals = prev.goals || [];
            if (currentGoals.includes(goalId)) {
                return { ...prev, goals: currentGoals.filter(g => g !== goalId) };
            } else {
                return { ...prev, goals: [...currentGoals, goalId] };
            }
        });
    };

    const handleNext = () => setStep(step + 1);

    const handleFinish = async () => {
        setLoading(true);
        setError('');

        // Validation
        if (formData.goals.length === 0) {
            setError('Please select at least one goal.');
            setLoading(false);
            return;
        }

        try {
            await register({
                name: formData.name,
                email: formData.email,
                password: formData.password,
                settings: {
                    age: Number(formData.age),
                    height: Number(formData.height),
                    weight: Number(formData.weight),
                    gender: formData.gender,
                    activityLevel: formData.activityLevel,
                    goals: formData.goals,
                    motivation: formData.motivation
                }
            });
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="onboarding-container">
            <div className="wizard-card glass-panel">
                <div className="wizard-header">
                    <div className="step-indicator">
                        Step {step} of 3
                    </div>
                    <div className="progress-track">
                        <div className="progress-fill" style={{ width: `${(step / 3) * 100}%` }}></div>
                    </div>
                </div>

                <div className="wizard-content">
                    {step === 1 && (
                        <div className="step-fade">
                            <h2>Create your Account</h2>
                            <p className="step-desc">Start your fitness journey today.</p>

                            {error && <div className="error-msg" style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>}

                            <div className="form-group">
                                <label>Full Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="e.g. Ahmed"
                                />
                            </div>

                            <div className="form-group">
                                <label>Email Address</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="name@example.com"
                                />
                            </div>

                            <div className="form-group">
                                <label>Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="step-fade">
                            <h2>Body Stats</h2>
                            <p className="step-desc">Help us calculate your calorie needs.</p>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>Age</label>
                                    <input type="number" name="age" value={formData.age} onChange={handleChange} placeholder="Years" />
                                </div>
                                <div className="form-group">
                                    <label>Gender</label>
                                    <select name="gender" value={formData.gender} onChange={handleChange}>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>Height (cm)</label>
                                    <input type="number" name="height" value={formData.height} onChange={handleChange} placeholder="cm" />
                                </div>
                                <div className="form-group">
                                    <label>Weight (kg)</label>
                                    <input type="number" name="weight" value={formData.weight} onChange={handleChange} placeholder="kg" />
                                </div>
                            </div>

                            <div className="form-group" style={{ marginTop: '1rem' }}>
                                <label>Activity Level</label>
                                <div className="activity-grid">
                                    {ACTIVITY_LEVELS.map((lvl) => (
                                        <div
                                            key={lvl.id}
                                            className={`activity-option ${formData.activityLevel === lvl.id ? 'selected' : ''}`}
                                            onClick={() => handleSelect('activityLevel', lvl.id)}
                                        >
                                            <span style={{ fontWeight: 'bold' }}>{lvl.label}</span>
                                            <span style={{ fontSize: '0.8rem', color: '#6b7280' }}>{lvl.desc}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="step-fade">
                            <h2>What represents your goal?</h2>
                            <p className="step-desc">Select all that apply.</p>
                            {error && <div className="error-msg" style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>}

                            <div className="cards-grid" style={{ marginBottom: '2rem' }}>
                                {GOALS.map((g) => (
                                    <div
                                        key={g.id}
                                        className={`selection-card ${formData.goals.includes(g.id) ? 'selected' : ''}`}
                                        onClick={() => handleGoalToggle(g.id)}
                                    >
                                        <span className="card-icon">{g.icon}</span>
                                        <h3>{g.label}</h3>
                                        <div className="card-check">
                                            {formData.goals.includes(g.id) && '✔'}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <Button variant="primary" onClick={handleFinish} disabled={loading}>
                                {loading ? 'Creating Account...' : 'Finish Setup'}
                            </Button>
                        </div>
                    )}
                </div>

                <div className="wizard-actions">
                    {step > 1 && (
                        <Button variant="text" onClick={() => setStep(step - 1)}>Back</Button>
                    )}
                    <div style={{ flex: 1 }}></div>
                    {step < 3 && (
                        <Button variant="primary" onClick={handleNext}>Next Step</Button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Onboarding;
