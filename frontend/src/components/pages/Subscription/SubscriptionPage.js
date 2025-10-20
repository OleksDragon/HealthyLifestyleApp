import React, { useState, useEffect, useCallback, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import SubscriptionCard from '../../elements/Subscription/SubscriptionCard/SubscriptionCard';
import arrow_v_white from "../../../assets/profile-icons/arrow_v_white.svg";
import { SUBSCRIPTION_PLANS } from '../../../constants/stripe';
import "../../styles/subscription.css";

const SubscriptionPage = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();

    const [currentSubscription, setCurrentSubscription] = useState(null);
    const [loading, setLoading] = useState(true);
    const [subscriptionHistory, setSubscriptionHistory] = useState([]);
    const [showHistory, setShowHistory] = useState(false);
    const [historyLoading, setHistoryLoading] = useState(false);
    const [paymentLoading, setPaymentLoading] = useState(null);

    const wrapperRef = useRef(null);

    const userId = localStorage.getItem("user-id");
    const token = localStorage.getItem("helth-token");

    // Ефект для прокрутки
    useEffect(() => {
        if (wrapperRef.current) {
            if (showHistory) {
                setTimeout(() => {
                    wrapperRef.current.scrollTo({
                        top: wrapperRef.current.scrollHeight,
                        behavior: 'smooth'
                    });
                }, 500);
            } else {
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

    // Миттєва оплата для Basic/Premium
    const handleInstantPayment = async (plan) => {
        if (hasActiveSubscription()) {
            alert(t("sp_you_already_have_active_subscription"));
            return;
        }

        if (!userId) {
            alert(t("sp_please_login"));
            return;
        }

        try {
            setPaymentLoading(plan.id); // Включаємо індикатор для конкретного плану

            const priceId = SUBSCRIPTION_PLANS[plan.id];

            // Отримуємо поточний URL для повернення
            const currentUrl = window.location.href;
            
            const response = await axios.post(
                `${process.env.REACT_APP_API_URL}/api/payments/create-session`,
                {
                    priceId: priceId,
                    paymentType: 'subscription',
                    userId: userId, // для бекенду
                    cancelUrl: currentUrl,
                    metadata: {     // для Stripe
                        plan: plan.id,
                        section: 'subscriptions',
                        userId: userId
                    }
                },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            // Миттєвий redirect до Stripe Checkout
            window.location.href = response.data.url;
            
        } catch (error) {
            console.error('Помилка створення підписки:', error);
        } finally {
            setPaymentLoading(null);
        }
    };

    const handleChoosePlan = (plan) => {
        if (plan.id === 'family') {
            // Для Family - перехід на сторінку з формою
            navigate(`/premium/payment?type=${plan.id}`);
        } else {
            // Для Basic/Premium - миттєва оплата
            handleInstantPayment(plan);
        }
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
                return { class: 'active', text: t("sp_active") };
            case 'Expired':
                return { class: 'expired', text: t("sp_expired") };
            case 'Canceled':
                return { class: 'cancelled', text: t("sp_cancelled") };
            default:
                return { class: 'unknown', text: status };
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
            title: t("sp_basic_title"),
            duration: t("sp_duration"),
            price: '5$',
            features: [
                t("sp_basic_features_1"),
                t("sp_basic_features_2")
            ],
            type: 'basic'
        },
        {
            id: 'premium',
            title: t("sp_premium_title"),
            duration: t("sp_duration"),
            price: '15$',
            features: [
                t("sp_premium_features_1"),
                t("sp_premium_features_2")
            ],
            type: 'premium'
        },
        {
            id: 'family',
            title: t("sp_family_title"),
            duration: t("sp_duration"),
            price: '25$',
            features: [
                t("sp_family_features_1"),
                t("sp_family_features_2")
            ],
            type: 'family'
        }
    ];

    if (loading) {
        return (
            <div className="sp-subscription-page">
                <div className="sp-subscription-loading">{t("sp_loading")}</div>
            </div>
        );
    }

    return (
        <div className="sp-subscription-page">
            {/* Заголовок сторінки */}
            <div className="sp-subscription-health-info">
                <div className="sp-subscription-title">{t("sp_subscription_title")}</div>
                <div className="sp-subscription-sub-title">{t("sp_subscription_sub_title")}</div>
                <div className="sp-subscription-info-image">Зображення</div>
            </div>

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
                                    isLoading={paymentLoading === plan.id} // Передаємо стан завантаження
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
                                <span className="sp-subscription-history-label">{t("sp_subscription_history_label")}</span>
                                <span className={`sp-subscription-history-arrow ${showHistory ? 'sp-subscription-history-arrow-up' : 'sp-subscription-history-arrow-down'}`}>
                                    <img src={arrow_v_white} alt="arrow" />
                                </span>
                            </button>
                            
                            <div className="sp-subscription-history-content">
                                <div className="sp-subscription-history-inner">
                                    <div className='sp-subscription-h-wrapper'>
                                        {historyLoading ? (
                                        <div className="sp-subscription-history-loading">{t("sp_subscription_history_loading")}</div>
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
                                                                        {subscription.Price > 0 ? `${subscription.Price} $` : t("sp_subscription_history_price")}
                                                                    </div>
                                                                </div>
                                                                
                                                                {subscription.FamilyMembers && subscription.FamilyMembers.length > 0 && (
                                                                    <div className="sp-subscription-family-members">
                                                                        <div className="sp-subscription-family-title">{t("sp_subscription_family_title")}</div>
                                                                        <div className="sp-subscription-family-list">
                                                                            {subscription.FamilyMembers.map((member, index) => (
                                                                                <div key={index} className="sp-subscription-family-member">
                                                                                    <span className="sp-subscription-family-email">{member.Email}</span>
                                                                                    <span className="sp-subscription-family-date">
                                                                                        {t("sp_subscription_family_date")} {formatDate(member.AddedAt)}
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
                                                {t("sp_subscription_history_empty")}
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
