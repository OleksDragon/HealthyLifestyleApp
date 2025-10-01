import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from 'react-i18next';

import "./HealthPageMenu.css";

const HealthPage = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { t } = useTranslation();

    const healthSections = [
        { path: '/health/your', label: t("hmp_your_health") },
        { path: '/health/mental', label: t("hmp_mental_health") },
        { path: '/health/gender', label: t("gender") }
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