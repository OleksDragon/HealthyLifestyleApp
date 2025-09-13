import fireIcon from '../../icons/Fire.png';
import pointIcon from '../../icons/Point.png';
import { useTranslation } from 'react-i18next';
import '../../styles/widget.css';
import { use, useEffect, useState } from 'react';
import DiagramColumns from '../DiagramColumns';
import axios from 'axios';

function KkalWidget({className}) {
    const { t } = useTranslation();
    let today = new Date().getDay();
    const todayIdx = today != 0 ? today - 1 : 6;
    const [weekProgress, setWeekProgress] = useState([1200, 2000, 2000, 2000, 940, 200, 200]);
    const [kkalGoal, setKkalGoal] = useState(2000);

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
        const fetchEating = async () => {
            let dates = getWeekDates();
            let userId = localStorage.getItem("user-id");
            let weekResult = new Array(7).fill(0);
            for (let [idx, date] of dates.entries()) {
                try {
                    const response = await axios.get(
                        process.env.REACT_APP_API_URL + `/api/meals/user/${userId}/date/${date.toISOString().split("T")[0]}`,
                        {
                            headers: {
                                Authorization: `Bearer ${localStorage.getItem(
                                    "helth-token"
                                )}`,
                            },
                        }
                    );
                    
                    weekResult[idx] = response.data.reduce((kkal, prod) => kkal + prod.Calories, 0);
                } catch (err) {
                    console.error(err);
                }
            }
            setWeekProgress(weekResult);
        }

        fetchEating();
    }, [])

    return (
        <div className={`${className} glass-card`}>
            <div className='widget-header'>
                <div className='widget-title'>
                    <img style={{width: "16px"}} src={fireIcon} alt='kkal'/>
                    <h3>{t("kkal")}</h3>
                </div>
                <div className="points">
                    <img src={pointIcon} alt='point'/>
                    <img src={pointIcon} alt='point'/>
                    <img src={pointIcon} alt='point'/>
                </div>
            </div>
            <div className='widget-info'>
                <h3><span>{weekProgress[todayIdx]}</span> / {kkalGoal / 1000}K</h3>
                <div></div>
                <h4>{t("current_week")}</h4>
            </div>
            <DiagramColumns values={weekProgress} goal={kkalGoal}/>
        </div>
    )
}

export default KkalWidget;