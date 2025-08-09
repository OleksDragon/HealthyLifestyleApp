using HealthyLifestyle.Core.Entities;
using HealthyLifestyle.Core.Interfaces.Challenge;
using HealthyLifestyle.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace HealthyLifestyle.Infrastructure.Repositories.Challenge
{
    public class ChallengeParticipantRepository : Repository<UserChallengeParticipation>, IChallengeParticipantRepository
    {
        private readonly ApplicationDbContext _context;
        public ChallengeParticipantRepository(ApplicationDbContext dbContext) : base(dbContext)
        {
            _context = dbContext;
            // Базовий конструктор Repository<Group> вже ініціалізує _dbContext та _dbSet.
        }

        public async Task DeleteByChallengeIdAsync(Guid challengeId)
        {
            var participants = await _context.UserChallengeParticipations
                            .Where(u => u.ChallengeId == challengeId)
                            .ToListAsync();

            _context.UserChallengeParticipations.RemoveRange(participants);
        }
    }
}
