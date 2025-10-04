import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import MentalHealthCard from "../../../elements/Health/MentalHealth/MentalHealthCardLink/MentalHealthCardLink";

import '../../../styles/mental.css'

const MentalHealthPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { t } = useTranslation();

    const handleEmotionDiary = () => {
        navigate(`${location.pathname}/diary`)
    };

    const handleTests = () => {
        navigate(`${location.pathname}/mentaltest`)
    };

    const handleBreathing = () => {
        navigate(`${location.pathname}/breathing`)
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
                    <div className="title">{t("mp_mhp_title")}</div>
                    <div className="sub-title">{t("mp_mhp_sub_title")}</div>
                    <div className="info-image">Зображення</div>
                </div>
                <div className="mental-health-card-link">
                    <MentalHealthCard
                        image={<div className="mh-card-image"></div>}
                        title={t("mp_ebp_title")}
                        buttonText={t("mp_btn_start")}
                        onButtonClick={handleEmotionDiary}
                    />
                    <MentalHealthCard
                        image={<div className="card-image"></div>}
                        title={t("mp_mhp_test_card_title")}
                        buttonText={t("mp_mhp_test_card_btn_text")}
                        onButtonClick={handleTests}
                    />
                    <MentalHealthCard
                        image={<div className="card-image"></div>}
                        title={t("mp_mhp_breathing_card_title")}
                        buttonText={t("mp_mhp_breathing_card_btn_text")}
                        onButtonClick={handleBreathing}
                    />
                    <MentalHealthCard
                        image={<div className="card-image"></div>}
                        title={t("mp_mhp_articles_card_title")}
                        buttonText={t("mp_mhp_articles_card_btn_text")}
                        onButtonClick={handleArticles}
                    />
                </div>
                <div>
                    <button 
                        className="contact-to-specialist-btn"
                        onButtonClick={handleContactToSpecialist}
                    >
                        {t("mp_mhp_choose_specialist")}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MentalHealthPage;