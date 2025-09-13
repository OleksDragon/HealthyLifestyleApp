import React, { useState, useRef, useEffect } from 'react';

const TruncatedInput = ({
  value,
  onChange,
  maxVisibleChars = 20,
  placeholder = '',
  type = 'text',
  className = '',
  inputClassName = '',
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [displayValue, setDisplayValue] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (isFocused || !value || value.length <= maxVisibleChars) {
      setDisplayValue(value);
    } else {
      // Обрізаємо текст і додаємо три крапки
      const truncated = value.substring(0, maxVisibleChars) + '...';
      setDisplayValue(truncated);
    }
  }, [value, isFocused, maxVisibleChars]);

  const handleFocus = () => {
    setIsFocused(true);
    // Встановлюємо повне значення при фокусі
    setDisplayValue(value);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleChange = (e) => {
    onChange(e.target.value);
  };

  return (
    <input
      ref={inputRef}
      type={type}
      value={isFocused ? value : displayValue}
      onChange={handleChange}
      onFocus={handleFocus}
      onBlur={handleBlur}
      placeholder={placeholder}
      className={`truncated-input ${className} ${inputClassName}`}
      {...props}
    />
  );
};

export default TruncatedInput;