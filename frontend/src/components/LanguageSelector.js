import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import ReactDOM from "react-dom";
import styles from "./LanguageSelector.module.css";
import languageIcon from "./icons/Language.png";

const DropdownPortal = ({ isOpen, onClose, changeLanguage, getListItemClass }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className={styles.portalOverlay} onClick={onClose}>
      <ul 
        className={styles.dropdownMenu} 
        onClick={(e) => e.stopPropagation()}
      >
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
    </div>,
    document.body
  );
};

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
      {/* <button className={styles.iconButton} onClick={toggleDropdown}>
        {i18n.language.toUpperCase()}
      </button> */}
      <img src={languageIcon} alt="Language" style={{cursor: "pointer", width: "24px"}} onClick={toggleDropdown}/>

      {/* Старий dropdown залишаємо для десктопу, Portal для мобільної */}
      {isOpen && typeof window !== 'undefined' && window.innerWidth > 431 && (
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

      {/* Portal для мобільної версії */}
      {isOpen && typeof window !== 'undefined' && window.innerWidth <= 431 && (
        <DropdownPortal 
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          changeLanguage={changeLanguage}
          getListItemClass={getListItemClass}
        />
      )}
    </div>
  );
};

export default LanguageSelector;