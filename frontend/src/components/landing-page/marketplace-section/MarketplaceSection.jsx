import React from 'react';
import { useTranslation } from 'react-i18next';
import './MarketplaceSection.css';
import marketplaceBg from '../../../assets/landing-page/marketplace_bg.svg';

const MarketplaceSection = () => {
  const { t } = useTranslation();

  return (
    <section id="marketplace-section" className="marketplace-section" style={{ backgroundImage: `url(${marketplaceBg})` }}>
      <div className="marketplace-content">
        <h2 className="marketplace-title">
          {t("marketplace_title")}
        </h2>
        <p className="marketplace-subtitle">{t("marketplace_subtitle")}</p>
      </div>
      <button className="marketplace-cta">
        {t("marketplace_button")}
      </button>
    </section>
  );
};

export default MarketplaceSection;