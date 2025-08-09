using HealthyLifestyle.Core.Enums;
using System.ComponentModel.DataAnnotations;

namespace HealthyLifestyle.Application.DTOs.Notification
{
    public class NotificationDto
    {
        public Guid Id { get; set; }

        public Guid UserId { get; set; }

        public string Message { get; set; } = string.Empty;

        public NotificationType Type { get; set; }

        public bool IsRead { get; set; }

        public DateTime CreatedAt { get; set; }

        public DateTime? UpdatedAt { get; set; }
    }

    public class CreateNotificationDto
    {
        [Required(ErrorMessage = "Користувач є обов’язковим.")]
        public Guid UserId { get; set; }

        [Required(ErrorMessage = "Повідомлення не може бути порожнім.")]
        [StringLength(500, ErrorMessage = "Повідомлення не може перевищувати 1000 символів.")]
        public string Message { get; set; } = string.Empty;

        [Required(ErrorMessage = "Тип повідомлення обов’язковий.")]
        public NotificationType Type { get; set; }
    }

    public class UpdateNotificationDto
    {
        [StringLength(500, ErrorMessage = "Повідомлення не може перевищувати 1000 символів.")]
        public string Message { get; set; } = string.Empty;

        public bool IsRead { get; set; }
    }
}
