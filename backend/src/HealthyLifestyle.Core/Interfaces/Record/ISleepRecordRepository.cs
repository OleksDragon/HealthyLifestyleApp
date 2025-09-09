using HealthyLifestyle.Core.Entities;

namespace HealthyLifestyle.Core.Interfaces.Record
{
    /// <summary>
    /// Спеціалізований інтерфейс репозиторію для сутності FemaleHealthTracker.
    /// Розширює загальний IRepository, надаючи специфічні операції для жіночого трекера здоровя.
    /// </summary>

    public interface ISleepRecordRepository : IRepository<SleepRecord>
    {
        Task<List<SleepRecord>> GetSleepRecordByUserIdAsync(Guid userId);
        Task<List<SleepRecord>> GetSleepRecordByUserIdAndDateAsync(Guid userId,  DateTime date);
        // Приклад: Якщо вам знадобиться специфічний для SleepRecord метод,
        // який не є загальним CRUD, ви можете додати його сюди.
    }
}
