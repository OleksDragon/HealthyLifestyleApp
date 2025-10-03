using HealthyLifestyle.Core.Entities;
using HealthyLifestyle.Core.Interfaces.APInfoBlock;
using HealthyLifestyle.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace HealthyLifestyle.Infrastructure.Repositories.APInfoBlock
{
    /// <summary>
    /// Реалізація репозиторію для сутності PurchaseRepository.
    /// Успадковує базові CRUD-операції від Repository<Purchase>.
    /// </summary>
    public class PurchaseRepository : Repository<Purchase>, IPurchaseRepository
    {
        /// <summary>
        /// Створює новий екземпляр PurchaseRepository.
        /// </summary>
        /// <param name="dbContext">Контекст бази даних.</param>
        public PurchaseRepository(ApplicationDbContext dbContext) : base(dbContext)
        {
            // Базовий конструктор Repository<Purchase> вже ініціалізує _dbContext та _dbSet.
        }

        public async Task<List<Purchase>> GetPurchasesByUserIdAsync(Guid userId)
        {
            return await _dbSet
                .Where(mh => mh.UserId == userId)
                .ToListAsync();
        }

        // Якщо ви додали специфічні методи до IPurchaseRepository, їх реалізація буде тут.
    }
}
