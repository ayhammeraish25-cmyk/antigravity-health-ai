import React from 'react';
import Sidebar from './Sidebar';
import './Layout.css';

const Layout = ({ children }) => {
    return (
        <div className="app-layout">
            <Sidebar />
            <main className="main-content">
                <header className="topbar">
                    <div className="page-title">
                        <h1>Dashboard</h1>
                        <p className="current-date">{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
                    </div>
                    <div className="topbar-actions">
                        <div className="streak-badge">
                            <span>🔥</span>
                            <strong>7 Day Streak</strong>
                        </div>
                        <button className="icon-btn">🔔</button>
                    </div>
                </header>
                <div className="content-area">
                    {children}
                </div>
            </main>
        </div>
    );
};

export default Layout;
