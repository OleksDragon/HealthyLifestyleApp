import React from 'react';
import useNotification from '../../../hooks/useNotification';
import NotificationContainer from './NotificationContainer';

const NotificationDemo = () => {
    const { notifications, showSuccess, showError, showInfo, removeNotification } = useNotification();

    const handleSuccess = () => {
        showSuccess('Операция выполнена успешно!');
    };

    const handleError = () => {
        showError('Произошла ошибка при выполнении операции');
    };

    const handleInfo = () => {
        showInfo('Информационное сообщение для пользователя');
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2>Демонстрация уведомлений</h2>
            <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                <button onClick={handleSuccess} style={{ padding: '10px 20px', backgroundColor: '#22c55e', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                    Показать успех
                </button>
                <button onClick={handleError} style={{ padding: '10px 20px', backgroundColor: '#ef4444', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                    Показать ошибку
                </button>
                <button onClick={handleInfo} style={{ padding: '10px 20px', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                    Показать информацию
                </button>
            </div>
            
            <NotificationContainer 
                notifications={notifications}
                onRemove={removeNotification}
            />
        </div>
    );
};

export default NotificationDemo;

