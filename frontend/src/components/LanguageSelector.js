import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./LanguageSelector.module.css";

const LanguageSelector = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setIsOpen(false);
  };

  const getListItemClass = (lng) => {
    return `${styles.listItem} ${i18n.language === lng ? styles.active : ""}`;
  };

  return (
    <div className={styles.languageSelector}>
      <button className={styles.iconButton} onClick={toggleDropdown}>
        {i18n.language.toUpperCase()}
      </button>
      {isOpen && (
        <ul className={styles.dropdownMenu}>
          <li
            onClick={() => changeLanguage("en")}
            className={getListItemClass("en")}
          >
            English
          </li>
          <li
            onClick={() => changeLanguage("uk")}
            className={getListItemClass("uk")}
          >
            Українська
          </li>
          <li
            onClick={() => changeLanguage("de")}
            className={getListItemClass("de")}
          >
            Deutsch
          </li>
          <li
            onClick={() => changeLanguage("fr")}
            className={getListItemClass("fr")}
          >
            Français
          </li>
          <li
            onClick={() => changeLanguage("es")}
            className={getListItemClass("es")}
          >
            Español
          </li>
        </ul>
      )}
    </div>
  );
};

export default LanguageSelector;
