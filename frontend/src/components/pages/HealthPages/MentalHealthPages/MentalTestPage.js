import React, { useState, useEffect, useCallback } from "react";
import Lottie from 'lottie-react';
import animationData1 from "../../../../assets/animation/mascot_breathing.json";
import animationData2 from "../../../../assets/animation/mascot_breathing.json";
import animationData3 from "../../../../assets/animation/mascot_breathing.json";
import animationData4 from "../../../../assets/animation/mascot_breathing.json";
import animationData5 from "../../../../assets/animation/mascot_breathing.json";
import animationData6 from "../../../../assets/animation/mascot_breathing.json";
import { useNavigate } from "react-router-dom";
import '../../../styles/mentalTest.css';

const MentalTestPage = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [answers, setAnswers] = useState({});
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [existingRecord, setExistingRecord] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    
    const navigate = useNavigate();
    
    const testData = [
        {
            id: 1,
            question: "Як ти прокидаєшся вранці?",
            answers: [
                "З ентузіазмом і планами",
                "Зі склянкою води та тяжким зітханням",
                "“Що знову цей день?”"
            ]
        },
        {
            id: 2,
            question: "Коли щось іде не так, твоя реакція:",
            answers: [
                "Ок, придумаю, як виправити",
                "Ну, таке життя",
                "Все пропало, я йду в плед"
            ]
        },
        {
            id: 3,
            question: "Що тебе рятує від стресу найчастіше?",
            answers: [
                "Спорт чи прогулянка",
                "Їжа, серіальчик чи мемчики",
                "Я просто зависаю без сил"
            ]
        },
        {
            id: 4,
            question: "Твоє відчуття енергії останнім часом:",
            answers: [
                "Нормально, заряд тримається",
                "Як батарейка на 30%",
                "Як телефон, що вимикається на холоді"
            ]
        },
        {
            id: 5,
            question: "Що ти думаєш, коли чуєш слово \"відпочинок\"?",
            answers: [
                "Планую, щось приємне",
                "Лежати вдома й нічого не робити",
                "У мене немає часу на відпочинок"
            ]
        }
    ];

    // Об'єкт з усіма анімаціями
    const animationData = {
        1: animationData1,
        2: animationData2,
        3: animationData3,
        4: animationData4,
        5: animationData5,
        6: animationData6
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
        } finally {
            setIsLoading(false);
        }
    }, [navigate]);

    useEffect(() => {
        fetchExistingRecord();
    }, [fetchExistingRecord]);

    // Функція для відправки результатів тесту на сервер
    const sendTestResultsToServer = useCallback(async (stressLevel) => {
        try {
            const token = localStorage.getItem('helth-token');
            const userId = localStorage.getItem('user-id');
            
            if (!token || !userId) {
                console.error('Токен або ID користувача відсутні');
                navigate('/login');
                return;
            }

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
                BreathingPracticeDurationMinutes: existingRecord?.BreathingPracticeDurationMinutes || 0,
                StressLevelScore: stressLevel,
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
                localStorage.removeItem('helth-token');
                localStorage.removeItem('user-id');
                navigate('/login');
                return;
            }

            if (!response.ok) {
                throw new Error('Помилка при збереженні результатів тесту');
            }

            console.log('Результати тесту успішно збережено');
            
            const updatedRecord = await response.json();
            setExistingRecord(updatedRecord);
            
        } catch (error) {
            console.error('Помилка при відправці результатів тесту:', error);
        }
    }, [existingRecord, navigate]);

    const handleStartTest = () => {
        setCurrentStep(1);
        setSelectedAnswer(null);
    };

    const handleAnswerSelect = (answerIndex) => {
        setSelectedAnswer(answerIndex + 1);
    };

    const handleNext = () => {
        if (selectedAnswer !== null) {
            if (currentStep < 5) {
                setAnswers(prev => ({
                    ...prev,
                    [currentStep]: selectedAnswer
                }));
                
                setCurrentStep(currentStep + 1);
                setSelectedAnswer(answers[currentStep + 1] || null);
            } else {
                const updatedAnswers = {
                    ...answers,
                    [currentStep]: selectedAnswer
                };
                setAnswers(updatedAnswers);

                const stressLevel = calculateStressLevel(updatedAnswers);
                sendTestResultsToServer(stressLevel);
                setCurrentStep(6);
            }
        }
    };

    const handleBack = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
            setSelectedAnswer(answers[currentStep - 1] || null);
        }
    };

    const handleRestart = () => {
        setCurrentStep(0);
        setAnswers({});
        setSelectedAnswer(null);
    };

    // 🔹 Функція розрахунку рівня стресу
    const calculateStressLevel = (answersObj) => {
        const answerCounts = {1: 0, 2: 0, 3: 0};
        
        Object.values(answersObj || {}).forEach(answer => {
            answerCounts[answer]++;
        });

        const totalScore = answerCounts[1] * 2 + answerCounts[2] * 5 + answerCounts[3] * 10;
        const stressLevel = Math.round(totalScore / 5);

        return Math.min(Math.max(stressLevel, 1), 10);
    };

    const calculateResult = () => {
        const answerCounts = {1: 0, 2: 0, 3: 0};
        
        Object.values(answers).forEach(answer => {
            answerCounts[answer]++;
        });

        const stressLevel = calculateStressLevel(answers);

        if (answerCounts[1] >= 4) {
            return {
                title: "Твоя менталочка в нормі.",
                description: "Ти маєш чудовий рівень енергії та оптимізму. Продовжуй дбати про себе та підтримувати цей стан!",
                stressLevel: stressLevel,
                animationType: 1
            };
        } else if (answerCounts[1] === 3 && answerCounts[2] === 2) {
            return {
                title: "Менталочка переважно в нормі.",
                description: "Більшість справ йдуть добре, але деякі сфери потребують трохи більше уваги та турботи.",
                stressLevel: stressLevel,
                animationType: 2
            };
        } else if ((answerCounts[2] >= 3 && answerCounts[3] <= 1) || (answerCounts[1] === 2 && answerCounts[2] === 2 && answerCounts[3] === 1)) {
            return {
                title: "Менталочка трохи виснажена",
                description: "Ти відчуваєш легку втому. Знайди час для відпочинку та маленьких радощів.",
                stressLevel: stressLevel,
                animationType: 3
            };
        } else if (answerCounts[2] >= 2 && answerCounts[3] >= 2) {
            return {
                title: "Менталочка просить турботи",
                description: "Тобі треба більше відпочинку, радощів і підтримки. Зверни увагу на свої потреби.",
                stressLevel: stressLevel,
                animationType: 4
            };
        } else if (answerCounts[3] >= 3) {
            return {
                title: "Менталочка кричить SOS",
                description: "Ти можеш відчувати вигорання. Не соромся звертатися за допомогою та знайди час для серйозного відпочинку.",
                stressLevel: stressLevel,
                animationType: 5
            };
        } else {
            return {
                title: "Твоя менталочка — як американські гірки.",
                description: "Твій стан часто міняється. Деякі дні чудові, інші - складніші. Намагайся знайти баланс.",
                stressLevel: stressLevel,
                animationType: 6
            };
        }
    };

    const renderContent = () => {
        if (currentStep === 0) {
            return (
                <div className="mtp-initial-content">
                    <div className="mtp-start-message">
                        Увага! Тест не має діагностичної сили, але показує твій рівень стресу чи вигорання.
                    </div>
                    <button 
                        className="mtp-start-button"
                        onClick={handleStartTest}
                    >
                        Почати
                    </button>
                </div>
            );
        } else if (currentStep >= 1 && currentStep <= 5) {
            const currentQuestion = testData[currentStep - 1];
            const isLastQuestion = currentStep === 5;
            
            return (
                <div className="mtp-question-content">
                    <div className="mtp-question-header">
                        <div className="mtp-question-number-circle">
                            {currentStep}
                        </div>
                        <div className="mtp-question-text">
                            {currentQuestion.question}
                        </div>
                    </div>
                    <div className="mtp-answers-container">
                        {currentQuestion.answers.map((answer, index) => (
                            <button
                                key={index}
                                className={`mtp-answer-button ${selectedAnswer === index + 1 ? 'selected' : ''}`}
                                onClick={() => handleAnswerSelect(index)}
                            >
                                {answer}
                            </button>
                        ))}
                    </div>
                    <div className="mtp-navigation-buttons">
                        <button 
                            className={`mtp-back-button ${currentStep === 1 ? 'hidden' : ''}`} 
                            onClick={handleBack}
                        >
                            Назад
                        </button>
                        <button 
                            className={`mtp-next-button ${selectedAnswer === null ? 'disabled' : ''}`}
                            onClick={handleNext}
                            disabled={selectedAnswer === null}
                        >
                            {isLastQuestion ? 'Результат' : 'Далі'}
                        </button>
                    </div>
                </div>
            );
        } else if (currentStep === 6) {
            const result = calculateResult();
            return (
                <div className="mtp-result-content">
                    <div className="mtp-result-animation">
                        <Lottie 
                            animationData={animationData[result.animationType]}
                            loop={true}
                            autoplay={true}
                            style={{
                                width: 250,
                                height: 250
                            }}
                        />
                    </div>
                    <div className="mtp-result-title">
                        {result.title}
                    </div>
                    <div className="mtp-result-description">
                        {result.description}
                    </div>
                    <button 
                        className="mtp-restart-button"
                        onClick={handleRestart}
                    >
                        Спробувати ще раз
                    </button>
                </div>
            );
        }
    };

    if (isLoading) {
        return null;
    }

    return(
        <div className="mtp-mental-test-container">
            <div className="mtp-mental-test-info-block">
                <h1 className="mtp-mental-test-title">
                    Тест на стан твоєї менталочки
                </h1>
                <p className="mtp-mental-test-description">
                    Тицяй відповіді, які відповідають твоєму стану)
                </p>
            </div>

            <div className="mtp-mental-test-content-block">
                {renderContent()}
            </div>
        </div>
    );
}

export default MentalTestPage;
