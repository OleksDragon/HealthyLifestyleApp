using HealthyLifestyle.Core.Entities;
using HealthyLifestyle.Core.Interfaces;
using HealthyLifestyle.Infrastructure.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HealthyLifestyle.Infrastructure.Repositories
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
