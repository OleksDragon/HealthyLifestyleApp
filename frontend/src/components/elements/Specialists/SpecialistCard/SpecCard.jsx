// src/components/SpecialistCard.js
import React from 'react';
import './SpecCard.css';
import card1Img from '../../../../assets/specialists-img/card-1.png';
import card4Img from '../../../../assets/specialists-img/card-4.png';
import card5Img from '../../../../assets/specialists-img/card-5.png';
import { useTranslation } from 'react-i18next';

// Placeholder for SolarHeartLinear
const SolarHeartLinear = ({ className, vectorClassName }) => (
  <svg
    className={className}
    width="20"
    height="17"
    viewBox="0 0 20 17"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      className={vectorClassName}
      d="M10 16.5L2.5 9C1.5 8 1 6.5 1 5C1 2.5 3 0.5 5.5 0.5C7 0.5 8.5 1.5 10 3C11.5 1.5 13 0.5 14.5 0.5C17 0.5 19 2.5 19 5C19 6.5 18.5 8 17.5 9L10 16.5Z"
      fill="red"
    />
  </svg>
);

const SpecialistCard = ({ specialist }) => {
  const { t } = useTranslation();

  // Map images to specialists based on their Id
  const getSpecialistImage = (id) => {
    const imageMap = {
      '7e69a44f-c26c-445a-b9bf-0e5539561766': card1Img, // Маргарита Дронова
      '5af807b3-ed6a-408a-9e5f-274ac09bfbe2': card4Img, // Олексій Коваленко
      'bea4e6a2-d57b-49ca-8cec-4675cfb3cb46': card5Img, // Анна Сидоренко
    };
    return imageMap[id];
  };

  return (
    <div className="frame">
      <div className="rectangle" />
      {console.log(specialist)}
      <img
        className="element"
        alt="Specialist"
        src={getSpecialistImage(specialist.Id)}
        // onError={(e) => { e.target.src = placeholderImage; }}
      />
      <SolarHeartLinear
        className="solar-heart-linear-instance"
        vectorClassName="design-component-instance-node"
      />
      <div className="div" />
      <div className="text-wrapper">
        {specialist.FullName || t('unknown_specialist')}
      </div>
      <p className="fitnessbik">
        {specialist.ProfessionalRoleType.Name}
        <br />
        {specialist.Description}
      </p>
      <div className="rectangle-2" />
      {specialist.IsTopRated && <div className="text-wrapper-2">{t('top_5')}</div>}
      <div className="rectangle-3" />
      <div className="text-wrapper-3">{t('subscribe')}</div>
    </div>
  );
};

export default SpecialistCard; 