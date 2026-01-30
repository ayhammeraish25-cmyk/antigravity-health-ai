import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import './LandingPage.css';

const LandingPage = () => {
    const navigate = useNavigate();

    const handleGetStarted = () => {
        navigate('/onboarding');
    };

    return (
        <div className="landing-page">
            <nav className="navbar container">
                <div className="logo">
                    <span className="logo-icon">✨</span>
                    <span className="logo-text">FitAI</span>
                </div>
                <div className="nav-links">
                    <a href="#features">Features</a>
                    <a href="#about">About</a>
                    <a href="#pricing">Plans</a>
                </div>
                <div className="nav-actions">
                    <Button variant="text" className="btn-signin" onClick={() => navigate('/login')}>Sign in</Button>
                    <Button variant="secondary" onClick={handleGetStarted}>Get Started</Button>
                </div>
            </nav>

            <main className="hero-section container">
                <div className="hero-content">
                    <div className="hero-badge">Health & Fitness AI</div>
                    <h1 className="hero-title">
                        Your personal AI <br />
                        <span className="text-highlight">Wellness Companion</span>
                    </h1>
                    <p className="hero-subtitle">
                        Personalized nutrition plans, workout routines, and daily motivation
                        powered by advanced AI to help you reach your goals.
                    </p>
                    <div className="hero-cta">
                        <Button variant="primary" size="lg" onClick={handleGetStarted}>
                            Start Your Journey
                        </Button>
                        <div className="hero-social-proof">
                            <span>Trusted by 10,000+ users</span>
                        </div>
                    </div>
                </div>

                <div className="hero-visuals">
                    {/* Decorative elements to mimic the "ChronoTask" floating cards */}
                    <div className="floating-card card-main glass-panel">
                        <div className="card-header">
                            <div className="icon-circle bg-blue">💧</div>
                            <div>
                                <strong>Hydration</strong>
                                <span className="text-sm text-gray">Daily Goal</span>
                            </div>
                        </div>
                        <div className="progress-bar">
                            <div className="progress-fill" style={{ width: '75%' }}></div>
                        </div>
                    </div>

                    <div className="floating-card card-sub-1 glass-panel">
                        <div className="icon-circle bg-green">🥗</div>
                        <div>
                            <strong>Nutrition</strong>
                            <span className="text-sm text-gray">On Track</span>
                        </div>
                    </div>

                    <div className="floating-card card-sub-2 glass-panel">
                        <div className="icon-circle bg-orange">🔥</div>
                        <div>
                            <strong>Streak</strong>
                            <span className="text-sm text-gray">7 Days</span>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default LandingPage;
