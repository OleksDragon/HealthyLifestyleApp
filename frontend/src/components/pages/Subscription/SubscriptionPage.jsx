import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import SubscriptionCard from '../../elements/Subscription/SubscriptionCard/SubscriptionCard';
import arrow_v_white from "../../../assets/profile-icons/arrow_v_white.svg";
import "../../styles/subscription.css";

const SubscriptionPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { t } = useTranslation();

    const [currentSubscription, setCurrentSubscription] = useState(null);
    const [loading, setLoading] = useState(true);
    const [subscriptionHistory, setSubscriptionHistory] = useState([]);
    const [showHistory, setShowHistory] = useState(false);
    const [historyLoading, setHistoryLoading] = useState(false);

    const userId = localStorage.getItem("user-id");
    const token = localStorage.getItem("helth-token");

    // Отримання поточної підписки (useCallback для стабільної функції)
    const fetchCurrentSubscription = useCallback(async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_API_URL}/api/Subscription/check/${userId}`,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );
            
            console.log(response.data)

            if (response.data && typeof response.data === 'object') {
                setCurrentSubscription(response.data);
            } else {
                setCurrentSubscription(null);
            }
        } catch (error) {
            console.error("Помилка при отриманні підписки:", error);
            setCurrentSubscription(null);
        } finally {
            setLoading(false);
        }
    }, [userId, token]);

    // Отримання історії підписок
    const fetchSubscriptionHistory = async () => {
        if (!userId || !token) return;
        
        try {
            setHistoryLoading(true);
            const response = await axios.get(
                `${process.env.REACT_APP_API_URL}/api/Subscription/${userId}`,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );
            
            if (response.data && Array.isArray(response.data)) {
                // Сортуємо історію в зворотньому порядку (новіші спочатку)
                const sortedHistory = response.data.sort((a, b) => 
                    new Date(b.CreatedAt || b.StartDate) - new Date(a.CreatedAt || a.StartDate)
                );
                setSubscriptionHistory(sortedHistory);
            } else {
                setSubscriptionHistory([]);
            }
        } catch (error) {
            console.error("Помилка при отриманні історії підписок:", error);
            setSubscriptionHistory([]);
        } finally {
            setHistoryLoading(false);
        }
    };

    useEffect(() => {
        if (userId && token) {
            fetchCurrentSubscription();
        } else {
            setLoading(false);
        }
    }, [userId, token, fetchCurrentSubscription]); // Додано fetchCurrentSubscription в залежності

    const plans = [
        {
            id: 'basic',
            title: 'Базова',
            duration: '/ 30 днів',
            price: '250 грн',
            features: [
                'Трекери',
                'Базова аналітика'
            ],
            type: 'basic'
        },
        {
            id: 'premium',
            title: 'Преміум',
            duration: '/ 30 днів',
            price: '600 грн',
            features: [
                'ШІ-рекомендації',
                'Курси',
                'Індивідуальні плани'
            ],
            type: 'premium'
        },
        {
            id: 'family',
            title: 'Сімейна',
            duration: '/ 30 днів',
            price: '1000 грн',
            features: [
                'Всі можливості "Преміум" підписки',
                'Можливість надання доступу 3-м користувачам'
            ],
            type: 'family'
        }
    ];

    const handleChoosePlan = (plan) => {
        if (hasActiveSubscription()) {
            alert('У вас вже є активна підписка');
            return;
        }

        // Перенаправляємо на сторінку оплати з типом підписки
        navigate(`/premium/payment?type=${plan.id}`);
    };

    const handleViewDetails = () => {
        navigate("/premium/details")
    };

    // Перевіряємо чи є активна підписка (Status: "Active")
    const hasActiveSubscription = () => {
        if (!currentSubscription) return false;
        return currentSubscription.Status === 'Active';
    };

    // Отримуємо тип поточної активної підписки
    const getCurrentSubscriptionType = () => {
        if (!currentSubscription || !hasActiveSubscription()) return null;
        return currentSubscription.Type || currentSubscription.type;
    };

    // Перевіряємо чи конкретна картка є активною підпискою
    const isPlanActive = (planType) => {
        const currentType = getCurrentSubscriptionType();
        if (!currentType) return false;
        
        // Приводимо типи до одного формату для порівняння
        const normalizedPlanType = planType.toLowerCase();
        const normalizedCurrentType = currentType.toLowerCase();
        
        return normalizedPlanType === normalizedCurrentType;
    };

    // Обробник для перемикача історії
    const handleToggleHistory = () => {
        const newShowHistory = !showHistory;
        setShowHistory(newShowHistory);
        
        if (newShowHistory && subscriptionHistory.length === 0) {
            fetchSubscriptionHistory();
        }
    };

    // Форматування дати
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('uk-UA', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };

    // Отримання статусу підписки з класом для стилізації
    const getStatusInfo = (status) => {
        switch (status) {
            case 'Active':
                return { class: 'active', text: 'Активна' };
            case 'Expired':
                return { class: 'expired', text: 'Закінчилась' };
            case 'Canceled':
                return { class: 'cancelled', text: 'Скасована' };
            default:
                return { class: 'unknown', text: status };
        }
    };

    if (loading) {
        return (
            <div className="sp-subscription-page">
                <div className="sp-subscription-loading">Завантаження...</div>
            </div>
        );
    }

    return (
        <div className="sp-subscription-page">
            {/* Заголовок сторінки */}
            <div className="sp-subscription-health-info">
                <div className="sp-subscription-title">Інвестуйте в себе</div>
                <div className="sp-subscription-sub-title">Ваш найкращий проект — це ви. Давайте реалізуємо його разом.</div>
                <div className="sp-subscription-info-image">Зображення</div>
            </div>

            <div className='sp-subscription-wraper'>
                <div className='sp-subscription-main-container'>
                    {/* Карточки тарифних планів */}
                <div className="sp-subscription-section">
                    <div className="sp-subscription-container">
                        {plans.map((plan) => (
                            <SubscriptionCard
                                key={plan.id}
                                plan={plan}
                                onChoosePlan={handleChoosePlan}
                                isActive={isPlanActive(plan.type)}
                                hasActiveSubscription={hasActiveSubscription()}
                                onViewDetails={handleViewDetails}
                            />
                        ))}
                    </div>
                </div>

                {/* Блок історії підписок */}
                <div className="sp-subscription-history-section">
                    <div className={`sp-subscription-history-container ${showHistory ? 'sp-subscription-history-container-expanded' : ''}`}>
                        {/* Кнопка для розгортання/згортання */}
                        <button 
                            className="sp-subscription-history-toggle"
                            onClick={handleToggleHistory}
                        >
                            <span className="sp-subscription-history-label">Історія підписок</span>
                            <span className={`sp-subscription-history-arrow ${showHistory ? 'sp-subscription-history-arrow-up' : 'sp-subscription-history-arrow-down'}`}>
                                <img src={arrow_v_white} alt="arrow" />
                            </span>
                        </button>
                        
                        {/* Контент історії */}
                        <div className="sp-subscription-history-content">
                            <div className="sp-subscription-history-inner">
                                <div className='sp-subscription-h-wrapper'>
                                    {historyLoading ? (
                                    <div className="sp-subscription-history-loading">Завантаження історії...</div>
                                    ) : subscriptionHistory.length > 0 ? (
                                        <div className="sp-subscription-history-list">
                                            {subscriptionHistory.map((subscription) => {
                                                const statusInfo = getStatusInfo(subscription.Status);
                                                return (
                                                    <div key={subscription.Id} className="sp-subscription-history-item">
                                                        <div className="sp-subscription-history-main">
                                                            <div className="sp-subscription-history-type">
                                                                <strong>{subscription.Type}</strong>
                                                                <span className={`sp-subscription-status sp-subscription-status-${statusInfo.class}`}>
                                                                    {statusInfo.text}
                                                                </span>
                                                            </div>
                                                            <div className="sp-subscription-history-dates">
                                                                <span>{formatDate(subscription.StartDate)} - {formatDate(subscription.EndDate)}</span>
                                                            </div>
                                                            <div className="sp-subscription-history-price">
                                                                {subscription.Price > 0 ? `${subscription.Price} грн` : 'Безкоштовно'}
                                                            </div>
                                                        </div>
                                                        
                                                        {/* Інформація про сімейних користувачів */}
                                                        {subscription.FamilyMembers && subscription.FamilyMembers.length > 0 && (
                                                            <div className="sp-subscription-family-members">
                                                                <div className="sp-subscription-family-title">Додані користувачі:</div>
                                                                <div className="sp-subscription-family-list">
                                                                    {subscription.FamilyMembers.map((member, index) => (
                                                                        <div key={index} className="sp-subscription-family-member">
                                                                            <span className="sp-subscription-family-email">{member.Email}</span>
                                                                            <span className="sp-subscription-family-date">
                                                                                додано {formatDate(member.AddedAt)}
                                                                            </span>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    ) : (
                                        <div className="sp-subscription-history-empty">
                                            У вас ще немає історії підписок
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
    );
};

export default SubscriptionPage;