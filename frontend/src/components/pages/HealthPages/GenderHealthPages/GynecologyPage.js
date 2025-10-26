import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import tipImg from "../../../img/Tip.png";

function GynecologyPage() {
    const { t } = useTranslation();
    const navigate = useNavigate();

    return (
        <div className="scroll-data female-health-container hidden-scroll">
            <div className="woman-health-info">
                <div className="title">{t("gynecology")}</div>
                <div className="sub-title hidden-phone">{t("gynecology_sub")}</div>
            </div>
            <div className="gynecology-content">
                <div className="female-health-options female-health-options-gyn">
                    <button onClick={() => navigate(`/health/gender/female/checks`)}>{t("regular_review")}</button>
                    <button onClick={() => navigate(`/health/gender/female/examination`)}>{t("womens_tests")}</button>
                </div>
                <div className="articles">
                    <h3>{t("articles_")}</h3>
                </div>
                <div className="useful-info">
                    <div>
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
                        <div className="img-but-div img-center-top"></div>
                        <h3 style={{whiteSpace: "pre-line"}}>{t("how_often")}</h3>
                        <button className="read-article">{t("read")}</button>
                    </div>
                    <div>
                        <div className="img-but-div img-center-top"></div>
                        <h3 style={{whiteSpace: "pre-line", marginTop: "30px", marginBottom: "20px"}}>{t("top_5_tests")}</h3>
                        <button className="read-article">{t("read")}</button>
                    </div>
                </div>
            </div>
            <div className="find-doctor-div">
                <button className="find-doctor-btn">{t("find_doctor")}</button>
            </div>
        </div>
    )
}

export default GynecologyPage;