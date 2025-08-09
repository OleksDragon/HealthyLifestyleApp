using HealthyLifestyle.Application.DTOs.ProfessionalQualification;

namespace HealthyLifestyle.Application.Interfaces.ProfessionalQualification
{
    /// <summary>
    /// Інтерфейс сервісу для керування специфічними деталями профілю дієтолога.
    /// </summary>
    public interface IDietitianDetailsService
    {
        /// <summary>
        /// Отримує деталі дієтолога за ідентифікатором кваліфікації користувача.
        /// </summary>
        /// <param name="qualificationId">Ідентифікатор UserProfessionalQualification.</param>
        /// <returns>DietitianDetailsDto, якщо знайдено, інакше null.</returns>
        Task<DietitianDetailsDto?> GetDietitianDetailsByQualificationIdAsync(Guid qualificationId);

        /// <summary>
        /// Створює деталі дієтолога для вказаної кваліфікації.
        /// </summary>
        /// <param name="qualificationId">Ідентифікатор UserProfessionalQualification.</param>
        /// <param name="dto">Дані для створення деталей дієтолога.</param>
        /// <returns>Створений DietitianDetailsDto, якщо операція успішна, інакше null.</returns>
        Task<DietitianDetailsDto?> CreateDietitianDetailsAsync(Guid qualificationId, DietitianDetailsDto dto);

        /// <summary>
        /// Оновлює деталі дієтолога для вказаної кваліфікації.
        /// </summary>
        /// <param name="qualificationId">Ідентифікатор UserProfessionalQualification.</param>
        /// <param name="dto">Дані для оновлення деталей дієтолога.</param>
        /// <returns>Оновлений DietitianDetailsDto, якщо операція успішна, інакше null.</returns>
        Task<DietitianDetailsDto?> UpdateDietitianDetailsAsync(Guid qualificationId, DietitianDetailsDto dto);

        /// <summary>
        /// Видаляє деталі дієтолога для вказаної кваліфікації.
        /// </summary>
        /// <param name="qualificationId">Ідентифікатор UserProfessionalQualification.</param>
        /// <returns>True, якщо деталі успішно видалено, інакше false.</returns>
        Task<bool> DeleteDietitianDetailsAsync(Guid qualificationId);
    }
}