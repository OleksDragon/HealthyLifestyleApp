import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import RecipeCard from '../../elements/Nutrion/RecipeCard';
import "../../styles/nutrition/nutrition-tracker.css";
import "../../styles/nutrition/recipes-page.css";

const CrossIcon = ({ size = "100%", color = "currentColor", ...props }) => (
    <svg 
        width={size} 
        height={size} 
        viewBox="0 0 24 24" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path 
            d="M12 4V20M4 12H20" 
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

const AddRecipeCardContent = ({ t }) => (
    <>
        <CrossIcon className="add-icon" size="100%" color="white" /> 
        
        <div className="add-gradient-effect" />

        <h4 className="add-recipe-text">
             {t("add_recipe_text") || 'Додати свій рецепт'}
        </h4>
    </>
);

const RecipesPage = () => {
    const { t } = useTranslation();
    const navigate = useNavigate(); 
    
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const handleCardClick = (recipeId) => {
        navigate(`/eating/recipes/${recipeId}`);
    };

    useEffect(() => {
        const fetchRecipes = async () => {
            try {                
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/Recipes`);
                               
                setRecipes(response.data); 
            } catch (err) {
                setError(t("error_loading_recipes") || "Помилка завантаження рецептів. Перевірте консоль.");
                console.error("Error fetching recipes:", err);
            } finally {
                setLoading(false); 
            }
        };

        fetchRecipes();
    }, [t]); 

    if (loading) {
        return (
            <div className="nutrition-tracker-page-content">
                 <div className="navigation-tabs-wrapper">
                     <span className="tab-item active">{t("nt_recipes_tab") || 'Рецепти'}</span> 
                 </div>
                 <div className="scrollable-main-content scroll-data">
                     <p>{t("loading_text") || "Завантаження рецептів..."}</p>
                 </div>
             </div>
         );
    }

    if (error) {
        return (
            <div className="nutrition-tracker-page-content">
                 <div className="navigation-tabs-wrapper">
                     <span className="tab-item active">{t("nt_recipes_tab") || 'Рецепти'}</span> 
                 </div>
                 <div className="scrollable-main-content scroll-data">
                     <p style={{ color: 'red' }}>{error}</p>
                 </div>
             </div>
         );
    }

    return (
        <div className="nutrition-tracker-page-content"> 
            <div className="navigation-tabs-wrapper">
                <Link to="/eating" className="tab-item gradient-tab">{t("nt_tracker_tab") || 'Трекер харчування'}</Link>
                <Link to="/eating/ration" className="tab-item gradient-tab">{t("nt_ration_tab") || 'Раціон'}</Link> 
                <span className="tab-item active">{t("nt_recipes_tab") || 'Рецепти'}</span> 
            </div>
            
            <div className="scrollable-main-content scroll-data"> 
                <div className="recipes-grid-wrapper">
                    {recipes.length > 0 ? (
                            recipes.map(recipe => (
                                <RecipeCard 
                                    key={recipe.id} 
                                    recipe={recipe}
                                    onRecipeClick={handleCardClick}
                                />
                            ))
                        ) : (
                        <p>{t("no_recipes_found") || "Рецепти не знайдено."}</p>
                    )}
                    
                    <div 
                        className="recipe-card glass-card add-recipe-card"
                        onClick={() => navigate("/eating/recipes/add")}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                                navigate("/eating/recipes/add");
                            }
                        }}
                    >
                        <AddRecipeCardContent t={t} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RecipesPage;