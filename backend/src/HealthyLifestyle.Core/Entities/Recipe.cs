namespace HealthyLifestyle.Core.Entities
{
    public class Recipe
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public int Kkal { get; set; }
        public int Protein { get; set; }
        public int Fat { get; set; }
        public int Carbs { get; set; }
        public string Time { get; set; } = string.Empty;
        public string? ImageUrl { get; set; }
        public string? VideoUrl { get; set; }

        public ICollection<Ingredient> Ingredients { get; set; } = new List<Ingredient>();
        public ICollection<RecipeStep> Steps { get; set; } = new List<RecipeStep>();
    }

    public class Ingredient
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Amount { get; set; } = string.Empty;

        public Guid RecipeId { get; set; } 
        public Recipe Recipe { get; set; } = null!;
    }

    public class RecipeStep
    {
        public Guid Id { get; set; }
        public string StepText { get; set; } = string.Empty;
        public int Order { get; set; }
        public Guid RecipeId { get; set; }
    }
}
