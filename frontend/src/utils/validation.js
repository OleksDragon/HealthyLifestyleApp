/**
 * Утиліти валідації для профілю спеціаліста
 * Відповідає валідації на бекенді (DTO класи)
 */

/**
 * Валідація годинної ставки
 * @param {string|number} value - значення для перевірки
 * @returns {string} - повідомлення про помилку або порожній рядок
 */
export const validateHourlyRate = (value) => {
  if (!value || value === '') return ''; // Поле не обов'язкове
  
  const numValue = parseFloat(value);
  if (isNaN(numValue)) {
    return 'validation_hourly_rate_invalid_number';
  }
  
  if (numValue < 0) {
    return 'validation_hourly_rate_negative';
  }
  
  if (numValue > 999999) {
    return 'validation_hourly_rate_too_high';
  }
  
  return '';
};

/**
 * Валідація років досвіду
 * @param {string|number} value - значення для перевірки
 * @returns {string} - повідомлення про помилку або порожній рядок
 */
export const validateExperience = (value) => {
  if (!value || value === '') return ''; // Поле не обов'язкове
  
  const numValue = parseInt(value);
  if (isNaN(numValue)) {
    return 'validation_experience_invalid_number';
  }
  
  if (numValue < 0) {
    return 'validation_experience_negative';
  }
  
  if (numValue > 100) {
    return 'validation_experience_too_high';
  }
  
  return '';
};

/**
 * Валідація біографії
 * @param {string} value - значення для перевірки
 * @returns {string} - повідомлення про помилку або порожній рядок
 */
export const validateBiography = (value) => {
  if (!value || value === '') return ''; // Поле не обов'язкове
  
  if (value.length > 1000) {
    return 'validation_biography_too_long';
  }
  
  return '';
};

/**
 * Валідація email адреси
 * @param {string} value - значення для перевірки
 * @returns {string} - повідомлення про помилку або порожній рядок
 */
export const validateEmail = (value) => {
  if (!value || value === '') return ''; // Поле не обов'язкове
  
  if (value.length > 100) {
    return 'validation_email_too_long';
  }
  
  // Регулярний вираз для валідації email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(value)) {
    return 'validation_email_invalid_format';
  }
  
  return '';
};

/**
 * Валідація номера телефону
 * @param {string} value - значення для перевірки
 * @returns {string} - повідомлення про помилку або порожній рядок
 */
export const validatePhone = (value) => {
  if (!value || value === '') return ''; // Поле не обов'язкове
  
  if (value.length > 20) {
    return 'validation_phone_too_long';
  }
  
  // Регулярний вираз для валідації телефону (дозволяє +, цифри, пробіли, дужки, тире)
  const phoneRegex = /^[\+]?[0-9\s\-\(\)]+$/;
  if (!phoneRegex.test(value)) {
    return 'validation_phone_invalid_format';
  }
  
  // Перевірка мінімальної довжини (принаймні 7 цифр)
  const digitsOnly = value.replace(/\D/g, '');
  if (digitsOnly.length < 7) {
    return 'validation_phone_too_short';
  }
  
  return '';
};

/**
 * Валідація URL вебсайту
 * @param {string} value - значення для перевірки
 * @returns {string} - повідомлення про помилку або порожній рядок
 */
export const validateWebsite = (value) => {
  if (!value || value === '') return ''; // Поле не обов'язкове
  
  if (value.length > 500) {
    return 'validation_website_too_long';
  }
  
  // Перевірка чи містить тільки англійські літери, цифри та допустимі символи URL
  // Дозволяємо: a-z, A-Z, 0-9, ., -, _, :, /, ?, #, [, ], @, !, $, &, ', (, ), *, +, ,, ;, =
  const urlRegex = /^[a-zA-Z0-9\.\-\_\/\?\#\[\]\!\$\&\'\(\)\*\+\,\;\=\:\@]+$/;
  if (!urlRegex.test(value)) {
    return 'validation_website_invalid_format';
  }
  
  // Перевірка чи це валідний URL формат
  try {
    // Додаємо протокол якщо його немає
    let urlToCheck = value;
    if (!value.startsWith('http://') && !value.startsWith('https://')) {
      urlToCheck = 'https://' + value;
    }
    
    new URL(urlToCheck);
    return '';
  } catch (error) {
    return 'validation_website_invalid_format';
  }
};

/**
 * Валідація номера ліцензії
 * @param {string} value - значення для перевірки
 * @returns {string} - повідомлення про помилку або порожній рядок
 */
export const validateLicenseNumber = (value) => {
  if (!value || value === '') return ''; // Поле не обов'язкове
  
  if (value.length > 100) {
    return 'validation_license_number_too_long';
  }
  
  // Перевірка чи номер ліцензії містить тільки допустимі символи
  // Дозволяємо літери, цифри, тире, пробіли та крапки
  const licenseRegex = /^[a-zA-Z0-9\-\s\.]+$/;
  if (!licenseRegex.test(value)) {
    return 'validation_license_number_invalid_format';
  }
  
  return '';
};

/**
 * Головна функція валідації поля
 * @param {string} fieldName - назва поля
 * @param {string|number} value - значення для перевірки
 * @returns {string} - повідомлення про помилку або порожній рядок
 */
export const validateField = (fieldName, value) => {
  switch (fieldName) {
    case 'hourlyRate':
      return validateHourlyRate(value);
    case 'experience':
      return validateExperience(value);
    case 'biography':
      return validateBiography(value);
    case 'contactEmail':
      return validateEmail(value);
    case 'contactPhone':
      return validatePhone(value);
    case 'website':
      return validateWebsite(value);
    case 'licenseNumber':
      return validateLicenseNumber(value);
    default:
      return '';
  }
};

/**
 * Перевірка чи є помилки валідації
 * @param {Object} errors - об'єкт з помилками
 * @returns {boolean} - true якщо є помилки
 */
export const hasValidationErrors = (errors) => {
  return Object.values(errors).some(error => error !== '');
};

