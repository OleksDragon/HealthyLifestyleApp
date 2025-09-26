import { useTranslation } from "react-i18next";
import arrowLeft from "../../../icons/ArrowLeft2.png";
import arrowLeft3 from "../../../icons/ArrowLeft3.png";
import arrowRight from "../../../icons/ArrowRight2.png";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function FemaleReproductiveHealthPage() {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const [hasData, setHasData] = useState(false);
    const [mStart, setMStart] = useState(today);
    const [mLong, setMLong] = useState(5);
    const [cLong, setCLong] = useState(10);
    const [monthYear, setMonthYear] = useState(0);

    const [month, setMonth] = useState(today.getMonth() + 1);
    const [year, setYear] = useState(today.getFullYear());
    const hadnleArrowClick = (type) => {
        let newMonth = month + type;
        if (newMonth === 0) {
            newMonth = 12
        }
        if (newMonth === 13) {
            newMonth = 1
        }
        setMonth(newMonth)
    }

    let colors = ["#003E7D", "#004D9C", "#0056AE", "#006CDA", "#0075ED", "#60AFFF", "#A5CEFF", "#CDE4FF"];
    const msPerDay = 1000 * 60 * 60 * 24;

    function getDayColor(day) {
        if (!hasData) {
            return colors[7]
        }
        const date = new Date(day);
        let start = new Date(mStart);

        while (start >= date) {
            start.setDate(start.getTime() - cLong * msPerDay);
        }

        const diffDays = Math.floor(
            (date.setHours(0,0,0,0) - start.setHours(0,0,0,0)) / msPerDay
        );

        const offset = (diffDays % cLong);

        const ovulDay = Math.floor(cLong / 2);

        const dist = Math.min(
            Math.abs(offset - ovulDay),
            Math.abs(offset + cLong - ovulDay),
            Math.abs(offset - cLong - ovulDay)
        );

        const maxRange = colors.length - 1;
        const index = Math.min(Math.round(dist), maxRange);

        return colors[index];
    }
    
    const getMonthNameByNumber = (monthNumber, locale) => {
        const date = new Date(2025, monthNumber - 1, 1); 
        return new Intl.DateTimeFormat(locale, { month: 'long' }).format(date);
    }

    const getWeekdays = (locale, format = 'short') => {
        const base = new Date(Date.UTC(2025, 0, 5)); // Sunday
        const formatter = new Intl.DateTimeFormat(locale, { weekday: format });

        const days = [...Array(7).keys()].map(i =>
            formatter.format(new Date(base.getTime() + i * 24 * 60 * 60 * 1000))
        );

        days.push(days.shift());
        return days;
    }

    // Get days of this calendar month (with previos and next days)
    const monthNumbers = (year, month) => {
        const m = month - 1;
        const firstDay = new Date(year, m, 1);
        const lastDay  = new Date(year, m + 1, 0);

        const prevMonthLast = new Date(year, m, 0).getDate();
        const daysInMonth = lastDay.getDate();

        let startOffset = (firstDay.getDay() + 6) % 7;

        const arr = [];

        for (let i = startOffset; i > 0; i--) {
            arr.push(prevMonthLast - i + 1);
        }

        for (let d = 1; d <= daysInMonth; d++) {
            arr.push(d);
        }

        while (arr.length % 7 !== 0) {
            arr.push(arr.length - startOffset - daysInMonth + 1);
        }

        return arr;
    }

    // type = (-1, 1), -1 - left, 1 - right
    const handleArrowClick = (type) => {
        if (monthYear === 0) {
            let newMonth = month + type;
            if (newMonth === 0) {
                newMonth = 12
            }
            if (newMonth === 13) {
                newMonth = 1
            }
            setMonth(newMonth)
        }
        else {
            setYear(year + type)
        }
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

                setMLong(response.data.MenstDay.toString());
                setCLong(response.data.CycleDay.toString());
                setMStart(new Date(response.data.EntryDate));
                setHasData(true);
            }
            catch (error) {
                console.log(error)
                setHasData(false);
            }
        }

        getLastRecord()
    }, [])

    return (
        <div className="scroll-data female-health-container">
            <div className="navigation">
                <div className="to-general-cycle" style={{marginBottom: "10px"}}>
                    <img src={arrowLeft} alt="Arrow left"/>
                    <button onClick={() => navigate(-1)}>{t("go_back")}</button>
                </div>
            </div>
            <div className="woman-health-info" style={{height: "100px", gridTemplateColumns: "2fr 3fr"}}>
                <div className="title">{t("reproductive")}</div>
                <div className="sub-title">{t("reproductive_sub")}</div>
            </div>
            <div className="calendar-main-content">
                <div className="calendar" style={{marginTop: "20px"}}>
                    <div className="calendar-header">
                        <img style={{cursor: "pointer"}} onClick={() => handleArrowClick(-1)} src={arrowLeft3} alt="Arrow leaf"/>
                        <div 
                            className={`calendar-date-element ${monthYear === 0 && 'active-part'}`}
                            onClick={() => setMonthYear(0)}
                        >
                            {getMonthNameByNumber(month, i18n.language)}
                        </div>
                        <div 
                            className={`calendar-date-element ${monthYear === 1 && 'active-part'}`}
                            onClick={() => setMonthYear(1)}
                        >
                            {year}
                        </div>
                        <img style={{cursor: "pointer"}} onClick={() => handleArrowClick(1)} src={arrowRight} alt="Arrow right"/>
                    </div>
                    <div className="calendar-body">
                        {getWeekdays(i18n.language).map((d, idx) => {
                            return <div key={idx} className="day-of-week">{d}</div>
                        })}
                        {monthNumbers(year, month).map((d, idx) => {
                            let isInactive = false;
                            let _month = month;
                            let _year = year;
                            if (d > idx + 1) {
                                _month -= 1;
                                isInactive = true;
                            }
                            else if (d < idx - 7) {
                                _month += 1;
                                isInactive = true;
                            }
                            if (_month === 0) {
                                _month = 12;
                                _year -= 1;
                            }
                            if (_month === 13) {
                                _month = 1;
                                _year += 1;
                            }
                            const isToday = _year === today.getFullYear() &&
                                _month === today.getMonth() + 1 &&
                                d === today.getDate();
                            const dayColor = getDayColor(new Date(_year, _month - 1, d))
                            return <div
                                key={idx} 
                                className={`month-day ${isInactive ? 'inactive' : ''}`}
                                style={{backgroundColor: dayColor}}
                            >
                                {isToday && <div className="today-sign">{t("now")}</div>}
                                {d}
                            </div>
                        })}
                    </div>
                </div>
                <div className="reproductive-info">
                    <div>Планування батьківства</div>
                    <div>Розумна контрацепція</div>
                    <button className="find-doctor-btn">{t("find_doctor")}</button>
                </div>
            </div>
        </div>
    )
}

export default FemaleReproductiveHealthPage;