import React, { useState } from 'react';
import MinIOService from '../../../services/MinIOService';
import './PhotoUpload.css';

const PhotoUpload = ({ specialistName, onUploadSuccess, photoType = 'card' }) => {
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [uploadStatus, setUploadStatus] = useState('');

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            // Перевіряємо тип файлу
            if (!selectedFile.type.startsWith('image/')) {
                setUploadStatus('Помилка: Виберіть файл зображення');
                return;
            }
            
            // Перевіряємо розмір файлу (максимум 5MB)
            if (selectedFile.size > 5 * 1024 * 1024) {
                setUploadStatus('Помилка: Розмір файлу не повинен перевищувати 5MB');
                return;
            }
            
            setFile(selectedFile);
            setUploadStatus('');
        }
    };

    const handleUpload = async () => {
        if (!file || !specialistName) {
            setUploadStatus('Помилка: Виберіть файл та вкажіть ім\'я спеціаліста');
            return;
        }

        setUploading(true);
        setUploadStatus('Завантаження...');

        try {
            let result;
            if (photoType === 'card') {
                result = await MinIOService.uploadSpecialistCardPhoto(file, specialistName);
            } else {
                result = await MinIOService.uploadFile(file, `specialists/${specialistName}/${photoType}-${Date.now()}-${file.name}`);
            }

            setUploadStatus('✅ Фото успішно завантажено!');
            if (onUploadSuccess) {
                onUploadSuccess(result);
            }
        } catch (error) {
            console.error('Помилка завантаження:', error);
            setUploadStatus(`❌ Помилка завантаження: ${error.message}`);
        } finally {
            setUploading(false);
        }
    };

    const handleUploadAll = async () => {
        setUploading(true);
        setUploadStatus('Завантаження всіх фото...');

        try {
            const result = await MinIOService.uploadAllSpecialistPhotos();
            setUploadStatus(`✅ Завантажено ${result.count} фото!`);
            if (onUploadSuccess) {
                onUploadSuccess(result);
            }
        } catch (error) {
            console.error('Помилка завантаження всіх фото:', error);
            setUploadStatus(`❌ Помилка: ${error.message}`);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="photo-upload">
            <h3>Завантаження фото спеціаліста</h3>
            
            <div className="upload-section">
                <div className="file-input">
                    <label htmlFor="file-input" className="file-label">
                        {file ? file.name : 'Виберіть файл'}
                    </label>
                    <input
                        id="file-input"
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="file-input-hidden"
                    />
                </div>

                <div className="upload-buttons">
                    <button
                        onClick={handleUpload}
                        disabled={!file || uploading}
                        className="upload-btn"
                    >
                        {uploading ? 'Завантаження...' : 'Завантажити фото'}
                    </button>

                    <button
                        onClick={handleUploadAll}
                        disabled={uploading}
                        className="upload-all-btn"
                    >
                        {uploading ? 'Завантаження...' : 'Завантажити всі фото'}
                    </button>
                </div>
            </div>

            {uploadStatus && (
                <div className={`upload-status ${uploadStatus.includes('✅') ? 'success' : 'error'}`}>
                    {uploadStatus}
                </div>
            )}

            <div className="upload-info">
                <p>Підтримувані формати: JPG, PNG, GIF, WebP</p>
                <p>Максимальний розмір: 5MB</p>
            </div>
        </div>
    );
};

export default PhotoUpload;












