using HealthyLifestyle.Core.Entities;

namespace HealthyLifestyle.Core.Interfaces.APInfoBlock
{
    /// <summary>
    /// Спеціалізований інтерфейс репозиторію для сутності Achievement.
    /// Розширює загальний IRepository, надаючи специфічні операції для досягнень.
    /// </summary>
    public interface IAchievementRepository : IRepository<Achievement>
    {
        Task<List<Achievement>> GetAchievementsByUserIdAsync(Guid userId);

        // Приклад: Якщо вам знадобиться специфічний для Achievement метод,
        // який не є загальним CRUD, ви можете додати його сюди.
    }
}
