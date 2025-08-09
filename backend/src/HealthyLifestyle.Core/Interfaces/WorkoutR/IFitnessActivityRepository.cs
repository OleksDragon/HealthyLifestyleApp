using HealthyLifestyle.Core.Entities;

namespace HealthyLifestyle.Core.Interfaces.WorkoutR
{
    public interface IFitnessActivityRepository : IRepository<FitnessActivity>
    {
        Task DeleteByWorkoutIdAsync(Guid workoutId);
        Task<IEnumerable<FitnessActivity>> GetByUserIdAsync(Guid userId);
    }
}
