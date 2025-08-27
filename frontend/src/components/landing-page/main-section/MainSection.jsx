import React from 'react';
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import LanguageSelector from '../../LanguageSelector';
import './MainSection.css';
import heroImage from '../../../assets/landing-page/hero_bg.svg';
import logo from '../../../assets/landing-page/nomyfy_logo.svg';
import Bubble from '../animated-background/Bubble';

const MainSection = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    return (
        <section className="main-section" style={{ backgroundImage: `url(${heroImage})` }}>
            <div className="bubbles-container">
                <Bubble className="bubble-1" />
            </div>
            <header className="header">
                <div className="header__logo">
                    <img src={logo} alt="Nomyfy Logo" />
                </div>
                <nav className="header__nav">
                    <ul className="nav__list">
                        <li className="nav__item"><a href="/">{t("about_platform")}</a></li>
                        <li className="nav__item"><a href="/">{t("functions")}</a></li>
                        <li className="nav__item"><a href="/">{t("prices")}</a></li>
                        <li className="nav__item"><a href="/">{t("marketplace")}</a></li>
                        <li className="nav__item"><a href="/">{t("questions")}</a></li>
                    </ul>
                </nav>
                <LanguageSelector />
                <button className="header__button" onClick={() => navigate("/login")}>{t("balance_action")}</button>
            </header>

            <div className="hero-content">
                <h1>{t("less_chaos")} <br /> <span className="energy-text">{t("more_energy")}</span></h1>
                <p>{t("healthy_lifestyle")}</p>
                <button className="cta-button" onClick={() => navigate("/register")}>{t("register")}</button>
            </div>
        </section>
    );
};

export default MainSection;