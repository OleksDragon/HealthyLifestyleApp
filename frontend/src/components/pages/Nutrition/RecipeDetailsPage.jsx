import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../../styles/nutrition/recipe-details-page.css";

const RecipeDetailsPage = () => {
  const { t } = useTranslation();
  const { id } = useParams(); 
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchRecipe = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/recipes/${id}`);
      const data = response.data;

      // Нормализация данных
      const normalizedRecipe = {
        id: data.Id,
        name: data.Name,
        description: data.Description,
        kkal: data.Kkal,
        protein: data.Protein,
        fat: data.Fat,
        carbs: data.Carbs,
        time: data.Time,
        imageUrl: data.ImageUrl,
        videoUrl: data.VideoUrl,
        ingredients: data.Ingredients?.map(i => ({
          name: i.Name,
          amount: i.Amount
        })),
        steps: data.Steps
      };

      setRecipe(normalizedRecipe);
      console.log("✅ Normalized recipe:", normalizedRecipe);
    } catch (error) {
      console.error("❌ Ошибка загрузки рецепта:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchRecipe();
}, [id]);

  useEffect(() => {
  console.log("Recipe data:", recipe);
    }, [recipe]);

  if (loading) return <p className="loading-text">Завантаження рецепта...</p>;
  if (!recipe) return <p className="error-text">Рецепт не знайдено</p>;

  return (
    <div className="recipe-page-content-wrapper">
      <div className="scrollable-grid-content scroll-data">
        <div className="recipe-page-grid-v2">

          {/* Ліва колонка */}
          <div className="main-media-column">
            <div className="main-image-card glass-card">
              <img src={recipe.imageUrl} alt={recipe.name} className="recipe-main-image-v2" />
            </div>

            <div className="recipe-steps-card glass-card">
              <h2 className="card-title-white">
                {t("recipe_title") || "Рецепт Приготування"}
              </h2>
              <ol className="recipe-steps-list">
                {recipe.steps?.map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
              </ol>
            </div>
          </div>

          {/* Права колонка */}
          <div className="details-sidebar-column">
            <div className="header-details-card">
              <h1 className="recipe-title-v2">{recipe.name}</h1>
              <p className="recipe-description-v2">{recipe.description}</p>

              <div className="macros-card-v2">
                <div className="macro-item"><span>{recipe.kkal}</span><small>Ккал</small></div>
                <div className="macro-item"><span>{recipe.protein}</span><small>Білки</small></div>
                <div className="macro-item"><span>{recipe.fat}</span><small>Жири</small></div>
                <div className="macro-item"><span>{recipe.carbs}</span><small>Вуглеводи</small></div>
              </div>
            </div>

            <div className="ingredients-card glass-card">
              <h2 className="card-title-white">
                {t("ingredients_title") || "Інгредієнти"}
              </h2>
              <ul className="ingredient-list-wrapper">
                {recipe.ingredients?.map((item, index) => (
                  <li key={index} className="ingredient-item-details">
                    <span>{item.name}</span>
                    <span className="ingredient-amount">{item.amount}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="video-recipe-card glass-card">
              <h2 className="card-title-white">
                {t("video_title") || "Відео-рецепт"}
              </h2>
              <div
                className="video-placeholder-v2"
                onClick={() => window.open(recipe.videoUrl, "_blank")}
              >
                <span className="play-icon">▶</span>
              </div>
            </div>

            <button className="save-recipe-button">
              {t("save_button") || "Зберегти Рецепт"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetailsPage;
