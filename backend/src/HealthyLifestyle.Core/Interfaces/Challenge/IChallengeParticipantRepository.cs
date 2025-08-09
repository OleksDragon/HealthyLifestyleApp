using HealthyLifestyle.Core.Entities;

namespace HealthyLifestyle.Core.Interfaces.Challenge
{
    public interface IChallengeParticipantRepository : IRepository<UserChallengeParticipation>
    {
        Task DeleteByChallengeIdAsync(Guid challengeId);
    }
}
