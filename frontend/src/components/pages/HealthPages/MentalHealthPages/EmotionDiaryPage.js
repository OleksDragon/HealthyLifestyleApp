import React, { useState, useEffect, useCallback } from "react";
import DateCarousel from "../../../../components/elements/Health/MentalHealth/DateCarousel/DateCarousel";
import AddEmotionWizard from "../../../../components/elements/Health/MentalHealth/AddEmotionWizard/AddEmotionWizard";
import factor_info_icon from "../../../../assets/health-icons/factor_info_icon.svg";
import sports from "../../../../assets/health-icons/sports.svg";
import coffee from "../../../../assets/health-icons/coffee.svg";
import alcohol from "../../../../assets/health-icons/alcohol.svg";
import sex from "../../../../assets/health-icons/sex.svg";
import meditation from "../../../../assets/health-icons/meditation.svg";
import antidepressants from "../../../../assets/health-icons/antidepressants.svg";
import other from "../../../../assets/health-icons/other.svg";
import close_icon from "../../../../assets/health-icons/close_icon.svg"; // Додайте іконку закриття
import "../../../styles/emotionDiary.css";

const EmotionDiaryPage = () => {
  // Словник для перекладу емоцій
  const emotionTranslations = {
    "Balance": "Баланс",
    "Safety": "Безпека", 
    "Neutrality": "Нейтральність",
    "Lethargy": "Млявість",
    "Carefreeness": "Безтурботність",
    "Relaxation": "Розслабленість",
    "Calmness": "Спокій",
    "Stability": "Стійкість",
    "Focus": "Зосередженість",
    "Indifference": "Байдужість",
    "Nervousness": "Нервовість", 
    "Slight irritation": "Легке роздратування",
    "Doubt": "Сумнів",
    "Restlessness": "Неспокій",
    "Distrust": "Недовіра",
    "Tension": "Напруга",
    "Dissatisfaction": "Незадоволення",
    "Melancholy": "Туга",
    "Fatigue": "Втома",
    "Self-pity": "Жалію себе", 
    "Anxiety": "Тривога",
    "Sadness": "Сум",
    "Uncertainty": "Непевність",
    "Confusion": "Розгубленість",
    "Guilt": "Почуття провини",
    "Self-rejection": "Неприйняття себе",
    "Emptiness": "Спустошеність",
    "Isolation": "Ізоляція",
    "Depression": "Депресія", 
    "Envy": "Заздрість",
    "Deep sorrow": "Глибокий смуток",
    "Shame": "Сором",
    "Despair": "Відчай",
    "Loneliness": "Самотність",
    "Hopelessness": "Безнадія",
    "Self-directed aggression": "Агресія до себе",
    "Energy": "Енергія",
    "Satisfaction": "Задоволення", 
    "Connection": "Відчуття зв'язку",
    "Comfort": "Комфорт",
    "Love": "Кохання",
    "Motivation": "Мотивація",
    "Determination": "Цілеспрямованість",
    "Respect": "Повага",
    "Friendship": "Дружність",
    "In the flow": "В потоці",
    "Pride": "Гордість", 
    "Inspiration": "Натхнення",
    "Hope": "Надія",
    "Optimism": "Оптимізм",
    "Confidence": "Впевненість",
    "Joy": "Радість",
    "Gratitude": "Подяка",
    "Openness": "Відкритість",
    "Bliss": "Блаженство",
    "Delight": "Захват", 
    "Admiration": "Захоплення",
    "Excitement": "Збудження",
    "Elation": "Піднесення",
    "Euphoria": "Ейфорія",
    "Devotion": "Відданість",
    "Love of life": "Любов до життя",
    "Triumph": "Тріумф"
  };

  // Словник для перекладу причин
  const causeTranslations = {
    "Myself": "Я сам",
    "Family": "Родина", 
    "Friends": "Друзі",
    "Partner": "Партнер",
    "Colleagues": "Колеги",
    "Work": "Робота",
    "Training": "Тренування", 
    "Driving": "Водіння",
    "Rest": "Відпочинок",
    "Studying": "Навчання",
    "Home": "Дім",
    "Office": "Офіс", 
    "School": "Школа",
    "University": "Університет",
    "Street": "Вулиця"
  };

  // Словник для перекладу факторів
  const factorTranslations = {
    "Sports": "Спорт",
    "Coffee": "Кава",
    "Alcohol": "Алкоголь",
    "Sex": "Секс",
    "Meditation": "Медитація",
    "Antidepressants": "Антидепресанти",
    "Other": "Інше"
  };

  // Список всіх доступних факторів
  const allFactors = ["Sports", "Coffee", "Alcohol", "Sex", "Meditation", "Antidepressants", "Other"];

  const today = new Date();
  const [selectedDate, setSelectedDate] = useState(today.getDate());
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [addingEmotion, setAddingEmotion] = useState(false);
  const [showFactorsInfo, setShowFactorsInfo] = useState(false);
  const [addingFactor, setAddingFactor] = useState(false);
  const [selectedFactors, setSelectedFactors] = useState([]);
  const [currentRecordId, setCurrentRecordId] = useState(null);
  const [initialFactors, setInitialFactors] = useState([]);


  const userId = localStorage.getItem("user-id");
  const token = localStorage.getItem("helth-token");

  // Функція для перекладу емоцій
  const translateEmotions = (englishEmotions) => {
    if (!englishEmotions) return "Не вказано";
    
    const emotionsArray = englishEmotions.split(',').map(item => item.trim());
    const translatedEmotions = emotionsArray.map(emotion => {
      return emotionTranslations[emotion] || emotion;
    });
    
    return translatedEmotions.join(', ');
  };

  // Функція для перекладу причин
  const translateCauses = (englishCauses) => {
    if (!englishCauses) return "";
    
    const causesArray = englishCauses.split(',').map(item => item.trim());
    const translatedCauses = causesArray.map(cause => {
      return causeTranslations[cause] || cause;
    });
    
    return translatedCauses.join(', ');
  };

  // Функція для перекладу факторів
  const translateFactor = (englishFactor) => {
    return factorTranslations[englishFactor] || englishFactor;
  };

  // Функція для отримання іконки за назвою фактора
  const getFactorIcon = (factorName) => {
    const factorIcons = {
      'Sports': sports,
      'Coffee': coffee,
      'Alcohol': alcohol,
      'Sex': sex,
      'Meditation': meditation,
      'Antidepressants': antidepressants,
      'Other': other,
      'default': other
    };

    return factorIcons[factorName] || factorIcons['default'];
  };

  const fetchRecords  = useCallback(async () => {
    if (!userId || !token) {
      setError("Користувач не авторизований");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/mental-health-record/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Помилка при завантаженні даних: ${response.status}`);
      }

      const data = await response.json();
      setRecords(data);
      setError(null);
    } catch (error) {
      console.error("Помилка при завантаженні записів:", error);
      setError("Не вдалося завантажити дані");
    } finally {
      setLoading(false);
    }
  }, [userId, token]);

  useEffect(() => {
    fetchRecords();
  }, [userId, token, fetchRecords]);

  const handleSaveEmotion = async (emotionData) => {
    try {
      const recordDate = new Date();
      recordDate.setDate(selectedDate);
      
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
        MeditationDurationMinutes: 0,
        BreathingPracticeDurationMinutes: 0,
        StressLevelScore: 0,
        AnxietyLevelScore: 0,
        Feeling: emotionData.Feeling,
        Cause: emotionData.Cause,
        Factors: [],
        Notes: emotionData.Notes
      };

      const response = await fetch(
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

      if (!response.ok) {
        throw new Error('Помилка при збереженні запису');
      }

      await fetchRecords();
      setAddingEmotion(false);
    } catch (error) {
      console.error('Помилка при збереженні:', error);
      setError('Не вдалося зберегти запис');
    }
  };

  const handleAddFactor = async (record) => {
    if (!record.Feeling) {
      alert("Спочатку додайте емоцію перед додаванням факторів");
      return;
    }

    setCurrentRecordId(record.Id);
    setSelectedFactors(record.Factors || []);
    setInitialFactors(record.Factors || []);
    setAddingFactor(true);
  };

  const handleSaveFactors = async () => {
  try {
    // Перевіряємо, чи були зміни
    const hasChanges = JSON.stringify(selectedFactors) !== JSON.stringify(initialFactors);
    
    if (!hasChanges) {
      setAddingFactor(false);
      return;
    }

    const record = records.find(r => r.Id === currentRecordId);
    if (!record) return;

    const requestBody = {
      RecordDate: record.RecordDate,
      MeditationDurationMinutes: record.MeditationDurationMinutes || 0,
      BreathingPracticeDurationMinutes: record.BreathingPracticeDurationMinutes || 0,
      StressLevelScore: record.StressLevelScore || 0,
      AnxietyLevelScore: record.AnxietyLevelScore || 0,
      Feeling: record.Feeling,
      Cause: record.Cause,
      Factors: selectedFactors,
      Notes: record.Notes || ""
    };

    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/api/mental-health-record/${currentRecordId}`,
      {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      }
    );

    if (!response.ok) {
      throw new Error('Помилка при оновленні запису');
    }

    await fetchRecords();
    setAddingFactor(false);
    setSelectedFactors([]);
    setInitialFactors([]);
    setCurrentRecordId(null);
  } catch (error) {
    console.error('Помилка при збереженні факторів:', error);
    setError('Не вдалося зберегти фактори');
  }
};

  const handleFactorToggle = (factor) => {
    setSelectedFactors(prev => {
      if (prev.includes(factor)) {
        return prev.filter(f => f !== factor);
      } else {
        return [...prev, factor];
      }
    });
  };

  const getRecordsForSelectedDate = () => {
    return records.filter(record => {
      const recordDate = new Date(record.RecordDate);
      return (
        recordDate.getDate() === selectedDate &&
        recordDate.getMonth() === today.getMonth() &&
        recordDate.getFullYear() === today.getFullYear()
      );
    });
  };

  const handleDateSelect = (day) => {
    if (day <= today.getDate()) {
      setSelectedDate(day);
    }
  };

  const handleAddEmotion = () => {
    setAddingEmotion(true);
  };

  const handleInfoClick = () => {
    setShowFactorsInfo(true);
  };

  const handleCloseFactorsInfo = () => {
    setShowFactorsInfo(false);
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('uk-UA', { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('uk-UA', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };

  const selectedRecords = getRecordsForSelectedDate();

  const hasNotes = (record) => {
    return record.Notes && record.Notes.trim().length > 0;
  };

  if (loading) {
    // return <div>Завантаження...</div>;
    return;
  }

  if (error) {
    return (
      <div className="ed-mental-health-diary-container">
        <div className="ed-error">{error}</div>
      </div>
    );
  }

  // Компонент для відображення інформації про фактори
  const FactorsInfoModal = () => (
    <>
      <div className="ed-title">
        <h2>Щоденник емоцій</h2>
      </div>

      <div className="ed-factors-info-container">
        <div className="ed-factors-info-header">
          <h2>Фактори настрою</h2>
          <button className="ed-close-factors-info" onClick={handleCloseFactorsInfo}>
            <img src={close_icon} alt="Закрити" />
          </button>
        </div>
        
        <div className="ed-factors-info-content">
          <p className="ed-factors-intro">
            Всі фактори - твої можливі тригери.
          </p>
          <p className="ed-factors-intro"> 
            Наприклад, ви можете не помічати, що спорт, кава або наркотики впливають на ваш настрій і формують поведінкові патерни.
          </p>
          
          <p className="ed-factors-analytics">
            Ви можете відстежити вплив факторів на ваше самопочуття пізніше в розділі аналітики.
          </p>

          <div className="ed-factors-examples">
            <h3>Приклад</h3>
            
            <div className="ed-factor-example">
              <p>Харчування та стимулятори:</p>
              <p>Записуй споживання кави, вітамінів або продуктів, які можуть вплинути на рівень енергії.</p>
            </div>
            
            <div className="ed-factor-example">
              <p>Активність та фізичні вправи:</p>
              <p>Відстежуй кількість фізичних вправ або участь у інших формах фізичної активності.</p>
            </div>
            
            <div className="ed-factor-example">
              <p>Біологічні цикли:</p>
              <p>Відстежуючи свої місячні, ви зможете зрозуміти, як вони впливають на ваше емоційне самопочуття.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  // Компонент для вибору факторів
  const FactorsSelectionModal = () => {
    const availableFactors = allFactors.filter(factor => !selectedFactors.includes(factor));
    
    // Перевіряємо, чи були зміни
    const hasChanges = JSON.stringify(selectedFactors) !== JSON.stringify(initialFactors);

    return (
      <div className="ed-factors-selection-container">
        <div className="ed-factors-selection-header">
          <button className="ed-close-factors-selection" onClick={() => setAddingFactor(false)}>
            <img className="ed-close-factors-selection-icon" src={close_icon} alt="Закрити" />
          </button>
        </div>

        <div className="ed-factors-selection-content">
          <div className="ed-selected-factors">
            <h4>Вибрані фактори:</h4>
            {selectedFactors.length > 0 ? (
              <div className="ed-selected-factors-list">
                {selectedFactors.map((factor, index) => (
                  <div 
                    key={index} 
                    className="ed-selected-factor-item"
                    onClick={() => handleFactorToggle(factor)} // Додаємо клік на весь блок
                  >
                    <span className="ed-factor-icon">
                      <img src={getFactorIcon(factor)} alt={factor} />
                    </span>
                    <span className="ed-factor-name-list">{translateFactor(factor)}</span>
                    <button 
                      className="ed-remove-factor-btn"
                      onClick={(e) => {
                        e.stopPropagation(); // Запобігаємо подвійному виклику
                        handleFactorToggle(factor);
                      }}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <></>
            )}
          </div>

          <div className="ed-available-factors">
            <h4>Доступні фактори:</h4>
            <div className="ed-available-factors-list">
              {availableFactors.map((factor, index) => (
                <div 
                  key={index} 
                  className="ed-available-factor-item"
                  onClick={() => handleFactorToggle(factor)}
                >
                  <span className="ed-factor-icon">
                    <img src={getFactorIcon(factor)} alt={factor} />
                  </span>
                  <span className="ed-factor-name-list">{translateFactor(factor)}</span>
                  <button className="ed-add-factor-select-btn">+</button>
                </div>
              ))}
            </div>
          </div>

          <div className="ed-factors-selection-actions">
            <button 
              className="ed-save-factors-btn"
              onClick={handleSaveFactors}
              disabled={!hasChanges}
            >
              Зберегти
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="ed-mental-health-diary-container">
      {showFactorsInfo ? (
        <FactorsInfoModal />
      ) : addingFactor ? (
        <FactorsSelectionModal />
      ) : (
        <>
          <div className="ed-title">
            <h2>Щоденник емоцій</h2>
          </div>
          
          <div className="ed-mental-health-diary-content">
            {addingEmotion ? (
              <AddEmotionWizard
                onCancel={() => setAddingEmotion(false)}
                onSave={handleSaveEmotion}
              />
            ) : (
              <>
                <DateCarousel
                  selectedDate={selectedDate}
                  onDateSelect={handleDateSelect}
                />

                <div className="ed-emotion-content">
                  {selectedRecords.length > 0 ? (
                    selectedRecords.map(record => (
                      <div key={record.Id}>
                        <div className="ed-emotion-main-block">
                          <div className="ed-emotion-left">
                            <h3 className="ed-emotion-feeling">{translateEmotions(record.Feeling)}</h3>
                            <p className="ed-emotion-cause">{translateCauses(record.Cause)}</p>
                          </div>
                          <div className="ed-emotion-right">
                            <p className="ed-emotion-time">{formatTime(record.RecordDate)}</p>
                            <p className="ed-emotion-date">{formatDate(record.RecordDate)}</p>
                          </div>
                        </div>

                        <div className="ed-factors-header">
                          <h4>Фактори</h4>
                          <button className="ed-info-btn" onClick={handleInfoClick}>
                            <img src={factor_info_icon} alt="Інформація про фактори" className="ed-factor-info-icon" />
                          </button>
                        </div>
                        
                        <div className={`ed-factors-section ${record.Factors && record.Factors.length > 0 ? 'ed-has-factors' : ''}`}>
                          <div className="ed-factors-list">
                            {record.Factors && record.Factors.length > 0 ? (
                              <>
                                <button 
                                  className="ed-add-factor-btn-inline" 
                                  onClick={() => handleAddFactor(record)}
                                  disabled={!record.Feeling}
                                >
                                  +
                                </button>
                                {record.Factors.map((factor, index) => (
                                  <div key={index} className="ed-factor-item">
                                    <span className="ed-factor-icon">
                                      <img src={getFactorIcon(factor)} alt={factor} />
                                    </span>
                                    <span className="ed-factor-name">{translateFactor(factor)}</span>
                                  </div>
                                ))}
                              </>
                            ) : (
                              <div className="ed-add-factor-block">
                                <button 
                                  className="ed-add-factor-btn" 
                                  onClick={() => handleAddFactor(record)}
                                  disabled={!record.Feeling}
                                >
                                  +
                                </button>
                                <span className="ed-add-factor-text">Додати фактор</span>
                              </div>
                            )}
                          </div>
                        </div>
                        {hasNotes(record) && (
                          <div className="ed-notes-section">
                            <div className="ed-notes-content">
                              <textarea
                                className="ed-notes-textarea"
                                value={record.Notes}
                                readOnly
                                rows={4}
                                placeholder="Нотаток немає"
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    ))
                  ) : (
                    <div className="ed-no-data">
                      <div className="ed-add-emotion-block">
                        <h3>Привіт! Ти як?</h3>
                        <button className="ed-add-emotion-btn" onClick={handleAddEmotion}>
                          +
                        </button>
                      </div>

                      <div className="ed-factors-header">
                        <h4>Фактори</h4>
                        <button className="ed-info-btn" onClick={handleInfoClick}>
                          <img src={factor_info_icon} alt="Інформація про фактори" className="ed-factor-info-icon" />
                        </button>
                      </div>
                      
                      <div className="ed-factors-section">
                        <div className="ed-add-factor-block">
                          <span className="ed-add-factor-text">Додати фактор</span>
                          <button 
                            className="ed-add-factor-btn" 
                            disabled={true}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default EmotionDiaryPage;