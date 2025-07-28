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
    /// <summary>
    /// Реалізація репозиторію для сутності Notification.
    /// Успадковує базові CRUD-операції від Repository<Notification>.
    /// </summary>
    public class NotificationRepository : Repository<Notification>, INotificationRepository
    {
        /// <summary>
        /// Створює новий екземпляр NotificationRepository.
        /// </summary>
        /// <param name="dbContext">Контекст бази даних.</param>
        public NotificationRepository(ApplicationDbContext dbContext) : base(dbContext)
        {
            // Базовий конструктор Repository<Notification> вже ініціалізує _dbContext та _dbSet.
        }

        // Якщо ви додали специфічні методи до INotificationRepository, їх реалізація буде тут.
        public async Task<IEnumerable<Notification>> GetByUserIdAsync(Guid userId)
        {
            return await _dbContext.Notifications
                .Where(n => n.UserId == userId)
                .ToListAsync();
        }
    }
}
