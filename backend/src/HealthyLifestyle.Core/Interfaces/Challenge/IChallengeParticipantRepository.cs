using HealthyLifestyle.Core.Entities;

namespace HealthyLifestyle.Core.Interfaces.Challenge
{
    public interface IChallengeParticipantRepository : IRepository<UserChallengeParticipation>
    {
        /// <summary>
        /// Получает участие пользователя в челлендже по userId и challengeId.
        /// </summary>
        /// <param name="userId">ID пользователя</param>
        /// <param name="challengeId">ID челленджа</param>
        /// <returns>Экземпляр UserChallengeParticipation или null</returns>
        Task<UserChallengeParticipation?> GetByUserAndChallengeAsync(Guid userId, Guid challengeId);

        /// <summary>
        /// Получает количество участников челленджа.
        /// </summary>
        Task<int> GetParticipantsCountAsync(Guid challengeId);

        /// <summary>
        /// Удаляет все участия для челленджа.
        /// </summary>
        Task DeleteByChallengeIdAsync(Guid challengeId);

        Task<int> CountByChallengeIdAsync(Guid challengeId);
    }
}
