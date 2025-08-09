using HealthyLifestyle.Application.DTOs.HealthTracker;

namespace HealthyLifestyle.Application.Interfaces.HealthTracker
{
    public interface IMaleHealthTrackerService
    {
        /// <summary>
        /// Отримує список усіх записів чоловічого трекера здоров’я.
        /// </summary>
        /// <returns>Список записів чоловічого трекера здоров’я.</returns>
        Task<IEnumerable<MaleHealthTrackerDto>> GetAllMaleHealthTrackerAsync();

        /// <summary>
        /// Отримує запис чоловічого трекера за ідентифікатором.
        /// </summary>
        /// <param name="id">Ідентифікатор запису UserId.</param>
        /// <returns>Запис чоловічого трекера.</returns>
        Task<MaleHealthTrackerDto> GetMaleHealthTrackerByIdAsync(Guid id);

        /// <summary>
        /// Створює новий запис чоловічого трекера.
        /// </summary>
        /// <param name="createDto">Дані для створення запису.</param>
        /// <returns>Створений запис.</returns>
        Task<MaleHealthTrackerDto> CreateMaleHealthTrackerAsync(MaleHealthTrackerCreateDto createDto);

        /// <summary>
        /// Оновлює існуючий запис чоловічого трекера.
        /// </summary>
        /// <param name="id">Ідентифікатор запису UserId.</param>
        /// <param name="updateDto">Оновлені дані.</param>
        /// <returns>Оновлений запис.</returns>
        Task<MaleHealthTrackerDto> UpdateMaleHealthTrackerAsync(Guid id, MaleHealthTrackerUpdateDto updateDto);

        /// <summary>
        /// Видаляє запис чоловічого трекера.
        /// </summary>
        /// <param name="id">Ідентифікатор запису для видалення UserId.</param>
        Task DeleteMaleHealthTrackerAsync(Guid id);
    }
}
