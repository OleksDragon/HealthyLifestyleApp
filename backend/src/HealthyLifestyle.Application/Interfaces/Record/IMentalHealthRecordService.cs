using HealthyLifestyle.Application.DTOs.Record;

namespace HealthyLifestyle.Application.Interfaces.Record
{
    public interface IMentalHealthRecordService
    {
        /// <summary>
        /// Отримує список усіх 'записів' записів ментального здоров’я.
        /// </summary>
        /// <returns>Список записів чоловічого трекера здоров’я.</returns>
        Task<IEnumerable<MentalHealthRecordDto>> GetAllMentalHealthRecordsAsync();

        /// <summary>
        /// Отримує запис запису ментального здоров’я за ідентифікатором.
        /// </summary>
        /// <param name="id">Ідентифікатор користувача UserId.</param>
        /// <returns>Запис чоловічого трекера.</returns>
        Task<List<MentalHealthRecordDto>> GetMentalHealthRecordByIdAsync(Guid id);

        /// <summary>
        /// Створює новий запис запису ментального здоров’я.
        /// </summary>
        /// <param name="createDto">Дані для створення запису.</param>
        /// <returns>Створений запис.</returns>
        Task<MentalHealthRecordDto> CreateMentalHealthRecordAsync(MentalHealthRecordCreateDto createDto);

        /// <summary>
        /// Оновлює існуючий запис запису ментального здоров’я.
        /// </summary>
        /// <param name="id">Ідентифікатор запису ментального здоров’я.</param>
        /// <param name="updateDto">Оновлені дані.</param>
        /// <returns>Оновлений запис.</returns>
        Task<MentalHealthRecordDto> UpdateMentalHealthRecordAsync(Guid id, MentalHealthRecordUpdateDto updateDto);

        /// <summary>
        /// Видаляє запис запису ментального здоров’я.
        /// </summary>
        /// <param name="id">Ідентифікатор запису ментального здоров’я.</param>
        Task DeleteMentalHealthRecordAsync(Guid id);
    }
}
