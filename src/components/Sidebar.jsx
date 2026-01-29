import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
    return (
        <aside className="sidebar">
            <div className="sidebar-logo">
                <span className="logo-icon">✨</span>
                <span className="logo-text">FitAI</span>
            </div>

            <nav className="sidebar-nav">
                <NavLink to="/dashboard" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                    <span className="nav-icon">📊</span>
                    <span className="nav-label">Overview</span>
                </NavLink>
                <NavLink to="/nutrition" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                    <span className="nav-icon">🥗</span>
                    <span className="nav-label">Nutrition</span>
                </NavLink>
                <NavLink to="/recipes" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                    <span className="nav-icon">📖</span>
                    <span className="nav-label">Recipes</span>
                </NavLink>
                <NavLink to="/fitness" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                    <span className="nav-icon">💪</span>
                    <span className="nav-label">Fitness</span>
                </NavLink>
                <NavLink to="/social" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                    <span className="nav-icon">🏆</span>
                    <span className="nav-label">Social</span>
                </NavLink>
                <NavLink to="/health" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                    <span className="nav-icon">🌿</span>
                    <span className="nav-label">Wellness</span>
                </NavLink>
                <NavLink to="/chat" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                    <span className="nav-icon">💬</span>
                    <span className="nav-label">FitAI Chat</span>
                </NavLink>
            </nav>

            <div className="sidebar-footer">
                <NavLink to="/settings" className="nav-item">
                    <span className="nav-icon">⚙️</span>
                    <span className="nav-label">Settings</span>
                </NavLink>
                <div className="user-mini-profile">
                    <div className="avatar-circle">A</div>
                    <div className="user-info">
                        <span className="user-name">Ahmed</span>
                        <span className="user-plan">Pro Plan</span>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
