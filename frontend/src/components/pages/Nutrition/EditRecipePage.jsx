import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "../../styles/nutrition/add-recipe-page.css";

const EditRecipePage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    kkal: "",
    protein: "",
    fat: "",
    carbs: "",
    time: "",
    videoUrl: "",
    ingredients: [{ name: "", amount: "" }],
    steps: [""]
  });

  const [imageFile, setImageFile] = useState(null);
  const [currentImageUrl, setCurrentImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [message, setMessage] = useState({ text: "", type: "" });

  const getImageUrl = (url) => {
    if (!url) return "";
    if (url.startsWith('http')) return url;
    return `http://${url}`;
  };

  const showMessage = (text, type) => {
    setMessage({ text, type });
    setTimeout(() => {
      setMessage({ text: "", type: "" });
    }, 5000);
  };

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(process.env.REACT_APP_API_URL + `/api/recipes/${id}`);
        const data = response.data;

        const normalizedRecipe = {
          name: data.Name || "",
          description: data.Description || "",
          kkal: data.Kkal || "",
          protein: data.Protein || "",
          fat: data.Fat || "",
          carbs: data.Carbs || "",
          time: data.Time || "",
          videoUrl: data.VideoUrl || "",
          ingredients: data.Ingredients?.map(i => ({
            name: i.Name || "",
            amount: i.Amount || ""
          })) || [{ name: "", amount: "" }],
          steps: data.Steps || [""]
        };

        setFormData(normalizedRecipe);
        setCurrentImageUrl(getImageUrl(data.ImageUrl)); 
      } catch (error) {
        console.error("❌ Помилка завантаження рецепта:", error);
        showMessage(t("loadRecipeError"), "error");
      } finally {
        setFetchLoading(false);
      }
    };

    fetchRecipe();
  }, [id, t]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleIngredientChange = (index, field, value) => {
    const updatedIngredients = [...formData.ingredients];
    updatedIngredients[index][field] = value;
    setFormData(prev => ({
      ...prev,
      ingredients: updatedIngredients
    }));
  };

  const handleStepChange = (index, value) => {
    const updatedSteps = [...formData.steps];
    updatedSteps[index] = value;
    setFormData(prev => ({
      ...prev,
      steps: updatedSteps
    }));
  };

  const addIngredient = () => {
    setFormData(prev => ({
      ...prev,
      ingredients: [...prev.ingredients, { name: "", amount: "" }]
    }));
  };

  const removeIngredient = (index) => {
    if (formData.ingredients.length > 1) {
      const updatedIngredients = formData.ingredients.filter((_, i) => i !== index);
      setFormData(prev => ({
        ...prev,
        ingredients: updatedIngredients
      }));
    }
  };

  const addStep = () => {
    setFormData(prev => ({
      ...prev,
      steps: [...prev.steps, ""]
    }));
  };

  const removeStep = (index) => {
    if (formData.steps.length > 1) {
      const updatedSteps = formData.steps.filter((_, i) => i !== index);
      setFormData(prev => ({
        ...prev,
        steps: updatedSteps
      }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: "", type: "" });

    if (!formData.name.trim() || !formData.description.trim() || !formData.time.trim()) {
      showMessage(t("fillRequiredFields"), "error");
      setLoading(false);
      return;
    }

    try {
      const submitData = new FormData();

      submitData.append("Name", formData.name);
      submitData.append("Description", formData.description);
      submitData.append("Kkal", Number(formData.kkal) || 0);
      submitData.append("Protein", Number(formData.protein) || 0);
      submitData.append("Fat", Number(formData.fat) || 0);
      submitData.append("Carbs", Number(formData.carbs) || 0);
      submitData.append("Time", formData.time);
      submitData.append("VideoUrl", formData.videoUrl);

      if (imageFile) {
        submitData.append("ImageFile", imageFile);
      } else {
        submitData.append("ImageUrl", currentImageUrl.replace('http://', ''));
      }

      const validIngredients = formData.ingredients
        .filter(ing => ing.name.trim() !== "" && ing.amount.trim() !== "");

      if (validIngredients.length === 0) {
        showMessage(t("addAtLeastOneIngredient"), "error");
        setLoading(false);
        return;
      }

      validIngredients.forEach((ingredient) => {
        const ingredientString = `${ingredient.name.trim()} :${ingredient.amount.trim()}`;
        submitData.append("Ingredients", ingredientString);
      });

      const validSteps = formData.steps.filter(step => step.trim() !== "");

      if (validSteps.length === 0) {
        showMessage(t("addAtLeastOneStep"), "error");
        setLoading(false);
        return;
      }
      
      validSteps.forEach((step, index) => {
        submitData.append(`Steps[${index}]`, step);
      });

      const token = localStorage.getItem("helth-token");
      
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          ...(token && { Authorization: `Bearer ${token}` })
        },
      };

      const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";
      
      await axios.put(`${API_URL}/api/recipes/${id}`, submitData, config);

      showMessage(t("recipeUpdatedSuccess"), "success");

      setTimeout(() => {
        navigate(`/eating/recipes/${id}`);
      }, 2000);

    } catch (error) {
      console.error("❌ Помилка при оновленні рецепта:", error);
      const errorMessage = error.response?.data?.message || t("updateRecipeError");
      showMessage(`❌ ${errorMessage}`, "error");
    } finally {
      setLoading(false);
    }
  };

  if (fetchLoading) {
    return <p className="loading-text">{t("loadingRecipeForEdit")}</p>;
  }

  return (
    <div className="recipe-page-content-wrapper">
      <div className="scrollable-grid-content scroll-data">
        <div className="recipe-page-grid-v2">

          <div className="main-media-column">
            <div className="main-image-card glass-card">
              <div className="image-upload-section">
                <h2 className="card-title-white">{t("recipeImage")}</h2>                
                <div 
                  className={`image-upload-placeholder ${imageFile || currentImageUrl ? 'has-image' : ''}`}
                  onClick={() => document.getElementById('image-upload-input').click()}
                >
                  {imageFile ? (
                    <div className="image-preview">
                      <img 
                        src={URL.createObjectURL(imageFile)} 
                        alt="Preview" 
                        className="recipe-main-image-v2"
                      />
                      <div className="image-overlay">
                        <span className="change-image-text">{t("changeImage")}</span>
                      </div>
                    </div>
                  ) : currentImageUrl ? (
                    <div className="image-preview">
                      <img 
                        src={currentImageUrl} 
                        alt="Current recipe" 
                        className="recipe-main-image-v2"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                      <div className="image-overlay">
                        <span className="change-image-text">{t("changeImage")}</span>
                      </div>
                    </div>
                  ) : (
                    <div className="upload-placeholder-content">
                      <div className="upload-icon">
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                          <polyline points="17 8 12 3 7 8"/>
                          <line x1="12" y1="3" x2="12" y2="15"/>
                        </svg>
                      </div>
                      <p className="upload-text">{t("clickToUploadImage")}</p>
                      <p className="upload-subtext">{t("imageFormats")}</p>
                    </div>
                  )}
                </div>
                
                <input
                  id="image-upload-input"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="file-input-hidden"
                />
                {currentImageUrl && !imageFile && (
                  <p className="current-image-note">{t("currentImageWillBeUsed")}</p>
                )}
              </div>
            </div>

            <div className="recipe-steps-card glass-card">
              <h2 className="card-title-white">{t("cookingSteps")} *</h2>
              <div className="steps-list">
                {formData.steps.map((step, index) => (
                  <div key={index} className="step-input-group">
                    <label>{t("step")} {index + 1}</label>
                    <textarea
                      value={step}
                      onChange={(e) => handleStepChange(index, e.target.value)}
                      className="step-textarea"
                      placeholder={t("describeStepPlaceholder")}
                    />
                    {formData.steps.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeStep(index)}
                        className="remove-button"
                      >
                        {t("delete")}
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addStep}
                  className="add-button"
                >
                  + {t("addStep")}
                </button>
              </div>
            </div>
          </div>

          <div className="details-sidebar-column">
            <form onSubmit={handleSubmit}>
              <div className="header-details-card">
                <h1 className="recipe-title-v2">{t("editRecipe")}</h1>         
                
                <div className="form-group">
                  <label>{t("recipeName")} *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="form-input"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>{t("description")} *</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="form-textarea"
                    required
                  />
                </div>

                <div className="macros-card-v2">
                  <div className="macro-input-group">
                    <div className="macro-item">
                      <label>{t("calories")}</label>
                      <input
                        type="number"
                        name="kkal"
                        value={formData.kkal}
                        onChange={handleInputChange}
                        className="macro-input"
                        min="0"
                      />
                    </div>
                    <div className="macro-item">
                      <label>{t("proteins")} (г)</label>
                      <input
                        type="number"
                        name="protein"
                        value={formData.protein}
                        onChange={handleInputChange}
                        className="macro-input"
                        min="0"
                      />
                    </div>
                    <div className="macro-item">
                      <label>{t("fats")} (г)</label>
                      <input
                        type="number"
                        name="fat"
                        value={formData.fat}
                        onChange={handleInputChange}
                        className="macro-input"
                        min="0"
                      />
                    </div>
                    <div className="macro-item">
                      <label>{t("carbs")} (г)</label>
                      <input
                        type="number"
                        name="carbs"
                        value={formData.carbs}
                        onChange={handleInputChange}
                        className="macro-input"
                        min="0"
                      />
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label>{t("cookingTime")} *</label>
                  <input
                    type="text"
                    name="time"
                    value={formData.time}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder={t("cookingTimePlaceholder")}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>{t("videoLink")}</label>
                  <input
                    type="url"
                    name="videoUrl"
                    value={formData.videoUrl}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="https://www.youtube.com/..."
                  />
                </div>
              </div>

              <div className="ingredients-card glass-card">
                <h2 className="card-title-white">{t("ingredients")} *</h2>
                <div className="ingredient-list-wrapper">
                  {formData.ingredients.map((ingredient, index) => (
                    <div key={index} className="ingredient-input-group">
                      <input
                        type="text"
                        value={ingredient.name}
                        onChange={(e) => handleIngredientChange(index, "name", e.target.value)}
                        className="ingredient-name-input"
                        placeholder={t("ingredientNamePlaceholder")}
                      />
                      <input
                        type="text"
                        value={ingredient.amount}
                        onChange={(e) => handleIngredientChange(index, "amount", e.target.value)}
                        className="ingredient-amount-input"
                        placeholder={t("ingredientAmountPlaceholder")}
                      />
                      {formData.ingredients.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeIngredient(index)}
                          className="remove-button small"
                        >
                          ×
                        </button>
                      )}
                    </div>
                  ))}                          

                  <button
                    type="button"
                    onClick={addIngredient}
                    className="add-button"
                  >
                    + {t("addIngredient")}
                  </button>
                </div>
              </div>

              {message.text && (
                <div className={`message-alert ${message.type}`}> 
                  {message.text} 
                </div>
              )}   

              <div className="submit-section">
                <button 
                  type="button"
                  className="back-recipe-button"
                  onClick={() => navigate(`/eating/recipes/${id}`)}
                >
                  {t("cancel")}
                </button>
                <button 
                  type="submit" 
                  className="add-recipe-button"
                  disabled={loading}
                >
                  {loading ? t("saving") : t("updateRecipe")}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditRecipePage;