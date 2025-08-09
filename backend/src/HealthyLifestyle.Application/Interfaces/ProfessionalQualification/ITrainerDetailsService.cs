using HealthyLifestyle.Application.DTOs.ProfessionalQualification;

namespace HealthyLifestyle.Application.Interfaces.ProfessionalQualification
{
    /// <summary>
    /// Інтерфейс сервісу для управління деталями профілів тренерів.
    /// Надає методи для отримання, створення, оновлення та видалення деталей профілів тренерів.
    /// </summary>
    public interface ITrainerDetailsService
    {
        /// <summary>
        /// Отримує деталі профілю тренера за ідентифікатором кваліфікації.
        /// </summary>
        /// <param name="qualificationId">Унікальний ідентифікатор кваліфікації (GUID).</param>
        /// <returns>
        /// Об’єкт <see cref="TrainerDetailsDto"/> з деталями профілю тренера або <c>null</c>, якщо деталі не знайдені.
        /// </returns>
        Task<TrainerDetailsDto?> GetTrainerDetailsByQualificationIdAsync(Guid qualificationId);

        /// <summary>
        /// Створює нові деталі профілю тренера.
        /// </summary>
        /// <param name="qualificationId">Унікальний ідентифікатор кваліфікації (GUID).</param>
        /// <param name="dto">Об’єкт <see cref="TrainerDetailsDto"/> із даними для створення.</param>
        /// <returns>
        /// Об’єкт <see cref="TrainerDetailsDto"/> з створеними деталями або <c>null</c>, якщо створення не вдалося.
        /// </returns>
        /// <exception cref="ArgumentNullException">Виникає, якщо <paramref name="dto"/> є <c>null</c>.</exception>
        Task<TrainerDetailsDto?> CreateTrainerDetailsAsync(Guid qualificationId, TrainerDetailsDto dto);

        /// <summary>
        /// Оновлює існуючі деталі профілю тренера.
        /// </summary>
        /// <param name="qualificationId">Унікальний ідентифікатор кваліфікації (GUID).</param>
        /// <param name="dto">Об’єкт <see cref="TrainerDetailsDto"/> із новими даними для оновлення.</param>
        /// <returns>
        /// Об’єкт <see cref="TrainerDetailsDto"/> з оновленими деталями або <c>null</c>, якщо оновлення не вдалося.
        /// </returns>
        /// <exception cref="ArgumentNullException">Виникає, якщо <paramref name="dto"/> є <c>null</c>.</exception>
        Task<TrainerDetailsDto?> UpdateTrainerDetailsAsync(Guid qualificationId, TrainerDetailsDto dto);

        /// <summary>
        /// Видаляє деталі профілю тренера за ідентифікатором кваліфікації.
        /// </summary>
        /// <param name="qualificationId">Унікальний ідентифікатор кваліфікації (GUID).</param>
        /// <returns>
        /// <c>true</c>, якщо деталі успішно видалено; інакше <c>false</c>.
        /// </returns>
        Task<bool> DeleteTrainerDetailsAsync(Guid qualificationId);
    }
}