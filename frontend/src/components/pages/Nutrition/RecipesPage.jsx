import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom"; 
import RecipeCard from '../../elements/Nutrion/RecipeCard';
import "../../styles/nutrition/nutrition-tracker.css";
import "../../styles/nutrition/recipes-page.css";

// --- Заглушка для Рецептов ---
const mockRecipes = [
    { id: 1, name: "Вівсянка з ягодами та горіхами", kkal: 300, protein: 10, fat: 9, time: "10 хв", image: "oats_image_url" },
    { id: 2, name: "Омлет із шпинатом та грибами", kkal: 286, protein: 20, fat: 15, time: "15 хв", image: "omelet_image_url" },
    { id: 3, name: "Зелене смузі", kkal: 200, protein: 8, fat: 3, time: "5 хв", image: "smoothie_image_url" },
    { id: 4, name: "Курячий салат з кіноа", kkal: 450, protein: 35, fat: 18, time: "30 хв", image: "salad_image_url" },
    { id: 5, name: "Лосось з овочами на пару", kkal: 480, protein: 40, fat: 25, time: "35 хв", image: "salmon_image_url" },
    { id: 6, name: "Салат з тунцем і яйцем", kkal: 320, protein: 30, fat: 10, time: "8 хв", image: "tuna_image_url" },
    { id: 7, name: "Суп-пюре з броколі", kkal: 220, protein: 12, fat: 7, time: "25 хв", image: "soup_image_url" },
    { id: 8, name: "Мексиканський боул", kkal: 520, protein: 45, fat: 20, time: "40 хв", image: "bowl_image_url" },
];


const RecipesPage = () => {
    const { t } = useTranslation();
    

    return (
        <div className="nutrition-tracker-page-content"> 

            {/* Навигационные табы: Трекер, Раціон, Рецепти */}
            <div className="navigation-tabs-wrapper">
                <Link to="/eating" className="tab-item gradient-tab">{t("nt_tracker_tab") || 'Трекер харчування'}</Link>
                <Link to="/eating/ration" className="tab-item gradient-tab">{t("nt_ration_tab") || 'Раціон'}</Link> 
                <span className="tab-item active">{t("nt_recipes_tab") || 'Рецепти'}</span> 
            </div>
            
            {/* ГЛАВНЫЙ КОНТЕЙНЕР */}
            <div className="scrollable-main-content scroll-data"> 
                
                {/* Сетка карточек рецептов */}
                <div className="recipes-grid-wrapper">
                    {mockRecipes.map(recipe => (
                        <RecipeCard key={recipe.id} recipe={recipe} />
                    ))}
                    {/* Карточка "Додати свій рецепт" */}
                    <div className="recipe-card glass-card add-recipe-card">
                        <span className="add-icon">+</span>
                        <h4 className="add-recipe-text">{t("add_recipe_text") || 'Додати свій рецепт'}</h4>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RecipesPage;