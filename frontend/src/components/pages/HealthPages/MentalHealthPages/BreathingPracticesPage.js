import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import animationData from "../../../../assets/animation/mascot_breathing.json";
import BreathingPracticeCard from "../../../elements/Health/MentalHealth/BreathingPracticeCard/BreathingPracticeCard";
import InfoBlockWithAnimation from "../../../elements/Health/MentalHealth/InfoBlockWithAnimation/InfoBlockWithAnimation";
import '../../../styles/breathingPractices.css';

const BreathingPracticesPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { t } = useTranslation();
    
    const handleDiaphragmaticBreathing = () => {
        navigate(`${location.pathname}/diaphragmatic`);
    };

    const handleSquareBreathing = () => {
        navigate(`${location.pathname}/square`);
    };

    const handleNadiShodhana = () => {
        navigate(`${location.pathname}/nadishodhana`)
    };

    const infoBlockContent = {
        title: t("mp_bpp_title"),
        subtitle: t("mp_bpp_subtitle"),
        descriptions: [
            t("mp_bpp_description_1"),
            t("mp_bpp_description_2")
        ],
        animationData: animationData
    };

    return (
        <div className="bp-breathing-practices-container">
            <div className="bp-breathing-practices-content">
                <InfoBlockWithAnimation {...infoBlockContent} />
                
                <div className="bp-breathing-practices-cards">
                    <BreathingPracticeCard
                        title={t("mp_bpp_card_title_1")}
                        descriptions={[
                            t("mp_bpp_card_description_1_1"),
                            t("mp_bpp_card_description_1_2")
                        ]}
                        onButtonClick={handleDiaphragmaticBreathing}
                    />
                    <BreathingPracticeCard
                        title={t("mp_bpp_card_title_2")}
                        descriptions={[
                            t("mp_bpp_card_description_2_1")
                        ]}
                        onButtonClick={handleSquareBreathing}
                    />
                    <BreathingPracticeCard
                        title={t("mp_bpp_card_title_3")}
                        descriptions={[
                            t("mp_bpp_card_description_3_1"),
                            t("mp_bpp_card_description_3_2"),
                            t("mp_bpp_card_description_3_3")
                        ]}
                        onButtonClick={handleNadiShodhana}
                    />
                </div>
            </div>
        </div>
    );
};

export default BreathingPracticesPage;