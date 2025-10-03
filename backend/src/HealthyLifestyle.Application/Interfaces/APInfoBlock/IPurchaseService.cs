

using HealthyLifestyle.Application.DTOs.APInfoBlock;

namespace HealthyLifestyle.Application.Interfaces.APInfoBlock
{
    public interface IPurchaseService
    {
        /// <summary>
        /// Отримує список усіх покупок.
        /// </summary>
        /// <returns>Список покупок.</returns>
        Task<IEnumerable<PurchaseDto>> GetAllPurchasesAsync();

        /// <summary>
        /// Отримує покупки за ідентифікатором користувача.
        /// </summary>
        /// <param name="userId">Ідентифікатор користувача UserId.</param>
        /// <returns>Список покупок користувача.</returns>
        Task<List<PurchaseDto>> GetPurchasesByUserIdAsync(Guid userId);

        /// <summary>
        /// Створює нову покупку.
        /// </summary>
        /// <param name="createDto">Дані для створення покупки.</param>
        /// <returns>Створена покупка.</returns>
        Task<PurchaseDto> CreatePurchaseAsync(PurchaseCreateDto createDto);

        /// <summary>
        /// Видаляє покупку.
        /// </summary>
        /// <param name="id">Ідентифікатор покупки.</param>
        Task DeletePurchaseAsync(Guid id);
    }
}
