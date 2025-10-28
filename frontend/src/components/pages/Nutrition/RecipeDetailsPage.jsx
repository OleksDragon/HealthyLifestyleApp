import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../../styles/nutrition/recipe-details-page.css";

const decodeJWT = (token) => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("❌ Ошибка декодирования токена:", error);
    return null;
  }
};

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
    const checkAdminFromToken = () => {
      const token = localStorage.getItem("helth-token");
      
      if (!token) {
        console.log("❌ Токен не найден");
        setIsAdmin(false);
        return;
      }

      try {
        const decodedToken = decodeJWT(token);
        console.log("🔍 Декодированный токен:", decodedToken);
        
        const userRole = decodedToken?.role || 
                        decodedToken?.Role || 
                        decodedToken?.["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
        
        console.log("🏷️ Найденная роль:", userRole);
        
        const adminStatus = userRole?.toLowerCase() === "admin";
        console.log("✅ Статус администратора:", adminStatus);
        
        setIsAdmin(adminStatus);
      } catch (error) {
        console.error("❌ Ошибка при проверке токена:", error);
        setIsAdmin(false);
      }
    };

    checkAdminFromToken();
  }, []);

  const showMessage = (text, type) => {
    setMessage({ text, type });
    setTimeout(() => {
      setMessage({ text: "", type: "" });
    }, 5000);
  };

  const getRecipeImageUrl = (recipe) => {
    const imageUrl = recipe.imageUrl || recipe.ImageUrl;
    
    if (!imageUrl) return null;
    
    if (imageUrl.startsWith('http')) {
      return imageUrl;
    }
    
    return `http://${imageUrl}`;
  };

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(process.env.REACT_APP_API_URL + `/api/recipes/${id}`);
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

  if (loading) return <p className="loading-text">{t("loadingRecipe")}</p>;
  if (!recipe) return <p className="error-text">{t("recipeNotFound")}</p>;

  const handleDeleteRecipe = async () => {
    if (!window.confirm(t("confirmDeleteRecipe"))) {
      return;
    }

    setDeleteLoading(true);
    try {
      const token = localStorage.getItem("helth-token");
      
      await axios.delete(`http://localhost:5000/api/recipes/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      showMessage(t("recipeDeletedSuccess"), "success");
      
      setTimeout(() => {
        navigate("/eating/recipes");
      }, 2000);
      
    } catch (error) {
      console.error("❌ Помилка видалення рецепта:", error);
      
      let errorMessage = t("deleteRecipeError");
      
      if (error.response?.status === 500) {
        errorMessage = t("recipeInUseError");
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.message) {
        errorMessage = error.message;
      }
      
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
            <div className="main-image-card">
              <img 
                src={getRecipeImageUrl(recipe)} 
                alt={recipe.name} 
                className="recipe-main-image-v2"
                onError={(e) => {
                  e.target.style.display = 'none';}}
              />
            </div>

            <div className="recipe-steps-card">
              <h2 className="card-title-white">
                {t("recipeSteps")}
              </h2>
              {recipe.steps?.map((step, index) => (
                  <div key={index} className="recipe-step-item">
                    <div className="step-number">{index + 1}</div>
                    <p className="step-text">{step}</p>
                  </div>
                ))}
            </div>
          </div>

          <div className="details-sidebar-column">
            <div className="header-details-card">
              <h1 className="recipe-title-v2">{recipe.name}</h1>
              <p className="recipe-description-v2">{recipe.description}</p>

              <div className="macros-card-v2">
                <div className="macro-item">
                  <span>{recipe.kkal}</span>
                  <small>{t("calories")}</small>
                </div>
                <div className="macro-item">
                  <span>{recipe.protein}</span>
                  <small>{t("proteins")}</small>
                </div>
                <div className="macro-item">
                  <span>{recipe.fat}</span>
                  <small>{t("fats")}</small>
                </div>
                <div className="macro-item">
                  <span>{recipe.carbs}</span>
                  <small>{t("carbs")}</small>
                </div>
              </div>
            </div>

            <div className="ingredients-card glass-card-recipe-details">
              <h2 className="card-title-white">
                {t("ingredients")}
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

            <div className="video-recipe-card glass-card-recipe-details">
              <h2 className="card-title-white">
                {t("videoRecipe")}
              </h2>
              <div
                className="video-placeholder-v2"
                onClick={() => window.open(recipe.videoUrl, "_blank")}
              >
                <span className="play-icon">▶</span>
                <span className="video-click-text">{t("clickToWatch")}</span>
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
                  {t("backToRecipes")}
                </button>

                {isAdmin && (
                <>
                  <button 
                    className="edit-recipe-button"
                    onClick={() => navigate(`/eating/recipes/edit/${id}`)}
                  >
                    {t("editRecipe")}
                  </button>
                  <button 
                    className="delete-recipe-button"
                    onClick={handleDeleteRecipe}
                    disabled={deleteLoading}
                  >
                    {deleteLoading ? t("deleting") : t("deleteRecipe")}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetailsPage;