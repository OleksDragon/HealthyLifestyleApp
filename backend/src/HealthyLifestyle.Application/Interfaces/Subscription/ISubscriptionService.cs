using HealthyLifestyle.Application.DTOs.Subscription;

namespace HealthyLifestyle.Application.Interfaces.Subscription
{
    public interface ISubscriptionService
    {
        /// <summary>
        /// Отримати підписок всіх користувачів.
        /// </summary>
        Task<IEnumerable<SubscriptionDto>> GetAllSubscriptionsAsync();

        /// <summary>
        /// Отримати підписки користувача.
        /// </summary>
        /// <param name="id">Ідентифікатор користувача.</param>
        Task<List<SubscriptionDto>> GetSubscriptionsByIdAsync(Guid id);

        /// <summary>
        /// Створити нову підписку.
        /// </summary>
        /// <param name="createDto">Дані для створення підписки.</param>
        Task<SubscriptionDto> CreateSubscriptionAsync(SubscriptionCreateDto createDto);

        /// <summary>
        /// Оновити існуючу підписку.
        /// </summary>
        /// <param name="id">Ідентифікатор підписки.</param>
        /// <param name="updateDto">Дані для оновлення підписки.</param>
        Task<SubscriptionDto> UpdateSubscriptionAsync(Guid id, SubscriptionUpdateDto updateDto);

        /// <summary>
        /// Видалити підписку.
        /// </summary>
        /// <param name="id">Ідентифікатор підписки.</param>
        Task DeleteSubscriptionAsync(Guid id);

        /// <summary>
        /// Продовжити підписку користувача.
        /// </summary>
        /// <param name="id">Ідентифікатор підписки.</param>
        /// <param name="newEndDate">Нова дата закінчення підписки.</param>
        Task RenewSubscriptionAsync(Guid id, DateTime newEndDate);

        /// <summary>
        /// Оновлює текст повідомлення.
        /// </summary>
        /// <param name="id">Ідентифікатор підписки.</param>
        Task CancelSubscriptionAsync(Guid id);

        /// <summary>
        /// Оновлює текст повідомлення.
        /// </summary>
        /// <param name="id">Ідентифікатор підписки.</param>
        /// при вході користувача порівняти EndDate з поточним часом, якщо EndDate < DateTime.Now то викликати ExpireSubscriptionAsync(id)
        Task ExpireSubscriptionAsync(Guid id);
    }
}
