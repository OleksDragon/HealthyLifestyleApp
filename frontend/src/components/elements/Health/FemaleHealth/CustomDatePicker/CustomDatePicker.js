import React, { useState, useRef, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import { useTranslation } from 'react-i18next';
import 'react-datepicker/dist/react-datepicker.css';
import './CustomDatePicker.css';
//import arrow_v_blue from '../../../../../assets/profile-icons/arrow_v_blue.svg';
//import calendar_icon from '../../../../../assets/health-icons/female-calendar-icon.svg';
import styled from 'styled-components';

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
          <svg className="date-select-arrow" width="20" height="11" viewBox="0 0 24 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22 2L12 12L2 2" stroke="#116FCF" stroke-width="3" stroke-linecap="round" />
          </svg>
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

const CustomBirthdateDatePicker = ({ selected, onChange, placeholder, className = '', minAge = 0 }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [displayDate, setDisplayDate] = useState(() => (selected instanceof Date ? selected : new Date()));
  const { t } = useTranslation();

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
      className={`female-custom-datepicker-display ${hasValue(selected) ? 'has-value' : ''} ${className}`}
    >
      {selected ? (
        <div className="date-with-dots">
            <span className="date-part">{selected.getDate().toString().padStart(2, '0')}</span>
            <span className="dot-separator"> ● </span>
            <span className="date-part">{(selected.getMonth() + 1).toString().padStart(2, '0')}</span>
            <span className="dot-separator"> ● </span>
            <span className="date-part">{selected.getFullYear()}</span>
            
              <svg className='date-with-dots-clndr-icon' width="15" height="17" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.7778 19.8H2.22222V7.7H17.7778M14.4444 0V2.2H5.55556V0H3.33333V2.2H2.22222C0.988889 2.2 0 3.179 0 4.4V19.8C0 20.3835 0.234126 20.9431 0.650874 21.3556C1.06762 21.7682 1.63285 22 2.22222 22H17.7778C18.3671 22 18.9324 21.7682 19.3491 21.3556C19.7659 20.9431 20 20.3835 20 19.8V4.4C20 3.81652 19.7659 3.25695 19.3491 2.84437C18.9324 2.43179 18.3671 2.2 17.7778 2.2H16.6667V0M15.5556 12.1H10V17.6H15.5556V12.1Z" fill="white" />
              </svg>  
     
        </div>
      ) : (
        <span className="female-data-picker-placeholder">{placeholder}
        <svg width="15" height="17" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M17.7778 19.8H2.22222V7.7H17.7778M14.4444 0V2.2H5.55556V0H3.33333V2.2H2.22222C0.988889 2.2 0 3.179 0 4.4V19.8C0 20.3835 0.234126 20.9431 0.650874 21.3556C1.06762 21.7682 1.63285 22 2.22222 22H17.7778C18.3671 22 18.9324 21.7682 19.3491 21.3556C19.7659 20.9431 20 20.3835 20 19.8V4.4C20 3.81652 19.7659 3.25695 19.3491 2.84437C18.9324 2.43179 18.3671 2.2 17.7778 2.2H16.6667V0M15.5556 12.1H10V17.6H15.5556V12.1Z" fill="white" />
</svg>
        {/* <img src={calendar_icon} alt="" className="female-calendar-icon" /> */}
        </span>
      )}
    </div>
  ));
const CustomStyleDatePickerWrapper = styled.div`
.react-datepicker-popper {
  transform: translate(0px, 59px) !important;
}
.year-month-selectors {
    margin: 10px 0 0;
}
.year-selector .select-input {
  font-size: 20px;
}
/* Стрілка селектора */
.date-select-arrow {
  margin-left: 10px;
  margin-top: 5px;
  transform: rotate(0deg);
}
.react-datepicker {
  width: 340px;
  height: 340px;
}
.react-datepicker__day {
  height: 25px; 
  width: 25px;
  font-size: 16px;
}
.react-datepicker__day-names {
  margin-left: 25px;
}
.react-datepicker__day-name
{
  font-size: 16px;
}
.react-datepicker__week {
  height: 35px;
}
.month-selector .select-input {
  font-size: 18px;
}
.year-month-select .select-option {
  font-size: 16px;
  font-weight: 400;
}
`;

  return (
    <div className={`custom-datepicker-container ${hasValue(selected) ? 'has-value' : ''} ${className}`}>
    <CustomStyleDatePickerWrapper>
      <DatePicker popperContainer={({ children }) => <div className="datepicker-portal">{children}</div>}
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
        popperClassName="react-datepicker-popper"
      /></CustomStyleDatePickerWrapper>
    </div>
  );
};


export default CustomBirthdateDatePicker;
export { YearMonthSelect };