using HealthyLifestyle.Application.DTOs.Calendar;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HealthyLifestyle.Application.Interfaces.Calendar
{
    public interface ICalendarService
    {
        /// <summary>
        /// Отримує інформацію про подію за її ідентифікатором.
        /// </summary>
        /// <param name="id">Ідентифікатор події.</param>
        /// <returns>Об'єкт CalendarEventDto, якщо подія знайдена; інакше null.</returns>
        Task<CalendarEventDto> GetCalendarEventByIdAsync(Guid id);

        /// <summary>
        /// Отримує список усіх подій за проміжок часу за ідентифікатором користувача.
        /// </summary>
        /// <param name="userId">Ідентифікатор користувача.</param>
        /// <param name="start">Початкова дата пошуку.</param>
        /// <param name="end">Кінцева дата пошуку.</param>
        /// <returns>Колекція об'єктів CalendarEventDto.</returns>
        Task<IEnumerable<CalendarEventDto>> GetAllCalendarEventsByUserIdInDateRangeAsync(Guid userId, DateTime start, DateTime end);

        /// <summary>
        /// Отримує список усіх подій за проміжок часу.
        /// </summary>
        /// <param name="start">Початкова дата пошуку.</param>
        /// <param name="end">Кінцева дата пошуку.</param>
        /// <returns>Колекція об'єктів CalendarEventDto.</returns>
        Task<IEnumerable<CalendarEventDto>> GetAllCalendarEventsToRemindAsync();

        /// <summary>
        /// Створює нову подію.
        /// </summary>
        /// <param name="calendarEventCreateDto">Об'єкт CalendarEventCreateDto, що містить дані для створення події.</param>
        /// <returns>Об'єкт CalendarEventDto щойно створеної події.</returns>
        Task<CalendarEventDto> CreateCalendarEventAsync(CalendarEventCreateDto calendarEventCreateDto);

        /// <summary>
        /// Оновлює існуючу події.
        /// </summary>
        /// <param name="id">Ідентифікатор події, яку потрібно оновити.</param>
        /// <param name="calendarEventUpdateDto">Об'єкт CalendarEventUpdateDto, що містить оновлені дані події.</param>
        /// <returns>Об'єкт CalendarEventDto оновленої події.</returns>
        Task<CalendarEventDto> UpdateCalendarEventAsync(Guid id, CalendarEventUpdateDto calendarEventUpdateDto);

        /// <summary>
        /// Видаляє подію за її ідентифікатором.
        /// </summary>
        /// <param name="id">Ідентифікатор події, яку потрібно видалити.</param>
        Task DeleteCalendarEventAsync(Guid id);
    }
}
