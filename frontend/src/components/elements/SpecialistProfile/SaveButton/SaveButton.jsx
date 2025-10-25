import React from 'react';
import { useTranslation } from 'react-i18next';
import './SaveButton.css';

const SaveButton = ({ 
  onSave, 
  hasChanges = false, 
  isSaving = false, 
  disabled = false 
}) => {
  const { t } = useTranslation();

  return (
    <div className="sp-save-button-wrapper">
      <button 
        onClick={onSave}
        className={`sp-save-button ${hasChanges ? 'sp-save-button-active' : 'sp-save-button-disabled'}`}
        disabled={!hasChanges || isSaving || disabled}
      >
        <span className="sp-save-button-text">
          {isSaving ? t("sp_saving") : t("sp_save")}
        </span>
      </button>
    </div>
  );
};

export default SaveButton;
