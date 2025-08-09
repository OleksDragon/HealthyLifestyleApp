using HealthyLifestyle.Core.Entities;
using HealthyLifestyle.Core.Interfaces.WorkoutR;
using HealthyLifestyle.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace HealthyLifestyle.Infrastructure.Repositories.WorkoutR
{
    /// <summary>
    /// Repository implementation for fitness activities
    /// </summary>
    public class FitnessActivityRepository : Repository<FitnessActivity>, IFitnessActivityRepository
    {
        public FitnessActivityRepository(ApplicationDbContext dbContext) : base(dbContext)
        {
        }

        public async Task DeleteByWorkoutIdAsync(Guid workoutId)
        {
            var activities = await _dbContext.FitnessActivities
                .Where(a => a.WorkoutId == workoutId)
                .ToListAsync();

            _dbContext.FitnessActivities.RemoveRange(activities);
        }

        public async Task<IEnumerable<FitnessActivity>> GetByUserIdAsync(Guid userId)
        {
            return await _dbContext.FitnessActivities
                .Where(a => a.UserId == userId)
                .OrderByDescending(a => a.ActivityDate)
                .ToListAsync();
        }
    }
}
