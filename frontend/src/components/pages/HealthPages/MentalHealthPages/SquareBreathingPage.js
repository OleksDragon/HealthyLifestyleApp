import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import animationData from "../../../../assets/animation/mascot_breathing.json";
import square_breathing from "../../../../assets/animation/square_breathing.json";
import InfoBlockWithAnimation from "../../../elements/Health/MentalHealth/InfoBlockWithAnimation/InfoBlockWithAnimation";
import square from "../../../../assets/health-icons/start_square_breathing_icon.svg";
import Lottie from "lottie-react";
import '../../../styles/squareBreathing.css';

const SquareBreathingPage = () => {
    const [isActive, setIsActive] = useState(false);
    const [isCompleted, setIsCompleted] = useState(false);
    const [squareNumber, setSquareNumber] = useState(1);
    const [showAnimation, setShowAnimation] = useState(false);
    const [existingRecord, setExistingRecord] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    
    const navigate = useNavigate();
    
    const infoBlockContent = {
        title: "Дихання Квадрат",
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
        setSquareNumber(1);
        setShowAnimation(true);
    };

    const continueTimer = () => {
        setIsActive(true);
        setIsCompleted(false);
        setSquareNumber(1);
        setShowAnimation(true);
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

    // Нова логіка таймера
    useEffect(() => {
        let frame;
        let startTime;

        if (isActive) {
            startTime = Date.now();

            const tick = () => {
                const diffSec = Math.floor((Date.now() - startTime) / 1000);
                const remaining = Math.max(60 - diffSec, 0);

                const elapsedSeconds = 60 - remaining;
                const positionInCircle = elapsedSeconds % 10;

                let currentNumber;
                if (positionInCircle < 2) {
                    // Верхня сторона: 0-1 секунди [1, 2]
                    currentNumber = positionInCircle + 1;
                } else if (positionInCircle < 5) {
                    // Права сторона: 2-4 секунди [1, 2, 3]
                    currentNumber = positionInCircle - 1;
                } else if (positionInCircle < 7) {
                    // Нижня сторона: 5-6 секунди [1, 2]
                    currentNumber = positionInCircle - 4;
                } else {
                    // Ліва сторона: 7-9 секунди [1, 2, 3]
                    currentNumber = positionInCircle - 6;
                }
                setSquareNumber(currentNumber);

                if (remaining > 0) {
                    frame = requestAnimationFrame(tick);
                } else {
                    // Таймер завершився
                    setIsActive(false);
                    setIsCompleted(true);
                    setShowAnimation(false);
                    sendDataToServer();
                }
            };

            frame = requestAnimationFrame(tick);
        }

        return () => {
            if (frame) cancelAnimationFrame(frame);
        };
    }, [isActive, sendDataToServer]);

    if (isLoading) {
        return null;
    }

    return (
        <div className="sb-square-breathing-container">
            <div className="sb-back-button" onClick={handleBackClick}>
                <svg width="13" height="25" viewBox="0 0 13 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11 23.0703L3 12.5703L11 2.07031" stroke="white" strokeWidth="4" />
                </svg>
                <span>Повернутись назад</span>
            </div>
            <div className="sb-square-breathing-content">
                <div className="sb-square-breathing-info-block">
                    <InfoBlockWithAnimation {...infoBlockContent} />
                </div>

                <div className="sb-breathing-exercise-container">
                    <div 
                        className={`sb-timer ${isActive ? 'active' : 'clickable'}`}
                        onClick={handleTimerClick}
                    >
                        {isActive ? squareNumber : (isCompleted ? "Продовжити" : "Почати")}
                    </div>

                    <div className="sb-square-container">
                        {showAnimation ? (
                            <Lottie 
                                animationData={square_breathing} 
                                style={{ width: 280, height: 280 }}
                                loop={true}
                            />
                        ) : (
                            <img src={square} alt="square" className="square-icon" />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SquareBreathingPage;