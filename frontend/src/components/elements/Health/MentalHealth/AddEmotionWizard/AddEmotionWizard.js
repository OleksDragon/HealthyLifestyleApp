import React, { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import './AddEmotionWizard.css';

const AddEmotionWizard = ({ onCancel, onSave }) => {
  const [step, setStep] = useState(1);
  const [currentEmotionCategory, setCurrentEmotionCategory] = useState(0);
  const [selectedEmotions, setSelectedEmotions] = useState({}); 
  const [selectedCauses, setSelectedCauses] = useState([]);
  const [notes, setNotes] = useState('');
  const { t } = useTranslation();

  const progressContainerRef = useRef(null);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const emotionCategories = {
    [t("mp_aew_ok")]: {
      [t("mp_aew_balance")]: "Balance",
      [t("mp_aew_safety")]: "Safety", 
      [t("mp_aew_neutrality")]: "Neutrality",
      [t("mp_aew_lethargy")]: "Lethargy",
      [t("mp_aew_carefreeness")]: "Carefreeness",
      [t("mp_aew_relaxation")]: "Relaxation",
      [t("mp_aew_calmness")]: "Calmness",
      [t("mp_aew_stability")]: "Stability",
      [t("mp_aew_focus")]: "Focus"
    },
    [t("mp_aew_so_so")]: {
      [t("mp_aew_indifference")]: "Indifference",
      [t("mp_aew_nervousness")]: "Nervousness", 
      [t("mp_aew_slight_irritation")]: "Slight irritation",
      [t("mp_aew_doubt")]: "Doubt",
      [t("mp_aew_restlessness")]: "Restlessness",
      [t("mp_aew_distrust")]: "Distrust",
      [t("mp_aew_tension")]: "Tension",
      [t("mp_aew_dissatisfaction")]: "Dissatisfaction",
      [t("mp_aew_melancholy")]: "Melancholy"
    },
    [t("mp_aew_i_feel_sick")]: {
      [t("mp_aew_fatigue")]: "Fatigue",
      [t("mp_aew_self_pity")]: "Self-pity", 
      [t("mp_aew_anxiety")]: "Anxiety",
      [t("mp_aew_sadness")]: "Sadness",
      [t("mp_aew_uncertainty")]: "Uncertainty",
      [t("mp_aew_confusion")]: "Confusion",
      [t("mp_aew_guilt")]: "Guilt",
      [t("mp_aew_self_rejection")]: "Self-rejection",
      [t("mp_aew_emptiness")]: "Emptiness"
    },
    [t("mp_aew_terribly")]: {
      [t("mp_aew_isolation")]: "Isolation",
      [t("mp_aew_depression")]: "Depression", 
      [t("mp_aew_envy")]: "Envy",
      [t("mp_aew_deep_sorrow")]: "Deep sorrow",
      [t("mp_aew_shame")]: "Shame",
      [t("mp_aew_despair")]: "Despair",
      [t("mp_aew_loneliness")]: "Loneliness",
      [t("mp_aew_hopelessness")]: "Hopelessness",
      [t("mp_aew_self_directed_aggression")]: "Self-directed aggression"
    },
    [t("mp_aew_сool")]: {
      [t("mp_aew_energy")]: "Energy",
      [t("mp_aew_satisfaction")]: "Satisfaction", 
      [t("mp_aew_connection")]: "Connection",
      [t("mp_aew_comfort")]: "Comfort",
      [t("mp_aew_love")]: "Love",
      [t("mp_aew_motivation")]: "Motivation",
      [t("mp_aew_determination")]: "Determination",
      [t("mp_aew_respect")]: "Respect",
      [t("mp_aew_friendship")]: "Friendship"
    },
    [t("mp_aew_good")]: {
      [t("mp_aew_in_the_flow")]: "In the flow",
      [t("mp_aew_pride")]: "Pride", 
      [t("mp_aew_inspiration")]: "Inspiration",
      [t("mp_aew_hope")]: "Hope",
      [t("mp_aew_optimism")]: "Optimism",
      [t("mp_aew_confidence")]: "Confidence",
      [t("mp_aew_joy")]: "Joy",
      [t("mp_aew_gratitude")]: "Gratitude",
      [t("mp_aew_openness")]: "Openness"
    },
    [t("mp_aew_great")]: {
      [t("mp_aew_bliss")]: "Bliss",
      [t("mp_aew_delight")]: "Delight", 
      [t("mp_aew_admiration")]: "Admiration",
      [t("mp_aew_excitement")]: "Excitement",
      [t("mp_aew_elation")]: "Elation",
      [t("mp_aew_euphoria")]: "Euphoria",
      [t("mp_aew_devotion")]: "Devotion",
      [t("mp_aew_love_of_life")]: "Love of life",
      [t("mp_aew_triumph")]: "Triumph"
    }
  };

  const causeCategories = {
    [t("mp_aew_people")]: {
      [t("mp_aew_myself")]: "Myself",
      [t("mp_aew_family")]: "Family", 
      [t("mp_aew_friends")]: "Friends",
      [t("mp_aew_partner")]: "Partner",
      [t("mp_aew_colleagues")]: "Colleagues"
    },
    [t("mp_aew_events")]: {
      [t("mp_aew_work")]: "Work",
      [t("mp_aew_training")]: "Training", 
      [t("mp_aew_driving")]: "Driving",
      [t("mp_aew_rest")]: "Rest",
      [t("mp_aew_studying")]: "Studying"
    },
    [t("mp_aew_places")]: {
      [t("mp_aew_home")]: "Home",
      [t("mp_aew_office")]: "Office", 
      [t("mp_aew_school")]: "School",
      [t("mp_aew_university")]: "University",
      [t("mp_aew_street")]: "Street"
    }
  };
  
  const emotionKeys = Object.keys(emotionCategories);
  const causeKeys = Object.keys(causeCategories);

  // Swipe-функції для прогрес-бару
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const minSwipeDistance = 30;
    
    if (Math.abs(distance) < minSwipeDistance) return;
    
    if (distance > minSwipeDistance) {
      // Swipe вліво - наступна категорія
      handleNextEmotionCategory();
    } else if (distance < -minSwipeDistance) {
      // Swipe вправо - попередня категорія
      handlePrevEmotionCategory();
    }
    
    setTouchStart(0);
    setTouchEnd(0);
  };

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
            <h2 className="aew-wizard-title">{t("mp_aew_wizard_title_step_1")}</h2>
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

              <div 
                ref={progressContainerRef}
                className="aew-progress-container"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
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
            <h2 className="aew-wizard-title">{t("mp_aew_wizard_title_step_2")}</h2>

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
            <h2 className="aew-wizard-title">{t("mp_aew_wizard_title_step_3")} {selectedEmotionsList.join(', ')}?</h2>
            
            <div className="aew-step3-content">
              <h3 className="aew-wizard-subtitle aew-step3-subtitle">{t("mp_aew_notes")}</h3>
              
              <div className='aew-notes-textarea-content'>
                <textarea
                  className="aew-notes-textarea"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder={t("mp_aew_describe_your_feelings")}
                ></textarea>
              </div>
              
              <p className="aew-wizard-description aew-step3-description">{t("mp_aew_wizard_description_step_3")}</p>
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
      case 1: return t("mp_btn_next");
      case 2: return t("mp_btn_next");
      case 3: return t("mp_btn_add");
      default: return t("mp_btn_next");
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
          {step === 1 ? t("mp_btn_cancel") : t("mp_btn_back")}
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