using HealthyLifestyle.Core.Entities;

namespace HealthyLifestyle.Core.Interfaces.SubscriptionIR
{
    /// <summary>
    /// Спеціалізований інтерфейс репозиторію для сутності Subscription.
    /// Розширює загальний IRepository, надаючи специфічні операції для підписок користувача.
    /// </summary>
    public interface ISubscriptionRepository : IRepository<Subscription>
    {
        Task<List<Subscription>> GetSubscriptionsByUserIdAsync(Guid userId);

        Task<List<Subscription>> GetActiveSubscriptionsByUserIdAsync(Guid userId);

        Task<Subscription?> GetByIdWithMembersAsync(Guid id);

        Task<List<Subscription>> GetSubscriptionsByUserIdWithMembersAsync(Guid userId);
        Task<List<Subscription>> GetAllWithMembersAsync();
        Task<List<Subscription>> GetActiveSubscriptionsByUserIdWithMembersAsync(Guid userId);


        // Приклад: Якщо вам знадобиться специфічний для Subscription метод,
        // який не є загальним CRUD, ви можете додати його сюди.
    }
}
