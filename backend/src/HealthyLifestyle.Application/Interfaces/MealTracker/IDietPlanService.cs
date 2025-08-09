using HealthyLifestyle.Application.DTOs.DietPlan;

namespace HealthyLifestyle.Application.Interfaces
{
    /// <summary>
    /// Service interface for diet plan operations
    /// </summary>
    public interface IDietPlanService
    {
        /// <summary>
        /// Get all diet plans
        /// </summary>
        Task<IEnumerable<DietPlanDto>> GetAllAsync();

        /// <summary>
        /// Get diet plan by ID
        /// </summary>
        /// <param name="id">Diet plan ID</param>
        Task<DietPlanDto?> GetByIdAsync(Guid id);

        /// <summary>
        /// Get diet plans by client ID
        /// </summary>
        /// <param name="clientId">Client user ID</param>
        Task<IEnumerable<DietPlanDto>> GetByClientIdAsync(Guid clientId);

        /// <summary>
        /// Create new diet plan
        /// </summary>
        /// <param name="dto">Diet plan data</param>
        Task<DietPlanDto> CreateAsync(CreateDietPlanDto dto);

        /// <summary>
        /// Update existing diet plan
        /// </summary>
        /// <param name="id">Diet plan ID</param>
        /// <param name="dto">Updated data</param>
        Task<DietPlanDto> UpdateAsync(Guid id, UpdateDietPlanDto dto);

        /// <summary>
        /// Delete diet plan
        /// </summary>
        /// <param name="id">Diet plan ID</param>
        Task DeleteAsync(Guid id);
    }
}