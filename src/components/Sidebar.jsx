import { NavLink } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import './Sidebar.css';

const Sidebar = ({ isOpen, onClose }) => {
    const { user } = useApp();

    return (
        <aside className={`sidebar ${isOpen ? 'mobile-open' : ''}`}>
            <button className="mobile-close-btn" onClick={onClose}>×</button>

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

                <NavLink to="/review" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                    <span className="nav-icon">📅</span>
                    <span className="nav-label">Review</span>
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
                    <div className="avatar-circle">
                        {user?.name ? user.name.charAt(0) : 'G'}
                    </div>

                    <div className="user-info">
                        <span className="user-name">
                            {user?.name ?? 'Guest'}
                        </span>
                        <span className="user-plan">Free Plan</span>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;