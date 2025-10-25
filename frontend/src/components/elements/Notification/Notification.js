import React, { useEffect, useState } from 'react';
import './Notification.css';

const Notification = ({ 
    message, 
    type = 'success', 
    duration = 4000, 
    onClose, 
    isVisible = false 
}) => {
    const [show, setShow] = useState(isVisible);

    useEffect(() => {
        if (isVisible) {
            setShow(true);
            const timer = setTimeout(() => {
                setShow(false);
                setTimeout(() => {
                    if (onClose) onClose();
                }, 300); // Время для анимации исчезновения
            }, duration);

            return () => clearTimeout(timer);
        }
    }, [isVisible, duration, onClose]);

    const handleClose = () => {
        setShow(false);
        setTimeout(() => {
            if (onClose) onClose();
        }, 300);
    };

    if (!show) return null;

    return (
        <div className={`notification notification-${type} ${show ? 'notification-show' : 'notification-hide'}`}>
            <div className="notification-content">
                <div className="notification-icon">
                    {type === 'success' && (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                            <path 
                                d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" 
                                stroke="currentColor" 
                                strokeWidth="2" 
                                strokeLinecap="round" 
                                strokeLinejoin="round"
                            />
                        </svg>
                    )}
                    {type === 'error' && (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                            <path 
                                d="M12 9V13M12 17H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" 
                                stroke="currentColor" 
                                strokeWidth="2" 
                                strokeLinecap="round" 
                                strokeLinejoin="round"
                            />
                        </svg>
                    )}
                    {type === 'info' && (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                            <path 
                                d="M13 16H12V12H11M12 8H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" 
                                stroke="currentColor" 
                                strokeWidth="2" 
                                strokeLinecap="round" 
                                strokeLinejoin="round"
                            />
                        </svg>
                    )}
                </div>
                <div className="notification-message">
                    {message}
                </div>
                <button 
                    className="notification-close" 
                    onClick={handleClose}
                    aria-label="Закрыть уведомление"
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path 
                            d="M18 6L6 18M6 6L18 18" 
                            stroke="currentColor" 
                            strokeWidth="2" 
                            strokeLinecap="round" 
                            strokeLinejoin="round"
                        />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default Notification;

