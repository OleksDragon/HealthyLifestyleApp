using HealthyLifestyle.Core.Enums;
using System.ComponentModel.DataAnnotations;

namespace HealthyLifestyle.Application.DTOs.Subscription
{
    /// <summary>
    /// DTO для перегляду інформації про підписку.
    /// </summary>
    public class SubscriptionDto
    {
        public Guid Id { get; set; }

        public Guid UserId { get; set; }

        public SubscriptionType Type { get; set; }

        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }

        public decimal Price { get; set; }

        public SubscriptionStatus Status { get; set; }

        public DateTime CreatedAt { get; set; }

        public DateTime UpdatedAt { get; set; }
    }

    /// <summary>
    /// DTO для створення нової підписки.
    /// </summary>
    public class SubscriptionCreateDto
    {
        [Required]
        public Guid UserId { get; set; }

        [Required]
        public SubscriptionType Type { get; set; }

        //[Required]
        //public DateTime StartDate { get; set; }

        [Required]
        public DateTime EndDate { get; set; }

        [Required]
        [Range(0, double.MaxValue, ErrorMessage = "Ціна на підписку не може бути від’ємною!")]
        public decimal Price { get; set; }
    }

    /// <summary>
    /// DTO для оновлення існуючої підписки.
    /// </summary>
    public class SubscriptionUpdateDto
    {
        [Required]
        public SubscriptionType Type { get; set; }

        [Required]
        public DateTime StartDate { get; set; }

        [Required]
        public DateTime EndDate { get; set; }

        [Required]
        [Range(0, double.MaxValue, ErrorMessage = "Ціна на підписку не може бути від’ємною!")]
        public decimal Price { get; set; }

        [Required]
        public SubscriptionStatus Status { get; set; }
    }
}
