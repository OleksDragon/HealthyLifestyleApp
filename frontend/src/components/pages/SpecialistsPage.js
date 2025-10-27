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
import FilterBig from "../../assets/specialists-img/Filter_big.svg"
import ArrowLeft from "../../assets/profile-icons/ArrowLeft.svg"

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
  const [showFiltersMenu, setShowFiltersMenu] = useState(false);
  // Альтернативний більш надійний варіант з використанням стану для ширини екрану
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 431);

  const getToken = () => {
    return localStorage.getItem("helth-token");
  };

  // Ефект для відстеження зміни розміру вікна
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 431);
    };

    window.addEventListener('resize', handleResize);
    // Викликаємо одразу для встановлення початкового стану
    handleResize();
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
    <div className="specialists-page">
       {/* Мобільний заголовок - тільки для мобільних */}
      {isMobile && (
        <div className="spma-mobile-specialists-header">
          <button 
            className="spma-mobile-back-button"
            onClick={() => window.history.back()}
          >
            <img src={ArrowLeft} alt="Back" className="spma-mobile-back-arrow" />
          </button>
          <h1 className="spma-mobile-specialists-title">{t("specialists")}</h1>
          <button 
            className="spma-mobile-filter-button"
            onClick={() => setShowFiltersMenu(true)}
          >
            <img src={FilterBig} alt="Filter" className="spma-mobile-filter-icon" />
          </button>
        </div>
      )}

      {/* Бургер-меню фільтрів - тільки для мобільних */}
      {isMobile && (
        <>
          <div className={`filters-overlay ${showFiltersMenu ? 'active' : ''}`} 
            onClick={() => setShowFiltersMenu(false)} />
          
          <div className={`spma-mobile-filters-menu ${showFiltersMenu ? 'active' : ''}`}>
            <div className="spma-mobile-filters-header">
              <button 
                className="spma-mobile-close-filters"
                onClick={() => setShowFiltersMenu(false)}
              >
                ×
              </button>
            </div>
            
            <div className="spma-mobile-filter-items">
              {filterConfig.map(filter => (
                <div key={filter.key} className="spma-mobile-filter-item">
                  <Filters
                    id={`mobile-${filter.key}Select`}
                    placeholder={filter.label}
                    options={filter.options}
                    value={selectedValues[filter.key]}
                    onChange={(value) => handleSelectChange(filter.key, value)}
                    maxVisibleChars={15}
                  />
                </div>
              ))}
              
              <div className="spma-mobile-filter-item spma-mobile-location-item">
                <CityMap 
                  city={selectedValues.city} 
                  onCityChange={(value) => handleSelectChange("city", value)} 
                  cities={cityOptions} 
                />
              </div>
            </div>

            {/* Активні фільтри */}
            {activeFilters.length > 0 && (
              <div className="spma-mobile-active-filters">
                {activeFilters.map((filter) => (
                  <div key={filter.key} className="spma-mobile-active-filter">
                    <span>{filter.label}</span>
                    <button 
                      className="spma-mobile-remove-filter"
                      onClick={() => handleRemoveFilter(filter.key)}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}
      
      {/* Затемнення при відкритті модального вікна */}
      {showSpecialistModal && (
        <div 
          className="pp-modal-overlay" 
          onClick={handleOverlayClick}
        />
      )}
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

      {/* Filters - тільки для десктопу */}
      {!isMobile && (
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
          
          <CityMap 
            city={selectedValues.city} 
            onCityChange={(value) => handleSelectChange("city", value)} 
            cities={cityOptions} 
          />
        </div>
      )}

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

      {/* Модальне вікно з кнопками спеціалістів */}
      {showSpecialistModal && (
        <div className="sp-specialist-modal">
          <div className="sp-specialist-modal-content">
            <div className="sp-specialist-buttons">
              <button 
                className="sp-specialist-btn sp-doctor"
                onClick={() => handleSpecialistButtonClick('Doctor')}
              >
                {t("spec_doctor")}
              </button>
              <button 
                className="sp-specialist-btn sp-trainer"
                onClick={() => handleSpecialistButtonClick('Trainer')}
              >
                {t("spec_trainer")}
              </button>
              <button 
                className="sp-specialist-btn sp-psychologist"
                onClick={() => handleSpecialistButtonClick('Psychologist')}
              >
                {t("spec_psychologist")}
              </button>
              <button 
                className="sp-specialist-btn sp-dietitian"
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
