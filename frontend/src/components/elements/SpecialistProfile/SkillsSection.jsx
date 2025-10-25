import React, { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import "./SkillsSection.css";

export default function SkillsSection({ allSkills = [], value = [], onChange, allowCustom = true }) {
  const { t } = useTranslation();
  const activeSet = useMemo(() => new Set(value), [value]);
  const available = useMemo(
    () => allSkills.filter((s) => !activeSet.has(s)),
    [allSkills, activeSet]
  );
  const [isAdding, setIsAdding] = useState(false);
  const [newSkill, setNewSkill] = useState("");

  const handleAdd = (skill) => {
    if (!onChange) return;
    if (activeSet.has(skill)) return;
    onChange([...value, skill]);
  };

  const handleRemove = (skill) => {
    if (!onChange) return;
    onChange(value.filter((s) => s !== skill));
  };

  const openAdd = () => {
    if (!allowCustom) return;
    setNewSkill("");
    setIsAdding(true);
  };

  const cancelAdd = () => {
    setIsAdding(false);
    setNewSkill("");
  };

  const confirmAdd = () => {
    if (!onChange) return;
    const trimmed = newSkill.trim();
    if (!trimmed || activeSet.has(trimmed)) {
      cancelAdd();
      return;
    }
    onChange([...value, trimmed]);
    cancelAdd();
  };

  const filteredSuggestions = useMemo(() => {
    const q = newSkill.trim().toLowerCase();
    if (!q) return available.slice(0, 8);
    return available.filter((s) => s.toLowerCase().includes(q)).slice(0, 8);
  }, [newSkill, available]);

  return (
    <div className="sp-skills-card">
      <div className="sp-selected-skills">
        {value.map((skill) => (
          <button key={skill} className="sp-skill-chip-selected" type="button" onClick={() => handleRemove(skill)}>
            <span>{t(skill)}</span>
            <span aria-hidden="true" className="sp-skill-remove">×</span>
          </button>
        ))}
        {allowCustom && (
          <button type="button" className="sp-skill-add-btn" onClick={openAdd}>+
          </button>
        )}
      </div>

      <div className="sp-divider" />

      <div className="sp-available-skills">
        {available.map((skill) => (
          <button key={skill} className="sp-skill-chip-available" type="button" onClick={() => handleAdd(skill)}>
            <span>{t(skill)}</span>
          </button>
        ))}
      </div>

      {isAdding && (
        <div className="sp-add-overlay" onKeyDown={(e) => {
          if (e.key === 'Enter') confirmAdd();
          if (e.key === 'Escape') cancelAdd();
        }}>
          <div className="sp-add-card1">
            <input
              className="sp-add-input"
              autoFocus
              placeholder={t('sp_add_skill_placeholder')}
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
            />
            <div className="sp-add-actions">
              <button type="button" className="sp-add-confirm" onClick={confirmAdd}>{t('sp_add_button')}</button>
              <button type="button" className="sp-add-cancel" onClick={cancelAdd}>{t('sp_cancel_button')}</button>
            </div>
            {filteredSuggestions.length > 0 && (
              <div className="sp-suggestion-list">
                {filteredSuggestions.map((s) => (
                  <button key={s} type="button" className="sp-suggestion-chip" onClick={() => setNewSkill(s)}>
                    {t(s)}
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


