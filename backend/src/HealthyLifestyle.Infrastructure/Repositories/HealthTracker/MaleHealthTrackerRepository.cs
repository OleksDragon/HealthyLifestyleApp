using HealthyLifestyle.Core.Entities;
using HealthyLifestyle.Core.Interfaces.HealthTracker;
using HealthyLifestyle.Infrastructure.Data;

namespace HealthyLifestyle.Infrastructure.Repositories.HealthTracker
{
    /// <summary>
    /// Реалізація репозиторію для сутності MaleHealthTracker.
    /// Успадковує базові CRUD-операції від Repository<MaleHealthTracker>.
    /// </summary>
    public class MaleHealthTrackerRepository : Repository<MaleHealthTracker>, IMaleHealthTrackerRepository
    {
        /// <summary>
        /// Створює новий екземпляр MaleHealthTrackerRepository.
        /// </summary>
        /// <param name="dbContext">Контекст бази даних.</param>
        public MaleHealthTrackerRepository(ApplicationDbContext dbContext) : base(dbContext)
        {
            // Базовий конструктор Repository<MaleHealthTracker> вже ініціалізує _dbContext та _dbSet.
        }

        // Якщо ви додали специфічні методи до IMaleHealthTrackerRepository, їх реалізація буде тут.
    }
}
