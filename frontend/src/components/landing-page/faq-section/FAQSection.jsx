import React from 'react';
import { useTranslation } from 'react-i18next';
import './FAQSection.css';
import prynt_group from '../../../assets/landing-page/prynt_group.svg';

const FAQSection = () => {
  const { t } = useTranslation();

  return (
    <section id="faq-section" className="faq-section" style={{ backgroundImage: `url(${prynt_group})` }}>
      <h2>{t("faq_title")}</h2>
      <div className="faq-grid">
        <div className="faq-item">
          <p>
            <strong>{t("faq_q1_title")}</strong><br />
            {t("faq_q1_answer")}
          </p>
        </div>
        <div className="faq-item">
          <p>
            <strong>{t("faq_q2_title")}</strong><br />
            {t("faq_q2_answer")}
          </p>
        </div>
        <div className="faq-item">
          <p>
            <strong>{t("faq_q3_title")}</strong><br />
            {t("faq_q3_answer")}
          </p>
        </div>
        <div className="faq-item">
          <p>
            <strong>{t("faq_q4_title")}</strong><br />
            {t("faq_q4_answer")}
          </p>
        </div>
        <div className="faq-item">
          <p>
            <strong>{t("faq_q5_title")}</strong><br />
            {t("faq_q5_answer")}
          </p>
        </div>
        <div className="faq-item">
          <p>
            <strong>{t("faq_q6_title")}</strong><br />
            {t("faq_q6_answer")}
          </p>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;