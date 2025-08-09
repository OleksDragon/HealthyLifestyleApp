using HealthyLifestyle.Core.Entities;
using HealthyLifestyle.Core.Interfaces.Challenge;
using HealthyLifestyle.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace HealthyLifestyle.Infrastructure.Repositories.Challenge
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
