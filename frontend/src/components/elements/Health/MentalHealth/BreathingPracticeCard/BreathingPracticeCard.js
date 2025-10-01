import React from 'react';
import './BreathingPracticeCard.css';

const BreathingPracticeCard = ({ title, descriptions = [], onButtonClick }) => {
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
                    Почнемо?
                </button>
            </div>
        </div>
    );
};

export default BreathingPracticeCard;