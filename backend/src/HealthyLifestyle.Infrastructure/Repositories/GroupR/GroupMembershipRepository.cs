using HealthyLifestyle.Core.Entities;
using HealthyLifestyle.Core.Interfaces.GroupIR;
using HealthyLifestyle.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace HealthyLifestyle.Infrastructure.Repositories.GroupR
{
    public class GroupMembershipRepository : Repository<GroupMembership>, IGroupMembershipRepository
    {
        private readonly ApplicationDbContext _context;
        public GroupMembershipRepository(ApplicationDbContext dbContext) : base(dbContext)
        {
            _context = dbContext;
            // Базовий конструктор Repository<Group> вже ініціалізує _dbContext та _dbSet.
        }

        public async Task DeleteByGroupIdAsync(Guid groupId)
        {
            var memberships = await _context.GroupMemberships
                            .Where(m => m.GroupId == groupId)
            .ToListAsync();

            _context.GroupMemberships.RemoveRange(memberships);
        }
    }
}
