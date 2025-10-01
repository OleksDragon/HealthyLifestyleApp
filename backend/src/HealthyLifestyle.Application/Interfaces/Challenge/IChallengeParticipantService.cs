using HealthyLifestyle.Application.DTOs.Challenge;

namespace HealthyLifestyle.Application.Interfaces.Challenge
{
    public interface IChallengeParticipantService
    {
        /// <summary>
        /// Добавляет пользователя в участники челленджа.
        /// </summary>
        Task<ChallengeParticipationDto> JoinChallengeAsync(Guid userId, Guid challengeId);

        /// <summary>
        /// Удаляет пользователя из участников челленджа.
        /// </summary>
        Task<bool> LeaveChallengeAsync(Guid userId, Guid challengeId);

        /// <summary>
        /// Отмечает выполнение челленджа пользователем.
        /// </summary>
        Task<ChallengeParticipationDto> CompleteChallengeAsync(Guid userId, Guid challengeId);

        /// <summary>
        /// Получает информацию об участии пользователя в челлендже.
        /// </summary>
        Task<ChallengeParticipationDto?> GetParticipationAsync(Guid userId, Guid challengeId);
        
    }
}
