import React, {/*useEffect,*/ useState } from "react";
import { useTranslation } from 'react-i18next';
// import { useNavigate, useLocation } from "react-router-dom";

import CustomDatePicker from "../../../elements/Health/FemaleHealth/CustomDatePicker/CustomDatePicker";
import FemaleCustomSelect from "../../../elements/Health/FemaleHealth/CustomSelector/FemaleCustomSelect";

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

  const [selectedNumber1, setSelectedNumber1] = useState('');
  const [selectedNumber2, setSelectedNumber2] = useState('');
  const numbers1to10 = Array.from({ length: 10 }, (_, i) => (i + 1).toString());
  const numbers1to32 = Array.from({ length: 32 }, (_, i) => (i + 1).toString());  
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
          const formattedDate = formatDate(date);
          handleInputChange('cycleStartDate', formattedDate);
        }}
        placeholder={t("last_cycle_first_day")}
        minAge={0}
      />

      {/* CustomSelect для вибору числа від 1 до 10 */}
      <FemaleCustomSelect
        id="number-1-10"
        placeholder="Тривалість місячних(дні)"
        options={numbers1to10}
        value={selectedNumber1}
        onChange={(val) => setSelectedNumber1(val)}
        maxVisibleChars={3}
        className="femail-custom-select"
      />
    
      {/* CustomSelect для вибору числа від 1 до 32 */}
      <FemaleCustomSelect
        id="number-1-32"
        placeholder="Тривалість циклу"
        options={numbers1to32}
        value={selectedNumber2}
        onChange={(val) => setSelectedNumber2(val)}
        maxVisibleChars={3}
        className="femail-custom-select"
      />
  </div>
  );
}

export default GenderHealthPage;