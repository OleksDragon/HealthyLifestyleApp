import nomyfyLogo from "../img/nomyfy.png";
import homeIcon from "../icons/Home.png";
import profileIcon from "../icons/Profile.png";
import healthIcon from "../icons/Health.png";
import eatingIcon from "../icons/Eating.png";
import workoutIcon from "../icons/Workout.png";
import socialIcon from "../icons/Social.png";
import marketplaceIcon from "../icons/Marketplace.png";
import premiumIcon from "../icons/Premium.png";
import exitIcon from "../icons/Exit.png";
import searchIcon from "../icons/GlassScale.png";
import settingsIcon from "../icons/Settings.png";
import stringsIcon from "../icons/Strings.png";
import "../styles/menu.css";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import LanguageSelector from "../LanguageSelector";
import Breadcrumbs from "../elements/Specialists/Breadcrumbs/Breadcrumbs";

function Menu({ children }) {
  const { t } = useTranslation();
  const navegate = useNavigate();

return (
  <div className="menu">
    <div className="menu-panel">
      <div className="logo">
        <img src={nomyfyLogo} alt="Nomyfy" />
      </div>
      <div className="menu-options">
        <div className="menu-option" onClick={() => navegate("/dashboard")}>
          <img
            style={{
              opacity: window.location.pathname === "/dashboard" ? 1 : 0,
            }}
            src={homeIcon}
            alt="dashboard"
          />
          <span className="menu-opt-text">{t("dashboard")}</span>
        </div>
        <div className="menu-option" onClick={() => navegate("/profile")}>
          <img
            style={{
              opacity: window.location.pathname.startsWith("/profile") ? 1 : 0,
            }}
            src={profileIcon}
            alt="profile"
          />
          <span className="menu-opt-text">{t("profile")}</span>
        </div>
        <div className="menu-option" onClick={() => navegate("/health")}>
          <img
            style={{ opacity: window.location.pathname.startsWith("/health") ? 1 : 0 }}
            src={healthIcon}
            alt="health"
          />
          <span className="menu-opt-text">{t("health")}</span>
        </div>
        <div className="menu-option" onClick={() => navegate("/eating")}>
          <img
            style={{ opacity: window.location.pathname.startsWith("/eating") ? 1 : 0 }}
            src={eatingIcon}
            alt="eating"
          />
          <span className="menu-opt-text">{t("eating")}</span>
        </div>
        <div className="menu-option" onClick={() => navegate("/workout")}>
          <img
            style={{
              opacity: window.location.pathname.startsWith("/workout") ? 1 : 0,
            }}
            src={workoutIcon}
            alt="workout"
          />
          <span className="menu-opt-text">{t("workout")}</span>
        </div>
        <div className="menu-option" onClick={() => navegate("/social")}>
          <img
            style={{
              opacity: window.location.pathname.startsWith("/social") ? 1 : 0,
            }}
            src={socialIcon}
            alt="challenges"
          />
          <span className="menu-opt-text">{t("social")}</span>
        </div>
        <div className="menu-option" onClick={() => navegate("/specialists")}>
          <img
            style={{
              opacity: window.location.pathname.startsWith("/specialists") ? 1 : 0,
            }}
            src={socialIcon}
            alt="specialists"
          />
          <span className="menu-opt-text">{t("specialists")}</span>
        </div>
        <div className="menu-option" onClick={() => navegate("/marketplace")}>
          <img
            style={{
              opacity: window.location.pathname.startsWith("/marketplace") ? 1 : 0,
            }}
            src={marketplaceIcon}
            alt="marketplace"
          />
          <span className="menu-opt-text">{t("marketplace_menu")}</span>
        </div>
        <div className="menu-option" onClick={() => navegate("/premium")}>
          <img
            style={{
              opacity: window.location.pathname.startsWith("/premium") ? 1 : 0,
            }}
            src={premiumIcon}
            alt="premium"
          />
          <span className="menu-opt-text">{t("premium")}</span>
        </div>
      </div>
      <div
        className="menu-option exit"
        onClick={() =>
          localStorage.removeItem("helth-token") ||
          localStorage.removeItem("user-name") ||
          localStorage.removeItem("user-id") ||
          navegate("/")
        }
      >
        <img src={exitIcon} alt="exit" />
        <span className="menu-opt-text">{t("exit")}</span>
      </div>
    </div>
    <div className="menu-children">
      <div className="header">
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
      </div>
      <Breadcrumbs />
      {children}
    </div>
  </div>
);
}

export default Menu;
