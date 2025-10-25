import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL;

/**
 * Оновлює професійну кваліфікацію
 * @param {string} qualificationId - ID кваліфікації
 * @param {Object} updateData - Дані для оновлення
 * @param {string} token - JWT токен
 * @returns {Promise<Object>} Оновлена кваліфікація
 */
export const updateProfessionalQualification = async (qualificationId, updateData, token) => {
    try {
        console.log(qualificationId, updateData);
        const response = await axios.put(
            `${API_BASE_URL}/api/ProfessionalQualification/${qualificationId}`,
            updateData,
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            }
        );
        
        return response.data;
    } catch (error) {
        console.error('Error updating professional qualification:', error);
        throw error;
    }
};

/**
 * Створює нову професійну кваліфікацію
 * @param {Object} qualificationData - Дані для створення кваліфікації
 * @param {string} token - JWT токен
 * @returns {Promise<Object>} Створена кваліфікація
 */
export const createProfessionalQualification = async (qualificationData, token) => {
    try {
        const response = await axios.post(
            `${API_BASE_URL}/api/ProfessionalQualification/apply`,
            qualificationData,
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            }
        );
        
        return response.data;
    } catch (error) {
        console.error('Error creating professional qualification:', error);
        throw error;
    }
};