import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import './Onboarding.css';

const GOALS = [
    { id: 'loss', label: 'Weight Loss', icon: '🏃‍♂️', desc: 'Burn fat & get lean' },
    { id: 'muscle', label: 'Muscle Gain', icon: '💪', desc: 'Build strength & mass' },
    { id: 'fitness', label: 'General Fitness', icon: '🧘‍♀️', desc: 'Stay healthy & active' },
    { id: 'endurance', label: 'Endurance', icon: '🚴', desc: 'Improve stamina' },
];

const MOTIVATION_STYLES = [
    { id: 'energetic', label: 'Energetic & Enthusiastic', icon: '⚡' },
    { id: 'calm', label: 'Calm & Supportive', icon: '🌿' },
    { id: 'achievement', label: 'Achievement-Focused', icon: '🏆' },
];

const Onboarding = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        gender: 'male',
        height: '',
        weight: '',
        goal: '',
        motivation: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSelect = (field, value) => {
        setFormData({ ...formData, [field]: value });
    };

    const nextStep = () => setStep(step + 1);
    const prevStep = () => setStep(step - 1);

    const handleSubmit = () => {
        // In a real app, save to backend/context here
        navigate('/dashboard');
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
                            <h2>Let's get to know you</h2>
                            <p className="step-desc">We need your basic details to calculate your plans.</p>

                            <div className="form-group">
                                <label>First Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="e.g. Ahmed"
                                />
                            </div>

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
                        </div>
                    )}

                    {step === 2 && (
                        <div className="step-fade">
                            <h2>What represents your goal?</h2>
                            <p className="step-desc">Select the primary objective for your journey.</p>

                            <div className="cards-grid">
                                {GOALS.map((g) => (
                                    <div
                                        key={g.id}
                                        className={`selection-card ${formData.goal === g.id ? 'selected' : ''}`}
                                        onClick={() => handleSelect('goal', g.id)}
                                    >
                                        <span className="card-icon">{g.icon}</span>
                                        <h3>{g.label}</h3>
                                        <p>{g.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="step-fade">
                            <h2>Motivation Style</h2>
                            <p className="step-desc">How should fitAI talk to you?</p>

                            <div className="cards-list">
                                {MOTIVATION_STYLES.map((m) => (
                                    <div
                                        key={m.id}
                                        className={`list-card ${formData.motivation === m.id ? 'selected' : ''}`}
                                        onClick={() => handleSelect('motivation', m.id)}
                                    >
                                        <span className="card-icon">{m.icon}</span>
                                        <h3>{m.label}</h3>
                                        <div className="radio-circle"></div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                <div className="wizard-actions">
                    {step > 1 && (
                        <Button variant="text" onClick={prevStep}>Back</Button>
                    )}
                    <div style={{ flex: 1 }}></div>
                    {step < 3 ? (
                        <Button variant="primary" onClick={nextStep}>Next Step</Button>
                    ) : (
                        <Button variant="primary" onClick={handleSubmit}>Complete Profile</Button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Onboarding;
