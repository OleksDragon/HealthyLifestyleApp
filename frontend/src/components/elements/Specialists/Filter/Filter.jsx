import { useTranslation } from 'react-i18next';
import './Filter.css';
import React, { useState, useRef, useEffect, useMemo } from 'react';
import arrow_v_white from '../../../../assets/profile-icons/arrow_v_white.svg';
import arrow_v_blue from '../../../../assets/profile-icons/arrow_v_blue.svg';


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
  const selectRef = useRef(null);

  // Resolve selected label by value for display
  const selectedLabel = useMemo(() => {
    const opt = options.find(o => o.value === value);
    return opt ? opt.label : '';
  }, [options, value]);

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

  const handleInputChange = (e) => {
    let newValue = e.target.value;

    if (id === "phoneCode") {
      newValue = newValue.replace(/[^\d]/g, '');
      newValue = '+' + newValue;
      newValue = newValue.slice(0, 4);
    }

    setInputValue(newValue);
    setIsOpen(true);
  };

  const handleOptionClick = (option) => {
    // Pass option.value to parent and show option.label in UI
    onChange(option.value);
    setIsOpen(false);
  };

  const handleResetCurrentFilterClick = () => {
    setInputValue('');
    onChange('');
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const hasValue = (v) => {
    return v !== null && v !== undefined && v !== '';
  };
  return (
    <button className={`f-custom-select ${className} ${isOpen ? 'expanded' : ''} ${hasValue(value) ? 'has-value' : ''}`} ref={selectRef} id={id}>
      <div className="f-select-header" onClick={toggleDropdown}>
        <input
          type="text"
          className="f-select-input"
          value={isOpen ? selectedLabel : selectedLabel}
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
                onClick={() => handleOptionClick(opt)}
              >
                <div className='icon'>{opt.icon}</div> 
                {opt.label}
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