import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WeightIcon = ({ size = 24, color = '#D6FF00' }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill={color}
    style={{ marginRight: '10px' }}
  >
    <path d="M12 3C10.34 3 9 4.34 9 6C9 7.66 10.34 9 12 9C13.66 9 15 7.66 15 6C15 4.34 13.66 3 12 3ZM18 9H14C14 10.1 13.1 11 12 11C10.9 11 10 10.1 10 9H6C4.9 9 4 9.9 4 11V13C4 14.1 4.9 15 6 15H8V19H16V15H18C19.1 15 20 14.1 20 13V11C20 9.9 19.1 9 18 9Z"/>
  </svg>
);

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

const WeightEntryWidget = ({ t, userId, fetchDailyData }) => {
    const [currentWeight, setCurrentWeight] = useState('');
    const [newWeight, setNewWeight] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [status, setStatus] = useState(null);

    const fetchCurrentWeight = async () => {
        if (!userId) return;
        const token = localStorage.getItem("helth-token");
        if (!token) return;

        try {
            const response = await axios.get(`${API_URL}/api/weight/latest/${userId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            const latestWeight = response.data?.weight || '';
            setCurrentWeight(latestWeight);
            setNewWeight(latestWeight);
        } catch (error) {
            console.error("Помилка завантаження ваги:", error);
            setCurrentWeight(t("we_no_data") || 'Немає даних');
        }
    };

    useEffect(() => {
        fetchCurrentWeight();
    }, [userId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!userId || !newWeight || isSubmitting) return;

        setIsSubmitting(true);
        setStatus('loading');
        const token = localStorage.getItem("helth-token");
        
        try {
            await axios.post(`${API_URL}/api/weight/log`, 
                { userId, weight: parseFloat(newWeight) }, 
                { headers: { Authorization: `Bearer ${token}` } }
            );

            setStatus('success');
            setCurrentWeight(newWeight);
            
            if (fetchDailyData) fetchDailyData(); 

        } catch (error) {
            setStatus('error');
            console.error("Помилка запису ваги:", error.response?.data || error.message);
        } finally {
            setIsSubmitting(false);
            setTimeout(() => setStatus(null), 3000); 
        }
    };

    return (
        <div className="widget weight-entry-widget glass-card">
            <h2 className="card-title-blue">
                {t("we_title") || 'Зафіксувати вагу'}
            </h2>
            
            <div className="weight-info">
                <WeightIcon size={24} style={{ color: '#D6FF00', marginRight: '10px' }} />
                <span>{t("we_current_label") || 'Поточна вага:'} </span>
                <span className="current-weight-value">
                    {currentWeight} {t("we_kg_abbr") || 'кг'}
                </span>
            </div>

            <form onSubmit={handleSubmit} className="weight-form">
                <input
                    type="number"
                    step="0.1"
                    min="1"
                    value={newWeight}
                    onChange={(e) => setNewWeight(e.target.value)}
                    placeholder={t("we_placeholder") || "Введіть вагу (кг)"}
                    disabled={isSubmitting}
                    className="weight-input"
                    required
                />
                <button 
                    type="submit" 
                    disabled={isSubmitting} 
                    className="weight-submit-button"
                >
                    {isSubmitting ? t("we_submitting") || 'Збереження...' : t("we_save_button") || 'Зберегти'}
                </button>
            </form>

            {status === 'success' && <p className="status-message success">{t("we_saved") || 'Вага збережена!'}</p>}
            {status === 'error' && <p className="status-message error">{t("we_error") || 'Помилка збереження.'}</p>}
        </div>
    );
};

export default WeightEntryWidget;