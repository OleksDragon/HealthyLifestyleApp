import sleepIcon from '../../icons/Sleep.png';
import pointIcon from '../../icons/Point.png';
import { useTranslation } from 'react-i18next';
import '../../styles/widget.css';
import { useEffect, useState } from 'react';
import DiagramLinear from '../DiagramLinear';
import axios from 'axios';

function SleepWidget({className}) {
    const { t } = useTranslation();
    let today = new Date().getDay();
    const todayIdx = today != 0 ? today - 1 : 6;
    const [weekProgress, setWeekProgress] = useState([0, 0, 0, 0, 0, 0, 0]);
    const [sleepGoal, setSleepGoal] = useState(480);

    const getWeekDates = () => {
        const today = new Date();
        const dayOfWeek = today.getDay();
        
        const diffToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;

        const monday = new Date(today);
        monday.setDate(today.getDate() + diffToMonday);

        const weekDates = [];
        for (let i = 0; i < 7; i++) {
            const date = new Date(monday);
            date.setDate(monday.getDate() + i);
            weekDates.push(date);
        }

        return weekDates;
    };

    useEffect(() => {
        const fetchSleeping = async () => {
            let dates = getWeekDates();
            let userId = localStorage.getItem("user-id");
            let weekResult = new Array(7).fill(0);
            for (let [idx, date] of dates.entries()) {
                try {
                    const response = await axios.get(
                        process.env.REACT_APP_API_URL + `/api/sleep-record/userid/${userId}/date/${date.toISOString().split("T")[0]}`,
                        {
                            headers: {
                                Authorization: `Bearer ${localStorage.getItem(
                                    "helth-token"
                                )}`,
                            },
                        }
                    );
                    
                    weekResult[idx] = response.data.reduce((minutes, record) => minutes + record.TotalSleepMinutes, 0);
                } catch (err) {
                    console.error(err);
                }
            }
            setWeekProgress(weekResult);
        }

        fetchSleeping();
    }, [])

    return (
        <div className={`${className} glass-card`}>
            <div className='widget-header'>
                <div className='widget-title'>
                    <img src={sleepIcon} style={{height: "18px"}} alt='sleep'/>
                    <h3>{t("sleep")}</h3>
                </div>
                <div className="points">
                    <img src={pointIcon} alt='point'/>
                    <img src={pointIcon} alt='point'/>
                    <img src={pointIcon} alt='point'/>
                </div>
            </div>
            <div className='widget-info'>
                <h3><span>{ Math.round(weekProgress[todayIdx] / 60 * 10) / 10}</span> / {sleepGoal / 60}{t("H")}</h3>
                <div></div>
                <h4>{t("current_week")}</h4>
            </div>
            <DiagramLinear values={weekProgress.map(e => e / 60)} goal={sleepGoal / 60} start={0} step={2}/>
        </div>
    )
}

export default SleepWidget;