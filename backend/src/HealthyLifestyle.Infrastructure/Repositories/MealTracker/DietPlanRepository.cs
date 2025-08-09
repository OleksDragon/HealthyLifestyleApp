using HealthyLifestyle.Core.Entities;
using HealthyLifestyle.Core.Interfaces;
using HealthyLifestyle.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace HealthyLifestyle.Infrastructure.Repositories
{
    /// <summary>
    /// Repository implementation for diet plans
    /// </summary>
    public class DietPlanRepository : Repository<DietPlan>, IDietPlanRepository
    {
        public DietPlanRepository(ApplicationDbContext dbContext) : base(dbContext)
        {
        }

        public async Task<IEnumerable<DietPlan>> GetByClientIdAsync(Guid clientId)
        {
            return await _dbContext.DietPlans
                .Where(dp => dp.ClientId == clientId)
                .OrderByDescending(dp => dp.StartDate)
                .ToListAsync();
        }
    }
}