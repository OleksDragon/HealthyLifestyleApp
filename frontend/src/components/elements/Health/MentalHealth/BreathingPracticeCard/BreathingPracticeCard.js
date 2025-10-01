import React from 'react';
import { useTranslation } from 'react-i18next';
import './BreathingPracticeCard.css';

const BreathingPracticeCard = ({ title, descriptions = [], onButtonClick }) => {
    const { t } = useTranslation();

    return (
        <div className="bpc-breathing-practice-card">
            <div className="bpc-breathing-card-default">
                <h3 className="bpc-breathing-card-title">{title}</h3>
            </div>
            <div className="bpc-breathing-card-hover">
                <h3 className="bpc-breathing-card-title">{title}</h3>
                <div className="bpc-breathing-card-descriptions">
                    {descriptions.map((desc, index) => (
                        <p 
                            key={index} 
                            className="bpc-breathing-card-description"
                        >
                            {desc}
                        </p>
                    ))}
                </div>
                <button 
                    className="bpc-breathing-card-button"
                    onClick={onButtonClick}
                >
                    {t("mp_btn_lets_start")}
                </button>
            </div>
        </div>
    );
};

export default BreathingPracticeCard;