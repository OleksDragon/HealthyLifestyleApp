using System;
using System.Collections.Generic;

namespace HealthyLifestyle.Application.Services.Payment.Model
{
    /// <summary>
    /// Універсальна модель запиту на створення платіжної сесії Stripe.
    /// Дозволяє передавати тип платежу (subscription, one_time тощо)
    /// та додаткові метадані (наприклад, id користувача або товару).
    /// </summary>
    public class PaymentRequest
    {
        /// <summary>
        /// Ідентифікатор ціни Stripe (price_...).
        /// </summary>
        public string PriceId { get; set; } = string.Empty;

        /// <summary>
        /// Тип платежу: "payment" (разовий) або "subscription" (підписка).
        /// </summary>
        public string PaymentType { get; set; } = string.Empty;

        /// <summary>
        /// Ідентифікатор користувача, якщо потрібно пов’язати оплату з акаунтом.
        /// </summary>
        public Guid? UserId { get; set; }

        /// <summary>
        /// Додаткові метадані — можна передати будь-яку інформацію про замовлення, користувача чи сервіс.
        /// (наприклад, productId, specialistId).
        /// </summary>
        public Dictionary<string, string>? Metadata { get; set; }

        // Нові властивості для кастомних URL
        public string? SuccessUrl { get; set; }
        public string? CancelUrl { get; set; }
    }
}
