import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
                            <Link to="/">Orçamentos</Link> {/* Link to MainScreen */}
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
