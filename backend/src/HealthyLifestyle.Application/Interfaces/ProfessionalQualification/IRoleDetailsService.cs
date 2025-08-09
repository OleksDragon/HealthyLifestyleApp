namespace HealthyLifestyle.Application.Interfaces.ProfessionalQualification
{
    /// <summary>
    /// Інтерфейс для сервісів управління деталями профілів ролей.
    /// </summary>
    /// <typeparam name="TDto">Тип DTO для мапінгу.</typeparam>
    public interface IRoleDetailsService<TDto> where TDto : class
    {
        /// <summary>
        /// Отримує деталі профілю за ідентифікатором кваліфікації.
        /// </summary>
        /// <param name="qualificationId">Унікальний ідентифікатор кваліфікації.</param>
        /// <param name="roleName">Назва ролі для валідації.</param>
        /// <returns>DTO з деталями профілю або null, якщо деталі не знайдені.</returns>
        Task<TDto?> GetDetailsByQualificationIdAsync(Guid qualificationId, string roleName);

        /// <summary>
        /// Створює нові деталі профілю.
        /// </summary>
        /// <param name="qualificationId">Ідентифікатор кваліфікації.</param>
        /// <param name="dto">DTO з даними для створення.</param>
        /// <param name="roleName">Назва ролі для валідації.</param>
        /// <returns>DTO з створеними деталями або null, якщо створення не вдалося.</returns>
        Task<TDto?> CreateDetailsAsync(Guid qualificationId, TDto dto, string roleName);

        /// <summary>
        /// Оновлює існуючі деталі профілю.
        /// </summary>
        /// <param name="qualificationId">Ідентифікатор кваліфікації.</param>
        /// <param name="dto">DTO з новими даними.</param>
        /// <param name="roleName">Назва ролі для валідації.</param>
        /// <returns>DTO з оновленими деталями або null, якщо оновлення не вдалося.</returns>
        Task<TDto?> UpdateDetailsAsync(Guid qualificationId, TDto dto, string roleName);

        /// <summary>
        /// Видаляє деталі профілю.
        /// </summary>
        /// <param name="qualificationId">Ідентифікатор кваліфікації.</param>
        /// <param name="roleName">Назва ролі для валідації.</param>
        /// <returns>true, якщо видалення успішне; інакше false.</returns>
        Task<bool> DeleteDetailsAsync(Guid qualificationId, string roleName);
    }
}