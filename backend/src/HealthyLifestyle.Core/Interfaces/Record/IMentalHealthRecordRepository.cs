using HealthyLifestyle.Core.Entities;

namespace HealthyLifestyle.Core.Interfaces.Record
{
    /// <summary>
    /// Спеціалізований інтерфейс репозиторію для сутності MentalHealthRecord.
    /// Розширює загальний IRepository, надаючи специфічні операції для запису психічного здоров'я.
    /// </summary>
    public interface IMentalHealthRecordRepository : IRepository<MentalHealthRecord>
    {
        Task<List<MentalHealthRecord>> GetMentalHealthRecordByUserIdAsync(Guid userId);

        // Приклад: Якщо вам знадобиться специфічний для MentalHealthRecord метод,
        // який не є загальним CRUD, ви можете додати його сюди.
    }
}
