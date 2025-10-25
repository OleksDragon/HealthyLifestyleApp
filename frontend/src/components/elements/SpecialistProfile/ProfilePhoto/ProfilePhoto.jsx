import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import './ProfilePhoto.css';

const ProfilePhoto = ({ specialistName, onPhotoUpdate, currentPhotoUrl, onFileSelect }) => {
  const { t } = useTranslation();
  const [avatarPreview, setAvatarPreview] = useState('');

  // Clear preview when actual photo URL is available
  useEffect(() => {
    if (currentPhotoUrl) {
      setAvatarPreview(''); // Clear preview when actual photo URL is available
    }
  }, [currentPhotoUrl]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Перевірка типу файлу
    if (!file.type.startsWith('image/')) {
      alert('Помилка: Виберіть файл зображення');
      return;
    }

    // Перевірка розміру файлу (максимум 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('Помилка: Розмір файлу не повинен перевищувати 5MB');
      return;
    }

    // Зберігаємо файл в батьківському компоненті
    onFileSelect(file);
    
    // Показуємо попередній перегляд
    const reader = new FileReader();
    reader.onload = (e) => {
      setAvatarPreview(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  // Функція для отримання URL зображення через proxy
  const getImageUrl = () => {
    if (avatarPreview) {
      return avatarPreview; // Показуємо попередній перегляд
    }
    
    if (currentPhotoUrl) {
      // Додаємо timestamp для примусового оновлення кешу
      const timestamp = new Date().getTime();
      // Використовуємо proxy endpoint для отримання зображення
      return `${process.env.REACT_APP_API_URL}/api/SpecialistImage/proxy/${currentPhotoUrl}?t=${timestamp}`;
    }
    
    return null;
  };

  const imageUrl = getImageUrl();

  return (
    <div className="sp-photo-container">
      {imageUrl ? (
        <img 
          src={imageUrl} 
          alt={specialistName || 'Specialist Photo'} 
          className="sp-photo-image"
        />
      ) : (
        <div className="sp-photo-placeholder">
          <div className="sp-photo-icon">
            <svg width="69" height="69" viewBox="0 0 69 69" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21.8428 31.7695C15.9558 28.826 6.51193 39.7416 2.52589 45.5673C-0.417639 56.6056 6.81854 63.0455 10.8046 64.8856L49.4384 65.8055L61.3965 62.1261C62.3164 60.8996 64.708 56.9749 66.9157 51.0878C54.9576 52.0077 51.2781 40.0496 45.759 40.0496C40.2399 40.0496 39.32 48.3283 32.8811 48.3283C26.4421 48.3283 29.2017 35.4489 21.8428 31.7695Z" fill="#0661CC" />
              <path d="M62.5501 34.0346C62.5501 26.5645 62.541 21.4332 62.0919 17.5257C61.6561 13.7336 60.8678 11.7972 59.7851 10.4238C59.1584 9.62897 58.4402 8.91074 57.6454 8.28407C56.272 7.20136 54.3355 6.41306 50.5435 5.97725C46.636 5.52818 41.5047 5.51912 34.0346 5.51912C26.5645 5.51912 21.4332 5.52818 17.5257 5.97725C13.7336 6.41306 11.7972 7.20136 10.4238 8.28407C9.62897 8.91074 8.91074 9.62897 8.28407 10.4238C7.20136 11.7972 6.41306 13.7336 5.97725 17.5257C5.52818 21.4332 5.51912 26.5645 5.51912 34.0346C5.51912 41.5047 5.52818 46.636 5.97725 50.5435C6.41306 54.3355 7.20136 56.272 8.28407 57.6454C8.91074 58.4402 9.62897 59.1584 10.4238 59.7851C11.7972 60.8678 13.7336 61.6561 17.5257 62.0919C21.4332 62.541 26.5645 62.5501 34.0346 62.5501V68.0692C19.8152 68.0692 12.4838 68.0686 7.48459 64.4778L7.0067 64.1203C6.01295 63.3368 5.10383 62.4524 4.29205 61.4829L3.9489 61.0625C-0.000637316 56.0525 0 48.7126 0 34.0346C0 19.3565 -0.000637316 12.0167 3.9489 7.0067C4.84437 5.87084 5.87084 4.84437 7.0067 3.9489C12.0167 -0.000637316 19.3565 0 34.0346 0C48.7126 0 56.0525 -0.000637316 61.0625 3.9489C62.1983 4.84437 63.2248 5.87084 64.1203 7.0067C68.0698 12.0167 68.0692 19.3565 68.0692 34.0346C68.0692 48.7126 68.0698 56.0525 64.1203 61.0625L63.7771 61.4829C62.9653 62.4524 62.0562 63.3368 61.0625 64.1203L60.5846 64.4778C55.5854 68.0686 48.254 68.0692 34.0346 68.0692V62.5501C41.5047 62.5501 46.636 62.541 50.5435 62.0919C54.3355 61.6561 56.272 60.8678 57.6454 59.7851C58.4402 59.1584 59.1584 58.4402 59.7851 57.6454C60.8678 56.272 61.6561 54.3355 62.0919 50.5435C62.541 46.636 62.5501 41.5047 62.5501 34.0346Z" fill="#0661CC" />
              <path d="M51.0512 23.8242C51.0512 27.5836 48.0036 30.6311 44.2443 30.6311C40.4849 30.6311 37.4373 27.5836 37.4373 23.8242C37.4373 20.0649 40.4849 17.0173 44.2443 17.0173C48.0036 17.0173 51.0512 20.0649 51.0512 23.8242Z" fill="#0661CC" />
            </svg>
          </div>
        </div>
      )}
      
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="sp-photo-input"
        id="photo-upload"
      />
      
      <label htmlFor="photo-upload" className="sp-photo-upload-label">
        {t('upload_photo')}
      </label>
    </div>
  );
};

export default ProfilePhoto;