using HealthyLifestyle.Core.Entities;
using HealthyLifestyle.Core.Interfaces.Working;
using HealthyLifestyle.Infrastructure.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HealthyLifestyle.Infrastructure.Repositories.Working
{
    /// <summary>
    /// Реалізація репозиторію для сутності Consultation.
    /// Успадковує базові CRUD-операції від Repository<Consultation>.
    /// </summary>
    public class ConsultationRepository : Repository<Consultation>, IConsultationRepository
    {
        /// <summary>
        /// Створює новий екземпляр ConsultationRepository.
        /// </summary>
        /// <param name="dbContext">Контекст бази даних.</param>
        public ConsultationRepository(ApplicationDbContext dbContext) : base(dbContext)
        {
            // Базовий конструктор Repository<Consultation> вже ініціалізує _dbContext та _dbSet.
        }

        // Якщо ви додали специфічні методи до IProductRepository, їх реалізація буде тут.
    }
}
