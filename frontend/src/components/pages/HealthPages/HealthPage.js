import React from 'react';
import Lottie from 'lottie-react';
import health_nomi from "../../../assets/animation/health_nomi.json"
import health_n_text from "../../../assets/animation/health_n_text.json"
import "../../styles/health.css"

const HealthPages = () => {
    return(
        <div className="hp-health-container">
            <Lottie 
                animationData={health_nomi}
                loop={true}
                autoplay={true}
                className="hp-health-animation-element-nomi"
                style={{
                    width: 700,
                    height: 550
                }}
            />
            <Lottie 
                animationData={health_n_text}
                loop={false}
                autoplay={true}
                className="hp-health-animation-element-text"
                style={{
                    width: 500,
                    height: 400
                }}
            />
        </div>
    );
}

export default HealthPages;
