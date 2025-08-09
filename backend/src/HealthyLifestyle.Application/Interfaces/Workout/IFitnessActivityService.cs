using HealthyLifestyle.Application.DTOs.Workout;

namespace HealthyLifestyle.Application.Interfaces.Workout
{
    public interface IFitnessActivityService
    {
        Task<IEnumerable<FitnessActivityDto>> GetAllAsync();
        Task<FitnessActivityDto?> GetByIdAsync(Guid id);
        Task<IEnumerable<FitnessActivityDto>> GetByUserIdAsync(Guid userId);
        Task<FitnessActivityDto> CreateAsync(CreateFitnessActivityDto dto);
        Task<FitnessActivityDto> UpdateAsync(Guid id, UpdateFitnessActivityDto dto);
        Task DeleteAsync(Guid id);
        Task DeleteByWorkoutIdAsync(Guid workoutId);
    }
}