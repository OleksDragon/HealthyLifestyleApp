using HealthyLifestyle.Application.DTOs.ProfessionalQualification;

namespace HealthyLifestyle.Application.Interfaces.ProfessionalQualification
{
    /// <summary>
    /// Інтерфейс сервісу для керування специфічними деталями профілю Лікаря.
    /// Цей сервіс обробляє бізнес-логіку, пов'язану з деталями лікаря.
    /// </summary>
    public interface IDoctorDetailsService
    {
        /// <summary>
        /// Отримує деталі лікаря за ідентифікатором його професійної кваліфікації.
        /// </summary>
        /// <param name="qualificationId">Ідентифікатор професійної кваліфікації.</param>
        /// <returns>DoctorDetailsDto, якщо деталі знайдено; інакше null.</returns>
        Task<DoctorDetailsDto?> GetDoctorDetailsByQualificationIdAsync(Guid qualificationId);

        /// <summary>
        /// Створює нові деталі лікаря для існуючої професійної кваліфікації.
        /// </summary>
        /// <param name="qualificationId">Ідентифікатор професійної кваліфікації, до якої прикріплюються деталі.</param>
        /// <param name="createDto">DTO з даними для створення деталей лікаря.</param>
        /// <returns>Створений DoctorDetailsDto, якщо операція успішна; інакше null.</returns>
        Task<DoctorDetailsDto?> CreateDoctorDetailsAsync(Guid qualificationId, DoctorDetailsDto createDto);

        /// <summary>
        /// Оновлює існуючі деталі лікаря.
        /// </summary>
        /// <param name="qualificationId">Ідентифікатор професійної кваліфікації, чиї деталі оновлюються.</param>
        /// <param name="updateDto">DTO з оновленими даними для деталей лікаря.</param>
        /// <returns>Оновлений DoctorDetailsDto, якщо операція успішна; інакше null.</returns>
        Task<DoctorDetailsDto?> UpdateDoctorDetailsAsync(Guid qualificationId, DoctorDetailsDto updateDto);

        /// <summary>
        /// Видаляє деталі лікаря за ідентифікатором його професійної кваліфікації.
        /// </summary>
        /// <param name="qualificationId">Ідентифікатор професійної кваліфікації, чиї деталі видаляються.</param>
        /// <returns>True, якщо деталі успішно видалено; інакше false.</returns>
        Task<bool> DeleteDoctorDetailsAsync(Guid qualificationId);
    }
}