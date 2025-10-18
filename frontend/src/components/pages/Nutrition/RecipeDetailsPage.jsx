import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../../styles/nutrition/recipe-details-page.css";

const RecipeDetailsPage = () => {
  const { t } = useTranslation();
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  useEffect(() => {
    const checkAdminRights = () => {
      const userRole = localStorage.getItem("userRole");
      return userRole === "admin" || userRole === "administrator";
    };
    
    setIsAdmin(checkAdminRights());
  }, []);

  const showMessage = (text, type) => {
    setMessage({ text, type });
    setTimeout(() => {
      setMessage({ text: "", type: "" });
    }, 5000);
  };

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/recipes/${id}`);
        const data = response.data;

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
      } catch (error) {
        console.error("❌ Помилка завантаження рецепта:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  if (loading) return <p className="loading-text">Завантаження рецепта...</p>;
  if (!recipe) return <p className="error-text">Рецепт не знайдено</p>;

  const handleDeleteRecipe = async () => {
    if (!window.confirm("Ви впевнені, що хочете видалити цей рецепт? Цю дію неможливо скасувати.")) {
      return;
    }

    setDeleteLoading(true);
    try {
      await axios.delete(`http://localhost:5000/api/recipes/${id}`);
      
      showMessage("✅ Рецепт успішно видалено!", "success");
      
      setTimeout(() => {
        navigate("/eating/recipes");
      }, 2000);
      
    } catch (error) {
      console.error("❌ Помилка видалення рецепта:", error);
      const errorMessage = error.response?.data?.message || "Помилка видалення рецепта";
      showMessage(`❌ ${errorMessage}`, "error");
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleGoBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/eating/recipes");
    }
  };

  return (
    <div className="recipe-page-content-wrapper">
      <div className="scrollable-grid-content scroll-data">
        <div className="recipe-page-grid-v2">

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

            {message.text && (
              <div className={`message-alert ${message.type}`}>
                {message.text}
              </div>
            )}

            <div className="buttons-section">
              <button 
                className="back-recipe-button"
                onClick={handleGoBack}
              >
                Назад до рецептів
              </button>

              {isAdmin && (
                <button 
                  className="delete-recipe-button"
                  onClick={handleDeleteRecipe}
                  disabled={deleteLoading}
                >
                  {deleteLoading ? "Видалення..." : "Видалити Рецепт"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetailsPage;