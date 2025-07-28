using HealthyLifestyle.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HealthyLifestyle.Core.Interfaces
{
    /// <summary>
    /// Спеціалізований інтерфейс репозиторію для сутності Notification.
    /// Розширює загальний IRepository, надаючи специфічні операції для Notifications.
    /// </summary>
    public interface INotificationRepository : IRepository<Notification>
    {
        // Приклад: Якщо вам знадобиться специфічний для Notification метод,
        // який не є загальним CRUD, ви можете додати його сюди.
        Task<IEnumerable<Notification>> GetByUserIdAsync(Guid userId);
    }
}
