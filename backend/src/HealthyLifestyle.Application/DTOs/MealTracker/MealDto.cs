using HealthyLifestyle.Core.Enums;

namespace HealthyLifestyle.Application.DTOs.MealTracker
{
    public class MealDto
    {
        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        public Guid? DietPlanId { get; set; }
        
        public Guid? RecipeId { get; set; }
        public string FoodItemName { get; set; } = string.Empty;
        public decimal Quantity { get; set; }
        public double ProteinsG { get; set; }
        public double CarbsG { get; set; }
        public double FatsG { get; set; }
        public int Calories { get; set; }
        public MealType MealType { get; set; }
        public DateTime EntryDate { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
    }

    public class CreateMealDto
    {
        public Guid UserId { get; set; }
        public Guid? DietPlanId { get; set; }
        public Guid? RecipeId { get; set; }
        public string FoodItemName { get; set; } = string.Empty;
        public decimal Quantity { get; set; }
        public double ProteinsG { get; set; }
        public double CarbsG { get; set; }
        public double FatsG { get; set; }
        public int Calories { get; set; }
        public MealType MealType { get; set; }
        public DateTime EntryDate { get; set; }

    }

    public class UpdateMealDto
    {
        public string? FoodItemName { get; set; }
        public decimal? Quantity { get; set; }
        public double? ProteinsG { get; set; }
        public double? CarbsG { get; set; }
        public double? FatsG { get; set; }
        public int Calories { get; set; }
        public MealType? MealType { get; set; }
        public DateTime? EntryDate { get; set; }
        public Guid? DietPlanId { get; set; }
    }
}
