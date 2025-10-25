using HealthyLifestyle.Core.Enums;
using System;

namespace HealthyLifestyle.Core.Entities
{
    /// <summary>
    /// Сутність, що представляє підписку користувача на платні або безкоштовні сервіси додатка.
    /// Містить інформацію про тип підписки, терміни, ціну та статус.
    /// </summary>
    public class Subscription : BaseEntity
    {
        #region Властивості

        /// <summary>
        /// Ідентифікатор користувача, до якого прив’язана підписка.
        /// </summary>
        public Guid UserId { get; set; }

        /// <summary>
        /// Тип підписки (наприклад: базова, преміум тощо).
        /// Зберігається як перерахування SubscriptionType.
        /// </summary>
        public SubscriptionType Type { get; set; }

        /// <summary>
        /// Дата початку підписки.
        /// </summary>
        public DateTime StartDate { get; set; }

        /// <summary>
        /// Дата закінчення підписки.
        /// </summary>
        public DateTime EndDate { get; set; }

        /// <summary>
        /// Вартість підписки.
        /// </summary>
        public decimal Price { get; set; }

        /// <summary>
        /// Поточний статус підписки (Активна, Завершена, Скасована тощо).
        /// </summary>
        public SubscriptionStatus Status { get; set; }

        /// <summary>
        /// Ідентифікатор підписки в Stripe (sub_xxx)
        /// </summary>
        public string? StripeSubscriptionId { get; set; }

        /// <summary>
        /// Колекція запрошених користувачів - членів сім'ї (Family Plan).
        /// </summary>
        public virtual ICollection<FamilySubscriptionMember> FamilyMembers { get; set; } = new List<FamilySubscriptionMember>();

        /// <summary>
        /// Навігаційна властивість для доступу до пов’язаного користувача.
        /// </summary>
        public User User { get; set; } = null!;
        #endregion

        #region Конструктори

        /// <summary>
        /// Конструктор без параметрів для EF Core.
        /// </summary>
        public Subscription() { }

        /// <summary>
        /// Конструктор з параметрами для створення нової підписки.
        /// </summary>
        /// <param name="userId">Ідентифікатор користувача.</param>
        /// <param name="type">Тип підписки.</param>
        /// <param name="startDate">Дата початку підписки.</param>
        /// <param name="endDate">Дата закінчення підписки.</param>
        /// <param name="price">Вартість підписки.</param>
        public Subscription(Guid userId, SubscriptionType type, DateTime startDate, DateTime endDate, decimal price)
        {
            UserId = userId;
            Type = type;
            StartDate = startDate;
            EndDate = endDate;
            Price = price;
            Status = SubscriptionStatus.Active;
        }
        #endregion

        #region Методи

        /// <summary>
        /// Продовжує підписку до нової дати закінчення.
        /// </summary>
        /// <param name="newEndDate">Нова дата закінчення підписки.</param>
        public void Renew(DateTime newEndDate)
        {
            EndDate = newEndDate;
            Status = SubscriptionStatus.Active;
            SetUpdatedAt();
        }

        /// <summary>
        /// Скасовує підписку.
        /// </summary>
        public void Cancel()
        {
            Status = SubscriptionStatus.Canceled;
            SetUpdatedAt();
        }

        /// <summary>
        /// Обчислює кількість днів, що залишилися до закінчення підписки.
        /// </summary>
        /// <returns>Кількість днів, що залишилися (може бути від’ємним, якщо підписка вже закінчилася).</returns>
        public int GetRemainingDays()
        {
            return (EndDate - DateTime.UtcNow).Days;
        }

        /// <summary>
        /// Позначає підписку як прострочену.
        /// </summary>
        public void MarkAsExpired()
        {
            Status = SubscriptionStatus.Expired;
            SetUpdatedAt();
        }
        #endregion
    }
}