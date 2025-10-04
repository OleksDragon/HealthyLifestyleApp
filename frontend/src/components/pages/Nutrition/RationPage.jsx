import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom"; 
import "../../styles/nutrition/nutrition-tracker.css";
import "../../styles/nutrition/ration-page.css";

// --- Карта приемов пищи ---
const MEAL_TYPES_MAP = {
    1: "Сніданок", 
    2: "Обід", 
    3: "Вечеря", 
    4: "Перекус"
};

// --- Заглушка для блюд ---
const mockMeals = [
    { id: 1, type: 1, name: "Вівсянка з ягодами та горіхами", kkal: 350, protein: 13, fat: 9, image: "oats_image_url", tag: "Сніданок" },
    { id: 2, type: 4, name: "Омлет із шпинатом та грибами", kkal: 286, protein: 20, fat: 15, image: "omelet_image_url", tag: "Перекус" },
    { id: 3, type: 2, name: "Курячий суп", kkal: 250, protein: 25, fat: 8, image: "soup_image_url", tag: "Обід" },
    { id: 4, type: 3, name: "Салат з тунцем", kkal: 320, protein: 30, fat: 10, image: "tuna_image_url", tag: "Вечеря" },
    { id: 5, type: 1, name: "Фруктовий смузі", kkal: 180, protein: 5, fat: 2, image: "smoothie_image_url", tag: "Сніданок" },
];

// --- Заглушка для Ингредиентов ---
const mockIngredients = [
    { name: "Вівсянка", amount: "50 г" },
    { name: "Молоко", amount: "200 мл" },
    { name: "Горіхи", amount: "20 г" },
    { name: "Курка", amount: "250 г" },
    { name: "Йогурт", amount: "300 г" },
    { name: "Яблука", amount: "200 г" },
    { name: "Гречка", amount: "150 г" },
    { name: "Салат", amount: "450 г" },
];

// --- Компонент Карточки Блюда ---
const MealCard = ({ meal }) => (
    <div className="meal-ration-card glass-card">
        <div className="meal-tag">{meal.tag}</div>
        <div className="heart-icon">♡</div>
        <div className="meal-image-placeholder"></div>
        <div className="meal-info">
            <h4 className="meal-name">{meal.name}</h4>
            <p className="meal-macros">{meal.kkal} ккал, {meal.protein} г білка</p>
        </div>
    </div>
);


const RationPage = () => {
    const { t } = useTranslation();
    const [selectedDate, setSelectedDate] = useState("2025-09-09"); 
    
    const progress = { calories: 2100, protein: 50, fat: 20, carbs: 60 }; 
    const target = { calories: 2500, protein: 100, fat: 70, carbs: 250 };
    
    const formatProgress = (current, target, unit) => `${current ?? 0}${unit}`;

    return (
        <div className="nutrition-tracker-page-content"> 
            {/* Навигационные табы: Трекер, Раціон, Рецепти */}
            <div className="navigation-tabs-wrapper">
                <Link to="/eating" className="tab-item gradient-tab">{t("nt_tracker_tab") || 'Трекер харчування'}</Link>
                <span className="tab-item active">{t("nt_ration_tab") || 'Раціон'}</span> 
                <Link to="/eating/recipes" className="tab-item gradient-tab">{t("nt_recipes_tab") || 'Рецепти'}</Link> 
            </div>
            
            {/* Выбор даты */}
            <div className="date-picker-section">
                <label htmlFor="date-input" className="date-label">
                    {'<'} <span className="date-display">{t("nt_date_label") || 'Дата'}: {new Date(selectedDate).toLocaleDateString()}</span> {'>'}
                </label>
                {/* ... (input остается скрытым) ... */}
            </div>

            {/* ГЛАВНЫЙ КОНТЕЙНЕР */}
            <div className="scrollable-main-content scroll-data"> 
                
                <div className="ration-grid-wrapper"> 
                    
                    {/* ЛЕВАЯ КОЛОНКА (Прогресс и Блюда) */}
                    <div className="ration-left-column">
                        
                        {/* 1. Прогресс дня */}
                        <div className="ration-progress-bar-container">
                            <span className="progress-value">{t("nt_calories_label") || 'Калорії'}</span>
                            <span className="progress-value-large">{progress.calories}</span>
                            
                            <span className="progress-value">{t("nt_protein_label") || 'Білки'}</span>
                            <span className="progress-value-large">{formatProgress(progress.protein, target.protein, 'г')}</span>

                            <span className="progress-value">{t("nt_fat_label") || 'Жири'}</span>
                            <span className="progress-value-large">{formatProgress(progress.fat, target.fat, 'г')}</span>

                            <span className="progress-value">{t("nt_carbs_label") || 'Вуглеводи'}</span>
                            <span className="progress-value-large">{formatProgress(progress.carbs, target.carbs, 'г')}</span>
                        </div>

                        {/* 2. Секции блюд */}
                        <div className="meal-cards-grid">
                            {mockMeals.map(meal => (
                                <MealCard key={meal.id} meal={meal} />
                            ))}
                            {/* Карточка "Додати" */}
                            <div className="meal-ration-card glass-card add-meal-card">
                                <span className="add-icon">+</span>
                                <h4 className="add-meal-text">{t("nt_add_meal_button") || 'Додати прийом'}</h4>
                            </div>
                        </div>
                    </div>

                    {/* ПРАВАЯ КОЛОНКА (Ингредиенты) */}
                    <div className="ration-right-column">
                        <div className="ingredients-card glass-card">
                            <h2 className="ingredients-title">{t("nt_ingredients_title") || 'Інгредієнти'} 19.05</h2>
                            
                            <div className="ingredients-list">
                                {mockIngredients.map((ing, index) => (
                                    <div key={index} className="ingredient-item">
                                        <span className="ingredient-name">{ing.name}</span>
                                        <span className="ingredient-amount">{ing.amount}</span>
                                        <input type="checkbox" className="ingredient-checkbox" />
                                    </div>
                                ))}
                            </div>

                            <button className="edit-button">{t("nt_edit_button") || 'Редагувати'}</button>
                            <button className="save-button">{t("nt_save_button") || 'Зберегти'}</button>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    );
};

export default RationPage;