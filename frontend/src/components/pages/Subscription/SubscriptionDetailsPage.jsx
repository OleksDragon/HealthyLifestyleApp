import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../../styles/subscriptionDetails.css";

const SubscriptionDetailsPage = () => {
    const [currentSubscription, setCurrentSubscription] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showFamilyModal, setShowFamilyModal] = useState(false);
    const [familyEmails, setFamilyEmails] = useState(['', '', '']);
    const [familyLoading, setFamilyLoading] = useState(false);
    const navigate = useNavigate();

    const userId = localStorage.getItem("user-id");
    const token = localStorage.getItem("helth-token");

    useEffect(() => {
        const fetchCurrentSubscription = async () => {
            try {
                const response = await axios.get(
                    `${process.env.REACT_APP_API_URL}/api/Subscription/check/${userId}`,
                    {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    }
                );
                
                if (response.data && typeof response.data === 'object') {
                    setCurrentSubscription(response.data);
                    // Заповнюємо поля для сімейних користувачів
                    if (response.data.FamilyMembers && response.data.FamilyMembers.length > 0) {
                        const emails = response.data.FamilyMembers.map(member => member.Email);
                        // Додаємо порожні поля, якщо менше 3
                        while (emails.length < 3) {
                            emails.push('');
                        }
                        setFamilyEmails(emails);
                    }
                } else {
                    setCurrentSubscription(null);
                }
            } catch (error) {
                console.error("Помилка при отриманні підписки:", error);
                setCurrentSubscription(null);
            } finally {
                setLoading(false);
            }
        };

        if (userId && token) {
            fetchCurrentSubscription();
        } else {
            setLoading(false);
        }
    }, [userId, token]);

    // Перевіряємо чи потрібно показувати кнопку продовження (залишилось <= 5 днів)
    const shouldShowRenewButton = () => {
        if (!currentSubscription || !hasActiveSubscription()) return false;
        
        const endDate = new Date(currentSubscription.EndDate || currentSubscription.endDate);
        const today = new Date();
        const timeDiff = endDate.getTime() - today.getTime();
        const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
        
        return daysDiff <= 5;
    };

    // Функції для роботи з підпискою
    const renewSubscription = async (subscriptionId, newEndDate) => {
        try {
            await axios.patch(
                `${process.env.REACT_APP_API_URL}/api/Subscription/${subscriptionId}/renew`,
                newEndDate,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
            return true;
        } catch (error) {
            console.error("Помилка при продовженні підписки:", error);
            throw error;
        }
    };

    const updateFamilyMembers = async (subscriptionId, memberEmails) => {
        try {
            const response = await axios.patch(
                `${process.env.REACT_APP_API_URL}/api/Subscription/${subscriptionId}/family-members`,
                { memberEmails },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
            return response.data;
        } catch (error) {
            console.error("Помилка при оновленні сімейних користувачів:", error);
            throw error;
        }
    };

    const handleRenewSubscription = async () => {
        if (!currentSubscription) return;

        try {
            setLoading(true);
            const newEndDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
            await renewSubscription(currentSubscription.Id || currentSubscription.id, newEndDate);
            
            // Оновлюємо дані
            const response = await axios.get(
                `${process.env.REACT_APP_API_URL}/api/Subscription/check/${userId}`,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );
            setCurrentSubscription(response.data);
            alert('Підписку успішно продовжено!');
        } catch (error) {
            alert('Помилка при продовженні підписки: ' + (error.response?.data || error.message));
        } finally {
            setLoading(false);
        }
    };

    const handleManageFamily = () => {
        setShowFamilyModal(true);
    };

    const handleCloseFamilyModal = () => {
        setShowFamilyModal(false);
    };

    const handleFamilyEmailChange = (index, value) => {
        const newEmails = [...familyEmails];
        newEmails[index] = value;
        setFamilyEmails(newEmails);
    };

    const handleSaveFamilyMembers = async () => {
        if (!currentSubscription) return;

        try {
            setFamilyLoading(true);
            const validEmails = familyEmails.filter(email => email.trim() !== '');
            
            const result = await updateFamilyMembers(
                currentSubscription.Id || currentSubscription.id, 
                validEmails
            );
            
            if (result.notFoundEmails && result.notFoundEmails.length > 0) {
                alert(`Деякі користувачі не були додані: ${result.notFoundEmails.join(', ')}`);
            }
            
            // Оновлюємо дані підписки
            const response = await axios.get(
                `${process.env.REACT_APP_API_URL}/api/Subscription/check/${userId}`,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );
            setCurrentSubscription(response.data);
            setShowFamilyModal(false);
            alert('Список сімейних користувачів успішно оновлено!');
            
        } catch (error) {
            alert('Помилка при оновленні сімейних користувачів: ' + (error.response?.data || error.message));
        } finally {
            setFamilyLoading(false);
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('uk-UA', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };

    const hasActiveSubscription = () => {
        if (!currentSubscription) return false;
        return currentSubscription.Status === 'Active';
    };

    const getSubscriptionStatus = () => {
        if (!currentSubscription) return 'none';
        return hasActiveSubscription() ? 'active' : 'expired';
    };

    if (loading) {
        return (
            <div className="sdp-subscription-details-page">
                <div className="sdp-subscription-loading">Завантаження...</div>
            </div>
        );
    }

    if (!currentSubscription) {
        return (
            <div className="sdp-subscription-details-page">
                <div className="sdp-subscription-no-subscription">
                    <h2>Підписка не знайдена</h2>
                    <button onClick={() => navigate('/premium')} className="sdp-subscription-back-btn">
                        Повернутись до тарифів
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className='sdp-subscription-details-main-page'>
            <div className="ns-back-button" onClick={() => navigate('/premium')}>
                <svg width="13" height="25" viewBox="0 0 13 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11 23.0703L3 12.5703L11 2.07031" stroke="white" strokeWidth="4" />
                </svg>
                <span>Повернутись назад</span>
            </div>

            <div className="sdp-subscription-details-page">
                
                <div className="sdp-subscription-details">
                    {/* Об'єднаний блок інформації про підписку */}
                    <div className="sdp-subscription-details-card">
                        <h2>Ваша поточна підписка</h2>
                        
                        <div className="sdp-subscription-details-content">
                            <div className="sdp-subscription-details-section">
                                <h3>Основна інформація</h3>
                                <div className="sdp-subscription-details-grid">
                                    <div className="sdp-subscription-detail-item">
                                        <span className="sdp-subscription-detail-label">Тип підписки:</span>
                                        <span className="sdp-subscription-detail-value">{currentSubscription.Type || currentSubscription.type}</span>
                                    </div>
                                    <div className="sdp-subscription-detail-item">
                                        <span className="sdp-subscription-detail-label">Статус:</span>
                                        <span className={`sdp-subscription-detail-value sdp-subscription-status ${getSubscriptionStatus()}`}>
                                            {getSubscriptionStatus() === 'active' ? 'Активна' : 'Закінчилась'}
                                        </span>
                                    </div>
                                    <div className="sdp-subscription-detail-item">
                                        <span className="sdp-subscription-detail-label">Дата початку:</span>
                                        <span className="sdp-subscription-detail-value">
                                            {formatDate(currentSubscription.StartDate || currentSubscription.startDate)}
                                        </span>
                                    </div>
                                    <div className="sdp-subscription-detail-item">
                                        <span className="sdp-subscription-detail-label">Дійсна до:</span>
                                        <span className="sdp-subscription-detail-value">
                                            {formatDate(currentSubscription.EndDate || currentSubscription.endDate)}
                                        </span>
                                    </div>
                                    <div className="sdp-subscription-detail-item">
                                        <span className="sdp-subscription-detail-label">Ціна:</span>
                                        <span className="sdp-subscription-detail-value">{currentSubscription.Price || currentSubscription.price} грн</span>
                                    </div>
                                </div>
                            </div>

                            {currentSubscription.IsFamilyMember && (
                                <div className="sdp-subscription-details-section">
                                    <h3>Сімейний доступ</h3>
                                    <div className="sdp-subscription-details-grid">
                                        <div className="sdp-subscription-detail-item">
                                            <span className="sdp-subscription-detail-label">Тип доступу:</span>
                                            <span className="sdp-subscription-detail-value">Член сімейної підписки</span>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {currentSubscription.FamilyMembers && currentSubscription.FamilyMembers.length > 0 && (
                                <div className="sdp-subscription-details-section">
                                    <h3>Члени сім'ї</h3>
                                    <div className="sdp-subscription-family-members-list">
                                        {currentSubscription.FamilyMembers.map((member, index) => (
                                            <div key={index} className="sdp-subscription-family-member-item">
                                                <span className="sdp-subscription-member-email">{member.Email}</span>
                                                <span className="sdp-subscription-member-added">Додано: {formatDate(member.AddedAt)}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Дії з підпискою */}
                        <div className="sdp-subscription-actions">
                            {shouldShowRenewButton() && (
                                <button 
                                    className="sdp-subscription-renew-btn"
                                    onClick={handleRenewSubscription}
                                    disabled={loading}
                                >
                                    {loading ? 'Обробка...' : 'Продовжити підписку'}
                                </button>
                            )}
                            
                            {(currentSubscription.Type === 'Family' || currentSubscription.type === 'Family') && 
                            !currentSubscription.IsFamilyMember && (
                                <button 
                                    className="sdp-subscription-manage-family-btn"
                                    onClick={handleManageFamily}
                                >
                                    Керувати членами сім'ї
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Модальне вікно для керування сімейними користувачами */}
            {showFamilyModal && (
                <div className="sdp-family-modal-overlay">
                    <div className="sdp-family-modal">
                        <div className="sdp-family-modal-header">
                            <h3>Керування членами сім'ї</h3>
                            <button 
                                className="sdp-family-modal-close"
                                onClick={handleCloseFamilyModal}
                                disabled={familyLoading}
                            >
                                ×
                            </button>
                        </div>
                        
                        <div className="sdp-family-modal-content">
                            <p className="sdp-family-modal-instruction">
                                Додайте або видаліть email адреси членів сім'ї (максимум 3):
                            </p>
                            
                            <div className="sdp-family-email-inputs">
                                {familyEmails.map((email, index) => (
                                    <div key={index} className="sdp-family-email-input-group">
                                        <input
                                            type="email"
                                            placeholder={`Email члена сім'ї ${index + 1}`}
                                            value={email}
                                            onChange={(e) => handleFamilyEmailChange(index, e.target.value)}
                                            className="sdp-family-email-input"
                                            disabled={familyLoading}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                        
                        <div className="sdp-family-modal-actions">
                            <button
                                className="sdp-family-cancel-btn"
                                onClick={handleCloseFamilyModal}
                                disabled={familyLoading}
                            >
                                Скасувати
                            </button>
                            <button
                                className="sdp-family-save-btn"
                                onClick={handleSaveFamilyMembers}
                                disabled={familyLoading}
                            >
                                {familyLoading ? 'Збереження...' : 'Зберегти'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SubscriptionDetailsPage;