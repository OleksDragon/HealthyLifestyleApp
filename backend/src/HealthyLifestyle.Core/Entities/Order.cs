using HealthyLifestyle.Core.Enums;
using System;
using System.Collections.Generic;
using System.Linq;

namespace HealthyLifestyle.Core.Entities
{
    /// <summary>
    /// Сутність замовлення користувача.
    /// Зберігає інформацію про покупця, суму, статус та елементи замовлення.
    /// Успадкований від базового класу <see cref="BaseEntity"/>.
    /// </summary>
    public class Order : BaseEntity
    {
        #region Властивості

        /// <summary>
        /// Ідентифікатор користувача, який зробив замовлення.
        /// </summary>
        public Guid UserId { get; set; }

        /// <summary>
        /// Дата і час оформлення замовлення (по замовчуванню — поточний UTC час).
        /// </summary>
        public DateTime OrderDate { get; set; } = DateTime.UtcNow;

        /// <summary>
        /// Загальна сума замовлення.
        /// </summary>
        public decimal TotalAmount { get; set; }

        /// <summary>
        /// Адреса доставки.
        /// </summary>
        public string ShippingAddress { get; set; } = string.Empty;

        /// <summary>
        /// Статус замовлення (Pending, Processing, Shipped, Completed і т.д.).
        /// </summary>
        public OrderStatus Status { get; set; } = OrderStatus.Cancelled;

        #endregion

        #region Навігаційні властивості

        /// <summary>
        /// Навигационное свойство для связи з пользователем, який зробив замовлення.
        /// </summary>
        public virtual User User { get; set; } = null!;

        /// <summary>
        /// Список товарів, що входять до замовлення.
        /// </summary>
        public virtual ICollection<OrderItem> OrderItems { get; set; } = new List<OrderItem>();

        #endregion

        #region Конструктори

        /// <summary>
        /// Параметризатор за замовчуванням, необхідний для Entity Framework Core.
        /// </summary>
        public Order() : base()
        {
        }

        /// <summary>
        /// Ініціалізує новий екземпляр замовлення з базовими даними.
        /// </summary>
        /// <param name="userId">Ідентифікатор користувача.</param>
        /// <param name="shippingAddress">Адреса доставки.</param>
        /// <exception cref="ArgumentException">Виникає, якщо ідентифікатор користувача є порожнім або адреса доставки відсутня.</exception>
        public Order(Guid userId, string shippingAddress) : this()
        {
            if (userId == Guid.Empty)
                throw new ArgumentException("Ідентифікатор користувача не може бути порожнім.", nameof(userId));
            if (string.IsNullOrWhiteSpace(shippingAddress))
                throw new ArgumentException("Адреса доставки є обов’язковою.", nameof(shippingAddress));

            UserId = userId;
            ShippingAddress = shippingAddress;
            SetUpdatedAt();
        }

        #endregion

        #region Методи

        /// <summary>
        /// Перераховує загальну суму замовлення на основі позицій заказа.
        /// </summary>
        public void CalculateTotalAmount()
        {
            TotalAmount = OrderItems.Sum(item => item.Quantity * item.PriceAtPurchase);
            SetUpdatedAt();
        }

        /// <summary>
        /// Оновлює статус замовлення.
        /// </summary>
        /// <param name="newStatus">Новий статус замовлення.</param>
        /// <exception cref="ArgumentException">Виникає, якщо новий статус є недійсним.</exception>
        public void UpdateStatus(OrderStatus newStatus)
        {
            if (!Enum.IsDefined(typeof(OrderStatus), newStatus))
                throw new ArgumentException("Недійсний статус замовлення.", nameof(newStatus));

            if (Status != newStatus)
            {
                Status = newStatus;
                SetUpdatedAt();
            }
        }

        /// <summary>
        /// Оновлює адресу доставки.
        /// </summary>
        /// <param name="newShippingAddress">Нова адреса доставки.</param>
        /// <exception cref="ArgumentException">Виникає, якщо нова адреса доставки відсутня.</exception>
        public void UpdateShippingAddress(string newShippingAddress)
        {
            if (string.IsNullOrWhiteSpace(newShippingAddress))
                throw new ArgumentException("Адреса доставки є обов’язковою.", nameof(newShippingAddress));

            if (ShippingAddress != newShippingAddress)
            {
                ShippingAddress = newShippingAddress;
                SetUpdatedAt();
            }
        }

        #endregion
    }
}