using HealthyLifestyle.Application.Services.Payment;
using Microsoft.AspNetCore.Mvc;
using HealthyLifestyle.Application.Services.Payment.Model;
using HealthyLifestyle.Application.DTOs.Payment;

namespace HealthyLifestyle.Api.Controllers
{
    /// <summary>
    /// Контролер для обробки Stripe-платежів.
    /// Підтримує створення підписок, разових оплат і майбутнє розширення.
    /// </summary>
    [ApiController]
    [Route("api/[controller]")]
    public class PaymentsController : ControllerBase
    {
        private readonly IPaymentService _paymentService;
        private readonly ILogger<PaymentsController> _logger;
        private readonly IConfiguration _configuration;

        public PaymentsController(IPaymentService paymentService, ILogger<PaymentsController> logger, IConfiguration configuration)
        {
            _paymentService = paymentService;
            _logger = logger;
            _configuration = configuration;
        }

        /// <summary>
        /// Створює Stripe Checkout-сесію.
        /// Приклад запиту з фронтенду:
        /// {
        ///   "priceId": "price_1SJIRiAJhBPBHq3pmjoHawoX",
        ///   "paymentType": "subscription",
        ///   "userId": "guid",
        ///   "metadata": { "section": "marketplace", "productId": "guid" }
        /// }
        /// </summary>
        [HttpPost("create-session")]
        public async Task<IActionResult> CreateSession([FromBody] PaymentRequest request)
        {
            if (string.IsNullOrEmpty(request.PriceId))
                return BadRequest("PriceId is required.");

            try
            {
                // Якщо передано cancelUrl - використовуємо його для redirect при скасуванні
                if (!string.IsNullOrEmpty(request.CancelUrl))
                {
                    // Додаємо returnUrl в metadata для додаткової безпеки
                    request.Metadata ??= new Dictionary<string, string>();
                    request.Metadata["returnUrl"] = request.CancelUrl;
                }

                var sessionUrl = await _paymentService.CreateSessionAsync(request);
                return Ok(new { url = sessionUrl });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating Stripe session");
                return StatusCode(500, "Error creating Stripe session");
            }
        }

        /// <summary>
        /// Створює динамічний одноразовий платіж (наприклад, консультація або товар).
        /// Приклад тіла запиту:
        /// {
        ///   "name": "Консультація психолога",
        ///   "amount": 49.99,
        ///   "currency": "usd",
        ///   "metadata": { "specialistId": "guid", "userId": "guid" }
        /// }
        /// </summary>
        [HttpPost("create-dynamic-payment")]
        public async Task<IActionResult> CreateDynamicPayment([FromBody] DynamicPaymentDto dto)
        {
            try
            {
                var url = await _paymentService.CreateDynamicPaymentAsync(
                    dto.Name,
                    dto.Amount,
                    dto.Currency,
                    dto.Metadata);

                return Ok(new { url });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating dynamic payment");
                return StatusCode(500, "Error creating dynamic payment");
            }
        }

    }
}
