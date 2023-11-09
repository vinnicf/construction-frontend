// Sidebar.jsx

import React, { useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import '../styles/sidebar.css'

const Sidebar = () => {
    const [isCollapsed, setIsCollapsed] = useState(false); // State to manage whether the sidebar is collapsed

    const handleToggle = () => {
        setIsCollapsed(!isCollapsed); // Toggle the isCollapsed state
    };

    return (
        <div>
            <button className="btn btn-primary" onClick={handleToggle}>
                {isCollapsed ? '☰' : '✕'} {/* Using Unicode characters for menu and close */}
            </button>

            <CSSTransition in={!isCollapsed} timeout={300} classNames="sidebar" unmountOnExit>
                <div className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
                    <nav className="sidebar-nav">
                        {/* Mockup content */}
                        <ul className="nav flex-column">
                            <li className="nav-item">
                                <a className="nav-link active" href="#">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Features</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Pricing</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">About</a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </CSSTransition>
        </div>
    );
};

export default Sidebar;
