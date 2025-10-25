import nomyfyLogo from "../img/nomyfy.png";
import homeIcon from "../icons/Home.png";
import profileIcon from "../icons/Profile.png";
import healthIcon from "../icons/Health.png";
import eatingIcon from "../icons/Eating.png";
// import workoutIcon from "../icons/Workout.png";
import socialIcon from "../icons/Social.png";
import marketplaceIcon from "../icons/Marketplace.png";
import premiumIcon from "../icons/Premium.png";
import exitIcon from "../icons/Exit.png";
import searchIcon from "../icons/GlassScale.png";
import settingsIcon from "../icons/Settings.png";
import stringsIcon from "../icons/Strings.png";
import calendarIcon from "../icons/GeneralCalendar.png";
import menuIcon from "../icons/Menu.svg";
import closeIcon from "../icons/Close.svg";
import yellow_search from "../icons/YellowSearch.svg";
import "../styles/menu.css";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import LanguageSelector from "../LanguageSelector";
import Breadcrumbs from "../elements/Specialists/Breadcrumbs/Breadcrumbs";
import { useState, useEffect, useRef } from "react";

function Menu({ children }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchInputRef = useRef(null);
  const searchFieldRef = useRef(null);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 430);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isSearchOpen && searchInputRef.current && !searchInputRef.current.contains(event.target)) {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isSearchOpen]);

  useEffect(() => {
    if (isSearchOpen && searchFieldRef.current) {
      const timer = setTimeout(() => {
        searchFieldRef.current.focus();
      }, 350);
      
      return () => clearTimeout(timer);
    }
  }, [isSearchOpen]);

  const handleNavigation = (path) => {
    navigate(path);
    if (isMobile) {
      setIsMenuOpen(false);
    }
  };

  const handleSearchToggle = () => {
    if (isMobile) {
      setIsSearchOpen(!isSearchOpen);
    }
  };

  return (
    <div className="menu">
      <div className="menu-panel">
        <div className="logo">
          <img src={nomyfyLogo} alt="Nomyfy" />
        </div>
        <div className="menu-options">
          <div className="menu-option" onClick={() => handleNavigation("/dashboard")}>
            <img
              style={{
                opacity: window.location.pathname === "/dashboard" ? 1 : 0,
              }}
              src={homeIcon}
              alt="dashboard"
            />
            <span className="menu-opt-text">{t("dashboard")}</span>
          </div>
          <div className="menu-option" onClick={() => handleNavigation("/profile")}>
            <img
              style={{
                opacity: window.location.pathname.startsWith("/profile") ? 1 : 0,
              }}
              src={profileIcon}
              alt="profile"
            />
            <span className="menu-opt-text">{t("profile")}</span>
          </div>
          <div className="menu-option" onClick={() => handleNavigation("/health")}>
            <img
              style={{ opacity: window.location.pathname.startsWith("/health") ? 1 : 0 }}
              src={healthIcon}
              alt="health"
            />
            <span className="menu-opt-text">{t("health")}</span>
          </div>
          <div className="menu-option" onClick={() => handleNavigation("/eating")}>
            <img
              style={{ opacity: window.location.pathname.startsWith("/eating") ? 1 : 0 }}
              src={eatingIcon}
              alt="eating"
            />
            <span className="menu-opt-text">{t("eating")}</span>
          </div>
          {/* <div className="menu-option" onClick={() => handleNavigation("/workout")}>
            <img
              style={{
                opacity: window.location.pathname.startsWith("/workout") ? 1 : 0,
              }}
              src={workoutIcon}
              alt="workout"
            />
            <span className="menu-opt-text">{t("workout")}</span>
          </div> */}
          <div className="menu-option" onClick={() => handleNavigation("/social")}>
            <img
              style={{
                opacity: window.location.pathname.startsWith("/social") ? 1 : 0,
              }}
              src={socialIcon}
              alt="challenges"
            />
            <span className="menu-opt-text">{t("social")}</span>
          </div>
          <div className="menu-option" onClick={() => handleNavigation("/specialists")}>
            <img
              style={{
                opacity: window.location.pathname.startsWith("/specialists") ? 1 : 0,
              }}
              src={socialIcon}
              alt="specialists"
            />
            <span className="menu-opt-text">{t("specialists")}</span>
          </div>
          <div className="menu-option" onClick={() => handleNavigation("/marketplace")}>
            <img
              style={{
                opacity: window.location.pathname.startsWith("/marketplace") ? 1 : 0,
              }}
              src={marketplaceIcon}
              alt="marketplace"
            />
            <span className="menu-opt-text">{t("marketplace_menu")}</span>
          </div>
          <div className="menu-option" onClick={() => handleNavigation("/premium")}>
            <img
              style={{
                opacity: window.location.pathname.startsWith("/premium") ? 1 : 0,
              }}
              src={premiumIcon}
              alt="premium"
            />
            <span className="menu-opt-text">{t("premium")}</span>
          </div>
          <div className="menu-option" onClick={() => handleNavigation('/calendar')}>
              <img style={{ opacity: window.location.pathname.startsWith("/calendar") ? 1 : 0 }} src={calendarIcon} alt="calendar"/>
              <span className="menu-opt-text">{t("calendar")}</span>
          </div>
        </div>
        <div
          className="menu-option exit"
          onClick={() =>
            localStorage.removeItem("helth-token") ||
            localStorage.removeItem("user-name") ||
            localStorage.removeItem("user-id") ||
            navigate("/")
          }
        >
          <img src={exitIcon} alt="exit" />
          <span className="menu-opt-text">{t("exit")}</span>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobile && isMenuOpen && (
        <div className="mobile-menu-overlay" onClick={() => setIsMenuOpen(false)}>
          <div className="mobile-menu-panel" onClick={(e) => e.stopPropagation()}>
            <div className="mobile-menu-header">
              <div className="mobile-menu-header-content">
                <button className="close-menu" onClick={() => setIsMenuOpen(false)}>
                  <img src={closeIcon} alt="close" />
                </button>
              </div>
            </div>
            <div className="mobile-menu-options">
              <div className="mobile-menu-option" onClick={() => handleNavigation("/dashboard")}>
                <img src={homeIcon} alt="dashboard" />
                <span className="mobile-menu-opt-text">{t("dashboard")}</span>
              </div>
              <div className="mobile-menu-option" onClick={() => handleNavigation("/profile")}>
                <img src={profileIcon} alt="profile" />
                <span className="mobile-menu-opt-text">{t("profile")}</span>
              </div>
              <div className="mobile-menu-option" onClick={() => handleNavigation("/health")}>
                <img src={healthIcon} alt="health" />
                <span className="mobile-menu-opt-text">{t("health")}</span>
              </div>
              <div className="mobile-menu-option" onClick={() => handleNavigation("/eating")}>
                <img src={eatingIcon} alt="eating" />
                <span className="mobile-menu-opt-text">{t("eating")}</span>
              </div>
              {/* <div className="mobile-menu-option" onClick={() => handleNavigation("/workout")}>
                <img src={workoutIcon} alt="workout" />
                <span className="mobile-menu-opt-text">{t("workout")}</span>
              </div> */}
              <div className="mobile-menu-option" onClick={() => handleNavigation("/social")}>
                <img src={socialIcon} alt="social" />
                <span className="mobile-menu-opt-text">{t("social")}</span>
              </div>
              <div className="mobile-menu-option" onClick={() => handleNavigation("/specialists")}>
                <img src={socialIcon} alt="specialists" />
                <span className="mobile-menu-opt-text">{t("specialists")}</span>
              </div>
              <div className="mobile-menu-option" onClick={() => handleNavigation("/marketplace")}>
                <img src={marketplaceIcon} alt="marketplace" />
                <span className="mobile-menu-opt-text">{t("marketplace_menu")}</span>
              </div>
              <div className="mobile-menu-option" onClick={() => handleNavigation("/premium")}>
                <img src={premiumIcon} alt="premium" />
                <span className="mobile-menu-opt-text">{t("premium")}</span>
              </div>
              <div className="mobile-menu-option" onClick={() => handleNavigation('/calendar')}>
                <img src={calendarIcon} alt="calendar"/>
                <span className="mobile-menu-opt-text">{t("calendar")}</span>
              </div>
              <div className="mobile-menu-option exit" onClick={() => {
                localStorage.removeItem("helth-token");
                localStorage.removeItem("user-name");
                localStorage.removeItem("user-id");
                navigate("/");
              }}>
                <img src={exitIcon} alt="exit" />
                <span className="mobile-menu-opt-text">{t("exit")}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="menu-children">
        <div className="header">
          {/* Mobile Header */}
          {isMobile ? (
            <div className={`mobile-header-content ${isSearchOpen ? "search-open" : ""}`}>
              {!isSearchOpen && (
                <>
                  <div className="mobile-header-left">
                    <button className="mobile-search-toggle" onClick={handleSearchToggle}>
                      <img src={yellow_search} alt="search" />
                    </button>
                    <img className="m-menu-settings" src={settingsIcon} alt="settings" />
                    <LanguageSelector />
                    {/* <img src={stringsIcon} alt="strings" /> */}
                  </div>
                  
                  <div className="mobile-header-center">
                    <img src={nomyfyLogo} alt="Nomyfy" className="mobile-logo" />
                  </div>
                  
                  <div className="mobile-header-right">
                    <button className="burger-menu" onClick={() => setIsMenuOpen(true)}>
                      <img src={menuIcon} alt="menu" />
                    </button>
                  </div>
                </>
              )}

              {/* Поле пошуку з анімацією */}
              <div
                className={`mobile-search-expanded ${
                  isSearchOpen ? "mobile-search-anim" : ""
                }`}
                ref={searchInputRef}
              >
                <div className="mobile-search-wrapper">
                  <img
                    className="search-icon"
                    onClick={() => setIsSearchOpen(false)}
                    src={yellow_search}
                    alt="search"
                  />
                  <input
                    ref={searchFieldRef}
                    className="mobile-search-place"
                    type="text"
                    placeholder={t("search_placeholder")}
                    onKeyDown={(e) => {
                      if (e.key === 'Escape') {
                        setIsSearchOpen(false);
                      }
                    }}
                  />
                </div>
              </div>
            </div>
          ) : (
            // Desktop version
            <>
              <div className="search_wrapper">
                <img className="search-icon" src={searchIcon} alt="search" />
                <input
                  className="search_place"
                  type="text"
                  placeholder={t("search_placeholder")}
                />
              </div>
              <div className="options">
                <img src={settingsIcon} alt="settings" />
                <LanguageSelector />
                <img src={stringsIcon} alt="strings" />
              </div>
            </>
          )}
        </div>
        
        {/* Hide Breadcrumbs on mobile */}
        {!isMobile && <Breadcrumbs />}
        
        {children}
      </div>
    </div>
  );
}

export default Menu;