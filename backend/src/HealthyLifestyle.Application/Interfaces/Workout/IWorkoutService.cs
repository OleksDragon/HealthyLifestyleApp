using HealthyLifestyle.Application.DTOs.Workout;

namespace HealthyLifestyle.Application.Interfaces.Workout
{
    /// <summary>
    /// Service interface for workout operations
    /// </summary>
    public interface IWorkoutService
    {
        /// <summary>
        /// Get all workouts
        /// </summary>
        Task<IEnumerable<WorkoutDto>> GetAllWorkoutsAsync();

        /// <summary>
        /// Get workout by ID
        /// </summary>
        /// <param name="id">Workout ID</param>
        Task<WorkoutDto?> GetWorkoutByIdAsync(Guid id);

        /// <summary>
        /// Create new workout
        /// </summary>
        /// <param name="dto">Workout data</param>
        Task<WorkoutDto> CreateWorkoutAsync(WorkoutCreateDto dto);

        /// <summary>
        /// Update existing workout
        /// </summary>
        /// <param name="id">Workout ID</param>
        /// <param name="dto">Updated data</param>
        Task<WorkoutDto> UpdateWorkoutAsync(Guid id, WorkoutUpdateDto dto);

        /// <summary>
        /// Delete workout
        /// </summary>
        /// <param name="id">Workout ID</param>
        Task DeleteWorkoutAsync(Guid id);
    }
}
