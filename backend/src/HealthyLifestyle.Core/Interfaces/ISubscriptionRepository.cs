using HealthyLifestyle.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HealthyLifestyle.Core.Interfaces
{
    /// <summary>
    /// Спеціалізований інтерфейс репозиторію для сутності Subscription.
    /// Розширює загальний IRepository, надаючи специфічні операції для підписок користувача.
    /// </summary>
    public interface ISubscriptionRepository : IRepository<Subscription>
    {
        Task<List<Subscription>> GetSubscriptionsByUserIdAsync(Guid userId);

        Task<List<Subscription>> GetActiveSubscriptionsByUserIdAsync(Guid userId);

        // Приклад: Якщо вам знадобиться специфічний для Subscription метод,
        // який не є загальним CRUD, ви можете додати його сюди.
    }
}
