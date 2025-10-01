import React from 'react';
import { useNavigate } from 'react-router-dom';
import './SpecCard.css';
import card1Img from '../../../../assets/specialists-img/card-1.png';
import card4Img from '../../../../assets/specialists-img/card-4.png';
import card5Img from '../../../../assets/specialists-img/card-5.png';
import card2Img from '../../../../assets/specialists-img/card-2.png';
import card3Img from '../../../../assets/specialists-img/card-3.png';
import card6Img from '../../../../assets/specialists-img/card-6.png';
import { useTranslation } from 'react-i18next';
import { SolarHeartLinear } from '../SolarHeartLinear/SolarHeartLinear';

const SpecialistCard = ({ specialist, index }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  // Map images to specialists based on their ID
  const getSpecialistImage = (id) => {
    const imageMap = {
      'Маргарита Дронова': card1Img, // Маргарита Дронова
      'Олексій Соколенко': card4Img, // Олексій Соколенко
      'Антоніна Смила': card5Img, // Антоніна Смила
      'Олександр Медичний': card3Img, // Д-р Олександр Медичний
      'Андрій Кач': card6Img, // Андрій Кач
      'Олеся Мамкіна': card2Img, // Олеся Мамкіна
      'Дмитро Делитанович': card6Img, // Дмитро Делитанович
    };
    return imageMap[id] || card6Img; // Use card-6.png as fallback
  };

  const handleClick = () => {
    navigate(`/specialists/${specialist.Id}`);
  };

return (
    <div className="frame" onClick={handleClick}>
      <div className="rectangle" />
      <img
        className="element"
        alt={specialist.User?.FullName || 'Specialist'}
        src={getSpecialistImage(specialist.User?.FullName) || 'https://example.com/placeholder.jpg'} // Use CardPictureUrl with fallback
      />
      <SolarHeartLinear
        property1="one"
        propertyClassName="solar-heart-linear-instance"
        vectorClassName="design-component-instance-node"
      />
      <div className="div" />
      <div className="text-wrapper">
        {specialist.User?.FullName || t('unknown_specialist')}
      </div>
      <p className="fitnessbik">
        {specialist.ProfessionalRoleType?.Name || t('unknown_role')}
      </p>
      <p className="description">
        {/* {specialist.Description || t('no_description')} */}
      </p>
      <div
        className="rectangle-2"
        style={specialist.IsTopRated ? {} : { width: '130.8571px' }}
      >
        <div
          className="text-wrapper-2"
          style={
            specialist.IsTopRated
              ? { left: '50px', top: '12.5px' }
              : { left: '40.8571px', top: '12.5px' }
          }
        >
          {specialist.IsTopRated ? t('top_5') : t('recomend')}
        </div>
      </div>
      <div className="rectangle-3" />
      <div className="text-wrapper-3">{t('subscribe')}</div>
    </div>
  );
};
export default SpecialistCard;