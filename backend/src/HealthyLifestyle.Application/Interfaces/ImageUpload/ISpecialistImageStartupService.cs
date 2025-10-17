namespace HealthyLifestyle.Application.Interfaces.ImageUpload
{
    /// <summary>
    /// Сервіс для автоматичного завантаження зображень спеціалістів при запуску додатку.
    /// </summary>
    public interface ISpecialistImageStartupService
    {
        /// <summary>
        /// Завантажує всі зображення спеціалістів з frontend папки при запуску додатку.
        /// </summary>
        /// <returns>Task, що представляє асинхронну операцію.</returns>
        Task InitializeSpecialistImagesAsync();
    }
}
