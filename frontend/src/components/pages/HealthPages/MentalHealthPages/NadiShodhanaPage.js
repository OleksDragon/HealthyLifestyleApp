import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import animationData from "../../../../assets/animation/mascot_breathing.json";
import InfoBlockWithAnimation from "../../../elements/Health/MentalHealth/InfoBlockWithAnimation/InfoBlockWithAnimation";
import '../../../styles/nadiShodhana.css';

const NadiShodhanaPage = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    
    const infoBlockContent = {
        title: t("mp_nsp_title"),
        subtitle: t("mp_nsp_subtitle"),
        descriptions: [
            t("mp_nsp_description_1"),
            t("mp_nsp_description_2")
        ],
        animationData: animationData,
        containerHeight: "185px",
        animationWidth: "300px",
        animationHeight: "300px"
    };

    const handleBackClick = () => {
        navigate('/health/mental/breathing');
    };

    return (
        <div className="ns-breathing-container">
            <div className="ns-back-button" onClick={handleBackClick}>
                <svg width="13" height="25" viewBox="0 0 13 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11 23.0703L3 12.5703L11 2.07031" stroke="white" strokeWidth="4" />
                </svg>
                <span>{t("mp_return_back")}</span>
            </div>
            <div className="ns-breathing-content">
                <div className="ns-breathing-info-block">
                    <InfoBlockWithAnimation {...infoBlockContent} />
                </div>

                <div className="ns-technique-container">
                    <div className="ns-technique-block">
                        <h3 className="ns-technique-title">{t("mp_nsp_technique_title")}</h3>
                        <ol className="ns-technique-steps">
                            <li>{t("mp_nsp_technique_step_1")}</li>
                            <li>{t("mp_nsp_technique_step_2")}</li>
                            <li>{t("mp_nsp_technique_step_3")}</li>
                            <li>{t("mp_nsp_technique_step_4")}</li>
                            <li>{t("mp_nsp_technique_step_5")}</li>
                        </ol>
                    </div>
                    
                    <div className="ns-result-block">
                        <h3 className="ns-result-title">{t("mp_nsp_result_title")}</h3>
                        <div className="ns-result-description">
                            <p><b>{t("mp_nsp_result_description_1")}</b></p>
                            
                            <p>{t("mp_nsp_result_description_2")}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NadiShodhanaPage;