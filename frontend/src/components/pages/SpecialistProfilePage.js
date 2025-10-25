import React, { useEffect, useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import useNotification from '../../hooks/useNotification';
import NotificationContainer from '../elements/Notification/NotificationContainer';

// Import components
import ProfilePhoto from '../elements/SpecialistProfile/ProfilePhoto/ProfilePhoto';
import InfoField from '../elements/SpecialistProfile/InfoFields/InfoField';
import BiographyField from '../elements/SpecialistProfile/BiographyField/BiographyField';
import SkillsSection from '../elements/SpecialistProfile/SkillsSection';
import { ALL_SKILLS } from '../elements/SpecialistProfile/skills.data';
import { saveRoleDetails, updateProfessionalQualification } from '../services/ProfessionalQualificationService';
import { 
    getSpecialistDetails, 
    createSpecialistDetails, 
    updateSpecialistDetails 
} from '../services/SpecialistDetailsService';
import CertificatesSection from '../elements/SpecialistProfile/CertificatesSection/CertificatesSection';
import WorkFormatSection from '../elements/SpecialistProfile/WorkFormatSection/WorkFormatSection';
import SaveButton from '../elements/SpecialistProfile/SaveButton/SaveButton';
import ProfileToggle from '../elements/SpecialistProfile/ProfileToggle/ProfileToggle';

// Import CSS
import '../elements/SpecialistProfile/SpecialistProfile.css';

// Конвертує порожній рядок у null для валідації на бекенді
const emptyToNull = (value) => {
  if (value === "" || value === undefined) return null;
  return value;
};

// Конвертує перекладений текст навичок назад в ключі перекладу
const convertTranslatedSkillsToKeys = (translatedSkills, allSkills, t) => {
  console.log("convertTranslatedSkillsToKeys - вхідні дані:", translatedSkills);
  
  // Якщо передано рядок замість масиву, конвертуємо в масив
  if (typeof translatedSkills === 'string') {
    console.log("Передано рядок, конвертуємо в масив");
    translatedSkills = translatedSkills.trim() ? [translatedSkills.trim()] : [];
  }
  
  if (!translatedSkills || !Array.isArray(translatedSkills)) {
    console.log("Невалідні дані, повертаємо порожній масив");
    return [];
  }
  
  // Фільтруємо порожні рядки та пробіли
  const filteredSkills = translatedSkills.filter(skill => skill && skill.trim() !== '');
  console.log("Відфільтровані навички:", filteredSkills);
  
  const result = filteredSkills.map(translatedSkill => {
    // Знаходимо ключ, для якого переклад дорівнює перекладеному тексту
    const foundKey = allSkills.find(skillKey => t(skillKey) === translatedSkill);
    console.log(`Шукаємо ключ для "${translatedSkill}":`, foundKey);
    return foundKey || translatedSkill; // Якщо не знайдено, повертаємо оригінал
  });
  
  console.log("Результат конвертації:", result);
  return result;
};

// Константа з мапінгом ключів на тексти для fallback
const WORK_FORMAT_TRANSLATIONS = {
  uk: {
    'work_format_online_telegram': 'Онлайн супровід у Telegram',
    'work_format_offline_gym': 'Офлайн тренування в залі (за домовленістю)',
    'work_format_weekly_plan': 'Щотижневі корекції плану',
    'work_format_online_zoom': 'Онлайн консультації через Zoom',
    'work_format_office_sessions': 'Очні сесії в кабінеті (за домовленістю)',
    'work_format_therapy_plans': 'Щотижневі терапевтичні плани',
    'work_format_clinic_visits': 'Очні прийоми в клініці (за домовленістю)',
    'work_format_prevention_plans': 'Плани профілактики та лікування',
    'work_format_nutrition_plan': 'Щотижневі корекції плану харчування'
  },
  en: {
    'work_format_online_telegram': 'Online support in Telegram',
    'work_format_offline_gym': 'Offline training in gym (by appointment)',
    'work_format_weekly_plan': 'Weekly plan corrections',
    'work_format_online_zoom': 'Online consultations via Zoom',
    'work_format_office_sessions': 'In-person sessions in office (by appointment)',
    'work_format_therapy_plans': 'Weekly therapy plans',
    'work_format_clinic_visits': 'In-person visits at clinic (by appointment)',
    'work_format_prevention_plans': 'Prevention and treatment plans',
    'work_format_nutrition_plan': 'Weekly nutrition plan corrections'
  }
};

// Конвертує перекладений текст форматів роботи назад в ключі перекладу
const convertTranslatedWorkFormatsToKeys = (translatedFormats, allTemplates, t) => {
  if (!translatedFormats || !Array.isArray(translatedFormats)) return [];
  
  return translatedFormats.map(translatedFormat => {
    const foundKey = allTemplates.find(templateKey => t(templateKey) === translatedFormat);
    return foundKey || translatedFormat;
  });
};

const SpecialistsProfilePage = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { notifications, showSuccess, showError, showInfo, removeNotification } = useNotification();
    
    // State management
    const [qualificationData, setQualificationData] = useState(null);
    const [specialistType, setSpecialistType] = useState(null);
    const [userName, setUserName] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [hasChanges, setHasChanges] = useState(false);
    const [professionalRoleTypeId, setProfessionalRoleTypeId] = useState(null);
    
    // Form fields
    const [formFields, setFormFields] = useState({
        hourlyRate: '',
        experience: '',
        biography: '',
        contactEmail: '',
        contactPhone: '',
        website: '',
        facebook: ''
    });
    
    // Skills and certificates
    const [skills, setSkills] = useState([]);
    const [certificates, setCertificates] = useState([]);
    const [workFormats, setWorkFormats] = useState([]);
    const [profilePhotoUrl, setProfilePhotoUrl] = useState('');
    
    // Photo upload states
    const [avatarFile, setAvatarFile] = useState(null);
    const [avatarPreview, setAvatarPreview] = useState('');

    // Available skills based on specialist type
    const availableSkills = {
        trainer: [
            'Силові тренування', 'Кардіо-тренування', 'Фітнес для дітей', 
            'Реабілітаційні вправи', 'Мотивація клієнтів', 'Індивідуальні програми',
            'Групові заняття', 'Контроль балансу БЖВ', 'Йога', 'Танці'
        ],
        doctor: [
            'Загальна практика', 'Профілактична медицина', 'Внутрішні хвороби',
            'Сімейна медицина', 'Кардіологія', 'Неврологія'
        ],
        psychologist: [
            'Когнітивно-поведінкова терапія', 'Психоаналіз', 'Сімейна терапія',
            'Групова терапія', 'Арт-терапія', 'Дитяча психологія'
        ],
        dietitian: [
            'Спортивне харчування', 'Планування раціону', 'Дієтологія для схуднення',
            'Дитяче харчування', 'Діабетичне харчування', 'Вегетаріанське харчування'
        ]
    };

    const getSpecialistType = () => {
        return localStorage.getItem("specialist-profile");
    };

    // Функція для оновлення токена користувача
    const refreshUserToken = async () => {
        try {
            const currentToken = localStorage.getItem("helth-token");
            if (!currentToken) return;

            // Отримуємо дані користувача з поточного токена
            const tokenPayload = JSON.parse(atob(currentToken.split('.')[1]));
            const userEmail = tokenPayload.email;

            // Виконуємо новий логін для отримання оновленого токена з ролями
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/Auth/login`, {
                email: userEmail,
                password: "dummy" // Потрібно зберегти пароль або використовувати інший метод
            });

            if (response.data && response.data.token) {
                localStorage.setItem("helth-token", response.data.token);
                console.log("Token refreshed successfully");
            }
        } catch (error) {
            console.error("Error refreshing token:", error);
            // Не показуємо помилку користувачу, оскільки це не критично
        }
    };

    // Load specialist data
    const fetchSpecialistData = useCallback(async () => {
        console.log("=== ПОЧАТОК ЗАВАНТАЖЕННЯ ДАНИХ СПЕЦІАЛІСТА ===");
        try {
            const token = localStorage.getItem("helth-token");
            console.log("Token exists:", !!token);
            if (!token) {
                console.log("No token found, redirecting to login");
                navigate("/login");
                return;
            }

            // Отримуємо всі типи кваліфікацій для порівняння
            const typesResponse = await axios.get(
                `${process.env.REACT_APP_API_URL}/api/ProfessionalQualification/types`,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );

            console.log("=== ВСІ ТИПИ КВАЛІФІКАЦІЙ ===");
            console.log("Types from API:", typesResponse.data);

            // ПОРІВНЯННЯ ТИПІВ - ВИКОНУЄМО ЗАВЖДИ
            const specialistTypeFromStorage = getSpecialistType();
            console.log("=== ПОРІВНЯННЯ ТИПІВ ===");
            console.log("Specialist type from localStorage:", specialistTypeFromStorage);
            
            // Знаходимо ID кваліфікації по типу спеціаліста
            const matchingType = typesResponse.data.find(type => 
                type.Name === specialistTypeFromStorage
            );
            
            if (matchingType) {
                setProfessionalRoleTypeId(matchingType.Id);
                // console.log("=== ЗНАЙДЕНИЙ ID КВАЛІФІКАЦІЇ ===");
                // console.log("Matching type found:", matchingType);
                // console.log("Qualification ID for", specialistTypeFromStorage, ":", matchingType.Id);
                // console.log("=== ДЕТАЛЬНА ІНФОРМАЦІЯ ПРО ЗБІГ ===");
                // console.log("Тип з localStorage:", specialistTypeFromStorage);
                // console.log("Знайдений тип в API:", matchingType.Name);
                // console.log("ID знайденого типу:", matchingType.Id);
                // console.log("Опис типу:", matchingType.Description);
                // console.log("Годинна ставка за замовчуванням:", matchingType.DefaultHourlyRate);
            } else {
                // console.log("=== ПОМИЛКА: ТИП НЕ ЗНАЙДЕНО ===");
                // console.log("No matching type found for:", specialistTypeFromStorage);
                // console.log("Available types:", typesResponse.data.map(t => t.Name));
                // console.log("=== СПРОБА ЗНАЙТИ ЧАСТКОВИЙ ЗБІГ ===");
                const partialMatch = typesResponse.data.find(type => 
                    type.Name.toLowerCase() === specialistTypeFromStorage.toLowerCase()
                );
                if (partialMatch) {
                    console.log("Знайдено частковий збіг (без урахування регістру):", partialMatch);
                }
            }

            const response = await axios.get(
                `${process.env.REACT_APP_API_URL}/api/ProfessionalQualification/my-qualifications`,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );

            const qualifications = response.data;
            console.log("=== МОЇ КВАЛІФІКАЦІЇ ===");
            console.log("My qualifications:", qualifications);

            if (qualifications && qualifications.length > 0) {
                const currentQualification = qualifications[0]; // Take the first one
                setQualificationData(currentQualification);
                setUserName(currentQualification.User?.FullName || '');
                
                console.log("Current qualification data:", currentQualification);
                
                setSpecialistType(specialistTypeFromStorage);
                
                // Extract skills based on specialist type
                let extractedSkills = [];
                if (specialistTypeFromStorage === 'Trainer' && currentQualification.TrainerDetails) {
                    console.log("=== ДІАГНОСТИКА НАВИЧОК ТРЕНЕРА ===");
                    console.log("TrainingStyle з бекенду:", currentQualification.TrainerDetails.TrainingStyle);
                    console.log("Тип TrainingStyle:", typeof currentQualification.TrainerDetails.TrainingStyle);
                    console.log("Чи є масивом:", Array.isArray(currentQualification.TrainerDetails.TrainingStyle));
                    
                    extractedSkills = currentQualification.TrainerDetails.TrainingStyle || [];
                    
                    // Якщо TrainingStyle є рядком, конвертуємо в масив
                    if (typeof extractedSkills === 'string') {
                        console.log("TrainingStyle є рядком, конвертуємо в масив");
                        extractedSkills = extractedSkills.trim() ? [extractedSkills.trim()] : [];
                    }
                    
                    // Фільтруємо порожні рядки та пробіли
                    extractedSkills = extractedSkills.filter(skill => skill && skill.trim() !== '');
                    
                    console.log("extractedSkills після обробки:", extractedSkills);
                } else if (specialistTypeFromStorage === 'Doctor' && currentQualification.DoctorDetails) {
                    extractedSkills = currentQualification.DoctorDetails.Specializations || [];
                } else if (specialistTypeFromStorage === 'Psychologist' && currentQualification.PsychologistDetails) {
                    extractedSkills = currentQualification.PsychologistDetails.Specializations || [];
                } else if (specialistTypeFromStorage === 'Dietitian' && currentQualification.DietitianDetails) {
                    extractedSkills = currentQualification.DietitianDetails.Specializations || [];
                }
                
                // Конвертуємо перекладений текст назад в ключі перекладу
                const skillKeys = convertTranslatedSkillsToKeys(extractedSkills, ALL_SKILLS, t);
                console.log("skillKeys після конвертації:", skillKeys);
                setSkills(skillKeys);
                
                // Extract form fields
                const details = currentQualification.TrainerDetails || 
                               currentQualification.DoctorDetails || 
                               currentQualification.PsychologistDetails || 
                               currentQualification.DietitianDetails;
                
                // Extract certificates
                const extractedCertificates = details?.Certifications || [];
                setCertificates(extractedCertificates.map((cert, index) => ({
                    id: index,
                    name: cert,
                    url: '',
                    type: 'text'
                })));
                
                // Extract work formats
                const extractedWorkFormats = currentQualification.WorkFormat || [];
                
                // Отримуємо всі доступні шаблони для конвертації
                const allWorkFormatTemplates = [
                    'work_format_online_telegram',
                    'work_format_offline_gym', 
                    'work_format_weekly_plan',
                    'work_format_online_zoom',
                    'work_format_office_sessions',
                    'work_format_therapy_plans',
                    'work_format_clinic_visits',
                    'work_format_prevention_plans',
                    'work_format_nutrition_plan'
                ];
                
                // Конвертуємо перекладений текст назад в ключі перекладу
                const workFormatKeys = convertTranslatedWorkFormatsToKeys(extractedWorkFormats, allWorkFormatTemplates, t);
                // Видаляємо дублікати, зберігаючи порядок
                const uniqueWorkFormatKeys = [...new Set(workFormatKeys)];
                setWorkFormats(uniqueWorkFormatKeys);
                
                if (details) {
                    setFormFields({
                        hourlyRate: currentQualification.HourlyRate?.toString() || details.HourlyRate?.toString() || null,
                        experience: details.YearsOfExperience?.toString() || currentQualification.YearsOfExperience?.toString() || null,
                        biography: details.Biography || null,
                        contactEmail: details.ContactEmail || null,
                        contactPhone: details.ContactPhone || null,
                        website: details.Website || null,
                        facebook: null
                    });
                    
                    setProfilePhotoUrl(details.CardPictureUrl || '');
                }
            }
        } catch (error) {
            console.error("=== ПОМИЛКА ПРИ ЗАВАНТАЖЕННІ ДАНИХ СПЕЦІАЛІСТА ===");
            console.error("Error fetching specialist data:", error);
            console.error("Error details:", error.response?.data);
            console.error("Error status:", error.response?.status);
        } finally {
            console.log("=== ЗАВЕРШЕННЯ ЗАВАНТАЖЕННЯ ДАНИХ ===");
            setIsLoading(false);
        }
    }, [navigate]);

    useEffect(() => {
        fetchSpecialistData();
    }, [fetchSpecialistData]);

    // Set specialist type from localStorage immediately on mount
    useEffect(() => {
        const specialistTypeFromStorage = localStorage.getItem("specialist-profile");
        if (specialistTypeFromStorage) {
            setSpecialistType(specialistTypeFromStorage);
        }
    }, []);

    // Handle form field changes
    const handleFieldChange = (fieldName, value) => {
        setFormFields(prev => ({
            ...prev,
            [fieldName]: value
        }));
        setHasChanges(true);
    };

    // Handle work formats change
    const handleWorkFormatsChange = (formats) => {
        // Видаляємо дублікати, зберігаючи порядок
        const uniqueFormats = [...new Set(formats)];
        setWorkFormats(uniqueFormats);
        setHasChanges(true);
    };

    // Handle skills change
    const handleSkillsChange = (newSkills) => {
        setSkills(newSkills);
        setHasChanges(true);
    };

    // Handle certificates change
    const handleCertificatesChange = (newCertificates) => {
        setCertificates(newCertificates);
        setHasChanges(true);
    };

    // Handle photo update
    const handlePhotoUpdate = (newPhotoUrl) => {
        setProfilePhotoUrl(newPhotoUrl);
        setHasChanges(true);
    };

    // Handle file selection for photo upload
    const handleFileSelect = (file) => {
        setAvatarFile(file);
        setHasChanges(true);
    };

    // Handle save
    const handleSave = async () => {
        if (!hasChanges) return;
        
        setIsSaving(true);
        try {
            const token = localStorage.getItem("helth-token");
            
            // Завантажуємо фото, якщо є новий файл (тільки для існуючих спеціалістів)
            if (avatarFile && qualificationData) {
                try {
                    const formData = new FormData();
                    formData.append('file', avatarFile);
                    formData.append('specialistId', qualificationData.Id); // ID кваліфікації
                    formData.append('imageType', 'card');
                    
                    const response = await axios.post(
                        `${process.env.REACT_APP_API_URL}/api/SpecialistImage/upload-by-id`,
                        formData,
                        {
                            headers: {
                                'Authorization': `Bearer ${token}`,
                                'Content-Type': 'multipart/form-data'
                            }
                        }
                    );
                    
                    if (response.data && response.data.ImageUrl) {
                        // Видалити префікс minio:9000/images/ якщо є
                        let cleanUrl = response.data.ImageUrl;
                        if (cleanUrl.startsWith('minio:9000/images/')) {
                            cleanUrl = cleanUrl.substring('minio:9000/images/'.length);
                        }
                        
                        // Примусово оновлюємо URL зображення з timestamp
                        const timestamp = new Date().getTime();
                        setProfilePhotoUrl(`${cleanUrl}?t=${timestamp}`);
                        setAvatarFile(null); // Очищаємо файл після успішного завантаження
                        
                        // Показуємо повідомлення про успішне оновлення
                        showSuccess('Фото успішно оновлено!');
                        
                        // Примусово оновлюємо компонент
                        window.location.reload();
                    }
                } catch (error) {
                    console.error('Помилка завантаження фото:', error);
                    showError('Помилка завантаження фото: ' + error.message);
                }
            }
            
            // Якщо кваліфікація не існує, створюємо нову
            if (!qualificationData) {
                console.log("=== СТВОРЕННЯ НОВОЇ КВАЛІФІКАЦІЇ ===");
                
                if (!professionalRoleTypeId) {
                    throw new Error("Professional role type ID not found");
                }

                console.log("WorkFormat ключі (створення):", workFormats);
                console.log("WorkFormat переклади (створення):", workFormats.map(format => t(format)));
                console.log("Приклад перекладу (створення):", t('work_format_online_telegram'));
                
                // Перекладаємо ключі в текст з fallback логікою
                const translatedWorkFormats = workFormats.map(format => {
                    const translation = t(format);
                    // Якщо переклад повернув ключ (не знайшов переклад), використовуємо fallback
                    if (translation === format) {
                        const currentLang = localStorage.getItem('i18nextLng') || 'uk';
                        return WORK_FORMAT_TRANSLATIONS[currentLang]?.[format] || format;
                    }
                    return translation;
                });
                
                console.log("WorkFormat фінальні переклади (створення):", translatedWorkFormats);
                console.log("🔄 [FRONTEND] Відправляємо WorkFormat при створенні:", translatedWorkFormats);
                
                const createQualificationData = {
                    ProfessionalRoleTypeId: professionalRoleTypeId,
                    HourlyRate: formFields.hourlyRate ? parseFloat(formFields.hourlyRate) : null,
                    Description: formFields.biography || "",
                    WorkFormat: translatedWorkFormats
                    //CertificatesUrl: certificates.length > 0 ? certificates[0].url : "https://kach-running.com"
                };

                console.log("Creating qualification with data:", createQualificationData);

                const response = await axios.post(
                    `${process.env.REACT_APP_API_URL}/api/ProfessionalQualification/apply`,
                    createQualificationData,
                    {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json'
                        }
                    }
                );

                console.log("Qualification created successfully:", response.data);
                
                // Створюємо деталі спеціаліста для нової кваліфікації
                const newQualificationId = response.data.Id;
                const specialistDetailsData = {
                    biography: emptyToNull(formFields.biography),
                    contactEmail: emptyToNull(formFields.contactEmail),
                    contactPhone: emptyToNull(formFields.contactPhone),
                    website: emptyToNull(formFields.website),
                    yearsOfExperience: formFields.experience && !isNaN(parseInt(formFields.experience)) ? parseInt(formFields.experience) : null,
                    certifications: certificates.map(cert => cert.name),
                    availability: emptyToNull(formFields.availability),
                    clientTestimonials: emptyToNull(formFields.clientTestimonials),
                    expertDetailsPictureUrl: emptyToNull(profilePhotoUrl),
                    cardPictureUrl: emptyToNull(profilePhotoUrl)
                };

                // Додаємо специфічні поля для кожного типу спеціаліста
                if (specialistType === 'Doctor') {
                    specialistDetailsData.specializations = skills.map(skill => t(skill));
                    specialistDetailsData.clinicAffiliation = emptyToNull(formFields.clinicAffiliation);
                } else if (specialistType === 'Trainer') {
                    console.log("=== ЗБЕРЕЖЕННЯ НАВИЧОК ТРЕНЕРА (СТВОРЕННЯ) ===");
                    console.log("skills перед обробкою:", skills);
                    
                    // Фільтруємо порожні рядки та пробіли перед збереженням
                    const filteredSkills = skills.filter(skill => skill && skill.trim() !== '');
                    console.log("Відфільтровані skills:", filteredSkills);
                    
                    specialistDetailsData.trainingStyle = filteredSkills.map(skill => t(skill));
                    console.log("trainingStyle для відправки:", specialistDetailsData.trainingStyle);
                    
                    specialistDetailsData.preferredWorkoutStyles = formFields.preferredWorkoutStyles || [];
                    specialistDetailsData.hourlyRate = formFields.hourlyRate ? parseFloat(formFields.hourlyRate) : null;
                } else if (specialistType === 'Dietitian') {
                    specialistDetailsData.specializations = skills.map(skill => t(skill));
                    specialistDetailsData.nutritionalApproach = emptyToNull(formFields.nutritionalApproach);
                } else if (specialistType === 'Psychologist') {
                    specialistDetailsData.specializations = skills.map(skill => t(skill));
                    specialistDetailsData.therapyApproaches = formFields.therapyApproaches || [];
                }

                // Створюємо деталі спеціаліста
                await createSpecialistDetails(newQualificationId, specialistType, specialistDetailsData, token);
                
                // Завантажуємо фото після створення кваліфікації та деталей (для нових спеціалістів)
                if (avatarFile) {
                    try {
                        console.log("=== ЗАВАНТАЖЕННЯ ФОТО ДЛЯ НОВОГО СПЕЦІАЛІСТА ===");
                        const formData = new FormData();
                        formData.append('file', avatarFile);
                        formData.append('specialistId', newQualificationId); // ID нової кваліфікації
                        formData.append('imageType', 'card');
                        
                        const photoResponse = await axios.post(
                            `${process.env.REACT_APP_API_URL}/api/SpecialistImage/upload-by-id`,
                            formData,
                            {
                                headers: {
                                    'Authorization': `Bearer ${token}`,
                                    'Content-Type': 'multipart/form-data'
                                }
                            }
                        );
                        
                        if (photoResponse.data && photoResponse.data.ImageUrl) {
                            // Видалити префікс minio:9000/images/ якщо є
                            let cleanUrl = photoResponse.data.ImageUrl;
                            if (cleanUrl.startsWith('minio:9000/images/')) {
                                cleanUrl = cleanUrl.substring('minio:9000/images/'.length);
                            }
                            
                            console.log("Фото успішно завантажено для нового спеціаліста:", cleanUrl);
                            setProfilePhotoUrl(cleanUrl); // Update the photo URL
                            setAvatarFile(null); // Очищаємо файл після успішного завантаження
                        }
                    } catch (error) {
                        console.error('Помилка завантаження фото для нового спеціаліста:', error);
                        // Не показуємо помилку користувачу, оскільки основні дані вже збережені
                    }
                }
                
                // Оновлюємо дані після створення
                await fetchSpecialistData();
                
                // Переавторизуємо користувача для отримання нового токена з ролями
                await refreshUserToken();
                
                setHasChanges(false);
                showSuccess(t("sp_save_success") || "Кваліфікацію та деталі успішно створено!");
                
                // Redirect to specialists page to see the new specialist
                setTimeout(() => {
                    navigate('/specialists');
                }, 1500); // Give user time to see success message
            } else {
                // Якщо кваліфікація існує, оновлюємо її
                console.log("=== ОНОВЛЕННЯ ІСНУЮЧОЇ КВАЛІФІКАЦІЇ ===");
                
                const qualificationId = qualificationData.Id;
                
                // Підготовка даних для деталей спеціаліста
                const specialistDetailsData = {
                    biography: emptyToNull(formFields.biography),
                    contactEmail: emptyToNull(formFields.contactEmail),
                    contactPhone: emptyToNull(formFields.contactPhone),
                    website: emptyToNull(formFields.website),
                    yearsOfExperience: formFields.experience && !isNaN(parseInt(formFields.experience)) ? parseInt(formFields.experience) : null,
                    certifications: certificates.map(cert => cert.name),
                    availability: emptyToNull(formFields.availability),
                    clientTestimonials: emptyToNull(formFields.clientTestimonials),
                    expertDetailsPictureUrl: emptyToNull(profilePhotoUrl),
                    cardPictureUrl: emptyToNull(profilePhotoUrl)
                };

                // Додаємо специфічні поля для кожного типу спеціаліста
                if (specialistType === 'Doctor') {
                    specialistDetailsData.specializations = skills.map(skill => t(skill));
                    specialistDetailsData.clinicAffiliation = emptyToNull(formFields.clinicAffiliation);
                } else if (specialistType === 'Trainer') {
                    console.log("=== ЗБЕРЕЖЕННЯ НАВИЧОК ТРЕНЕРА (ОНОВЛЕННЯ) ===");
                    console.log("skills перед обробкою:", skills);
                    
                    // Фільтруємо порожні рядки та пробіли перед збереженням
                    const filteredSkills = skills.filter(skill => skill && skill.trim() !== '');
                    console.log("Відфільтровані skills:", filteredSkills);
                    
                    specialistDetailsData.trainingStyle = filteredSkills.map(skill => t(skill));
                    console.log("trainingStyle для відправки:", specialistDetailsData.trainingStyle);
                    
                    specialistDetailsData.preferredWorkoutStyles = formFields.preferredWorkoutStyles || [];
                    specialistDetailsData.hourlyRate = formFields.hourlyRate ? parseFloat(formFields.hourlyRate) : null;
                } else if (specialistType === 'Dietitian') {
                    specialistDetailsData.specializations = skills.map(skill => t(skill));
                    specialistDetailsData.nutritionalApproach = emptyToNull(formFields.nutritionalApproach);
                } else if (specialistType === 'Psychologist') {
                    specialistDetailsData.specializations = skills.map(skill => t(skill));
                    specialistDetailsData.therapyApproaches = formFields.therapyApproaches || [];
                }

                // Оновлюємо WorkFormat через UpdateQualification endpoint
                console.log("WorkFormat ключі:", workFormats);
                console.log("WorkFormat переклади:", workFormats.map(format => t(format)));
                console.log("Приклад перекладу:", t('work_format_online_telegram'));
                
                // Перекладаємо ключі в текст з fallback логікою
                const translatedWorkFormats = workFormats.map(format => {
                    const translation = t(format);
                    // Якщо переклад повернув ключ (не знайшов переклад), використовуємо fallback
                    if (translation === format) {
                        const currentLang = localStorage.getItem('i18nextLng') || 'uk';
                        return WORK_FORMAT_TRANSLATIONS[currentLang]?.[format] || format;
                    }
                    return translation;
                });
                
                console.log("WorkFormat фінальні переклади:", translatedWorkFormats);
                console.log("🔄 [FRONTEND] Відправляємо WorkFormat при оновленні:", translatedWorkFormats);
                
                const qualificationUpdateData = {
                    Description: formFields.biography || "",
                    HourlyRate: formFields.hourlyRate ? parseFloat(formFields.hourlyRate) : null,
                    WorkFormat: translatedWorkFormats
                };
                
                console.log("Updating qualification with WorkFormat:", qualificationUpdateData);
                await updateProfessionalQualification(qualificationId, qualificationUpdateData, token);

                // Перевіряємо, чи існують деталі спеціаліста
                try {
                    await getSpecialistDetails(qualificationId, specialistType, token);
                    // Якщо деталі існують, оновлюємо їх
                    await updateSpecialistDetails(qualificationId, specialistType, specialistDetailsData, token);
                } catch (error) {
                    if (error.message.includes('не знайдені')) {
                        // Якщо деталі не існують, створюємо нові
                        await createSpecialistDetails(qualificationId, specialistType, specialistDetailsData, token);
                    } else {
                        throw error;
                    }
                }

                // Завантажуємо фото після оновлення деталей (для існуючих спеціалістів)
                if (avatarFile) {
                    try {
                        console.log("=== ЗАВАНТАЖЕННЯ ФОТО ДЛЯ ІСНУЮЧОГО СПЕЦІАЛІСТА ===");
                        const formData = new FormData();
                        formData.append('file', avatarFile);
                        formData.append('specialistId', qualificationId); // ID існуючої кваліфікації
                        formData.append('imageType', 'card');
                        
                        const photoResponse = await axios.post(
                            `${process.env.REACT_APP_API_URL}/api/SpecialistImage/upload-by-id`,
                            formData,
                            {
                                headers: {
                                    'Authorization': `Bearer ${token}`,
                                    'Content-Type': 'multipart/form-data'
                                }
                            }
                        );
                        
                        if (photoResponse.data && photoResponse.data.ImageUrl) {
                            // Видалити префікс minio:9000/images/ якщо є
                            let cleanUrl = photoResponse.data.ImageUrl;
                            if (cleanUrl.startsWith('minio:9000/images/')) {
                                cleanUrl = cleanUrl.substring('minio:9000/images/'.length);
                            }
                            
                            console.log("Фото успішно завантажено для існуючого спеціаліста:", cleanUrl);
                            setAvatarFile(null); // Очищаємо файл після успішного завантаження
                        }
                    } catch (error) {
                        console.error('Помилка завантаження фото для існуючого спеціаліста:', error);
                        // Не показуємо помилку користувачу, оскільки основні дані вже збережені
                    }
                }

                setHasChanges(false);
                showSuccess(t("sp_save_success") || "Дані успішно збережено!");
            }
        } catch (error) {
            console.error("Error saving specialist data:", error);
            showError(t("sp_save_error") || "Помилка збереження даних: " + error.message);
        } finally {
            setIsSaving(false);
        }
    };

    if (isLoading) {
        return <div className="sp-loading">{t("loading")}</div>;
    }

    return (
        <>
            {/* Контейнер уведомлений */}
            <NotificationContainer 
                notifications={notifications}
                onRemove={removeNotification}
            />
            
            <div className="sp-container scroll-data">
                {/* Заголовок */}
                <div className="sp-specialist-type-title">
                    {specialistType ? t(`spec_${specialistType.toLowerCase()}`) : t("specialist")}
                    {/* Debug: {specialistType} */}
                </div>

            {/* Базова інформація - hourly rate та experience */}
            <div className="sp-info-basic">
                <InfoField
                    label="sp_hourly_rate"
                    value={formFields.hourlyRate}
                    onChange={(e) => handleFieldChange('hourlyRate', e.target.value)}
                    placeholder="sp_hourly_rate_placeholder"
                    type="number"
                />
                <InfoField
                    label="sp_experience"
                    value={formFields.experience}
                    onChange={(e) => handleFieldChange('experience', e.target.value)}
                    placeholder="sp_experience_placeholder"
                    type="number"
                />
            </div>

            {/* Рядок для Biography та WorkFormat */}
            <div className="sp-biography-workformat-row">
                <div className="sp-biography-column">
                    <BiographyField
                        label="sp_biography"
                        value={formFields.biography}
                        onChange={(e) => handleFieldChange('biography', e.target.value)}
                        placeholder="sp_biography_placeholder"
                        maxLength={1000}
                    />
                </div>
                <div className="sp-workformat-column">
                    <WorkFormatSection
                        workFormats={workFormats}
                        onWorkFormatsChange={handleWorkFormatsChange}
                        specialistType={qualificationData?.ProfessionalRoleType?.Name}
                    />
                </div>
            </div>

            {/* Соціальні посилання */}
            <div className='sp-socials-links'>
                <InfoField
                    label="sp_website"
                    value={formFields.website}
                    onChange={(e) => handleFieldChange('website', e.target.value)}
                    placeholder="sp_website_placeholder"
                    type="url"
                />
                <InfoField
                    label="sp_facebook"
                    value={formFields.facebook}
                    onChange={(e) => handleFieldChange('facebook', e.target.value)}
                    placeholder="sp_facebook_placeholder"
                />
            </div>
            <div className="sp-skills-column">
                {/* Навички */}
                <SkillsSection
                    allSkills={ALL_SKILLS}
                    value={skills}
                    onChange={handleSkillsChange}
                />
            </div>
            {/* Середня колонка - сертифікати */}
            <div className="sp-certificates-column">
                <CertificatesSection
                    certificates={certificates}
                    onCertificatesChange={handleCertificatesChange}
                />
            </div>

            {/* Права колонка - фото */}
            <div className="sp-main-content">
                <ProfilePhoto
                    specialistName={userName}
                    currentPhotoUrl={profilePhotoUrl}
                    onPhotoUpdate={handlePhotoUpdate}
                    onFileSelect={handleFileSelect}
                />
            </div>

            {/* Футер */}
            <div className="sp-footer">
                <SaveButton
                    onSave={handleSave}
                    hasChanges={hasChanges}
                    isSaving={isSaving}
                />
            </div>
            </div>
        </>
    );
}

export default SpecialistsProfilePage;