using HealthyLifestyle.Application.DTOs.Shop;
using HealthyLifestyle.Application.Interfaces.Payment;
using HealthyLifestyle.Application.Interfaces.Shop;
using HealthyLifestyle.Application.Services.Payment.Model;
using HealthyLifestyle.Application.Services.Payments.Handlers;
using Microsoft.Extensions.Logging;
using Minio.DataModel.Notification;
using Stripe;
using Stripe.Checkout;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HealthyLifestyle.Application.Services.Payment.Handlers
{
    public class OrderWebhookHandler : IWebhookHandler
    {
        private readonly ILogger<OrderWebhookHandler> _logger;
        private readonly IOrderService _orderService;
        private readonly IShopCartService _cartService;

        public OrderWebhookHandler(ILogger<OrderWebhookHandler> logger, IOrderService orderService, IShopCartService cartService)
        {
            _logger = logger;
            _orderService = orderService;
            _cartService = cartService;
        }

        public bool CanHandle(string eventType)
        {
            return eventType == "checkout.session.completed";
        }

        public async Task<bool> HandleWebhookEventAsync(WebhookEvent webhookEvent)
        {
            try
            {
                if (webhookEvent.Type == "checkout.session.completed")
                {
                    return await HandleCheckoutSessionCompleted(webhookEvent.StripeEvent);
                }
                else
                {
                    return false;
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error handling subscription webhook event: {EventType}", webhookEvent.Type);
                return false;
            }
        }

        public async Task<bool> HandleCheckoutSessionCompleted(Event stripeEvent)
        {
            var session = stripeEvent.Data.Object as Session;

            if (session?.Metadata?.ContainsKey("section") == true &&
                session.Metadata["section"] == "marketplace")
            {
                _logger.LogInformation("Processing order...");

                try
                {
                    // Отримуємо інформацію про замовлення (попередньо ми зберігаємо його у базі)
                    if (session?.Metadata?.ContainsKey("orderId") == false)
                    {
                        return false;
                    }

                    var orderId = session?.Metadata["orderId"]!;
                    var orderDto = new OrderUpdateDto { OrderId = Guid.Parse(orderId), Status = Core.Enums.OrderStatus.Pending, ShippingAddress = null };
                    var ord = await _orderService.UpdateOrderStatusAndAddressAsync(Guid.Parse(orderId), orderDto);
                    if (ord != null)
                    {
                        await _cartService.ClearCartAsync(ord.UserId);
                        return true;
                    }
                }
                catch (Exception ex) 
                {
                    _logger.LogError(ex, "Failed to process order from Stripe session: {SessionId}", session.Id);
                    return false;
                }
            }

            return false;
        }
    }
}
