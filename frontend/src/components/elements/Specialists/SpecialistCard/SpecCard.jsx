// src/components/SpecialistCard.js
import React from 'react';
import './SpecCard.css';
import card1Img from '../../../../assets/specialists-img/card-1.png';
import card4Img from '../../../../assets/specialists-img/card-4.png';
import card5Img from '../../../../assets/specialists-img/card-5.png';
import card2Img from '../../../../assets/specialists-img/card-2.png';
import card3Img from '../../../../assets/specialists-img/card-3.png';
import card6Img from '../../../../assets/specialists-img/card-6.png';
import { useTranslation } from 'react-i18next';

// Placeholder for SolarHeartLinear
const SolarHeartLinear = ({ className, vectorClassName }) => (
  <svg
    className={className}
    width="22" height="19" viewBox="0 0 22 19" fill="none" xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M11 3.69391L10.4977 4.16624C10.5628 4.23217 10.6408 4.28461 10.7271 4.32043C10.8134 4.35625 10.9062 4.37472 11 4.37472C11.0938 4.37472 11.1866 4.35625 11.2729 4.32043C11.3592 4.28461 11.4372 4.23217 11.5023 4.16624L11 3.69391ZM8.60558 15.3404C7.19535 14.255 5.65395 13.195 4.4307 11.8507C3.23256 10.5318 2.39535 8.99398 2.39535 6.99748H1C1 9.41907 2.03256 11.2666 3.38791 12.7553C4.71814 14.2177 6.41488 15.3895 7.7414 16.4104L8.60558 15.3404ZM2.39535 6.99748C2.39535 5.04459 3.52558 3.40597 5.06884 2.71655C6.56837 2.04712 8.58326 2.22424 10.4977 4.16624L11.5023 3.22249C9.23256 0.918075 6.59442 0.537488 4.48837 1.4776C2.42884 2.39773 1 4.53411 1 6.99748H2.39535ZM7.7414 16.4104C8.2186 16.7774 8.73023 17.168 9.24837 17.4641C9.76651 17.7602 10.3581 18 11 18V16.6375C10.7116 16.6375 10.373 16.5285 9.95256 16.2878C9.53116 16.048 9.09488 15.7174 8.60558 15.3404L7.7414 16.4104ZM14.2586 16.4104C15.5851 15.3886 17.2819 14.2186 18.6121 12.7553C19.9674 11.2657 21 9.41907 21 6.99748H19.6047C19.6047 8.99398 18.7674 10.5318 17.5693 11.8507C16.346 13.195 14.8047 14.255 13.3944 15.3404L14.2586 16.4104ZM21 6.99748C21 4.53411 19.5721 2.39773 17.5116 1.4776C15.4056 0.537488 12.7693 0.918075 10.4977 3.22158L11.5023 4.16624C13.4167 2.22515 15.4316 2.04712 16.9312 2.71655C18.4744 3.40597 19.6047 5.04368 19.6047 6.99748H21ZM13.3944 15.3404C12.9051 15.7174 12.4688 16.048 12.0474 16.2878C11.626 16.5276 11.2884 16.6375 11 16.6375V18C11.6419 18 12.2335 17.7593 12.7516 17.4641C13.2707 17.168 13.7814 16.7774 14.2586 16.4104L13.3944 15.3404Z" fill="#0661CC" />
    <path d="M8.17395 15.8745L8.60558 15.3404M8.60558 15.3404C7.19535 14.255 5.65395 13.195 4.4307 11.8507C3.23256 10.5318 2.39535 8.99398 2.39535 6.99748M8.60558 15.3404L7.7414 16.4104M8.60558 15.3404C9.09488 15.7174 9.53116 16.048 9.95256 16.2878C10.373 16.5285 10.7116 16.6375 11 16.6375M10.4977 4.16624L11 3.69391L11.5023 4.16624M10.4977 4.16624C10.5628 4.23217 10.6408 4.28461 10.7271 4.32043C10.8134 4.35625 10.9062 4.37472 11 4.37472C11.0938 4.37472 11.1866 4.35625 11.2729 4.32043C11.3592 4.28461 11.4372 4.23217 11.5023 4.16624M10.4977 4.16624C8.58326 2.22424 6.56837 2.04712 5.06884 2.71655C3.52558 3.40597 2.39535 5.04459 2.39535 6.99748M10.4977 4.16624L11.5023 3.22249C9.23256 0.918075 6.59442 0.537488 4.48837 1.4776C2.42884 2.39773 1 4.53411 1 6.99748M11.5023 4.16624L10.4977 3.22158C12.7693 0.918075 15.4056 0.537488 17.5116 1.4776C19.5721 2.39773 21 4.53411 21 6.99748M11.5023 4.16624C13.4167 2.22515 15.4316 2.04712 16.9312 2.71655C18.4744 3.40597 19.6047 5.04368 19.6047 6.99748M13.826 15.8745L14.2586 16.4104M14.2586 16.4104C15.5851 15.3886 17.2819 14.2186 18.6121 12.7553C19.9674 11.2657 21 9.41907 21 6.99748M14.2586 16.4104L13.3944 15.3404M14.2586 16.4104C13.7814 16.7774 13.2707 17.168 12.7516 17.4641C12.2335 17.7593 11.6419 18 11 18M2.39535 6.99748H1M1 6.99748C1 9.41907 2.03256 11.2666 3.38791 12.7553C4.71814 14.2177 6.41488 15.3895 7.7414 16.4104M7.7414 16.4104C8.2186 16.7774 8.73023 17.168 9.24837 17.4641C9.76651 17.7602 10.3581 18 11 18M11 18V16.6375M11 16.6375C11.2884 16.6375 11.626 16.5276 12.0474 16.2878C12.4688 16.048 12.9051 15.7174 13.3944 15.3404M21 6.99748H19.6047M19.6047 6.99748C19.6047 8.99398 18.7674 10.5318 17.5693 11.8507C16.346 13.195 14.8047 14.255 13.3944 15.3404" stroke="#0661CC" />

  </svg>
);

const SpecialistCard = ({ specialist, index }) => {
  const { t } = useTranslation();

  // Map images to specialists based on their Id
  const getSpecialistImage = (id) => {
    const imageMap = {
      '7e69a44f-c26c-445a-b9bf-0e5539561766': card1Img, // Маргарита Дронова
      '5af807b3-ed6a-408a-9e5f-274ac09bfbe2': card4Img, // Олексій Коваленко
      'bea4e6a2-d57b-49ca-8cec-4675cfb3cb46': card5Img, // Анна Сидоренко
      'fdb1cdca-b0b0-40b2-a831-5859b5d7a64d': card3Img, // Ігор Петренко
      'fd5fb36d-486f-4ea5-851e-617ab861cbe7': card2Img, // Вікторія Лисенко
      'fd5fb36d-486f-4ea5-851e-617ab861cbe6': card6Img // Вікторія Лисенко
    };
    return imageMap[id] || card6Img; // Use card-6.png as fallback
  };

  return (
    <div className="frame">
        <img className="div" />
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
        {/* {specialist.Description} */}
      </p>
      <div
  className="rectangle-2"
  style={index % 2 === 0 ? {} : { width: "130.8571px" }}
>
  <div className="text-wrapper-2" style={index % 2 === 0 ? { left: "50px",top: "12.5px" } : { left: "40.8571px", top: "12.5px"}}>
    {index % 2 === 0 ? (
      t("top_5")
    ) : 
      t("recomend")
    }
  </div>
</div>


      <div className="rectangle-3" />
      <div className="text-wrapper-3">{t('subscribe')}</div>
    </div>
  );
};

export default SpecialistCard;