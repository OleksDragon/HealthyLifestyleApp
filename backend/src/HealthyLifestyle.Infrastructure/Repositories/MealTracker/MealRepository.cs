using HealthyLifestyle.Core.Entities;
using HealthyLifestyle.Core.Interfaces;
using HealthyLifestyle.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace HealthyLifestyle.Infrastructure.Repositories
{
    public class MealRepository : Repository<MealEntry>, IMealRepository
    {
        public MealRepository(ApplicationDbContext dbContext) : base(dbContext)
        {
        }
        
        public async Task<IEnumerable<MealEntry>> GetByUserIdAsync(Guid userId)
        {
            return await _dbContext.MealEntries
                .Where(m => m.UserId == userId)
                .OrderByDescending(m => m.EntryDate)
                .ToListAsync();
        }

        public async Task<IEnumerable<MealEntry>> GetByUserAndDateAsync(Guid userId, DateTime date)
        {
            return await _dbContext.MealEntries
                .Where(m => m.UserId == userId && m.EntryDate.Date == date.Date)
                .OrderBy(m => m.MealType)
                .ToListAsync();
        }
    }
}