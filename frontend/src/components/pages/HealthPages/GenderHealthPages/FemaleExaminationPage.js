import { useTranslation } from "react-i18next";
import arrowLeft from "../../../icons/ArrowLeft2.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import arrowBottom from "../../../icons/ArrowBottom.png";
import axios from "axios";

function FemaleExaminationPage() {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const [tipsOpen, setTipsOpen] = useState([false, false, false, false]);

    const [gynec, setGynec] = useState(false);
    const [pap, setPap] = useState(false);
    const [ultra, setUltra] = useState(false);
    const [ultraGl, setUltraGl] = useState(false);
    const [blood, setBlood] = useState(false);

    const handleAddTestsToCalendar = async () => {
        const msPerYear = 1000 * 60 * 60 * 24 * 365;
        let tests = []

        if (gynec) {
            for (let i = 0; i < 4; i++) {
                let date = new Date();
                date.setHours(15, 0, 0, 0)
                date.setTime(date.getTime() + msPerYear * i)
                tests.push({title: t("gynecology_examination"), date: date});
            }
        }

        if (pap) {
            for (let i = 0; i < 2; i++) {
                let date = new Date();
                date.setHours(16, 0, 0, 0)
                date.setTime(date.getTime() + msPerYear * i * 2)
                tests.push({title: t("pap_test"), date: date});
            }
        }

        if (ultra) {
            for (let i = 0; i < 4; i++) {
                let date = new Date();
                date.setHours(17, 0, 0, 0)
                date.setTime(date.getTime() + msPerYear * i)
                tests.push({title: t("ultrasound_test"), date: date});
            }
        }

        if (ultraGl) {
            for (let i = 0; i < 4; i++) {
                let date = new Date();
                date.setHours(18, 0, 0, 0)
                date.setTime(date.getTime() + msPerYear * i)
                tests.push({title: t("ultrasound_glands"), date: date});
            }
        }

        if (blood) {
            for (let i = 0; i < 4; i++) {
                let date = new Date();
                date.setHours(19, 0, 0, 0)
                date.setTime(date.getTime() + msPerYear * i)
                tests.push({title: t("blood_test"), date: date});
            }
        }

        tests.map(async t => {
            await axios.post(`${process.env.REACT_APP_API_URL}/api/Calendar/`,
                {
                    AuthorId: localStorage.getItem("user-id"),
                    Title: t.title,
                    StartTime: t.date.toISOString(),
                    TaskToDo: "Doctor",
                },
                {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem("helth-token")}`
                    }
                }
            );
        })

        navigate("/calendar")
    }
    
    return (
        <div className="scroll-data female-health-container hidden-scroll">
            <div className="navigation">
                <div className="to-general-cycle" style={{marginBottom: "10px"}}>
                    <img src={arrowLeft} alt="Arrow left"/>
                    <button onClick={() => navigate(-1)}>{t("go_back")}</button>
                </div>
            </div>
            <div className="woman-health-info" style={{height: "80px"}}>
                <div className="title">{t("examination_head")}</div>
                <div className="sub-title hidden-phone">{t("examination_desc")}</div>
            </div>
            <div className="tests-container">
                <div className="tests-options">
                    <h3>{t("base_review")}</h3>
                    <label class="radio-wrapper">
                        <input type="checkbox" checked={gynec} name="color" value="red" onChange={(e) => setGynec(e.target.checked)}/>
                        <span class="custom-radio"></span>
                        {t("gynecology_examination")}
                    </label>    
                    <label class="radio-wrapper">
                        <input type="checkbox" checked={pap} name="color" value="red" onChange={(e) => setPap(e.target.checked)}/>
                        <span class="custom-radio"></span>
                        {t("pap_test")}
                    </label>
                    <label class="radio-wrapper">
                        <input type="checkbox" checked={ultra} name="color" value="red" onChange={(e) => setUltra(e.target.checked)}/>
                        <span class="custom-radio"></span>
                        {t("ultrasound_test")}
                    </label>
                    <label class="radio-wrapper">
                        <input type="checkbox" checked={ultraGl} name="color" value="red" onChange={(e) => setUltraGl(e.target.checked)}/>
                        <span class="custom-radio"></span>
                        {t("ultrasound_glands")}
                    </label>
                    <label class="radio-wrapper">
                        <input type="checkbox" checked={blood} name="color" value="red" onChange={(e) => setBlood(e.target.checked)}/>
                        <span class="custom-radio"></span>
                        {t("blood_test")}
                    </label>
                    <button onClick={() => handleAddTestsToCalendar()}>{t("add_to_calendar")}</button>
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
                        {t("find_doctor")}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default FemaleExaminationPage;