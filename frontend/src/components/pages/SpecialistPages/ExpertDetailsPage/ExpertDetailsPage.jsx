import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './ExpertDetailsPage.css';

import { specialistsData } from "../../../pages/SpecialistPages/LocalData/SpecialistsData"; // Import local data

import SpecialistSkills from '../../../elements/Specialists/SpecialistSkills/SpecialistSkills';
import SpecialistWorkFormat from '../../../elements/Specialists/SpecialistWorkFormat/SpecialistWorkFormat';

import card1Img from '../../../../assets/specialists-img/card-1.png';
import card4Img from '../../../../assets/specialists-img/card-4.png';
import card5Img from '../../../../assets/specialists-img/card-5.png';
import card2Img from '../../../../assets/specialists-img/card-2.png';
import card3Img from '../../../../assets/specialists-img/card-3.png';
import card6Img from '../../../../assets/specialists-img/card-6.png';

import SubscribeSection from '../../../elements/Specialists/SubscribeSection/SubscribeSection';
import ReviewSection from '../../../elements/Specialists/ReviewSection/ReviewSection';

const SpecialistBiography = ({ specialist }) => {
  const { t } = useTranslation();

  const getBiography = (specialist) => {
    if (specialist.TrainerDetails?.Biography) {
      return specialist.TrainerDetails.Biography;
    }
    if (specialist.DoctorDetails?.Biography) {
      return specialist.DoctorDetails.Biography;
    }
    if (specialist.PsychologistDetails?.Biography) {
      return specialist.PsychologistDetails.Biography;
    }
    if (specialist.DietitianDetails?.Biography) {
      return specialist.DietitianDetails.Biography;
    }
    return null;
  };

  const biography = getBiography(specialist);

  return (
    <div className="biography-container">
      <p className="biography">{biography || t('no_biography')}</p>
    </div>
  );
};
const SpecialistSocialLinks = ({ specialist }) => {
  const { t } = useTranslation();

  const getSocialLinks = (specialist) => {
    const website = specialist.TrainerDetails?.Website ||
                    specialist.DoctorDetails?.Website ||
                    specialist.PsychologistDetails?.Website ||
                    specialist.DietitianDetails?.Website;
    
    return {
      google: website || '#'  // Google використовує Website поле
    };
  };

  const socialLinks = getSocialLinks(specialist);

  return (
    <div className="icons-container">
      <a href={socialLinks.google} target="_blank" rel="noopener noreferrer">
        <svg className="social-icons" width="50" height="50" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M50 25C50 11.1929 38.8071 0 25 0C11.1929 0 0 11.1929 0 25C0 38.8071 11.1929 50 25 50C38.8071 50 50 38.8071 50 25Z" fill="white" />
          <path fillRule="evenodd" clipRule="evenodd" d="M37.2344 25.2847C37.2344 24.3983 37.1548 23.5461 36.9905 22.7278H25.2344V27.5631H31.9617C31.6717 29.1256 30.7912 30.4495 29.4673 31.3358V34.4722H33.5071C35.8708 32.2961 37.2344 29.0915 37.2344 25.2847Z" fill="#0661CC" />
          <path fillRule="evenodd" clipRule="evenodd" d="M25.233 37.5013C28.608 37.5013 31.4375 36.382 33.5058 34.4731L29.466 31.3365C28.3466 32.0865 26.9148 32.5297 25.233 32.5297C21.9773 32.5297 19.2216 30.3308 18.2387 27.3763H13.7292V30.6149C15.9527 34.7002 20.3466 37.5013 25.233 37.5013Z" fill="#0661CC" />
          <path fillRule="evenodd" clipRule="evenodd" d="M18.2401 27.3734C17.9901 26.6234 17.848 25.8222 17.848 24.9984C17.848 24.1746 17.9901 23.3734 18.2401 22.6234V19.3847H13.7306C12.884 21.0722 12.7344 23.1481 12.7344 24.9984C12.7344 26.8487 12.884 28.9246 13.7306 30.6121L18.2401 27.3734Z" fill="#0661CC" />
          <path fillRule="evenodd" clipRule="evenodd" d="M25.233 17.4716C27.0682 17.4716 28.716 18.1022 30.0114 19.3409L33.5967 15.7557C31.4318 13.7387 28.6023 12.5 25.233 12.5C20.3466 12.5 15.9527 15.3011 13.7292 19.3864L18.2387 22.625C19.2216 19.6705 21.9773 17.4716 25.233 17.4716Z" fill="#0661CC" />
        </svg>
      </a>
    </div>
  );
};
  // API base URL - можна винести в конфіг
  const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  // Get CardPictureUrl from specialist details (MinIO URL)
  const getCardPictureUrlMinio = (specialist) => {
    console.log('🖼️ [EXPERT_DETAILS] getCardPictureUrlMinio called for specialist:', specialist?.User?.FullName);
    
    if (!specialist) {
      console.log('🖼️ [EXPERT_DETAILS] No specialist provided');
      return null;
    }

    // Find the non-null details object
    const details = specialist.TrainerDetails || 
                   specialist.DoctorDetails || 
                   specialist.DietitianDetails || 
                   specialist.PsychologistDetails;

    console.log('🖼️ [EXPERT_DETAILS] Found details:', details?.constructor?.name, 'CardPictureUrl:', details?.CardPictureUrl);

    if (details && details.CardPictureUrl) {
      // Виправити подвійний images/ шлях
      let correctedPath = details.CardPictureUrl;
      if (correctedPath.startsWith('images/images/')) {
        correctedPath = correctedPath.replace('images/images/', 'images/');
        console.log('🖼️ [EXPERT_DETAILS] Corrected double images/ path:', correctedPath);
      }
      
      // Form full URL for MinIO proxy endpoint
      const minioUrl = `${API_BASE_URL}/api/SpecialistImage/proxy/${correctedPath}`;
      console.log('🖼️ [EXPERT_DETAILS] Generated MinIO URL:', minioUrl);
      return minioUrl;
    }

    console.log('🖼️ [EXPERT_DETAILS] No CardPictureUrl found in details');
    return null;
  };

  // Map images to specialists based on their ID (fallback for static images)
  const getSpecialistImageStatic = (id) => {
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

  // Get specialist image from API or fallback to local images
  const getSpecialistImage = (specialist) => {
    console.log('🖼️ [EXPERT_DETAILS] getSpecialistImage called for specialist:', specialist?.User?.FullName);
    
    // Try to get MinIO URL first
    const minioUrl = getCardPictureUrlMinio(specialist);
    if (minioUrl) {
      console.log('🖼️ [EXPERT_DETAILS] Using MinIO URL:', minioUrl);
      return minioUrl;
    }

    // First try to get ExpertDetailsPictureUrl from API
    if (specialist.PsychologistDetails?.ExpertDetailsPictureUrl) {
      return specialist.PsychologistDetails.ExpertDetailsPictureUrl;
    }
    if (specialist.DietitianDetails?.ExpertDetailsPictureUrl) {
      return specialist.DietitianDetails.ExpertDetailsPictureUrl;
    }
    if (specialist.TrainerDetails?.ExpertDetailsPictureUrl) {
      return specialist.TrainerDetails.ExpertDetailsPictureUrl;
    }
    if (specialist.DoctorDetails?.ExpertDetailsPictureUrl) {
      return specialist.DoctorDetails.ExpertDetailsPictureUrl;
    }
    
    // Then try SpecialistCardPictureUrl
    if (specialist.PsychologistDetails?.SpecialistCardPictureUrl) {
      return specialist.PsychologistDetails.SpecialistCardPictureUrl;
    }
    if (specialist.DietitianDetails?.SpecialistCardPictureUrl) {
      return specialist.DietitianDetails.SpecialistCardPictureUrl;
    }
    if (specialist.TrainerDetails?.SpecialistCardPictureUrl) {
      return specialist.TrainerDetails.SpecialistCardPictureUrl;
    }
    if (specialist.DoctorDetails?.SpecialistCardPictureUrl) {
      return specialist.DoctorDetails.SpecialistCardPictureUrl;
    }
    
    // Fallback to static images
    const staticImage = getSpecialistImageStatic(specialist.User?.FullName);
    console.log('🖼️ [EXPERT_DETAILS] Using static image fallback:', staticImage);
    return staticImage;
  };

const ExpertDetailsPage = () => {
  const { t } = useTranslation();
  const { id } = useParams(); // Get specialist ID from URL
  const [specialist, setSpecialist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showButton, setShowButton] = useState(false);
  
useEffect(() => {
  const fetchSpecialist = async () => {
    try {
      // 1. Пробуємо отримати з API
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/ProfessionalQualification/${id}`
      );

      if (!response.ok) {
        throw new Error("API request failed");
      }

      const apiData = await response.json();

      // Якщо API повертає масив → шукаємо по Id
      const foundApiSpecialist = Array.isArray(apiData)
        ? apiData.find((expert) => String(expert.Id) === String(id))
        : apiData;

      if (foundApiSpecialist) {
        setSpecialist(foundApiSpecialist);
        setLoading(false);
        return; // ✅ успішно знайшли в API
      }

      throw new Error("Not found in API");
    } catch (err) {
      // 2. Якщо API впав → fallback на локальні дані
      console.warn("API fetch failed, using local data:", err.message);

      const foundLocalSpecialist = Array.isArray(specialistsData)
        ? specialistsData.find((expert) => String(expert.Id) === String(id))
        : specialistsData[id]; // якщо зберігається як об'єкт

      if (foundLocalSpecialist) {
        setSpecialist(foundLocalSpecialist);
        setLoading(false);
      } else {
        setError("Specialist not found in API or local data");
        setLoading(false);
      }
    }
  };

  fetchSpecialist();
}, [id]);




  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      
      // Show button when scrolled to bottom (with 100px threshold)
      if (scrollTop + windowHeight >= documentHeight - 0) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSubscribe = () => {
    alert('Записано! Дякуємо за реєстрацію.');
  };

  if (loading) {
    // return <div>Loading...</div>;
    return <div></div>;
  }

  if (error) {
    // return <div>Error: {error}</div>;
    return <div></div>;
  }

return (
  <div className="scroll-data expert-details-container">
    <div className="two-column-layout">
      {/* Left Column: Specialist Details */}
      <div className="left-column">
        <div className="specialist-info">
          {/* Фото зліва */}
          <div className="image-wrapper">
            <div className="image-wrapper">
              <img
                className="specialist-image"
                alt={specialist.fullName || "Specialist"}
                src={getSpecialistImage(specialist)}
                onError={(e) => {
                  console.log('🖼️ [EXPERT_DETAILS] Image load error for specialist:', specialist?.User?.FullName, 'src:', e.target.src);
                  // Fallback to static image on error
                  const staticImage = getSpecialistImageStatic(specialist.User?.FullName);
                  if (e.target.src !== staticImage) {
                    console.log('🖼️ [EXPERT_DETAILS] Switching to static image fallback:', staticImage);
                    e.target.src = staticImage;
                  }
                }}
                onLoad={(e) => {
                  console.log('🖼️ [EXPERT_DETAILS] Image loaded successfully for specialist:', specialist?.User?.FullName, 'src:', e.target.src);
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Additional Content */}
      <div className="right-column">
        {/* Текст справа */}
          <div className="details-wrapper">
           <h1 className="specialist-name">
            <svg
                className="status-icon"
                width="60"
                height="60"
                viewBox="0 0 60 60"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="30" cy="30" r="30" fill="#D6FF00" />
                <path
                  d="M2 20.1818L11.2308 27L32 2"
                  stroke="#33363F"
                  strokeWidth="5"
                  transform="translate(14,16)"
                />
              </svg>
              {specialist.User?.FullName || "Unknown Specialist"}
            </h1>
            <div className="line">
              
            </div>
            <div className="about">
              <div className="about-header-wrapper">
                <h3 className="about-header">Про мене</h3>
                <SpecialistSocialLinks specialist={specialist} />
              </div>
              <SpecialistBiography specialist={specialist} />
            </div>
            
            <div className="skills">
              <SpecialistSkills specialist={specialist} />
            </div>
            {console.log(specialist)}
            <SpecialistWorkFormat specialist={specialist}/>
            
            {/* <div className="view-3">
              <div className="action-button">
                <button 
                  className={`subscribe-button ${showButton ? 'show' : 'hide'}`}
                  onClick={handleSubscribe}
                >
                  Записатися
                </button>
              </div>
              </div>
            */}
            
            </div>
            <div className="view-3">
              <div className="action-box">
              <button className="subscribe-button">{t('subscribe')}</button>
            </div>
          </div>
      </div>

      <h4 className="section-title">{t("tariffs")}</h4>
      <SubscribeSection/>

      <h4 className="section-title">{t("reviews")}</h4>
      <ReviewSection/>
    </div>
  </div>
);

};


export default ExpertDetailsPage;

