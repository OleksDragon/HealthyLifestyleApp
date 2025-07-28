using HealthyLifestyle.Core.Entities;
using HealthyLifestyle.Core.Interfaces;
using HealthyLifestyle.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HealthyLifestyle.Infrastructure.Repositories
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

        public async Task<SleepRecord?> GetSleepRecordByUserIdAsync(Guid userId)
        {
            return await _dbSet
                .FirstOrDefaultAsync(sr => sr.UserId == userId);
        }

        // Тут можна додати специфічні методи для роботи з SleepRecord, якщо потрібно.
    }
}
