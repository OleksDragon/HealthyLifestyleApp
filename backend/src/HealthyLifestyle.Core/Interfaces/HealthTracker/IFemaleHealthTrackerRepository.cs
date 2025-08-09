using HealthyLifestyle.Core.Entities;

namespace HealthyLifestyle.Core.Interfaces.HealthTracker
{
    /// <summary>
    /// Спеціалізований інтерфейс репозиторію для сутності FemaleHealthTracker.
    /// Розширює загальний IRepository, надаючи специфічні операції для жіночого трекера здоровя.
    /// </summary>
    public interface IFemaleHealthTrackerRepository : IRepository<FemaleHealthTracker>
    {
        // Приклад: Якщо вам знадобиться специфічний для MaleHealthTracker метод,
        // який не є загальним CRUD, ви можете додати його сюди.
    }
}
