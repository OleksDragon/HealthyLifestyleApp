import React, { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import axios from "axios";
import "../styles/profile.css";
import ProfileIcon from "../icons/ProfileIcon.svg";
import CustomSelect from "../elements/custom-profile-data-select/CustomSelect";
import CustomDatePicker from "../elements/custom-birthdate-date-picker/CustomBirthdateDatePicker";
import TruncatedInput from '../elements/truncated-input/TruncatedInput';
import DataCard from "../elements/data-card/DataCard";

// Імпорт сервісних функцій
import {
  getCurrentLanguage,
  fetchCities,
  fetchStreets
} from '../services/LocationService';

const UserProfile = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [activeView, setActiveView] = useState({ achievements: 'list', purchases: 'list' });
  const [selectedItem, setSelectedItem] = useState(null);
  const [hasChanges, setHasChanges] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const [cityOptions, setCityOptions] = useState([]);
  const [streetOptions, setStreetOptions] = useState([]);
  const [loadingCities, setLoadingCities] = useState(false);
  const [loadingStreets, setLoadingStreets] = useState(false);

  // Кеш для збереження даних
  const citiesCache = useRef(new Map());
  const streetsCache = useRef(new Map());

  // Початкові дані
  const initialFormData = {
    firstName: '',
    lastName: '',
    gender: '',
    birthDate: '',
    height: '',
    weight: '',
    country: '',
    city: '',
    street: '',
    phoneCode: '',
    phoneNumber: '',
    about: '',
    avatarUrl: ''
  };

  const [formData, setFormData] = useState(initialFormData);
  const [originalFormData, setOriginalFormData] = useState(initialFormData);

  const achievementsData = [
  { 
    id: 1,
    date: "31.08", 
    text: "Тренування", 
    extra: "1 год",
    details: {
      fullDate: "31.08.2025\n17:05 - 18:10",
      message: "Масш успіхи!\nПродуктивний день!\nПройдено тренування 'NOMYFY ST'",
      duration: "1 год 05 хв",
      calories: "175 кКал",
      motivation: "ТІЛЬКИ ВПЕРЕД!"
    }
  },
  { id: 2, date: "11.07", text: "Пройдено марафон..." },
  { id: 3, date: "11.07", text: "Втрата ваги" },
  { id: 4, date: "11.07", text: "Ти молодець!" },
  { id: 5, date: "11.07", text: "Ти молодець!" },
];

// Дані для покупок
const purchasesData = [
  { id: 1, date: "31.08", text: "Футболка Nomy" },
  { id: 2, date: "11.07", text: "Підписка на тренування" },
  { id: 3, date: "11.07", text: "Футболка Nomy" },
  { id: 4, date: "11.07", text: "Футболка Nomy" },
  { id: 5, date: "11.07", text: "Футболка Nomy" },
  { id: 6, date: "11.07", text: "Футболка Nomy" },
];

  // Отримання токена
  const getToken = () => {
    return localStorage.getItem("helth-token");
  };

  // Завантаження даних профілю
  const fetchUserProfile = useCallback(async () => {
    try {
      setIsLoading(true);
      const token = getToken();
      if (!token) {
        console.warn("Токен не знайдено");
        return;
      }

      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/User/profile`,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      const userData = response.data;
      
      // Розбиваємо FullName на firstName та lastName
      const nameParts = userData.FullName?.split(' ') || [];
      const firstName = nameParts[0] || '';
      const lastName = nameParts.slice(1).join(' ') || '';

      // Конвертуємо дату народження
      const birthDate = userData.DateOfBirth && userData.DateOfBirth !== "0001-01-01T00:00:00" 
        ? formatDateFromBackend(userData.DateOfBirth)
        : '';

      // Конвертуємо стать
      const genderMapping = {
        'Male': t("p_male"),
        'Female': t("p_female"), 
        'Other': t("p_other")
      };
      const gender = genderMapping[userData.Gender] || '';

      // Розбиваємо телефон на код та номер
      let phoneCode = '';
      let phoneNumber = '';
      if (userData.Phone) {
        const phoneParts = userData.Phone.match(/^(\+\d{1,3})(\d+)$/);
        if (phoneParts) {
          phoneCode = phoneParts[1];
          phoneNumber = phoneParts[2];
        }
      }

      const newFormData = {
        firstName,
        lastName,
        gender,
        birthDate,
        height: userData.Height > 0 ? userData.Height.toString() : '',
        weight: userData.Weight > 0 ? userData.Weight.toString() : '',
        country: userData.Country || '',
        city: userData.City || '',
        street: userData.Street || '',
        phoneCode,
        phoneNumber,
        about: userData.Bio || '',
        avatarUrl: userData.ProfilePictureUrl || ''
      };

      setFormData(newFormData);
      setOriginalFormData(newFormData);
      
      // Якщо є аватар, встановлюємо попередній перегляд
      if (userData.ProfilePictureUrl) {
        setAvatarPreview(userData.ProfilePictureUrl);
      }

    } catch (error) {
      console.error("Помилка при завантаженні профілю:", error);
    } finally {
      setIsLoading(false);
    }
  }, [t]);

  // Форматування дати з бекенду
  const formatDateFromBackend = (dateString) => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return '';
      
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const year = date.getFullYear();
      return `${day} ${month} ${year}`;
    } catch (error) {
      console.error("Помилка форматування дати:", error);
      return '';
    }
  };

  // Ефект для завантаження даних при монтуванні
  useEffect(() => {
    fetchUserProfile();
  }, [fetchUserProfile]);

  // Ефект для перевірки змін
  useEffect(() => {
    const hasFormChanged = Object.keys(formData).some(key => {
      return formData[key] !== originalFormData[key];
    });
    setHasChanges(hasFormChanged);
  }, [formData, originalFormData]);

  const genderOptions = useMemo(() => [t("p_male"), t("p_female"), t("p_other")], [t]);

 const handleSelectChange = useCallback((field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  }, []);

const STATIC_COUNTRIES = useMemo(() => [
    t("p_ukrain_country"),
    t("p_great_britain_country"),
    t("p_germany_country"),
    t("p_france_country"),
    t("p_spain_country"),
    t("p_usa_country")    
  ], [t]);

  const COUNTRY_CODES = useMemo(() => ({
  [t("p_ukrain_country")]: 'UA',
  [t("p_great_britain_country")]: 'GB',
  [t("p_germany_country")]: 'DE',
  [t("p_france_country")]: 'FR',
  [t("p_spain_country")]: 'ES',
  [t("p_usa_country")]: 'US'
}), [t]);

// Завантаження міст
  // Завантаження міст
const loadCities = useCallback(async (countryName) => {
  if (!countryName) {
    setCityOptions([]);
    setFormData(prev => ({ ...prev, city: '' })); // Очищаємо місто при зміні країни
    return;
  }

  const countryCode = COUNTRY_CODES[countryName];
  if (!countryCode) {
    console.warn("Не знайдено код країни для:", countryName);
    setCityOptions([]);
    return;
  }

  const cacheKey = `${countryCode}-${getCurrentLanguage()}`;
  
  // Перевіряємо кеш
  if (citiesCache.current.has(cacheKey)) {
    const cachedCities = citiesCache.current.get(cacheKey);
    setCityOptions(cachedCities);
    return;
  }

  setLoadingCities(true);
  try {
    const cities = await fetchCities(countryCode);
    citiesCache.current.set(cacheKey, cities);
    setCityOptions(cities);
  } catch (error) {
    console.error('Помилка завантаження міст:', error);
    setCityOptions([]);
  } finally {
    setLoadingCities(false);
  }
}, [COUNTRY_CODES]);

  const loadStreets = useCallback(async (cityName, countryName) => {
  if (!cityName || !countryName) {
    setStreetOptions([]);
    setFormData(prev => ({ ...prev, street: '' })); // Очищаємо вулицю
    return;
  }

  const countryCode = COUNTRY_CODES[countryName];
  if (!countryCode) {
    console.warn("Не знайдено код країни для:", countryName);
    setStreetOptions([]);
    return;
  }

  const cacheKey = `${cityName}-${countryCode}-${getCurrentLanguage()}`;
  
  // Перевіряємо кеш
  if (streetsCache.current.has(cacheKey)) {
    const cachedStreets = streetsCache.current.get(cacheKey);
    setStreetOptions(cachedStreets);
    return;
  }

  setLoadingStreets(true);
  try {
    const streets = await fetchStreets(cityName, countryCode);
    const safeStreets = Array.isArray(streets) ? streets : [];
    streetsCache.current.set(cacheKey, safeStreets);
    setStreetOptions(safeStreets);
  } catch (error) {
    console.error('Помилка завантаження вулиць:', error);
    setStreetOptions([]);
  } finally {
    setLoadingStreets(false);
  }
}, [COUNTRY_CODES]);


  // Реакція на зміну мови
  useEffect(() => {
  if (formData.country) {
    loadCities(formData.country);
  } else {
    setCityOptions([]);
    setFormData(prev => ({ ...prev, city: '' })); // Очищаємо місто, якщо немає країни
  }
  if (formData.country && formData.city) {
    loadStreets(formData.city, formData.country);
  } else {
    setStreetOptions([]);
    setFormData(prev => ({ ...prev, street: '' }));
  }
}, [i18n.language, formData.country, formData.city, loadCities, loadStreets]);



  // Завантаження міст при зміні країни
  useEffect(() => {
    if (!formData.country) return;

    // Викликаємо loadCities без залежності від formData.city
    loadCities(formData.country);
  }, [formData.country, loadCities]);

  // Завантаження вулиць при зміні міста
useEffect(() => {
  if (formData.country && formData.city) {
    loadStreets(formData.city, formData.country);
  } else {
    setStreetOptions([]);
    setFormData(prev => ({ ...prev, street: '' })); // Очищаємо вулицю, якщо немає міста або країни
  }
}, [formData.city, formData.country, loadStreets]);

const handleCountryChange = async (value) => {
  handleSelectChange('country', value);
  setCityOptions([]); // Очіщаємо список
  handleSelectChange('city', ''); // Очищаємо вибране місто
};

  const handleCityChange = async (value) => {
  handleSelectChange('city', value);
  setStreetOptions([]); // Очищаємо список вулиць
  handleSelectChange('street', ''); // Очищаємо вибрану вулицю
};

  const phoneNumberOptions = useMemo(() => [
    '+380',
    '+44',
    '+49',
    '+33',
    '+34',
    '+1'
  ], []);

  // Функція для перевірки чи поле має значення
  const hasValue = (value) => {
    return value !== null && value !== undefined && value !== '';
  };

  // Функція для отримання класу в залежності від наявності значення
  const getInputClassName = (value, baseClassName) => {
    return hasValue(value) ? `${baseClassName} has-value` : baseClassName;
  };

  // Обробка вибору аватару
  const handleAvatarSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        setAvatarPreview(e.target.result);
        setFormData(prev => ({
          ...prev,
          avatarUrl: ''
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Функція для обробки текстових полів
  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Обробники для карток
  const handleItemClick = (type, item) => {
    setActiveView({ ...activeView, [type]: 'details' });
    setSelectedItem(item);
  };

  const handleBackClick = (type) => {
    setActiveView({ ...activeView, [type]: 'list' });
    setSelectedItem(null);
  };

  // Функція для відправки даних на бекенд
  const handleSubmit = async () => {
    try {
      setIsSaving(true);
      const token = getToken();
      if (!token) {
        console.log("Токен не знайдено.");
        return;
      }

      const genderMapping = {
        [t("p_male")]: 'Male',
        [t("p_female")]: 'Female', 
        [t("p_other")]: 'Other'
      };

      // Форматуємо дату для бекенду
      let formattedBirthDate = "0001-01-01";
      if (formData.birthDate) {
        const [day, month, year] = formData.birthDate.split(' ');
        formattedBirthDate = `${year}-${month}-${day}`;
      }

      const dataToSend = {
        FullName: `${formData.firstName} ${formData.lastName}`.trim(),
        DateOfBirth: formattedBirthDate,
        Gender: genderMapping[formData.gender] || genderMapping[t("p_other")],
        Weight: parseFloat(formData.weight) || 0,
        Height: parseInt(formData.height) || 0,
        ProfilePictureUrl: 'https://webmaestro.com.ua/img/blog/20201016122530_.jpeg',
        Bio: formData.about || '',
        Phone: `${formData.phoneCode}${formData.phoneNumber}`,
        Country: formData.country || '',
        City: formData.city || '',
        Street: formData.street|| ''
      };

      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/api/User/profile`,
        dataToSend,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.status === 200) {
        setOriginalFormData(formData);
        setHasChanges(false);
        setIsSaved(true);
      }

    } catch (error) {
      console.error("Помилка при оновленні профілю:", error);
      alert(t("p_error_upadate"));
    } finally {
      setIsSaving(false);
    }
  };

  const formatDate = (date) => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  };

  if (isLoading) {
    // return <div className="loading">Loading...</div>;
    return;
  }

  const handleDashboardDirect = () => {
    navigate("/dashboard");
  }

  // Функції для обробки вводу (Зріст та вага)
const handleHeightChange = (value) => {
  // Дозволяємо тільки цифри
  value = value.replace(/[^0-9]/g, '');
  // Видаляємо ведучі нулі (крім випадку, коли це єдиний 0)
  if (value.length > 1 && value.startsWith('0')) {
    value = value.replace(/^0+/, '');
  }
  // Обмежуємо довжину до 3 символів
  value = value.slice(0, 3);
  // Перевіряємо, щоб значення не перевищувало 250
  if (value && parseInt(value) > 250) {
    value = '250';
  }
  return value;
};

const handleHeightKeyPress = (e) => {
  // Дозволяємо тільки цифри
  if (!/[0-9]/.test(e.key)) {
    e.preventDefault();
  }
};

const handleWeightChange = (value, currentValue) => {
  // Дозволяємо тільки цифри та крапки
  value = value.replace(/[^0-9.]/g, '');
  // Замінюємо кому на крапку
  value = value.replace(/,/g, '.');
  // Не дозволяємо крапку на початку
  if (value.startsWith('.')) {
    return '';
  }
  // Перевіряємо кількість крапок
  if ((value.match(/\./g) || []).length > 1) {
    // Залишаємо тільки першу крапку
    const parts = value.split('.');
    value = parts[0] + '.' + parts.slice(1).join('');
  }
  if (value.includes('.')) {
    const parts = value.split('.');
    let beforeDot = parts[0];
    let afterDot = parts[1] || '';
    // Обмежуємо до 3 цифр перед крапкою
    beforeDot = beforeDot.slice(0, 3);
    // Видаляємо ведучі нулі перед крапкою (крім випадку "0.")
    if (beforeDot.length > 1 && beforeDot.startsWith('0') && beforeDot !== '0') {
      beforeDot = beforeDot.replace(/^0+/, '');
    }
    // Обмежуємо до 2 цифр після крапки
    afterDot = afterDot.slice(0, 2);
    // Перевіряємо, щоб значення не перевищувало 350
    if (beforeDot && parseInt(beforeDot) > 350) {
      beforeDot = '350';
      afterDot = '00'; // Якщо перевищило, встановлюємо максимальне значення
    } else if (beforeDot === '350' && afterDot && parseInt(afterDot) > 0) {
      // Якщо рівно 350, не дозволяємо дрібну частину більшу за 0
      afterDot = '00';
    }
    return beforeDot + '.' + afterDot;
  } else {
    // Якщо крапки немає, обмежуємо до 3 цифр
    value = value.slice(0, 3);
    // Видаляємо ведучі нулі (крім випадку "0")
    if (value.length > 1 && value.startsWith('0') && value !== '0') {
      value = value.replace(/^0+/, '');
    }
    // Перевіряємо, щоб значення не перевищувало 350
    if (value && parseInt(value) > 350) {
      value = '350';
    }
    return value;
  }
};

const handleWeightKeyPress = (e, currentValue) => {
  // Дозволяємо цифри та крапки
  if (!/[0-9.]/.test(e.key)) {
    e.preventDefault();
    return;
  }
  // Перевіряємо крапку
  if (e.key === '.') {
    // Не дозволяємо крапку на початку
    if (currentValue === '') {
      e.preventDefault();
      return;
    }
    // Не дозволяємо більше однієї крапки
    if (currentValue.includes('.')) {
      e.preventDefault();
      return;
    }
    // Перевіряємо, чи не перевищить значення 350 після додавання крапки
    const parts = currentValue.split('.');
    const beforeDot = parts[0];
    if (beforeDot && parseInt(beforeDot) > 350) {
      e.preventDefault();
    }
  } else {
    // Перевіряємо цифри
    if (currentValue.includes('.')) {
      // Якщо вже є крапка, перевіряємо частину після крапки
      const parts = currentValue.split('.');
      const beforeDot = parts[0];
      const afterDot = parts[1] || '';
      // Якщо перед крапкою вже 350, не дозволяємо вводити цифри після крапки
      if (beforeDot === '350' && afterDot.length < 2) {
        e.preventDefault();
        return;
      }
      // Перевіряємо загальне значення
      const testValue = beforeDot + '.' + afterDot + e.key;
      if (parseFloat(testValue) > 350) {
        e.preventDefault();
      }
    } else {
      // Якщо крапки немає, перевіряємо частину до крапки
      const testValue = currentValue + e.key;
      if (testValue && parseInt(testValue) > 350) {
        e.preventDefault();
      }
    }
  }
};

  // Якщо дані успішно збережено, показуємо повідомлення
  if (isSaved) {
    return (
    <div className="success-message-wrapper">
      <div className="success-message-container">
        <div className="success-message">
          <div className="success-title">{t("p_success_title")}</div>
          <div className="success-subtitle">
            {t("p_success_subtitle")}
          </div>
        </div>
      </div>

      <div className="profile-actions">
        <button onClick={handleDashboardDirect} className="save success-btn">
          {t("p_btn_home")}
        </button>
      </div>
    </div>
    );
  }

  return (
    <div className="user-profile-wrapper">
      <hr className="header-line-blure"/>
      <div className="user-profile">
        {/* Лівий стовпець */}
        <div className="profile-info">
          <div className="avatar">
            <label htmlFor="avatar-select" className="avatar-upload-label">
              <div className="avatar-image-container">
                {avatarPreview ? (
                  <img src={avatarPreview} alt="Avatar preview" className="avatar-preview" />
                ) : formData.avatarUrl ? (
                  <img src={formData.avatarUrl} alt="Profile" className="avatar-image" onError={(e) => {
                    e.target.src = ProfileIcon;
                  }} />
                ) : (
                  <img src={ProfileIcon} alt="Profile" className="profile-icon" />
                )}
              </div>
            </label>
            <input
              id="avatar-select"
              type="file"
              accept="image/*"
              onChange={handleAvatarSelect}
              style={{ display: 'none' }}
            />
          </div>

          <div className="about">
            <TruncatedInput
              value={formData.about}
              onChange={(value) => handleInputChange('about', value)}
              placeholder={t("p_about_placeholder")}
              maxVisibleChars={23}
              maxLength={1000}
              className={getInputClassName(formData.about, 'about-input')}
            />
          </div>
        </div>
        
        <DataCard
          title={t("p_your_achievements")}
          type="achievements"
          data={achievementsData}
          activeView={activeView.achievements}
          selectedItem={selectedItem}
          onItemClick={handleItemClick}
          onBackClick={handleBackClick}
        />

        {/* Центральний стовпець */}
        <div className="profile-fields">
          <TruncatedInput
            type="text"
            placeholder={t("p_first_name_placeholder")}
            className={getInputClassName(formData.firstName, 'long profile-fields-input first-name')}
            value={formData.firstName}
            onChange={(value) => handleInputChange('firstName', value)}
            maxVisibleChars={74}
            maxLength={128}
          />

          <TruncatedInput
            type="text"
            placeholder={t("p_last_name_placeholder")}
            className={getInputClassName(formData.lastName, 'long profile-fields-input last-name')}
            value={formData.lastName}
            onChange={(value) => handleInputChange('lastName', value)}
            maxVisibleChars={74}
            maxLength={128}
          />
          
          <CustomSelect
            id="gender"
            placeholder={t("p_gender_placeholder")}
            options={genderOptions}
            value={formData.gender}
            onChange={(value) => handleSelectChange('gender', value)}
            maxLength={20}
            className={getInputClassName(formData.gender, 'profile-fields-input short gender')}
          />

          <CustomDatePicker
            selected={formData.birthDate ? new Date(formData.birthDate.split(' ').reverse().join('-')) : null}
            onChange={(date) => {
              const formattedDate = formatDate(date);
              handleInputChange('birthDate', formattedDate);
            }}
            placeholder={t("p_birth_date_placeholder")}
          />

          <div className="input-with-suffix height">
            <input 
              type="text"
              inputMode="numeric"
              placeholder={t("p_height_placeholder")}
              className={getInputClassName(formData.height, 'short profile-fields-input')}
              value={formData.height}
              onChange={(e) => {
                const processedValue = handleHeightChange(e.target.value);
                handleInputChange('height', processedValue);
              }}
              onKeyPress={handleHeightKeyPress}
              maxLength={3}
            />
            {formData.height && <span className="input-suffix">{t("p_height_suffix")}</span>}
          </div>

          <div className="input-with-suffix weight">
            <input 
              type="text"
              inputMode="decimal"
              placeholder={t("p_weight_placeholder")} 
              className={getInputClassName(formData.weight, 'short profile-fields-input')}
              value={formData.weight}
              onChange={(e) => {
                const processedValue = handleWeightChange(e.target.value, formData.weight);
                handleInputChange('weight', processedValue);
              }}
              onKeyPress={(e) => handleWeightKeyPress(e, formData.weight)}
              maxLength={6}
            />
            {formData.weight && <span className="input-suffix">{t("p_weight_suffix")}</span>}
          </div>
        </div>
        
        <DataCard
          title={t("p_your_purchases")}
          type="purchases"
          data={purchasesData}
          activeView={activeView.purchases}
          selectedItem={selectedItem}
          onItemClick={handleItemClick}
          onBackClick={handleBackClick}
        />

        {/* Правий стовпець */}
        <div className="extra-fields">
          <CustomSelect
            id="country"
            placeholder={t("p_country_placeholder")}
            options={STATIC_COUNTRIES}
            value={formData.country}
            onChange={handleCountryChange}
            className={getInputClassName(formData.country, 'extra-fields-input short country')}
            maxVisibleChars={25}
          />
          <CustomSelect
            id="city"
            placeholder={loadingCities ? t("p_loading_cities") : t("p_city_placeholder")}
            options={cityOptions.map(city => city.label)}
            value={formData.city}
            onChange={handleCityChange}
            className={getInputClassName(formData.city, 'extra-fields-input short city')}
            maxVisibleChars={25}
            disabled={loadingCities || !formData.country}
          />
          <CustomSelect
            id="street"
            placeholder={loadingStreets ? t("p_loading_streets") : t("p_street_placeholder")}
            options={(streetOptions || []).map(street => street?.label || '')}
            value={formData.street}
            onChange={(value) => handleSelectChange('street', value)}
            className={getInputClassName(formData.street, 'extra-fields-input short street')}
            maxVisibleChars={25}
            disabled={loadingStreets || !formData.city}
          />

          <div className="phone">
            <CustomSelect
              id="phoneCode"
              placeholder="+380"
              options={phoneNumberOptions}
              value={formData.phoneCode}
              onChange={(value) => handleSelectChange('phoneCode', value)}
              className={getInputClassName(formData.phoneCode, 'extra-fields-input phone-code')}
            />
            <input 
              className={getInputClassName(formData.phoneNumber, 'extra-fields-input p_phone_number')}
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              placeholder={t("p_phone_number_placeholder")} 
              value={formData.phoneNumber}
              onChange={(e) => {
                let value = e.target.value.replace(/[^0-9]/g, '');
                value = value.slice(0, 11);
                handleInputChange('phoneNumber', value);
              }}
              onKeyPress={(e) => {
                if (!/[0-9]/.test(e.key)) {
                  e.preventDefault();
                }
              }}
              maxLength={11}
            />
          </div>
        </div>
      </div>

      {/* Кнопка під профілем */}
      <div className="profile-actions">
        <button 
          onClick={handleSubmit}
          className={hasChanges ? 'save' : 'save disabled'}
          disabled={!hasChanges || isSaving}
        >
          {isSaving ? t("p_btn_saving") : t("p_btn_save")}
        </button>
      </div>
    </div>
  );
};

export default UserProfile;