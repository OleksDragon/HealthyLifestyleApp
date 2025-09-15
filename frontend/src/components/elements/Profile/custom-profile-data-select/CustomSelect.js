import React, { useState, useRef, useEffect } from 'react';
import './CustomSelect.css';
import arrow_v_white from '../../../../assets/profile-icons/arrow_v_white.svg'
import arrow_v_blue from '../../../../assets/profile-icons/arrow_v_blue.svg'

const CustomSelect = ({ 
  id, 
  placeholder, 
  options, 
  value, 
  onChange, 
  className = '', 
  maxVisibleChars = null
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState(value || '');
  const [filteredOptions, setFilteredOptions] = useState(options);
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
    setFilteredOptions(
      options.filter(option =>
        option.toLowerCase().includes(inputValue.toLowerCase())
      )
    );
  }, [inputValue, options]);

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
    <div className={`custom-select ${className} ${isOpen ? 'expanded' : ''} ${hasValue(value) ? 'has-value' : ''}`} ref={selectRef} id={id}>
      <div className="select-header" onClick={toggleDropdown}>
        <input
          type="text"
          className="select-input"
          value={isOpen ? inputValue : displayValue}
          onChange={handleInputChange}
          placeholder={placeholder}
          onClick={(e) => {
            e.stopPropagation();
            if (!isOpen) setIsOpen(true);
          }}
          readOnly={!isOpen}
        />
        <span className="select-arrow">
          {getArrowIcon()}
        </span>
      </div>
      
      {isOpen && (
        <div className="select-options-container">
          <div className="select-options">
            {filteredOptions.map((option, index) => (
              <div
                key={index}
                className="select-option"
                onClick={() => handleOptionClick(option)}
              >
                {option}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomSelect;