using HealthyLifestyle.Application.DTOs.Tracker;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HealthyLifestyle.Application.Interfaces
{
    public interface ISleepRecordService
    {
        /// <summary>
        /// Отримати всі записи сну користувача.
        /// </summary>
        Task<IEnumerable<SleepRecordDto>> GetAllSleepRecordsAsync();
        /// <summary>
        /// Отримати запис сну за ідентифікатором UserId.
        /// </summary>
        Task<SleepRecordDto?> GetSleepRecordByIdAsync(Guid id);
        /// <summary>
        /// Створити новий запис сну.
        /// </summary>
        Task<SleepRecordDto> CreateSleepRecordAsync(SleepRecordCreateDto createDto);
        /// <summary>
        /// Оновити існуючий запис сну за ідентифікатором UserId.
        /// </summary>
        Task<SleepRecordDto> UpdateSleepRecordAsync(Guid id, SleepRecordUpdateDto updateDto);
        /// <summary>
        /// Видалити запис сну за ідентифікатором UserId.
        /// </summary>
        Task DeleteSleepRecordAsync(Guid id);
    }
}
