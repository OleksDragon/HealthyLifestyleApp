import React from 'react';
import './SubscriptionCard.css';

const SubscriptionCard = ({ plan, onChoosePlan, isActive, hasActiveSubscription, onViewDetails }) => {
    const handleButtonClick = () => {
        if (isActive) {
            onViewDetails();
        } else {
            onChoosePlan(plan);
        }
    };

    const getButtonText = () => {
        if (isActive) {
            return 'Активна';
        }
        if (hasActiveSubscription) {
            return 'Обрати';
        }
        return 'Обрати';
    };

    const isButtonDisabled = () => {
        return hasActiveSubscription && !isActive;
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
                className="sp-sc-subscription-btn"
                onClick={handleButtonClick}
                disabled={isButtonDisabled()}
            >
                {getButtonText()}
            </button>
        </div>
    );
};

export default SubscriptionCard;