import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

import "./HealthPageMenu.css";

const HealthPage = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const healthSections = [
        { path: '/health/your', label: 'Твоє здоров\'я' },
        { path: '/health/mental', label: 'Ментальне здоров\'я' },
        { path: '/health/gender', label: 'Здоров\'я за статтю' }
    ];

    const handleNavigation = (path) => {
        navigate(path);
    };

    const isActive = (path) => {
        return location.pathname.startsWith(path);
    };

    return (
        <div className="health-container">
            <div className="health-links">
                {healthSections.map((section) => (
                    <button
                        key={section.path}
                        className={`health-link-btn ${isActive(section.path) ? 'active' : ''}`}
                        onClick={() => handleNavigation(section.path)}
                    >
                        {section.label}
                    </button>
                ))}
            </div>
            <div className="health-content">
                {children}
            </div>
        </div>
    );
};

export default HealthPage;