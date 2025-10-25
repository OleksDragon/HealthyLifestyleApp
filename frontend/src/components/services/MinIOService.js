const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

class MinIOService {
    // Завантаження файлу
    static async uploadFile(file, objectName) {
        try {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('objectName', objectName);

            const response = await fetch(`${API_BASE_URL}/storage/upload`, {
                method: 'POST',
                body: formData,
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Error uploading file:', error);
            throw error;
        }
    }

    // Отримання URL файлу
    static async getFileUrl(objectName) {
        try {
            const response = await fetch(`${API_BASE_URL}/storage/get/${objectName}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Error getting file URL:', error);
            throw error;
        }
    }

    // Видалення файлу
    static async deleteFile(objectName) {
        try {
            const response = await fetch(`${API_BASE_URL}/storage/delete/${objectName}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Error deleting file:', error);
            throw error;
        }
    }

    // Отримання presigned URL
    static async getPresignedUrl(objectName, expirySeconds = 3600) {
        try {
            const response = await fetch(`${API_BASE_URL}/storage/presigned-url/${objectName}?expirySeconds=${expirySeconds}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Error getting presigned URL:', error);
            throw error;
        }
    }

    // Завантаження фото спеціаліста
    static async uploadSpecialistCardPhoto(file, specialistName) {
        try {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('specialistName', specialistName);

            const response = await fetch(`${API_BASE_URL}/storage/update-specialist-card-photo`, {
                method: 'POST',
                body: formData,
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Error uploading specialist photo:', error);
            throw error;
        }
    }

    // Завантаження всіх фото спеціалістів
    static async uploadAllSpecialistPhotos() {
        try {
            const response = await fetch(`${API_BASE_URL}/uploadallphotos/upload-all-specialist-photos`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Error uploading all specialist photos:', error);
            throw error;
        }
    }

    // Оновлення URL фото
    static async updatePhotoUrls() {
        try {
            const response = await fetch(`${API_BASE_URL}/updateurls/update-all-photo-urls`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Error updating photo URLs:', error);
            throw error;
        }
    }

    // Очищення URL фото
    static async cleanPhotoUrls() {
        try {
            const response = await fetch(`${API_BASE_URL}/cleanurls/clean-all-photo-urls`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Error cleaning photo URLs:', error);
            throw error;
        }
    }
}

export default MinIOService;












