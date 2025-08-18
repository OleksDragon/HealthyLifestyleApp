using HealthyLifestyle.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HealthyLifestyle.Core.Interfaces.Calendar
{
    public interface ICalendarRepository : IRepository<CalendarEvent>
    {
        Task<IEnumerable<CalendarEvent>> GetAllCalendarEventsByUserIdInDateRangeAsync(Guid userId, DateTime start, DateTime end);

        Task<CalendarEvent> GetEventWithParticipantsAsync(Guid id);
    }
}
