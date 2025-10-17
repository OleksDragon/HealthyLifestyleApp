namespace HealthyLifestyle.Infrastructure.Interfaces
{
    /// <summary>
    /// Сервіс для збереження URL зображень спеціалістів в базу даних.
    /// </summary>
    public interface ISpecialistImageDatabaseService
    {
        /// <summary>
        /// Зберігає URL зображення в базу даних для відповідного спеціаліста.
        /// </summary>
        /// <param name="specialistId">ID спеціаліста.</param>
        /// <param name="imageUrl">URL зображення.</param>
        /// <param name="imageType">Тип зображення.</param>
        /// <returns>True, якщо URL успішно збережено в БД.</returns>
        Task<bool> SaveImageUrlToDatabase(Guid specialistId, string imageUrl, string imageType);

        /// <summary>
        /// Отримує тип сутності для спеціаліста.
        /// </summary>
        /// <param name="specialistId">ID спеціаліста.</param>
        /// <returns>Тип сутності (наприклад, "TrainerDetails", "DoctorDetails").</returns>
        Task<string?> GetEntityTypeForSpecialist(Guid specialistId);
    }
}
