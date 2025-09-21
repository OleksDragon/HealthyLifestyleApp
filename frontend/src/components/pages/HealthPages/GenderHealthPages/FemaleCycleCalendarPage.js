import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import "../../../styles/cycleCalendar.css";
import "../../../styles/gender.css";
import arrowLeft from "../../../icons/ArrowLeft2.png";
import arrowLeft3 from "../../../icons/ArrowLeft3.png";
import arrowRight from "../../../icons/ArrowRight2.png";
import calendar from "../../../icons/Calendar.png";
import { useState } from "react";
import mascot from "../../../img/mascot_women_health.png";

function FemaleCycleCalendarPage() {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const location = useLocation();
    const { state } = useLocation();

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const [month, setMonth] = useState(today.getMonth() + 1);
    const [year, setYear] = useState(today.getFullYear());
    const [monthYear, setMonthYear] = useState(0);
    const [fullCalendar, setFullCalendar] = useState(false);

    const parseDate = (str) => {
        const [day, month, year] = str.split(' ').map(Number);
        return new Date(year, month - 1, day);
    };

    const mStart = parseDate(state?.start.cycleStartDate);
    const mLong = state?.m_long;
    const cLong = state?.c_long;

    const getNextOvulation = () => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const start = new Date(mStart);
        start.setHours(0,0,0,0);

        const ovulationDay = Math.round(cLong / 2);

        let nextOvulation = new Date(start);
        nextOvulation.setDate(start.getDate() + ovulationDay - 1);

        while (nextOvulation < today) {
            nextOvulation.setTime(nextOvulation.getTime() + (cLong * 24 * 60 * 60 * 1000));
        }

        nextOvulation.setHours(0, 0, 0, 0);

        return nextOvulation;
    }

    const msPerDay = 1000 * 60 * 60 * 24;
    const nextOvulation = getNextOvulation();

    const daysUntilOv = Math.ceil((nextOvulation - today) / msPerDay);
    const prevOv = cLong - daysUntilOv;
    let pregnancyChance = "low_chance";

    if (daysUntilOv >= 0 && daysUntilOv <= 1 || prevOv === 1) {
        pregnancyChance = "high_chance";
    } else if (daysUntilOv >= 2 && daysUntilOv <= 4) {
        pregnancyChance = "average_chance";
    } else if (daysUntilOv === 5 || prevOv === 2) {
        pregnancyChance = "low_chance";
    } else {
        pregnancyChance = "no_chance";
    }

    const formDays = (days) => {
        let formKey;

        if (i18n.language === 'uk') {
            if (days % 100 >= 11 && days % 100 <= 14) formKey = 'other';
            else if (days % 10 === 1) formKey = 'one';
            else if (days % 10 >= 2 && days % 10 <= 4) formKey = 'few';
            else formKey = 'other';
        } else {
            formKey = days === 1 ? 'one' : 'other';
        }

        return `${days} ${t(formKey)}`
    }

    const getMonthNameByNumber = (monthNumber, locale) => {
        const date = new Date(2025, monthNumber - 1, 1); 
        return new Intl.DateTimeFormat(locale, { month: 'long' }).format(date);
    }

    const getDayClass = (day, month, year) => {
        const date = new Date(year, month - 1, day);
        let start = new Date(mStart.getFullYear(), mStart.getMonth(), mStart.getDate());
        while (start > date) {
            start.setDate(start.getDate() - cLong);
        }

        let diffDays = Math.floor((date - start) / (1000 * 60 * 60 * 24));
        if (diffDays < 0) return '';

        const dayInCycle = (diffDays % cLong) + 1;
        const ovulationDay = Math.round(cLong / 2);

        if (date <= today) {
            if (dayInCycle <= mLong) return 'example-menstruation';
            if (dayInCycle === ovulationDay) return 'example-ovulation';
        } else {
            if (dayInCycle <= mLong) return 'example-scheduled-menstruation';
            if (dayInCycle === ovulationDay) return 'example-planned-ovulation';
        }

        return '';
    }

    const getPhase = () => {
        let start = new Date(mStart.getFullYear(), mStart.getMonth(), mStart.getDate());
        start.setHours(0, 0, 0, 0);

        while (start <= today) {
            start.setTime(start.getTime() + (cLong * 24 * 60 * 60 * 1000));
        }

        start.setTime(start.getTime() - (cLong * 24 * 60 * 60 * 1000));

        const dayOfCycle = Math.ceil((today - start) / (1000 * 60 * 60 * 24)) + 1;

        const phases = {
            menstrual: Number(mLong),
            follicular: Math.round(cLong / 2) - mLong - 2,
            ovulatory: 2,
            luteal:   Math.round(cLong / 2) - mLong - 2
        };

        if (dayOfCycle <= phases.menstrual) 
        {
            return "phase_1";
        }
        else if (dayOfCycle <= phases.menstrual + phases.follicular) 
        {
            return "phase_2";
        }
        else if (dayOfCycle <= phases.menstrual + phases.follicular + phases.ovulatory) 
        {
            return "phase_3";
        }
        else 
        {
            return "phase_4";
        }
    };

    function monthNameGenitiveByNumber(num, locale) {
        const date = new Date(2025, num, 1);
        const parts = new Intl.DateTimeFormat(locale, {
            day: 'numeric',
            month: 'long'
        }).formatToParts(date);
        return parts.find(p => p.type === 'month').value;
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
    const hadnleArrowClick = (type) => {
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

    return (
        <div className="scroll-data female-health-container">
            <div className="navigation">
                <div className="to-general-cycle">
                    <img src={arrowLeft} alt="Arrow left"/>
                    <button onClick={() => navigate(location.pathname.substring(0, location.pathname.lastIndexOf('/')))}>{t("go_back")}</button>
                </div>
                <div className="full-calendar" onClick={() => setFullCalendar(!fullCalendar)}>
                    <img src={calendar} alt="Calendar"/>
                </div>
            </div>
            {!fullCalendar ?
            <div>
                <div className="calendar-main-content">
                    <div className="big-circle">
                        {Array.from( {length: 36} ).map((_, i) => {
                            return <div className="small-circle" style={{ "--i": i }}></div>
                        })}
                        <div className="ovulation-info">
                            <div>{today.getDate()} {monthNameGenitiveByNumber(today.getMonth(), i18n.language)}</div>
                            <div>{t("ovulation_in")}</div>
                            <div>{formDays(daysUntilOv)}</div>
                            <div>{t(pregnancyChance)}</div>
                        </div>
                    </div>
                    <div className="calendar">
                        <div className="calendar-header">
                            <img style={{cursor: "pointer"}} onClick={() => hadnleArrowClick(-1)} src={arrowLeft3} alt="Arrow leaf"/>
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
                            <img style={{cursor: "pointer"}} onClick={() => hadnleArrowClick(1)} src={arrowRight} alt="Arrow right"/>
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

                                const dayClass = getDayClass(d, _month, _year);

                                return <div
                                    key={idx} 
                                    className={`month-day ${isInactive ? 'inactive' : ''} ${isToday ? 'today' : ''}  ${dayClass}`}
                                >
                                    {isToday && <div className="today-sign">{t("now")}</div>}
                                    {d}
                                </div>
                            })}
                        </div>
                    </div>
                </div>
                <div className="calendar-info">
                    <div className="current-cycle-info">
                        <img className="mascot-women-health" src={mascot} alt="mascot"/>
                        <div>
                            <div>{t("super")}</div>
                            <div>{t("c_long", {cLong: cLong})}</div>
                            <div style={{whiteSpace: "pre-wrap"}}>{t(getPhase())}</div>
                        </div>
                    </div>
                    <div className="calendar-signs">
                        <div>
                            <div className="example-menstruation">9</div>
                            <div className="example-text">{t("menstruation")}</div>
                        </div>
                        <div>
                            <div className="example-scheduled-menstruation">9</div>
                            <div className="example-text">{t("scheduled_menstruation")}</div>
                        </div>
                        <div>
                            <div className="example-ovulation">23</div>
                            <div className="example-text">{t("ovulation")}</div>
                        </div>
                        <div>
                            <div className="example-planned-ovulation">23</div>
                            <div className="example-text">{t("planned_ovulation")}</div>
                        </div>
                    </div>
                </div>
            </div>
            :
            <div className="scroll-data full-calendar-container">
                {Array.from( {length: 12} ).map((_, i) => {
                    return (
                        <div className="calendar-body sub-calendar">
                            <div className="calendar-month">{getMonthNameByNumber(i + 1, i18n.language)} <span>{today.getFullYear()}</span></div>
                            {getWeekdays(i18n.language).map((d, idx) => {
                                return <div key={idx} className="day-of-week">{d}</div>
                            })}
                            {monthNumbers(today.getFullYear(), i + 1).map((d, idx) => {
                                let isInactive = false;
                                let _month = i + 1;
                                let _year = today.getFullYear();
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

                                const dayClass = getDayClass(d, _month, _year);

                                return <div
                                    key={idx} 
                                    className={`month-day sub-month-day ${isInactive ? 'inactive' : ''} ${isToday ? 'today' : ''}  ${dayClass}`}
                                >
                                    {isToday && <div className="today-sign">{t("now")}</div>}
                                    {d}
                                </div>
                            })}
                        </div>
                    )
                })}
            </div>
            }
        </div>
    )
}

export default FemaleCycleCalendarPage;