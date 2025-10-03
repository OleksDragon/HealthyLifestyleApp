using HealthyLifestyle.Core.Entities;
using HealthyLifestyle.Core.Interfaces.APInfoBlock;
using HealthyLifestyle.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace HealthyLifestyle.Infrastructure.Repositories.APInfoBlock
{
    /// <summary>
    /// Реалізація репозиторію для сутності AchievementRepository.
    /// Успадковує базові CRUD-операції від Repository<Achievement>.
    /// </summary>
    public class AchievementRepository : Repository<Achievement>, IAchievementRepository
    {
        /// <summary>
        /// Створює новий екземпляр AchievementRepository.
        /// </summary>
        /// <param name="dbContext">Контекст бази даних.</param>
        public AchievementRepository(ApplicationDbContext dbContext) : base(dbContext)
        {
            // Базовий конструктор Repository<Achievement> вже ініціалізує _dbContext та _dbSet.
        }

        public async Task<List<Achievement>> GetAchievementsByUserIdAsync(Guid userId)
        {
            return await _dbSet
                .Where(mh => mh.UserId == userId)
                .ToListAsync();
        }

        // Якщо ви додали специфічні методи до IAchievementRepository, їх реалізація буде тут.
    }
}
