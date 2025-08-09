using HealthyLifestyle.Application.DTOs.ProfessionalQualification;

namespace HealthyLifestyle.Application.Interfaces.ProfessionalQualification
{
    /// <summary>
    /// Інтерфейс сервісу для управління деталями профілів психологів.
    /// Надає методи для отримання, створення, оновлення та видалення деталей профілів психологів.
    /// </summary>
    public interface IPsychologistDetailsService
    {
        /// <summary>
        /// Отримує деталі профілю психолога за ідентифікатором кваліфікації.
        /// </summary>
        /// <param name="qualificationId">Унікальний ідентифікатор кваліфікації (GUID).</param>
        /// <returns>
        /// Об’єкт <see cref="PsychologistDetailsDto"/> з деталями профілю психолога або <c>null</c>, якщо деталі не знайдені.
        /// </returns>
        Task<PsychologistDetailsDto?> GetPsychologistDetailsByQualificationIdAsync(Guid qualificationId);

        /// <summary>
        /// Створює нові деталі профілю психолога.
        /// </summary>
        /// <param name="qualificationId">Унікальний ідентифікатор кваліфікації (GUID).</param>
        /// <param name="createDto">Об’єкт <see cref="PsychologistDetailsDto"/> із даними для створення.</param>
        /// <returns>
        /// Об’єкт <see cref="PsychologistDetailsDto"/> з створеними деталями або <c>null</c>, якщо створення не вдалося.
        /// </returns>
        /// <exception cref="ArgumentNullException">Виникає, якщо <paramref name="createDto"/> є <c>null</c>.</exception>
        Task<PsychologistDetailsDto?> CreatePsychologistDetailsAsync(Guid qualificationId, PsychologistDetailsDto createDto);

        /// <summary>
        /// Оновлює існуючі деталі профілю психолога.
        /// </summary>
        /// <param name="qualificationId">Унікальний ідентифікатор кваліфікації (GUID).</param>
        /// <param name="updateDto">Об’єкт <see cref="PsychologistDetailsDto"/> із новими даними для оновлення.</param>
        /// <returns>
        /// Об’єкт <see cref="PsychologistDetailsDto"/> з оновленими деталями або <c>null</c>, якщо оновлення не вдалося.
        /// </returns>
        /// <exception cref="ArgumentNullException">Виникає, якщо <paramref name="updateDto"/> є <c>null</c>.</exception>
        Task<PsychologistDetailsDto?> UpdatePsychologistDetailsAsync(Guid qualificationId, PsychologistDetailsDto updateDto);

        /// <summary>
        /// Видаляє деталі профілю психолога за ідентифікатором кваліфікації.
        /// </summary>
        /// <param name="qualificationId">Унікальний ідентифікатор кваліфікації (GUID).</param>
        /// <returns>
        /// <c>true</c>, якщо деталі успішно видалено; інакше <c>false</c>.
        /// </returns>
        Task<bool> DeletePsychologistDetailsAsync(Guid qualificationId);
    }
}