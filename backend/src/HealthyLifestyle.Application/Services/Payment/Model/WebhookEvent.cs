using Stripe;

namespace HealthyLifestyle.Application.Services.Payment.Model
{
    /// <summary>
    /// Модель для обробки подій від Stripe Webhook
    /// </summary>
    public class WebhookEvent
    {
        public string Type { get; set; } = string.Empty;
        public Event StripeEvent { get; set; } = null!;
        public DateTime ProcessedAt { get; set; } = DateTime.UtcNow;
    }
}