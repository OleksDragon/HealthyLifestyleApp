import { useTranslation } from "react-i18next";
import mascot from "../../../img/mascot.png";
import "../../../styles/gender.css";
import { useState } from "react";
import arrowBottom from "../../../icons/ArrowBottom.png";

function FemaleCyclePage() {
    const { t } = useTranslation();

    const [openedInfos, setOpenedInfos] = useState([false, false, false]);

    return (
        <div className="scroll-data cycle-container">
            <div className="female-health-info" style={{position: "relative"}}>
                <div className="title">{t("your_cycle")}</div>
                <div className="sub-title">{t("cycle_control")}</div>
                <img alt="mascot" src={mascot} className="mascot-img" style={{top: "-20px", width: "280px"}}/>
            </div>
            <div className="calendar-cycle">
                <h3>{t("calendar_cycle")}</h3>
                <div className="date-info">
                    <div>Георгій, де елементи?</div>
                    <div>Георгій, де елементи?</div>
                    <div>Георгій, де елементи?</div>
                    <button>{t("calc_cycle")}</button>
                    <span className="warning-calc">
                        {t("warning_calc")}
                    </span>
                </div>
                <div className="cycle-info">
                    <div onClick={() => {let newArray = [...openedInfos]; newArray[0] = !newArray[0]; setOpenedInfos(newArray)}}>
                        <div className="cycle-info-header">
                            <h3>{t("phase")}</h3>
                            <img src={arrowBottom} className="arrow-bottom" alt="Arrow bottom" />
                        </div>
                        {openedInfos[0] && 
                            <div className="cycle-info-content">
                                <div>{t("proccess_in_body")}</div>
                                <div>{t("proccess_in_body_desc")}</div>
                                <div>{t("phase_1_5")}</div>
                                <div>{t("phase_1_5_desc")}</div>
                                <div>{t("phase_6_13")}</div>
                                <div>{t("phase_6_13_desc")}</div>
                                <div>{t("phase_14_16")}</div>
                                <div>{t("phase_14_16_desc")}</div>
                                <div>{t("phase_17_28")}</div>
                                <div>{t("phase_17_28_desc")}</div>
                                <div className="cycle-finalize">{t("finalize_cycle")}</div>
                            </div>
                        }
                    </div>
                    <div onClick={() => {let newArray = [...openedInfos]; newArray[1] = !newArray[1]; setOpenedInfos(newArray)}}>
                        <div className="cycle-info-header">
                            <h3>{t("why_should_calendar")}</h3>
                            <img src={arrowBottom} className="arrow-bottom" alt="Arrow bottom" />
                        </div>
                        {openedInfos[1] && 
                            <div className="cycle-info-content">
                                <div className="cycle-preview">{t("preview_calendar")}</div>
                                <div>{t("predict_cycle")}</div>
                                <div>{t("predict_cycle_desc")}</div>
                                <div>{t("listen_yourself")}</div>
                                <div>{t("listen_yourself_desc")}</div>
                                <div>{t("regularity")}</div>
                                <div>{t("regularity_desc")}</div>
                                <div>{t("doctor_help")}</div>
                                <div>{t("doctor_help_desc")}</div>
                                <div>{t("planing")}</div>
                                <div>{t("planing_desc")}</div>
                                <div className="cycle-finalize">{t("finalize_calendar")}</div>
                            </div>
                        }
                    </div>
                    <div onClick={() => {let newArray = [...openedInfos]; newArray[2] = !newArray[2]; setOpenedInfos(newArray)}}>
                        <div className="cycle-info-header">
                            <h3>{t("myth_facts")}</h3>
                            <img src={arrowBottom} className="arrow-bottom" alt="Arrow bottom" />
                        </div>
                        {openedInfos[2] && 
                            <div className="cycle-info-content">
                                <div className="cycle-preview">{t("preview_myth")}</div>
                                <div>-</div>
                                <div>-</div>
                                <div>-</div>
                                <div>-</div>
                                <div>-</div>
                                <div>-</div>
                                <div>-</div>
                                <div>-</div>
                                <div>-</div>
                                <div>-</div>
                                <div className="cycle-finalize">-</div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FemaleCyclePage;