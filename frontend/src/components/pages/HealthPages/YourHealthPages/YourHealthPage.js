import React from 'react';
import Lottie from 'lottie-react';
import animationData from '../../../../assets/animation/mascot.json';

const YourHealthPage = () => {
    return (
        <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center',
            height: '100vh' 
        }}>
            <Lottie 
                animationData={animationData}
                loop={true}
                autoplay={true}
                style={{ marginTop: -100, width: 800, height: 700 }}
            />
        </div>
    );
}

export default YourHealthPage;