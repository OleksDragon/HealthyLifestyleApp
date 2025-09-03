import nomyfyLogo from "../img/nomyfy.png";
import homeIcon from "../icons/Home.png";
import exitIcon from "../icons/Exit.png";
import "../styles/menu.css";
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

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
                    <div className="menu-option" onClick={() => navegate('/dashboard')}>
                        <img src={homeIcon} alt="dashboard"/>
                        <span className="menu-opt-text">{t("dashboard")}</span>
                    </div>
                    <div className="menu-option" onClick={() => navegate('/profile')}>
                        <img src={homeIcon} alt="profile"/>
                        <span className="menu-opt-text">{t("profile")}</span>
                    </div>
                    <div className="menu-option" onClick={() => navegate('/health')}>
                        <img src={homeIcon} alt="health"/>
                        <span className="menu-opt-text">{t("health")}</span>
                    </div>
                    <div className="menu-option" onClick={() => navegate('/eating')}>
                        <img src={homeIcon} alt="eating"/>
                        <span className="menu-opt-text">{t("eating")}</span>
                    </div>
                    <div className="menu-option" onClick={() => navegate('/workout')}>
                        <img src={homeIcon} alt="workout"/>
                        <span className="menu-opt-text">{t("workout")}</span>
                    </div>
                    <div className="menu-option" onClick={() => navegate('/social')}>
                        <img src={homeIcon} alt="social"/>
                        <span className="menu-opt-text">{t("social")}</span>
                    </div>
                    <div className="menu-option" onClick={() => navegate('/marketplace')}>
                        <img src={homeIcon} alt="marketplace"/>
                        <span className="menu-opt-text">{t("marketplace_menu")}</span>
                    </div>
                    <div className="menu-option" onClick={() => navegate('/premium')}>
                        <img src={homeIcon} alt="premium"/>
                        <span className="menu-opt-text">{t("premium")}</span>
                    </div>
                </div>
                <div className="menu-option exit" onClick={() => localStorage.removeItem("helth-token") || navegate('/')}>
                    <img src={exitIcon} alt="exit"/>
                    <span className="menu-opt-text">{t("exit")}</span>
                </div>
            </div>
            <div className="menu-children">
                {children}
            </div>
        </div>
    );
}

export default Menu;