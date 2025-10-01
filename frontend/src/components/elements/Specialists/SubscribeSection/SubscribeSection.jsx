// components/SubscribeSection.jsx
import React from "react";
import "./SubscribeSection.css"; // підключ свій CSS

const plans = [
  {
    title: "Start 30",
    duration: "/ 30 днів",
    price: "500 грн",
    features: [
      "Індивідуальний план тренувань (2–3 дні/тиждень)",
      "Пропозиції щодо харчування",
      "1 онлайн-консультація на тиждень",
    ],
  },
  {
    title: "Result 30",
    duration: "/ 30 днів",
    price: "1500 грн",
    features: [
      "План тренувань + детальний раціон",
      "Щотижневі корекції + відеоаналіз техніки",
      "Підтримка в месенджері 5/7",
    ],
  },
  {
    title: "VIP 30",
    duration: "/ 30 днів",
    price: "4000 грн",
    features: [
      "Повне онлайн ведення",
      "12 тренувань на місяць",
      "Розбір харчування та індивідуальні рекомендації",
      "Повна підтримка в месенджері",
    ],
  },
];

const SubscribeSection = () => {
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
            <div className="subscribe-button">Обрати</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubscribeSection;
