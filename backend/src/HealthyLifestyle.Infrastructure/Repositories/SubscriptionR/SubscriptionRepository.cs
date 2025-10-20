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
                .Where(s => s.UserId == userId && s.Status == SubscriptionStatus.Active)
                .ToListAsync();
        }

        public async Task<Subscription?> GetByIdWithMembersAsync(Guid id)
        {
            return await _dbContext.Subscriptions
                .Include(s => s.FamilyMembers)
                .ThenInclude(fm => fm.Member)
                .Include(s => s.User)
                .FirstOrDefaultAsync(s => s.Id == id);
        }

        public async Task<List<Subscription>> GetSubscriptionsByUserIdWithMembersAsync(Guid userId)
        {
            return await _dbSet
                .Include(s => s.FamilyMembers)
                .ThenInclude(fm => fm.Member) // ← Критично важливо!
                .Where(s => s.UserId == userId)
                .ToListAsync();
        }

        public async Task<List<Subscription>> GetAllWithMembersAsync()
        {
            return await _dbSet
                .Include(s => s.FamilyMembers)
                .ThenInclude(fm => fm.Member)
                .ToListAsync();
        }

        public async Task<List<Subscription>> GetActiveSubscriptionsByUserIdWithMembersAsync(Guid userId)
        {
            return await _dbSet
                .Include(s => s.FamilyMembers)
                .ThenInclude(fm => fm.Member)
                .Where(s => s.UserId == userId && s.Status == SubscriptionStatus.Active)
                .ToListAsync();
        }

        public async Task<Subscription?> GetByStripeSubscriptionIdAsync(string stripeSubscriptionId)
        {
            return await _dbSet
                .Include(s => s.FamilyMembers)
                .ThenInclude(fm => fm.Member)
                .FirstOrDefaultAsync(s => s.StripeSubscriptionId == stripeSubscriptionId);
        }

        public async Task<Subscription?> GetActiveSubscriptionByUserIdAsync(Guid userId)
        {
            return await _dbSet
                .Include(s => s.FamilyMembers)
                .ThenInclude(fm => fm.Member)
                .FirstOrDefaultAsync(s => s.UserId == userId && s.Status == SubscriptionStatus.Active);
        }

        // Тут можна додати специфічні методи для роботи з Subscription, якщо потрібно.
    }
}
