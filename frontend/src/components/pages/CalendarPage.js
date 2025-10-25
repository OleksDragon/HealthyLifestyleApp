import { useTranslation } from "react-i18next";
import "../styles/calendar.css";
import "../styles/timePicker.css";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { YearMonthSelect } from "../elements/Health/FemaleHealth/CustomDatePicker/CustomDatePicker";
import iconAddEvent from "../icons/AddEvent.png";
import arrowBottom from "../icons/ArrowDown.png";
import Select, { components } from "react-select";
import DatePicker from "react-datepicker";
import iconClock from "../icons/Clock.png";
import iconCalendar from "../icons/CalendarEvent.png";
import searchIcon from "../icons/GlassScale.png";
import editIcon from "../icons/EditEvent.png";
import deleteIcon from "../icons/DeleteEvent.png";
import notificationIcon from "../icons/CalendarNotification.png";
import meetingIcon from "../icons/CalendarMeet.png";
import taskIcon from "../icons/TaskEvent.png";
import crossIcon from "../icons/Cross.png";
import { useNavigate } from 'react-router-dom';

function CalendarPage() {
    const { t, i18n } = useTranslation();
    const inputRef = useRef(null);
    const navigate = useNavigate();

    const [weekNums, setWeekNums] = useState([]);
    const [weekEvents, setWeekEvents] = useState([]);
    const [selected, setSelected] = useState(new Date());
    const [selectedSC, setSelectedSC] = useState(new Date());
    const [page, setPage] = useState(0);
    const [selectedWeekIdx, setSelectedWeekIdx] = useState(null);
    const [monthWeeks, setMonthWeeks] = useState([]);
    //const [meetType, setMeetType] = useState(0);
    const [users, setUsers] = useState([]);
    const [addNewPart, setAddNewPart] = useState(false);
    const [curPart, setCurPart] = useState("");
    const [activeEvent, setActiveEvent] = useState("");
    const [eventToDelete, setEventToDelete] = useState("");
    const [showModal, setShowModal] = useState(false);
    
    // Event
    const [id, setId] = useState("");
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [date, setDate] = useState(null);
    const [time, setTime] = useState(null);
    const [parts, setParts] = useState([]);
    const [end, setEnd] = useState(null);
    const [link, setLink] = useState("");
    const [selectedNotification, setSelectedNotification] = useState(null);
    const [selectedTask, setSelectedTask] = useState(null);

    const optionsNotifications = [
        { value: 5, label: 'За 5 хвилин' },
        { value: 10, label: 'За 10 хвилин' },
    ]

    const optionsTasks = [
        { value: 'Workout', label: t("workout") },
        { value: 'Eating', label:  t("eating") },
        { value: 'Doctor', label: t("sign_for_doctor") },
    ]

    const msPerDay = 1000 * 60 * 60 * 24;
    const today = new Date();

    const months = [
        t("p_january"), t("p_february"), t("p_march"), t("p_april"), t("p_may"), t("p_june"),
        t("p_july"), t("p_august"), t("p_september"), t("p_october"), t("p_november"), t("p_december")
    ];

    const maxTime = new Date(today);
    maxTime.setHours(23, 55, 0);
    const minTime = new Date(today);
    minTime.setHours(0, 0, 0);

    const currentYear = new Date().getFullYear() + 5;
    const years = Array.from({ length: currentYear - 1900 + 1 }, (_, i) => currentYear - i);
    const monthsOptions = months.map((m, idx) => ({ value: idx, label: m }));

    const toLocalISOString = (date) => {
        const pad = n => n.toString().padStart(2, '0');
        return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
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

    const getWeekRange = (date) => {
        const start = new Date(date);
        const day = start.getDay();

        const diffToMonday = (day === 0 ? 7 : day) - 1;

        start.setDate(start.getDate() - diffToMonday);
        start.setHours(0, 0, 0, 0);

        const end = new Date(start.getTime() + 7 * msPerDay);
        end.setHours(0, 0, 0, 0);

        return {
            start: start.toISOString(),
            end: end.toISOString()
        };
    };

    const MINUTES_PER_CELL = 5;

    const getCellIndex = (time) => {
        const date = new Date(time);
        return Math.floor(((date.getHours() + 1) * 60 + date.getMinutes()) / MINUTES_PER_CELL) + 1;
    }

    const generateWeek = () => {
        return weekNums.map((d, idx) => {
            const dayEvents = weekEvents.filter(e => (new Date(e.StartTime)).getDate() === d)
            .map(ev => ({
                ...ev,
                StartTime: toLocalISOString(new Date(ev.StartTime + "Z"))
            }));

            return (
                <div key={idx} className="day-container">
                    {dayEventsGenerator(dayEvents, d, idx)}
                </div>
            );
        });
    }

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

    const handleYearChange = (year) => {
        const newDate = new Date(selectedSC);
        newDate.setFullYear(year);
        setSelectedSC(newDate);
    };

    const handleMonthChange = (monthIndex) => {
        const newDate = new Date(selectedSC);
        newDate.setMonth(monthIndex);
        setSelectedSC(newDate);
    };

    const handleWeekClick = (date) => {
        const newDate = new Date(selectedSC);
        newDate.setDate(date.getDate());
        newDate.setHours(0, 0, 0, 0);

        setSelectedSC(newDate);
        setSelected(newDate);
        getSetWeekInfo(newDate);
        setMonthWeeks([]);
    };

    const isDayInactive = (d, wIdx, idx, weeksLen) => {
        if (d > idx + 1 && wIdx === 0) {
            return true;
        } else if (d < 7 && wIdx === weeksLen - 1) {
           return true;
        }

        return false;
    }

    const generateSmallCalendar = () => {
        const days = monthNumbers(selectedSC.getFullYear(), selectedSC.getMonth() + 1);

        const weeks = [];
        for (let i = 0; i < days.length; i += 7) {
            weeks.push(days.slice(i, i + 7));
        }

        if (monthWeeks.length === 0) {
            setMonthWeeks(weeks);
        }

        return weeks.map((week, wIdx) => {
            let curWeek = (selected.getFullYear() === selectedSC.getFullYear() && selected.getMonth() === selectedSC.getMonth() && (week.some((d, idx) => (d == selected.getDate() && !isDayInactive(d, wIdx, idx, weeks.length)))));

            if (curWeek && selectedWeekIdx === null) {
                setSelectedWeekIdx(wIdx);
            }

            return <div key={wIdx} className={`week ${curWeek ? 'current-week' : ''}`} onClick={() => {handleWeekClick(new Date(selectedSC.getFullYear(), selectedSC.getMonth(), wIdx === 0 ? week[6] : Math.max(...week))); setSelectedWeekIdx(wIdx);}}>
                {week.map((d, idx) => {
                let isInactive = false;
                let _month = selectedSC.getMonth() + 1;
                let _year = selectedSC.getFullYear();

                if (d > idx + 1 && wIdx === 0) {
                    _month -= 1;
                    isInactive = true;
                } else if (d < 7 && wIdx === weeks.length - 1) {
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

                const isToday =
                    _year === today.getFullYear() &&
                    _month === today.getMonth() + 1 &&
                    d === today.getDate();

                return (
                    <div
                    key={idx}
                    className={`month-day-general ${isInactive ? 'inactive' : ''} ${
                        isToday ? 'today' : ''
                    }`}
                    >
                    {d}
                    </div>
                );
                })}
            </div>
        });
    }

    const handleAddPart = (id, name) => {
        if (!parts.some(p => p.id === id))
        {
            setParts([...parts, {id: id, name: name}])
            setAddNewPart(false)
            setCurPart("")
            setUsers([])
        }
    }

    const getEventType = (event) => {
        let eventType = 0;
        if (event.MettingParticipants.length !== 0 || event.EndTime != null || event.MeetingLink.length != 0) {
            eventType = 3
        }
        else if (event.TaskToDo !== null) {
            eventType = 2
        }
        else {
            eventType = 1
        }

        return eventType
    }

    const handleEventUpdate = (event) => {
        const defaultOption = optionsNotifications.find(
            (o) => o.value === event.NotificationBefore
        );

        const defaultTask = optionsTasks.find(
            (o) => o.value === event.TaskToDo
        );

        setId(event.Id)
        setPage(getEventType(event))
        setTitle(event.Title)
        setDesc(event.Description)
        setDate(new Date(event.StartTime))
        setTime(new Date(event.StartTime))
        setEnd(new Date(event.EndTime))
        setLink(event.MeetingLink)
        setSelectedNotification(defaultOption)
        setSelectedTask(defaultTask)
        setParts(event.MettingParticipants.map(p => ({id: p.Id, name: p.FullName})))
    }

    const handleEventDelete = async () => { 
        try {
            await axios.delete(
                `${process.env.REACT_APP_API_URL}/api/Calendar/${eventToDelete}`,
                {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem("helth-token")}`
                    }
                }
            );

            getSetWeekInfo(today);
            setPage(0);
            clearAllData();
        } 
        catch (error) {
            console.log(error)
        } 
    }

    const clearDiffData = () => {
        setDesc("");
        setParts([]);
        setAddNewPart(false)
        setCurPart("")
        setUsers([])
        setEnd(null)
    }

    const delPart = (id) => {
        setParts(parts.filter(p => p.id != id))
    }

    const dayEventsGenerator = (events, d, row) => {
        const cells = [];
        let timeLineRow = Math.floor(((today.getHours() + 1) * 60 + today.getMinutes()) / MINUTES_PER_CELL) + 1;

        for (let i = 0; i < 24; i++) {
            let col = i * (60 / MINUTES_PER_CELL) + 12
            cells.push(<div key={`line-${i}`} className="hour-line" style={{ gridRow: `${col}`, zIndex: "1", gridColumn: "1/2" }}></div>);
        }

        events.forEach((e, idx) => {
            const startIdx = getCellIndex(e.StartTime);
            const eventLen = e.EndTime !== null ? Math.max(getCellIndex(e.EndTime) - startIdx, 5) : 5;

            cells.push(<div
                onClick={() => setActiveEvent(e.Id)}
                key={`event-${idx}`}
                className={`event-item ${e.Id === activeEvent ? 'expanded' : ''}`}
                style={{ gridRow: `${startIdx}/${startIdx + eventLen}`, zIndex: "2", gridColumn: "1/2", 
                ...(row < 4 ? { left: "0px" } : { right: "0px" }) }}
            >
                {e.Id === activeEvent ?
                    <div className="actions-event">
                        {e.AuthorId === localStorage.getItem("user-id") && <img src={editIcon} style={{cursor: "pointer"}} onClick={() => handleEventUpdate(e)}/>}
                        <span className="ppp" style={{gridColumn: "2/3"}}>{e.Title}</span>
                        {e.AuthorId === localStorage.getItem("user-id") && <img src={deleteIcon} style={{cursor: "pointer"}} onClick={() => {setShowModal(true); setEventToDelete(e.Id)}}/>}
                    </div>
                :
                    <span className="ppp">{e.Title}</span>
                }

                {e.Id === activeEvent && 
                    <div>
                        <div className="border-white time-show">
                            <img className="clock-icon" src={iconClock}/>
                            <div style={{marginLeft: "10px"}}>
                                {new Date(e.StartTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} 
                                {e.EndTime != null && <>-
                                {new Date(e.EndTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</>}
                            </div> 
                        </div>
                        <div className="participants scroll-data">
                            {e.MettingParticipants.map((p, idx) => {
                                return <div key={idx} className="border-white">
                                    {p.FullName}
                                </div>
                            })}
                        </div>
                        <br />
                        <a className="link-to-meet" href={e.MeetingLink} style={{marginTop: "4px", cursor: "pointer"}}>{e.MeetingLink}</a>
                    </div>
                }
            </div>)
        });

        if (selected.getFullYear() === today.getFullYear() && selected.getMonth() === today.getMonth() && d === today.getDate() && !isDayInactive(d, selectedWeekIdx, weekNums.indexOf(d), monthWeeks.length))
        {
            cells.push(<div key="current-time-indicator" className="current-time-indicator" style={{ gridRow: `${timeLineRow}`, zIndex: "3", gridColumn: "1/2" }}><div></div></div>);
        }

        return cells.map(cell => {
            return cell
        })
    }

    function mergeDateAndTime(datePart, timePart) {
        const merged = new Date(
            datePart.getFullYear(),
            datePart.getMonth(),
            datePart.getDate(),
            timePart.getHours(),
            timePart.getMinutes(),
            timePart.getSeconds()
        );

        return merged.toISOString();
    }

    const handleAddEvent = async () => {
        try {
            if (id.length !== 0) {
                await axios.put(`${process.env.REACT_APP_API_URL}/api/Calendar/${id}`,
                    {
                        AuthorId: localStorage.getItem("user-id"),
                        Title: title,
                        Description: desc,
                        StartTime: mergeDateAndTime(date, time),
                        EndTime: end !== null ? mergeDateAndTime(date, end) : null,
                        MeetingLink: link,
                        MettingParticipants: parts.map(u => u.id),
                        NotificationBefore: selectedNotification?.value,
                        TaskToDo: selectedTask?.value,
                    },
                    {
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem("helth-token")}`
                        }
                    }
                );
            } else {
                await axios.post(`${process.env.REACT_APP_API_URL}/api/Calendar/`,
                    {
                        AuthorId: localStorage.getItem("user-id"),
                        Title: title,
                        Description: desc,
                        StartTime: mergeDateAndTime(date, time),
                        EndTime: end !== null ? mergeDateAndTime(date, end) : null,
                        MeetingLink: link,
                        MettingParticipants: parts.map(u => u.id),
                        NotificationBefore: selectedNotification?.value,
                        TaskToDo: selectedTask?.value,
                    },
                    {
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem("helth-token")}`
                        }
                    }
                );
            }

            getSetWeekInfo(today);
            setPage(0);
            clearAllData();
        } catch (error) {
            console.log(error)
        }
    }

    const clearAllData = () => {
        setTitle("");
        setDesc("");
        setParts([]);
        setAddNewPart(false)
        setCurPart("")
        setUsers([])
        setDate(null)
        setTime(null)
        setId("")
        setEnd(null)
        setLink("")
    }

    const getSetWeekInfo = async (date) => {
        const range = getWeekRange(date);
        console.log(range)
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_API_URL}/api/Calendar/user/${localStorage.getItem("user-id")}/${range.start}/${range.end}`,
                {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem("helth-token")}`
                    }
                }
            );

            setWeekEvents(response.data);
        } 
        catch (error) {
            console.log(error);
            navigate('/login');
        } 

        let weekNumsTemp = [];
        let startNum = new Date(range.start);
        for (let i = 0; i < 7; i++) {
            weekNumsTemp.push(startNum.getDate());
            startNum.setTime(startNum.getTime() + msPerDay);
        }

        setWeekNums(weekNumsTemp);
    }

    const handleSearchUsers = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_API_URL}/api/User/name/${curPart}`,
                {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem("helth-token")}`
                    }
                }
            );

            setUsers(response.data.filter(e => e.Id !== localStorage.getItem("user-id") && !parts.some(p => p.id === e.Id)))
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getSetWeekInfo(today);
    }, [])

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (!e.target.closest(".event-item")) {
                setActiveEvent("");
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        if (addNewPart) {
            inputRef.current.focus();
        }
    }, [addNewPart]);

    const DropdownIndicator = (props) => {
        return (
            <components.DropdownIndicator {...props} style={{ padding: 0, margin: 0, border: "none" }}>
                <img src={arrowBottom} alt="Arrow down" style={{ width: "20px", height: "10px", marginRight: "10px"}} />
            </components.DropdownIndicator>
        );
    };

    return (
        <div className="calendar-page-container scroll-data">
            <div className="female-health-info">
                <div className="title">{t("calendar")}</div>
                <div className="sub-title" style={{color: "#0661CC"}}>{t("calendar_info")}</div>
            </div>
            <div className="general-calendar">
                <div>
                    <div className="small-calendar">
                        <div className="small-calendar-header">
                            <YearMonthSelect
                                value={selectedSC.getMonth()}
                                options={monthsOptions}
                                onChange={handleMonthChange}
                                className="month-selector"
                            />
                            <YearMonthSelect
                                value={selectedSC.getFullYear()}
                                options={years.map(y => ({ value: y, label: y }))}
                                onChange={handleYearChange}
                                className="year-selector"
                            />
                        </div>
                        <div className="calendar-body">
                            {getWeekdays(i18n.language).map((d, idx) => {
                                return <div key={idx} className="day-of-week-general">{d}</div>
                            })}
                            {generateSmallCalendar()}
                        </div>
                    </div>
                    <div className="create-event-button" onClick={() => {setPage(page === 0 ? 1 : 0); clearAllData()}}>
                        <div>{t("ch_create_submit")}</div>
                        <img src={iconAddEvent}/>
                    </div>
                    {showModal && (
                        <>
                            <div className="backdrop" onClick={() => setShowModal(false)} />

                            <div className="modal">
                                <h3>{t("sure_to_delete_event")}</h3>
                                <div className="buttons">
                                <button onClick={() => setShowModal(false)}>{t("no")}</button>
                                <button
                                    onClick={() => {
                                        handleEventDelete();
                                        setShowModal(false);
                                    }}
                                >
                                    {t("yes")}
                                </button>
                                </div>
                            </div>
                        </>
                    )}
                    {page === 0 && 
                        <div className="today-events scroll-data">
                            {weekEvents.filter(e => (new Date(e.StartTime + "Z")).getDate() === today.getDate()).sort((a, b) => new Date(a.StartTime) - new Date(b.StartTime))
                            .map(ev => ({
                                ...ev,
                                StartTime: toLocalISOString(new Date(ev.StartTime + "Z"))
                            })).map((e, idx) => {
                                let icon;
                                switch (getEventType(e)) {
                                    case 3:
                                        icon = meetingIcon
                                        break;
                                    case 2:
                                        icon = taskIcon
                                        break;
                                    case 1:
                                        icon = notificationIcon
                                        break;
                                }

                                const [year, month, day] = e.StartTime.split('T')[0].split('-');

                                return <div key={idx} className="small-event">
                                    <img src={icon} />
                                    <div style={{color: "#0661CC"}}>{`${day}.${month}.${year}`}</div>
                                    <div style={{color: "#0661CC"}}>{e.StartTime.split('T')[1].slice(0, 5)}</div>
                                    <div>{e.Title}</div>
                                </div>
                            })}
                        </div>
                    }
                </div>
                {page === 0 ?
                    <div className="big-calendar">
                        <div className="calendar-container scroll-data">
                            <div style={{display: "flex", alignItems: "flex-end"}}>
                                <div className="empty-calendar-corner"/>
                            </div>
                            <div className="calendar-header-days">
                                {getWeekdays(i18n.language).map((d, idx) => {
                                    return <div key={idx} className="day-of-week center day-of-week-general">{d}</div>
                                })}
                                {weekNums.map((d, idx) => {
                                    return <div key={idx} className={`day-of-week center num-of-day-general`}><div className={`ball-num ${(selected.getFullYear() === today.getFullYear() && selected.getMonth() === today.getMonth() && (d === today.getDate() && !isDayInactive(d, selectedWeekIdx, idx, monthWeeks.length))) ? 'today' : ''}`}>{d}</div></div>
                                })}
                            </div>
                            <div className="time-column">
                                {[...Array(24).keys()].map((h, idx) => {
                                    return <div key={idx} className="time-slot">{h}:00</div>
                                })}
                            </div>
                            {generateWeek()}
                        </div>
                    </div>
                :
                    <div className="add-event-element scroll-data">
                        <input value={title} className="event-title" placeholder={t("add_title")} onChange={(e) => setTitle(e.target.value)}/>
                        <div className="event-options">
                            <div 
                            className={`event-option ${page === 1 && 'active-event-option'}`}
                            onClick={() => {setPage(1); clearDiffData()}}>
                                {t("notification")}
                            </div>
                            <div 
                            className={`event-option ${page === 2 && 'active-event-option'}`}
                            onClick={() => {setPage(2); clearDiffData()}}>
                                {t("task")}
                            </div>
                            <div 
                            className={`event-option ${page === 3 && 'active-event-option'}`}
                            onClick={() => {setPage(3); clearDiffData()}}>
                                {t("meeting")}
                            </div>
                        </div>
                        <div className="date-time">
                            <div className="date" style={{position: "relative", width: "100%", gridColumn: `1/${page === 3 ? '3' : '2'}`}}>
                                <img style={{position: "absolute", top: "50%", transform: "translateY(-50%)"}} className="clock-icon" src={iconCalendar}/>
                                <DatePicker
                                    selected={date}
                                    onChange={(date) => setDate(date)}
                                    timeIntervals={5}
                                    dateFormat="dd.MM.yyyy"
                                    placeholderText={t("choose_date")}
                                    className="time-input date-input"
                                />
                            </div>
                            <div className="time" style={{position: "relative", width: "100%"}}>
                                <img className="clock-icon" src={iconClock}/>
                                <DatePicker
                                    selected={time}
                                    onChange={(date) => setTime(date)}
                                    showTimeSelect
                                    showTimeSelectOnly
                                    timeIntervals={5}
                                    dateFormat="HH:mm"
                                    timeFormat="HH:mm"
                                    placeholderText={t("choose_time")}
                                    className="time-input"
                                />
                            </div>
                            {page === 3 && 
                                <div className="time" style={{position: "relative", width: "100%"}}>
                                    <img className="clock-icon" src={iconClock}/>
                                    <DatePicker
                                        selected={end}
                                        onChange={(date) => setEnd(date)}
                                        showTimeSelect
                                        showTimeSelectOnly
                                        timeIntervals={5}
                                        dateFormat="HH:mm"
                                        timeFormat="HH:mm"
                                        placeholderText={t("choose_end_time")}
                                        className="time-input"
                                        minTime={time != null ? time : minTime}
                                        maxTime={maxTime}
                                    />
                                </div>
                            }
                        </div>
                        {page === 1 &&
                            <>
                                <textarea
                                    name="description"
                                    className="event-desc scroll-data"
                                    value={desc}
                                    onChange={(e) => setDesc(e.target.value)}
                                    placeholder={t("ch_description")}
                                    rows={5}
                                />
                            </>
                        }
                        {page === 2 && 
                            <>
                                <Select
                                    options={optionsTasks}
                                    placeholder={t("my_tasks")}
                                    components={{ DropdownIndicator }}
                                    onChange={(option) => {
                                        setSelectedTask(option)
                                    }}
                                    value={selectedTask}
                                    styles={{
                                        control: (base, { menuIsOpen }) => ({
                                            ...base,
                                            height: "46px",
                                            border: "none",
                                            boxShadow: "none",
                                            borderRadius: menuIsOpen ? "23px 23px 0 0" : "23px",
                                            background: menuIsOpen ? "white" : "rgba(255, 255, 255, 0.5)",
                                            paddingLeft: "20px",
                                            marginTop: "20px",
                                            fontSize: "20px",
                                            fontFamily: "var(--font-family)",
                                            color: "#0661CC",
                                            cursor: "pointer",
                                        }),
                                        menu: (base) => ({
                                            ...base,
                                            borderRadius: "0 0 23px 23px",
                                            backgroundColor: "white",
                                            overflow: "hidden",
                                            marginTop: "0",
                                            boxShadow: "none",
                                        }),
                                        option: (base, { isFocused }) => ({
                                            ...base,
                                            backgroundColor: isFocused ? "#a6d1ff" : "rgba(0, 0, 0, 0)",
                                            color: "#0661CC",
                                            borderRadius: "23px"
                                        }),
                                        placeholder: (base) => ({
                                            ...base,
                                            color: "#0661CC",
                                            fontFamily: "var(--font-family)",
                                            fontWeight: "400",
                                        }),
                                        singleValue: (base, {menuIsOpen}) => ({
                                            ...base,
                                            color: "#0661CC",
                                            fontFamily: "var(--font-family)",
                                            fontWeight: "400",
                                            borderRadius: menuIsOpen ? "23px 23px 0 0" : "23px",
                                        }),
                                    }}
                                />
                                <textarea
                                    name="description"
                                    className="event-desc scroll-data"
                                    value={desc}
                                    onChange={(e) => setDesc(e.target.value)}
                                    placeholder={t("ch_description")}
                                    rows={5}
                                />
                            </>
                        }
                        {page === 3 && 
                            <>
                                {/* <div className="event-options" style={{marginTop: "20px"}}>
                                    <div 
                                    className={`event-option ${meetType === 0 && 'active-event-option'}`}
                                    style={{height: "46px", borderRadius: "23px"}}
                                    onClick={() => setMeetType(0)}>
                                        Онлайн
                                    </div>
                                    <div 
                                    className={`event-option ${meetType === 1 && 'active-event-option'}`}
                                    style={{height: "46px", borderRadius: "23px"}}
                                    onClick={() => setMeetType(1)}>
                                        Офлайн
                                    </div>
                                    <div 
                                    className={`event-option ${meetType === 2 && 'active-event-option'}`}
                                    style={{height: "46px", borderRadius: "23px"}}
                                    onClick={() => setMeetType(2)}>
                                        Місцезнаходження
                                    </div>
                                </div> */}
                                <div className="multi-users" onClick={() => setAddNewPart(true)} style={{borderRadius: users.length !== 0 ? "30px 30px 0 0" : "30px", paddingLeft: parts.length === 0 ? "30px" : "10px"}}>
                                    {parts.map(p => 
                                        <div className="multi-users-element">
                                            <span>{p.name}</span>
                                            <img src={crossIcon} onClick={() => delPart(p.id)}/>
                                        </div>
                                    )}
                                    {(parts.length === 0 && curPart.length === 0 && !addNewPart) && <span>{t("invite_friend")}</span>}
                                    {(parts.length !== 0 && curPart.length === 0 && !addNewPart) && <span className="plus-part">+</span>}
                                    {(addNewPart || curPart.length !== 0) && 
                                        <div>
                                            <input value={curPart} onChange={(e) => setCurPart(e.target.value)} onBlur={() => setAddNewPart(false)} className="part-input" ref={inputRef}/>
                                        </div>
                                    }
                                    {curPart.length !== 0 && <img src={searchIcon} className="search-part" onClick={() => handleSearchUsers()} />}
                                </div>
                                {users.length !== 0 && 
                                    <div className="user-options scroll-data">
                                        {users.map((e, idx) => 
                                            <div className="user-option" key={idx} onClick={() => handleAddPart(e.Id, e.FullName)}>
                                                <div>{e.FullName}</div>
                                                <div>{e.Email}</div>
                                            </div>
                                        )}
                                    </div>
                                }
                                <input placeholder={t("link")} className="event-desc" style={{paddingTop: "0px"}} value={link} onChange={(e) => setLink(e.target.value)} />
                            </>
                        }
                        <Select
                            options={optionsNotifications}
                            placeholder={t("notification")}
                            components={{ DropdownIndicator }}
                            onChange={(option) => {
                                setSelectedNotification(option);
                            }}
                            value={selectedNotification}
                            styles={{
                                control: (base, { menuIsOpen }) => ({
                                    ...base,
                                    height: "46px",
                                    border: "none",
                                    boxShadow: "none",
                                    borderRadius: menuIsOpen ? "23px 23px 0 0" : "23px",
                                    background: menuIsOpen ? "white" : "rgba(255, 255, 255, 0.5)",
                                    paddingLeft: "20px",
                                    marginTop: "20px",
                                    fontSize: "20px",
                                    fontFamily: "var(--font-family)",
                                    color: "#0661CC",
                                    cursor: "pointer",
                                }),
                                menu: (base) => ({
                                    ...base,
                                    borderRadius: "0 0 23px 23px",
                                    backgroundColor: "white",
                                    overflow: "hidden",
                                    marginTop: "0",
                                    boxShadow: "none",
                                }),
                                option: (base, { isFocused }) => ({
                                    ...base,
                                    backgroundColor: isFocused ? "#a6d1ff" : "rgba(0, 0, 0, 0)",
                                    color: "#0661CC",
                                    borderRadius: "23px"
                                }),
                                placeholder: (base) => ({
                                    ...base,
                                    color: "#0661CC",
                                    fontFamily: "var(--font-family)",
                                    fontWeight: "400",
                                }),
                                singleValue: (base, {menuIsOpen}) => ({
                                    ...base,
                                    color: "#0661CC",
                                    fontFamily: "var(--font-family)",
                                    fontWeight: "400",
                                    borderRadius: menuIsOpen ? "23px 23px 0 0" : "23px",
                                }),
                            }}
                        />
                        <div className="save-event-container">
                            <button disabled={title.length === 0 || date === null || time === null || (page === 3 && end === null)} className="save-event" onClick={async () => await handleAddEvent()}>{t("p_btn_save")}</button>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default CalendarPage;