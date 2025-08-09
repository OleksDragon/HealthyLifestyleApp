using HealthyLifestyle.Core.Entities;
using HealthyLifestyle.Core.Enums;
using HealthyLifestyle.Core.Interfaces.SubscriptionIR;
using HealthyLifestyle.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace HealthyLifestyle.Infrastructure.Repositories.SubscriptionR
{
    public class SubscriptionRepository : Repository<Subscription>, ISubscriptionRepository
    {
        /// <summary>
        /// Ініціалізує новий екземпляр <see cref="SubscriptionRepository"/>.
        /// </summary>
        /// <param name="dbContext">Екземпляр контексту бази даних.</param>
        public SubscriptionRepository(ApplicationDbContext dbContext) : base(dbContext)
        {
        }

        public async Task<List<Subscription>> GetSubscriptionsByUserIdAsync(Guid userId)
        {
            return await _dbSet
                .Where(s => s.UserId == userId)
                .ToListAsync();
        }

        public async Task<List<Subscription>> GetActiveSubscriptionsByUserIdAsync(Guid userId)
        {
            return await _dbSet
                .Where(s => s.UserId == userId &&
                           s.Status == SubscriptionStatus.Active)
                .ToListAsync();
        }
        // Тут можна додати специфічні методи для роботи з Subscription, якщо потрібно.
    }
}
