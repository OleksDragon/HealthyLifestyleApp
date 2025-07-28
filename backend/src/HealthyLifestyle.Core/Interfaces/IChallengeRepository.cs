using HealthyLifestyle.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HealthyLifestyle.Core.Interfaces
{
    /// <summary>
    /// Спеціалізований інтерфейс репозиторію для сутності SocialChallenge.
    /// Розширює загальний IRepository, надаючи специфічні операції для challenges.
    /// </summary>
    public interface IChallengeRepository : IRepository<SocialChallenge>
    {
        /// <summary>
        /// Асинхронно отримує challenge за його унікальним ідентифікатором разом із учасниками.
        /// </summary>
        /// <param name="orderId">Унікальний ідентифікатор challenge.</param>
        /// <returns>Об’єкт challenge з учасниками, якщо знайдено; інакше null.</returns>
        Task<SocialChallenge?> GetChallengeByIdWithParticipantsAsync(Guid challengeId);

        /// <summary>
        /// Асинхронно отримує всі групи в системі разом із даними користувачів.
        /// </summary>
        /// <returns>Колекція всіх груп із пов’язаними даними.</returns>
        Task<IEnumerable<SocialChallenge>> GetAllChallengesWithParticipantsAsync();
    }
}
