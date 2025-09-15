import React from "react";

import './MentalHealthCardLink.css'

const MentalHealthCard = ({ image, title, buttonText, onButtonClick }) => {
    return (
        <div className="m-card-link">
            <div className="card-image">
                {image}
            </div>
            <div className="title">{title}</div>
            <div className="option-link">
                <button 
                    className="option-link-btn" 
                    onClick={onButtonClick}
                >
                    {buttonText}
                </button>
            </div>
        </div>
    );
};

export default MentalHealthCard;