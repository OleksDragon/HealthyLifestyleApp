<!-- be0ab6ab-2f77-4562-8e3f-b5cff8a825bf 4856d3f3-8c2d-4445-8387-2e0107e0612c -->
# План розробки сторінки профілю спеціаліста

## 1. Створення структури папок і компонентів

### 1.1 Структура папок

Створити папку `frontend/src/components/elements/SpecialistProfile/` з наступними підпапками:

- `ProfilePhoto/` - компонент для відображення та завантаження фото профілю
- `InfoFields/` - компоненти для полів введення інформації
- `SkillsSection/` - секція з навичками (skills chips з кнопкою видалення)
- `CertificatesSection/` - секція з сертифікатами
- `SaveButton/` - кнопка збереження

скопируй эту кнопку со странички обычного профиля

- `ProfileToggle/` - перемикач профілю спеціаліста

скопируй этот переключатель с профиля обычного пользователя

### 1.2 Основні компоненти

Створити наступні файли:

- `ProfilePhoto/ProfilePhoto.jsx` + `ProfilePhoto.css`
- `InfoFields/InfoField.jsx` + `InfoField.css`
- `SkillsSection/SkillsSection.jsx` + `SkillsSection.css`
- `SkillsSection/SkillChip.jsx` + `SkillChip.css`
- `CertificatesSection/CertificatesSection.jsx` + `CertificatesSection.css`
- `SaveButton/SaveButton.jsx` + `SaveButton.css`
- `ProfileToggle/ProfileToggle.jsx` + `ProfileToggle.css`

## 2. Оновлення SpecialistProfilePage.js

### 2.1 Інтеграція з API

- Використати endpoint `GET /api/ProfessionalQualification/my-qualifications` для отримання даних
- Отримувати навички з полів:
  - **Trainer**: `TrainerDetails.TrainingStyle` (масив)
  - **Doctor**: `DoctorDetails.Specializations` (масив)
  - **Psychologist**: `PsychologistDetails.Specializations` (масив)
  - **Dietitian**: `DietitianDetails.Specializations` (масив)
- Отримувати сертифікати з `Certifications` (масив)

### 2.2 State management

Створити стани для:

```javascript
const [qualificationData, setQualificationData] = useState(null);
const [skills, setSkills] = useState([]);
const [certificates, setCertificates] = useState([]);
const [formFields, setFormFields] = useState({
  hourlyRate: '',
  experience: '',
  licenseNumber: '',
  contactEmail: '',
  contactPhone: '',
  website: '',
  instagram: '',
  facebook: ''
});
const [hasChanges, setHasChanges] = useState(false);
const [isSaving, setIsSaving] = useState(false);
```

## 3. Компонент ProfilePhoto

### 3.1 Функціонал

- Відображення фото профілю спеціаліста (зелена область з Figma)
- Іконка камери для завантаження нового фото
- Використання існуючого `MinIOService` для завантаження
- Відображення URL: `ExpertDetailsPictureUrl` з API

### 3.2 CSS стилізація

Використати CSS змінні з наданого стилю:

```css
.profile-photo-container {
  background-color: var(--variable-collection-lim); /* #D6FF00 - lime */
  border-radius: 40px;
  height: 703px;
  width: 406px;
  position: relative;
}
```

## 4. Компонент InfoFields

### 4.1 Поля для введення

Створити поля згідно з Figma:

- Погодинна ставка (HourlyRate)
- Досвід (роки) (YearsOfExperience)
- Номер професійної ліцензії (ProfessionalLicenseNumber)
- Вебсайт спеціаліста (Website)
- Instagram (з ContactEmail або окреме поле)
- Facebook (з ContactPhone або окреме поле)

### 4.2 Стилізація полів

```css
.info-field {
  background-color: rgba(255, 255, 255, 0.08); /* #ffffff0d */
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 40px;
  padding: 12px 20px;
  color: #ffffff;
}
```

## 5. Компонент SkillsSection

### 5.1 Функціонал навичок

- Відображення навичок у вигляді chips (таблетки)
- Кнопка "X" для видалення навички
- Можливість додавати нові навички
- Динамічне оновлення списку

### 5.2 SkillChip компонент

```jsx
<div className="skill-chip">
  <span className="skill-text">{skillName}</span>
  <CloseRound className="remove-skill" onClick={() => onRemove(skillId)} />
</div>
```

### 5.3 CSS для навичок

```css
.skill-chip {
  background-color: rgba(255, 255, 255, 0.4); /* #ffffff66 */
  border-radius: 40px;
  padding: 10px 20px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.skill-text {
  color: #ffffff;
  font-family: "Roboto-Bold", Helvetica;
  font-size: 16px;
  font-weight: 700;
}
```

## 6. Компонент CertificatesSection

### 6.1 Функціонал сертифікатів

- Відображення списку сертифікатів
- Можливість завантажувати нові сертифікати
- Кнопка "Додати сертифікат" (+)
- Відображення назви завантаженого сертифікату
- Іконка завантаження (download icon)

### 6.2 Структура

```jsx
<div className="certificates-section">
  <h3>Сертифікати</h3>
  <div className="certificate-item">
    <span>Сертифікат 1</span>
    <DownloadIcon />
  </div>
  <button className="add-certificate-btn">
    Додати сертифікат <PlusIcon />
  </button>
</div>
```

## 7. Компонент SaveButton

### 7.1 Функціонал

- Кнопка "Зберегти" активна тільки при наявності змін
- Відображення стану "Збереження..." під час API запиту
- Виклик API для збереження даних

### 7.2 CSS стилізація

```css
.save-button {
  background-color: rgba(255, 255, 255, 0.4);
  border-radius: 100px;
  height: 75px;
  width: 764px;
  color: #ffffff;
  font-size: 20px;
  font-weight: 500;
  cursor: pointer;
}

.save-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
```

## 8. Компонент ProfileToggle

### 8.1 Функціонал перемикача

- Toggle switch у правому нижньому куті
- Текст "Профіль спеціаліста"
- При вимкненні - видалення `specialist-profile` з localStorage
- Перенаправлення на `/profile`

### 8.2 CSS стилізація

```css
.profile-toggle-container {
  display: flex;
  align-items: center;
  gap: 12px;
}

.toggle-switch {
  background-color: #ffffff;
  border-radius: 18px;
  width: 76px;
  height: 40px;
  position: relative;
}

.toggle-slider {
  background-color: var(--variable-collection-lim); /* lime */
  border-radius: 17px;
  width: 34px;
  height: 34px;
  transition: transform 0.3s;
}
```

## 9. Інтеграція API для збереження

### 9.1 Створити метод збереження

- Визначити тип спеціаліста з localStorage (`specialist-profile`)
- Сформувати DTO залежно від типу:
  - **Trainer**: `UpdateTrainerDetailsDto`
  - **Doctor**: `UpdateDoctorDetailsDto`
  - **Psychologist**: `UpdatePsychologistDetailsDto`
  - **Dietitian**: `UpdateDietitianDetailsDto`

### 9.2 API endpoints для оновлення

Потрібно створити нові endpoints у бекенді:

- `PUT /api/ProfessionalQualification/{id}/trainer` - оновлення даних тренера
- `PUT /api/ProfessionalQualification/{id}/doctor` - оновлення даних лікаря
- `PUT /api/ProfessionalQualification/{id}/psychologist` - оновлення даних психолога
- `PUT /api/ProfessionalQualification/{id}/dietitian` - оновлення даних дієтолога

## 10. CSS змінні та глобальні стилі - ДЕТАЛЬНА МАПА ПЕРЕЙМЕНУВАННЯ

### 10.1 Базові CSS змінні (використовуємо як є)

```css
:root {
  --bl: rgba(0, 102, 195, 1);
  --black-gray: rgba(75, 75, 75, 1);
  --lime: rgba(214, 255, 0, 1);
  --roboto-20-font-family: "Roboto", Helvetica;
  --roboto-20-font-size: 20px;
  --roboto-20-font-style: normal;
  --roboto-20-font-weight: 400;
  --roboto-20-letter-spacing: 0px;
  --roboto-20-line-height: normal;
  --variable-collection-bl: rgba(17, 111, 207, 1);
  --variable-collection-black: rgba(52, 52, 52, 1);
  --variable-collection-blu: rgba(6, 97, 204, 1);
  --variable-collection-blue: rgba(0, 0, 0, 0.2);
  --variable-collection-bluee: rgba(134, 176, 214, 1);
  --variable-collection-color: rgba(97, 155, 215, 1);
  --variable-collection-lim: rgba(214, 255, 0, 1);
  --variable-collection-white: rgba(255, 255, 255, 1);
}
```

### 10.2 Мапа перейменування класів Figma → Компоненти

**ГОЛОВНИЙ КОНТЕЙНЕР (SpecialistProfilePage.js)**

- `.box` → `.sp-container`
- `.box .specialist-profile` → `.sp-wrapper`

**PROFILE PHOTO (ProfilePhoto.jsx)**

- `.box .div-2` → `.sp-photo-container` (зелена область 406x703px)
- `.box .vector` → `.sp-photo-icon` (іконка камери)

**LEFT INFO PANEL (InfoFields.jsx)**

- `.box .group-3` → `.sp-info-panel` (ліва панель з полями)

**ПОЛЯ ВВЕДЕННЯ (InfoField.jsx - для кожного поля):**

Перший рядок:

- `.box .rectangle-6` → `.sp-field-hourly-rate`
- `.box .text-wrapper-9` → `.sp-field-label-bold` (для жирних заголовків)
- `.box .rectangle-16` → `.sp-field-experience`
- `.box .text-wrapper-19` → `.sp-field-label-bold`

Другий рядок (навички з X):

- `.box .rectangle-4` → `.sp-skill-chip-large`
- `.box .text-wrapper-7` → `.sp-skill-text`
- `.box .close-round` → `.sp-skill-remove-icon`
- `.box .rectangle-5` → `.sp-skill-chip-medium`
- `.box .text-wrapper-8` → `.sp-skill-text`
- `.box .close-round-instance` → `.sp-skill-remove-icon`

Роздільна лінія:

- `.box .line` → `.sp-divider-line`

Третій рядок:

- `.box .rectangle-7` → `.sp-field-text`
- `.box .text-wrapper-10` → `.sp-field-label-regular`
- `.box .rectangle-8` → `.sp-field-text`
- `.box .text-wrapper-11` → `.sp-field-label-regular`

Четвертий рядок:

- `.box .rectangle-9` → `.sp-field-text`
- `.box .text-wrapper-12` → `.sp-field-label-regular`
- `.box .rectangle-10` → `.sp-field-text`
- `.box .text-wrapper-13` → `.sp-field-label-regular`

П'ятий рядок:

- `.box .rectangle-11` → `.sp-field-text`
- `.box .text-wrapper-14` → `.sp-field-label-regular`
- `.box .rectangle-15` → `.sp-field-text`
- `.box .text-wrapper-18` → `.sp-field-label-regular`

Шостий рядок:

- `.box .rectangle-12` → `.sp-field-text`
- `.box .text-wrapper-15` → `.sp-field-label-regular`
- `.box .rectangle-13` → `.sp-field-small`
- `.box .text-wrapper-16` → `.sp-field-label-regular`
- `.box .rectangle-14` → `.sp-field-small`
- `.box .text-wrapper-17` → `.sp-field-label-regular`

**КНОПКА ЗБЕРЕЖЕННЯ (SaveButton.jsx)**

- `.box .group-4` → `.sp-save-button-wrapper`
- `.box .rectangle-3` → `.sp-save-button`
- `.box .text-wrapper-6` → `.sp-save-button-text`

**SCROLLBAR (custom scrollbar)**

- `.box .rectangle-wrapper` → `.sp-scrollbar-track`
- `.box .rectangle-17` → `.sp-scrollbar-thumb`

**ПЕРЕМИКАЧ ПРОФІЛЮ (ProfileToggle.jsx)**

- `.box .text-wrapper-20` → `.sp-toggle-label`
- `.box .view-wrapper-2` → `.sp-toggle-wrapper`
- `.box .view-2` → `.sp-toggle-switch`
- `.box .rectangle-18` → `.sp-toggle-track`
- `.box .ellipse` → `.sp-toggle-thumb`

**ЗАГОЛОВОК (тип спеціаліста)**

- `.box .text-wrapper-21` → `.sp-specialist-type-title`

### 10.3 Повний CSS файл SpecialistProfile.css

```css
/* Основний контейнер */
.sp-container {
  height: 885px;
  position: relative;
  width: 1406px;
}

.sp-wrapper {
  height: 885px;
  left: 430px;
  position: fixed;
  top: 155px;
  width: 1436px;
}

/* Ліва інформаційна панель */
.sp-info-panel {
  background-color: #ffffff0d;
  border: 1px solid #ffffff4c;
  border-radius: 50px;
  height: 376px;
  left: 0;
  position: absolute;
  top: 380px;
  width: 460px;
}

/* Контейнер фото профілю (зелена область) */
.sp-photo-container {
  background-color: var(--variable-collection-lim);
  border-radius: 40px;
  height: 703px;
  left: 951px;
  position: absolute;
  top: 53px;
  width: 406px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.sp-photo-icon {
  height: 68px;
  left: 1120px;
  position: absolute;
  top: 370px;
  width: 68px;
  cursor: pointer;
}

/* Кнопка збереження */
.sp-save-button-wrapper {
  height: 75px;
  left: 301px;
  position: absolute;
  top: 810px;
  width: 766px;
}

.sp-save-button {
  background-color: #ffffff66;
  border-radius: 100px;
  height: 75px;
  left: 0;
  position: absolute;
  top: 0;
  width: 764px;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s;
}

.sp-save-button:hover {
  background-color: #ffffff80;
}

.sp-save-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.sp-save-button-text {
  align-items: center;
  color: #ffffff;
  display: flex;
  font-family: "Roboto-Medium", Helvetica;
  font-size: 20px;
  font-weight: 500;
  height: 23px;
  justify-content: center;
  left: 336px;
  letter-spacing: 0;
  line-height: normal;
  position: absolute;
  top: 26px;
  white-space: nowrap;
}

/* Навички (Skills chips) */
.sp-skill-chip-large {
  background-color: #ffffff66;
  border-radius: 40px;
  height: 40px;
  left: 25px;
  position: absolute;
  top: 455px;
  width: 233px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 15px;
}

.sp-skill-chip-medium {
  background-color: #ffffff66;
  border-radius: 40px;
  height: 40px;
  left: 283px;
  position: absolute;
  top: 455px;
  width: 151px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 15px;
}

.sp-skill-text {
  align-items: center;
  color: #ffffff;
  display: flex;
  font-family: "Roboto-Bold", Helvetica;
  font-size: 16px;
  font-weight: 700;
  height: 19px;
  letter-spacing: 0;
  line-height: normal;
  white-space: nowrap;
}

.sp-skill-remove-icon {
  height: 24px !important;
  width: 24px !important;
  cursor: pointer;
  transition: opacity 0.2s;
}

.sp-skill-remove-icon:hover {
  opacity: 0.7;
}

/* Поля введення */
.sp-field-hourly-rate,
.sp-field-experience,
.sp-field-text,
.sp-field-small {
  background-color: #ffffff66;
  border-radius: 40px;
  border: none;
  color: #ffffff;
  padding: 10px 20px;
  font-family: "Roboto-Regular", Helvetica;
  font-size: 16px;
  position: absolute;
}

.sp-field-hourly-rate {
  height: 40px;
  left: 25px;
  top: 400px;
  width: 175px;
}

.sp-field-experience {
  height: 40px;
  left: 225px;
  top: 400px;
  width: 196px;
}

.sp-field-text {
  height: 40px;
}

.sp-field-small {
  height: 40px;
  width: 68px;
}

/* Лейбли полів */
.sp-field-label-bold {
  align-items: center;
  color: #ffffff;
  display: flex;
  font-family: "Roboto-Bold", Helvetica;
  font-size: 16px;
  font-weight: 700;
  height: 19px;
  justify-content: center;
  letter-spacing: 0;
  line-height: normal;
  position: absolute;
  white-space: nowrap;
}

.sp-field-label-regular {
  align-items: center;
  color: #ffffff99;
  display: flex;
  font-family: "Roboto-Regular", Helvetica;
  font-size: 16px;
  font-weight: 400;
  height: 19px;
  justify-content: center;
  letter-spacing: 0;
  line-height: normal;
  position: absolute;
  white-space: nowrap;
}

/* Роздільна лінія */
.sp-divider-line {
  height: 1px;
  left: 0;
  object-fit: cover;
  position: absolute;
  top: 512px;
  width: 460px;
  background-color: #ffffff4c;
}

/* Scrollbar */
.sp-scrollbar-track {
  background-color: var(--variable-collection-white);
  border-radius: 40px;
  display: flex;
  height: 850px;
  left: 1390px;
  position: absolute;
  top: 31px;
  width: 16px;
}

.sp-scrollbar-thumb {
  background-color: #0661cc;
  border-radius: 40px;
  height: 90px;
  margin-top: 272px;
  width: 16px;
}

/* Перемикач профілю */
.sp-toggle-label {
  align-items: center;
  color: var(--variable-collection-white);
  display: flex;
  font-family: "Roboto-Medium", Helvetica;
  font-size: 20px;
  font-weight: 500;
  height: 23px;
  justify-content: center;
  left: 1079px;
  letter-spacing: 0;
  line-height: normal;
  position: absolute;
  top: 836px;
  white-space: nowrap;
}

.sp-toggle-wrapper {
  display: flex;
  height: 40px;
  left: 1284px;
  position: absolute;
  top: 828px;
  width: 76px;
}

.sp-toggle-switch {
  background-color: #ffffff;
  border-radius: 18px;
  height: 76px;
  margin-left: 18px;
  margin-top: -18px;
  position: relative;
  transform: rotate(90deg);
  width: 40px;
  cursor: pointer;
}

.sp-toggle-track {
  background-color: #afbbc280;
  border-radius: 16px;
  height: 66px;
  left: 3px;
  position: absolute;
  top: 5px;
  width: 34px;
}

.sp-toggle-thumb {
  background-color: #d6ff00;
  border-radius: 17px;
  height: 34px;
  left: 3px;
  position: absolute;
  top: 3px;
  width: 34px;
  transition: transform 0.3s ease;
}

.sp-toggle-switch.active .sp-toggle-thumb {
  transform: translateY(32px);
}

/* Заголовок типу спеціаліста */
.sp-specialist-type-title {
  align-items: center;
  color: #ffffff;
  display: flex;
  font-family: "Roboto-Bold", Helvetica;
  font-size: 30px;
  font-weight: 700;
  height: 35px;
  justify-content: center;
  left: 6px;
  letter-spacing: 0;
  line-height: normal;
  position: absolute;
  top: 0;
  white-space: nowrap;
}
```

## 11. Переклади (i18n)

Додати ключі перекладу в `frontend/src/i18n.js`:

```javascript
// Українська
sp_hourly_rate: "Погодинна ставка",
sp_experience: "Досвід (роки)",
sp_license_number: "Номер професійної ліцензії",
sp_website: "Вебсайт спеціаліста",
sp_instagram: "Instagram",
sp_facebook: "Facebook",
sp_skills: "Навички",
sp_add_skill: "Додати навичку",
sp_certificates: "Сертифікати",
sp_add_certificate: "Додати сертифікат",
sp_save: "Зберегти",
sp_saving: "Збереження...",
sp_profile_toggle: "Профіль спеціаліста"
```

## 12. Тестування та валідація

### 12.1 Валідація полів

- Перевірка формату email
- Перевірка URL для website
- Перевірка числових значень (hourlyRate, experience)

### 12.2 Обробка помилок

- Відображення помилок API
- Toast notifications для успішного збереження
- Обробка помилок завантаження фото

## Послідовність реалізації:

1. Створити структуру папок та базові компоненти
2. Реалізувати ProfilePhoto з інтеграцією MinIO
3. Створити InfoFields з валідацією
4. Реалізувати SkillsSection з можливістю додавання/видалення
5. Створити CertificatesSection
6. Додати SaveButton з логікою збереження
7. Реалізувати ProfileToggle
8. Інтегрувати всі компоненти в SpecialistProfilePage
9. Додати CSS стилізацію згідно з Figma
10. Додати переклади
11. Тестування та виправлення помилок

### To-dos

- [ ] Створити структуру папок frontend/src/components/elements/SpecialistProfile/ з підпапками для компонентів
- [ ] Створити компонент ProfilePhoto з інтеграцією MinIO для завантаження фото
- [ ] Створити компонент InfoFields з полями для введення даних спеціаліста
- [ ] Створити SkillsSection з можливістю додавання/видалення навичок
- [ ] Створити CertificatesSection з можливістю додавання сертифікатів
- [ ] Створити компонент SaveButton з логікою збереження даних
- [ ] Створити ProfileToggle для перемикання між профілями
- [ ] Оновити SpecialistProfilePage.js з інтеграцією API та всіх компонентів
- [ ] Додати CSS стилізацію згідно з Figma дизайном
- [ ] Додати переклади для всіх текстів у i18n.js
- [ ] Створити API endpoints для оновлення даних спеціаліста (PUT endpoints)
- [ ] Тестування та валідація всіх функцій