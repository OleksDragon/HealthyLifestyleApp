using HealthyLifestyle.Application.DTOs.WeightTracker;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace HealthyLifestyle.Application.Interfaces.Weight
{
    /// <summary>
    /// Сервіс для роботи з вагою користувача
    /// </summary>
    public interface IWeightService
    {
        /// <summary>
        /// Додає новий запис ваги для користувача
        /// </summary>
        /// <param name="userId">Ідентифікатор користувача</param>
        /// <param name="dto">DTO з даними про вагу</param>
        /// <returns>Завдання, що представляє асинхронну операцію</returns>
        Task LogWeightAsync(Guid userId, WeightLogRequestDto dto);

        /// <summary>
        /// Отримує записи ваги користувача за останні 7 днів
        /// </summary>
        /// <param name="userId">Ідентифікатор користувача</param>
        /// <returns>Колекція DTO логів ваги за останні 7 днів</returns>
        Task<IEnumerable<WeightLogDto>> GetLast7DaysLogsAsync(Guid userId);

        /// <summary>
        /// Повертає логи ваги для вказаного користувача за конкретний місяць та рік
        /// </summary>
        /// <param name="userId">ID користувача</param>
        /// <param name="year">Рік</param>
        /// <param name="month">Місяць (1-12)</param>
        /// <returns>Колекція DTO логів ваги</returns>
        Task<IEnumerable<WeightLogDto>> GetMonthlyLogsAsync(Guid userId, int year, int month);
    }
}