import { useState, useCallback } from 'react';

const useNotification = () => {
    const [notifications, setNotifications] = useState([]);

    const showNotification = useCallback((message, type = 'success', duration = 4000) => {
        const id = Date.now() + Math.random();
        const notification = {
            id,
            message,
            type,
            duration,
            isVisible: true
        };

        setNotifications(prev => [...prev, notification]);

        // Автоматически удаляем уведомление после указанного времени
        setTimeout(() => {
            removeNotification(id);
        }, duration);
    }, []);

    const removeNotification = useCallback((id) => {
        setNotifications(prev => prev.filter(notification => notification.id !== id));
    }, []);

    const showSuccess = useCallback((message, duration = 4000) => {
        showNotification(message, 'success', duration);
    }, [showNotification]);

    const showError = useCallback((message, duration = 5000) => {
        showNotification(message, 'error', duration);
    }, [showNotification]);

    const showInfo = useCallback((message, duration = 4000) => {
        showNotification(message, 'info', duration);
    }, [showNotification]);

    return {
        notifications,
        showNotification,
        showSuccess,
        showError,
        showInfo,
        removeNotification
    };
};

export default useNotification;

