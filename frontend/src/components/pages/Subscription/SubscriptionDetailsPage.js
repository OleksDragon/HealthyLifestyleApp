import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import "../../styles/subscriptionDetails.css";

const SubscriptionDetailsPage = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [currentSubscription, setCurrentSubscription] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showFamilyModal, setShowFamilyModal] = useState(false);
    const [familyEmails, setFamilyEmails] = useState(['', '', '']);
    const [familyLoading, setFamilyLoading] = useState(false);
    const [emailValidity, setEmailValidity] = useState([true, true, true]);

    const userId = localStorage.getItem("user-id");
    const token = localStorage.getItem("helth-token");

    // Регулярний вираз для перевірки email
    const emailRegex = useMemo(() => /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
    []);

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
                        // Встановлюємо валідність для заповнених email
                        const validity = emails.map(email => 
                            email.trim() === '' || emailRegex.test(email)
                        );
                        setEmailValidity(validity);
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
    }, [userId, token, emailRegex]);

    // Функції для роботи з підпискою
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
            
            // Якщо сервер повертає помилку, але з даними про notFoundEmails
            if (error.response?.data?.NotFoundEmails) {
                return error.response.data;
            }
            throw error;
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

        // Перевіряємо валідність email
        const newValidity = [...emailValidity];
        newValidity[index] = value.trim() === '' || emailRegex.test(value);
        setEmailValidity(newValidity);
    };

    const handleSaveFamilyMembers = async () => {
        if (!currentSubscription) return;

        // Перевіряємо чи всі заповнені email валідні
        const invalidEmails = familyEmails.filter((email, index) => 
            email.trim() !== '' && !emailValidity[index]
        );

        if (invalidEmails.length > 0) {
            alert(t("spp_please_input_correct_email"));
            return;
        }

        try {
            setFamilyLoading(true);
            const validEmails = familyEmails.filter(email => email.trim() !== '');
            
            const result = await updateFamilyMembers(
                currentSubscription.Id || currentSubscription.id, 
                validEmails
            );
            
            console.log(result.NotFoundEmails);

            // Перевіряємо чи є користувачі, яких не вдалося додати
            if (result.NotFoundEmails && result.NotFoundEmails.length > 0) {
                const errorMessages = result.NotFoundEmails.map(email => {
                    if (email.includes('вже має активну підписку')) {
                        return `${email.split(' ')[0]} - ${t("sdp_already_have_active_sub")}`;
                    } else if (email.includes('вже є членом іншої сімейної підписки')) {
                        return `${email.split(' ')[0]} - ${t("sdp_already_a_member_of_another_family_subscription")}`;
                    } else if (email.includes('це власник підписки')) {
                        return `${email.split(' ')[0]} - ${t("sdp_this_is_the_subscription_owner")}`;
                    } else {
                        return `${email} - ${t("sdp_user_not_found")}`;
                    }
                });
                
                alert(`${t("sdp_some_users_could_not_be_added")}:\n${errorMessages.join('\n')}`);
                
                // Оновлюємо стан валідності для проблемних email
                const newValidity = [...emailValidity];
                familyEmails.forEach((email, index) => {
                    if (email.trim() !== '' && result.NotFoundEmails.some(notFound => 
                        notFound.includes(email) || notFound.split(' ')[0] === email)) {
                        newValidity[index] = false;
                    }
                });
                setEmailValidity(newValidity);
                
            } else {
                // Оновлюємо дані підписки тільки якщо не було помилок
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
                alert(t("sdp_family_member_list_successfully_updated"));
            }
            
        } catch (error) {
            alert(t("sdp_error_updating_family_users") + (error.response?.data || error.message));
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
                <div className="sdp-subscription-loading">{t("sp_loading")}</div>
            </div>
        );
    }

    if (!currentSubscription) {
        return (
            <div className="sdp-subscription-details-page-no-item">
                <div className="sdp-subscription-no-subscription">
                    <h2>{t("sdp_subscription_not_found")}</h2>
                    <button onClick={() => navigate('/premium')} className="sdp-subscription-back-btn">
                        {t("sdp_return_to_tariffs")}
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
                <span>{t("mp_return_back")}</span>
            </div>

            <div className="sdp-subscription-details-page">                
                <div className="sdp-subscription-details">
                    {/* Об'єднаний блок інформації про підписку */}                    
                    <div className="sdp-subscription-details-card">
                        <div className="sdp-subscription-card-blur"></div>
                        <div className="sdp-subscription-card-content">
                            <h2>{t("sdp_your_current_subscription")}</h2>
                            
                            <div className="sdp-subscription-details-content">
                                <div className='sdp-subscription-details-content-wrapper'>
                                    {/* Основна інформація про підписку */}
                                    <div className="sdp-subscription-details-section">
                                        <div className="sdp-subscription-section-blur"></div>
                                        <div className="sdp-subscription-section-content">
                                            <div className="sdp-subscription-details-grid">
                                                <div className="sdp-subscription-detail-item">
                                                    <span className="sdp-subscription-detail-label">{t("sdp_subscription_type")}</span>
                                                    <span className="sdp-subscription-detail-value">{currentSubscription.Type || currentSubscription.type}</span>
                                                </div>
                                                <div className="sdp-subscription-detail-item">
                                                    <span className="sdp-subscription-detail-label">{t("sdp_subscription_status")}</span>
                                                    <span className={`sdp-subscription-detail-value sdp-subscription-status ${getSubscriptionStatus()}`}>
                                                        {getSubscriptionStatus() === 'active' ? t("sp_active") : t("sp_expired")}
                                                    </span>
                                                </div>
                                                <div className="sdp-subscription-detail-item">
                                                    <span className="sdp-subscription-detail-label">{t("sdp_subscription_start_date")}</span>
                                                    <span className="sdp-subscription-detail-value">
                                                        {formatDate(currentSubscription.StartDate || currentSubscription.startDate)}
                                                    </span>
                                                </div>
                                                <div className="sdp-subscription-detail-item">
                                                    <span className="sdp-subscription-detail-label">{t("sdp_subscription_end_date")}</span>
                                                    <span className="sdp-subscription-detail-value">
                                                        {formatDate(currentSubscription.EndDate || currentSubscription.endDate)}
                                                    </span>
                                                </div>
                                                <div className="sdp-subscription-detail-item">
                                                    <span className="sdp-subscription-detail-label">{t("sdp_subscription_price")}</span>
                                                    <span className="sdp-subscription-detail-value">{currentSubscription.Price || currentSubscription.price} $</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Сімейний доступ */}
                                    {currentSubscription.IsFamilyMember && (
                                        <div className="sdp-subscription-details-section">
                                            <div className="sdp-subscription-section-blur"></div>
                                            <div className="sdp-subscription-section-content">
                                                <h3>{t("sdp_subscription_section_content")}</h3>
                                                <div className="sdp-subscription-details-grid">
                                                    <div className="sdp-subscription-detail-item">
                                                        <span className="sdp-subscription-detail-label">{t("sdp_subscription_detail_label")}</span>
                                                        <span className="sdp-subscription-detail-value">{t("sdp_subscription_detail_value")}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Члени сім'ї - показуємо тільки для ВЛАСНИКІВ сімейної підписки */}
                                    {currentSubscription.FamilyMembers && 
                                    currentSubscription.FamilyMembers.length > 0 && 
                                    !currentSubscription.IsFamilyMember && (
                                        <div className="sdp-subscription-details-section">
                                            <div className="sdp-subscription-section-blur"></div>
                                            <div className="sdp-subscription-section-content">
                                                <h3>{t("sdp_subscription_section_content_title")}</h3>
                                                <div className="sdp-subscription-family-members-list">
                                                    {currentSubscription.FamilyMembers.map((member, index) => (
                                                        <div key={index} className="sdp-subscription-family-member-item">
                                                            <div className="sdp-family-member-blur"></div>
                                                            <div className="sdp-family-member-content">
                                                                <span className="sdp-subscription-member-email">{member.Email}</span>
                                                                <span className="sdp-subscription-member-added">{t("sdp_subscription_member_added")} {formatDate(member.AddedAt)}</span>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                            
                            {/* Дії з підпискою - показуємо тільки для ВЛАСНИКІВ підписки */}
                            {!currentSubscription.IsFamilyMember && (
                                <div className="sdp-subscription-actions">
                                    {/* Керувати членами сім'ї - тільки для сімейної підписки */}
                                    {(currentSubscription.Type === 'Family' || currentSubscription.type === 'Family') && (
                                        <button 
                                            className="sdp-subscription-manage-family-btn"
                                            onClick={handleManageFamily}
                                        >
                                            {t("sdp_subscription_manage_family_btn")}
                                        </button>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Модальне вікно для керування сімейними користувачами */}
            {showFamilyModal && (
                <div className="sdp-family-modal-overlay">
                    <div className="sdp-family-modal-backdrop-blur"></div>
                    <div className="sdp-family-modal">
                        <div className={`sdp-family-modal-blur ${familyEmails.some(email => email.trim() !== '') ? 'sdp-family-modal-blur-active' : ''}`}></div>
                        <div className="sdp-family-modal-content-wrapper">
                            <div className="sdp-family-modal-content">
                                <p className="sdp-family-modal-instruction">
                                    {t("sdp_family_modal_instruction")}
                                </p>
                                
                                <div className="sdp-family-email-inputs">
                                    {familyEmails.map((email, index) => (
                                        <div key={index} className="sdp-family-email-input-group">
                                            <input
                                                type="email"
                                                placeholder={`${t("sdp_family_member_email")} ${index + 1}`}
                                                value={email}
                                                onChange={(e) => handleFamilyEmailChange(index, e.target.value)}
                                                className={`sdp-family-email-input ${email.trim() !== '' ? 'sdp-family-email-input-active' : ''} ${!emailValidity[index] && email.trim() !== '' ? 'sdp-family-email-input-invalid' : ''}`}
                                                disabled={familyLoading}
                                                style={{
                                                    color: emailValidity[index] || email.trim() === '' ? 'var(--white)' : 'red',
                                                    border: emailValidity[index] || email.trim() === '' ? 'none' : '2px solid red'
                                                }}
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
                                    {t("mp_btn_cancel")}
                                </button>
                                <button
                                    className="sdp-family-save-btn"
                                    onClick={handleSaveFamilyMembers}
                                    disabled={familyLoading || familyEmails.some((email, index) => email.trim() !== '' && !emailValidity[index])}
                                >
                                    {familyLoading ? t("sdp_sub_saving") : t("mp_btn_save")}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SubscriptionDetailsPage;