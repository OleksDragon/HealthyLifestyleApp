using HealthyLifestyle.Core.Entities;

namespace HealthyLifestyle.Core.Interfaces.MealTracker
{
    public interface IRecipeRepository
    {
        Task<IEnumerable<Recipe>> GetAllAsync();
        Task<Recipe?> GetByIdAsync(Guid id);
        Task AddAsync(Recipe recipe);
        Task DeleteAsync(Guid id);
    }
}