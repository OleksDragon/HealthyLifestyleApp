import React, { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import "./WorkFormatSection.css";

// Шаблони форматів роботи за типами спеціалістів
const WORK_FORMAT_TEMPLATES = {
  // Загальні шаблони для всіх типів
  all: [
    'work_format_online_telegram',
    'work_format_offline_gym',
    'work_format_weekly_plan'
  ],
  
  // Специфічні шаблони для психолога
  Psychologist: [
    'work_format_online_zoom',
    'work_format_office_sessions',
    'work_format_therapy_plans'
  ],
  
  // Специфічні шаблони для лікаря
  Doctor: [
    'work_format_online_zoom',
    'work_format_clinic_visits',
    'work_format_prevention_plans'
  ],
  
  // Специфічні шаблони для дієтолога
  Dietitian: [
    'work_format_online_telegram',
    'work_format_nutrition_plan'
  ],
  
  // Специфічні шаблони для тренера
  Trainer: [
    'work_format_online_telegram',
    'work_format_offline_gym',
    'work_format_weekly_plan'
  ]
};

export default function WorkFormatSection({ 
  workFormats = [], 
  onWorkFormatsChange, 
  specialistType = null 
}) {
  const { t } = useTranslation();
  
  // Отримуємо всі доступні шаблони для поточного типу спеціаліста
  const allTemplates = useMemo(() => {
    const templates = [...WORK_FORMAT_TEMPLATES.all];
    
    if (specialistType && WORK_FORMAT_TEMPLATES[specialistType]) {
      templates.push(...WORK_FORMAT_TEMPLATES[specialistType]);
    }
    
    // Видаляємо дублікати, зберігаючи порядок
    return [...new Set(templates)];
  }, [specialistType]);
  
  const activeSet = useMemo(() => new Set(workFormats), [workFormats]);
  
  // Доступні шаблони (не додані до робочих форматів)
  const availableTemplates = useMemo(
    () => allTemplates.filter((template) => !activeSet.has(template)),
    [allTemplates, activeSet]
  );
  
  const [isAdding, setIsAdding] = useState(false);
  const [newFormat, setNewFormat] = useState("");

  const handleAdd = (format) => {
    if (!onWorkFormatsChange) return;
    if (activeSet.has(format)) return;
    onWorkFormatsChange([...workFormats, format]);
  };

  const handleRemove = (format) => {
    if (!onWorkFormatsChange) return;
    onWorkFormatsChange(workFormats.filter((f) => f !== format));
  };

  const openAdd = () => {
    setNewFormat("");
    setIsAdding(true);
  };

  const cancelAdd = () => {
    setIsAdding(false);
    setNewFormat("");
  };

  const confirmAdd = () => {
    if (!onWorkFormatsChange) return;
    const trimmed = newFormat.trim();
    if (!trimmed || activeSet.has(trimmed)) {
      cancelAdd();
      return;
    }
    onWorkFormatsChange([...workFormats, trimmed]);
    cancelAdd();
  };

  // Фільтруємо пропозиції на основі введеного тексту
  const filteredSuggestions = useMemo(() => {
    const query = newFormat.trim().toLowerCase();
    if (!query) return availableTemplates.slice(0, 8);
    return availableTemplates
      .filter((template) => t(template).toLowerCase().includes(query))
      .slice(0, 8);
  }, [newFormat, availableTemplates, t]);

  return (
    <div className="sp-work-format-card">
      <div className="sp-selected-work-formats">
        {workFormats.length === 0 ? (
          <div className="sp-work-format-empty">
            {t('sp_work_format_empty')}
          </div>
        ) : (
          workFormats.map((format) => (
            <button 
              key={format} 
              className="sp-work-format-chip-selected" 
              type="button" 
              onClick={() => handleRemove(format)}
            >
              <span>{t(format)}</span>
              <span aria-hidden="true" className="sp-work-format-remove">×</span>
            </button>
          ))
        )}
        <button 
          type="button" 
          className="sp-work-format-add-btn" 
          onClick={openAdd}
          title={t('sp_work_format_add')}
        >
          +
        </button>
      </div>

      <div className="sp-divider" />

      <div className="sp-available-work-formats">
        {availableTemplates.map((template) => (
          <button 
            key={template} 
            className="sp-work-format-chip-available" 
            type="button" 
            onClick={() => handleAdd(template)}
          >
            <span>{t(template)}</span>
          </button>
        ))}
      </div>

      {isAdding && (
        <div 
          className="sp-add-overlay" 
          onKeyDown={(e) => {
            if (e.key === 'Enter') confirmAdd();
            if (e.key === 'Escape') cancelAdd();
          }}
        >
          <div className="sp-add-card1">
            <input
              className="sp-add-input"
              autoFocus
              placeholder={t('sp_work_format_placeholder')}
              value={newFormat}
              onChange={(e) => setNewFormat(e.target.value)}
            />
            <div className="sp-add-actions">
              <button 
                type="button" 
                className="sp-add-confirm" 
                onClick={confirmAdd}
              >
                {t('sp_add_button')}
              </button>
              <button 
                type="button" 
                className="sp-add-cancel" 
                onClick={cancelAdd}
              >
                {t('sp_cancel_button')}
              </button>
            </div>
            {filteredSuggestions.length > 0 && (
              <div className="sp-suggestion-list">
                {filteredSuggestions.map((template) => (
                  <button 
                    key={template} 
                    type="button" 
                    className="sp-suggestion-chip" 
                    onClick={() => setNewFormat(template)}
                  >
                    {t(template)}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

