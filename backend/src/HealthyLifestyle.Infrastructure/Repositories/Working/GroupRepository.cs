using HealthyLifestyle.Core.Entities;
using HealthyLifestyle.Core.Interfaces.Working;
using HealthyLifestyle.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HealthyLifestyle.Infrastructure.Repositories.Working
{
    public class GroupRepository : Repository<Group>, IGroupRepository
    {
        public GroupRepository(ApplicationDbContext dbContext) : base(dbContext)
        {
            // Базовий конструктор Repository<Group> вже ініціалізує _dbContext та _dbSet.
        }

        public async Task<Group?> GetGroupByIdWithMembersAsync(Guid groupId)
        {
            return await _dbSet
                .Include(o => o.GroupMemberships)
                    .ThenInclude(gm => gm.User)
                .FirstOrDefaultAsync(g => g.Id == groupId);
        }

        public async Task<IEnumerable<Group>> GetAllGroupsWithMembershipsAsync()
        {
            return await _dbSet
                .Include(g => g.GroupMemberships)
                    .ThenInclude(gm => gm.User)
                .ToListAsync();
        }
    }
}
