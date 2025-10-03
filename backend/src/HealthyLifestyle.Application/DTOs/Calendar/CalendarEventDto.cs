using HealthyLifestyle.Application.DTOs.User;
using HealthyLifestyle.Core.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HealthyLifestyle.Application.DTOs.Calendar
{
    /// <summary>
    /// DTO для відображення інформації про подію.
    /// </summary>
    public class CalendarEventDto
    {
        public Guid Id { get; set; }
        public Guid AuthorId { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public DateTime StartTime { get; set; }
        public DateTime? EndTime { get; set; }
        public string? MeetingLink { get; set; } = string.Empty;
        public int? NotificationBefore { get; set; }
        public TaskType? TaskToDo { get; set; }
        public Guid? WorkoutId { get; set; }
        public IEnumerable<UserDto> MettingParticipants { get; set; } = new List<UserDto>();
    }

    /// <summary>
    /// DTO для створення події.
    /// </summary>
    public class CalendarEventCreateDto
    {
        public Guid AuthorId { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public DateTime StartTime { get; set; }
        public DateTime? EndTime { get; set; }
        public string? MeetingLink { get; set; } = string.Empty;
        public int? NotificationBefore { get; set; }
        public TaskType? TaskToDo { get; set; }
        public Guid? WorkoutId { get; set; }
        public IEnumerable<Guid> MettingParticipants { get; set; } = new List<Guid>();
    }

    /// <summary>
    /// DTO для оновлення події.
    /// </summary>
    public class CalendarEventUpdateDto
    {
        public Guid AuthorId { get; set; }
        public string? Title { get; set; } = string.Empty;
        public string? Description { get; set; } = string.Empty;
        public DateTime? StartTime { get; set; }
        public DateTime? EndTime { get; set; }
        public string? MeetingLink { get; set; } = string.Empty;
        public int? NotificationBefore { get; set; }
        public TaskType? TaskToDo { get; set; }
        public Guid? WorkoutId { get; set; }
        public IEnumerable<Guid> MettingParticipants { get; set; } = new List<Guid>();
    }
}
