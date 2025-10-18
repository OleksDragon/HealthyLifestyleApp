import React, { useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom"; 
import axios from "axios";
import DatePickerComponent from "../../elements/Nutrion/DatePickerComponent";
import WeightChartWidget from "../../elements/Nutrion/WeightChartWidget";
import WeightEntryWidget from "../../elements/Nutrion/WeightEntryWidget";
import { useSmartMotivation } from '../../useSmartMotivation';
import "../../styles/nutrition/nutrition-tracker.css";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

const MEAL_TYPES_MAP = {
    1: "Сніданок", 
    2: "Обід", 
    3: "Вечеря", 
    4: "Перекус"
};

const getUserIdFromToken = () => {
    try {
        const token = localStorage.getItem("helth-token");
        if (!token) return null;
        const payload = JSON.parse(atob(token.split(".")[1]));
        return payload.sub || payload.userId || payload.id || payload.nameid || null;
    } catch (error) {
        console.error("Помилка при декодуванні токена:", error);
        return null;
    }
};

const NutritionTrackerPage = () => {
    const { t } = useTranslation();
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [dailyData, setDailyData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [userId, setUserId] = useState(null);

    const motivationKey = useSmartMotivation(dailyData);
    const motivationMessage = t(motivationKey, { 
        calories: dailyData?.progress.calories, 
        protein: dailyData?.progress.protein,
        fat: dailyData?.progress.fat
    });

    useEffect(() => {
        const userIdFromToken = getUserIdFromToken();
        if (userIdFromToken) {
            setUserId(userIdFromToken);
        }
    }, []);

    const fetchDailyData = useCallback(async () => {
        if (!userId) return;

        setIsLoading(true);
        setError(null);

        const token = localStorage.getItem("helth-token");
        if (!token) {
            setError("Токен відсутній");
            setIsLoading(false);
            return;
        }

        const formattedDate = selectedDate.toISOString().split("T")[0];

        try {
            const mealsResponse = await axios.get(
                `${API_URL}/api/meals/user/${encodeURIComponent(userId)}/date/${formattedDate}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            const rawMeals = mealsResponse.data || [];

            const groupedMeals = {};
            rawMeals.forEach(meal => {
                const mealType = meal.mealType || meal.MealType;
                if (!groupedMeals[mealType]) {
                    groupedMeals[mealType] = [];
                }
                
                groupedMeals[mealType].push({
                    mealName: meal.FoodItemName || 'Не вказано',
                    kkal: meal.Calories || 0,
                    protein: meal.ProteinsG || 0,
                    fat: meal.FatsG || 0,
                    carbs: meal.CarbsG || 0,
                    quantity: meal.Quantity || 0
                });
            });

            const meals = Object.keys(groupedMeals).map(mealType => ({
                mealType: parseInt(mealType),
                items: groupedMeals[mealType]
            }));

            const totalProgress = {
                calories: 0,
                protein: 0,
                fat: 0,
                carbs: 0
            };

            rawMeals.forEach(meal => {
                totalProgress.calories += meal.Calories || 0;
                totalProgress.protein += meal.ProteinsG || 0;
                totalProgress.fat += meal.FatsG || 0;
                totalProgress.carbs += meal.CarbsG || 0;
            });

            const userTargets = {
                calorieTarget: 2100,
                proteinTarget: 100,
                fatTarget: 70,
                carbsTarget: 250
            };

            const mockData = {
                progress: {
                    calories: Math.round(totalProgress.calories),
                    calorieTarget: userTargets.calorieTarget,
                    protein: Math.round(totalProgress.protein),
                    proteinTarget: userTargets.proteinTarget,
                    fat: Math.round(totalProgress.fat),
                    fatTarget: userTargets.fatTarget,
                    carbs: Math.round(totalProgress.carbs),
                    carbsTarget: userTargets.carbsTarget
                },
                meals: meals
            };

            setDailyData(mockData);

        } catch (err) {
            console.error("Помилка при завантаженні даних:", err.response?.data || err.message);
            
            if (err.response?.status === 404) {
                setDailyData({
                    progress: {
                        calories: 0,
                        calorieTarget: 2100,
                        protein: 0,
                        proteinTarget: 100,
                        fat: 0,
                        fatTarget: 70,
                        carbs: 0,
                        carbsTarget: 250
                    },
                    meals: []
                });
            } else if (err.response?.status === 401) {
                setError("Помилка авторизації");
            } else {
                setError("Помилка завантаження даних");
            }
        } finally {
            setIsLoading(false);
        }
    }, [userId, selectedDate]);

    useEffect(() => {
        if (userId) {
            fetchDailyData();
        }
    }, [userId, selectedDate, fetchDailyData]);

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const handlePrevDay = () => {
        const newDate = new Date(selectedDate);
        newDate.setDate(newDate.getDate() - 1);
        setSelectedDate(newDate);
    };

    const handleNextDay = () => {
        const newDate = new Date(selectedDate);
        newDate.setDate(newDate.getDate() + 1);
        setSelectedDate(newDate);
    };

    const progress = dailyData?.progress || {};
    const meals = dailyData?.meals || [];
    
    const formatProgress = (current, target) => 
        `${current ?? 0} / ${target ?? 0} ${t("nt_g_abbr") || 'г'}`;

    const calculatePercentage = (current, target) => {
        if (!target || target === 0) return 0;
        return Math.min(Math.round((current / target) * 100), 100);
    };

    if (error) return <div className="error-message">{error}</div>;
    if (isLoading) return <div className="loading-message">{t("nt_loading") || 'Завантаження...'}</div>;

    return (
        <div className="nutrition-tracker-page-content"> 
            
            <div className="navigation-tabs-wrapper">
                <span className="tab-item active">{t("nt_tracker_tab") || 'Трекер харчування'}</span>
                <Link to="/eating/ration" className="tab-item gradient-tab">{t("nt_ration_tab") || 'Раціон'}</Link>  
                <Link to="/eating/recipes" className="tab-item gradient-tab">{t("nt_recipes_tab") || 'Рецепти'}</Link> 
            </div>
            
            <DatePickerComponent
                selectedDate={selectedDate}
                onDateChange={handleDateChange}
                onPrevDay={handlePrevDay}
                onNextDay={handleNextDay}
            />

            <div className="scrollable-main-content scroll-data"> 
                
                <div className="tracker-grid-wrapper"> 
                    
                    <div className="left-column">
                        
                        <div className="progress-card">
                            <h2 className="card-title-yellow">{t("nt_daily_progress") || 'Прогрес дня'}</h2>
                            
                            <div className="progress-item">
                                <div className="progress-header">
                                    <div className="progress-info">
                                        <span className="progress-label">{t("nt_calories_label") || 'Калорії'}</span>
                                        <span className="progress-value">{progress.calories ?? 0}/{progress.calorieTarget ?? 0} {t("nt_kcal_abbr") || 'ккал'}</span>
                                    </div>
                                    <span className="progress-percentage">
                                        {calculatePercentage(progress.calories, progress.calorieTarget)}%
                                    </span>
                                </div>
                                <div className="progress-bar-container">
                                    <progress 
                                        value={progress.calories} 
                                        max={progress.calorieTarget} 
                                        className="progress-bar kkal-bar"
                                    ></progress>
                                </div>
                            </div>

                            <div className="progress-item">
                                <div className="progress-header">
                                    <div className="progress-info">
                                        <span className="progress-label">{t("nt_protein_label") || 'Білки'}</span>
                                        <span className="progress-value">{formatProgress(progress.protein, progress.proteinTarget)}</span>
                                    </div>
                                    <span className="progress-percentage">
                                        {calculatePercentage(progress.protein, progress.proteinTarget)}%
                                    </span>
                                </div>
                                <div className="progress-bar-container">
                                    <progress 
                                        value={progress.protein} 
                                        max={progress.proteinTarget} 
                                        className="progress-bar protein-bar"
                                    ></progress>
                                </div>
                            </div>

                            <div className="progress-item">
                                <div className="progress-header">
                                    <div className="progress-info">
                                        <span className="progress-label">{t("nt_fat_label") || 'Жири'}</span>
                                        <span className="progress-value">{formatProgress(progress.fat, progress.fatTarget)}</span>
                                    </div>
                                    <span className="progress-percentage">
                                        {calculatePercentage(progress.fat, progress.fatTarget)}%
                                    </span>
                                </div>
                                <div className="progress-bar-container">
                                    <progress 
                                        value={progress.fat} 
                                        max={progress.fatTarget} 
                                        className="progress-bar fat-bar"
                                    ></progress>
                                </div>
                            </div>

                            <div className="progress-item">
                                <div className="progress-header">
                                    <div className="progress-info">
                                        <span className="progress-label">{t("nt_carbs_label") || 'Вуглеводи'}</span>
                                        <span className="progress-value">{formatProgress(progress.carbs, progress.carbsTarget)}</span>
                                    </div>
                                    <span className="progress-percentage">
                                        {calculatePercentage(progress.carbs, progress.carbsTarget)}%
                                    </span>
                                </div>
                                <div className="progress-bar-container">
                                    <progress 
                                        value={progress.carbs} 
                                        max={progress.carbsTarget} 
                                        className="progress-bar carbs-bar"
                                    ></progress>
                                </div>
                            </div>
                        </div>
                        
                        <div className="meals-card glass-card">
                            <h2 className="card-title-yellow">{t("nt_meals_title") || 'Прийоми їжі'}</h2>
                            
                            <div className="meals-list"> 
                                <div className="meals-table-header">
                                    <span className="col-name">{t("nt_dish_name") || 'Страва'}</span>
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
                        <WeightChartWidget t={t} />
                        <WeightEntryWidget t={t} userId={userId} fetchDailyData={fetchDailyData} />
                        <div className="widget motivation-widget glass-card">
                            <h2 className="card-title-blue">{t("nt_motivation_title") || 'Мотивація'}</h2>
                            <p className="motivation-text">
                                {motivationMessage}
                            </p>
                        </div>
                    </div>                  
                </div>
            </div>
        </div>
    );
};

export default NutritionTrackerPage;