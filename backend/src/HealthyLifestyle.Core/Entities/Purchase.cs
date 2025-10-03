using HealthyLifestyle.Core.Enums;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HealthyLifestyle.Core.Entities
{
    /// <summary>
    /// Запис про покупку користувача (наприклад, товару чи підписки).
    /// </summary>
    public class Purchase : BaseEntity
    {
        #region Властивості

        /// <summary>
        /// Назва операції (Оформлення преміум підписки, оформлення заказу, доставка товару тощо).
        /// </summary>
        [Required, MaxLength(200)]
        public string Title { get; set; } = string.Empty;

        /// <summary>
        /// Дата та час покупки.
        /// </summary>
        public DateTime PurchaseDate { get; set; } = DateTime.UtcNow;

        /// <summary>
        /// Загальна сума покупки.
        /// </summary>
        [Range(0, double.MaxValue)]
        public decimal Amount { get; set; }

        /// <summary>
        /// Ідентифікатор користувача, який здійснив покупку.
        /// </summary>
        [ForeignKey(nameof(User))]
        public Guid UserId { get; set; }

        /// <summary>
        /// Номер замовлення.
        /// </summary>
        [MaxLength(100)]
        public string? OrderNumber { get; set; }

        /// <summary>
        /// Назва продукту.
        /// </summary>
        [MaxLength(255)]
        public string? ProductName { get; set; }

        /// <summary>
        /// Статус покупки.
        /// </summary>
        public PurchaseStatus Status { get; set; }

        /// <summary>
        /// Тип продукту.
        /// </summary>
        public ProductType ProductType { get; set; }

        /// <summary>
        /// Іконка, яка відображається в UI. (Доступні іконки дивись в Enums/AP_Icon)
        /// </summary>
        public AP_Icon Icon { get; set; }

        /// <summary>
        /// Трек-номер (для доставки).
        /// </summary>
        [MaxLength(100)]
        public string? TrackingNumber { get; set; }

        /// <summary>
        /// Дата доставки.
        /// </summary>
        public DateTime? DeliveryDate { get; set; }

        /// <summary>
        /// Початок періоду (для підписки).
        /// </summary>
        public DateTime? PeriodStart { get; set; }

        /// <summary>
        /// Кінець періоду (для підписки).
        /// </summary>
        public DateTime? PeriodEnd { get; set; }

        #endregion

        #region Навігаційні властивості

        /// <summary>
        /// Користувач, який здійснив покупку.
        /// </summary>
        public virtual User User { get; set; } = null!;

        #endregion

        #region Конструктори

        public Purchase() : base()
        { 
        }

        public Purchase(Guid userId, string title, decimal amount, ProductType productType, PurchaseStatus status, AP_Icon icon) : this()
        {
            if (userId == Guid.Empty)
                throw new ArgumentException("Ідентифікатор користувача не може бути порожнім.", nameof(userId));

            if (amount < 0)
                throw new ArgumentOutOfRangeException(nameof(amount), "Сума покупки не може бути від'ємною.");

            UserId = userId;
            Title = title;
            Amount = amount;
            ProductType = productType;
            Status = status;
            Icon = icon;
            PurchaseDate = DateTime.UtcNow;
        }

        #endregion
    }
}