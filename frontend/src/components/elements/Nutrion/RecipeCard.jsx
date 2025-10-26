import React from 'react';
import { useTranslation } from "react-i18next";
import '../../styles/nutrition/recipes-page.css'; 
import '../../styles/nutrition/nutrition-tracker.css';

const cleanString = (str) => {
    if (typeof str !== 'string') return str;
    return str.replace(/^"|"$/g, '').trim(); 
};

const RecipeCard = ({ recipe, onRecipeClick }) => {
    const { t } = useTranslation();
    
    const recipeName = cleanString(recipe.Name); 
    
    const handleCardClick = () => {
        if (onRecipeClick && recipe.Id) {
            onRecipeClick(recipe.Id); 
        }
    };
    
    const handleFavoriteClick = (e) => {
        e.stopPropagation();
        console.log(`Додати/Прибрати з обраного: ${recipe.Name}`);
    };

    return (
        <div 
            className="recipe-card" 
            onClick={handleCardClick} 
            role="button" 
            tabIndex={0} 
        >
            
            <div className="recipe-time-tag">
                {recipe.Time || 'N/A'}
            </div>

            <div 
                className="heart-icon"
                onClick={handleFavoriteClick}
            >
                ♡
            </div>

            <div className="recipe-image-wrapper">
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