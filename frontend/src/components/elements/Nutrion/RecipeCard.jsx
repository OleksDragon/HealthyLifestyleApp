import React from 'react';
import { useTranslation } from "react-i18next";
import '../../styles/nutrition/recipes-page.css'; 
import '../../styles/nutrition/nutrition-tracker.css';

/**
 * Функція для очищення рядків від зайвих зовнішніх лапок, 
 * які іноді з'являються при серіалізації C#.
 */
const cleanString = (str) => {
    if (typeof str !== 'string') return str;
    // Видаляємо пробіли та зовнішні лапки (")
    return str.replace(/^"|"$/g, '').trim(); 
};

/**
 * Карточка одного рецепта.
 * @param {object} recipe - Об'єкт рецепта (з API).
 * @param {function} onRecipeClick - Функція, викликається при кліку, приймає ID рецепта.
 */
const RecipeCard = ({ recipe, onRecipeClick }) => {
    const { t } = useTranslation();
    
    // Очищаємо назву від зайвих лапок
    const recipeName = cleanString(recipe.Name); 
    
    // Функція, яка викликає навігацію в батьківському компоненті
    const handleCardClick = () => {
        if (onRecipeClick && recipe.Id) {
            // Передаємо Id (зверніть увагу, що у вашому JSON поле називається "Id", а не "id")
            onRecipeClick(recipe.Id); 
        }
    };
    
    // Функція-заглушка для додавання в обране
    const handleFavoriteClick = (e) => {
        e.stopPropagation(); // Важливо: запобігаємо спрацьовуванню handleCardClick
        console.log(`Додати/Убрати з обраного: ${recipe.Name}`);
    };

    return (
        <div 
            className="recipe-card glass-card" 
            onClick={handleCardClick} 
            role="button" 
            tabIndex={0} 
        >
            
            {/* 1. ТЕГ ЧАСУ */}
            <div className="recipe-time-tag">
                {recipe.Time || 'N/A'}
            </div>

            {/* 2. ІКОНКА ІЗБРАНОГО (Сердечко) */}
            <div 
                className="heart-icon"
                onClick={handleFavoriteClick}
            >
                ♡
            </div>

            {/* 3. ОБЛАСТЬ ІЗОБРАЖЕННЯ */}
            <div className="recipe-image-wrapper">
                {/* Використовуємо поле ImageUrl з API */}
                {recipe.ImageUrl && recipe.ImageUrl.startsWith('http') ? (
                    <img src={recipe.ImageUrl} alt={recipeName} className="recipe-image" />
                ) : (
                    <div className="recipe-image-placeholder">
                         <span style={{color: 'rgba(255, 255, 255, 0.6)', zIndex: 6}}>
                             {t("image_placeholder") || 'Зображення'}
                         </span>
                    </div>
                )}
            </div>

            {/* 4. ІНФОРМАЦІЯ ПРО РЕЦЕПТ */}
            <div className="recipe-info">
                <h4 className="recipe-name">{recipeName}</h4>
                <p className="recipe-macros">
                    {recipe.Kkal ?? 0} {t("nt_kcal_abbr") || 'ккал'}, 
                    {recipe.Protein ?? 0}{t("nt_g_abbr") || 'г'} {t("nt_b_abbr") || 'білка'}
                </p>
            </div>
        </div>
    );
};

export default RecipeCard;