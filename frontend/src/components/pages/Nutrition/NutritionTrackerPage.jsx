import React, { useState, useEffect } from "react";
// import axios from "axios"; // Закомментировано, так как используем заглушку
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom"; 
import "../../styles/nutrition/nutrition-tracker.css"; // Импорт стилей

// --- Маппинг типов приема пищи ---
const MEAL_TYPES_MAP = {
    1: "Сніданок", 
    2: "Обід", 
    3: "Вечеря", 
    4: "Перекус"
};

// --- Компонент-заглушка для графика веса ---
const WeightChartWidget = ({ t }) => (
    <div className="widget analytics-widget glass-card"> 
        <h3 className="card-title-blue">{t("nt_analytics_title") || 'Аналітика'}</h3>
        <p className="weight-target">80 → 75 КГ</p>
        <p className="current-month">{t("nt_current_month") || 'Поточний місяць'}</p>
        
        <div className="chart-placeholder">
            {/* График веса на макете - имитируем */}
            
        </div>
    </div>
);

const NutritionTrackerPage = () => {
    const { t } = useTranslation();
    const [selectedDate, setSelectedDate] = useState("2025-09-09"); // Фиксируем дату как в макете для примера
    const [dailyData, setDailyData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // --- Заглушка данных ---
    useEffect(() => {
        const mockData = {
            progress: { calories: 657, calorieTarget: 2100, protein: 50, proteinTarget: 100, fat: 20, fatTarget: 70, carbs: 100, carbsTarget: 250 },
            meals: [
                { mealType: 1, items: [
                    { mealName: 'Вівсянка з горіхами', kkal: 150, protein: 50, fat: 30, carbs: 50, quantity: 200 },
                    { mealName: 'Вівсянка з горіхами', kkal: 150, protein: 50, fat: 30, carbs: 50, quantity: 200 },
                    { mealName: 'Вівсянка з горіхами', kkal: 150, protein: 50, fat: 30, carbs: 50, quantity: 200 },
                    { mealName: 'Вівсянка з горіхами', kkal: 150, protein: 50, fat: 30, carbs: 50, quantity: 200 },
                ] },
                { mealType: 4, items: [
                    { mealName: 'Яблуко', kkal: 95, protein: 1, fat: 0.3, carbs: 25, quantity: 150 },
                    { mealName: 'Мигдаль', kkal: 160, protein: 6, fat: 14, carbs: 6, quantity: 30 }
                ] },
                { mealType: 3, items: [
                    { mealName: 'Куряча грудка з овочами', kkal: 350, protein: 45, fat: 10, carbs: 15, quantity: 300 },
                    { mealName: 'Салат Цезар', kkal: 280, protein: 20, fat: 18, carbs: 12, quantity: 250 }
                ] },
            ],
        };
        setDailyData(mockData);
    }, [selectedDate]);

    const handleDateChange = (e) => {
        setSelectedDate(e.target.value);
    };
    
    const progress = dailyData?.progress || {};
    const meals = dailyData?.meals || [];
    
    const formatProgress = (current, target) => 
        `${current ?? 0} / ${target ?? 0} ${t("nt_g_abbr") || 'г'}`;
        
    if (error) return <div className="error-message">{error}</div>;
    if (isLoading) return <div className="loading-message">{t("nt_loading") || 'Завантаження...'}</div>;


    return (
        <div className="nutrition-tracker-page-content"> 
            
            {/* Навигационные табы */}
            <div className="navigation-tabs-wrapper">
                <span className="tab-item active">{t("nt_tracker_tab") || 'Трекер харчування'}</span>
                <Link to="/eating/ration" className="tab-item gradient-tab">{t("nt_ration_tab") || 'Раціон'}</Link>  
                <Link to="/eating/recipes" className="tab-item gradient-tab">{t("nt_recipes_tab") || 'Рецепти'}</Link> 
            </div>
            
            {/* Выбор даты */}
            <div className="date-picker-section">
                <label htmlFor="date-input" className="date-label">
                    {'<'} <span className="date-display">{t("nt_date_label") || 'Дата'}: {new Date(selectedDate).toLocaleDateString()}</span> {'>'}
                </label>
                <input
                    type="date"
                    id="date-input"
                    value={selectedDate}
                    onChange={handleDateChange}
                    className="hidden-date-input" 
                />
            </div>

            {/* !!! ГЛАВНЫЙ КОНТЕЙНЕР !!! */}
            <div className="scrollable-main-content scroll-data"> 
                
                <div className="tracker-grid-wrapper"> 
                    
                    <div className="left-column">
                        
                        {/* Блок 1: Прогресс дня */}
                        <div className="progress-card">
                            <p className="progress-label">{t("nt_calories_label") || 'Калорії'}: {progress.calories ?? 0}/{progress.calorieTarget ?? 0} {t("nt_kcal_abbr") || 'ккал'}</p>
                            <progress value={progress.calories} max={progress.calorieTarget} className="progress-bar kkal-bar"></progress>

                            <p className="progress-label">{t("nt_protein_label") || 'Білки'}: {formatProgress(progress.protein, progress.proteinTarget)}</p>
                            <progress value={progress.protein} max={progress.proteinTarget} className="progress-bar protein-bar"></progress>

                            <p className="progress-label">{t("nt_fat_label") || 'Жири'}: {formatProgress(progress.fat, progress.fatTarget)}</p>
                            <progress value={progress.fat} max={progress.fatTarget} className="progress-bar fat-bar"></progress>

                            <p className="progress-label">{t("nt_carbs_label") || 'Вуглеводи'}: {formatProgress(progress.carbs, progress.carbsTarget)}</p>
                            <progress value={progress.carbs} max={progress.carbsTarget} className="progress-bar carbs-bar"></progress>
                        </div>
                        
                        {/* Блок 3: Приемы пищи */}
                        <div className="meals-card glass-card">
                            <h2 className="card-title-yellow">{t("nt_meals_title") || 'Прийоми їжі'}</h2>
                            
                            <div className="meals-list"> 
                                <div className="meals-table-header">
                                    <span className="col-name">{t("nt_dish_name") || 'Прийом їжі'}</span>
                                    <span className="col-kkal">{t("nt_k_abbr") || 'К'}</span>
                                    <span className="col-protein">{t("nt_b_abbr") || 'Б'}</span>
                                    <span className="col-fat">{t("nt_zh_abbr") || 'Ж'}</span>
                                    <span className="col-carbs">{t("nt_v_abbr") || 'В'}</span>
                                </div>
                                
                                {meals.length > 0 ? (
                                    meals.map((meal, index) => (
                                        <React.Fragment key={index}>
                                            <div className="meal-group-title">
                                                {MEAL_TYPES_MAP[meal.mealType] || t("nt_unspecified_meal")}
                                            </div>
                                            {meal.items.map((item, itemIndex) => (
                                                <div key={`${index}-${itemIndex}`} className="meal-item">
                                                    <span className="col-name">{item.mealName}</span>
                                                    <span className="col-kkal">{item.kkal ?? 0}</span>
                                                    <span className="col-protein">{item.protein ?? 0}</span>
                                                    <span className="col-fat">{item.fat ?? 0}</span>
                                                    <span className="col-carbs">{item.carbs ?? 0}</span>
                                                </div>
                                            ))}
                                        </React.Fragment>
                                    ))
                                ) : (
                                    <p className="no-meals-message">{t("nt_no_meals_message") || 'Поки що немає прийомів їжі за цей день.'}</p>
                                )}
                            </div>

                            <Link to="/nutrition/add-meal" className="add-meal-button">
                                {t("nt_add_meal_button") || 'Додати прийом'}
                            </Link>
                        </div>
                    </div>

                    <div className="right-column">
                        {/* Блок 2: Аналитика (График веса) */}
                        <WeightChartWidget t={t} />

                        {/* Блок 4: Мотивация */}
                        <div className="widget motivation-widget glass-card">
                            <h2 className="card-title-blue">{t("nt_motivation_title") || 'Мотивація'}</h2>
                            <p className="motivation-text">
                                {t("nt_motivation_text_placeholder") || 'Знайшди, навіть маленькі зміни в харчуванні можуть дати великі результати. Наприклад, просто додаючи більше овочів у свій раціон, ти підвищуєш енергію та покращуєш настрій щодня!'}
                            </p>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    );
};

export default NutritionTrackerPage;