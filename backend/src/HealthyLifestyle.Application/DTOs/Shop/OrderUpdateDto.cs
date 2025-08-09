using HealthyLifestyle.Core.Enums;
using System.ComponentModel.DataAnnotations;

namespace HealthyLifestyle.Application.DTOs.Shop
{
    /// <summary>
    /// Об’єкт передачі даних для оновлення статусу або адреси доставки замовлення.
    /// </summary>
    public class OrderUpdateDto
    {
        #region Властивості

        /// <summary>
        /// Унікальний ідентифікатор замовлення, яке потрібно оновити.
        /// </summary>
        /// <remarks>
        /// Ідентифікатор замовлення є обов’язковим для оновлення.
        /// </remarks>
        [Required(ErrorMessage = "Ідентифікатор замовлення є обов'язковим.")]
        public Guid OrderId { get; set; }

        /// <summary>
        /// Новий статус замовлення.
        /// </summary>
        /// <remarks>
        /// Статус є необов’язковим і може бути null, якщо оновлюється лише адреса доставки.
        /// Використовує перелік <see cref="OrderStatus"/> для визначення стану замовлення.
        /// </remarks>
        [EnumDataType(typeof(OrderStatus), ErrorMessage = "Неприпустимий статус замовлення.")]
        public OrderStatus? Status { get; set; }

        /// <summary>
        /// Нова адреса доставки замовлення.
        /// </summary>
        /// <remarks>
        /// Адреса є необов’язковою і може бути null, якщо оновлюється лише статус.
        /// Максимальна довжина адреси — 500 символів.
        /// </remarks>
        [StringLength(500, ErrorMessage = "Адреса доставки не може перевищувати 500 символів.")]
        public string? ShippingAddress { get; set; }

        #endregion
    }
}
