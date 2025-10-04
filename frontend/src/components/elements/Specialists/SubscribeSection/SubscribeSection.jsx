// components/SubscribeSection.jsx
import { useTranslation } from 'react-i18next';
import "./SubscribeSection.css"; // підключ свій CSS

const SubscribeSection = () => {
  const { t } = useTranslation();
  
  const plans = [
    {
      title: t("plan_start_30_title"),
      duration: t("plan_duration"),
      price: t("plan_start_30_price"),
      features: [
        t("plan_feature_1"),
        t("plan_feature_2"),
        t("plan_feature_3"),
      ],
    },
    {
      title: t("plan_result_30_title"),
      duration: t("plan_duration"),
      price: t("plan_result_30_price"),
      features: [
        t("plan_feature_4"),
        t("plan_feature_5"),
        t("plan_feature_6"),
      ],
    },
    {
      title: t("plan_vip_30_title"),
      duration: t("plan_duration"),
      price: t("plan_vip_30_price"),
      features: [
        t("plan_feature_7"),
        t("plan_feature_8"),
        t("plan_feature_9"),
        t("plan_feature_10"),
      ],
    },
  ];

  return (
    <div className="subscribe-section">
      
      <div className="subscribe-container">
        {plans.map((plan, index) => (
          <div className="subscribe-card" key={index}>
            <div className="subscribe-bg" />
            <div className="subscribe-overlay" />
            <div className="subscribe-label" />

            <div className="subscribe-title">{plan.title}</div>
            <div className="subscribe-duration">{plan.duration}</div>

            <div className="subscribe-details">
              {plan.features.map((feature, idx) => (
                <div className="subscribe-feature" key={idx}>
                  {feature}
                </div>
              ))}
            </div>

            <div className="subscribe-price">{plan.price}</div>

            <div className="subscribe-button-bg" />
            <div className="subscribe-btn">{t("choose")}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubscribeSection;
