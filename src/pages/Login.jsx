import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import Button from '../components/Button';
import './Onboarding.css'; // Reuse Onboarding styles

const Login = () => {
    const navigate = useNavigate();
    const { login } = useApp();
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            await login(formData.email, formData.password);
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Invalid email or password');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="onboarding-container">
            <div className="wizard-card glass-panel">
                <div className="wizard-header">
                    <h2>Welcome Back</h2>
                    <p>Sign in to continue your progress</p>
                </div>

                <div className="wizard-content">
                    {error && <div className="error-msg" style={{ color: 'red', marginBottom: '1rem', textAlign: 'center' }}>{error}</div>}

                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Email Address</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="name@example.com"
                                required
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
                                required
                            />
                        </div>

                        <div style={{ textAlign: 'right', marginTop: '0.5rem' }}>
                            <Link to="/forgotpassword" style={{ fontSize: '0.85rem', color: '#6b7280', textDecoration: 'none' }}>
                                Forgot Password?
                            </Link>
                        </div>

                        <div style={{ marginTop: '1.5rem' }}>
                            <Button variant="primary" type="submit" disabled={loading} style={{ width: '100%' }}>
                                {loading ? 'Signing In...' : 'Sign In'}
                            </Button>
                        </div>
                    </form>

                    <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
                        <span style={{ color: '#6b7280' }}>Don't have an account? </span>
                        <Link to="/onboarding" style={{ color: 'var(--color-primary)', fontWeight: 'bold', textDecoration: 'none' }}>
                            Sign Up
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
