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
    public class ChallengeRepository : Repository<SocialChallenge>, IChallengeRepository
    {
        public ChallengeRepository(ApplicationDbContext dbContext) : base(dbContext)
        {
            // Базовий конструктор Repository<Group> вже ініціалізує _dbContext та _dbSet.
        }

        public async Task<SocialChallenge?> GetChallengeByIdWithParticipantsAsync(Guid challengeId)
        {
            return await _dbSet
                .Include(c => c.Participations)
                    .ThenInclude(p => p.User)
                .FirstOrDefaultAsync(c => c.Id == challengeId);
        }

        public async Task<IEnumerable<SocialChallenge>> GetAllChallengesWithParticipantsAsync()
        {
            return await _dbSet
                .Include(c => c.Participations)
                    .ThenInclude(p => p.User)
                .ToListAsync();
        }
    }
}
