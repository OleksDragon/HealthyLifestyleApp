import React from 'react';
import Notification from './Notification';

const NotificationContainer = ({ notifications, onRemove }) => {
    return (
        <div className="notification-container">
            {notifications.map(notification => (
                <Notification
                    key={notification.id}
                    message={notification.message}
                    type={notification.type}
                    duration={notification.duration}
                    isVisible={notification.isVisible}
                    onClose={() => onRemove(notification.id)}
                />
            ))}
        </div>
    );
};

export default NotificationContainer;

