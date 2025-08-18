using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HealthyLifestyle.Core.Entities
{
    public class CalendarEvent : BaseEntity
    {
        /// <summary>
        /// Ідентифікатор користувача, якому належить подія.
        /// </summary>
        public Guid AuthorId { get; set; }

        /// <summary>
        /// Заголовок події.
        /// </summary>
        public string Title { get; set; } = string.Empty;

        /// <summary>
        /// Опис події.
        /// </summary>
        public string Description { get; set; } = string.Empty;

        /// <summary>
        /// Дата та час початку події.
        /// </summary>
        public DateTime StartTime { get; set; }

        /// <summary>
        /// Дата та час закінчення події.
        /// </summary>
        public DateTime? EndTime { get; set; }

        /// <summary>
        /// Посилання на відеоконференцію (наприклад, Zoom, Google Meet).
        /// </summary>
        public string? MeetingLink { get; set; } = string.Empty;

        #region Навігаційні властивості

        /// <summary>
        /// Тренування, яке заплановано.
        /// </summary>
        public Workout? Workout { get; set; }

        /// <summary>
        /// Учасники зустрічі.
        /// </summary>
        public IEnumerable<User> MeetingParticipants { get; set; }

        #endregion
    }
}
