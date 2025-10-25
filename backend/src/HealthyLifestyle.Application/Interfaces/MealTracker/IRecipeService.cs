using HealthyLifestyle.Application.DTOs;

namespace HealthyLifestyle.Application.Interfaces
{
    public interface IRecipeService
    {
        Task<IEnumerable<RecipeDto>> GetAllAsync();
        Task<RecipeDto?> GetByIdAsync(Guid id);
        Task AddAsync(CreateRecipeDto dto);
        Task UpdateAsync(Guid id, UpdateRecipeDto dto);
        Task DeleteAsync(Guid id);
    }
}
