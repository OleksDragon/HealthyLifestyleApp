using HealthyLifestyle.Application.Services.Payment.Model;
using Microsoft.Extensions.Configuration;
using Stripe;
using Stripe.Checkout;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace HealthyLifestyle.Application.Services.Payments
{
    /// <summary>
    /// Сервіс для роботи з Stripe: створення сесій оплати, підписок, тощо.
    /// Використовується як універсальний платіжний модуль для всіх підрозділів команди.
    /// </summary>
    public class PaymentService : IPaymentService
    {
        private readonly string _secretKey;
        private readonly string _successUrl;
        private readonly string _cancelUrl;

        public PaymentService(IConfiguration config)
        {
            _secretKey = config["Stripe:SecretKey"]
                ?? throw new ArgumentNullException("Stripe Secret Key not configured");

            _successUrl = config["Stripe:SuccessUrl"]
                ?? throw new ArgumentNullException("Stripe Success URL not configured");

            _cancelUrl = config["Stripe:CancelUrl"]
                ?? throw new ArgumentNullException("Stripe Cancel URL not configured");
        }

        /// <summary>
        /// Створює платіжну сесію для Stripe Checkout.
        /// Викликається з будь-якого модуля (наприклад, підписки або маркетплейсу).
        /// </summary>
        public async Task<string> CreateSessionAsync(PaymentRequest request)
        {
            StripeConfiguration.ApiKey = _secretKey;

            // Якщо PaymentType не вказано — вважаємо одноразовим платежем
            var mode = string.IsNullOrWhiteSpace(request.PaymentType)
                ? "payment"
                : request.PaymentType;

            var options = new SessionCreateOptions
            {
                LineItems = new List<SessionLineItemOptions>
                {
                    new SessionLineItemOptions
                    {
                        Price = request.PriceId,
                        Quantity = 1
                    }
                },
                Mode = mode,
                SuccessUrl = _successUrl,
                CancelUrl = _cancelUrl,
                Metadata = request.Metadata ?? new Dictionary<string, string>()
            };

            var service = new SessionService();
            var session = await service.CreateAsync(options);

            return session.Url;
        }

        /// <summary>
        /// Універсальний метод для створення одноразового платежу в Stripe.
        /// Використовується, коли ціна динамічна (наприклад, маркетплейс, консультації, магазин).
        /// </summary>
        /// <param name="name">Назва продукту (наприклад, "Консультація психолога")</param>
        /// <param name="amount">Сума у валюті користувача (наприклад, 49.99)</param>
        /// <param name="currency">Код валюти (наприклад, "usd", "eur", "uah")</param>
        /// <param name="metadata">
        /// Додаткові метадані (наприклад, productId, category, userId).
        /// Зберігаються у Stripe і доступні у вебхуках.
        /// </param>
        /// <returns>
        /// URL для перенаправлення користувача на Stripe Checkout.
        /// </returns>
        public async Task<string> CreateDynamicPaymentAsync(
            string name,
            decimal amount,
            string currency,
            Dictionary<string, string>? metadata = null)
        {
            // Підключення API ключа з конфігурації
            StripeConfiguration.ApiKey = _secretKey;

            // Створюємо продукт у Stripe (він буде відображатися в панелі)
            var productService = new ProductService();
            var product = await productService.CreateAsync(new ProductCreateOptions
            {
                Name = name
            });

            // Створюємо ціну для цього продукту (у центах, як вимагає Stripe)
            var priceService = new PriceService();
            var price = await priceService.CreateAsync(new PriceCreateOptions
            {
                UnitAmount = (long)(amount * 100), // конвертація в центи
                Currency = currency,
                Product = product.Id
            });

            // Формуємо запит до основного методу створення сесії
            var request = new PaymentRequest
            {
                PriceId = price.Id,
                PaymentType = "payment", // одноразова оплата
                Metadata = metadata
            };

            // Викликаємо існуючий метод, який створює checkout-сесію
            return await CreateSessionAsync(request);
        }

    }
}
