using HealthyLifestyle.Application.DTOs.Subscription;
using static HealthyLifestyle.Application.Services.SubscriptionS.SubscriptionService;

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
        Task<List<SubscriptionDto>> GetSubscriptionsByUserIdAsync(Guid id);

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

        /// <summary>
        /// Перевіряє статус підписки користувача:
        /// якщо закінчилась — автоматично оновлює статус;
        /// якщо активна — повертає її;
        /// якщо немає — повертає повідомлення.
        /// </summary>
        /// <param name="userId">Ідентифікатор підписки.</param>
        Task<SubscriptionDto?> CheckAndUpdateSubscriptionStatusAsync(Guid userId);

        /// <summary>
        /// Створити сімейну підписку (owner + члени сім'ї).
        /// </summary>
        /// <param name="createDto">Дані для створення сімейної підписки.</param>
        Task<SubscriptionDto> CreateFamilySubscriptionAsync(FamilySubscriptionCreateDto createDto);

        /// <summary>
        /// Оновлення членів сімейної підписки.
        /// </summary>
        /// <param name="subscriptionId">Ідентифікатор підписки.</param>
        /// <param name="memberEmails">Список емайлів користувачів.</param>
        Task<FamilySubscriptionUpdateResultDto> UpdateFamilyMembersAsync(Guid subscriptionId, List<string> memberEmails);

        /// <summary>
        /// Отримати всіх членів сімейної підписки певного користувача (власника).
        /// </summary>
        /// <param name="ownerId">Ідентифікатор власника сімейної підписки.</param>
        Task<List<FamilySubscriptionMemberDto>> GetFamilyMembersAsync(Guid ownerId);

        /// <summary>
        /// Видалити члена з сімейної підписки.
        /// </summary>
        /// <param name="ownerId">Ідентифікатор власника підписки.</param>
        /// <param name="memberEmail">емейл користувача, якого потрібно видалити.</param>
        Task RemoveFamilyMemberAsync(Guid ownerId, string memberEmail);
    }
}
