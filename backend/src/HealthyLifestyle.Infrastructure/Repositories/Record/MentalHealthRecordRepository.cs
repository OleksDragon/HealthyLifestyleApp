using HealthyLifestyle.Core.Entities;
using HealthyLifestyle.Core.Interfaces.Record;
using HealthyLifestyle.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace HealthyLifestyle.Infrastructure.Repositories.Record
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

        public async Task<List<MentalHealthRecord>> GetMentalHealthRecordByUserIdAsync(Guid userId)
        {
            return await _dbSet
                .Where(mh => mh.UserId == userId)
                .ToListAsync();
        }
        // Тут можна додати специфічні методи для роботи з MentalHealthRecord, якщо потрібно.
    }
}
