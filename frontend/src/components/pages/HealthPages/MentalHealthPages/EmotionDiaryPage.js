import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
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
import close_icon from "../../../../assets/health-icons/close_icon.svg";
import "../../../styles/emotionDiary.css";

const EmotionDiaryPage = () => {
  const { t } = useTranslation();
  // Словник для перекладу емоцій
  const emotionTranslations = {
    "Balance": t("mp_aew_balance"),
    "Safety": t("mp_aew_safety"), 
    "Neutrality": t("mp_aew_neutrality"),
    "Lethargy": t("mp_aew_lethargy"),
    "Carefreeness": t("mp_aew_carefreeness"),
    "Relaxation": t("mp_aew_relaxation"),
    "Calmness": t("mp_aew_calmness"),
    "Stability": t("mp_aew_stability"),
    "Focus": t("mp_aew_focus"),
    "Indifference": t("mp_aew_indifference"),
    "Nervousness": t("mp_aew_nervousness"), 
    "Slight irritation": t("mp_aew_slight_irritation"),
    "Doubt": t("mp_aew_doubt"),
    "Restlessness": t("mp_aew_restlessness"),
    "Distrust": t("mp_aew_distrust"),
    "Tension": t("mp_aew_tension"),
    "Dissatisfaction": t("mp_aew_dissatisfaction"),
    "Melancholy": t("mp_aew_melancholy"),
    "Fatigue": t("mp_aew_fatigue"),
    "Self-pity": t("mp_aew_self_pity"), 
    "Anxiety": t("mp_aew_anxiety"),
    "Sadness": t("mp_aew_sadness"),
    "Uncertainty": t("mp_aew_uncertainty"),
    "Confusion": t("mp_aew_confusion"),
    "Guilt": t("mp_aew_guilt"),
    "Self-rejection": t("mp_aew_self_rejection"),
    "Emptiness": t("mp_aew_emptiness"),
    "Isolation": t("mp_aew_isolation"),
    "Depression": t("mp_aew_depression"), 
    "Envy": t("mp_aew_envy"),
    "Deep sorrow": t("mp_aew_deep_sorrow"),
    "Shame": t("mp_aew_shame"),
    "Despair": t("mp_aew_despair"),
    "Loneliness": t("mp_aew_loneliness"),
    "Hopelessness": t("mp_aew_hopelessness"),
    "Self-directed aggression": t("mp_aew_self_directed_aggression"),
    "Energy": t("mp_aew_energy"),
    "Satisfaction": t("mp_aew_satisfaction"), 
    "Connection": t("mp_aew_connection"),
    "Comfort": t("mp_aew_comfort"),
    "Love": t("mp_aew_love"),
    "Motivation": t("mp_aew_motivation"),
    "Determination": t("mp_aew_determination"),
    "Respect": t("mp_aew_respect"),
    "Friendship": t("mp_aew_friendship"),
    "In the flow": t("mp_aew_in_the_flow"),
    "Pride": t("mp_aew_pride"), 
    "Inspiration": t("mp_aew_inspiration"),
    "Hope": t("mp_aew_hope"),
    "Optimism": t("mp_aew_optimism"),
    "Confidence": t("mp_aew_confidence"),
    "Joy": t("mp_aew_joy"),
    "Gratitude": t("mp_aew_gratitude"),
    "Openness": t("mp_aew_openness"),
    "Bliss": t("mp_aew_bliss"),
    "Delight": t("mp_aew_delight"), 
    "Admiration": t("mp_aew_admiration"),
    "Excitement": t("mp_aew_excitement"),
    "Elation": t("mp_aew_elation"),
    "Euphoria": t("mp_aew_euphoria"),
    "Devotion": t("mp_aew_devotion"),
    "Love of life": t("mp_aew_love_of_life"),
    "Triumph": t("mp_aew_triumph")
  };

  // Словник для перекладу причин
  const causeTranslations = {
    "Myself": t("mp_aew_myself"),
    "Family": t("mp_aew_family"), 
    "Friends": t("mp_aew_friends"),
    "Partner": t("mp_aew_partner"),
    "Colleagues": t("mp_aew_colleagues"),
    "Work": t("mp_aew_work"),
    "Training": t("mp_aew_training"), 
    "Driving": t("mp_aew_driving"),
    "Rest": t("mp_aew_rest"),
    "Studying": t("mp_aew_studying"),
    "Home": t("mp_aew_home"),
    "Office": t("mp_aew_office"), 
    "School": t("mp_aew_school"),
    "University": t("mp_aew_university"),
    "Street": t("mp_aew_street")
  };

  // Словник для перекладу факторів
  const factorTranslations = {
    "Sports": t("mp_edp_sports"),
    "Coffee": t("mp_edp_coffee"),
    "Alcohol": t("mp_edp_alcohol"),
    "Sex": t("mp_edp_sex"),
    "Meditation": t("mp_edp_meditation"),
    "Antidepressants": t("mp_edp_antidepressants"),
    "Other": t("mp_edp_other")
  };

  // Список всіх доступних факторів
  const allFactors = ["Sports", "Coffee", "Alcohol", "Sex", "Meditation", "Antidepressants", "Other"];

  const navigate = useNavigate();
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
    if (!englishEmotions) return t("mp_edp_not_specified");
    
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
      navigate('/login');
    } finally {
      setLoading(false);
    }
  }, [userId, token, navigate]);

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

    const existingRecord = records.find(record => {
      const recordDateObj = new Date(record.RecordDate);
      return (
        recordDateObj.getDate() === selectedDate &&
        recordDateObj.getMonth() === today.getMonth() &&
        recordDateObj.getFullYear() === today.getFullYear() &&
        (!record.Feeling || record.Feeling.trim() === "")
      );
    });

    const requestBody = {
      UserId: userId,
      RecordDate: formatLocalISO(recordDate),
      MeditationDurationMinutes: existingRecord?.MeditationDurationMinutes || 0,
      BreathingPracticeDurationMinutes: existingRecord?.BreathingPracticeDurationMinutes || 0,
      StressLevelScore: existingRecord?.StressLevelScore || 0,
      AnxietyLevelScore: existingRecord?.AnxietyLevelScore || 0,
      Feeling: emotionData.Feeling,
      Cause: emotionData.Cause,
      Factors: existingRecord?.Factors || [],
      Notes: emotionData.Notes || existingRecord?.Notes || ""
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
        <h2>{t("mp_ebp_title")}</h2>
      </div>

      <div className="ed-factors-info-container">
        <div className="ed-factors-info-header">
          <h2>{t("mp_ebp_factor_title")}</h2>
          <button className="ed-close-factors-info" onClick={handleCloseFactorsInfo}>
            <img src={close_icon} alt="Закрити" />
          </button>
        </div>
        
        <div className="ed-factors-info-content">
          <p className="ed-factors-intro">
            {t("mp_ebp_factor_info_p_1")}
          </p>
          <p className="ed-factors-intro"> 
            {t("mp_ebp_factor_info_p_2")}
          </p>
          
          <p className="ed-factors-analytics">
            {t("mp_ebp_factor_info_p_3")}
          </p>

          <div className="ed-factors-examples">
            <h3>{t("mp_ebp_factor_info_p_4")}</h3>
            
            <div className="ed-factor-example">
              <p>{t("mp_ebp_factor_info_p_5")}</p>
              <p>{t("mp_ebp_factor_info_p_6")}</p>
            </div>
            
            <div className="ed-factor-example">
              <p>{t("mp_ebp_factor_info_p_7")}</p>
              <p>{t("mp_ebp_factor_info_p_8")}</p>
            </div>
            
            <div className="ed-factor-example">
              <p>{t("mp_ebp_factor_info_p_9")}</p>
              <p>{t("mp_ebp_factor_info_p_10")}</p>
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
            <h4>{t("mp_ebp_selected_factors")}</h4>
            {selectedFactors.length > 0 ? (
              <div className="ed-selected-factors-list">
                {selectedFactors.map((factor, index) => (
                  <div 
                    key={index} 
                    className="ed-selected-factor-item"
                    onClick={() => handleFactorToggle(factor)}
                  >
                    <span className="ed-factor-icon">
                      <img src={getFactorIcon(factor)} alt={factor} />
                    </span>
                    <span className="ed-factor-name-list">{translateFactor(factor)}</span>
                    <button 
                      className="ed-remove-factor-btn"
                      onClick={(e) => {
                        e.stopPropagation();
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
            <h4>{t("mp_ebp_available_factors")}</h4>
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
              {t("mp_btn_save")}
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
            <h2>{t("mp_ebp_title")}</h2>
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
                        {!record.Feeling ? (
                          <div className="ed-no-data">
                            <div className="ed-add-emotion-block">
                              <h3>{t("mp_ebp_hello_how_are_you")}</h3>
                              <button className="ed-add-emotion-btn" onClick={handleAddEmotion}>
                                +
                              </button>
                            </div>

                            <div className="ed-factors-header">
                              <h4>{t("mp_ebp_factor")}</h4>
                              <button className="ed-info-btn" onClick={handleInfoClick}>
                                <img src={factor_info_icon} alt="Інформація про фактори" className="ed-factor-info-icon" />
                              </button>
                            </div>
                            
                            <div className="ed-factors-section">
                              <div className="ed-add-factor-block">
                                <span className="ed-add-factor-text">{t("mp_ebp_add_factor")}</span>
                                <button 
                                  className="ed-add-factor-btn" 
                                  disabled={true}
                                >
                                  +
                                </button>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <>
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
                              <h4>{t("mp_ebp_factor")}</h4>
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
                                    <span className="ed-add-factor-text">{t("mp_ebp_add_factor")}</span>
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
                                  />
                                </div>
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    ))
                  ) : (
                    <div className="ed-no-data">
                      <div className="ed-add-emotion-block">
                        <h3>{t("mp_ebp_hello_how_are_you")}</h3>
                        <button className="ed-add-emotion-btn" onClick={handleAddEmotion}>
                          +
                        </button>
                      </div>

                      <div className="ed-factors-header">
                        <h4>{t("mp_ebp_factor")}</h4>
                        <button className="ed-info-btn" onClick={handleInfoClick}>
                          <img src={factor_info_icon} alt="Інформація про фактори" className="ed-factor-info-icon" />
                        </button>
                      </div>
                      
                      <div className="ed-factors-section">
                        <div className="ed-add-factor-block">
                          <span className="ed-add-factor-text">{t("mp_ebp_add_factor")}</span>
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