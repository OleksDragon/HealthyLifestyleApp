using HealthyLifestyle.Core.Entities;
using HealthyLifestyle.Core.Interfaces.Calendar;
using HealthyLifestyle.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HealthyLifestyle.Infrastructure.Repositories.Calendar
{
    public class CalendarRepository : Repository<CalendarEvent>, ICalendarRepository
    {
        private readonly ApplicationDbContext _dbContext;
        public CalendarRepository(ApplicationDbContext dbContext) : base(dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<IEnumerable<CalendarEvent>> GetAllCalendarEventsByUserIdInDateRangeAsync(Guid userId, DateTime start, DateTime end)
        {
            return await _dbContext.CalendarEvents
                .Include(c => c.MeetingParticipants)
                .Where(e => (e.AuthorId == userId || e.MeetingParticipants.Any(p => p.Id == userId)) && e.StartTime >= start && e.StartTime <= end).Select(e => e).ToListAsync();
        }

        public async Task<IEnumerable<CalendarEvent>> GetAllCalendarEventsToRemindAsync()
        {
            return await _dbContext.CalendarEvents
                .Include(e => e.MeetingParticipants)
                .Where(e => 
                    e.StartTime >= DateTime.Now.AddMinutes(
                        e.NotificationBefore.HasValue ?
                        double.Parse(e.NotificationBefore.Value.ToString()) - 1
                        : 0) && 
                    e.StartTime <= DateTime.Now.AddMinutes(
                        e.NotificationBefore.HasValue ? 
                        double.Parse(e.NotificationBefore.Value.ToString()) 
                        : -1))
                .Select(e => e).ToListAsync();
        }

        public async Task<CalendarEvent> GetEventWithParticipantsAsync(Guid id)
        {
            return await _dbContext.CalendarEvents
                .Include(c => c.MeetingParticipants)
                .FirstOrDefaultAsync(c => c.Id == id);
        }
    }
}
