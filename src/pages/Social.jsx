import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import Button from '../components/Button';
import { socialService } from '../services/api';
import { useApp } from '../context/AppContext';
import './Social.css';

const Social = () => {
    const { user } = useApp();
    const [activeTab, setActiveTab] = useState('network'); // network | find
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [network, setNetwork] = useState({ followers: [], following: [] });
    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState('');

    useEffect(() => {
        loadNetwork();
    }, []);

    const loadNetwork = async () => {
        try {
            const data = await socialService.getNetwork();
            setNetwork(data);
        } catch (error) {
            console.error("Failed to load network", error);
        }
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchQuery.trim()) return;
        setLoading(true);
        try {
            const results = await socialService.searchUsers(searchQuery);
            setSearchResults(results);
        } catch (error) {
            console.error("Search failed", error);
        } finally {
            setLoading(false);
        }
    };

    const handleFollow = async (id) => {
        try {
            await socialService.followUser(id);
            alert("You are now following this user!"); // Replace with better UI in v3
            loadNetwork(); // Refresh list
            // Optionally update search results to show 'following' status
        } catch (error) {
            alert(error.response?.data?.message || "Action failed");
        }
    };

    const handleUnfollow = async (id) => {
        try {
            await socialService.unfollowUser(id);
            loadNetwork();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Layout>
            <div className="social-container">
                <div className="social-header glass-panel">
                    <h2>Community</h2>
                    <div className="tabs">
                        <button
                            className={`tab-btn ${activeTab === 'network' ? 'active' : ''}`}
                            onClick={() => setActiveTab('network')}
                        >
                            My Network
                        </button>
                        <button
                            className={`tab-btn ${activeTab === 'find' ? 'active' : ''}`}
                            onClick={() => setActiveTab('find')}
                        >
                            Find Friends
                        </button>
                    </div>
                </div>

                {activeTab === 'find' && (
                    <div className="search-section glass-panel">
                        <form onSubmit={handleSearch} className="search-bar">
                            <input
                                type="text"
                                placeholder="Search by name..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <Button variant="primary" type="submit" disabled={loading}>
                                {loading ? 'Searching...' : 'Search'}
                            </Button>
                        </form>

                        <div className="results-list">
                            {searchResults.map(u => (
                                <div key={u._id} className="user-card">
                                    <div className="user-info">
                                        <div className="avatar-circle">{u.name.charAt(0)}</div>
                                        <div>
                                            <h4>{u.name}</h4>
                                            <span style={{ fontSize: '0.8rem', color: '#aaa' }}>{u.settings?.goal || 'Fitness Enthusiast'}</span>
                                        </div>
                                    </div>
                                    {network.following.some(f => f._id === u._id) ? (
                                        <Button variant="secondary" size="sm" disabled>Following</Button>
                                    ) : (
                                        <Button variant="primary" size="sm" onClick={() => handleFollow(u._id)}>Follow</Button>
                                    )}
                                </div>
                            ))}
                            {searchResults.length === 0 && searchQuery && !loading && (
                                <p style={{ textAlign: 'center', color: '#888', marginTop: '1rem' }}>No users found.</p>
                            )}
                        </div>
                    </div>
                )}

                {activeTab === 'network' && (
                    <div className="network-grid">
                        <div className="follow-section glass-panel">
                            <h3>Following ({network.following.length})</h3>
                            <div className="user-list">
                                {network.following.length === 0 && <p className="empty-msg">You aren't following anyone yet.</p>}
                                {network.following.map(u => (
                                    <div key={u._id} className="user-row">
                                        <span>{u.name}</span>
                                        <button className="text-btn danger" onClick={() => handleUnfollow(u._id)}>Unfollow</button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="follow-section glass-panel">
                            <h3>Followers ({network.followers.length})</h3>
                            <div className="user-list">
                                {network.followers.length === 0 && <p className="empty-msg">No followers yet.</p>}
                                {network.followers.map(u => (
                                    <div key={u._id} className="user-row">
                                        <span>{u.name}</span>
                                        <span className="badge">Follows You</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default Social;
