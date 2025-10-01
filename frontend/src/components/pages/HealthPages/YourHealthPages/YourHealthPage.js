import React from 'react';
import { useTranslation } from 'react-i18next';
import activityImg from '../../../../assets/your-health-img/activity.png';
import sleepImg from '../../../../assets/your-health-img/sleep.png';
import nutritionImg from '../../../../assets/your-health-img/nutrition.png';
import nomic from '../../../../assets/health-icons/nomic_with_bandage.svg';
import '../../../styles/yourHealth.css';

const YourHealthPage = () => {
    const { t } = useTranslation();

    return (
        <div className='yh-overflow-container'>
            <div className="yh-your-health-page">
                {/* Жовтий заголовний блок з номіком */}
                <div className="yh-health-header-block">
                    <div className="yh-health-header-content">
                        <div className="yh-health-header-text">
                            <p className="yh-health-main-title">{t("mp_yhp_main_title")}</p>
                            <p className="yh-health-main-subtitle"> {t("mp_yhp_main_subtitle")}</p>
                        </div>
                        <div className="yh-health-header-icon">
                            <img src={nomic} alt="Nomic mascot" className="yh-nomic-mascot" />
                        </div>
                    </div>
                </div>

                {/* Блоки у колонці */}
                <div className="yh-health-column-container">
                    {/* Блок Активність */}
                    <div className="yh-health-info-block a-health-info-block">
                        <div className="yh-health-block-content a-health-block-content">
                            <div className="yh-glass-background"></div>
                            <div className="yh-health-block-image-container a-health-block-image-container">
                                <div className="yh-health-block-image a-health-block-image">
                                    <img src={activityImg} alt="Активність" className="a-health-img" />
                                </div>
                            </div>
                            <div className="yh-health-block-text a-health-block-text">
                                <h2 className="yh-health-block-title a-health-block-title">{t("mp_yhp_activity_title")}</h2>
                                <p className="yh-health-block-description a-health-block-description">
                                    {t("mp_yhp_activity_description_1")}
                                </p>
                                <p className="yh-health-block-description a-health-block-description">
                                    {t("mp_yhp_activity_description_2")}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Блок Сон */}
                    <div className="yh-health-info-block s-health-info-block">
                        <div className="yh-health-block-content s-health-block-content">
                            <div className="yh-glass-background"></div>
                            <div className="yh-health-block-image-container s-health-block-image-container">
                                <div className="yh-health-block-image s-health-block-image">
                                    <img src={sleepImg} alt="Сон" className="s-health-img" />
                                </div>
                            </div>
                            <div className="yh-health-block-text s-health-block-text">
                                <h2 className="yh-health-block-title s-health-block-title">{t("mp_yhp_sleep_title")}</h2>
                                <p className="yh-health-block-description s-health-block-description">
                                    {t("mp_yhp_sleep_description_1")}
                                </p>
                                <p className="yh-health-block-description s-health-block-description">
                                    {t("mp_yhp_sleep_description_2")}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Блок Харчування */}
                    <div className="yh-health-info-block n-health-info-block">
                        <div className="yh-health-block-content n-health-block-content">
                            <div className="yh-glass-background"></div>
                            <div className="yh-health-block-image-container n-health-block-image-container">
                                <div className="yh-health-block-image n-health-block-image">
                                    <img src={nutritionImg} alt="Харчування" className="n-health-img" />
                                </div>
                            </div>
                            <div className="yh-health-block-text n-health-block-text">
                                <h2 className="yh-health-block-title n-health-block-title">{t("mp_yhp_nutrition_title")}</h2>
                                <p className="yh-health-block-description n-health-block-description">
                                    {t("mp_yhp_nutrition_description_1")}
                                </p>
                                <p className="yh-health-block-description n-health-block-description">
                                    {t("mp_yhp_nutrition_description_2")}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default YourHealthPage;