using HealthyLifestyle.Application.DTOs.Shop;

namespace HealthyLifestyle.Application.Interfaces.Shop
{
    /// <summary>
    /// Інтерфейс для служби керування замовленнями в додатку HealthyLifestyle.
    /// </summary>
    public interface IOrderService
    {
        #region Методи

        /// <summary>
        /// Асинхронно створює нове замовлення для вказаного користувача.
        /// </summary>
        /// <param name="userId">Унікальний ідентифікатор користувача, який створює замовлення.</param>
        /// <param name="orderCreateDto">Об’єкт передачі даних із деталями створення замовлення.</param>
        /// <returns>DTO створеного замовлення.</returns>
        /// <exception cref="ArgumentException">Викидається, якщо вхідні дані некоректні.</exception>
        Task<OrderDto> CreateOrderAsync(Guid userId, OrderCreateDto orderCreateDto);

        /// <summary>
        /// Асинхронно отримує замовлення за його унікальним ідентифікатором.
        /// </summary>
        /// <param name="orderId">Унікальний ідентифікатор замовлення.</param>
        /// <returns>DTO замовлення, якщо знайдено; інакше null.</returns>
        Task<OrderDto?> GetOrderByIdAsync(Guid orderId);

        /// <summary>
        /// Асинхронно отримує всі замовлення для вказаного користувача.
        /// </summary>
        /// <param name="userId">Унікальний ідентифікатор користувача.</param>
        /// <returns>Колекція DTO замовлень користувача.</returns>
        Task<IEnumerable<OrderDto>> GetUserOrdersAsync(Guid userId);

        /// <summary>
        /// Асинхронно отримує всі замовлення в системі.
        /// </summary>
        /// <returns>Колекція DTO всіх замовлень.</returns>
        Task<IEnumerable<OrderDto>> GetAllOrdersAsync();

        /// <summary>
        /// Асинхронно оновлює статус або адресу доставки замовлення.
        /// </summary>
        /// <param name="orderId">Унікальний ідентифікатор замовлення, яке потрібно оновити.</param>
        /// <param name="orderUpdateDto">Об’єкт передачі даних з оновленими статусом або адресою.</param>
        /// <returns>Оновлений DTO замовлення, якщо оновлення успішне; інакше null.</returns>
        Task<OrderDto?> UpdateOrderStatusAndAddressAsync(Guid orderId, OrderUpdateDto orderUpdateDto);

        /// <summary>
        /// Асинхронно видаляє замовлення за його унікальним ідентифікатором.
        /// </summary>
        /// <param name="orderId">Унікальний ідентифікатор замовлення, яке потрібно видалити.</param>
        /// <returns>True, якщо замовлення успішно видалено; інакше false.</returns>
        Task<bool> DeleteOrderAsync(Guid orderId);

        #endregion
    }
}