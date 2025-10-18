import React, { useState, useEffect, useCallback, useRef } from 'react';
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

    // Додаємо реф для контейнера
    const wrapperRef = useRef(null);

    const userId = localStorage.getItem("user-id");
    const token = localStorage.getItem("helth-token");

    // Ефект для прокрутки при зміні стану showHistory
    useEffect(() => {
        if (wrapperRef.current) {
            if (showHistory) {
                // Прокручуємо вниз при розкритті
                setTimeout(() => {
                    wrapperRef.current.scrollTo({
                        top: wrapperRef.current.scrollHeight,
                        behavior: 'smooth'
                    });
                }, 500); // Невелика затримка для того, щоб контент встиг відрендеритись
            } else {
                // Прокручуємо вгору при закритті
                wrapperRef.current.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }
        }
    }, [showHistory]);

    // Отримання поточної підписки
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
    }, [userId, token, fetchCurrentSubscription]);

    const plans = [
        {
            id: 'basic',
            title: 'Базова',
            duration: '/ 30 днів',
            price: '5$',
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
            price: '15$',
            features: [
                'Курси',
                'Індивідуальні плани'
            ],
            type: 'premium'
        },
        {
            id: 'family',
            title: 'Сімейна',
            duration: '/ 30 днів',
            price: '25$',
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

        navigate(`/premium/payment?type=${plan.id}`);
    };

    const handleViewDetails = () => {
        navigate("/premium/details")
    };

    const hasActiveSubscription = () => {
        if (!currentSubscription) return false;
        return currentSubscription.Status === 'Active';
    };

    const getCurrentSubscriptionType = () => {
        if (!currentSubscription || !hasActiveSubscription()) return null;
        return currentSubscription.Type || currentSubscription.type;
    };

    const isPlanActive = (planType) => {
        const currentType = getCurrentSubscriptionType();
        if (!currentType) return false;
        
        const normalizedPlanType = planType.toLowerCase();
        const normalizedCurrentType = currentType.toLowerCase();
        
        return normalizedPlanType === normalizedCurrentType;
    };

    const handleToggleHistory = () => {
        const newShowHistory = !showHistory;
        setShowHistory(newShowHistory);
        
        if (newShowHistory && subscriptionHistory.length === 0) {
            fetchSubscriptionHistory();
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('uk-UA', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };

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

            {/* Додаємо ref до контейнера */}
            <div className='sp-subscription-wraper' ref={wrapperRef}>
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
                            {/* Додаємо блюр для основного контейнера */}
                            <div className="sp-subscription-history-blur"></div>
                            
                            <button 
                                className="sp-subscription-history-toggle"
                                onClick={handleToggleHistory}
                            >
                                <span className="sp-subscription-history-label">Історія підписок</span>
                                <span className={`sp-subscription-history-arrow ${showHistory ? 'sp-subscription-history-arrow-up' : 'sp-subscription-history-arrow-down'}`}>
                                    <img src={arrow_v_white} alt="arrow" />
                                </span>
                            </button>
                            
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
                                                            {/* Додаємо блюр фон */}
                                                            <div className="sp-subscription-history-item-blur"></div>
                                                            
                                                            {/* Контент поверх блюру */}
                                                            <div className="sp-subscription-history-item-content">
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
                                                                
                                                                {subscription.FamilyMembers && subscription.FamilyMembers.length > 0 && (
                                                                    <div className="sp-subscription-family-members">
                                                                        <div className="sp-subscription-family-title">Додані користувачі</div>
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