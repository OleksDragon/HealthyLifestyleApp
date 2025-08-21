import React from 'react';
import { useTranslation } from 'react-i18next'; // Импортируем хук
import './Footer.css';
import nomyfyCharacter from '../../../assets/landing-page/mascot.svg';
import nomyfyLogo from '../../../assets/landing-page/nomyfy_logo.svg';
import facebookIcon from '../../../assets/social-icons/facebook.svg'; 
import telegramIcon from '../../../assets/social-icons/telegram.svg';
import instagramIcon from '../../../assets/social-icons/instagram.svg'; 

const Footer = () => {
    const { t } = useTranslation(); // Инициализируем хук

    return (
        <footer className="footer-section">
            <div className="footer-container">
                {/* Левая колонка */}
                <div className="footer-left-col">
                    <img src={nomyfyLogo} alt="Nomyfy Logo" className="footer-logo" />
                    <img src={nomyfyCharacter} alt="Nomyfy Character" className="footer-character" />
                </div>

                {/* Центральная колонка */}
                <div className="footer-center-col">
                    <ul className="footer-links-list">
                        <li><a href="#about-section">{t("about_platform")}</a></li>
                        <li><a href="#functions-section">{t("functions")}</a></li>
                        <li><a href="#specialists-section">{t("specialists")}</a></li>
                        <li><a href="#marketplace-section">{t("marketplace")}</a></li>
                        <li><a href="#faq-section">{t("questions")}</a></li>
                    </ul>
                </div>

                {/* Правая колонка */}
                <div className="footer-right-col">
                    <ul className="footer-links-list">
                        <li><a>{t("privacy_policy")}</a></li>
                        <li><a>{t("support_service")}</a></li>
                    </ul>
                    <div className="footer-social-icons">
                        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                            <img src={facebookIcon} alt="Facebook" className="social-icon" />
                        </a>
                        <a href="https://t.me/" target="_blank" rel="noopener noreferrer">
                            <img src={telegramIcon} alt="Telegram" className="social-icon" />
                        </a>
                        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                            <img src={instagramIcon} alt="Instagram" className="social-icon" />
                        </a>
                    </div>
                    <p className="footer-copyright">
                        {t("copyright", { year: new Date().getFullYear() })}
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;