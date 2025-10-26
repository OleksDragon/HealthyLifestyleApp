
import React, { useState, useEffect, useCallback } from "react";
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Filters from "../elements/Specialists/Filter/Filter";
import "../styles/specialists.css";
import "../styles/profile.css";
import { TrainerIcon } from "../elements/Specialists/SpecialistsIcons/TrainerIcon";
import { PsychologistIcon } from "../elements/Specialists/SpecialistsIcons/PsychologistIcon";
import { DoctorIcon } from "../elements/Specialists/SpecialistsIcons/DoctorIcon";
import { DietitianIcon } from "../elements/Specialists/SpecialistsIcons/DietitianIcon";
import { specialistsData } from "./SpecialistPages/LocalData/SpecialistsData";
import SpecCard from "../../components/elements/Specialists/SpecialistCard/SpecCard";
import { CityMap } from "../elements/Specialists/LocationFilter/CityMap";

const RemoveIcon = () => (
  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1 1L9 9M9 1L1 9" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const SpecialistsPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [specialists, setSpecialists] = useState([]);
  const [specialistsLocal, setSpecialistsLocal] = useState(specialistsData);
  const [selectedValues, setSelectedValues] = useState({
  speciality: '',
  mode: '',
  experience: '',
  price: '',
  city: ''
});
  const [isLoading, setIsLoading] = useState(true);
  const [showSpecialistModal, setShowSpecialistModal] = useState(false);
  const [isCheckingQualification, setIsCheckingQualification] = useState(false);

  const getToken = () => {
    return localStorage.getItem("helth-token");
  };

  // Перевірка наявності кваліфікації спеціаліста
  const checkExistingQualification = async () => {
    try {
      const token = getToken();
      if (!token) return null;
      
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/ProfessionalQualification/my-qualifications`,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      
      const qualifications = response.data;
      if (qualifications && qualifications.length > 0) {
        // Повертаємо тип спеціаліста з кваліфікації
        return qualifications[0].ProfessionalRoleType?.Name || null;
      }
      return null;
    } catch (error) {
      console.error("Error checking qualification:", error);
      return null;
    }
  };

  // Обробник кліку на кнопку "Стати фахівцем"
  const handleBecomeSpecialistClick = async () => {
    const token = getToken();
    if (!token) {
      navigate("/login");
      return;
    }

    setIsCheckingQualification(true);
    
    const existingSpecialistType = await checkExistingQualification();
    
    setIsCheckingQualification(false);
    
    if (existingSpecialistType) {
      // Якщо кваліфікація існує - зберігаємо тип і переходимо
      localStorage.setItem("specialist-profile", existingSpecialistType);
      navigate("/profile/specialist");
    } else {
      // Якщо кваліфікації немає - показуємо модальне вікно
      setShowSpecialistModal(true);
    }
  };

  // Обробники для кнопок спеціалістів
  const handleSpecialistButtonClick = (specialistType) => {
    // Закриваємо модальне вікно після вибору
    setShowSpecialistModal(false);

    // Зберігаємо тип спеціаліста в localStorage
    localStorage.setItem("specialist-profile", specialistType);
    navigate("/profile/specialist");
  };

  // Закриття модального вікна при кліку на затемнену область
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      setShowSpecialistModal(false);
    }
  };

  // Filter configuration
  const filterConfig = [
    {
      key: "speciality",
      type: "select",
      label: t("filter_speciality"),
      options: [
        { value: "Psychologist", label: t("spec_psychologist"), icon: <PsychologistIcon /> },
        { value: "Doctor", label: t("spec_doctor"), icon: <DoctorIcon /> },
        { value: "Trainer", label: t("spec_trainer"), icon: <TrainerIcon /> },
        { value: "Dietitian", label: t("spec_dietitian"), icon: <DietitianIcon /> }
      ]
    },
    {
      key: "mode",
      type: "select",
      label: t("filter_mode"),
      options: [
        { value: "online", label: t("mode_online") },
        { value: "offline", label: t("mode_offline") },
        { value: "hybrid", label: t("mode_hybrid") }
      ]
    },
    {
      key: "experience",
      type: "select",
      label: t("filter_experience"),
      options: [
        { value: "1", label: t("experience_1") },
        { value: "3", label: t("experience_3") },
        { value: "5", label: t("experience_5") },
        { value: "10", label: t("experience_10") }
      ]
    },
    {
      key: "price",
      type: "select",
      label: t("filter_price"),
      options: [
        { value: "0-50", label: t("price_50") }, // Fixed label to match value
        { value: "51-75", label: t("price_75") }, // Fixed label to match value
        { value: "76-100", label: t("price_100") },
        { value: "101-150", label: t("price_150") }
      ]
    }
  ];

  const parsePriceRange = (range) => {
    if (!range || typeof range !== 'string' || !range.includes('-')) return null;
    const [minStr, maxStr] = range.split('-');
    const min = parseInt(minStr, 10);
    const max = parseInt(maxStr, 10);
    if (Number.isNaN(min) || Number.isNaN(max)) return null;
    return { min, max };
  };

  // Utility to map workFormat to mode
  const getModeFromWorkFormat = (workFormat) => {
    if (!Array.isArray(workFormat)) return null;
    const lowerCaseFormats = workFormat.map(format => format.toLowerCase());
    const hasOnline = lowerCaseFormats.some(format => format.includes("онлайн") || format.includes("zoom"));
    const hasOffline = lowerCaseFormats.some(format => format.includes("очні") || format.includes("клініці"));
    
    if (hasOnline && hasOffline) return "hybrid";
    if (hasOnline) return "online";
    if (hasOffline) return "offline";
    return null; // No match
  };

  // Utility to get years of experience based on role
  const getYearsOfExperience = (spec) => {
    if (spec.ProfessionalRoleType.Name === "Doctor" && spec.DoctorDetails) {
      return spec.DoctorDetails.YearsOfExperience || 0;
    } else if (spec.ProfessionalRoleType.Name === "Psychologist" && spec.PsychologistDetails) {
      return spec.PsychologistDetails.YearsOfExperience || 0;
    } else if (spec.ProfessionalRoleType.Name === "Trainer" && spec.TrainerDetails) {
      return spec.TrainerDetails.YearsOfExperience || 0;
    } else if (spec.ProfessionalRoleType.Name === "Dietitian" && spec.DietitianDetails) {
      return spec.DietitianDetails.YearsOfExperience || 0;
    }
    return 0; // Default if no role-specific details
  };

  // Fetch specialists with authorization
  const fetchSpecialists = useCallback(async () => {
    const token = getToken();
    if (!token) {
      console.info("🔑 Токен не знайдено, використовую локальні дані");
      setSpecialists(specialistsData);
      setSpecialistsLocal(specialistsData);
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/ProfessionalQualification/all`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const apiData = response.data;
      if (Array.isArray(apiData) && apiData.length > 0) {
        setSpecialists(apiData);
        setSpecialistsLocal(apiData);
      } else {
        console.warn("⚠️ API повернув порожній список, використовую локальні дані");
        setSpecialists(specialistsData);
        setSpecialistsLocal(specialistsData);
      }
    } catch (error) {
      console.error("❌ Помилка при завантаженні спеціалістів:", error);
      setSpecialists(specialistsData);
      setSpecialistsLocal(specialistsData);
      if (error.response?.status === 401) {
        navigate("/login");
      }
    } finally {
      setIsLoading(false);
    }
  }, [navigate]);

  // Load specialists on mount
  useEffect(() => {
    fetchSpecialists();
  }, [fetchSpecialists]);

  const cityOptions = React.useMemo(() => {
    const all = (specialists.length ? specialists : specialistsLocal) || [];
    const set = new Set();
    all.forEach(s => { if (s?.User?.City) set.add(s.User.City); });
    return Array.from(set).map(c => ({ value: c, label: c }));
  }, [specialists, specialistsLocal]);

  // Apply client-side filtering
  useEffect(() => {
    const filtered = specialists.filter(spec => {
      const mode = getModeFromWorkFormat(spec.workFormat);
      const experience = getYearsOfExperience(spec);
      const price = Number(spec.HourlyRate);

      let priceOk = true;
      if (selectedValues.price) {
        const range = parsePriceRange(selectedValues.price);
        if (range) {
          priceOk = !Number.isNaN(price) && price >= range.min && price <= range.max;
        }
      }

      return (
        (!selectedValues.speciality || spec.ProfessionalRoleType?.Name === selectedValues.speciality) &&
        (!selectedValues.mode || mode === selectedValues.mode) &&
        (!selectedValues.experience || experience >= parseInt(selectedValues.experience)) &&
        (!selectedValues.city || spec?.User?.City === selectedValues.city) &&
        priceOk
      );
    });
    setSpecialistsLocal(filtered);
  }, [specialists, selectedValues]);

  // Handle filter selection
  const handleSelectChange = (key, value) => {
    setSelectedValues(prev => ({
      ...prev,
      [key]: value
    }));
  };

  // Reset all filters
  const handleReset = () => {
    setSelectedValues({
      speciality: '',
      mode: '',
      experience: '',
      price: '',
      city: ''
    });
  };

  // Remove a specific filter
  const handleRemoveFilter = (key) => {
    setSelectedValues(prev => ({
      ...prev,
      [key]: ''
    }));
  };

  // Get active filters for breadcrumbs
  const activeFilters = Object.entries(selectedValues)
    .filter(([_, value]) => value !== '')
    .map(([key, value]) => {
      const filter = filterConfig.find(f => f.key === key);
      const option = filter?.options?.find(opt => opt.value === value);
      return { key, label: option ? option.label : value };
    });

  // Scroll-to-show button logic
  useEffect(() => {
    const handleScroll = () => {
      const subscribeButton = document.querySelector(".subscribe-main-button");
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollPosition = window.scrollY || window.pageYOffset;

      if (scrollPosition + windowHeight >= documentHeight - 50) {
        subscribeButton.classList.add("visible");
        subscribeButton.classList.remove("hidden");
      } else {
        subscribeButton.classList.remove("visible");
        subscribeButton.classList.add("hidden");
      }
    };

    document.addEventListener("scroll", handleScroll);
    return () => document.removeEventListener("scroll", handleScroll);
  }, []);

  if (isLoading) {
    return <div>{/*{t("loading")}*/}</div>;
  }




  return (
    <div className={`specialists-page ${showSpecialistModal ? 'blurred' : ''}`}>
      {/* Breadcrumbs */}
      <div className="breadcrumbs">
        <div className="reset-align">
          {activeFilters.map((filter) => (
            <div key={filter.key} className="breadcrumb-item">
              <span className={filter.key === 'speciality' ? 'active' : ''}>
                {filter.label}
              </span>
              <span
                className="remove-icon"
                onClick={() => handleRemoveFilter(filter.key)}
              >
                <RemoveIcon />
              </span>
            </div>
          ))}
        </div>
        {activeFilters.length > 0 && (
          <div className="breadcrumb-item clear-filter-container">
            <a
              href="#"
              className="clear-filter"
              onClick={(e) => {
                e.preventDefault();
                handleReset();
              }}
            >
              {t("clear_filter")}
            </a>
          </div>
        )}
      </div>

      {/* Filters */}
      <div className="filter-container">
        {filterConfig.map(filter => (
          <Filters
            key={filter.key}
            id={`${filter.key}Select`}
            placeholder={filter.label}
            options={filter.options}
            value={selectedValues[filter.key]}
            onChange={(value) => handleSelectChange(filter.key, value)}
            maxVisibleChars={15}
          />
        ))}
        
        {/* <button className="location-btn" onClick={handleReset}>
          <svg width="21" height="27" viewBox="0 0 21 27" fill="none" xmlns="http://www.w3.org/2000/svg">
            <mask id="mask0_2141_5572" maskUnits="userSpaceOnUse" x="0" y="0" width="21" height="27">
              <path d="M10.375 26C10.375 26 19.75 18.5 19.75 10.375C19.75 5.1975 15.5525 1 10.375 1C5.1975 1 1 5.1975 1 10.375C1 18.5 10.375 26 10.375 26Z" fill="white" stroke="white" strokeWidth="2" strokeLinejoin="round" />
              <path d="M10.375 14.125C10.8675 14.125 11.3551 14.028 11.8101 13.8395C12.265 13.6511 12.6784 13.3749 13.0267 13.0267C13.3749 12.6784 13.6511 12.265 13.8395 11.8101C14.028 11.3551 14.125 10.8675 14.125 10.375C14.125 9.88254 14.028 9.39491 13.8395 8.93994C13.6511 8.48497 13.3749 8.07157 13.0267 7.72335C12.6784 7.37513 12.265 7.09891 11.8101 6.91045C11.3551 6.722 10.8675 6.625 10.375 6.625C9.38044 6.625 8.42661 7.02009 7.72335 7.72335C7.02009 8.42661 6.625 9.38044 6.625 10.375C6.625 11.3696 7.02009 12.3234 7.72335 13.0267C8.42661 13.7299 9.38044 14.125 10.375 14.125Z" fill="black" stroke="black" strokeWidth="2" strokeLinejoin="round" />
            </mask>
            <g mask="url(#mask0_2141_5572)">
              <path d="M-4.625 -1.5H25.375V28.5H-4.625V-1.5Z" fill="#0661CC" />
            </g>
          </svg>
          
        </button> */}
        <CityMap 
          city={selectedValues.city} 
          onCityChange={(value) => handleSelectChange("city", value)} 
          cities={cityOptions} 
        />
      </div>

      {/* Specialists List + Join Section */}
      <div className="content-container scroll-data">
        <div className="specialists-list">
          {specialistsLocal.length === 0 ? (
            <p>{t("no_specialists_found")}</p>
          ) : (
            specialistsLocal.map((spec, i) => (
              <SpecCard key={spec.Id} specialist={spec} index={i} />
            ))
          )}
        </div>
        <div className="join-section">
          <h1 className="text-wrapper">{t("join_team")}</h1>
          <div className="property-default-wrapper" onClick={handleBecomeSpecialistClick} style={{cursor: 'pointer'}}>
            <span>{t("become_specialist")}</span>
          </div>
        </div>
       
      </div>

      {/* Затемнення при відкритті модального вікна */}
      {showSpecialistModal && (
        <div 
          className="pp-modal-overlay" 
          onClick={handleOverlayClick}
        />
      )}

      {/* Модальне вікно з кнопками спеціалістів */}
      {showSpecialistModal && (
        <div className="pp-specialist-modal">
          <div className="pp-specialist-modal-content">
            <div className="pp-specialist-buttons">
              <button 
                className="pp-specialist-btn pp-doctor"
                onClick={() => handleSpecialistButtonClick('Doctor')}
              >
                {t("spec_doctor")}
              </button>
              <button 
                className="pp-specialist-btn pp-trainer"
                onClick={() => handleSpecialistButtonClick('Trainer')}
              >
                {t("spec_trainer")}
              </button>
              <button 
                className="pp-specialist-btn pp-psychologist"
                onClick={() => handleSpecialistButtonClick('Psychologist')}
              >
                {t("spec_psychologist")}
              </button>
              <button 
                className="pp-specialist-btn pp-dietitian"
                onClick={() => handleSpecialistButtonClick('Dietitian')}
              >
                {t("spec_dietitian")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SpecialistsPage;