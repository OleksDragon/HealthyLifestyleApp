import React from 'react';
import { useTranslation } from 'react-i18next';
import './MainContentBlock.css';
import nomyfyLogo from '../../../assets/landing-page/nomyfy.svg'; 

const MainContentBlock = () => {
    const { t } = useTranslation();

    return (
        <section className="main-content-block" id="about-section">
            <div className="logo-container">
                <img src={nomyfyLogo} alt="NOMYFY" className="nomyfy-logo" />
            </div>
            <div className="text-container">
                <p className="description-text">
                    {t("description_part1")}
                    <br />
                    {t("description_part2")}
                    <br />
                    {t("description_part3")}
                    <br />
                    {t("description_part4")}
                </p>
            </div>
        </section>
    );
};

export default MainContentBlock;