import React, { useState } from 'react';
import Layout from '../components/Layout';
import Button from '../components/Button';
import './Social.css';

const Social = () => {
    const [activeTab, setActiveTab] = useState('challenges');
    const [joinedChallenges, setJoinedChallenges] = useState([1]); // Mock: User joined "Hydration"

    const challenges = [
        { id: 1, title: '7-Day Hydration', participants: 1240, progress: 85, daysLeft: 2, icon: '💧' },
        { id: 2, title: '50k Steps Week', participants: 890, progress: 45, daysLeft: 4, icon: '👟' },
        { id: 3, title: 'Sleep Master', participants: 650, progress: 10, daysLeft: 6, icon: '😴' },
    ];

    const friendsParams = [
        { id: 1, name: 'Sarah K.', action: 'completed a workout', time: '2h ago', avatar: 'S' },
        { id: 2, name: 'Mike R.', action: 'reached 10-day streak! 🔥', time: '5h ago', avatar: 'M' },
        { id: 3, name: 'Jessie L.', action: 'joined "Yoga Morning"', time: '1d ago', avatar: 'J' },
    ];

    const leaderboard = [
        { rank: 1, name: 'Sarah K.', score: 98, streak: 45 },
        { rank: 2, name: 'Ahmed (You)', score: 92, streak: 12, isUser: true },
        { rank: 3, name: 'Mike R.', score: 88, streak: 32 },
        { rank: 4, name: 'Alex D.', score: 85, streak: 21 },
        { rank: 5, name: 'Emma W.', score: 82, streak: 15 },
    ];

    const handleJoin = (id) => {
        if (joinedChallenges.includes(id)) {
            setJoinedChallenges(prev => prev.filter(c => c !== id)); // Leave
        } else {
            setJoinedChallenges(prev => [...prev, id]); // Join
        }
    };

    return (
        <Layout>
            <div className="social-container">
                {/* Header with Stats */}
                <div className="social-header glass-panel">
                    <div className="user-social-stat">
                        <span className="sc-val">12</span>
                        <span className="sc-lbl">Day Streak</span>
                    </div>
                    <div className="user-social-stat">
                        <span className="sc-val">Top 5%</span>
                        <span className="sc-lbl">Consistency</span>
                    </div>
                    <div className="user-social-stat">
                        <span className="sc-val">8</span>
                        <span className="sc-lbl">Friends</span>
                    </div>
                    <div className="invite-btn-wrapper">
                        <Button variant="primary" size="sm">+ Invite Friend</Button>
                    </div>
                </div>

                {/* Tab Nav */}
                <div className="social-tabs">
                    <button
                        className={`tab-btn ${activeTab === 'challenges' ? 'active' : ''}`}
                        onClick={() => setActiveTab('challenges')}
                    >
                        Active Challenges
                    </button>
                    <button
                        className={`tab-btn ${activeTab === 'leaderboard' ? 'active' : ''}`}
                        onClick={() => setActiveTab('leaderboard')}
                    >
                        Leaderboard
                    </button>
                    <button
                        className={`tab-btn ${activeTab === 'feed' ? 'active' : ''}`}
                        onClick={() => setActiveTab('feed')}
                    >
                        Friend Feed
                    </button>
                </div>

                <div className="social-content">
                    {activeTab === 'challenges' && (
                        <div className="challenges-grid">
                            {challenges.map(c => (
                                <div key={c.id} className="challenge-card glass-panel">
                                    <div className="chal-icon">{c.icon}</div>
                                    <div className="chal-info">
                                        <h4>{c.title}</h4>
                                        <span className="chal-meta">{c.participants} joined • {c.daysLeft} days left</span>
                                        <div className="chal-progress">
                                            <div className="chal-fill" style={{ width: `${c.progress}%` }}></div>
                                        </div>
                                    </div>
                                    <Button
                                        variant={joinedChallenges.includes(c.id) ? "success" : "secondary"}
                                        size="sm"
                                        onClick={() => handleJoin(c.id)}
                                    >
                                        {joinedChallenges.includes(c.id) ? 'Active' : 'Join'}
                                    </Button>
                                </div>
                            ))}

                            <div className="create-challenge-card">
                                <span>+</span>
                                <p>Create Challenge</p>
                            </div>
                        </div>
                    )}

                    {activeTab === 'leaderboard' && (
                        <div className="leaderboard-panel glass-panel">
                            <div className="lb-header">
                                <span>Rank</span>
                                <span>User</span>
                                <span>Consistency Score</span>
                                <span>Streak</span>
                            </div>
                            {leaderboard.map(u => (
                                <div key={u.rank} className={`lb-row ${u.isUser ? 'highlight' : ''}`}>
                                    <span className="lb-rank">#{u.rank}</span>
                                    <div className="lb-user">
                                        <div className="lb-avatar">{u.name.charAt(0)}</div>
                                        <span>{u.name}</span>
                                    </div>
                                    <div className="lb-score">
                                        <span className="score-badge">{u.score}</span>
                                    </div>
                                    <span className="lb-streak">{u.streak} 🔥</span>
                                </div>
                            ))}
                        </div>
                    )}

                    {activeTab === 'feed' && (
                        <div className="feed-list">
                            {friendsParams.map(f => (
                                <div key={f.id} className="feed-item glass-panel">
                                    <div className="feed-avatar">{f.avatar}</div>
                                    <div className="feed-content">
                                        <p><strong>{f.name}</strong> {f.action}</p>
                                        <span className="feed-time">{f.time}</span>
                                    </div>
                                    <Button variant="text">👏 Clap</Button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
};

export default Social;
