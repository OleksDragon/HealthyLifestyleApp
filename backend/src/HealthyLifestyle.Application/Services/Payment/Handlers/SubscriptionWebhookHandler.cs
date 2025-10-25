using HealthyLifestyle.Application.DTOs.APInfoBlock;
using HealthyLifestyle.Application.DTOs.Subscription;
using HealthyLifestyle.Application.Interfaces.APInfoBlock;
using HealthyLifestyle.Application.Interfaces.Email;
using HealthyLifestyle.Application.Interfaces.Payment;
using HealthyLifestyle.Application.Interfaces.Subscription;
using HealthyLifestyle.Application.Services.Payment.Model;
using HealthyLifestyle.Core.Entities;
using HealthyLifestyle.Core.Enums;
using HealthyLifestyle.Core.Interfaces.SubscriptionIR;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Logging;
using Stripe;
using Stripe.Checkout;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;

namespace HealthyLifestyle.Application.Services.Payments.Handlers
{
    public class SubscriptionWebhookHandler : IWebhookHandler
    {
        private readonly ILogger<SubscriptionWebhookHandler> _logger;
        private readonly ISubscriptionService _subscriptionService;
        private readonly ISubscriptionRepository _subscriptionRepository;
        private readonly IEmailService _emailService;
        private readonly UserManager<User> _userManager;
        private readonly IPurchaseService _purchaseService;

        public SubscriptionWebhookHandler(
            ILogger<SubscriptionWebhookHandler> logger,
            ISubscriptionService subscriptionService,
            ISubscriptionRepository subscriptionRepository,
            IEmailService emailService,
            UserManager<User> userManager,
            IPurchaseService purchaseService)
        {
            _logger = logger;
            _subscriptionService = subscriptionService;
            _subscriptionRepository = subscriptionRepository;
            _emailService = emailService ?? throw new ArgumentNullException(nameof(emailService));
            _userManager = userManager ?? throw new ArgumentNullException(nameof(userManager));
            _purchaseService = purchaseService ?? throw new ArgumentNullException(nameof(purchaseService));
        }

        /// <summary>
        /// Визначає, чи може цей обробник обробляти вказаний тип вебхук-події
        /// </summary>
        /// <param name="eventType">Тип події від Stripe</param>
        /// <returns>True, якщо обробник підтримує цей тип події</returns>
        public bool CanHandle(string eventType)
        {
            return eventType == "checkout.session.completed" ||
                   eventType == "invoice.payment_succeeded";
        }

        /// <summary>
        /// Головний метод обробки вебхук-подій від Stripe
        /// </summary>
        /// <param name="webhookEvent">Об'єкт вебхук-події</param>
        /// <returns>True, якщо подія успішно оброблена</returns>
        public async Task<bool> HandleWebhookEventAsync(WebhookEvent webhookEvent)
        {
            try
            {
                switch (webhookEvent.Type)
                {
                    case "checkout.session.completed":
                        return await HandleCheckoutSessionCompleted(webhookEvent.StripeEvent);
                    case "invoice.payment_succeeded":
                        return await HandleInvoicePaymentSucceeded(webhookEvent.StripeEvent);
                    default:
                        return false;
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error handling subscription webhook event: {EventType}", webhookEvent.Type);
                return false;
            }
        }

        /// <summary>
        /// Обробляє подію успішного завершення checkout сесії (перша покупка підписки)
        /// </summary>
        /// <param name="stripeEvent">Подія від Stripe</param>
        /// <returns>True, якщо обробка пройшла успішно</returns>
        private async Task<bool> HandleCheckoutSessionCompleted(Event stripeEvent)
        {
            var session = stripeEvent.Data.Object as Session;

            // Перевіряємо, чи це подія для розділу підписок (щоб уникнути обробки інших типів платежів)
            if (session?.Metadata?.ContainsKey("section") == true &&
                session.Metadata["section"] == "subscriptions")
            {
                _logger.LogInformation("Processing subscription checkout for session: {SessionId}", session.Id);

                try
                {
                    // Отримуємо повну інформацію про сесію, включаючи дані підписки
                    var sessionService = new SessionService();
                    var fullSession = await sessionService.GetAsync(session.Id,
                        new SessionGetOptions { Expand = new List<string> { "subscription" } });

                    // Перевіряємо наявність ID підписки
                    if (string.IsNullOrEmpty(fullSession.SubscriptionId))
                    {
                        _logger.LogError("Subscription ID not found in session: {SessionId}", session.Id);
                        return false;
                    }

                    // Отримуємо ID користувача з метаданих
                    if (!session.Metadata.ContainsKey("userId") ||
                        !Guid.TryParse(session.Metadata["userId"], out Guid userId))
                    {
                        _logger.LogError("User ID not found in metadata for session: {SessionId}", session.Id);
                        return false;
                    }

                    // Знаходимо користувача та отримуємо його email
                    var user = await _userManager.FindByIdAsync(userId.ToString());
                    var userEmail = user?.Email;
                    if (string.IsNullOrEmpty(userEmail))
                    {
                        _logger.LogWarning("User email not found for user ID: {UserId}", userId);
                    }

                    // Визначаємо тип підписки з метаданих (basic, premium, family)
                    var planType = session.Metadata.ContainsKey("plan")
                        ? session.Metadata["plan"]
                        : "basic";

                    var subscriptionType = MapPlanToSubscriptionType(planType);
                    var price = GetSubscriptionPrice(planType);
                    var subscriptionTypeName = GetSubscriptionTypeName(subscriptionType);

                    // Перевіряємо, чи в користувача вже є активна підписка
                    var existingSubscription = await _subscriptionRepository.GetActiveSubscriptionByUserIdAsync(userId);
                    bool isNewSubscription = existingSubscription == null;

                    DateTime periodStart = DateTime.UtcNow;
                    DateTime periodEnd = DateTime.UtcNow.AddDays(30);

                    if (existingSubscription != null)
                    {
                        // ОНОВЛЕННЯ: Оновлюємо існуючу підписку
                        var updateDto = new SubscriptionUpdateDto
                        {
                            Type = subscriptionType,
                            StartDate = existingSubscription.StartDate,
                            EndDate = periodEnd, // Продовжуємо на 30 днів
                            Price = price,
                            Status = SubscriptionStatus.Active,
                            StripeSubscriptionId = fullSession.SubscriptionId
                        };

                        await _subscriptionService.UpdateSubscriptionAsync(existingSubscription.Id, updateDto);
                    }
                    else
                    {
                        // СТВОРЕННЯ: Створюємо нову підписку
                        var createDto = new SubscriptionCreateDto
                        {
                            UserId = userId,
                            Type = subscriptionType,
                            EndDate = periodEnd, // Активна 30 днів
                            Price = price,
                            StripeSubscriptionId = fullSession.SubscriptionId
                        };

                        await _subscriptionService.CreateSubscriptionAsync(createDto);
                    }

                    // Створення запису про покупку
                    await CreatePurchaseRecordAsync(
                        userId: userId,
                        subscriptionType: subscriptionType,
                        subscriptionTypeName: subscriptionTypeName,
                        price: price,
                        periodStart: periodStart,
                        periodEnd: periodEnd,
                        isRenewal: !isNewSubscription,
                        orderNumber: $"SUB-{session.Id.Substring(0, 8).ToUpper()}",
                        stripeSessionId: session.Id
                    );

                    // Визначаємо, чи потрібно відправляти стандартний лист про успішну оплату
                    bool shouldSendSuccessEmail = true;

                    // Спеціальна обробка для сімейної підписки
                    if (subscriptionType == SubscriptionType.Family &&
                        session.Metadata.ContainsKey("familyEmails"))
                    {
                        // Обробляємо членів сім'ї та відправляємо спеціальні листи
                        await HandleFamilyMembers(userId, session.Metadata["familyEmails"], userEmail);
                        // Для сімейної підписки не відправляємо стандартний лист
                        shouldSendSuccessEmail = false;
                    }

                    // Відправляємо лист про успішну оплату (тільки для НЕ сімейних підписок)
                    if (!string.IsNullOrEmpty(userEmail) && shouldSendSuccessEmail)
                    {
                        try
                        {
                            var emailHtml = CreateSuccessPaymentEmail(subscriptionTypeName, price, isNewSubscription);
                            await _emailService.SendEmailAsync(userEmail, "✅ Успішна оплата підписки", emailHtml);
                        }
                        catch (Exception emailEx)
                        {
                            _logger.LogError(emailEx, "Failed to send success email to user {UserId}", userId);
                        }
                    }

                    return true;
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "Failed to process subscription from Stripe session: {SessionId}", session.Id);
                    return false;
                }
            }
            else
            {
                // Ігноруємо події, які не стосуються підписок
                return false;
            }
        }

        /// <summary>
        /// Обробляє подію успішної оплати інвойсу (автоматичне продовження підписки)
        /// </summary>
        /// <param name="stripeEvent">Подія від Stripe</param>
        /// <returns>True, якщо обробка пройшла успішно</returns>
        private async Task<bool> HandleInvoicePaymentSucceeded(Event stripeEvent)
        {
            var invoice = stripeEvent.Data.Object as Invoice;

            if (invoice == null)
            {
                return false;
            }

            string subscriptionId = null;

            // Отримуємо ID підписки з динамічного об'єкта інвойсу
            dynamic dynamicInvoice = stripeEvent.Data.Object;
            try
            {
                subscriptionId = dynamicInvoice.subscription?.ToString() ?? dynamicInvoice.subscription_id?.ToString();
            }
            catch (Exception ex)
            {
                _logger.LogWarning("Failed to get subscription ID from dynamic object: {Error}", ex.Message);
            }

            if (string.IsNullOrEmpty(subscriptionId))
            {
                return false;
            }

            try
            {
                // Знаходимо підписку в нашій базі даних за Stripe subscription ID
                var subscription = await _subscriptionRepository.GetByStripeSubscriptionIdAsync(subscriptionId);
                if (subscription != null)
                {
                    DateTime periodStart = DateTime.UtcNow;
                    DateTime periodEnd = DateTime.UtcNow.AddDays(30);

                    // Оновлюємо підписку - продовжуємо на 30 днів
                    var updateDto = new SubscriptionUpdateDto
                    {
                        Type = subscription.Type,
                        StartDate = subscription.StartDate,
                        EndDate = periodEnd, // Продовження на 30 днів
                        Price = subscription.Price,
                        Status = SubscriptionStatus.Active,
                        StripeSubscriptionId = subscription.StripeSubscriptionId
                    };

                    await _subscriptionService.UpdateSubscriptionAsync(subscription.Id, updateDto);

                    // Створення запису про автоматичне продовження
                    await CreatePurchaseRecordAsync(
                        userId: subscription.UserId,
                        subscriptionType: subscription.Type,
                        subscriptionTypeName: GetSubscriptionTypeName(subscription.Type),
                        price: subscription.Price,
                        periodStart: periodStart,
                        periodEnd: periodEnd,
                        isRenewal: true,
                        orderNumber: $"RENEW-{DateTime.UtcNow:yyyyMMdd}-{subscriptionId.Substring(0, 8).ToUpper()}",
                        stripeSessionId: null
                    );

                    // Отримуємо email користувача для відправки повідомлення
                    var user = await _userManager.FindByIdAsync(subscription.UserId.ToString());
                    var userEmail = user?.Email;

                    if (!string.IsNullOrEmpty(userEmail))
                    {
                        try
                        {
                            var subscriptionTypeName = GetSubscriptionTypeName(subscription.Type);
                            var emailHtml = CreateRenewalPaymentEmail(subscriptionTypeName, subscription.Price, updateDto.EndDate);
                            await _emailService.SendEmailAsync(userEmail, "🔄 Підписку продовжено", emailHtml);
                        }
                        catch (Exception emailEx)
                        {
                            _logger.LogError(emailEx, "Failed to send renewal email to user {UserId}", subscription.UserId);
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Failed to extend subscription for Stripe subscription: {StripeSubscriptionId}", subscriptionId);
            }

            return true;
        }

        /// <summary>
        /// Створює запис про покупку підписки
        /// </summary>
        private async Task CreatePurchaseRecordAsync(
            Guid userId,
            SubscriptionType subscriptionType,
            string subscriptionTypeName,
            decimal price,
            DateTime periodStart,
            DateTime periodEnd,
            bool isRenewal,
            string orderNumber,
            string stripeSessionId)
        {
            try
            {
                var purchaseCreateDto = new PurchaseCreateDto
                {
                    UserId = userId,
                    Title = isRenewal ? $"Продовження {subscriptionTypeName} підписки" : $"Оформлення {subscriptionTypeName} підписки",
                    PurchaseDate = DateTime.UtcNow,
                    Amount = price,
                    OrderNumber = orderNumber,
                    ProductName = $"{subscriptionTypeName} підписка на 30 днів",
                    Status = PurchaseStatus.Active,
                    ProductType = ProductType.Subscription,
                    Icon = AP_Icon.smile,
                    TrackingNumber = null,
                    DeliveryDate = null,
                    PeriodStart = periodStart,
                    PeriodEnd = periodEnd
                };

                await _purchaseService.CreatePurchaseAsync(purchaseCreateDto);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Failed to create purchase record for user {UserId}", userId);
                // Не викидаємо виняток далі, щоб не порушити основний потік обробки підписки
            }
        }

        /// <summary>
        /// Обробляє додавання членів сім'ї для сімейної підписки
        /// </summary>
        /// <param name="userId">ID користувача, який оформив підписку</param>
        /// <param name="familyEmails">Список email членів сім'ї (JSON або через кому)</param>
        /// <param name="mainUserEmail">Email основного користувача (опціонально)</param>
        private async Task HandleFamilyMembers(Guid userId, string familyEmails, string mainUserEmail = null)
        {
            try
            {
                List<string> emails;

                // Парсимо список email - підтримуємо JSON формат та простий список через кому
                if (!string.IsNullOrWhiteSpace(familyEmails) && familyEmails.Trim().StartsWith("["))
                {
                    try
                    {
                        // Спроба парсингу JSON
                        emails = JsonSerializer.Deserialize<List<string>>(familyEmails) ?? new List<string>();
                    }
                    catch
                    {
                        // Fallback: парсинг як CSV
                        emails = familyEmails.Split(',', StringSplitOptions.RemoveEmptyEntries)
                            .Select(e => e.Trim().Trim('"')).Distinct().ToList();
                    }
                }
                else
                {
                    // Парсинг як CSV
                    emails = familyEmails.Split(',', StringSplitOptions.RemoveEmptyEntries)
                        .Select(e => e.Trim().Trim('"')).Distinct().ToList();
                }

                if (!emails.Any())
                {
                    return;
                }

                // Перевіряємо, чи дійсно це сімейна підписка
                var subscription = await _subscriptionRepository.GetActiveSubscriptionByUserIdAsync(userId);
                if (subscription == null || subscription.Type != SubscriptionType.Family)
                {
                    return;
                }

                // Оновлюємо список членів сім'ї в базі даних
                await _subscriptionService.UpdateFamilyMembersAsync(subscription.Id, emails);

                // Відправляємо підтвердження власнику сімейної підписки
                if (!string.IsNullOrEmpty(mainUserEmail))
                {
                    try
                    {
                        var ownerEmailHtml = CreateFamilyOwnerEmail(emails.Count);
                        await _emailService.SendEmailAsync(mainUserEmail, "👨‍👩‍👧‍👦 Ваша сімейна підписка активна", ownerEmailHtml);
                    }
                    catch (Exception emailEx)
                    {
                        _logger.LogError(emailEx, "Failed to send family confirmation to main user {UserId}", userId);
                    }
                }

                // Відправляємо запрошення всім членам сім'ї
                foreach (var email in emails)
                {
                    try
                    {
                        var familyInviteHtml = CreateFamilyInviteEmail();
                        await _emailService.SendEmailAsync(email, "👨‍👩‍👧‍👦 Запрошення до сімейної підписки", familyInviteHtml);
                    }
                    catch (Exception emailEx)
                    {
                        _logger.LogError(emailEx, "Failed to send family invite to: {Email}", email);
                    }
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Failed to handle family members for user {UserId}", userId);
            }
        }

        private SubscriptionType MapPlanToSubscriptionType(string plan)
        {
            return plan.ToLower() switch
            {
                "basic" => SubscriptionType.Basic,
                "premium" => SubscriptionType.Premium,
                "family" => SubscriptionType.Family,
                _ => SubscriptionType.Basic
            };
        }

        private decimal GetSubscriptionPrice(string planType)
        {
            return planType.ToLower() switch
            {
                "basic" => 5.00m,
                "premium" => 15.00m,
                "family" => 25.00m,
                _ => 5.00m
            };
        }

        private string GetSubscriptionTypeName(SubscriptionType type)
        {
            return type switch
            {
                SubscriptionType.Basic => "Базовий",
                SubscriptionType.Premium => "Преміум",
                SubscriptionType.Family => "Сімейний",
                _ => "Базовий"
            };
        }

        private string CreateFamilyOwnerEmail(int familyMembersCount)
        {
            return $@"
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset='utf-8'>
                <style>
                    body {{ font-family: Arial, sans-serif; line-height: 1.6; color: #333; }}
                    .container {{ max-width: 600px; margin: 0 auto; padding: 20px; }}
                    .header {{ background: linear-gradient(135deg, #ff6b6b 0%, #ffa726 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }}
                    .content {{ background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }}
                    .family-icon {{ font-size: 48px; margin-bottom: 20px; }}
                    .details {{ background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }}
                    .footer {{ text-align: center; margin-top: 30px; color: #666; font-size: 14px; }}
                </style>
            </head>
            <body>
                <div class='container'>
                    <div class='header'>
                        <div class='family-icon'>👨‍👩‍👧‍👦</div>
                        <h1>Сімейна підписка активна</h1>
                    </div>
                    <div class='content'>
                        <p>Вітаємо! Ваша сімейна підписка успішно активована.</p>
                        
                        <div class='details'>
                            <h3>Деталі підписки:</h3>
                            <p><strong>Тип підписки:</strong> Сімейний</p>
                            <p><strong>Сума оплати:</strong> $25.00</p>
                            <p><strong>Кількість запрошених:</strong> {familyMembersCount}</p>
                            <p><strong>Дата активації:</strong> {DateTime.UtcNow:dd.MM.yyyy}</p>
                            <p><strong>Дійсна до:</strong> {DateTime.UtcNow.AddDays(30):dd.MM.yyyy}</p>
                        </div>

                        <p>Запрошення надіслано всім вказаним членам сім'ї. Вони отримають доступ до всіх функцій програми!</p>
                        
                        <div class='footer'>
                            <p>З повагою,<br>Команда Nomyfy Team</p>
                        </div>
                    </div>
                </div>
            </body>
            </html>";
        }

        private string CreateSuccessPaymentEmail(string subscriptionType, decimal price, bool isNewSubscription)
        {
            var action = isNewSubscription ? "оформлено" : "оновлено";

            return $@"
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset='utf-8'>
                <style>
                    body {{ font-family: Arial, sans-serif; line-height: 1.6; color: #333; }}
                    .container {{ max-width: 600px; margin: 0 auto; padding: 20px; }}
                    .header {{ background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }}
                    .content {{ background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }}
                    .success-icon {{ font-size: 48px; margin-bottom: 20px; }}
                    .details {{ background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }}
                    .footer {{ text-align: center; margin-top: 30px; color: #666; font-size: 14px; }}
                </style>
            </head>
            <body>
                <div class='container'>
                    <div class='header'>
                        <div class='success-icon'>✅</div>
                        <h1>Успішна оплата</h1>
                    </div>
                    <div class='content'>
                        <p>Вітаємо! Вашу підписку успішно {action}.</p>
                        
                        <div class='details'>
                            <h3>Деталі підписки:</h3>
                            <p><strong>Тип підписки:</strong> {subscriptionType}</p>
                            <p><strong>Сума оплати:</strong> ${price}</p>
                            <p><strong>Дата активації:</strong> {DateTime.UtcNow:dd.MM.yyyy}</p>
                            <p><strong>Дійсна до:</strong> {DateTime.UtcNow.AddDays(30):dd.MM.yyyy}</p>
                        </div>

                        <p>Дякуємо, що обираєте наш сервіс! 🎉</p>
                        
                        <div class='footer'>
                            <p>З повагою,<br>Команда Nomyfy Team</p>
                        </div>
                    </div>
                </div>
            </body>
            </html>";
        }

        private string CreateRenewalPaymentEmail(string subscriptionType, decimal price, DateTime endDate)
        {
            return $@"
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset='utf-8'>
                <style>
                    body {{ font-family: Arial, sans-serif; line-height: 1.6; color: #333; }}
                    .container {{ max-width: 600px; margin: 0 auto; padding: 20px; }}
                    .header {{ background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }}
                    .content {{ background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }}
                    .renewal-icon {{ font-size: 48px; margin-bottom: 20px; }}
                    .details {{ background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }}
                    .footer {{ text-align: center; margin-top: 30px; color: #666; font-size: 14px; }}
                </style>
            </head>
            <body>
                <div class='container'>
                    <div class='header'>
                        <div class='renewal-icon'>🔄</div>
                        <h1>Підписку продовжено</h1>
                    </div>
                    <div class='content'>
                        <p>Вашу підписку успішно продовжено на наступний місяць.</p>
                        
                        <div class='details'>
                            <h3>Деталі продовження:</h3>
                            <p><strong>Тип підписки:</strong> {subscriptionType}</p>
                            <p><strong>Сума оплати:</strong> ${price}</p>
                            <p><strong>Нова дата завершення:</strong> {endDate:dd.MM.yyyy}</p>
                        </div>

                        <p>Дякуємо за продовження співпраці! ✨</p>
                        
                        <div class='footer'>
                            <p>З повагою,<br>Команда Nomyfy Team</p>
                        </div>
                    </div>
                </div>
            </body>
            </html>";
        }

        private string CreateFamilyInviteEmail()
        {
            return $@"
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset='utf-8'>
                <style>
                    body {{ font-family: Arial, sans-serif; line-height: 1.6; color: #333; }}
                    .container {{ max-width: 600px; margin: 0 auto; padding: 20px; }}
                    .header {{ background: linear-gradient(135deg, #ff6b6b 0%, #ffa726 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }}
                    .content {{ background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }}
                    .family-icon {{ font-size: 48px; margin-bottom: 20px; }}
                    .details {{ background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }}
                    .footer {{ text-align: center; margin-top: 30px; color: #666; font-size: 14px; }}
                </style>
            </head>
            <body>
                <div class='container'>
                    <div class='header'>
                        <div class='family-icon'>👨‍👩‍👧‍👦</div>
                        <h1>Запрошення до сімейної підписки</h1>
                    </div>
                    <div class='content'>
                        <p>Вас запросили до сімейної підписки Healthy Lifestyle!</p>
                        
                        <div class='details'>
                            <h3>Що це означає для вас:</h3>
                            <p>• Повний доступ до всіх функцій програми</p>
                            <p>• Можливість відстежувати свої досягнення</p>
                            <p>• Доступ до преміум-контенту</p>
                            <p>• Сімейна підтримка та мотивація</p>
                        </div>

                        <p>Скористайтеся додатком, щоб розпочати свою подорож до здорового способу життя! 🌱</p>
                        
                        <div class='footer'>
                            <p>З повагою,<br>Команда Nomyfy Team</p>
                        </div>
                    </div>
                </div>
            </body>
            </html>";
        }
    }
}