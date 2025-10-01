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
        }

        public async Task<UserChallengeParticipation?> GetByUserAndChallengeAsync(Guid userId, Guid challengeId)
        {
            return await _context.UserChallengeParticipations
                .FirstOrDefaultAsync(p => p.UserId == userId && p.ChallengeId == challengeId);
        }

        public async Task<int> GetParticipantsCountAsync(Guid challengeId)
        {
            return await _context.UserChallengeParticipations
                .CountAsync(p => p.ChallengeId == challengeId);
        }

        public async Task DeleteByChallengeIdAsync(Guid challengeId)
        {
            var participants = await _context.UserChallengeParticipations
                .Where(u => u.ChallengeId == challengeId)
                .ToListAsync();

            _context.UserChallengeParticipations.RemoveRange(participants);
        }

        public async Task<int> CountByChallengeIdAsync(Guid challengeId)
        {
            return await _context.UserChallengeParticipations
                .Where(x => x.ChallengeId == challengeId)
                .Select(x => x.UserId)
                .Distinct()
                .CountAsync();
        }

    }
}
