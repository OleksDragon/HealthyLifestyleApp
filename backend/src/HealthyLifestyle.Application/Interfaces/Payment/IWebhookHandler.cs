using System.Threading.Tasks;
using HealthyLifestyle.Application.Services.Payment.Model;

namespace HealthyLifestyle.Application.Interfaces.Payment
{
    /// <summary>
    /// Інтерфейс для обробки Stripe Webhook подій
    /// </summary>
    public interface IWebhookHandler
    {
        /// <summary>
        /// Обробляє події від Stripe Webhook
        /// </summary>
        Task<bool> HandleWebhookEventAsync(WebhookEvent webhookEvent);

        /// <summary>
        /// Перевіряє чи підтримується тип події
        /// </summary>
        bool CanHandle(string eventType);
    }
}