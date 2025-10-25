import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import './ProfileToggle.css';

const ProfileToggle = ({ isActive = true, onToggle }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleToggle = (checked) => {
    if (!checked) {
      // Видаляємо specialist-profile з localStorage
      localStorage.removeItem("specialist-profile");
      // Перенаправляємо на звичайний профіль
      navigate("/profile");
    }
    if (onToggle) {
      onToggle(checked);
    }
  };

  return (
    <div className="sp-toggle-container">
      <span className="sp-toggle-label">
        {t("sp_profile_toggle")}
      </span>
      <div className="sp-toggle-wrapper">
        <div className={`sp-toggle-switch ${isActive ? 'active' : ''}`}>
          <input
            type="checkbox"
            checked={isActive}
            onChange={(e) => handleToggle(e.target.checked)}
            className="sp-toggle-input"
          />
          <div className="sp-toggle-track">
            <div className="sp-toggle-thumb"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileToggle;
