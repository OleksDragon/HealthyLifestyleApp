import { useTranslation } from "react-i18next";
import mascot from "../../../img/mascot.png";
import tipImg from "../../../img/Tip.png";
import { useLocation, useNavigate } from "react-router-dom";

const FemaleHealthPage = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const location = useLocation();
    
    return (
        <div className="female-health-container scroll-data">
            <div className="female-health-info">
                <div className="title">{t("female_health")}</div>
                <div className="sub-title">{t("female_health_fine")}</div>
            </div>
            <img src={mascot} className="mascot-img" />

            <div className="female-health-options">
                <button onClick={() => navigate(`${location.pathname}/cycle`)}>{t("cycle_info")}</button>
                <button>{t("reproductive_health")}</button>
                <button onClick={() => navigate(`${location.pathname}/checks`)}>{t("prevention")}</button>
                <button onClick={() => navigate(`${location.pathname}/gynecology`)}>{t("gynecology")}</button>
            </div>
            <div className="useful-info-container">
                <h2>{t("useful_info")}</h2>
                <div className="useful-info">
                    <div style={{ whiteSpace: "pre-line" }}>
                        <span>{t("day_tip")}</span>
                        <br />
                        <br />
                        <img src={tipImg} />
                        <br />
                        <br />
                        <span style={{fontWeight: "400", fontSize: "16px", display: "block", textAlign: "left", marginLeft: "20px"}}>{t("plan")}</span>
                        <span style={{fontWeight: "400", fontSize: "14px", display: "block", textAlign: "left", marginLeft: "20px"}}>{t("preventive_check")}</span>
                    </div>
                    <div>
                        <div className="img-but-div center-img"></div>
                        <h3>{t("hormonas_health")}</h3>
                        <h4>{t("hormonas_important")}</h4>
                    </div>
                    <div>
                        <div className="img-but-div center-img"></div>
                        <h3>{t("cycle_health")}</h3>
                        <h4>{t("cycle_important")}</h4>
                    </div>
                    <div>
                        <div className="img-but-div center-img"></div>
                        <h3>{t("examination_health")}</h3>
                        <h4>{t("examination_important")}</h4>
                    </div>
                </div>
            </div>
            <div className="find-doctor-div">
                <button className="find-doctor-btn">{t("find_doctor")}</button>
            </div>
        </div>
    )
}

export default FemaleHealthPage;