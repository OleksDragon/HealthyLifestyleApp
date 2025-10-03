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

function CalendarPage() {
    const { t, i18n } = useTranslation();
    const inputRef = useRef(null);

    const [weekNums, setWeekNums] = useState([]);
    const [weekEvents, setWeekEvents] = useState([]);
    const [selected, setSelected] = useState(new Date());
    const [selectedSC, setSelectedSC] = useState(new Date());
    const [page, setPage] = useState(0);
    const [selectedWeekIdx, setSelectedWeekIdx] = useState(null);
    const [monthWeeks, setMonthWeeks] = useState([]);
    const [meetType, setMeetType] = useState(0);
    const [users, setUsers] = useState([]);
    const [addNewPart, setAddNewPart] = useState(false);
    const [curPart, setCurPart] = useState("");
    const [activeEvent, setActiveEvent] = useState("");
    
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
        { value: '5', label: 'За 5 хвилин' },
        { value: '10', label: 'За 10 хвилин' },
    ]

    const optionsTasks = [
        { value: 'Workout', label: 'Тренування' },
        { value: 'Eating', label: 'Харчування' },
        { value: 'Doctor', label: 'Запис до лікаря' },
    ]

    const msPerDay = 1000 * 60 * 60 * 24;
    const today = new Date();

    const months = [
        t("p_january"), t("p_february"), t("p_march"), t("p_april"), t("p_may"), t("p_june"),
        t("p_july"), t("p_august"), t("p_september"), t("p_october"), t("p_november"), t("p_december")
    ];

    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: currentYear - 1900 + 1 }, (_, i) => currentYear - i);
    const monthsOptions = months.map((m, idx) => ({ value: idx, label: m }));

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
            start: start.toLocaleDateString('en-CA'),
            end: end.toLocaleDateString('en-CA')
        };
    };

    const MINUTES_PER_CELL = 5;

    const getCellIndex = (time) => {
        const date = new Date(time);
        return Math.floor(((date.getHours() + 1) * 60 + date.getMinutes()) / MINUTES_PER_CELL) + 1;
    }

    const generateWeek = () => {
        return weekNums.map((d, idx) => {
            const dayEvents = weekEvents.filter(e => Number(e.StartTime.split('T')[0].split('-')[2]) === d);
            return (
                <div key={idx} className="day-container">
                    {dayEventsGenerator(dayEvents, d)}
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

    const handleEventUpdate = (event) => {
        let eventType = 0;
        if (event.MettingParticipants.length !== 0) {
            eventType = 3
        }
        else if (event.TaskToDo !== null) {
            eventType = 2
        }
        else {
            eventType = 1
        }

        const defaultOption = optionsNotifications.find(
            (o) => o.value === event.NotificationBefore.toString()
        );

        const defaultTask = optionsTasks.find(
            (o) => o.value === event.TaskToDo
        );

        setId(event.Id);
        setPage(eventType)
        setTitle(event.Title)
        setDesc(event.Description)
        setDate(new Date(event.StartTime))
        setTime(new Date(event.StartTime))
        setEnd(event.EndTime)
        setLink(event.MeetingLink)
        setSelectedNotification(defaultOption)
        setSelectedTask(defaultTask)
        setParts(event.MettingParticipants.map(p => ({id: p.Id, name: p.FullName})))
    }

    const clearDiffData = () => {
        setDesc("");
        setParts([]);
        setAddNewPart(false)
        setCurPart("")
        setUsers([])
    }

    const dayEventsGenerator = (events, d) => {
        const cells = [];
        let timeLineRow = Math.floor(((today.getHours() + 1) * 60 + today.getMinutes()) / MINUTES_PER_CELL) + 1;

        for (let i = 0; i < 24; i++) {
            let col = i * (60 / MINUTES_PER_CELL) + 12
            if (col !== timeLineRow || today.getDate() !== d)
                cells.push(<div key={`line-${i}`} className="hour-line" style={{ gridRow: `${col}`, zIndex: "1", gridColumn: "1/2" }}></div>);
        }

        events.forEach((e, idx) => {
            const startIdx = getCellIndex(e.StartTime);
            const eventLen = Math.max(getCellIndex(e.EndTime) - startIdx, 5);

            cells.push(<div
                onClick={() => setActiveEvent(e.Id)}
                key={`event-${idx}`}
                className={`event-item ${e.Id === activeEvent ? 'expanded' : ''}`}
                style={{ gridRow: `${startIdx}/${startIdx + eventLen}`, zIndex: "2", gridColumn: "1/2" }}
            >
                {e.Id === activeEvent && 
                    <div className="actions-event">
                        <img src={editIcon} onClick={() => handleEventUpdate(e)}/>
                        <img />
                    </div>
                }

                <span className="ppp">{e.Title}</span>
                {e.Id === activeEvent && 
                    <div>
                        {new Date(e.StartTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} 
                        {e.EndTime != null && <>- 
                        {new Date(e.EndTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</>} 
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
        const dateStr = datePart.toLocaleDateString("en-CA");
        const timeStr = timePart.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", second: "2-digit" }); 
        return `${dateStr}T${timeStr}`;
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
                        EndTime: end,
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
                        EndTime: end,
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
            console.log(error)
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
                        <div>Створити</div>
                        <img src={iconAddEvent}/>
                    </div>
                    {page === 0 && 
                        <div className="today-events">
                            
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
                        <input value={title} className="event-title" placeholder="Додай назву" onChange={(e) => setTitle(e.target.value)}/>
                        <div className="event-options">
                            <div 
                            className={`event-option ${page === 1 && 'active-event-option'}`}
                            onClick={() => {setPage(1); clearDiffData()}}>
                                Нагадування
                            </div>
                            <div 
                            className={`event-option ${page === 2 && 'active-event-option'}`}
                            onClick={() => {setPage(2); clearDiffData()}}>
                                Завдання
                            </div>
                            <div 
                            className={`event-option ${page === 3 && 'active-event-option'}`}
                            onClick={() => {setPage(3); clearDiffData()}}>
                                Зустріч
                            </div>
                        </div>
                        <div className="date-time">
                            <div className="date" style={{position: "relative", width: "100%"}}>
                                <img className="clock-icon" src={iconCalendar}/>
                                <DatePicker
                                    selected={date}
                                    onChange={(date) => setDate(date)}
                                    timeIntervals={5}
                                    dateFormat="dd.MM.yyyy"
                                    placeholderText="Оберіть дату"
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
                                    placeholderText="Оберіть час"
                                    className="time-input"
                                />
                            </div>
                        </div>
                        {page === 1 &&
                            <>
                                <textarea
                                    name="description"
                                    className="event-desc scroll-data"
                                    value={desc}
                                    onChange={(e) => setDesc(e.target.value)}
                                    placeholder="Опис"
                                    rows={5}
                                />
                            </>
                        }
                        {page === 2 && 
                            <>
                                <Select
                                    options={optionsTasks}
                                    placeholder="Мої завдання"
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
                                    placeholder="Опис"
                                    rows={5}
                                />
                            </>
                        }
                        {page === 3 && 
                            <>
                                <div className="event-options" style={{marginTop: "20px"}}>
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
                                </div>
                                <div className="multi-users" onClick={() => setAddNewPart(true)} style={{borderRadius: users.length !== 0 ? "30px 30px 0 0" : "30px", paddingLeft: parts.length === 0 ? "30px" : "10px"}}>
                                    {parts.map(p => 
                                        <div className="multi-users-element">
                                            {p.name}
                                        </div>
                                    )}
                                    {(parts.length === 0 && curPart.length === 0 && !addNewPart) && <span>Запросити друга</span>}
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
                            </>
                        }
                        <Select
                            options={optionsNotifications}
                            placeholder="Нагадування"
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
                            <button disabled={title.length === 0 || date === null || time === null} className="save-event" onClick={async () => await handleAddEvent()}>Зберегти</button>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default CalendarPage;