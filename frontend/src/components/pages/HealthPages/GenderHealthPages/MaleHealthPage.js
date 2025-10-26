import React from 'react';
import { useNavigate,useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import nomic from '../../../../assets/health-icons/nomic_with_bandage.svg';
import '../../../styles/maleHealth.css';

const MaleHealthPage = () => {
    const { t } = useTranslation();
    const location = useLocation();
    const navigate = useNavigate();

    const handleHormonesClick = () => {
        navigate(`${location.pathname}/hormonas`);
    };

    const handleHormonesDiagramClick = () => {
        navigate(`${location.pathname}/hormonas_diagram`);
    };

    const handleFindDoctorClick = () => {
        console.log('Клік по кнопці "Знайти лікаря поруч"');
        // Тут буде логіка пошуку лікарів
    };

    return (
        <div className='mhp-overflow-container'>
            <div className="mhp-page">
                <div className="mhp-header-block">
                    <div className="mhp-header-content">
                        <div className="mhp-header-text">
                            <p className="mhp-main-title">{t("mp_male_health")}</p>
                            <p className="mhp-main-subtitle">{t("mp_subtitle_1")}</p>
                        </div>
                        <div className="mhp-header-icon">
                            <img src={nomic} alt="Nomic mascot" className="mhp-nomic-mascot" />
                        </div>
                    </div>
                </div>

                <div className="mhp-container">
                    <div 
                        className="mhp-button-wrapper"
                        onClick={handleHormonesDiagramClick}
                    >
                        <button className="mhp-main-button">
                            <div className="mhp-button-content">
                                <svg width="54" height="44" viewBox="0 0 54 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M3 3V41H51M10.6364 26.8857L22.6364 16.0286L34.6364 26.8857L51 3" stroke="#0661CC" strokeWidth="5" strokeLinecap="round" />
                                </svg>
                                <span className="mhp-button-text">{t("hormonas_diagram")}</span>
                            </div>
                        </button>
                    </div>

                    <div className="mhp-blocks-grid">
                        <div className="mhp-block-column">
                            <div className="mhp-info-block mhp-hormones-block">
                                <div className="mhp-glass-background"></div>
                                <div className="mhp-block-content">
                                    <div className="mhp-block-text">
                                        <h3 className="mhp-block-title">{t("mp_hormones_block_title")}</h3>
                                        <div className="mhp-content-grid">
                                            <div className="mhp-content-item">
                                                <div className="mhp-content-label">{t("mp_hormones_block_content_label_1")}</div>
                                                <div className="mhp-content-value">{t("mp_hormones_block_content_value_1_1")}</div>
                                            </div>
                                            <div className="mhp-content-item">
                                                <div className="mhp-content-label">{t("mp_hormones_block_content_label_2")}</div>
                                                <div className="mhp-content-value">
                                                    <p>{t("mp_hormones_block_content_value_2_1")}</p>
                                                    <p>{t("mp_hormones_block_content_value_2_2")}</p>
                                                    <p>{t("mp_hormones_block_content_value_2_3")}</p>
                                                </div>
                                            </div>
                                            <div className="mhp-content-item">
                                                <div className="mhp-content-label">{t("mp_hormones_block_content_label_3")}</div>
                                                <div className="mhp-content-value">
                                                    <p>{t("mp_hormones_block_content_value_3_1")}</p>
                                                    <p>{t("mp_hormones_block_content_value_3_2")}</p>
                                                    <p>{t("mp_hormones_block_content_value_3_3")}</p>
                                                    <p>{t("mp_hormones_block_content_value_3_4")}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <button 
                                            className="mhp-hormones-button"
                                            onClick={handleHormonesClick}
                                        >
                                            {t("mp_add_hormones_data")}
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="mhp-info-block mhp-analysis-block">
                                <div className="mhp-glass-background"></div>
                                <div className="mhp-block-content">
                                    <div className="mhp-block-text">
                                        <h3 className="mhp-block-title mhp-analyses-title">{t("mp_analyses_block_title")}</h3>
                                        <div className="mhp-content-grid">
                                            <div className="mhp-content-item">
                                                <div className="mhp-content-label">{t("mp_analyses_block_content_label_1")}</div>
                                                <div className="mhp-content-value">{t("mp_analyses_block_content_value_1")}</div>
                                            </div>
                                            <div className="mhp-content-item">
                                                <div className="mhp-content-label">{t("mp_analyses_block_content_label_2")}</div>
                                                <div className="mhp-content-value">{t("mp_analyses_block_content_value_2")}</div>
                                            </div>
                                            <div className="mhp-content-item">
                                                <div className="mhp-content-label">{t("mp_analyses_block_content_label_3")}</div>
                                                <div className="mhp-content-value">{t("mp_analyses_block_content_value_3")}</div>
                                            </div>
                                            <div className="mhp-content-item">
                                                <div className="mhp-content-label">{t("mp_analyses_block_content_label_4")}</div>
                                                <div className="mhp-content-value">{t("mp_analyses_block_content_value_4")}</div>
                                            </div>
                                            <div className="mhp-content-item">
                                                <div className="mhp-content-label">{t("mp_analyses_block_content_label_5")}</div>
                                                <div className="mhp-content-value">{t("mp_analyses_block_content_value_5")}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mhp-block-column">
                            <div className="mhp-info-block mhp-reproductive-block">
                                <div className="mhp-glass-background"></div>
                                <div className="mhp-block-content">
                                    <div className="mhp-block-text">
                                        <h3 className="mhp-block-title">{t("mp_reproductive_block_title")}</h3>
                                        <div className="mhp-content-grid">
                                            <div className="mhp-content-item">
                                                <div className="mhp-content-label">{t("mp_reproductive_block_content_label_1")}</div>
                                                <div className="mhp-content-value">{t("mp_reproductive_block_content_value_1")}</div>
                                            </div>
                                            <div className="mhp-content-item">
                                                <div className="mhp-content-label">{t("mp_reproductive_block_content_label_2")}</div>
                                                <div className="mhp-content-value">{t("mp_reproductive_block_content_value_2")}</div>
                                            </div>
                                            <div className="mhp-content-item">
                                                <div className="mhp-content-label">{t("mp_reproductive_block_content_label_3")}</div>
                                                <div className="mhp-content-value">{t("mp_reproductive_block_content_value_3")}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mhp-info-block mhp-urinary-block">
                                <div className="mhp-glass-background"></div>
                                <div className="mhp-block-content">
                                    <div className="mhp-block-text">
                                        <h3 className="mhp-block-title">{t("mp_urinary_block_title")}</h3>
                                        <div className="mhp-content-grid">
                                            <div className="mhp-content-item">
                                                <div className="mhp-content-label">{t("mp_urinary_block_content_label_1")}</div>
                                                <div className="mhp-content-value">{t("mp_urinary_block_content_value_1")}</div>
                                            </div>
                                            <div className="mhp-content-item">
                                                <div className="mhp-content-label">{t("mp_urinary_block_content_label_2")}</div>
                                                <div className="mhp-content-value">{t("mp_urinary_block_content_value_2")}</div>
                                            </div>
                                            <div className="mhp-content-item">
                                                <div className="mhp-content-label">{t("mp_urinary_block_content_label_3")}</div>
                                                <div className="mhp-content-value">{t("mp_urinary_block_content_value_3")}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mhp-info-block mhp-potency-block">
                                <div className="mhp-glass-background"></div>
                                <div className="mhp-block-content">
                                    <div className="mhp-block-text">
                                        <h3 className="mhp-block-title">{t("mp_potency_block_title")}</h3>
                                        <div className="mhp-content-grid">
                                            <div className="mhp-content-item">
                                                <div className="mhp-content-label">{t("mp_potency_block_content_label_1")}</div>
                                                <div className="mhp-content-value">{t("mp_potency_block_content_value_1")}</div>
                                            </div>
                                            <div className="mhp-content-item">
                                                <div className="mhp-content-label">{t("mp_potency_block_content_label_2")}</div>
                                                <div className="mhp-content-value">{t("mp_potency_block_content_value_2")}</div>
                                            </div>
                                            <div className="mhp-content-item">
                                                <div className="mhp-content-label">{t("mp_potency_block_content_label_3")}</div>
                                                <div className="mhp-content-value">{t("mp_potency_block_content_value_3")}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mhp-specialist-button-wrapper">
                        <button 
                            className="mhp-specialist-button"
                            onClick={handleFindDoctorClick}
                        >
                            {t("find_doctor")}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MaleHealthPage;