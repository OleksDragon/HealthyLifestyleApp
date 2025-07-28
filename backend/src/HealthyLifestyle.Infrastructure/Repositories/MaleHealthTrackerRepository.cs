using HealthyLifestyle.Core.Entities;
using HealthyLifestyle.Core.Interfaces;
using HealthyLifestyle.Infrastructure.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace HealthyLifestyle.Infrastructure.Repositories
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
