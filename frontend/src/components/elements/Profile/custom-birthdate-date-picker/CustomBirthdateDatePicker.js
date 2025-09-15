import React, { useState, useRef, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import { useTranslation } from 'react-i18next';
import 'react-datepicker/dist/react-datepicker.css';
import './CustomBirthdateDatePicker.css';
import arrow_v_blue from '../../../../assets/profile-icons/arrow_v_blue.svg';

// Спеціалізований CustomSelect для вибору місяців/років у стилі CustomSelect
const YearMonthSelect = ({ value, options, onChange, className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentOption = options.find(option => option.value === value);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (optionValue) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  const hasValue = (value) => {
    return value !== null && value !== undefined && value !== '';
  };

  return (
    <div className={`custom-select year-month-select ${className} ${isOpen ? 'expanded' : ''} ${hasValue(value) ? 'has-value' : ''}`} ref={selectRef}>
      <div className="select-header" onClick={toggleDropdown}>
        <div className="select-input">
          {currentOption?.label || '—'}
          <span className="date-select-arrow">
          <img src={arrow_v_blue} alt="arrow down" className="date-arrow-v-blue" />
        </span>
        </div>
        
      </div>
      
      {isOpen && (
        <div className="select-options-container">
          <div className='supp-date-container'>
            <div className="select-options">
            {options.map((option, index) => (
              <div
                key={index}
                className={`select-option ${option.value === value ? 'selected' : ''}`}
                onClick={() => handleOptionClick(option.value)}
              >
                {option.label}
              </div>
            ))}
          </div>
          </div>
          
        </div>
      )}
    </div>
  );
};

const CustomBirthdateDatePicker = ({ selected, onChange, placeholder, className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [displayDate, setDisplayDate] = useState(() => (selected instanceof Date ? selected : new Date()));
  const { t } = useTranslation();
  const minAge = 16;

  const months = [
    t("p_january"), t("p_february"), t("p_march"), t("p_april"), t("p_may"), t("p_june"),
    t("p_july"), t("p_august"), t("p_september"), t("p_october"), t("p_november"), t("p_december")
  ];

  const weekdayMap = {
    'Monday': t("p_monday"),
    'Tuesday': t("p_tuesday"),
    'Wednesday': t("p_wednesday"),
    'Thursday': t("p_thursday"),
    'Friday': t("p_friday"),
    'Saturday': t("p_saturday"),
    'Sunday': t("p_sunday")
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 1900 + 1 }, (_, i) => currentYear - i);
  const monthsOptions = months.map((m, idx) => ({ value: idx, label: m }));

  useEffect(() => {
    if (selected instanceof Date) {
      if (!displayDate || selected.getTime() !== displayDate.getTime()) {
        setDisplayDate(selected);
      }
    }
  }, [selected, displayDate]);

  // Функція для перевірки віку та корекції дати
  const validateAndCorrectAge = (date) => {
    const today = new Date();
    const minBirthDate = new Date();
    minBirthDate.setFullYear(today.getFullYear() - minAge);
    minBirthDate.setHours(0, 0, 0, 0);
    
    let correctedDate = new Date(date);
    correctedDate.setHours(0, 0, 0, 0);

    if (correctedDate > minBirthDate) {
      correctedDate = new Date(minBirthDate);
    }

    return correctedDate;
  };

  const handleYearChange = (year) => {
    const newDate = new Date(displayDate);
    newDate.setFullYear(year);
    const normalized = normalizeDate(newDate);
    const validatedDate = validateAndCorrectAge(normalized);
    onChange(validatedDate);
    setDisplayDate(validatedDate);
  };

  const handleMonthChange = (monthIndex) => {
    const newDate = new Date(displayDate);
    newDate.setMonth(monthIndex);
    const normalized = normalizeDate(newDate);
    const validatedDate = validateAndCorrectAge(normalized);
    onChange(validatedDate);
    setDisplayDate(validatedDate);
  };

  const handleDayClick = (date) => {
    const newDate = new Date(displayDate);
    newDate.setDate(date.getDate());
    newDate.setHours(0, 0, 0, 0);

    const validatedDate = validateAndCorrectAge(newDate);
    onChange(validatedDate);
    setDisplayDate(validatedDate);
    setIsOpen(false);
  };

  const normalizeDate = (date) => {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    return d;
  };

  const formatWeekDay = (weekdayName) => {
    return weekdayMap[weekdayName] || weekdayName;
  };

  const hasValue = (value) => {
    return value !== null && value !== undefined && value !== '';
  };

  const CustomInput = React.forwardRef(({ value, onClick, placeholder }, ref) => (
    <div 
      ref={ref}
      onClick={onClick}
      className={`custom-datepicker-display ${hasValue(selected) ? 'has-value' : ''} ${className}`}
    >
      {selected ? (
        <div className="date-with-dots">
          <span className="date-part">{selected.getDate().toString().padStart(2, '0')}</span>
          <span className="dot-separator"> ● </span>
          <span className="date-part">{(selected.getMonth() + 1).toString().padStart(2, '0')}</span>
          <span className="dot-separator"> ● </span>
          <span className="date-part">{selected.getFullYear()}</span>
        </div>
      ) : (
        <span className="data-picker-placeholder">{placeholder}</span>
      )}
    </div>
  ));

  return (
    <div className={`custom-datepicker-container ${hasValue(selected) ? 'has-value' : ''} ${className}`}>
      <DatePicker
        selected={selected}
        onChange={handleDayClick}
        customInput={<CustomInput />}
        onInputClick={() => setIsOpen(true)}
        open={isOpen}
        onClickOutside={() => setIsOpen(false)}
        dateFormat="dd MM yyyy"
        placeholderText={placeholder}
        renderCustomHeader={() => (
          <div className="custom-header">
            <div className="year-month-selectors">
              <YearMonthSelect
                value={displayDate.getMonth()}
                options={monthsOptions}
                onChange={handleMonthChange}
                className="month-selector"
              />
              <YearMonthSelect
                value={displayDate.getFullYear()}
                options={years.map(y => ({ value: y, label: y }))}
                onChange={handleYearChange}
                className="year-selector"
              />
            </div>
          </div>
        )}
        formatWeekDay={formatWeekDay}
        dayClassName={(date) =>
          selected &&
          date.getDate() === selected.getDate() &&
          date.getMonth() === selected.getMonth() &&
          date.getFullYear() === selected.getFullYear()
            ? 'selected-day'
            : 'normal-day'
        }
      />
    </div>
  );
};

export default CustomBirthdateDatePicker;