
using HealthyLifestyle.Application.DTOs.MealTracker;

namespace HealthyLifestyle.Application.Interfaces
{
    public interface IMealService
    {
        Task<IEnumerable<MealDto>> GetAllAsync();
        Task<MealDto?> GetByIdAsync(Guid id);
        Task<IEnumerable<MealDto>> GetByUserIdAsync(Guid userId);
        Task<IEnumerable<MealDto>> GetByUserAndDateAsync(Guid userId, DateTime date);
        Task<MealDto> CreateAsync(CreateMealDto dto);
        Task<MealDto> UpdateAsync(Guid id, UpdateMealDto dto);
        Task DeleteAsync(Guid id);
    }
}