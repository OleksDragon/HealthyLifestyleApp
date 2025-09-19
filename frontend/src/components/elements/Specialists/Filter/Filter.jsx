import { useTranslation } from 'react-i18next';
import './Filter.css';
import React, { useState, useRef, useEffect } from 'react';
import arrow_v_white from '../../../../assets/profile-icons/arrow_v_white.svg';
import arrow_v_blue from '../../../../assets/profile-icons/arrow_v_blue.svg';
import styled from 'styled-components';

const CustomSelect = ({ 
  id, 
  placeholder,
  options = [], 
  value, 
  onChange, 
  className = '', 
  maxVisibleChars = null,
  icons
}) => {
  
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState(value || '');
  const [filteredOptions, setFilteredOptions] = useState(options || []);
  const [displayValue, setDisplayValue] = useState('');
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

  useEffect(() => {
    setInputValue(value || '');
  }, [value]);

  useEffect(() => {
    if (isOpen || !maxVisibleChars || !value || value.length <= maxVisibleChars) {
      setDisplayValue(value || '');
    } else {
      const truncated = value.substring(0, maxVisibleChars) + '...';
      setDisplayValue(truncated);
    }
  }, [value, isOpen, maxVisibleChars]);

  const handleInputChange = (e) => {
    let value = e.target.value;

    if (id === "phoneCode") {
      value = value.replace(/[^\d]/g, '');
      value = '+' + value;
      value = value.slice(0, 4);
    }

    setInputValue(value);
    onChange(value);
    setIsOpen(true);
  };

  const handleOptionClick = (option) => {
    setInputValue(option);
    onChange(option);
    setIsOpen(false);
  };

  const handleResetCurrentFilterClick = () => {
    // Скидання поточного значення фільтра
    setInputValue('');
    onChange('');
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const hasValue = (value) => {
    return value !== null && value !== undefined && value !== '';
  };

  const getArrowIcon = () => {
    if (isOpen) {
      return <img src={arrow_v_white} alt="arrow down" className="arrow-v-white" />;
    }

    if (hasValue(value)) {
      return <img src={arrow_v_white} alt="arrow down" />;
    }
    
    return <img src={arrow_v_blue} alt="arrow down" className="arrow-v-blue" />;
  };

return (
    <button className={`f-custom-select ${className} ${isOpen ? 'expanded' : ''} ${hasValue(value) ? 'has-value' : ''}`} ref={selectRef} id={id}>
      <div className="f-select-header" onClick={toggleDropdown}>
        <input
          type="text"
          className="f-select-input"
          value={isOpen ? inputValue : displayValue}
          onChange={handleInputChange}
          placeholder={placeholder}
          onClick={(e) => {
            e.stopPropagation();
            if (!isOpen) setIsOpen(true);
          }}
          readOnly={true}
        />
      </div>
      
      {isOpen && (
        <div className="f-select-options-container">
          <div className="f-select-options">
            <span className="f-select-option-heder">{placeholder}</span>
            {filteredOptions.map((opt, index) => (
              <div
                key={index}
                className="f-select-option"
                onClick={() => handleOptionClick(opt.label)}
              >
                

                <div>{opt.icon}</div> {opt.label}
              </div>
            ))}
            {/* Option to clear the filter with translation */}
            <div
              className="f-select-option "
              onClick={handleResetCurrentFilterClick}
            >
              <span className='clear_opption'>{t("clear_option")}</span>
            </div>
          </div>
        </div>
      )}
    </button>
  );
};

export default CustomSelect;