import React, { useState } from 'react';
import Sidebar from './Sidebar';
import './Layout.css';

const Layout = ({ children }) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <div className="app-layout">

            {/* Sidebar */}
            <Sidebar
                isOpen={isMobileMenuOpen}
                onClose={() => setIsMobileMenuOpen(false)}
            />

            {/* Main Content */}
            <div className="main-content">

                {/* Header */}
                <header className="top-header">
                    <button
                        className="hamburger-btn"
                        onClick={() => setIsMobileMenuOpen(true)}
                    >
                        ☰
                    </button>
                    <h1 className="app-title">Antigravity</h1>
                </header>

                {/* Page Content */}
                <div className="content-area">
                    {children}
                </div>

            </div>
        </div>
    );
};

export default Layout;