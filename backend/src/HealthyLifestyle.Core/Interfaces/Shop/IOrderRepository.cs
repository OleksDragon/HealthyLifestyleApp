using HealthyLifestyle.Core.Entities;

namespace HealthyLifestyle.Core.Interfaces.Shop
{
    /// <summary>
    /// Інтерфейс репозиторію для роботи із замовленнями в додатку HealthyLifestyle.
    /// </summary>
    /// <remarks>
    /// Розширює базовий інтерфейс <see cref="IRepository{T}"/> для роботи з об’єктами <see cref="Order"/>.
    /// </remarks>
    public interface IOrderRepository : IRepository<Order>
    {
        #region Методи

        /// <summary>
        /// Асинхронно отримує замовлення за його унікальним ідентифікатором разом із пов’язаними позиціями.
        /// </summary>
        /// <param name="orderId">Унікальний ідентифікатор замовлення.</param>
        /// <returns>Об’єкт замовлення з позиціями, якщо знайдено; інакше null.</returns>
        Task<Order?> GetOrderByIdWithItemsAsync(Guid orderId);

        /// <summary>
        /// Асинхронно отримує всі замовлення для вказаного користувача.
        /// </summary>
        /// <param name="userId">Унікальний ідентифікатор користувача.</param>
        /// <returns>Колекція замовлень користувача.</returns>
        Task<IEnumerable<Order>> GetUserOrdersAsync(Guid userId);

        /// <summary>
        /// Асинхронно отримує всі замовлення в системі разом із даними користувачів і позиціями.
        /// </summary>
        /// <returns>Колекція всіх замовлень із пов’язаними даними.</returns>
        Task<IEnumerable<Order>> GetAllOrdersWithUsersAndItemsAsync();

        #endregion
    }
}
