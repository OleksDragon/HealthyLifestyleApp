using HealthyLifestyle.Core.Entities;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace HealthyLifestyle.Infrastructure.Repositories.Weight
{
    public interface IWeightLogRepository
    {
        Task AddAsync(WeightLog log);
        Task UpdateAsync(WeightLog log);
        Task<WeightLog?> GetByDateAsync(Guid userId, DateTime date);

        /// <summary>
        /// Повертає останній зафіксований запис ваги для користувача.
        /// </summary>
        Task<WeightLog?> GetLatestAsync(Guid userId);

        /// <summary>
        /// Повертає один запис ваги за кожен день за останні 7 днів.
        /// </summary>
        Task<IEnumerable<WeightLog>> GetLast7DaysAsync(Guid userId);

        Task<IEnumerable<WeightLog>> GetMonthlyLogsAsync(Guid userId, int year, int month);
    }
}