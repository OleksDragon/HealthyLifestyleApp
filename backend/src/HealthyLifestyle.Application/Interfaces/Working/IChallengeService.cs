using HealthyLifestyle.Application.DTOs.Working;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HealthyLifestyle.Application.Interfaces.Working
{
    public interface IChallengeService
    {
        /// <summary>
        /// Отримує список всіх викликів.
        /// </summary>
        /// <returns>Список викликів.</returns>
        Task<IEnumerable<ChallengeDto>> GetAllChallengesAsync();

        /// <summary>
        /// Отримує виклик за ідентифікатором.
        /// </summary>
        /// <param name="id">Ідентифікатор виклику.</param>
        /// <returns>Виклик з вказаним ідентифікатором.</returns>
        Task<ChallengeDto> GetChallengeByIdAsync(Guid id);

        /// <summary>
        /// Створює новий виклик.
        /// </summary>
        /// <param name="challengeDto">Дані виклику для створення.</param>
        /// <returns>Створений виклик.</returns>
        Task<ChallengeDto> CreateChallengeAsync(ChallengeCreateDto challengeCreateDto);

        /// <summary>
        /// Оновлює існуючий виклик.
        /// </summary>
        /// <param name="challengeDto">Дані виклику для оновлення.</param>
        /// <returns>Оновлений виклик.</returns>
        Task<ChallengeDto> UpdateChallengeAsync(Guid id, ChallengeUpdateDto challengeUpdateDto);

        /// <summary>
        /// Видаляє виклик за ідентифікатором.
        /// </summary>
        /// <param name="id">Ідентифікатор виклику для видалення.</param>
        Task DeleteChallengeAsync(Guid id);
    }
}
