using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HealthyLifestyle.Application.Interfaces.Payment;
using HealthyLifestyle.Application.Services.Payment.Model;
using Microsoft.Extensions.Logging;

namespace HealthyLifestyle.Application.Services.Payments
{
    /// <summary>
    /// Сервіс для обробки Stripe Webhook подій
    /// Головний координатор, який маршрутизує події до відповідних обробників
    /// </summary>
    public class WebhookProcessingService
    {
        private readonly IEnumerable<IWebhookHandler> _handlers;
        private readonly ILogger<WebhookProcessingService> _logger;

        /// <summary>
        /// Конструктор з Dependency Injection
        /// </summary>
        /// <param name="handlers">Колекція всіх зареєстрованих обробників вебхуків</param>
        /// <param name="logger">Логер для відстеження процесу обробки</param>
        public WebhookProcessingService(
            IEnumerable<IWebhookHandler> handlers,
            ILogger<WebhookProcessingService> logger)
        {
            _handlers = handlers;
            _logger = logger;
        }

        /// <summary>
        /// Головний метод обробки вхідної події від Stripe
        /// Виконує наступні кроки:
        /// 1. Знаходить всі обробники, які можуть обробити цей тип події
        /// 2. Послідовно викликає кожен підходящий обробник
        /// 3. Агрегує результати всіх обробників
        /// 4. Логує весь процес для налагодження
        /// </summary>
        /// <param name="webhookEvent">Об'єкт вебхук-події від Stripe</param>
        /// <returns>
        /// True - якщо всі обробники успішно обробили подію
        /// False - якщо жоден обробник не знайдений або виникли помилки
        /// </returns>
        /// <example>
        /// // Приклад використання:
        /// var result = await ProcessWebhookEventAsync(new WebhookEvent 
        /// { 
        ///     Type = "checkout.session.completed",
        ///     StripeEvent = stripeEvent
        /// });
        /// </example>
        public async Task<bool> ProcessWebhookEventAsync(WebhookEvent webhookEvent)
        {
            try
            {
                // Логуємо початок обробки події для відстеження в системі
                _logger.LogInformation("Processing Stripe webhook: {EventType}", webhookEvent.Type);

                // КРОК 1: Пошук підходящих обробників
                // Використовуємо поліморфізм - кожен обробник сам визначає, чи може він обробити подію
                var supportedHandlers = _handlers.Where(h => h.CanHandle(webhookEvent.Type)).ToList();

                // Якщо обробників не знайдено - логуємо попередження
                if (!supportedHandlers.Any())
                {
                    _logger.LogWarning("No handlers found for event type: {EventType}", webhookEvent.Type);
                    return false;
                }

                _logger.LogInformation("Found {HandlerCount} handlers for event type: {EventType}",
                    supportedHandlers.Count, webhookEvent.Type);

                // КРОК 2: Послідовна обробка події всіма знайденими обробниками
                var results = new List<bool>();
                foreach (var handler in supportedHandlers)
                {
                    try
                    {
                        // Викликаємо обробник для поточної події
                        var result = await handler.HandleWebhookEventAsync(webhookEvent);
                        results.Add(result);

                        // Детально логуємо результат роботи кожного обробника
                        _logger.LogInformation("Handler {HandlerType} processed event {EventType} with result: {Result}",
                            handler.GetType().Name, webhookEvent.Type, result);
                    }
                    catch (Exception ex)
                    {
                        // ВАЖЛИВО: Обробка помилок окремого обробника не зупиняє роботу інших
                        // Кожен обробник працює ізольовано
                        _logger.LogError(ex, "Handler {HandlerType} failed to process event {EventType}",
                            handler.GetType().Name, webhookEvent.Type);
                        results.Add(false);
                    }
                }

                // КРОК 3: Агрегація результатів
                // Подія вважається успішно обробленою, якщо ВСІ обробники повернули true
                bool finalResult = results.All(r => r);

                _logger.LogInformation("Webhook event {EventType} processing completed. Final result: {FinalResult}",
                    webhookEvent.Type, finalResult);

                return finalResult;
            }
            catch (Exception ex)
            {
                // Глобальна обробка помилок - виникає лише при критичних збоях
                _logger.LogError(ex, "Failed to process webhook event: {EventType}", webhookEvent.Type);
                return false;
            }
        }
    }
}