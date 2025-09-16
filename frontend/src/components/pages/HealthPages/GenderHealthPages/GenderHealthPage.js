
import React, { useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';
// import { useNavigate, useLocation } from "react-router-dom";

import CustomDatePicker from "../../../elements/Health/FemaleHealth/CustomDatePicker/CustomDatePicker";

import '../../../styles/gender.css'

const GenderHealthPage = () => {
    const { t } = useTranslation();

    // Початкові дані
    const initialFormData = {
      cycleStartDate: '',
    };
  
    const [formData, setFormData] = useState(initialFormData);

    const formatDate = (date) => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
    };

    // Функція для обробки текстових полів
  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div>
      <CustomDatePicker
        selected={formData.cycleStartDate ? new Date(formData.cycleStartDate.split(' ').reverse().join('-')) : null}
        onChange={(date) => {
            const formattedDate = formatDate(date); // 1. Форматуємо дату
            handleInputChange('cycleStartDate', formattedDate); // 2. Зберігаємо у стані
        }}
        placeholder={t("last_cycle_first_day")}
        minAge={0}
    />
        
    </div>
    );
}

export default GenderHealthPage;