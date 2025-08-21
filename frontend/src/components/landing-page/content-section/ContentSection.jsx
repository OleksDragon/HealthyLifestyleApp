import React, { useState } from 'react';
import { useTranslation } from 'react-i18next'; // Импортируем хук
import './ContentSection.css';
import Card from './Card';

import card1Closed from '../../../assets/landing-page/dashboard-pass.svg';
import card1OpenUk from '../../../assets/landing-page/dashboard-active.svg';
import card1OpenEn from '../../../assets/landing-page/dashboard-active-en.svg';
import card1OpenDe from '../../../assets/landing-page/dashboard-active-de.svg';
import card2Closed from '../../../assets/landing-page/treker-pass.svg';
import card2OpenUk from '../../../assets/landing-page/treker-active.svg';
import card2OpenEn from '../../../assets/landing-page/treker-active-en.svg';
import card3Closed from '../../../assets/landing-page/mental-pass.svg';
import card3OpenUk from '../../../assets/landing-page/mental-active.svg';
import card3OpenEn from '../../../assets/landing-page/mental-active-en.svg';
import card4Closed from '../../../assets/landing-page/food-pass.svg';
import card4OpenUk from '../../../assets/landing-page/dashboard-active.svg';
import card4OpenEn from '../../../assets/landing-page/dashboard-active-en.svg';
import card5Closed from '../../../assets/landing-page/social-pass.svg';
import card5OpenUk from '../../../assets/landing-page/treker-active.svg';
import card5OpenEn from '../../../assets/landing-page/treker-active-en.svg';
import card6Closed from '../../../assets/landing-page/ai-pass.svg';
import card6OpenUk from '../../../assets/landing-page/mental-active.svg';
import card6OpenEn from '../../../assets/landing-page/mental-active-en.svg';

const ContentSection = () => {
  const {  t, i18n } = useTranslation(); // Используем хук для доступа к переводам
  const [openCardId, setOpenCardId] = useState("card1");

  const handleCardClick = (id) => {
    if (openCardId === id) {
      setOpenCardId(null);
    } else {
      setOpenCardId(id);
    }
    };
    
    const images = {
    card1: {
      closed: { uk: card1Closed, en: card1Closed, de: card1Closed },
      open: { uk: card1OpenUk, en: card1OpenEn, de: card1OpenDe }
    },
    card2: {
      closed: { uk: card2Closed, en: card2Closed },
      open: { uk: card2OpenUk, en: card2OpenEn }
    },
    card3: {
      closed: { uk: card3Closed, en: card3Closed },
      open: { uk: card3OpenUk, en: card3OpenEn }
    },
    card4: {
      closed: { uk: card4Closed, en: card4Closed },
      open: { uk: card4OpenUk, en: card4OpenEn }
    },
    card5: {
      closed: { uk: card5Closed, en: card5Closed },
      open: { uk: card5OpenUk, en: card5OpenEn }
    },
    card6: {
      closed: { uk: card6Closed, en: card6Closed },
      open: { uk: card6OpenUk, en: card6OpenEn }
    }
  };

    // Получаем текущий язык
  const currentLanguage = i18n.language;

  return (
    <section id="functions-section" className="content-section">
      <div className="cards-container">
        <Card 
          id="card1" 
          closedImage={images.card1.closed[currentLanguage] || images.card1.closed.uk} 
          openImage={images.card1.open[currentLanguage] || images.card1.open.uk} 
          isOpen={openCardId === 'card1'}
          onClick={handleCardClick}
        />
        <Card 
          id="card2" 
          closedImage={images.card2.closed[currentLanguage] || images.card2.closed.uk} 
          openImage={images.card2.open[currentLanguage] || images.card2.open.uk} 
          isOpen={openCardId === 'card2'}
          onClick={handleCardClick}
        />
        <Card 
          id="card3" 
          closedImage={images.card3.closed[currentLanguage] || images.card3.closed.uk} 
          openImage={images.card3.open[currentLanguage] || images.card3.open.uk} 
          isOpen={openCardId === 'card3'}
          onClick={handleCardClick}
        />
        <Card 
          id="card4" 
          closedImage={images.card4.closed[currentLanguage] || images.card4.closed.uk} 
          openImage={images.card4.open[currentLanguage] || images.card4.open.uk} 
          isOpen={openCardId === 'card4'}
          onClick={handleCardClick}
        />
        <Card 
          id="card5" 
          closedImage={images.card5.closed[currentLanguage] || images.card5.closed.uk} 
          openImage={images.card5.open[currentLanguage] || images.card5.open.uk} 
          isOpen={openCardId === 'card5'}
          onClick={handleCardClick}
        />
        <Card 
          id="card6" 
          closedImage={images.card6.closed[currentLanguage] || images.card6.closed.uk} 
          openImage={images.card6.open[currentLanguage] || images.card6.open.uk} 
          isOpen={openCardId === 'card6'}
          onClick={handleCardClick}
        />
      </div>
      <div className="bottom-block">
        <div className="bottom-text" id="specialists-section">
          <p>
            {t("specialist_title_line1")}<br />
            {t("specialist_title_line2")}
          </p>
          <p className="bottom-subtext">
            {t("specialist_text_line1")}<br />
            {t("specialist_text_line2")}<br />
            {t("specialist_text_line3")}
          </p>
        </div>
        <button className="bottom-cta">{t("become_specialist")}</button>
      </div>
    </section>
  );
};

export default ContentSection;