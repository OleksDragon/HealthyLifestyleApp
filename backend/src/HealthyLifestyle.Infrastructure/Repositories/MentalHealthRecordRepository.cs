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
    public class MentalHealthRecordRepository : Repository<MentalHealthRecord> , IMentalHealthRecordRepository
    {
        /// <summary>
        /// Ініціалізує новий екземпляр <see cref="MentalHealthRecordRepository"/>.
        /// </summary>
        /// <param name="dbContext">Екземпляр контексту бази даних.</param>
        public MentalHealthRecordRepository(ApplicationDbContext dbContext) : base(dbContext)
        {
        }

        public async Task<MentalHealthRecord?> GetMentalHealthRecordByUserIdAsync(Guid userId)
        {
            return await _dbSet
                .FirstOrDefaultAsync(mhr => mhr.UserId == userId);
        }
        // Тут можна додати специфічні методи для роботи з MentalHealthRecord, якщо потрібно.
    }
}
