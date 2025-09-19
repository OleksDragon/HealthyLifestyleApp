import React, { useState, useEffect, useCallback } from "react";
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Filters from "../elements/Specialists/Filter/Filter";
import "../styles/specialists.css";
import { TrainerIcon } from "../elements/Specialists/SpecialistsIcons/TrainerIcon";
import { PsychologistIcon } from "../elements/Specialists/SpecialistsIcons/PsychologistIcon";
import { DoctorIcon } from "../elements/Specialists/SpecialistsIcons/DoctorIcon";
import { DietitianIcon } from "../elements/Specialists/SpecialistsIcons/DietitianIcon";
import { specialistsData } from "./SpecialistPages/LocalData/SpecialistsData"; // Import local data
import SpecCard from "../../components/elements/Specialists/SpecialistCard/SpecCard";



// Remove icon SVG
const RemoveIcon = () => (
  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1 1L9 9M9 1L1 9" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// Utility to get token from localStorage
const getToken = () => {
  return localStorage.getItem("helth-token");
};

const SpecialistsPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [specialists, setSpecialists] = useState([]);
  const [specialistsLocal, setSpecialistsLocal] = useState(specialistsData); // Use local data
  const [selectedValues, setSelectedValues] = useState({
    speciality: '',
    mode: '',
    experience: '',
    price: ''
  });
  const [isLoading, setIsLoading] = useState(true);

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
        { value: "100", label: t("price_100") },
        { value: "200", label: t("price_200") },
        { value: "500", label: t("price_500") },
        { value: "1000", label: t("price_1000") }
      ]
    }
  ];

  // Fetch specialists with authorization (optional, can be skipped if using only local data)
  const fetchSpecialists = useCallback(async () => {
    const token = getToken();
    if (!token) {
      console.warn("Токен не знайдено");
      setSpecialists(specialistsData); // Fallback to local data
      setSpecialistsLocal(specialistsData);
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      const response = await axios.get(
        `http://localhost:5260/api/ProfessionalQualification/all`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      setSpecialists(response.data);
      setSpecialistsLocal(response.data); // Use API data if available
    } catch (error) {
      console.error("Помилка при завантаженні спеціалістів:", error);
      setSpecialists(specialistsData); // Fallback to local data
      setSpecialistsLocal(specialistsData);
      if (error.response?.status === 401) {
        navigate('/login');
      }
    } finally {
      setIsLoading(false);
    }
  }, [navigate]);

  // Load specialists on mount
  useEffect(() => {
    fetchSpecialists();
  }, [fetchSpecialists]);

  // Apply client-side filtering
  useEffect(() => {
    const filtered = specialists.filter(spec => {
      return (
        (!selectedValues.speciality || spec.ProfessionalRoleType.Name === selectedValues.speciality) &&
        (!selectedValues.mode || spec.Mode === selectedValues.mode) && // Assumes Mode field exists
        (!selectedValues.experience || spec.Experience >= parseInt(selectedValues.experience)) && // Assumes Experience field
        (!selectedValues.price || spec.HourlyRate <= parseInt(selectedValues.price))
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
      price: ''
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
      const option = filter.options.find(opt => opt.value === value);
      return { key, label: option ? option.label : value };
    });

  if (isLoading) {
    return <div>{t("loading")}</div>;
  }

  return (
    <div className="specialists-page">
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
        <button className="location-btn" onClick={handleReset}>
          <svg width="21" height="27" viewBox="0 0 21 27" fill="none" xmlns="http://www.w3.org/2000/svg">
            <mask id="mask0_2141_5572" maskUnits="userSpaceOnUse" x="0" y="0" width="21" height="27">
              <path d="M10.375 26C10.375 26 19.75 18.5 19.75 10.375C19.75 5.1975 15.5525 1 10.375 1C5.1975 1 1 5.1975 1 10.375C1 18.5 10.375 26 10.375 26Z" fill="white" stroke="white" strokeWidth="2" strokeLinejoin="round" />
              <path d="M10.375 14.125C10.8675 14.125 11.3551 14.028 11.8101 13.8395C12.265 13.6511 12.6784 13.3749 13.0267 13.0267C13.3749 12.6784 13.6511 12.265 13.8395 11.8101C14.028 11.3551 14.125 10.8675 14.125 10.375C14.125 9.88254 14.028 9.39491 13.8395 8.93994C13.6511 8.48497 13.3749 8.07157 13.0267 7.72335C12.6784 7.37513 12.265 7.09891 11.8101 6.91045C11.3551 6.722 10.8675 6.625 10.375 6.625C9.38044 6.625 8.42661 7.02009 7.72335 7.72335C7.02009 8.42661 6.625 9.38044 6.625 10.375C6.625 11.3696 7.02009 12.3234 7.72335 13.0267C8.42661 13.7299 9.38044 14.125 10.375 14.125Z" fill="black" stroke="black" strokeWidth="2" strokeLinejoin="round" />
            </mask>
            <g mask="url(#mask0_2141_5572)">
              <path d="M-4.625 -1.5H25.375V28.5H-4.625V-1.5Z" fill="#0661CC" />
            </g>
          </svg>
        </button>
      </div>

      {/* Specialists List */}
      <div className="specialists-list">
        {console.log(specialistsLocal)}
        {specialistsLocal.length === 0 ? (
          <p>{t("no_specialists_found")}</p>
        ) : (
          specialistsLocal.map((spec) => (
            <SpecCard key={spec.Id} specialist={spec} />
          ))
        )}
      </div>
    </div>
  );
};

export default SpecialistsPage;