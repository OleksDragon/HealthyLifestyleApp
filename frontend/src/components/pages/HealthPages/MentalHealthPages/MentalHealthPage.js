import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import MentalHealthCard from "../../../elements/Health/MentalHealth/MentalHealthCardLink/MentalHealthCardLink";

import '../../../styles/mental.css'

const MentalHealthPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    
    const handleEmotionDiary = () => {
        navigate(`${location.pathname}/diary`)
    };

    const handleTests = () => {
        console.log("Перехід до тестів");
    };

    const handleBreathing = () => {
        console.log("Перехід до дихальних практик");
    };

    const handleArticles = () => {
        navigate(`${location.pathname}/articles`)
    };

    const handleContactToSpecialist = () => {
        console.log("Перехід на сторінку спеціалістів");
    }

    return (
        <div className="mental-health-container">
            <div className="mental-health-content">
                <div className="mental-health-info">
                    <div className="title">Твій спокій починається тут.</div>
                    <div className="sub-title">Ми зібрали інструменти, які допоможуть залишитись врівноваженим навіть у найстресовіші дні.</div>
                    <div className="info-image">Зображення</div>
                </div>
                <div className="mental-health-card-link">
                    <MentalHealthCard
                        image={<div className="mh-card-image"></div>}
                        title="Щоденник емоцій"
                        buttonText="Почати"
                        onButtonClick={handleEmotionDiary}
                    />
                    <MentalHealthCard
                        image={<div className="card-image"></div>}
                        title="Тести на стан"
                        buttonText="Пройти тест"
                        onButtonClick={handleTests}
                    />
                    <MentalHealthCard
                        image={<div className="card-image"></div>}
                        title="Дихальні практики"
                        buttonText="Обрати практику"
                        onButtonClick={handleBreathing}
                    />
                    <MentalHealthCard
                        image={<div className="card-image"></div>}
                        title="Корисні статті"
                        buttonText="Переглянути статті"
                        onButtonClick={handleArticles}
                    />
                </div>
                <div>
                    <button 
                        className="contact-to-specialist-btn"
                        onButtonClick={handleContactToSpecialist}
                    >
                        Обрати спеціаліста
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MentalHealthPage;