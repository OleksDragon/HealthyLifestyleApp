import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import "../styles/paymentSuccess.css";
import mascotIcon from '../../assets/payment-icons/payment_success.svg';

const PaymentSuccessPage = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();

    useEffect(() => {
        const checkSubscription = async () => {
            try {
                const userId = localStorage.getItem("user-id");
                const token = localStorage.getItem("helth-token");

                if (!userId || !token) {
                    console.log("Не знайдено дані користувача");
                    return;
                }

                localStorage.removeItem("Subscription");

                const subscriptionResponse = await axios.get(
                    process.env.REACT_APP_API_URL + `/api/Subscription/check/${userId}`,
                    {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    }
                );
                
                if (subscriptionResponse.data && typeof subscriptionResponse.data === 'object') {
                    const subscriptionData = {
                        SId: subscriptionResponse.data.Id,
                        OwnerId: subscriptionResponse.data.UserId,
                        Type: subscriptionResponse.data.Type,
                        EndDate: subscriptionResponse.data.EndDate,
                        IsFamilyMember: subscriptionResponse.data.IsFamilyMember
                    };
                    
                    localStorage.setItem("Subscription", JSON.stringify(subscriptionData));
                    console.log("Subscription data saved:", subscriptionData);
                } else {
                    localStorage.removeItem("Subscription");
                    console.log("No active subscription found");
                }
            } catch (subscriptionError) {
                console.log("Помилка при перевірці підписки: ", subscriptionError);
                localStorage.removeItem("Subscription");
            }
        };

        checkSubscription();
    }, []);

    return (
        <div className="ps-payment-success-page">
            <div className="ps-payment-success-container">
                <div className="ps-payment-success-header">
                    <div className="ps-payment-success-mascot">
                        <img src={mascotIcon} alt="Success mascot" className="ps-payment-mascot-image" />
                    </div>
                    <h1 className="ps-payment-success-main-title">{t("ps_payment_success_main_title")}....</h1>
                </div>
                
                <h2 className="ps-payment-success-title">{t("ps_payment_success_title")}!!!!!!</h2>
                
                <p className="ps-payment-success-description">
                    *{t("ps_payment_success_description")}
                </p>
                
            </div>

            <div className="ps-payment-success-actions">
                <button className="ps-payment-success-btn" onClick={() => navigate('/dashboard')}>
                    {t("ps_payment_success_btn")}
                </button>
            </div>
        </div>
    );
};

export default PaymentSuccessPage;