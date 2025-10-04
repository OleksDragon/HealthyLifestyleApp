using HealthyLifestyle.Application.DTOs.Challenge;
using HealthyLifestyle.Application.Interfaces.Challenge;
using HealthyLifestyle.Core.Entities;
using HealthyLifestyle.Core.Enums;
using HealthyLifestyle.Core.Interfaces.Challenge;
using HealthyLifestyle.Core.Interfaces;

namespace HealthyLifestyle.Application.Services.Challenge
{
    /// <summary>
    /// Сервіс для управління участю користувачів у челленджах.
    /// </summary>
    public class ChallengeParticipantService : IChallengeParticipantService
    {
        private readonly IChallengeParticipantRepository _participantRepository;
        private readonly IUnitOfWork _unitOfWork;

        public ChallengeParticipantService(IChallengeParticipantRepository participantRepository, IUnitOfWork unitOfWork)
        {
            _participantRepository = participantRepository;
            _unitOfWork = unitOfWork;
        }

        /// <summary>
        /// Реєструє користувача як учасника челенджу.
        /// </summary>
        /// <param name="userId">Ідентифікатор користувача.</param>
        /// <param name="challengeId">Ідентифікатор челенджу.</param>
        /// <returns>DTO учасника челенджу.</returns>
        /// <exception cref="InvalidOperationException">Виникає, якщо користувач вже є учасником цього челенджу.</exception>
        public async Task<ChallengeParticipationDto> JoinChallengeAsync(Guid userId, Guid challengeId)
        {
            var existing = await _participantRepository.GetByUserAndChallengeAsync(userId, challengeId);
            if (existing != null)
                throw new InvalidOperationException("Користувач вже є учасником цього челенджу.");

            var participant = new UserChallengeParticipation(userId, challengeId);
            await _participantRepository.AddAsync(participant);
            await _unitOfWork.SaveChangesAsync();

            return new ChallengeParticipationDto
            {
                UserId = participant.UserId,
                ChallengeId = participant.ChallengeId,
                IsCompleted = participant.Status == ParticipationStatus.Completed,
                JoinDate = participant.JoinDate
            };
        }

        /// <summary>
        /// Видаляє користувача зі списку учасників челенджу.
        /// </summary>
        /// <param name="userId">Ідентифікатор користувача.</param>
        /// <param name="challengeId">Ідентифікатор челенджу.</param>
        /// <returns>True, якщо участь була успішно припинена; false, якщо користувач не був учасником.</returns>
        public async Task<bool> LeaveChallengeAsync(Guid userId, Guid challengeId)
        {
            var participant = await _participantRepository.GetByUserAndChallengeAsync(userId, challengeId);
            if (participant == null) return false;

            // Використовуємо загальний репозиторій з UoW для операції видалення.
            var baseRepository = _unitOfWork.GetRepository<UserChallengeParticipation>();
            baseRepository.Delete(participant);

            await _unitOfWork.SaveChangesAsync();

            return true;
        }

        /// <summary>
        /// Встановлює статус участі в челенджі як "Завершено".
        /// </summary>
        /// <param name="userId">Ідентифікатор користувача.</param>
        /// <param name="challengeId">Ідентифікатор челенджу.</param>
        /// <returns>Оновлений DTO учасника челенджу.</returns>
        /// <exception cref="InvalidOperationException">Виникає, якщо користувач не є учасником цього челенджу.</exception>
        public async Task<ChallengeParticipationDto> CompleteChallengeAsync(Guid userId, Guid challengeId)
        {
            var participant = await _participantRepository.GetByUserAndChallengeAsync(userId, challengeId);
            if (participant == null)
                throw new InvalidOperationException("Користувач не є учасником цього челенджу.");

            participant.UpdateProgress(1.0);

            await _unitOfWork.SaveChangesAsync();

            return new ChallengeParticipationDto
            {
                UserId = participant.UserId,
                ChallengeId = participant.ChallengeId,
                IsCompleted = true,
                JoinDate = participant.JoinDate
            };
        }

        /// <summary>
        /// Отримує інформацію про участь користувача в челенджі.
        /// </summary>
        /// <param name="userId">Ідентифікатор користувача.</param>
        /// <param name="challengeId">Ідентифікатор челенджу.</param>
        /// <returns>DTO учасника челенджу або null, якщо участь не знайдена.</returns>
        public async Task<ChallengeParticipationDto?> GetParticipationAsync(Guid userId, Guid challengeId)
        {
            var participant = await _participantRepository.GetByUserAndChallengeAsync(userId, challengeId);
            if (participant == null) return null;

            return new ChallengeParticipationDto
            {
                UserId = participant.UserId,
                ChallengeId = participant.ChallengeId,
                IsCompleted = participant.Status == ParticipationStatus.Completed,
                JoinDate = participant.JoinDate
            };
        }

        public async Task<ChallengeDto?> GetByIdAsync(Guid challengeId)
        {
            var challenge = await _unitOfWork.Challenges.GetByIdAsync(challengeId);
            if (challenge == null) return null;

            var count = await _unitOfWork.ChallengeParticipants.CountByChallengeIdAsync(challengeId);

            Console.WriteLine($"Challenge {challengeId}: {count} participants");

            return new ChallengeDto
            {
                Id = challenge.Id,
                Name = challenge.Name,
                Description = challenge.Description,
                StartDate = challenge.StartDate,
                EndDate = challenge.EndDate,
                Type = challenge.Type,
                CreatorId = challenge.CreatorId,
                ParticipantsCount = count
            };
        }

    }
}
