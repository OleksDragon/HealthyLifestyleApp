using HealthyLifestyle.Core.Entities;
using HealthyLifestyle.Core.Interfaces.SubscriptionIR;
using HealthyLifestyle.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace HealthyLifestyle.Infrastructure.Repositories.SubscriptionR
{
    public class FamilySubscriptionRepository : Repository<FamilySubscriptionMember>, IFamilySubscriptionRepository
    {
        public FamilySubscriptionRepository(ApplicationDbContext dbContext) : base(dbContext)
        {
        }

        public async Task<List<FamilySubscriptionMember>> GetMembersByOwnerIdAsync(Guid ownerId)
        {
            // Повертаємо записи з підключеним Member (щоб мати Email) і Subscription (щоб фільтрувати по UserId)
            return await _dbSet
                .Include(f => f.Member)
                .Include(f => f.Subscription)
                .Where(f => f.Subscription.UserId == ownerId)
                .ToListAsync();
        }

        public async Task<FamilySubscriptionMember?> GetMemberAsync(Guid ownerId, Guid memberId)
        {
            return await _dbSet
                .Include(f => f.Member)
                .Include(f => f.Subscription)
                .FirstOrDefaultAsync(f => f.MemberId == memberId && f.Subscription.UserId == ownerId);
        }

        public async Task<List<FamilySubscriptionMember>> GetMembersBySubscriptionIdAsync(Guid subscriptionId)
        {
            return await _dbSet
                .Include(f => f.Member)
                .Where(f => f.SubscriptionId == subscriptionId)
                .ToListAsync();
        }
    }
}
