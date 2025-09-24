import { useTranslation } from "react-i18next";
import arrowLeft from "../../../icons/ArrowLeft2.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import arrowBottom from "../../../icons/ArrowBottom.png";

function FemaleExaminationPage() {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const [tipsOpen, setTipsOpen] = useState([false, false, false, false]);
    
    return (
        <div className="scroll-data female-health-container">
            <div className="navigation">
                <div className="to-general-cycle" style={{marginBottom: "10px"}}>
                    <img src={arrowLeft} alt="Arrow left"/>
                    <button onClick={() => navigate(-1)}>{t("go_back")}</button>
                </div>
            </div>
            <div className="woman-health-info" style={{height: "80px"}}>
                <div className="title">{t("examination_head")}</div>
                <div className="sub-title">{t("examination_desc")}</div>
            </div>
            <div className="tests-container">
                <div className="tests-options">
                    <h3>{t("base_review")}</h3>
                    <label class="radio-wrapper">
                        <input type="checkbox" name="color" value="red" />
                        <span class="custom-radio"></span>
                        {t("gynecology_examination")}
                    </label>    
                    <label class="radio-wrapper">
                        <input type="checkbox" name="color" value="red" />
                        <span class="custom-radio"></span>
                        {t("pap_test")}
                    </label>
                    <label class="radio-wrapper">
                        <input type="checkbox" name="color" value="red" />
                        <span class="custom-radio"></span>
                        {t("ultrasound_test")}
                    </label>
                    <label class="radio-wrapper">
                        <input type="checkbox" name="color" value="red" />
                        <span class="custom-radio"></span>
                        {t("ultrasound_glands")}
                    </label>
                    <label class="radio-wrapper">
                        <input type="checkbox" name="color" value="red" />
                        <span class="custom-radio"></span>
                        {t("blood_test")}
                    </label>
                    <button>{t("add_to_calendar")}</button>
                </div>
                <div className="tests-tips">
                    <div
                        onClick={() => {
                            let copy = [...tipsOpen];
                            copy[0] = !tipsOpen[0];
                            setTipsOpen(copy);
                        }}
                    >
                        <div className="examination-info-header" style={{color: "white"}}>
                            <h3>{t("need_I_test")}</h3>
                            <img src={arrowBottom} className="arrow-bottom" alt="Arrow bottom"/>
                        </div>
                        {tipsOpen[0] && 
                        <div style={{whiteSpace: "pre-wrap", margin: "20px"}}>
                            {t("examination_tip_need")}
                        </div>}
                    </div>
                    <div
                        onClick={() => {
                            let copy = [...tipsOpen];
                            copy[1] = !tipsOpen[1];
                            setTipsOpen(copy);
                        }}
                    >
                        <div className="examination-info-header" style={{color: "white"}}>
                            <h3>{t("what_needed_blood")}</h3>
                            <img src={arrowBottom} className="arrow-bottom" alt="Arrow bottom"/>
                        </div>
                        {tipsOpen[1] && 
                        <div style={{whiteSpace: "pre-wrap", margin: "20px"}}>
                            {t("what_needed_blood_info")}
                        </div>}
                    </div>
                    <div
                        onClick={() => {
                            let copy = [...tipsOpen];
                            copy[2] = !tipsOpen[2];
                            setTipsOpen(copy);
                        }}
                    >
                        <div className="examination-info-header" style={{color: "white"}}>
                            <h3>{t("what_diff_ultrasound_mam")}</h3>
                            <img src={arrowBottom} className="arrow-bottom" alt="Arrow bottom"/>
                        </div>
                        {tipsOpen[2] && 
                        <div style={{whiteSpace: "pre-wrap", margin: "20px"}}>
                            {t("what_diff_ultrasound_mam_info")}
                        </div>}
                    </div>
                    <div
                        onClick={() => {
                            let copy = [...tipsOpen];
                            copy[3] = !tipsOpen[3];
                            setTipsOpen(copy);
                        }}
                    >
                        <div className="examination-info-header" style={{color: "white"}}>
                            <h3>{t("why_pap_test")}</h3>
                            <img src={arrowBottom} className="arrow-bottom" alt="Arrow bottom"/>
                        </div>
                        {tipsOpen[3] && 
                        <div style={{whiteSpace: "pre-wrap", margin: "20px"}}>
                            {t("why_pap_test_info")}
                        </div>}
                    </div>
                    <button className="find-doctor-btn" style={{width: "80%"}}>
                        Знайти лабораторію поруч (фіг ми її знайдемо, краще до спеціаліста)
                    </button>
                </div>
            </div>
        </div>
    )
}

export default FemaleExaminationPage;