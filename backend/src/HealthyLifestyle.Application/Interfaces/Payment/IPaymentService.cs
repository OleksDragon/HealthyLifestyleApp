using System.Threading.Tasks;
using HealthyLifestyle.Application.Services.Payment.Model;

namespace HealthyLifestyle.Application.Services.Payments
{
    /// <summary>
    /// Інтерфейс для роботи з оплатами Stripe.
    /// Дозволяє створювати платіжні сесії, надалі можна розширити для:
    ///  - перевірки статусу оплати
    ///  - скасування підписки
    ///  - webhook-ів
    /// </summary>
    public interface IPaymentService
    {
        /// <summary>
        /// Створює сесію Stripe для оплати або підписки.
        /// Повертає URL для переадресації користувача.
        /// </summary>
        Task<string> CreateSessionAsync(PaymentRequest request);

        /// <summary>
        /// Універсальний метод для створення одноразового платежу в Stripe.
        /// Використовується, коли ціна динамічна (наприклад, маркетплейс, консультації, магазин).
        /// Детальніше дивись в сервісі
        /// </summary>
        Task<string> CreateDynamicPaymentAsync(
            string name,
            decimal amount,
            string currency,
            Dictionary<string, string>? metadata = null);
    }
}
