import React from 'react';
import { useTranslation } from 'react-i18next';
import './InfoField.css';

const InfoField = ({ 
  label, 
  value, 
  onChange, 
  placeholder, 
  type = 'text',
  className = '',
  required = false 
}) => {
  const { t } = useTranslation();

  return (
    <div className={`sp-info-field ${className}`}>
      <input
        type={type}
        value={value || ''}
        onChange={onChange}
        placeholder={t(placeholder || label)}
        className="sp-field-input"
        required={required}
      />
    </div>
  );
};

export default InfoField;
