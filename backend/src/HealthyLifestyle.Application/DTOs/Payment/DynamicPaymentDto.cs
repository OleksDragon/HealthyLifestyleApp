using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HealthyLifestyle.Application.DTOs.Payment
{
    /// <summary>
    /// DTO (Data Transfer Object) для створення динамічних одноразових оплат у Stripe.
    /// Використовується для таких сценаріїв, як:
    /// - оплата консультації фахівця;
    /// - покупка товару на маркетплейсі;
    /// - будь-який інший платіж, де сума визначається динамічно (а не через фіксований PriceId).
    /// </summary>
    public class DynamicPaymentDto
    {
        /// <summary>
        /// Назва продукту або послуги, яка відображатиметься в Stripe Checkout.
        /// Наприклад: "Консультація психолога", "План харчування", "Тренування онлайн".
        /// </summary>
        public string Name { get; set; } = string.Empty;

        /// <summary>
        /// Сума оплати (у валюті користувача).
        /// Наприклад: 49.99 або 100.
        /// У Stripe вона буде автоматично переведена у "центи" (4999, 10000).
        /// </summary>
        public decimal Amount { get; set; }

        /// <summary>
        /// Валюта платежу (ISO-код).
        /// За замовчуванням — "usd", але можна вказати "eur", "uah" тощо.
        /// </summary>
        public string Currency { get; set; } = "usd";

        /// <summary>
        /// Додаткові метадані, які передаються у Stripe разом із платіжною сесією.
        /// Використовується для передачі службової інформації, наприклад:
        /// {
        ///   "userId": "guid",
        ///   "specialistId": "guid",
        ///   "type": "consultation"
        /// }
        /// Ці дані можна потім обробити через Stripe Webhooks.
        /// </summary>
        public Dictionary<string, string>? Metadata { get; set; }
    }
}
