using HealthyLifestyle.Application.DTOs.Record;

namespace HealthyLifestyle.Application.Interfaces.Record
{
    public interface ISleepRecordService
    {
        /// <summary>
        /// Отримати всі записи сну користувачив.
        /// </summary>
        Task<IEnumerable<SleepRecordDto>> GetAllSleepRecordsAsync();
        /// <summary>
        /// Отримати запис сну
        /// </summary>
        /// <param name="id">Ідентифікатор користувача.</param>
        Task<List<SleepRecordDto>> GetSleepRecordByIdAsync(Guid id);
        /// <summary>
        /// Створити новий запис сну.
        /// </summary>
        /// <param name="createDto">Дані для створення запис сну.</param>
        Task<SleepRecordDto> CreateSleepRecordAsync(SleepRecordCreateDto createDto);
        /// <summary>
        /// Оновити існуючий запис
        /// </summary>
        /// <param name="id">Ідентифікатор запис сну.</param>
        /// <param name="updateDto">Дані для оновлення запис сну.</param>
        Task<SleepRecordDto> UpdateSleepRecordAsync(Guid id, SleepRecordUpdateDto updateDto);
        /// <summary>
        /// Видалити запис сну.
        /// </summary>
        /// <param name="id">Ідентифікатор запис сну.</param>
        Task DeleteSleepRecordAsync(Guid id);
    }
}
