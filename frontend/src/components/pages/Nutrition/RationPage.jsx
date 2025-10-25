import React, { useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import DatePickerComponent from "../../elements/Nutrion/DatePickerComponent";
import AddMealModal from "../Nutrition/AddMealModal"; 
import RecipeMiniCard from "../../elements/Nutrion/RecipeMiniCard";
import "react-datepicker/dist/react-datepicker.css";
import "../../styles/nutrition/nutrition-tracker.css";
import "../../styles/nutrition/ration-page.css";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

const CrossIcon = ({ size = 24, color = "currentColor", ...props }) => (
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

const getUserIdFromToken = () => {
    try {
        const token = localStorage.getItem("helth-token");
        if (!token) return null;
        const payload = JSON.parse(atob(token.split(".")[1]));
        return payload.sub || payload.userId || payload.id || payload.nameid || null;
    } catch (error) {
        console.error("Помилка при декодуванні токена:", error);
        return null;
    }
};

const mapMealType = (mealType) => {
    switch (mealType) {
        case 0: return "Breakfast";
        case 1: return "Lunch";
        case 2: return "Dinner";
        case 3: return "Snack";
        case "Breakfast": return "Breakfast";
        case "Lunch": return "Lunch";
        case "Dinner": return "Dinner";
        case "Snack": return "Snack";
        default: return "Unknown";
    }
};

const fetchRecipeDetails = async (recipeId, token) => {
    if (!recipeId) return { imageUrl: "", ingredients: [] };

    try {
        const response = await axios.get(`${API_URL}/api/recipes/${recipeId}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        
        return {
            imageUrl: response.data.ImageUrl || "",
            ingredients: response.data.Ingredients?.map(i => ({
                name: i.Name,
                amount: `${i.Amount} ${i.Unit}`,
            })) || [],
        };
    } catch (error) {
        console.warn(`Помилка при отриманні рецепта ${recipeId}:`, error.message);
        return { imageUrl: "", ingredients: [] };
    }
};

const normalizeMeal = (meal, recipeDetails) => ({
    id: meal.id || meal.Id,
    mealType: meal.mealType || meal.MealType,
    name: meal.FoodItemName || 'N/A',
    calories: meal.Calories || 0,
    proteinsG: meal.ProteinsG || 0,
    fatsG: meal.FatsG || 0,
    carbsG: meal.CarbsG || 0,
    amount: meal.Quantity || 0,
    date: meal.EntryDate,
    imageUrl: recipeDetails?.imageUrl || "",
    recipeIngredients: recipeDetails?.ingredients || [],
    recipeId: meal.RecipeId || meal.recipeId, 
});

const RationPage = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [userId, setUserId] = useState(null);
    const [meals, setMeals] = useState([]);
    const [selectedMeal, setSelectedMeal] = useState(null); 
    const [combinedIngredients, setCombinedIngredients] = useState([]);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const userIdFromToken = getUserIdFromToken();
        if (userIdFromToken) {
            setUserId(userIdFromToken);
        } else {
            setError(t("auth_error") || "Помилка авторизації. Будь ласка, увійдіть знову.");
            navigate("/login");
        }
    }, [navigate, t]);

    const fetchMeals = useCallback(async () => {
        if (!userId) return;

        setLoading(true);
        setError("");

        const token = localStorage.getItem("helth-token");
        if (!token) {
            setError(t("auth_error") || "Токен відсутній. Будь ласка, увійдіть знову.");
            navigate("/login");
            setLoading(false);
            return;
        }

        const formattedDate = selectedDate.toISOString().split("T")[0];

        try {
            const mealsResponse = await axios.get(
                `${API_URL}/api/meals/user/${encodeURIComponent(userId)}/date/${formattedDate}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            const rawMeals = mealsResponse.data || [];
            
            const uniqueRecipeIds = [...new Set(rawMeals
                .map(m => m.RecipeId || m.recipeId)
                .filter(id => id != null && id !== ""))]
                .map(id => id.toUpperCase());
                
            const recipeDetailsPromises = uniqueRecipeIds.map(id => fetchRecipeDetails(id, token));
            const fetchedDetails = await Promise.all(recipeDetailsPromises);

            const detailsMap = new Map();
            uniqueRecipeIds.forEach((id, index) => {
                detailsMap.set(id, fetchedDetails[index]);
            });

            const normalizedMeals = rawMeals.map(meal => {
                const recipeId = (meal.RecipeId || meal.recipeId)?.toUpperCase();
                const details = recipeId ? detailsMap.get(recipeId) : null;
                return normalizeMeal(meal, details);
            });

            setMeals(normalizedMeals);

            const firstMealWithIngredients = normalizedMeals.find(meal => meal.recipeIngredients.length > 0);
            
            if (firstMealWithIngredients) {
                setSelectedMeal(firstMealWithIngredients);
                setCombinedIngredients(firstMealWithIngredients.recipeIngredients);
            } else {
                setSelectedMeal(null);
                setCombinedIngredients([]);
            }

        } catch (err) {
            console.error("Помилка при завантаженні раціону:", err.response?.data || err.message);
            if (err.response?.status === 401) {
                setError(t("auth_error") || "Помилка авторизації. Будь ласка, увійдіть знову.");
                navigate("/login");
            } else if (err.response?.status === 404) {
                setMeals([]);
                setSelectedMeal(null);
                setCombinedIngredients([]);
            } else {
                setError(t("error_loading_data") || "Помилка завантаження даних. Будь ласка, спробуйте пізніше.");
            }
        } finally {
            setLoading(false);
        }
    }, [userId, selectedDate, navigate, t]);

    useEffect(() => {
        if (userId) {
            fetchMeals();
        }
    }, [userId, selectedDate, fetchMeals]);
    
    const handleSelectMeal = useCallback((meal) => {
        if (selectedMeal && selectedMeal.id === meal.id) {
            setSelectedMeal(null);
            
            const firstMealWithIngredients = meals.find(m => m.recipeIngredients.length > 0);
            if (firstMealWithIngredients) {
                setSelectedMeal(firstMealWithIngredients);
                setCombinedIngredients(firstMealWithIngredients.recipeIngredients);
            } else {
                setCombinedIngredients([]);
            }
        } else {
            setSelectedMeal(meal);
            setCombinedIngredients(meal.recipeIngredients);
        }
    }, [selectedMeal, meals]); 
    
    const handleDeleteMeal = async (mealId) => {
        const token = localStorage.getItem("helth-token");
        if (!token) return;

        try {
            await axios.delete(`${API_URL}/api/meals/${mealId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            await fetchMeals();
        } catch (error) {
            console.error("Помилка при видаленні прийому їжі:", error);
            setError(t("error_deleting_meal") || "Помилка при видаленні прийому їжі.");
        }
    };

    const calculateProgress = () => {
        let totalCalories = 0;
        let totalProtein = 0;
        let totalFat = 0;
        let totalCarbs = 0;

        meals.forEach((meal) => {
            totalCalories += meal.calories || 0;
            totalProtein += meal.proteinsG || 0;
            totalFat += meal.fatsG || 0;
            totalCarbs += meal.carbsG || 0;
        });

        return {
            calories: totalCalories,
            protein: Math.round(totalProtein),
            fat: Math.round(totalFat),
            carbs: Math.round(totalCarbs),
        };
    };

    const progress = calculateProgress();

    const formatProgress = (current, unit = "") => `${current} ${unit}`;

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const handlePrevDay = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() - 1);
    setSelectedDate(newDate);
    };

    const handleNextDay = () => {
        const newDate = new Date(selectedDate);
        newDate.setDate(newDate.getDate() + 1);
        setSelectedDate(newDate);
    };

    const handleOpenAddModal = () => {
        if (!userId) {
            alert(t("auth_error") || "Помилка авторизації. Будь ласка, увійдіть в систему.");
            return;
        }
        setIsAddModalOpen(true);
    };

    const handleCloseAddModal = () => setIsAddModalOpen(false);

    const handleAfterAdded = () => {
        fetchMeals();
    };

    const groupedMeals = {
        Breakfast: meals.filter((meal) => mapMealType(meal.mealType) === "Breakfast"),
        Lunch: meals.filter((meal) => mapMealType(meal.mealType) === "Lunch"),
        Dinner: meals.filter((meal) => mapMealType(meal.mealType) === "Dinner"),
        Snack: meals.filter((meal) => mapMealType(meal.mealType) === "Snack"),
    };

    const getMealTypeName = (mealType) => {
        const mappedType = mapMealType(mealType);
        switch (mappedType) {
            case "Breakfast": return t("breakfast") || "Сніданок";
            case "Lunch": return t("lunch") || "Обід";
            case "Dinner": return t("dinner") || "Вечеря";
            case "Snack": return t("snack") || "Перекус";
            default: return t("meal") || "Прийом їжі";
        }
    };

    return (
        <div className="nutrition-tracker-page-content">
            <div className="navigation-tabs-wrapper">
                <Link to="/eating" className="tab-item gradient-tab">
                    {t("nt_tracker_tab") || "Трекер харчування"}
                </Link>
                <span className="tab-item active">{t("nt_ration_tab") || "Раціон"}</span>
                <Link to="/eating/recipes" className="tab-item gradient-tab">
                    {t("nt_recipes_tab") || "Рецепти"}
                </Link>
            </div>

            <DatePickerComponent
                selectedDate={selectedDate}
                onDateChange={handleDateChange}
                onPrevDay={handlePrevDay}
                onNextDay={handleNextDay}
            />

            <div className="scrollable-main-content scroll-data">
                <div className="ration-progress-bar-container">
                    <div className="macro-item macro-calories">
                        <span className="progress-value">{t("nt_calories_label") || "Калорії"}</span>
                        <span className="progress-value-large">{formatProgress(progress.calories)}</span>
                    </div>
                    <div className="macro-item">
                        <span className="progress-value">{t("nt_protein_label") || "Білки"}</span>
                        <span className="progress-value-large">
                            {formatProgress(progress.protein, t("nt_g_abbr") || "г")}
                        </span>
                    </div>
                    <div className="macro-item">
                        <span className="progress-value">{t("nt_fat_label") || "Жири"}</span>
                        <span className="progress-value-large">
                            {formatProgress(progress.fat, t("nt_g_abbr") || "г")}
                        </span>
                    </div>
                    <div className="macro-item">
                        <span className="progress-value">{t("nt_carbs_label") || "Вуглеводи"}</span>
                        <span className="progress-value-large">
                            {formatProgress(progress.carbs, t("nt_g_abbr") || "г")}
                        </span>
                    </div>
                </div>

                <div className="ration-grid-wrapper">
                    <div className="ration-left-column">
                        <div className="meal-cards-grid">
                            {["Breakfast", "Lunch", "Dinner", "Snack"].map((mealType) => (
                                groupedMeals[mealType].map((meal) => (
                                    <RecipeMiniCard 
                                        key={meal.id} 
                                        onClick={() => handleSelectMeal(meal)}
                                        className={selectedMeal && selectedMeal.id === meal.id ? 'selected' : ''}
                                        recipe={{ 
                                            Time: getMealTypeName(meal.mealType), 
                                            Name: meal.name,
                                            Kkal: meal.calories,
                                            Protein: meal.proteinsG,
                                            Fat: meal.fatsG,
                                            Carbs: meal.carbsG,
                                            ImageUrl: meal.imageUrl,
                                        }} 
                                    />
                                ))
                            ))}
                            
                            <div
                                className="meal-ration-card add-meal-card" 
                                onClick={handleOpenAddModal}
                                role="button"
                                tabIndex={0}
                            >
                                <CrossIcon className="add-icon" size="100%" color="white" /> 
                                <div className="add-gradient-effect" />
                                <h4 className="add-meal-text">
                                    {t("nt_add_meal_button_multiline") || <>Додайте свій<br />прийом їжі</>}
                                </h4>
                            </div>
                        </div>
                    </div>

                    <div className="ration-right-column">
                        <div className="ingredients-card glass-card">
                            <h2 className="ingredients-title">
                                {selectedMeal 
                                    ? (t("nt_ingredients_for") || "Інгредієнти для") + " " + selectedMeal.name 
                                    : t("nt_ingredients_title_day") || "Інгредієнти за день"} 
                                {selectedMeal ? null : ` ${new Date(selectedDate).toLocaleDateString("uk-UA")}`}
                            </h2>  
                            
                            <div className="ingredients-list-wrapper">
                                {loading ? (
                                    <p style={{ color: 'rgba(255,255,255,0.7)' }}>
                                        {t("loading_ingredients") || "Завантаження інгредієнтів..."}
                                    </p>
                                ) : combinedIngredients.length > 0 ? (
                                    combinedIngredients.map((item, index) => (
                                        <div className="ingredient-item" key={index}>
                                            <span className="ingredient-name">{item.name}</span>
                                            <span className="ingredient-amount">{item.amount}</span>
                                        </div>
                                    ))
                                ) : selectedMeal ? (
                                    <p style={{ color: 'rgba(255,255,255,0.7)' }}>
                                        {t("no_recipe_ingredients") || "Цей прийом їжі не має детальних інгредієнтів."}
                                    </p>
                                ) : (
                                    <p style={{ color: 'rgba(255,255,255,0.7)' }}>
                                        {t("no_ingredients_today") || "В раціоні немає рецептів з детальними інгредієнтами."}
                                    </p>
                                )}
                            </div>
                            
                            <div className="ingredients-actions">
                                {selectedMeal && (
                                    <button 
                                        className="delete-meal-button"
                                        onClick={() => handleDeleteMeal(selectedMeal.id)}
                                    >
                                        {t("nt_delete_meal_button") || "Видалити прийом їжі"}
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {isAddModalOpen && userId && (
                <AddMealModal
                    onClose={handleCloseAddModal}
                    onMealAdded={handleAfterAdded}
                    selectedDate={selectedDate}
                    userId={userId}
                />
            )}
        </div>
    );
};

export default RationPage;