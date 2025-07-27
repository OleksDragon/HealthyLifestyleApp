using HealthyLifestyle.Core.Entities;
using HealthyLifestyle.Core.Interfaces;
using HealthyLifestyle.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HealthyLifestyle.Infrastructure.Repositories
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
