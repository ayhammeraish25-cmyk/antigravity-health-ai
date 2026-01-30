import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Layout from '../components/Layout';
import Button from '../components/Button';
import { authService } from '../services/api';
import './Onboarding.css'; // Reuse existing styles

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        setMessage('');

        try {
            const data = await authService.forgotPassword(email);
            setMessage(`Email Sent! Please check your inbox (or console in dev mode).`);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to send email. Try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Layout>
            <div className="onboarding-container">
                <div className="glass-panel" style={{ maxWidth: '400px', margin: '0 auto' }}>
                    <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                        <h2>Reset Password</h2>
                        <p style={{ color: '#9ca3af', fontSize: '0.9rem' }}>
                            Enter your email to receive a reset link.
                        </p>
                    </div>

                    {message && (
                        <div style={{ backgroundColor: '#f0fdf4', color: '#166534', padding: '0.75rem', borderRadius: '8px', marginBottom: '1rem', fontSize: '0.9rem' }}>
                            {message}
                        </div>
                    )}

                    {error && (
                        <div style={{ backgroundColor: '#fef2f2', color: '#dc2626', padding: '0.75rem', borderRadius: '8px', marginBottom: '1rem', fontSize: '0.9rem' }}>
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Email Address</label>
                            <input
                                type="email"
                                placeholder="name@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <Button
                            variant="primary"
                            type="submit"
                            disabled={isLoading}
                            style={{ width: '100%', marginTop: '1rem' }}
                        >
                            {isLoading ? 'Sending...' : 'Send Reset Link'}
                        </Button>
                    </form>

                    <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
                        <Link to="/login" style={{ fontSize: '0.9rem', color: '#6b7280' }}>
                            ← Back to Login
                        </Link>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default ForgotPassword;
