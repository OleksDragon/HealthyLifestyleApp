using HealthyLifestyle.Core.Entities;
using HealthyLifestyle.Core.Interfaces.WorkoutR;
using HealthyLifestyle.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace HealthyLifestyle.Infrastructure.Repositories.WorkoutR
{
    /// <summary>
    /// Repository implementation for workouts
    /// </summary>
    public class WorkoutRepository : Repository<Workout>, IWorkoutRepository
    {
        public WorkoutRepository(ApplicationDbContext dbContext) : base(dbContext)
        {
        }

        public async Task<IEnumerable<Workout>> GetAllWorkoutsWithActivitiesAsync()
        {
            return await _dbSet
                .Include(w => w.FitnessActivities)
                    .ThenInclude(fa => fa.User)
                .ToListAsync();
        }

        public async Task<Workout?> GetWorkoutByIdWithActivitiesAsync(Guid workoutId)
        {
            return await _dbSet
                .Include(w => w.FitnessActivities)
                    .ThenInclude(fa => fa.User)
                .FirstOrDefaultAsync(w => w.Id == workoutId);
        }
    }
}
