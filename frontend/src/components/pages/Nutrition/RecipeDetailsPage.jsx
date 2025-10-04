import React from 'react';
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom"; 

import mainOatsImage from "../../img/main_oats_image.png"; 
import "../../styles/nutrition/recipe-details-page.css";

// ---------------- MOCK RECIPE ----------------
const mockRecipe = {
    id: 1,
    name: "Вівсянка горіхова з ягодами",
    description: "Смачний та корисний сніданок, заряд енергією з самого ранку! Ідеально для підтримки енергії протягом дня.",
    macros: { kkal: 350, protein: 10, fat: 11, carbs: 49 },
    image: mainOatsImage, 
    ingredients: [
        { name: "Вівсянка (пластівці)", amount: "50 г" },
        { name: "Молоко (будь-яке)", amount: "200 мл" },
        { name: "Горіхи (волоські/мигдаль)", amount: "20 г" },
        { name: "Мед або сироп", amount: "15 г" },
        { name: "Свіжі ягоди (лохина)", amount: "50 г" },
        { name: "Насіння чіа", amount: "5 г" },
    ],
    steps: [
        "Закіп’ятіть молоко та додайте вівсянку. Доведіть до кипіння.",
        "Варіть на повільному вогні 5-7 хвилин, помішуючи. Слідкуйте за консистенцією.",
        "Зніміть з вогню. Додайте горіхи, мед та насіння чіа, перемішайте.",
        "Накрийте кришкою на 2 хвилини, щоб вівсянка дійшла.",
        "Прикрасьте свіжими ягодами перед подачею.",
        "Додатковий крок для тесту скролу.",
        "Ще один довгий крок, щоб ліва колонка була довшою за праву.",
        "Фінальний крок для перевірки прокрутки."
    ],
    videoUrl: "https://www.youtube.com/watch?v=lYpcZgzq8EM" // Заглушка відео
};

// ---------------- COMPONENT ----------------
const RecipeDetailsPage = () => {
    const { t } = useTranslation();
    const recipe = mockRecipe;

    return (
        <div className="recipe-page-content-wrapper">
            {/* Головний контейнер */}
            <div className="scrollable-grid-content scroll-data"> 
                
                <div className="recipe-page-grid-v2"> 
                    
                    {/* Ліва колонка: Зображення + кроки */}
                    <div className="main-media-column">
                        <div className="main-image-card glass-card">
                            <img src={recipe.image} alt={recipe.name} className="recipe-main-image-v2"/>
                        </div>

                        <div className="recipe-steps-card glass-card">
                            <h2 className="card-title-white">{t("recipe_title") || 'Рецепт Приготування'}</h2>
                            <ol className="recipe-steps-list">
                                {recipe.steps.map((step, index) => (
                                    <li key={index}>{step}</li>
                                ))}
                            </ol>
                        </div>
                    </div>

                    {/* Права колонка: Назва, макроси, інгредієнти, відео, кнопка */}
                    <div className="details-sidebar-column"> 
                        
                        <div className="header-details-card">
                            <h1 className="recipe-title-v2">{recipe.name}</h1>
                            <p className="recipe-description-v2">{recipe.description}</p>
                            
                            <div className="macros-card-v2">
                                <div className="macro-item"><span>{recipe.macros.kkal}</span><small>Ккал</small></div>
                                <div className="macro-item"><span>{recipe.macros.protein}</span><small>Білки</small></div>
                                <div className="macro-item"><span>{recipe.macros.fat}</span><small>Жири</small></div>
                                <div className="macro-item"><span>{recipe.macros.carbs}</span><small>Вуглеводи</small></div>
                            </div>
                        </div>

                        <div className="ingredients-card glass-card">
                            <h2 className="card-title-white">{t("ingredients_title") || 'Інгредієнти'}</h2>
                            <ul className="ingredient-list-wrapper">
                                {recipe.ingredients.map((item, index) => (
                                    <li key={index} className="ingredient-item-details">
                                        <span>{item.name}</span>
                                        <span className="ingredient-amount">{item.amount}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="video-recipe-card glass-card">
                            <h2 className="card-title-white">{t("video_title") || 'Відео-рецепт'}</h2>
                            <div 
                                className="video-placeholder-v2"
                                onClick={() => window.open(recipe.videoUrl, "_blank")}
                            >
                                <span className="play-icon">▶</span>
                            </div>
                        </div>

                        <button className="save-recipe-button">
                            {t("save_button") || 'Зберегти Рецепт'}
                        </button>
                    </div> 
                </div>
            </div>
        </div>
    );
};

export default RecipeDetailsPage;
