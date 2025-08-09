using HealthyLifestyle.Application.DTOs.ProfessionalQualification;

namespace HealthyLifestyle.Application.Interfaces.ProfessionalQualification
{
    /// <summary>
    /// Інтерфейс сервісу для управління професійними кваліфікаціями користувачів.
    /// Надає методи для отримання, створення, оновлення та видалення кваліфікацій, а також управління статусами.
    /// </summary>
    public interface IProfessionalQualificationService
    {
        /// <summary>
        /// Отримує список усіх типів професійних ролей.
        /// </summary>
        /// <returns>Колекція об’єктів <see cref="ProfessionalRoleTypeDto"/>, що містять дані типів ролей.</returns>
        Task<IEnumerable<ProfessionalRoleTypeDto>> GetAllProfessionalRoleTypesAsync();

        /// <summary>
        /// Подання заявки на професійну кваліфікацію для користувача.
        /// </summary>
        /// <param name="userId">Унікальний ідентифікатор користувача (GUID).</param>
        /// <param name="createDto">Об’єкт <see cref="CreateProfessionalQualificationDto"/> із даними для створення кваліфікації.</param>
        /// <returns>
        /// Об’єкт <see cref="UserProfessionalQualificationDto"/> з інформацією про створену кваліфікацію або <c>null</c>, якщо заявка не вдалася.
        /// </returns>
        /// <exception cref="ArgumentNullException">Виникає, якщо <paramref name="createDto"/> є <c>null</c>.</exception>
        Task<UserProfessionalQualificationDto?> ApplyForProfessionalQualificationAsync(Guid userId, CreateProfessionalQualificationDto createDto);

        /// <summary>
        /// Отримує список усіх кваліфікацій для вказаного користувача.
        /// </summary>
        /// <param name="userId">Унікальний ідентифікатор користувача (GUID).</param>
        /// <returns>Колекція об’єктів <see cref="UserProfessionalQualificationDto"/>, що містять дані кваліфікацій користувача.</returns>
        Task<IEnumerable<UserProfessionalQualificationDto>> GetUserProfessionalQualificationsAsync(Guid userId);

        /// <summary>
        /// Отримує список усіх кваліфікацій у системі.
        /// </summary>
        /// <returns>Колекція об’єктів <see cref="UserProfessionalQualificationDto"/>, що містять дані всіх кваліфікацій.</returns>
        Task<IEnumerable<UserProfessionalQualificationDto>> GetAllProfessionalQualificationsAsync();

        /// <summary>
        /// Оновлює статус професійної кваліфікації.
        /// </summary>
        /// <param name="qualificationId">Унікальний ідентифікатор кваліфікації (GUID).</param>
        /// <param name="updateStatusDto">Об’єкт <see cref="UpdateProfessionalQualificationStatusDto"/> із новим статусом кваліфікації.</param>
        /// <returns>
        /// Об’єкт <see cref="UserProfessionalQualificationDto"/> з оновленою інформацією про кваліфікацію або <c>null</c>, якщо оновлення не вдалося.
        /// </returns>
        /// <exception cref="ArgumentNullException">Виникає, якщо <paramref name="updateStatusDto"/> є <c>null</c>.</exception>
        Task<UserProfessionalQualificationDto?> UpdateProfessionalQualificationStatusAsync(Guid qualificationId, UpdateProfessionalQualificationStatusDto updateStatusDto);

        /// <summary>
        /// Отримує деталі кваліфікації за її ідентифікатором.
        /// </summary>
        /// <param name="qualificationId">Унікальний ідентифікатор кваліфікації (GUID).</param>
        /// <returns>
        /// Об’єкт <see cref="UserProfessionalQualificationDto"/> з інформацією про кваліфікацію або <c>null</c>, якщо кваліфікація не знайдена.
        /// </returns>
        Task<UserProfessionalQualificationDto?> GetQualificationByIdAsync(Guid qualificationId);

        /// <summary>
        /// Отримує повні деталі кваліфікації за її ідентифікатором.
        /// </summary>
        /// <param name="qualificationId">Унікальний ідентифікатор кваліфікації (GUID).</param>
        /// <returns>
        /// Об’єкт <see cref="UserProfessionalQualificationDto"/> з повною інформацією про кваліфікацію або <c>null</c>, якщо кваліфікація не знайдена.
        /// </returns>
        /// <remarks>
        /// Цей метод дублює функціональність <see cref="GetQualificationByIdAsync"/>; розгляньте об’єднання або чітке розмежування логіки в реалізації.
        /// </remarks>
        Task<UserProfessionalQualificationDto?> GetFullQualificationByIdAsync(Guid qualificationId);
    }
}