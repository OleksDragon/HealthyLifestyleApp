using System.IO;
using System.Threading.Tasks;
using HealthyLifestyle.Application.Services.Payments;
using HealthyLifestyle.Application.Services.Payment.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Stripe;

namespace HealthyLifestyle.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class WebhookController : ControllerBase
    {
        private readonly WebhookProcessingService _webhookProcessingService;
        private readonly IConfiguration _configuration;
        private readonly ILogger<WebhookController> _logger;

        /// <summary>
        /// Конструктор контролера для обробки Stripe вебхуків
        /// </summary>
        public WebhookController(
            WebhookProcessingService webhookProcessingService,
            IConfiguration configuration,
            ILogger<WebhookController> logger)
        {
            _webhookProcessingService = webhookProcessingService;
            _configuration = configuration;
            _logger = logger;
        }

        /// <summary>
        /// Кінцева точка для отримання вебхуків від Stripe
        /// Важливо: Цей endpoint НЕ повинен вимагати аутентифікації
        /// </summary>
        /// <returns>
        /// Завжди повертає 200 OK для Stripe, навіть при помилках обробки
        /// </returns>
        /// <remarks>
        /// Stripe очікує, що вебхук endpoint завжди повертає 2xx статус.
        /// Якщо повертається 4xx/5xx, Stripe буде повторно відправляти подію.
        /// </remarks>
        [HttpPost]
        public async Task<IActionResult> HandleWebhook()
        {
            // КРОК 1: Читання тіла запиту
            // Важливо читати тіло як RAW JSON, не використовуючи model binding
            var json = await new StreamReader(HttpContext.Request.Body).ReadToEndAsync();

            try
            {
                // КРОК 2: Перевірка підпису для безпеки
                var stripeSignature = Request.Headers["Stripe-Signature"];
                var webhookSecret = _configuration["Stripe:WebhookSecret"];

                // Перевірка наявності підпису
                if (string.IsNullOrEmpty(stripeSignature))
                {
                    _logger.LogWarning("Stripe-Signature header is missing");
                    return BadRequest("Stripe-Signature header is required");
                }

                // КРОК 3: Валідація підпису та парсинг події
                // Stripe підписує всі вебхуки - це запобігає спуфінгу
                var stripeEvent = EventUtility.ConstructEvent(
                    json, stripeSignature, webhookSecret);

                // КРОК 4: Створення об'єкта події для внутрішньої обробки
                var webhookEvent = new WebhookEvent
                {
                    Type = stripeEvent.Type,
                    StripeEvent = stripeEvent
                };

                _logger.LogInformation("Received Stripe webhook: {EventId} {EventType}",
                    stripeEvent.Id, stripeEvent.Type);

                // КРОК 5: Делегування обробки сервісу
                var result = await _webhookProcessingService.ProcessWebhookEventAsync(webhookEvent);

                // КРОК 6: Обробка результату
                if (result)
                {
                    _logger.LogInformation("Webhook processed successfully: {EventType}", stripeEvent.Type);
                    return Ok();
                }
                else
                {
                    // ВАЖЛИВО: Навіть при неуспішній обробці повертаємо 200
                    // Stripe інтерпретує 4xx/5xx як тимчасову помилку і повторює спробу
                    _logger.LogWarning("Webhook processing failed or not handled: {EventType}", stripeEvent.Type);
                    return Ok(); // Все одно повертаємо 200 для Stripe
                }
            }
            catch (StripeException ex)
            {
                // Помилка валідації підпису - можлива спроба атаки
                _logger.LogError(ex, "Stripe webhook signature verification failed");
                return BadRequest(); // Повертаємо 400 - невірний запит
            }
            catch (System.Exception ex)
            {
                // Внутрішня помилка сервера
                _logger.LogError(ex, "Error processing webhook");
                return StatusCode(500); // Повертаємо 500 тільки для критичних помилок
            }
        }
    }
}