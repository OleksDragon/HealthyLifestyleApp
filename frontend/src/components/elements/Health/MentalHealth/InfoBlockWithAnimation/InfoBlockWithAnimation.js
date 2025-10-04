import React from 'react';
import Lottie from 'lottie-react';
import './InfoBlockWithAnimation.css';

const InfoBlockWithAnimation = ({ 
    title, 
    subtitle,
    description, 
    descriptions = [], 
    animationData,
    containerHeight = "206px",
    animationWidth = "315px",
    animationHeight = "315px"
}) => {
    const descriptionLines = descriptions.length > 0 
        ? descriptions 
        : (description ? [description] : []);

    return (
        <div 
            className='bp-animation-container-transparent'
            style={{ height: containerHeight }}
        >
            <div className="bp-info-block-with-animation">
                <div className="bp-info-block-content">
                    <div className="bp-info-block-text">
                        <h2 className="bp-info-block-title">
                            {title}
                        </h2>
                        <h4 className="bp-info-block-subtitle">
                            {subtitle}
                        </h4>
                        <div className="bp-info-block-descriptions">
                            {descriptionLines.map((line, index) => (
                                <p key={index} className="bp-info-block-description">
                                    {line}
                                </p>
                            ))}
                        </div>
                    </div>
                    <div className="bp-info-block-animation">
                        <Lottie 
                            animationData={animationData}
                            loop={true}
                            autoplay={true}
                            className="bp-animation-element"
                            style={{
                                width: animationWidth,
                                height: animationHeight
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InfoBlockWithAnimation;