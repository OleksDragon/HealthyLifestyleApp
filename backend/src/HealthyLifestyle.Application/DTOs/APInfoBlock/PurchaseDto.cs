using HealthyLifestyle.Core.Enums;
using System.ComponentModel.DataAnnotations;

namespace HealthyLifestyle.Application.DTOs.APInfoBlock
{
    /// <summary>
    /// DTO для відображення покупки.
    /// </summary>
    public class PurchaseDto
    {
        public Guid Id { get; set; }

        public string Title { get; set; } = string.Empty;

        public DateTime PurchaseDate { get; set; }

        public decimal Amount { get; set; }

        public Guid UserId { get; set; }

        public string? OrderNumber { get; set; }

        public string? ProductName { get; set; }

        public PurchaseStatus Status { get; set; }

        public ProductType ProductType { get; set; }

        public AP_Icon Icon { get; set; }

        public string? TrackingNumber { get; set; }

        public DateTime? DeliveryDate { get; set; }

        public DateTime? PeriodStart { get; set; }

        public DateTime? PeriodEnd { get; set; }

        public DateTime CreatedAt { get; set; }

        public DateTime UpdatedAt { get; set; }

        /// <summary>
        /// Форматована дата для відображення в UI (dd.MM)
        /// </summary>
        public string FormattedDate => PurchaseDate.ToString("dd.MM");
    }

    /// <summary>
    /// DTO для створення нової покупки.
    /// </summary>
    public class PurchaseCreateDto
    {
        [Required(ErrorMessage = "Ідентифікатор користувача є обов'язковим.")]
        public Guid UserId { get; set; }

        [Required(ErrorMessage = "Назва покупки є обов'язковою.")]
        [MaxLength(200, ErrorMessage = "Назва покупки не може перевищувати 200 символів.")]
        public string Title { get; set; } = string.Empty;

        public DateTime PurchaseDate { get; set; } = DateTime.UtcNow;

        [Required(ErrorMessage = "Сума покупки є обов'язковою.")]
        [Range(0, double.MaxValue, ErrorMessage = "Сума покупки не може бути від'ємною.")]
        public decimal Amount { get; set; }

        [MaxLength(100, ErrorMessage = "Номер замовлення не може перевищувати 100 символів.")]
        public string? OrderNumber { get; set; }

        [MaxLength(255, ErrorMessage = "Назва продукту не може перевищувати 255 символів.")]
        public string? ProductName { get; set; }

        [Required(ErrorMessage = "Статус покупки є обов'язковим.")]
        public PurchaseStatus Status { get; set; }

        [Required(ErrorMessage = "Тип продукту є обов'язковим.")]
        public ProductType ProductType { get; set; }

        [Required(ErrorMessage = "Іконка є обов'язковою.")]
        public AP_Icon Icon { get; set; }

        [MaxLength(100, ErrorMessage = "Трек-номер не може перевищувати 100 символів.")]
        public string? TrackingNumber { get; set; }

        public DateTime? DeliveryDate { get; set; }

        public DateTime? PeriodStart { get; set; }

        public DateTime? PeriodEnd { get; set; }
    }
}