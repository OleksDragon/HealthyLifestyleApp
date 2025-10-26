import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { SUBSCRIPTION_PLANS } from '../../../constants/stripe';
import "../../styles/subscriptionPayment.css";

const SubscriptionPaymentPage = () => {
    const { t } = useTranslation();
    const [familyEmails, setFamilyEmails] = useState(['', '', '']);
    const [emailValidity, setEmailValidity] = useState([true, true, true]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const type = searchParams.get("type") || "family";

    const userId = localStorage.getItem("user-id");
    const token = localStorage.getItem("helth-token");

    const emailRegex =
        /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

    const handleFamilyEmailChange = (index, value) => {
        const newEmails = [...familyEmails];
        newEmails[index] = value;
        setFamilyEmails(newEmails);

        const newValidity = [...emailValidity];
        newValidity[index] = value.trim() === '' || emailRegex.test(value);
        setEmailValidity(newValidity);
    };

    const handleContinueToPayment = async () => {
        const invalidEmails = familyEmails.filter(
        (email, index) => email.trim() !== '' && !emailValidity[index]
        );

        if (invalidEmails.length > 0) {
        alert(t("spp_please_input_correct_email"));
        return;
        }

        if (!userId) {
        alert(t("sp_please_login"));
        return;
        }

        const validEmails = familyEmails.filter(email => email.trim() !== '');

        const priceId = SUBSCRIPTION_PLANS[type];
        if (!priceId) {
        alert(t("spp_uncnown_subsription_type"));
        return;
        }

        try {
        setLoading(true);

        // Отримуємо поточний URL для повернення
        const currentUrl = window.location.href;

        const metadata = {
            plan: type,
            section: 'subscriptions',
            userId: userId,
            familyCount: validEmails.length.toString(),
            familyEmails: JSON.stringify(validEmails)
        };

        const response = await axios.post(
            `${process.env.REACT_APP_API_URL}/api/payments/create-session`,
            {
            paymentType: "subscription",
            priceId: priceId,
            userId: userId,
            cancelUrl: currentUrl,
            metadata: metadata
            },
            {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
            }
        );

        if (!response.data?.url) {
            throw new Error("Stripe session URL не отримано");
        }

        window.location.href = response.data.url;

        } catch (error) {
        console.error("Помилка створення сесії:", error);
        } finally {
        setLoading(false);
        }
    };

    return (
        <div className="spp-subscription-payment-main-page">
            <div className="spp-back-button" onClick={() => navigate('/premium')}>
                <svg width="13" height="25" viewBox="0 0 13 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11 23.0703L3 12.5703L11 2.07031" stroke="white" strokeWidth="4" />
                </svg>
                <span>{t("mp_return_back")}</span>
            </div>

            <div className="spp-family-modal">
                <div
                className={`spp-family-modal-blur ${
                    familyEmails.some(email => email.trim() !== '')
                    ? 'spp-family-modal-blur-active'
                    : ''
                }`}
                ></div>

                <div className="spp-family-modal-content-wrapper">
                <div className="spp-family-modal-content">
                    <h2 style={{ textAlign: "center", color: "white", marginBottom: "15px" }}>
                    {t("spp_family_sub")}
                    </h2>
                    <p className="spp-family-modal-instruction">
                    {t("spp_add_email_addresses_of_family_members")}
                    </p>

                    <div className="spp-family-email-inputs">
                    {familyEmails.map((email, index) => (
                        <div key={index} className="spp-family-email-input-group">
                        <input
                            type="email"
                            placeholder={`${t("sdp_family_member_email")} ${index + 1}`}
                            value={email}
                            onChange={(e) => handleFamilyEmailChange(index, e.target.value)}
                            className={`spp-family-email-input ${
                            email.trim() !== '' ? 'spp-family-email-input-active' : ''
                            } ${
                            !emailValidity[index] && email.trim() !== ''
                                ? 'spp-family-email-input-invalid'
                                : ''
                            }`}
                            disabled={loading}
                            style={{
                            color:
                                emailValidity[index] || email.trim() === ''
                                ? 'var(--white)'
                                : 'red',
                            border:
                                emailValidity[index] || email.trim() === ''
                                ? 'none'
                                : '2px solid red',
                            }}
                        />
                        </div>
                    ))}
                    </div>

                    <div className="spp-family-modal-actions">
                    <button
                        className="spp-family-save-btn"
                        onClick={handleContinueToPayment}
                        disabled={
                        loading ||
                        familyEmails.some(
                            (email, index) =>
                            email.trim() !== '' && !emailValidity[index]
                        )
                        }
                    >
                        {loading ? t("sc_processing") : t("spp_go_to_payment")}
                    </button>
                    </div>
                </div>
                </div>
            </div>
        </div>
    );
};

export default SubscriptionPaymentPage;