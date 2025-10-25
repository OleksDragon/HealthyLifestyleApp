import { useTranslation } from "react-i18next";
import mascot from "../../../img/mascot.png";
import "../../../styles/gender.css";
import { useEffect, useState } from "react";
import arrowBottom from "../../../icons/ArrowBottom.png";
import CustomDatePicker from "../../../elements/Health/FemaleHealth/CustomDatePicker/CustomDatePicker";
import FemaleCustomSelect from "../../../elements/Health/FemaleHealth/CustomSelector/FemaleCustomSelect";
import { useLocation, useNavigate } from 'react-router-dom';
import axios from "axios";

function FemaleCyclePage() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const location = useLocation();

    const [trackId, setTrackId] = useState('');

    const [openedInfos, setOpenedInfos] = useState([false, false, false]);
    const initialFormData = {
        cycleStartDate: '',
    };

    const [formData, setFormData] = useState(initialFormData);
    const formatDate = (date) => {
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day} ${month} ${year}`;
    };

    const [selectedNumber1, setSelectedNumber1] = useState('');
    const [selectedNumber2, setSelectedNumber2] = useState('');
    const numbers1to10 = Array.from({ length: 10 }, (_, i) => (i + 1).toString());
    const numbers21to35 = Array.from({ length: 15 }, (_, i) => (i + 21).toString());  

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const saveCycleData = async () => {
        try {
            const parts = formData.cycleStartDate.split(/[-\s]/);
            const entryDate = `${parts[2]}-${parts[1]}-${parts[0]}`;

            const data = {
                UserId: localStorage.getItem("user-id"),
                RecordDate: new Date().toISOString().split("T")[0],
                EntryDate: entryDate,
                CycleDay: selectedNumber2.toString(),
                MenstDay: selectedNumber1.toString(),
                IsFertile: false, // It doesn't matter now
            }

            if (trackId.length === 0) {
                await axios.post(
                    `${process.env.REACT_APP_API_URL}/api/female-health-tracker`,
                    data,
                    {
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem("helth-token")}`
                        }
                    }
                );
            }
            else {
                await axios.put(
                    `${process.env.REACT_APP_API_URL}/api/female-health-tracker/${localStorage.getItem("user-id")}`,
                    data,
                    {
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem("helth-token")}`
                        }
                    }
                );
            }
        } catch (error) {
            console.log(error)
        }

        navigate(`${location.pathname}/menstruation_calendar`, 
            { state: {start: formData, m_long: selectedNumber1, c_long: selectedNumber2} })
    }

    useEffect(() => {
        const getLastRecord = async () => {
            try {
                const response = await axios.get(
                    `${process.env.REACT_APP_API_URL}/api/female-health-tracker/${localStorage.getItem("user-id")}`,
                    {
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem("helth-token")}`
                        }
                    }
                );

                setSelectedNumber1(response.data.MenstDay.toString());
                setSelectedNumber2(response.data.CycleDay.toString());
                let date = new Date(response.data.EntryDate);
                handleInputChange('cycleStartDate', formatDate(date));
                setTrackId(response.data.Id);
            } 
            catch (error) {
                console.log(error)
            } 
        }

        getLastRecord()
    }, [])

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
                    <CustomDatePicker
                        selected={formData.cycleStartDate ? new Date(formData.cycleStartDate.split(' ').reverse().join('-')) : null}
                        onChange={(date) => {
                            const formattedDate = formatDate(date);
                            handleInputChange('cycleStartDate', formattedDate);
                        }}
                        placeholder={t("last_cycle_first_day")}
                        minAge={0}
                    />
                     <FemaleCustomSelect
                        id="number-1-10"
                        placeholder={t("m_long")}
                        options={numbers1to10}
                        value={selectedNumber1}
                        onChange={(val) => setSelectedNumber1(val)}
                        maxVisibleChars={3}
                        className="femail-custom-select"
                    />
                    <FemaleCustomSelect
                        id="number-1-32"
                        placeholder={t("c_long_wh")}
                        options={numbers21to35}
                        value={selectedNumber2}
                        onChange={(val) => setSelectedNumber2(val)}
                        maxVisibleChars={3}
                        className="femail-custom-select"
                    />
                    <button
                        disabled={!formData.cycleStartDate || selectedNumber1.length === 0 || selectedNumber2.length === 0}
                        onClick={() => saveCycleData()}
                    >{t("calc_cycle")}</button>
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
                                <div className="f-row">{t("proccess_in_body")}</div>
                                <div className="s-row">{t("proccess_in_body_desc")}</div>
                                <div className="f-row">{t("phase_1_5")}</div>
                                <div className="s-row">{t("phase_1_5_desc")}</div>
                                <div className="f-row">{t("phase_6_13")}</div>
                                <div className="s-row">{t("phase_6_13_desc")}</div>
                                <div className="f-row">{t("phase_14_16")}</div>
                                <div className="s-row">{t("phase_14_16_desc")}</div>
                                <div className="f-row">{t("phase_17_28")}</div>
                                <div className="s-row">{t("phase_17_28_desc")}</div>
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
                                <div className="f-row">{t("predict_cycle")}</div>
                                <div className="s-row">{t("predict_cycle_desc")}</div>
                                <div className="f-row">{t("listen_yourself")}</div>
                                <div className="s-row">{t("listen_yourself_desc")}</div>
                                <div className="f-row">{t("regularity")}</div>
                                <div className="s-row">{t("regularity_desc")}</div>
                                <div className="f-row">{t("doctor_help")}</div>
                                <div className="s-row">{t("doctor_help_desc")}</div>
                                <div className="f-row">{t("planing")}</div>
                                <div className="s-row">{t("planing_desc")}</div>
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
                                <div className="cycle-preview" style={{textAlign: "center", fontSize: "18px", marginTop: "-10px"}}>{t("myth_main")}</div>
                                <div className="cycle-preview" style={{textAlign: "center", fontSize: "14px", marginTop: "-10px", marginBottom: "10px"}}>{t("myth_sub")}</div>
                                <div className="f-row">{t("cant_sport")}</div>
                                <div className="s-row">{t("cant_sport_desc")}</div>
                                <div className="f-row">{t("c_long_")}</div>
                                <div className="s-row">{t("c_long_desc")}</div>
                                <div className="f-row">{t("cant_swim")}</div>
                                <div className="s-row">{t("cant_swim_desc")}</div>
                                <div className="f-row">{t("cant_get_pregnant")}</div>
                                <div className="s-row">{t("cant_get_pregnant_desc")}</div>
                                <div className="f-row">{t("pain_is_ok")}</div>
                                <div className="s-row">{t("pain_is_ok_desc")}</div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FemaleCyclePage;