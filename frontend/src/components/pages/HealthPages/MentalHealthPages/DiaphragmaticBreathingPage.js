import React, { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import animationData from "../../../../assets/animation/mascot_breathing.json";
import InfoBlockWithAnimation from "../../../elements/Health/MentalHealth/InfoBlockWithAnimation/InfoBlockWithAnimation";
import '../../../styles/diaphragmaticBreathing.css';

const DiaphragmaticBreathingPage = () => {
    const [timeLeft, setTimeLeft] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const [isCompleted, setIsCompleted] = useState(false);
    const [circleText, setCircleText] = useState("");
    const [circleSize, setCircleSize] = useState("normal");
    const [existingRecord, setExistingRecord] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    
    const timerRef = useRef(null);
    const navigate = useNavigate();
    
    const infoBlockContent = {
        title: "Діафрагмальне дихання",
        subtitle: "Дихання, що повертає спокій",
        descriptions: [
            "Сядь зручно. Розслаб плечі. Виконуй хочаб 3 - 5 хвилин.",
            "Повертайся до дихання, як відчуєш напругу."
        ],
        animationData: animationData,
        containerHeight: "185px",
        animationWidth: "300px",
        animationHeight: "300px"
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const handleBackClick = () => {
        navigate('/health/mental/breathing');
    };

    // Функція для отримання існуючого запису при завантаженні сторінки
    const fetchExistingRecord = useCallback(async () => {
        try {
            const token = localStorage.getItem('helth-token');
            const userId = localStorage.getItem('user-id');
            
            if (!token || !userId) {
                console.error('Токен або ID користувача відсутні');
                navigate('/login');
                return;
            }

            const today = new Date();
            const recordDate = new Date();
            
            const formatLocalISO = (date) => {
                const offset = date.getTimezoneOffset();
                const offsetAbs = Math.abs(offset);
                const hours = Math.floor(offsetAbs / 60);
                const minutes = offsetAbs % 60;
                const sign = offset > 0 ? '-' : '+';
                
                return new Date(date.getTime() - (offset * 60000))
                    .toISOString()
                    .replace('Z', `${sign}${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`);
            };

            const response = await fetch(
                `${process.env.REACT_APP_API_URL}/api/mental-health-record?date=${formatLocalISO(recordDate)}`,
                {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            if (response.status === 401) {
                // Неавторизований - перенаправляємо на логін
                localStorage.removeItem('helth-token');
                localStorage.removeItem('user-id');
                navigate('/login');
                return;
            }

            if (response.ok) {
                const records = await response.json();
                const foundRecord = records.find(record => {
                    const recordDate = new Date(record.RecordDate);
                    return (
                        recordDate.getDate() === today.getDate() &&
                        recordDate.getMonth() === today.getMonth() &&
                        recordDate.getFullYear() === today.getFullYear()
                    );
                });
                setExistingRecord(foundRecord || null);
            }
        } catch (error) {
            console.error('Помилка при отриманні записів:', error);
            // У разі помилки мережі не перенаправляємо, а просто показуємо сторінку
        } finally {
            setIsLoading(false);
        }
    }, [navigate]);

    useEffect(() => {
        fetchExistingRecord();
    }, [fetchExistingRecord]);

    const handleTimerClick = () => {
        if (!isActive) {
            if (isCompleted) {
                continueTimer();
            } else {
                startTimer();
            }
        }
    };

    const startTimer = () => {
        setIsActive(true);
        setIsCompleted(false);
        setTimeLeft(60);
    };

    const continueTimer = () => {
        setIsActive(true);
        setIsCompleted(false);
        setTimeLeft(60);
    };

    const sendDataToServer = useCallback(async () => {
        try {
            const token = localStorage.getItem('helth-token');
            const userId = localStorage.getItem('user-id');
            
            if (!token || !userId) {
                console.error('Токен або ID користувача відсутні');
                navigate('/login');
                return;
            }

            // Використовуємо оригінальну дату з існуючого запису, якщо він є
            const recordDate = existingRecord 
                ? new Date(existingRecord.RecordDate) 
                : new Date();
            
            const formatLocalISO = (date) => {
                const offset = date.getTimezoneOffset();
                const offsetAbs = Math.abs(offset);
                const hours = Math.floor(offsetAbs / 60);
                const minutes = offsetAbs % 60;
                const sign = offset > 0 ? '-' : '+';
                
                return new Date(date.getTime() - (offset * 60000))
                    .toISOString()
                    .replace('Z', `${sign}${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`);
            };

            const requestBody = {
                UserId: userId,
                RecordDate: formatLocalISO(recordDate),
                MeditationDurationMinutes: existingRecord?.MeditationDurationMinutes || 0,
                BreathingPracticeDurationMinutes: (existingRecord?.BreathingPracticeDurationMinutes || 0) + 1,
                StressLevelScore: existingRecord?.StressLevelScore || 0,
                AnxietyLevelScore: existingRecord?.AnxietyLevelScore || 0,
                Feeling: existingRecord?.Feeling || "",
                Cause: existingRecord?.Cause || "",
                Factors: existingRecord?.Factors || [],
                Notes: existingRecord?.Notes || ""
            };

            let response;
            if (existingRecord) {
                response = await fetch(
                    `${process.env.REACT_APP_API_URL}/api/mental-health-record/${existingRecord.Id}`,
                    {
                        method: 'PUT',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(requestBody)
                    }
                );
            } else {
                response = await fetch(
                    `${process.env.REACT_APP_API_URL}/api/mental-health-record`,
                    {
                        method: 'POST',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(requestBody)
                    }
                );
            }

            if (response.status === 401) {
                // Неавторизований - перенаправляємо на логін
                localStorage.removeItem('helth-token');
                localStorage.removeItem('user-id');
                navigate('/login');
                return;
            }

            if (!response.ok) {
                throw new Error('Помилка при збереженні запису');
            }

            console.log('Дані успішно збережено');
            
            // Оновлюємо існуючий запис після успішного збереження
            const updatedRecord = await response.json();
            setExistingRecord(updatedRecord);
            
        } catch (error) {
            console.error('Помилка при відправці даних:', error);
        }
    }, [existingRecord, navigate]);

    useEffect(() => {
        if (isActive && timeLeft > 0) {
            timerRef.current = setTimeout(() => {
                setTimeLeft(timeLeft - 1);

                const remainingSeconds = timeLeft - 1;
                const cycleTime = remainingSeconds % 20;

                if (cycleTime >= 15) { 
                    setCircleText("ВДИХ");
                    setCircleSize("inhale");
                } else if (cycleTime >= 10) { 
                    setCircleText("ТРИМАЙ");
                    setCircleSize("hold-inhale");
                } else if (cycleTime >= 5) { 
                    setCircleText("ВИДИХ");
                    setCircleSize("exhale");
                } else { 
                    setCircleText("ТРИМАЙ");
                    setCircleSize("hold-exhale");
                }

            }, 1000);
        } else if (isActive && timeLeft === 0) {
            // Таймер завершився нормально
            setIsActive(false);
            setIsCompleted(true);
            setCircleText("ДАВАЙ ЩЕ");
            setCircleSize("normal");
            
            // Відправляємо дані на сервер
            sendDataToServer();
        }

        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
        };
    }, [isActive, timeLeft, sendDataToServer]);

    if (isLoading) {
        return null;
    }

    return (
        
        <div className="db-diaphragmatic-breathing-container">
            <div className="db-back-button" onClick={handleBackClick}>
                <svg width="13" height="25" viewBox="0 0 13 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11 23.0703L3 12.5703L11 2.07031" stroke="white" strokeWidth="4" />
                </svg>
                <span>Повернутись назад</span>
            </div>
            <div className="db-diaphragmatic-breathing-content">
                <div className="db-diaphragmatic-breathing-info-block">
                    <InfoBlockWithAnimation {...infoBlockContent} />
                </div>

                <div className="db-breathing-exercise-container">
                    <div 
                        className={`db-timer ${isActive ? 'active' : 'clickable'}`}
                        onClick={handleTimerClick}
                    >
                        {isActive ? formatTime(timeLeft) : (isCompleted ? "Продовжити" : "Почати")}
                    </div>

                    <div className="db-circle-container">
                        <div className={`db-breathing-circle ${circleSize}`}>
                            <div className={`db-pulse-effect ${isActive && (circleSize === 'hold-inhale' || circleSize === 'hold-exhale') ? 'active alternative' : ''}`}></div>
                        </div>
                        <div className="db-circle-text">{circleText}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DiaphragmaticBreathingPage;