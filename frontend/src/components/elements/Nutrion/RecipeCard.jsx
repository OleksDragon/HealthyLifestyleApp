import React from 'react';
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import '../../styles/nutrition/recipes-page.css'; 
import '../../styles/nutrition/nutrition-tracker.css';

/**
 * Карточка одного рецепта.
 * @param {object} recipe - Объект рецепта.
 * @param {number} recipe.id - ID рецепта.
 * @param {string} recipe.name - Название блюда.
 * @param {number} recipe.kkal - Калории.
 * @param {number} recipe.protein - Белки.
 * @param {number} recipe.fat - Жиры (добавим для полноты, хотя на макете его нет).
 * @param {string} recipe.time - Время приготовления (напр., "10 хв").
 * @param {string} recipe.image - URL/путь к изображению.
 */
const RecipeCard = ({ recipe }) => {
    const navigate = useNavigate(); 
    const { t } = useTranslation();
    
    // Функция-заглушка для обработки клика
    const handleCardClick = () => {
        console.log(`Открываем рецепт: ${recipe.name} (ID: ${recipe.id})`);
        navigate(`/eating/recipes/${recipe.id}`);
    };
    
    // Функция-заглушка для добавления в избранное
    const handleFavoriteClick = (e) => {
        e.stopPropagation(); // Важно: предотвращаем срабатывание клика по всей карточке
        console.log(`Добавить/Убрать из избранного: ${recipe.name}`);
        // Здесь будет логика изменения состояния избранного
    };

    return (
        <div 
            className="recipe-card glass-card" 
            onClick={handleCardClick}
            role="button" 
            tabIndex={0} 
        >
            
            {/* 1. ТЕГ ВРЕМЕНИ */}
            <div className="recipe-time-tag">
                {recipe.time || 'N/A'}
            </div>

            {/* 2. ИКОНКА ИЗБРАННОГО (Сердечко) */}
            <div 
                className="heart-icon"
                onClick={handleFavoriteClick}
            >
                ♡
            </div>

            {/* 3. ОБЛАСТЬ ИЗОБРАЖЕНИЯ */}
            <div className="recipe-image-wrapper">
                <div className="recipe-image-placeholder">
                    <span style={{color: 'rgba(255, 255, 255, 0.6)', zIndex: 6}}>
                        {t("image_placeholder") || 'Зображення'}
                    </span>
                </div>
            </div>

            {/* 4. ИНФОРМАЦИЯ О РЕЦЕПТЕ */}
            <div className="recipe-info">
                <h4 className="recipe-name">{recipe.name}</h4>
                <p className="recipe-macros">
                    {recipe.kkal ?? 0} {t("nt_kcal_abbr") || 'ккал'}, 
                    {recipe.protein ?? 0}{t("nt_g_abbr") || 'г'} {t("nt_b_abbr") || 'білка'}
                </p>
            </div>
        </div>
    );
};

export default RecipeCard;