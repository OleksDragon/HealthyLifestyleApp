using HealthyLifestyle.Core.Entities;
using HealthyLifestyle.Core.Interfaces.HealthTracker;
using HealthyLifestyle.Infrastructure.Data;

namespace HealthyLifestyle.Infrastructure.Repositories.HealthTracker
{
    /// <summary>
    /// Реалізація репозиторію для сутності FemaleHealthTracker.
    /// Успадковує базові CRUD-операції від Repository<FemaleHealthTracker>.
    /// </summary>

    public class FemaleHealthTrackerRepository : Repository<FemaleHealthTracker>, IFemaleHealthTrackerRepository
    {
        /// <summary>
        /// Створює новий екземпляр FemaleHealthTracker.
        /// </summary>
        /// <param name="dbContext">Контекст бази даних.</param>
        public FemaleHealthTrackerRepository(ApplicationDbContext dbContext) : base(dbContext)
        {
            // Базовий конструктор Repository<FemaleHealthTracker> вже ініціалізує _dbContext та _dbSet.
        }

        // Якщо ви додали специфічні методи до IFemaleHealthTrackerRepository, їх реалізація буде тут.
    }
}
