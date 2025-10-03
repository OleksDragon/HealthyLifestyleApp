using HealthyLifestyle.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HealthyLifestyle.Core.Interfaces.APInfoBlock
{
    /// <summary>
    /// Спеціалізований інтерфейс репозиторію для сутності Purchase.
    /// Розширює загальний IRepository, надаючи специфічні операції для покупок.
    /// </summary>
    public interface IPurchaseRepository : IRepository<Purchase>
    {
        Task<List<Purchase>> GetPurchasesByUserIdAsync(Guid userId);

        // Приклад: Якщо вам знадобиться специфічний для Purchase метод,
        // який не є загальним CRUD, ви можете додати його сюди.
    }
}
