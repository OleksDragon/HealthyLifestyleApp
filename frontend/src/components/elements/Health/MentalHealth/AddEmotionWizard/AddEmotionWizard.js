import React, { useState } from 'react';
import './AddEmotionWizard.css';

const AddEmotionWizard = ({ onCancel, onSave }) => {
  const [step, setStep] = useState(1);
  const [currentEmotionCategory, setCurrentEmotionCategory] = useState(0);
  const [selectedEmotions, setSelectedEmotions] = useState({}); 
  const [selectedCauses, setSelectedCauses] = useState([]);
  const [notes, setNotes] = useState('');

  const emotionCategories = {
    "Ок": {
      "Баланс": "Balance",
      "Безпека": "Safety", 
      "Нейтральність": "Neutrality",
      "Млявість": "Lethargy",
      "Безтурботність": "Carefreeness",
      "Розслабленість": "Relaxation",
      "Спокій": "Calmness",
      "Стійкість": "Stability",
      "Зосередженість": "Focus"
    },
    "Таке": {
      "Байдужість": "Indifference",
      "Нервовість": "Nervousness", 
      "Легке роздратування": "Slight irritation",
      "Сумнів": "Doubt",
      "Неспокій": "Restlessness",
      "Недовіра": "Distrust",
      "Напруга": "Tension",
      "Незадоволення": "Dissatisfaction",
      "Туга": "Melancholy"
    },
    "Мені погано": {
      "Втома": "Fatigue",
      "Жалію себе": "Self-pity", 
      "Тривога": "Anxiety",
      "Сум": "Sadness",
      "Непевність": "Uncertainty",
      "Розгубленість": "Confusion",
      "Почуття провини": "Guilt",
      "Неприйняття себе": "Self-rejection",
      "Спустошеність": "Emptiness"
    },
    "Жахливо": {
      "Ізоляція": "Isolation",
      "Депресія": "Depression", 
      "Заздрість": "Envy",
      "Глибокий смуток": "Deep sorrow",
      "Сором": "Shame",
      "Відчай": "Despair",
      "Самотність": "Loneliness",
      "Безнадія": "Hopelessness",
      "Агресія до себе": "Self-directed aggression"
    },
    "Клас": {
      "Енергія": "Energy",
      "Задоволення": "Satisfaction", 
      "Відчуття зв'язку": "Connection",
      "Комфорт": "Comfort",
      "Кохання": "Love",
      "Мотивація": "Motivation",
      "Цілеспрямованість": "Determination",
      "Повага": "Respect",
      "Дружність": "Friendship"
    },
    "Добре": {
      "В потоці": "In the flow",
      "Гордість": "Pride", 
      "Натхнення": "Inspiration",
      "Надія": "Hope",
      "Оптимізм": "Optimism",
      "Впевненість": "Confidence",
      "Радість": "Joy",
      "Подяка": "Gratitude",
      "Відкритість": "Openness"
    },
    "Чудово": {
      "Блаженство": "Bliss",
      "Захват": "Delight", 
      "Захоплення": "Admiration",
      "Збудження": "Excitement",
      "Піднесення": "Elation",
      "Ейфорія": "Euphoria",
      "Відданість": "Devotion",
      "Любов до життя": "Love of life",
      "Тріумф": "Triumph"
    }
  };

  const causeCategories = {
    "Люди": {
      "Я сам": "Myself",
      "Родина": "Family", 
      "Друзі": "Friends",
      "Партнер": "Partner",
      "Колеги": "Colleagues"
    },
    "Події": {
      "Робота": "Work",
      "Тренування": "Training", 
      "Водіння": "Driving",
      "Відпочинок": "Rest",
      "Навчання": "Studying"
    },
    "Місця": {
      "Дім": "Home",
      "Офіс": "Office", 
      "Школа": "School",
      "Університет": "University",
      "Вулиця": "Street"
    }
  };
  
  const emotionKeys = Object.keys(emotionCategories);
  const causeKeys = Object.keys(causeCategories);
  
  const handleEmotionSelect = (emotion) => {
    const currentCategory = emotionKeys[currentEmotionCategory];
    
    setSelectedEmotions(prev => {
      const newSelection = { ...prev };
      
      if (!newSelection[currentCategory]) {
        newSelection[currentCategory] = [];
      }
      
      if (newSelection[currentCategory].includes(emotion)) {
        newSelection[currentCategory] = newSelection[currentCategory].filter(e => e !== emotion);
      } else {
        newSelection[currentCategory] = [...newSelection[currentCategory], emotion];
      }
      
      return newSelection;
    });
  };
  
  const handleCauseSelect = (cause) => {
    setSelectedCauses(prev => {
      if (prev.includes(cause)) {
        return prev.filter(c => c !== cause);
      } else {
        return [...prev, cause];
      }
    });
  };
  
  const handleNextEmotionCategory = () => {
    if (currentEmotionCategory < emotionKeys.length - 1) {
      setSelectedEmotions(prev => {
        const newSelection = { ...prev };
        const currentCategory = emotionKeys[currentEmotionCategory];
        newSelection[currentCategory] = [];
        return newSelection;
      });
      
      setCurrentEmotionCategory(currentEmotionCategory + 1);
    }
  };
  
  const handlePrevEmotionCategory = () => {
    if (currentEmotionCategory > 0) {
      setSelectedEmotions(prev => {
        const newSelection = { ...prev };
        const currentCategory = emotionKeys[currentEmotionCategory];
        newSelection[currentCategory] = [];
        return newSelection;
      });
      
      setCurrentEmotionCategory(currentEmotionCategory - 1);
    }
  };
  
  const handleSave = () => {
    const emotionsEn = [];
    
    Object.keys(selectedEmotions).forEach(category => {
      selectedEmotions[category].forEach(emotion => {
        emotionsEn.push(emotionCategories[category][emotion]);
      });
    });
    
    const causesEn = selectedCauses.map(cause => {
      const [category, value] = cause.split(' - ');
      return causeCategories[category][value];
    });
    
    onSave({
      Feeling: emotionsEn.join(', '),
      Cause: causesEn.join(', '),
      Notes: notes
    });
  };
  
  const hasAnyEmotionSelected = () => {
    return Object.values(selectedEmotions).some(emotions => emotions.length > 0);
  };

  const hasAnyCauseSelected = () => {
    return selectedCauses.length > 0;
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        const currentCategory = emotionKeys[currentEmotionCategory];
        const emotions = Object.keys(emotionCategories[currentCategory]);
        const currentSelectedEmotions = selectedEmotions[currentCategory] || [];
        
        return (
          <>
            <h2 className="aew-wizard-title">Я відчуваю</h2>
            <h3 className="aew-wizard-subtitle">{currentCategory}</h3>
            
            <div className="aew-category-nav">
              <button 
                className="aew-progress-nav-btn" 
                onClick={handlePrevEmotionCategory}
                disabled={currentEmotionCategory === 0}
              >
                <svg className='aew-left-progress-arrow' width="14" height="9" viewBox="0 0 14 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13 1L7 7L1 1" stroke="white" stroke-width="2" />
                </svg>
              </button>

              <div className="aew-progress-container">
                <div 
                  className={`aew-progress-line ${currentEmotionCategory > 0 ? 'with-radius' : ''}`}
                >
                  <div 
                    className="aew-progress-fill" 
                    style={{ width: `${(currentEmotionCategory / (emotionKeys.length - 1)) * 100}%` }}
                  ></div>
                </div>
                <div className="aew-progress-dots">
                  {emotionKeys.map((_, index) => (
                    <div 
                      key={index} 
                      className={`aew-progress-dot ${index === currentEmotionCategory ? 'active' : ''} ${index < currentEmotionCategory ? 'completed' : ''}`}
                    ></div>
                  ))}
                </div>
              </div>

              <button 
                className="aew-progress-nav-btn" 
                onClick={handleNextEmotionCategory}
                disabled={currentEmotionCategory === emotionKeys.length - 1}
              >
                <svg className='aew-right-progress-arrow' width="14" height="9" viewBox="0 0 14 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13 1L7 7L1 1" stroke="white" stroke-width="2" />
                </svg>
              </button>
            </div>
            
            <div className="aew-emotion-grid">
              {emotions.map((emotion, index) => (
                <button 
                  key={index}
                  className={`aew-emotion-btn ${currentSelectedEmotions.includes(emotion) ? 'selected' : ''}`}
                  onClick={() => handleEmotionSelect(emotion)}
                >
                  {emotion}
                </button>
              ))}
            </div>
          </>
        );

      case 2:
        return (
          <>
            <h2 className="aew-wizard-title">Що було причиною цих емоцій?</h2>

            <div className="aew-cause-categories">
              {causeKeys.map((category, index) => (
                <div key={index} className="aew-cause-category">
                  <h3 className="aew-cause-category-title">{category}</h3>
                  <div className="aew-cause-grid aew-cause-grid-5-col">
                    {Object.keys(causeCategories[category]).map((cause, idx) => (
                      <button 
                        key={idx}
                        className={`aew-cause-btn ${selectedCauses.includes(`${category} - ${cause}`) ? 'selected' : ''}`}
                        onClick={() => handleCauseSelect(`${category} - ${cause}`)}
                      >
                        {cause}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </>
        );

      case 3:
        const selectedEmotionsList = Object.values(selectedEmotions).flat();
        return (
          <>
            <h2 className="aew-wizard-title">Хочеш написати щось про {selectedEmotionsList.join(', ')}?</h2>
            
            <div className="aew-step3-content">
              <h3 className="aew-wizard-subtitle aew-step3-subtitle">Нотатка</h3>
              
              <div className='aew-notes-textarea-content'>
                <textarea
                  className="aew-notes-textarea"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Опишіть свої відчуття детальніше..."
                ></textarea>
              </div>
              
              <p className="aew-wizard-description aew-step3-description">Ваша замітка є приватною і її видно тільки вам.</p>
            </div>
          </>
        );

      default:
        return null;
    }
  };

  const getNextButtonDisabled = () => {
    switch (step) {
      case 1: return !hasAnyEmotionSelected();
      case 2: return !hasAnyCauseSelected();
      default: return false;
    }
  };

  const getNextButtonText = () => {
    switch (step) {
      case 1: return "Далі";
      case 2: return "Далі";
      case 3: return "Додати";
      default: return "Далі";
    }
  };

  const handleNextClick = () => {
    if (step === 3) {
      handleSave();
    } else {
      setStep(step + 1);
    }
  };

  return (
    <div className="aew-emotion-wizard">
      {renderStepContent()}
      
      <div className="aew-wizard-nav">
        <button 
          className="aew-nav-btn" 
          onClick={step === 1 ? onCancel : () => setStep(step - 1)}
        >
          {step === 1 ? "Скасувати" : "Назад"}
        </button>
        <button 
          className="aew-nav-btn aew-primary" 
          onClick={handleNextClick}
          disabled={getNextButtonDisabled()}
        >
          {getNextButtonText()}
        </button>
      </div>
    </div>
  );
};

export default AddEmotionWizard;