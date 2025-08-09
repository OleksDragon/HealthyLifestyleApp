using HealthyLifestyle.Core.Entities;
using HealthyLifestyle.Core.Interfaces.Record;
using HealthyLifestyle.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace HealthyLifestyle.Infrastructure.Repositories.Record
{
    public class SleepRecordRepository : Repository<SleepRecord>, ISleepRecordRepository
    {
        /// <summary>
        /// Ініціалізує новий екземпляр <see cref="SleepRecordRepository"/>.
        /// </summary>
        /// <param name="dbContext">Екземпляр контексту бази даних.</param>
        public SleepRecordRepository(ApplicationDbContext dbContext) : base(dbContext)
        {
        }

        public async Task<List<SleepRecord>> GetSleepRecordByUserIdAsync(Guid userId)
        {
            return await _dbSet
                .Where(mh => mh.UserId == userId)
                .ToListAsync();
        }

        // Тут можна додати специфічні методи для роботи з SleepRecord, якщо потрібно.
    }
}
