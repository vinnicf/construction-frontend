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
        <>
            <button className="btn btn-primary btn-close" onClick={handleToggle}>
                {isCollapsed ? '☰' : '✕'} {/* Using Unicode characters for menu and close */}
            </button>

            <div className={`sidebar ${isCollapsed ? 'collapsed' : 'expanded'}`}>
                <button className="btn btn-primary btn-close" onClick={handleToggle}>
                    {isCollapsed ? '☰' : '✕'} {/* Toggle icon */}
                </button>

                {!isCollapsed && (
                    <nav className="sidebar-nav">
                        {/* Your sidebar content */}
                        <ul className="nav flex-column">
                            <li className="nav-item">
                                <a className="nav-link active" href="#">Home</a>
                            </li>
                            {/* ... other nav items */}
                        </ul>
                    </nav>
                )}
            </div>
        </>
    );
};

export default Sidebar;
