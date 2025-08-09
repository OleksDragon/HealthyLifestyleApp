using HealthyLifestyle.Core.Entities;

namespace HealthyLifestyle.Core.Interfaces.WorkoutR
{
    public interface IWorkoutRepository : IRepository<Workout>
    {
        /// <summary>
        /// Asynchronously retrieves a workout by its unique identifier along with its activities.
        /// </summary>
        /// <param name="workoutId">The unique identifier of the workout.</param>
        /// <returns>The workout object with its activities if found; otherwise, null.</returns>
        Task<Workout?> GetWorkoutByIdWithActivitiesAsync(Guid workoutId);

        /// <summary>
        /// Asynchronously retrieves all workouts in the system along with their related activities.
        /// </summary>
        /// <returns>A collection of all workouts with their associated activities.</returns>
        Task<IEnumerable<Workout>> GetAllWorkoutsWithActivitiesAsync();
    }

}
