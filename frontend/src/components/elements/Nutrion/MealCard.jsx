// Файл: src/elements/Nutrion/MealCard.js
import React from "react";
import { useTranslation } from "react-i18next";
import "../../styles/nutrition/ration-page.css"; 

const MealCard = ({ meal }) => {
    const { t } = useTranslation();
    const { 
        name, 
        calories, 
        proteinsG, 
        fatsG, 
        carbsG, 
        mealType, 
        imageUrl,
        recipeIngredients 
    } = meal;

    return (
        <div className="meal-ration-card glass-card">
            
            {/* Тег Прийому Їжі */}
            <div className="meal-tag">
                {mealType}
            </div>
            
            {/* Іконка серця */}
            <div className="heart-icon">❤️</div>

            {/* Зображення / Placeholder */}
            <div className="meal-image-wrapper" style={{ width: '100%', height: '150px' }}>
                {imageUrl ? (
                    <img 
                        src={imageUrl} 
                        alt={name} 
                        className="meal-image" 
                        style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '5px' }}
                    />
                ) : (
                    <div 
                        className="meal-image-placeholder"
                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255,255,255,0.1)' }}
                    >
                        <span style={{ color: 'rgba(255, 255, 255, 0.5)' }}>{t("no_image") || 'Немає зображення'}</span>
                    </div>
                )}
            </div>

            {/* Інформація про блюдо */}
            <div className="meal-info">
                <h4 className="meal-name">{name}</h4>
                <p className="meal-macros">
                    {calories ?? 0} {t("nt_kcal_abbr") || 'ккал'} · {proteinsG ?? 0}{t("nt_g_abbr") || 'г'} Б · {fatsG ?? 0}{t("nt_g_abbr") || 'г'} Ж · {carbsG ?? 0}{t("nt_g_abbr") || 'г'} У
                </p>

                {/* Список інгредієнтів */}
                <div className="meal-ingredients">
                    <p className="ingredients-title">{t("nt_ingredients_list") || 'Інгредієнти:'}</p>
                    <ul className="ingredients-list">
                        {recipeIngredients && recipeIngredients.length > 0 ? (
                            recipeIngredients.slice(0, 3).map((ing, index) => (
                                <li key={index}>
                                    {ing.name} ({ing.amount})
                                </li>
                            ))
                        ) : (
                            <li>{t("ingredients_not_listed") || 'Інгредієнти не вказані.'}</li>
                        )}
                        {recipeIngredients && recipeIngredients.length > 3 && <li>...</li>}
                    </ul>
                </div>
            </div>
            
            {/* Кнопки дій */}
            <div className="meal-actions" style={{ width: '100%', display: 'flex', gap: '10px', marginTop: '10px' }}>
                <button className="edit-button" style={{ flex: 1, padding: '8px', fontSize: '0.9rem', backgroundColor: '#3f51b5', color: 'white' }}>{t("edit") || "Ред"}</button>
                <button className="save-button" style={{ flex: 1, padding: '8px', fontSize: '0.9rem', backgroundColor: '#dc3545', color: 'white' }}>{t("delete") || "Удл"}</button>
            </div>
        </div>
    );
};

export default MealCard;