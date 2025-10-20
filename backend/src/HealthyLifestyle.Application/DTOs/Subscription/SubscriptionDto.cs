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

        /// <summary>
        /// Показує, чи активна підписка зараз.
        /// </summary>
        public bool IsActive { get; set; }

        /// <summary>
        /// Показує, чи користувач отримує доступ як член сімейної підписки.
        /// </summary>
        public bool IsFamilyMember { get; set; }

        /// <summary>
        /// Список членів сімейної підписки (Family Plan).
        /// </summary>
        public List<FamilySubscriptionMemberDto>? FamilyMembers { get; set; }

        // Нове поле для зворотного повідомлення користувачу
        public List<string>? NotFoundEmails { get; set; }

        public string? StripeSubscriptionId { get; set; }
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

        [Required]
        public DateTime EndDate { get; set; }

        [Required]
        [Range(0, double.MaxValue, ErrorMessage = "Ціна на підписку не може бути від’ємною!")]
        public decimal Price { get; set; }

        public string? StripeSubscriptionId { get; set; }
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

        public string? StripeSubscriptionId { get; set; }
    }

    /// <summary>
    /// DTO для створення сімейної підписки (Family Plan).
    /// </summary>
    public class FamilySubscriptionCreateDto
    {
        [Required] // ← Додати
        public Guid OwnerId { get; set; }

        [MaxLength(3, ErrorMessage = "До сімейного плану можна додати максимум 3 членів родини.")]
        public List<string> MemberEmails { get; set; } = new();

        [Required] // ← Додати
        public DateTime EndDate { get; set; }

        [Required] // ← Додати
        [Range(0, double.MaxValue, ErrorMessage = "Ціна на підписку не може бути від'ємною!")]
        public decimal Price { get; set; }
    }

    /// <summary>
    /// DTO для учасників сімейної підписки.
    /// </summary>
    public class FamilySubscriptionMemberDto
    {
        public Guid MemberId { get; set; }

        public string Email { get; set; } = string.Empty;

        public DateTime AddedAt { get; set; }
    }
}
