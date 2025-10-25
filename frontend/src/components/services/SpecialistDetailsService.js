import axios from "axios";

const API = process.env.REACT_APP_API_URL;

/**
 * Мапінг ролей до шляхів API для деталей спеціалістів
 */
const roleToDetailsPath = {
  doctor: 'doctor-details',
  trainer: 'trainer-details',
  dietitian: 'dietitian-details',
  psychologist: 'psychologist-details'
};

/**
 * Нормалізує роль спеціаліста до нижнього регістру
 * @param {string} role - Роль спеціаліста
 * @returns {string} Нормалізована роль
 */
function normalizeRole(role) {
  if (!role) return role;
  return role.toLowerCase();
}

/**
 * Конвертує порожні рядки в null для валідації на бекенді
 * @param {Object} data - Дані для конвертації
 * @returns {Object} Дані з конвертованими порожніми рядками
 */
function convertEmptyStringsToNull(data) {
  const converted = {};
  for (const [key, value] of Object.entries(data)) {
    if (value === "" || value === undefined) {
      converted[key] = null;
    } else if (Array.isArray(value)) {
      converted[key] = value;
    } else if (typeof value === 'object' && value !== null) {
      converted[key] = convertEmptyStringsToNull(value);
    } else {
      converted[key] = value;
    }
  }
  return converted;
}

/**
 * Валідує роль спеціаліста
 * @param {string} role - Роль спеціаліста
 * @throws {Error} Якщо роль не підтримується
 */
function validateRole(role) {
  const normalizedRole = normalizeRole(role);
  if (!roleToDetailsPath[normalizedRole]) {
    throw new Error(`Непідтримувана роль: ${role}. Підтримувані ролі: ${Object.keys(roleToDetailsPath).join(', ')}`);
  }
  return normalizedRole;
}

/**
 * Отримує деталі спеціаліста за ідентифікатором кваліфікації
 * @param {string} qualificationId - Ідентифікатор кваліфікації
 * @param {string} role - Роль спеціаліста (doctor, trainer, dietitian, psychologist)
 * @param {string} token - JWT токен авторизації
 * @returns {Promise<Object>} Деталі спеціаліста
 */
export async function getSpecialistDetails(qualificationId, role, token) {
  const normalizedRole = validateRole(role);
  console.log(`Getting specialist details for role: ${role} -> ${normalizedRole}`);
  
  const endpoint = `${API}/api/professional-qualification/${qualificationId}/${roleToDetailsPath[normalizedRole]}`;
  
  try {
    const response = await axios.get(endpoint, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    
    return response.data;
  } catch (error) {
    if (error.response) {
      const { status, data } = error.response;
      switch (status) {
        case 400:
          throw new Error(data?.message || 'Невірні дані запиту');
        case 401:
          throw new Error('Не авторизований доступ');
        case 403:
          throw new Error(data?.message || 'Недостатньо прав для доступу до цих деталей');
        case 404:
          throw new Error(data?.message || 'Деталі спеціаліста не знайдені');
        default:
          throw new Error(data?.message || 'Помилка при отриманні деталей спеціаліста');
      }
    }
    throw new Error('Помилка мережі при отриманні деталей спеціаліста');
  }
}

/**
 * Створює нові деталі спеціаліста
 * @param {string} qualificationId - Ідентифікатор кваліфікації
 * @param {string} role - Роль спеціаліста (doctor, trainer, dietitian, psychologist)
 * @param {Object} detailsData - Дані для створення деталей
 * @param {string} token - JWT токен авторизації
 * @returns {Promise<Object>} Створені деталі спеціаліста
 */
export async function createSpecialistDetails(qualificationId, role, detailsData, token) {
  const normalizedRole = validateRole(role);
  
  const endpoint = `${API}/api/professional-qualification/${qualificationId}/${roleToDetailsPath[normalizedRole]}`;
  
  // Додаємо qualificationId до даних, якщо його немає
  const dataWithQualificationId = {
    ...detailsData,
    qualificationId: qualificationId
  };
  
  // Конвертуємо порожні рядки в null для валідації на бекенді
  const convertedData = convertEmptyStringsToNull(dataWithQualificationId);
  
  try {
    const response = await axios.post(endpoint, convertedData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    
    return response.data;
  } catch (error) {
    if (error.response) {
      const { status, data } = error.response;
      switch (status) {
        case 400:
          throw new Error(data?.message || 'Невірні дані запиту');
        case 401:
          throw new Error('Не авторизований доступ');
        case 403:
          throw new Error(data?.message || 'Недостатньо прав для створення деталей');
        case 404:
          throw new Error(data?.message || 'Кваліфікація не знайдена');
        case 409:
          throw new Error(data?.message || 'Деталі для цієї кваліфікації вже існують');
        default:
          throw new Error(data?.message || 'Помилка при створенні деталей спеціаліста');
      }
    }
    throw new Error('Помилка мережі при створенні деталей спеціаліста');
  }
}

/**
 * Оновлює існуючі деталі спеціаліста
 * @param {string} qualificationId - Ідентифікатор кваліфікації
 * @param {string} role - Роль спеціаліста (doctor, trainer, dietitian, psychologist)
 * @param {Object} detailsData - Оновлені дані деталей
 * @param {string} token - JWT токен авторизації
 * @returns {Promise<Object>} Оновлені деталі спеціаліста
 */
export async function updateSpecialistDetails(qualificationId, role, detailsData, token) {
  const normalizedRole = validateRole(role);
  
  const endpoint = `${API}/api/professional-qualification/${qualificationId}/${roleToDetailsPath[normalizedRole]}`;
  
  // Додаємо qualificationId до даних, якщо його немає
  const dataWithQualificationId = {
    ...detailsData,
    qualificationId: qualificationId
  };
  
  // Конвертуємо порожні рядки в null для валідації на бекенді
  const convertedData = convertEmptyStringsToNull(dataWithQualificationId);
  
  try {
    const response = await axios.put(endpoint, convertedData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    
    return response.data;
  } catch (error) {
    if (error.response) {
      const { status, data } = error.response;
      switch (status) {
        case 400:
          throw new Error(data?.message || 'Невірні дані запиту');
        case 401:
          throw new Error('Не авторизований доступ');
        case 403:
          throw new Error(data?.message || 'Недостатньо прав для оновлення деталей');
        case 404:
          throw new Error(data?.message || 'Деталі спеціаліста не знайдені');
        default:
          throw new Error(data?.message || 'Помилка при оновленні деталей спеціаліста');
      }
    }
    throw new Error('Помилка мережі при оновленні деталей спеціаліста');
  }
}

/**
 * Видаляє деталі спеціаліста
 * @param {string} qualificationId - Ідентифікатор кваліфікації
 * @param {string} role - Роль спеціаліста (doctor, trainer, dietitian, psychologist)
 * @param {string} token - JWT токен авторизації
 * @returns {Promise<boolean>} true якщо видалення успішне
 */
export async function deleteSpecialistDetails(qualificationId, role, token) {
  const normalizedRole = validateRole(role);
  
  const endpoint = `${API}/api/professional-qualification/${qualificationId}/${roleToDetailsPath[normalizedRole]}`;
  
  try {
    await axios.delete(endpoint, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    
    return true;
  } catch (error) {
    if (error.response) {
      const { status, data } = error.response;
      switch (status) {
        case 400:
          throw new Error(data?.message || 'Невірні дані запиту');
        case 401:
          throw new Error('Не авторизований доступ');
        case 403:
          throw new Error(data?.message || 'Недостатньо прав для видалення деталей');
        case 404:
          throw new Error(data?.message || 'Деталі спеціаліста не знайдені');
        default:
          throw new Error(data?.message || 'Помилка при видаленні деталей спеціаліста');
      }
    }
    throw new Error('Помилка мережі при видаленні деталей спеціаліста');
  }
}

/**
 * Отримує список підтримуваних ролей
 * @returns {Array<string>} Масив підтримуваних ролей
 */
export function getSupportedRoles() {
  return Object.keys(roleToDetailsPath);
}

/**
 * Перевіряє, чи підтримується роль
 * @param {string} role - Роль для перевірки
 * @returns {boolean} true якщо роль підтримується
 */
export function isRoleSupported(role) {
  const normalizedRole = normalizeRole(role);
  return roleToDetailsPath.hasOwnProperty(normalizedRole);
}

/**
 * Отримує шлях API для ролі
 * @param {string} role - Роль спеціаліста
 * @returns {string} Шлях API для ролі
 */
export function getApiPathForRole(role) {
  const normalizedRole = validateRole(role);
  return roleToDetailsPath[normalizedRole];
}
