import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import nomic from '../../../../assets/health-icons/nomic_with_bandage.svg';
import '../../../styles/maleHormonesForm.css';

const MaleHormonesFormPage = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        testosterone: '',
        freeTestosterone: '',
        lh: '',
        prolactin: '',
        estradiol: '',
        fsh: ''
    });
    
    const [initialFormData, setInitialFormData] = useState({
        testosterone: '',
        freeTestosterone: '',
        lh: '',
        prolactin: '',
        estradiol: '',
        fsh: ''
    });
    
    const [existingRecord, setExistingRecord] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isFormChanged, setIsFormChanged] = useState(false);

    const handleBackClick = () => {
        navigate('/health/gender/male');
    };

    const checkFormChanges = useCallback((currentFormData) => {
        const hasChanges = Object.keys(currentFormData).some(key => 
            currentFormData[key] !== initialFormData[key]
        );
        setIsFormChanged(hasChanges);
    }, [initialFormData]);

    const hasAnyFieldValue = useCallback((formData) => {
        return Object.values(formData).some(value => value !== '');
    }, []);

    const fetchExistingRecord = useCallback(async () => {
        try {
            const token = localStorage.getItem('helth-token');
            const userId = localStorage.getItem('user-id');
            
            if (!token || !userId) {
                console.error('Токен або ID користувача відсутні');
                navigate('/login');
                return;
            }

            const response = await axios.get(
                `${process.env.REACT_APP_API_URL}/api/male-health-tracker/${userId}`,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            const foundRecord = response.data;
            
            if (foundRecord) {
                setExistingRecord(foundRecord);
                const newFormData = {
                    testosterone: foundRecord.TestosteroneLevel?.toString() || '',
                    freeTestosterone: foundRecord.FreeTestosterone?.toString() || '',
                    lh: foundRecord.LH?.toString() || '',
                    prolactin: foundRecord.Prolactin?.toString() || '',
                    estradiol: foundRecord.Estradiol?.toString() || '',
                    fsh: foundRecord.FSH?.toString() || ''
                };
                setFormData(newFormData);
                setInitialFormData(newFormData);
            }
        } catch (error) {
            if (error.response?.status === 401) {
                localStorage.removeItem('helth-token');
                localStorage.removeItem('user-id');
                navigate('/login');
                return;
            }
            if (error.response?.status === 404) {
                console.log('Запис не знайдено, буде створено новий');
            } else {
                console.error('Помилка при отриманні записів:', error);
            }
        } finally {
            setIsLoading(false);
        }
    }, [navigate]);

    useEffect(() => {
        fetchExistingRecord();
    }, [fetchExistingRecord]);

    useEffect(() => {
        checkFormChanges(formData);
    }, [formData, checkFormChanges]);

    const sendDataToServer = async () => {
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
                RecordDate: formatLocalISO(recordDate),
                TestosteroneLevel: parseFloat(formData.testosterone) || 0,
                FreeTestosterone: parseFloat(formData.freeTestosterone) || 0,
                LH: parseFloat(formData.lh) || 0,
                Prolactin: parseFloat(formData.prolactin) || 0,
                Estradiol: parseFloat(formData.estradiol) || 0,
                FSH: parseFloat(formData.fsh) || 0,
                Notes: ""
            };

            let response;
            if (existingRecord) {
                response = await axios.put(
                    `${process.env.REACT_APP_API_URL}/api/male-health-tracker/${existingRecord.UserId}`,
                    requestBody,
                    {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json'
                        }
                    }
                );
            } else {
                const postRequestBody = {
                    ...requestBody,
                    UserId: userId
                };
                
                response = await axios.post(
                    `${process.env.REACT_APP_API_URL}/api/male-health-tracker`,
                    postRequestBody,
                    {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json'
                        }
                    }
                );
            }

            console.log('Дані успішно збережено');
            
            setExistingRecord(response.data);
            setInitialFormData(formData);
            setIsFormChanged(false);
            
            navigate('/health/gender/male');
            
        } catch (error) {
            if (error.response?.status === 401) {
                localStorage.removeItem('helth-token');
                localStorage.removeItem('user-id');
                navigate('/login');
                return;
            }
            console.error('Помилка при відправці даних:', error);
        }
    };

    const handleSaveClick = () => {
        if (isSaveButtonDisabled) return;
        sendDataToServer();
    };

    // Загальна функція для обробки змін у полях
    const handleHormoneChange = (value, fieldName, maxValue, decimalPlaces = 1) => {
        // Дозволяємо тільки цифри та крапки
        value = value.replace(/[^0-9.]/g, '');
        // Замінюємо кому на крапку
        value = value.replace(/,/g, '.');
        // Не дозволяємо крапку на початку
        if (value.startsWith('.')) {
            return '';
        }
        // Перевіряємо кількість крапок
        if ((value.match(/\./g) || []).length > 1) {
            const parts = value.split('.');
            value = parts[0] + '.' + parts.slice(1).join('');
        }
        
        if (value.includes('.')) {
            const parts = value.split('.');
            let beforeDot = parts[0];
            let afterDot = parts[1] || '';
            // Обмежуємо цифри перед крапкою
            beforeDot = beforeDot.slice(0, 5);
            // Видаляємо ведучі нулі
            if (beforeDot.length > 1 && beforeDot.startsWith('0') && beforeDot !== '0') {
                beforeDot = beforeDot.replace(/^0+/, '');
            }
            // Обмежуємо цифри після крапки
            afterDot = afterDot.slice(0, decimalPlaces);
            // Перевіряємо максимальне значення
            if (beforeDot && parseFloat(beforeDot) > maxValue) {
                beforeDot = maxValue.toString();
                afterDot = '0'.repeat(decimalPlaces);
            }
            return beforeDot + '.' + afterDot;
        } else {
            value = value.slice(0, 5);
            // Видаляємо ведучі нулі
            if (value.length > 1 && value.startsWith('0') && value !== '0') {
                value = value.replace(/^0+/, '');
            }
            // Перевіряємо максимальне значення
            if (value && parseFloat(value) > maxValue) {
                value = maxValue.toString();
            }
            return value;
        }
    };

    // Функції для кожного поля з їх специфічними обмеженнями
    const handleTestosteroneChange = (value) => {
    // норма ~300-1000 ng/dL, даємо запас до 1500
    return handleHormoneChange(value, 'testosterone', 1500, 1);
};

const handleFreeTestosteroneChange = (value) => {
    // норма ~5-21 ng/dL, запас до 50
    return handleHormoneChange(value, 'freeTestosterone', 50, 2);
};

const handleLHChange = (value) => {
    // норма ~1.8-8.6 mIU/L, запас до 50; крок 0.1 бо часто є дробові значення
    return handleHormoneChange(value, 'lh', 50, 1);
};

const handleFSHChange = (value) => {
    // норма ~1.5-12.4 mIU/L, запас до 50; крок 0.1
    return handleHormoneChange(value, 'fsh', 50, 1);
};

const handleProlactinChange = (value) => {
    // норма ~4-15 ng/mL, при пролактиномах буває кілька сотень — даємо запас до 200
    return handleHormoneChange(value, 'prolactin', 200, 1);
};

const handleEstradiolChange = (value) => {
    // норма ~10-40 pg/mL, запас до 200
    return handleHormoneChange(value, 'estradiol', 200, 1);
};

    // Функція для обробки натискання клавіш
    const handleHormoneKeyPress = (e, currentValue, maxValue, decimalPlaces = 1) => {
        // Дозволяємо цифри та крапки
        if (!/[0-9.]/.test(e.key)) {
            e.preventDefault();
            return;
        }
        
        if (e.key === '.') {
            if (currentValue === '' || currentValue.includes('.')) {
                e.preventDefault();
                return;
            }
            const parts = currentValue.split('.');
            const beforeDot = parts[0];
            if (beforeDot && parseFloat(beforeDot) > maxValue) {
                e.preventDefault();
            }
        } else {
            if (currentValue.includes('.')) {
                const parts = currentValue.split('.');
                const beforeDot = parts[0];
                const afterDot = parts[1] || '';
                if (afterDot.length >= decimalPlaces) {
                    e.preventDefault();
                    return;
                }
                const testValue = beforeDot + '.' + afterDot + e.key;
                if (parseFloat(testValue) > maxValue) {
                    e.preventDefault();
                }
            } else {
                const testValue = currentValue + e.key;
                if (testValue && parseFloat(testValue) > maxValue) {
                    e.preventDefault();
                }
            }
        }
    };

    // Функції для кожного поля
    const handleTestosteroneKeyPress = (e) => {
        handleHormoneKeyPress(e, formData.testosterone, 1500, 1);
    };

    const handleFreeTestosteroneKeyPress = (e) => {
        handleHormoneKeyPress(e, formData.freeTestosterone, 50, 2);
    };

    const handleLHKeyPress = (e) => {
        handleHormoneKeyPress(e, formData.lh, 50, 1);
    };

    const handleProlactinKeyPress = (e) => {
        handleHormoneKeyPress(e, formData.prolactin, 50, 1);
    };

    const handleEstradiolKeyPress = (e) => {
        handleHormoneKeyPress(e, formData.estradiol, 200, 1);
    };

    const handleFSHKeyPress = (e) => {
        handleHormoneKeyPress(e, formData.fsh, 200, 1);
    };

    const handleInputChange = (fieldName, value) => {
        setFormData(prev => ({
            ...prev,
            [fieldName]: value
        }));
    };

    // Визначаємо, чи кнопка має бути неактивною
    const isSaveButtonDisabled = !isFormChanged || !hasAnyFieldValue(formData);

    if (isLoading) {
        return null; // або показати спінер завантаження
    }

    return (
        <div className="mh-mhf-page">
            <div className="mhp-header-block">
                <div className="mhp-header-content">
                    <div className="mhp-header-text">
                        <p className="mhp-main-title">{t("mp_male_health")}</p>
                        <p className="mhp-main-subtitle">{t("mp_subtitle_2")}</p>
                    </div>
                    <div className="mhp-header-icon">
                        <img src={nomic} alt="Nomic mascot" className="mhp-nomic-mascot" />
                    </div>
                </div>
            </div>

            <div className="mh-mhf-container">
                <div className="mh-mhf-back-button" onClick={handleBackClick}>
                    <svg width="13" height="25" viewBox="0 0 13 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11 23.0703L3 12.5703L11 2.07031" stroke="white" strokeWidth="4" />
                    </svg>
                    <span>{t("mp_return_back")}</span>
                </div>

                <div className="mh-mhf-hormones-form">
                    <div className="mh-mhf-form-content">
                        <h1 className="mh-mhf-title">{t("hormonas")}</h1>
                        <p className="mh-mhf-subtitle">{t("mp_form_subtitle")}</p>
                        
                        <div className="mh-mhf-form-grid">
                            {/* Перший рядок */}
                            <div className="mh-mhf-form-row">
                                <div className="mh-mhf-input-with-suffix">
                                    <input 
                                        type="text"
                                        inputMode="decimal"
                                        placeholder={t("mp_form_testosterone")}
                                        className="mh-mhf-input"
                                        value={formData.testosterone}
                                        onChange={(e) => {
                                            const processedValue = handleTestosteroneChange(e.target.value);
                                            handleInputChange('testosterone', processedValue);
                                        }}
                                        onKeyPress={handleTestosteroneKeyPress}
                                        maxLength={6}
                                    />
                                    <span className="mh-mhf-input-suffix">{t("mp_form_ng_dl")}</span>
                                </div>
                                
                                <div className="mh-mhf-input-with-suffix">
                                    <input 
                                        type="text"
                                        inputMode="decimal"
                                        placeholder={t("mp_form_prolactin")}
                                        className="mh-mhf-input"
                                        value={formData.prolactin}
                                        onChange={(e) => {
                                            const processedValue = handleProlactinChange(e.target.value);
                                            handleInputChange('prolactin', processedValue);
                                        }}
                                        onKeyPress={handleProlactinKeyPress}
                                        maxLength={5}
                                    />
                                    <span className="mh-mhf-input-suffix">{t("mp_form_ng_ml")}</span>
                                </div>
                            </div>
                            
                            {/* Другий рядок */}
                            <div className="mh-mhf-form-row">
                                <div className="mh-mhf-input-with-suffix">
                                    <input 
                                        type="text"
                                        inputMode="decimal"
                                        placeholder={t("mp_form_free_testosterone")}
                                        className="mh-mhf-input"
                                        value={formData.freeTestosterone}
                                        onChange={(e) => {
                                            const processedValue = handleFreeTestosteroneChange(e.target.value);
                                            handleInputChange('freeTestosterone', processedValue);
                                        }}
                                        onKeyPress={handleFreeTestosteroneKeyPress}
                                        maxLength={6}
                                    />
                                    <span className="mh-mhf-input-suffix">{t("mp_form_ng_dl")}</span>
                                </div>
                                
                                <div className="mh-mhf-input-with-suffix">
                                    <input 
                                        type="text"
                                        inputMode="decimal"
                                        placeholder={t("mp_form_estradiol")}
                                        className="mh-mhf-input"
                                        value={formData.estradiol}
                                        onChange={(e) => {
                                            const processedValue = handleEstradiolChange(e.target.value);
                                            handleInputChange('estradiol', processedValue);
                                        }}
                                        onKeyPress={handleEstradiolKeyPress}
                                        maxLength={5}
                                    />
                                    <span className="mh-mhf-input-suffix">{t("mp_form_pg_ml")}</span>
                                </div>
                            </div>
                            
                            {/* Третій рядок */}
                            <div className="mh-mhf-form-row">
                                <div className="mh-mhf-input-with-suffix">
                                    <input 
                                        type="text"
                                        inputMode="decimal"
                                        placeholder={t("mp_form_lh")}
                                        className="mh-mhf-input"
                                        value={formData.lh}
                                        onChange={(e) => {
                                            const processedValue = handleLHChange(e.target.value);
                                            handleInputChange('lh', processedValue);
                                        }}
                                        onKeyPress={handleLHKeyPress}
                                        maxLength={5}
                                    />
                                    <span className="mh-mhf-input-suffix">{t("mp_form_mO_l")}</span>
                                </div>
                                
                                <div className="mh-mhf-input-with-suffix">
                                    <input 
                                        type="text"
                                        inputMode="decimal"
                                        placeholder={t("mp_form_fsh")}
                                        className="mh-mhf-input"
                                        value={formData.fsh}
                                        onChange={(e) => {
                                            const processedValue = handleFSHChange(e.target.value);
                                            handleInputChange('fsh', processedValue);
                                        }}
                                        onKeyPress={handleFSHKeyPress}
                                        maxLength={5}
                                    />
                                    <span className="mh-mhf-input-suffix">{t("mp_form_mO_l")}</span>
                                </div>
                            </div>
                        </div>
                        
                        <div 
                            className={`mh-mhf-save-button ${isSaveButtonDisabled ? 'mh-mhf-save-button-disabled' : ''}`} 
                            onClick={handleSaveClick}
                        >
                            {t("mp_form_save_btn")}
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    );
}

export default MaleHormonesFormPage;