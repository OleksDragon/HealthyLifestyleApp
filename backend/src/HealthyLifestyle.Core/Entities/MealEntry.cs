using System;
using HealthyLifestyle.Core.Enums;

namespace HealthyLifestyle.Core.Entities
{
    /// <summary>
    /// Клас, що представляє запис про прийом їжі, успадкований від BaseEntity.
    /// Використовується для відстеження харчування користувача з деталями про продукти, калорії та типи прийомів їжі.
    /// </summary>
    public class MealEntry : BaseEntity
    {
        #region Властивості

        /// <summary>
        /// Ідентифікатор користувача, який створив запис.
        /// </summary>
        public Guid UserId { get; set; }

        /// <summary>
        /// Користувач, пов’язаний із записом (обов’язково).
        /// </summary>
        public User? User { get; set; }

        /// <summary>
        /// Ідентифікатор плану харчування (опціонально).
        /// </summary>
        public Guid? DietPlanId { get; set; }

        /// <summary>
        /// План харчування, пов’язаний із записом (опціонально).
        /// </summary>
        public virtual DietPlan? DietPlan { get; set; }

        /// <summary>
        /// Назва продукту (обов’язково).
        /// </summary>
        public string? FoodItemName { get; set; }

        /// <summary>
        /// Кількість продукту (у грамах або одиницях).
        /// </summary>
        public decimal Quantity { get; set; }

        /// <summary>
        /// Кількість білків (у грамах).
        /// </summary>
        public double ProteinsG { get; set; }

        /// <summary>
        /// Кількість вуглеводів (у грамах).
        /// </summary>
        public double CarbsG { get; set; }

        /// <summary>
        /// Кількість жирів (у грамах).
        /// </summary>
        public double FatsG { get; set; }

        /// <summary>
        /// Кількість калорій.
        /// </summary>
        public int Calories { get; set; }

        /// <summary>
        /// Тип прийому їжі (Breakfast, Lunch, Dinner, Snack).
        /// </summary>
        public MealType MealType { get; set; }

        /// <summary>
        /// Дата та час створення запису.
        /// </summary>
        public DateTime EntryDate { get; set; }

        public Guid? RecipeId { get; set; } // Связь с рецептом
        public virtual Recipe? Recipe { get; set; }

        #endregion

        #region Конструктори

        /// <summary>
        /// Параметризатор за замовчуванням для використання Entity Framework Core.
        /// </summary>
        protected MealEntry() : base()
        {
        }

        /// <summary>
        /// Ініціалізує новий екземпляр запису про прийом їжі з базовими даними.
        /// </summary>
        /// <param name="userId">Ідентифікатор користувача.</param>
        /// <param name="foodItemName">Назва продукту.</param>
        /// <param name="quantity">Кількість продукту.</param>
        /// <param name="proteinsG">Кількість білків (у грамах).</param>
        /// <param name="carbsG">Кількість вуглеводів (у грамах).</param>
        /// <param name="fatsG">Кількість жирів (у грамах).</param>
        /// <param name="calories">Кількість калорій.</param>
        /// <param name="mealType">Тип прийому їжі.</param>
        /// <param name="entryDate">Дата та час запису.</param>
        /// <param name="dietPlanId">Ідентифікатор плану харчування (опціонально).</param>
        /// <exception cref="ArgumentException">Виникає, якщо передані недійсні дані (наприклад, від’ємні значення або порожня назва продукту).</exception>
        public MealEntry(
            Guid userId,
            User user,
            string foodItemName,
            decimal quantity,
            double proteinsG,
            double carbsG,
            double fatsG,
            int calories,
            MealType mealType,
            DateTime entryDate,
            Guid? dietPlanId = null)
            : this()
        {
            if (userId == Guid.Empty)
                throw new ArgumentException("Ідентифікатор користувача не може бути порожнім.", nameof(userId));
            if (string.IsNullOrWhiteSpace(foodItemName))
                throw new ArgumentException("Назва продукту є обов’язковою.", nameof(foodItemName));
            if (quantity < 0)
                throw new ArgumentException("Кількість продукту не може бути від’ємною.", nameof(quantity));
            if (proteinsG < 0 || carbsG < 0 || fatsG < 0)
                throw new ArgumentException("Кількість білків, вуглеводів і жирів не може бути від’ємною.", nameof(proteinsG));
            if (calories < 0)
                throw new ArgumentException("Кількість калорій не може бути від’ємною.", nameof(calories));

            UserId = userId;
            User = user;
            FoodItemName = foodItemName;
            Quantity = quantity;
            ProteinsG = proteinsG;
            CarbsG = carbsG;
            FatsG = fatsG;
            Calories = calories;
            MealType = mealType;
            EntryDate = entryDate;
            DietPlanId = dietPlanId;
            SetUpdatedAt();
        }

        #endregion

        #region Методи

        /// <summary>
        /// Оновлює дані запису про прийом їжі з новими значеннями (опціонально).
        /// </summary>
        /// <param name="foodItemName">Нова назва продукту (опціонально).</param>
        /// <param name="quantity">Нова кількість продукту (опціонально).</param>
        /// <param name="proteinsG">Нова кількість білків (опціонально).</param>
        /// <param name="carbsG">Нова кількість вуглеводів (опціонально).</param>
        /// <param name="fatsG">Нова кількість жирів (опціонально).</param>
        /// <param name="calories">Нова кількість калорій (опціонально).</param>
        /// <param name="mealType">Новий тип прийому їжі (опціонально).</param>
        /// <param name="entryDate">Нова дата запису (опціонально).</param>
        /// <param name="dietPlanId">Новий ідентифікатор плану харчування (опціонально).</param>
        /// <exception cref="ArgumentException">Виникає, якщо передані недійсні дані (наприклад, від’ємні значення або порожня назва продукту).</exception>
        public void UpdateMealEntry(
            string? foodItemName = null,
            decimal? quantity = null,
            double? proteinsG = null,
            double? carbsG = null,
            double? fatsG = null,
            int? calories = null,
            MealType? mealType = null,
            DateTime? entryDate = null,
            Guid? dietPlanId = null)
        {
            if (foodItemName != null && string.IsNullOrWhiteSpace(foodItemName))
                throw new ArgumentException("Назва продукту є обов’язковою.", nameof(foodItemName));
            if (quantity.HasValue && quantity.Value < 0)
                throw new ArgumentException("Кількість продукту не може бути від’ємною.", nameof(quantity));
            if (proteinsG.HasValue && proteinsG.Value < 0)
                throw new ArgumentException("Кількість білків не може бути від’ємною.", nameof(proteinsG));
            if (carbsG.HasValue && carbsG.Value < 0)
                throw new ArgumentException("Кількість вуглеводів не може бути від’ємною.", nameof(carbsG));
            if (fatsG.HasValue && fatsG.Value < 0)
                throw new ArgumentException("Кількість жирів не може бути від’ємною.", nameof(fatsG));
            if (calories.HasValue && calories.Value < 0)
                throw new ArgumentException("Кількість калорій не може бути від’ємною.", nameof(calories));

            if (foodItemName != null) FoodItemName = foodItemName;
            if (quantity.HasValue) Quantity = quantity.Value;
            if (proteinsG.HasValue) ProteinsG = proteinsG.Value;
            if (carbsG.HasValue) CarbsG = carbsG.Value;
            if (fatsG.HasValue) FatsG = fatsG.Value;
            if (calories.HasValue) Calories = calories.Value;
            if (mealType.HasValue) MealType = mealType.Value;
            if (entryDate.HasValue) EntryDate = entryDate.Value;
            if (dietPlanId.HasValue) DietPlanId = dietPlanId.Value;
            SetUpdatedAt();
        }

        /// <summary>
        /// Розраховує загальну калорійність на основі кількості білків, вуглеводів і жирів.
        /// Формула: (Білки * 4) + (Вуглеводи * 4) + (Жири * 9).
        /// </summary>
        /// <returns>Розрахована кількість калорій.</returns>
        public int CalculateCalories()
        {
            return (int)Math.Round(ProteinsG * 4 + CarbsG * 4 + FatsG * 9);
        }

        #endregion
    }

}