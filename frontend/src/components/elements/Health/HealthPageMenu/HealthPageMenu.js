import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import "./HealthPageMenu.css";

const HealthPage = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { t } = useTranslation();
    const [isMobile, setIsMobile] = useState(false);
    const [isHealthMenuOpen, setIsHealthMenuOpen] = useState(false);

    const healthSections = [
        { path: '/health/your', label: t("hmp_your_health") },
        { path: '/health/mental', label: t("hmp_mental_health") },
        { path: '/health/gender', label: t("gender") }
    ];

    useEffect(() => {
        const checkScreenSize = () => {
            setIsMobile(window.innerWidth <= 431);
        };

        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);

        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    // Автоматично відкриваємо меню при переході на /health в мобільній версії
    useEffect(() => {
        if (isMobile && location.pathname === '/health') {
            setIsHealthMenuOpen(true);
        }
    }, [location.pathname, isMobile]);

    const handleNavigation = (path) => {
        navigate(path);
        setIsHealthMenuOpen(false);
    };

    const isActive = (path) => {
        return location.pathname.startsWith(path);
    };

    const toggleHealthMenu = () => {
        setIsHealthMenuOpen(!isHealthMenuOpen);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isHealthMenuOpen && !event.target.closest('.mobile-health-nav')) {
                setIsHealthMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isHealthMenuOpen]);

    return (
        <div className="health-container">
            {/* Desktop Navigation */}
            {!isMobile && (
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
            )}

            {/* Mobile Header with Burger Menu */}
            {isMobile && (
                <div className="mobile-health-header">
                    <div className="mobile-health-nav">
                        <button 
                            className={`health-burger-menu ${isHealthMenuOpen ? 'active' : ''}`}
                            onClick={toggleHealthMenu}
                            aria-label="Health categories menu"
                        >
                            <span></span>
                            <span></span>
                            <span></span>
                        </button>

                        {isHealthMenuOpen && (
                            <div className="health-burger-dropdown">
                                <div className="health-burger-content">
                                    {healthSections.map((section) => (
                                        <button
                                            key={section.path}
                                            className={`health-burger-option ${isActive(section.path) ? 'active' : ''}`}
                                            onClick={() => handleNavigation(section.path)}
                                        >
                                            <span className="health-option-text">{section.label}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}

            <div className="health-content">
                {children}
            </div>
        </div>
    );
};

export default HealthPage;
