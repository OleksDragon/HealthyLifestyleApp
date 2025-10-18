import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import "../../styles/nutrition/add-meal-modal.css";

const SearchIcon = () => (
  <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const ImagePlaceholderIcon = () => (
  <svg className="placeholder-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
  </svg>
);

const AddMealModal = ({ onClose, onMealAdded, selectedDate, userId: propUserId }) => {
  const { t } = useTranslation();

  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [mealTypeIdx, setMealTypeIdx] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [userGuid, setUserGuid] = useState(propUserId || null);

  const MEAL_TYPE_MAP = ["Breakfast", "Lunch", "Dinner", "Snack"];
  const MEAL_TYPE_LABELS = [
    t("meal_type_1") || "Сніданок",
    t("meal_type_2") || "Обід",
    t("meal_type_3") || "Вечеря",
    t("meal_type_4") || "Перекус",
  ];

  const API_URL = process.env.REACT_APP_API_URL || "";

  const getToken = () => localStorage.getItem("helth-token");

  const safeRecipeField = (r, f) => {
    if (!r) return 0;
    return (r[f] ?? r[f.toLowerCase()] ?? 0);
  };

  const getRecipeImageUrl = (recipe) => {
    const imageUrl = recipe.ImageUrl || recipe.imageUrl || recipe.image || recipe.picture;
    
    if (!imageUrl) return null;
    
    if (imageUrl.startsWith('http')) {
      return imageUrl;
    }
    
    if (imageUrl.startsWith('/')) {
      return `${API_URL}${imageUrl}`;
    }
    
    return `${API_URL}/images/recipes/${imageUrl}`;
  };

  const getRecipeDescription = (recipe) => {
    return recipe.Description || recipe.description || recipe.shortDescription || '';
  };

  useEffect(() => {
    if (propUserId) return;

    const tok = getToken();
    if (!tok) return;

    try {
      const payload = JSON.parse(atob(tok.split(".")[1]));
      const idFromToken = payload.sub || payload.userId || payload.id || payload.nameid;
      if (idFromToken) setUserGuid(idFromToken);
    } catch (err) {
      console.warn("Не вдалося отримати userId з токена:", err);
    }
  }, [propUserId]);

  const fetchRecipes = async (q = "") => {
    setLoading(true);
    setError("");
    try {
      const token = getToken();
      const url = q ? `${API_URL}/api/recipes?search=${encodeURIComponent(q)}` : `${API_URL}/api/recipes`;
      const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};
      const resp = await axios.get(url, config);
      setRecipes(Array.isArray(resp.data) ? resp.data : []);
    } catch (err) {
      console.error("Помилка завантаження рецептів:", err);
      if (err.response?.status === 401) {
        setError(t("error_auth_recipes") || "Помилка авторизації при завантаженні рецептів.");
      } else {
        setError(t("error_loading_recipes") || "Помилка завантаження рецептів.");
      }
      setRecipes([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  const filteredRecipes = useMemo(() => {
    const q = (searchQuery || "").trim().toLowerCase();
    if (!q) return recipes;
    return recipes.filter((r) => (r.Name || r.name || "").toLowerCase().includes(q));
  }, [recipes, searchQuery]);

  const selectRecipe = (recipe) => {
    setSelectedRecipe(recipe);
    setError("");
  };

  const handleAddMeal = async () => {
    setError("");

    const token = getToken();
    const effectiveUserId = userGuid || propUserId;
    if (!effectiveUserId) {
      setError(t("error_no_user") || "Не вдалося визначити користувача. Будь ласка, авторизуйтесь.");
      return;
    }
    if (!selectedRecipe) {
      setError(t("error_no_recipe_selected") || "Виберіть рецепт.");
      return;
    }

    setSubmitting(true);

    try {
      const dto = {
        userId: effectiveUserId,
        dietPlanId: null,
        recipeId: selectedRecipe.Id ?? selectedRecipe.id,
        foodItemName: selectedRecipe.Name ?? selectedRecipe.name ?? "",
        quantity: Number(quantity) || 1,
        proteinsG: Number(safeRecipeField(selectedRecipe, "Protein")) || 0,
        carbsG: Number(safeRecipeField(selectedRecipe, "Carbs")) || 0,
        fatsG: Number(safeRecipeField(selectedRecipe, "Fat")) || 0,
        calories: Math.round(Number(safeRecipeField(selectedRecipe, "Kkal")) || 0),
        mealType: MEAL_TYPE_MAP[mealTypeIdx],
        entryDate: (selectedDate instanceof Date) ? selectedDate.toISOString() : new Date(selectedDate).toISOString()
      };

      if (!API_URL) throw new Error("REACT_APP_API_URL is not set");

      await axios.post(`${API_URL}/api/meals`, dto, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });

      if (typeof onMealAdded === "function") onMealAdded();
      onClose();
    } catch (err) {
      console.error("Помилка при додаванні прийому їжі:", err);
      if (err.response) {
        if (err.response.status === 401) setError(t("error_auth") || "Помилка авторизації.");
        else if (err.response.status === 400) setError(err.response.data?.message || "Помилка валідації даних.");
        else setError(err.response.data?.message || "Помилка при додаванні прийому їжі.");
      } else {
        setError(err.message || "Мережева помилка");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="add-meal-modal-overlay" onClick={onClose}>
      <div className="add-meal-modal" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
        <div className="modal-header">
          <h2>{t("add_meal_title") || "Додати прийом їжі"}</h2>
        </div>

        <div className="modal-body">
          <div className="modal-left-panel">
            <div className="form-section">
              <label className="section-label">{t("meal_type_label") || "Прийом їжі"}</label>
              <select
                className="meal-type-select"
                value={mealTypeIdx}
                onChange={(e) => setMealTypeIdx(Number(e.target.value))}
              >
                {MEAL_TYPE_LABELS.map((lab, i) => (
                  <option value={i} key={i}>{lab}</option>
                ))}
              </select>
            </div>

            <div className="form-section">
              <label className="section-label">{t("portions_label") || "Кількість (порцій)"}</label>
              <input
                className="portions-input"
                type="number"
                min="0.01"
                step="0.01"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>

            <div className="form-section">
              <label className="section-label">{t("selected_recipe_label") || "Вибраний рецепт"}</label>
              <div className="selected-recipe-section">
                {selectedRecipe ? (
                  <div className="selected-recipe-info">
                    <div className="recipe-name">{selectedRecipe.Name ?? selectedRecipe.name}</div>
                    <div className="recipe-macros">
                      <span className="meal-macro-item">{Math.round(safeRecipeField(selectedRecipe, "Kkal"))} ккал</span>
                      <span className="meal-macro-item">{safeRecipeField(selectedRecipe, "Protein")}г біл</span>
                      <span className="meal-macro-item">{safeRecipeField(selectedRecipe, "Fat")}г жир</span>
                      <span className="meal-macro-item">{safeRecipeField(selectedRecipe, "Carbs")}г вугл</span>
                    </div>
                  </div>
                ) : (
                  <div className="no-recipe-selected">{t("no_recipe_selected") || "Нічого не обрано"}</div>
                )}
              </div>
            </div>

            <div className="form-actions">
              <button
                className="add-button"
                onClick={handleAddMeal}
                disabled={submitting || !selectedRecipe || (!userGuid && !propUserId)}
              >
                {submitting ? (t("adding_meal") || "Додавання...") : (t("add_to_ration_button") || "Додати до раціону")}
              </button>
              <button className="cancel-button" onClick={onClose}>
                {t("cancel_button") || "Скасувати"}
              </button>
            </div>

            {error && <div className="error-text" role="alert">{error}</div>}
          </div>

          <div className="modal-right-panel">
            <div className="search-section">
              <div className="search-wrapper">
                <SearchIcon />
                <input
                  className="search-input"
                  placeholder={t("search_recipes_placeholder") || "Пошук рецептів..."}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <button
                className="refresh-button"
                onClick={() => fetchRecipes(searchQuery)}
                disabled={loading}
              >
                {t("refresh_button") || "Оновити"}
              </button>
            </div>

            <div className="recipes-container scrollable-card-container">
              {loading ? (
                <div className="loading-text">{t("loading_recipes") || "Завантаження рецептів..."}</div>
              ) : filteredRecipes.length === 0 ? (
                <div className="no-recipes-text">{t("no_recipes_found") || "Рецепти не знайдені."}</div>
              ) : (
                <div className="recipes-grid" role="list">
                  {filteredRecipes.map((recipe) => {
                    const id = recipe.Id ?? recipe.id;
                    const imageUrl = getRecipeImageUrl(recipe);
                    const description = getRecipeDescription(recipe);

                    return (
                      <div
                        key={id}
                        role="listitem"
                        className={`recipe-card-modal ${
                          selectedRecipe?.Id === id || selectedRecipe?.id === id ? "selected" : ""
                        }`}
                        onClick={() => selectRecipe(recipe)}
                        tabIndex={0}
                        onKeyDown={(e) => { if (e.key === "Enter") selectRecipe(recipe); }}
                      >
                        <div className="recipe-image-container">
                          {imageUrl ? (
                            <img 
                              src={imageUrl} 
                              alt={recipe.Name || recipe.name}
                              className="recipe-image"
                              onError={(e) => {
                                e.target.style.display = 'none';
                                e.target.nextSibling.style.display = 'flex';
                              }}
                            />
                          ) : null}
                          <div 
                            className="recipe-image-placeholder"
                            style={{ display: imageUrl ? 'none' : 'flex' }}
                          >
                            <ImagePlaceholderIcon />
                          </div>
                        </div>
                        
                        <div className="recipe-card-content">
                          <div className="recipe-card-name">
                            {recipe.Name ?? recipe.name}
                          </div>
                          
                          {description && (
                            <div className="recipe-card-description">
                              {description}
                            </div>
                          )}
                          
                          <div className="recipe-card-macros">
                            <span>{Math.round(safeRecipeField(recipe, "Kkal"))} ккал</span>
                            <span>{safeRecipeField(recipe, "Protein")}г біл</span>
                            <span>{safeRecipeField(recipe, "Fat")}г жир</span>
                            <span>{safeRecipeField(recipe, "Carbs")}г вугл</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddMealModal;