using HealthyLifestyle.Core.Entities;

namespace HealthyLifestyle.Core.Interfaces
{
    /// <summary>
    /// Repository interface for diet plans
    /// </summary>
    public interface IDietPlanRepository : IRepository<DietPlan>
    {
        /// <summary>
        /// Get diet plans by client ID
        /// </summary>
        /// <param name="clientId">Client user ID</param>
        Task<IEnumerable<DietPlan>> GetByClientIdAsync(Guid clientId);
    }
}