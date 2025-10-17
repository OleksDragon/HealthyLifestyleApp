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

  // API base URL - можна винести в конфіг
  const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  // Map images to specialists based on their ID (fallback for static images)
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

  // Get CardPictureUrl from specialist details (MinIO URL)
  const getCardPictureUrlMinio = (specialist) => {
    console.log('🖼️ [FRONTEND] getCardPictureUrlMinio called for specialist:', specialist);
    
    if (!specialist) {
      console.log('🖼️ [FRONTEND] No specialist provided');
      return null;
    }

    // Find the non-null details object
    const details = specialist.TrainerDetails || 
                   specialist.DoctorDetails || 
                   specialist.DietitianDetails || 
                   specialist.PsychologistDetails;

    console.log('🖼️ [FRONTEND] Found details:', details?.constructor?.name, 'CardPictureUrl:', details?.CardPictureUrl);

    if (details && details.CardPictureUrl) {
      // Виправити подвійний images/ шлях
      let correctedPath = details.CardPictureUrl;
      if (correctedPath.startsWith('images/images/')) {
        correctedPath = correctedPath.replace('images/images/', 'images/');
        console.log('🖼️ [FRONTEND] Corrected double images/ path:', correctedPath);
      }
      
      // Form full URL for MinIO proxy endpoint
      const minioUrl = `${API_BASE_URL}/api/SpecialistImage/proxy/${correctedPath}`;
      console.log('🖼️ [FRONTEND] Generated MinIO URL:', minioUrl);
      return minioUrl;
    }

    console.log('🖼️ [FRONTEND] No CardPictureUrl found in details');
    return null;
  };

  // Get image with fallback: try MinIO first, then static images
  const getSpecialistImageWithFallback = (specialist) => {
    console.log('🖼️ [FRONTEND] getSpecialistImageWithFallback called for specialist:', specialist?.User?.FullName);
    
    // Try to get MinIO URL first
    const minioUrl = getCardPictureUrlMinio(specialist);
    if (minioUrl) {
      console.log('🖼️ [FRONTEND] Using MinIO URL:', minioUrl);
      return minioUrl;
    }

    // Fallback to static images
    const staticImage = getSpecialistImage(specialist.User?.FullName);
    console.log('🖼️ [FRONTEND] Using static image fallback:', staticImage);
    return staticImage;
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
        src={getSpecialistImageWithFallback(specialist) || card1Img} // Use MinIO URL with static fallback
        onError={(e) => {
          console.log('🖼️ [FRONTEND] Image load error for specialist:', specialist?.User?.FullName, 'src:', e.target.src);
          // Fallback to static image on error
          const staticImage = getSpecialistImage(specialist.User?.FullName);
          if (e.target.src !== staticImage) {
            console.log('🖼️ [FRONTEND] Switching to static image fallback:', staticImage);
            e.target.src = staticImage;
          }
        }}
        onLoad={(e) => {
          console.log('🖼️ [FRONTEND] Image loaded successfully for specialist:', specialist?.User?.FullName, 'src:', e.target.src);
        }}
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
        {specialist.ProfessionalRoleType?.Name || t('unknown_role')}  {specialist.HourlyRate} {t("hourly_rate_title")} {specialist?.Dietitian?.YearsOfExperience}
      </p>
      <p className="description">
        {/* {specialist.Description || t('no_description')} */}
      </p>
      <div
        className="rectangle-2"
        style={index % 2 === 0 ? {} : { width: '130.8571px' }} //specialist.IsTopRated 
      >
        <div
          className="text-wrapper-2"
          style={
            index % 2 === 0
              ? { left: '50px', top: '12.5px' }
              : { left: '40.8571px', top: '12.5px' }
          }
        >
          {index % 2 === 0 ? t('top_5') : t('recomend')}
        </div>
      </div>
      <div className="rectangle-3" />
      <div className="text-wrapper-3">{t('subscribe')}</div>
    </div>
  );
};
export default SpecialistCard;