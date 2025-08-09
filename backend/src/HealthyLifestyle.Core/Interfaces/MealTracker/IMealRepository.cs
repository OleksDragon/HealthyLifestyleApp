using HealthyLifestyle.Core.Entities;

namespace HealthyLifestyle.Core.Interfaces
{
    public interface IMealRepository : IRepository<MealEntry>
    {
        Task<IEnumerable<MealEntry>> GetByUserIdAsync(Guid userId);
        Task<IEnumerable<MealEntry>> GetByUserAndDateAsync(Guid userId, DateTime date);
    }
}