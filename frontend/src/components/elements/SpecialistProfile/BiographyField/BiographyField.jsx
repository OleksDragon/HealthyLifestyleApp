import React from 'react';
import { useTranslation } from 'react-i18next';
import './BiographyField.css';

const BiographyField = ({ 
  label, 
  value, 
  onChange, 
  placeholder, 
  maxLength = 1000,
  className = '',
  required = false 
}) => {
  const { t } = useTranslation();

  return (
    <div className={`sp-biography-field ${className}`}>
      <textarea
        value={value}
        onChange={onChange}
        placeholder={t(placeholder || label)}
        className="sp-biography-textarea"
        maxLength={maxLength}
        rows={4}
        required={required}
      />
      <div className="sp-character-count">
        {value?.length || 0}/{maxLength}
      </div>
    </div>
  );
};

export default BiographyField;


