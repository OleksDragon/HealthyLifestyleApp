using HealthyLifestyle.Core.Entities;
using HealthyLifestyle.Core.Interfaces.Working;
using HealthyLifestyle.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HealthyLifestyle.Infrastructure.Repositories.Working
{
    /// <summary>
    /// Repository implementation for fitness activities
    /// </summary>
    public class FitnessActivityRepository : Repository<FitnessActivity>, IFitnessActivityRepository
    {
        private readonly ApplicationDbContext _context;
        public FitnessActivityRepository(ApplicationDbContext dbContext) : base(dbContext)
        {
            _context = dbContext;
        }

        public async Task DeleteByWorkoutIdAsync(Guid workoutId)
        {
            var activities = await _context.FitnessActivities
                            .Where(m => m.WorkoutId == workoutId)
            .ToListAsync();

            _context.FitnessActivities.RemoveRange(activities);
        }
    }
}
