

using HealthyLifestyle.Application.DTOs.APInfoBlock;

namespace HealthyLifestyle.Application.Interfaces.APInfoBlock
{
    public interface IAchievementService
    {
        /// <summary>
        /// Отримує список усіх досягнень.
        /// </summary>
        /// <returns>Список досягнень.</returns>
        Task<IEnumerable<AchievementDto>> GetAllAchievementsAsync();

        /// <summary>
        /// Отримує досягнення за ідентифікатором користувача.
        /// </summary>
        /// <param name="userId">Ідентифікатор користувача UserId.</param>
        /// <returns>Список досягнень користувача.</returns>
        Task<List<AchievementDto>> GetAchievementsByUserIdAsync(Guid userId);

        /// <summary>
        /// Створює нове досягнення.
        /// </summary>
        /// <param name="createDto">Дані для створення досягнення.</param>
        /// <returns>Створене досягнення.</returns>
        Task<AchievementDto> CreateAchievementAsync(AchievementCreateDto createDto);

        /// <summary>
        /// Видаляє досягнення.
        /// </summary>
        /// <param name="id">Ідентифікатор досягнення.</param>
        Task DeleteAchievementAsync(Guid id);
    }
}
