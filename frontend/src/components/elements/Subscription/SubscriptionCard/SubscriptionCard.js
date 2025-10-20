import React from 'react';
import { useTranslation } from 'react-i18next';
import './SubscriptionCard.css';

const SubscriptionCard = ({ 
    plan, 
    onChoosePlan, 
    isActive, 
    hasActiveSubscription, 
    onViewDetails,
    isLoading = false
}) => {
    const { t } = useTranslation();

    const handleButtonClick = () => {
        if (isActive) {
            onViewDetails();
        } else {
            onChoosePlan(plan);
        }
    };

    const getButtonText = () => {
        if (isLoading) {
            return t("sc_processing");
        }
        if (isActive) {
            return t("sp_active");
        }
        if (hasActiveSubscription) {
            return t("sc_select");
        }
        return t("sc_select");
    };

    const isButtonDisabled = () => {
        return (hasActiveSubscription && !isActive) || isLoading;
    };

    const getButtonClass = () => {
        let className = "sp-sc-subscription-btn";
        
        if (isLoading) {
            className += " sp-sc-subscription-btn-loading";
        } else if (isActive) {
            className += " sp-sc-subscription-btn-active";
        } else if (hasActiveSubscription && !isActive) {
            className += " sp-sc-subscription-btn-disabled";
        }
        
        return className;
    };

    return (
        <div className="sp-sc-subscription-card">
            <div className="sp-sc-subscription-bg" />
            <div className="sp-sc-subscription-overlay" />
            <div className="sp-sc-subscription-label" />

            <div className="sp-sc-subscription-title">{plan.title}</div>
            <div className="sp-sc-subscription-duration">{plan.duration}</div>

            <div className="sp-sc-subscription-details">
                {plan.features.map((feature, idx) => (
                    <div className="sp-sc-subscription-feature" key={idx}>
                        {feature}
                    </div>
                ))}
            </div>

            <div className="sp-sc-subscription-price">{plan.price}</div>

            <div className="sp-sc-subscription-button-bg" />
            <button 
                className={getButtonClass()}
                onClick={handleButtonClick}
                disabled={isButtonDisabled()}
            >
                {getButtonText()}
            </button>
        </div>
    );
};

export default SubscriptionCard;