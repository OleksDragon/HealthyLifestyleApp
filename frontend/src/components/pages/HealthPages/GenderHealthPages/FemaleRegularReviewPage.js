import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import gynecologyReview from "../../../icons/GynecologyReview.png";
import papReview from "../../../icons/PAPReview.png";
import bloodReview from "../../../icons/BloodReview.png";
import ultrasoundReview from "../../../icons/UltrasoundReview.png";
import mammographyReview from "../../../icons/MammographyReview.png";
import arrowLeft from "../../../icons/ArrowLeft2.png";

function FemaleRegularReviewPage() {
    const { t } = useTranslation();
    const navigate = useNavigate();

    return (
        <div className="scroll-data female-health-container">
            <div className="navigation">
                <div className="to-general-cycle" style={{marginBottom: "10px"}}>
                    <img src={arrowLeft} alt="Arrow left"/>
                    <button onClick={() => navigate(-1)}>{t("go_back")}</button>
                </div>
            </div>
            <div className="woman-health-info" style={{height: "80px"}}>
                <div className="title">{t("regular_review")}</div>
                <div className="sub-title">{t("review_sub")}</div>
            </div>
            <div className="review-tips-container">
                <h3>{t("what_to_check_regulary")}</h3>
                <div>
                    <div className="review-tip">
                        <div className="tip-text">{t("gynecology_review")}</div>
                        <img className="tip-icon" src={gynecologyReview}></img>
                        <div className="tip-text">{t("one_time_per_year")}</div>
                    </div>
                    <div className="review-tip">
                        <div className="tip-text">{t("pap_test")}</div>
                        <img className="tip-icon" src={papReview}></img>
                        <div className="tip-text">{t("_2_3_time_per_year")}</div>
                    </div>
                    <div className="review-tip">
                        <div className="tip-text">{t("blood_test")}</div>
                        <img className="tip-icon" src={bloodReview}></img>
                        <div className="tip-text">{t("one_time_per_year")}</div>
                    </div>
                    <div className="review-tip">
                        <div className="tip-text">{t("ultrasound_test")}</div>
                        <img className="tip-icon" src={ultrasoundReview}></img>
                        <div className="tip-text">{t("if_need")}</div>
                    </div>
                    <div className="review-tip">
                        <div className="tip-text">{t("mammography")}</div>
                        <img className="tip-icon" src={mammographyReview}></img>
                        <div className="tip-text">{t("after_40_years")}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FemaleRegularReviewPage;