import React, { useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import Layout from '../components/Layout';
import Button from '../components/Button';
import { authService } from '../services/api';
import './Onboarding.css';

const ResetPassword = () => {
    const { resetToken } = useParams();
    const navigate = useNavigate();

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        setIsLoading(true);
        setError('');
        setMessage('');

        try {
            await authService.resetPassword(resetToken, password);
            setMessage('Password Updated Successfully!');
            setTimeout(() => {
                navigate('/login');
            }, 2000);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to reset password. Link may be expired.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Layout>
            <div className="onboarding-container">
                <div className="glass-panel" style={{ maxWidth: '400px', margin: '0 auto' }}>
                    <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                        <h2>Set New Password</h2>
                        <p style={{ color: '#9ca3af', fontSize: '0.9rem' }}>
                            Create a strong password for your account.
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

                    {!message && (
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>New Password</label>
                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    minLength={6}
                                />
                            </div>

                            <div className="form-group" style={{ marginTop: '1rem' }}>
                                <label>Confirm Password</label>
                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                    minLength={6}
                                />
                            </div>

                            <Button
                                variant="primary"
                                type="submit"
                                disabled={isLoading}
                                style={{ width: '100%', marginTop: '1.5rem' }}
                            >
                                {isLoading ? 'Updating...' : 'Update Password'}
                            </Button>
                        </form>
                    )}

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

export default ResetPassword;
