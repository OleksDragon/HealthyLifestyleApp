using HealthyLifestyle.Application.DTOs.Shop;
using HealthyLifestyle.Application.Interfaces.Shop;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace HealthyLifestyle.Api.Controllers.Shop
{
    /// <summary>
    /// Контролер для керування замовленнями.
    /// </summary>
    [ApiController]
    [Route("api/[controller]")]
    [Authorize] // Якщо всі методи потребують автентифікації
    public class OrdersController : ControllerBase
    {
        private readonly IOrderService _orderService;
        private readonly ILogger<OrdersController> _logger;

        // <summary>
        /// Ініціалізує новий екземпляр класу <see cref="OrdersController"/>.
        /// </summary>
        /// <param name="orderService">Сервіс для обробки операцій, пов’язаних із замовленнями.</param>
        /// <param name="logger">Логер для запису дій контролера та помилок.</param>
        /// <exception cref="ArgumentNullException">Викидається, якщо <paramref name="orderService"/> або <paramref name="logger"/> є null.</exception>
        public OrdersController(IOrderService orderService, ILogger<OrdersController> logger)
        {
            _orderService = orderService ?? throw new ArgumentNullException(nameof(orderService));
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
        }

        #region Приватні методи

        /// <summary>
        /// Отримує ідентифікатор користувача з клеймів поточного користувача.
        /// </summary>
        /// <returns>Guid, що представляє ідентифікатор користувача.</returns>
        /// <exception cref="UnauthorizedAccessException">Викидається, якщо клейм ідентифікатора користувача відсутній.</exception>
        /// <exception cref="InvalidOperationException">Викидається, якщо клейм ідентифікатора користувача має невірний формат.</exception>
        private Guid GetUserId()
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userIdClaim))
            {
                _logger.LogWarning("Клейм 'NameIdentifier' (User ID) не знайдено для поточного користувача.");
                throw new UnauthorizedAccessException("Ідентифікатор користувача не знайдено.");
            }

            if (!Guid.TryParse(userIdClaim, out var userId))
            {
                _logger.LogError("Невірний формат ідентифікатора користувача '{UserIdClaim}'.", userIdClaim);
                throw new InvalidOperationException("Ідентифікатор користувача має невірний формат.");
            }
            return userId;
        }

        #endregion

        #region Публічні методи API

        /// <summary>
        /// Створює нове замовлення для автентифікованого користувача.
        /// </summary>
        /// <param name="orderCreateDto">Об’єкт передачі даних із деталями створення замовлення.</param>
        /// <returns>Створений об’єкт замовлення у вигляді DTO.</returns>
        /// <response code="201">Замовлення успішно створено, повертається DTO замовлення.</response>
        /// <response code="400">Невірні вхідні дані запиту.</response>
        /// <response code="401">Користувач не автентифікований.</response>
        /// <response code="500">Помилка сервера під час створення замовлення.</response>
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<ActionResult<OrderDto>> CreateOrder([FromBody] OrderCreateDto orderCreateDto)
        {
            if (!ModelState.IsValid)
            {
                // Повертаємо 400 Bad Request з деталями помилок валідації моделі
                return BadRequest(ModelState);
            }

            try
            {
                var userId = GetUserId(); // Отримуємо ID поточного користувача з токена
                var orderDto = await _orderService.CreateOrderAsync(userId, orderCreateDto);
                // Повертаємо 201 Created і URL для отримання створеного замовлення
                return CreatedAtAction(nameof(GetOrderById), new { orderId = orderDto.Id }, orderDto);
            }
            catch (ArgumentException ex)
            {
                _logger.LogWarning(ex, "Помилка при створенні замовлення: {Message}", ex.Message);
                return BadRequest(new { message = ex.Message });
            }
            catch (UnauthorizedAccessException ex)
            {
                _logger.LogError(ex, "Помилка авторизації при створенні замовлення.");
                return Unauthorized(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Невідома помилка при створенні замовлення.");
                return StatusCode(StatusCodes.Status500InternalServerError, "Помилка сервера при створенні замовлення.");
            }
        }

        /// <summary>
        /// Отримує замовлення за його унікальним ідентифікатором.
        /// </summary>
        /// <param name="orderId">Унікальний ідентифікатор замовлення.</param>
        /// <returns>DTO замовлення, якщо знайдено; інакше NotFound.</returns>
        /// <response code="200">Замовлення успішно отримано.</response>
        /// <response code="401">Користувач не автентифікований.</response>
        /// <response code="403">Користувач не має прав доступу до замовлення.</response>
        /// <response code="404">Замовлення не знайдено.</response>
        [HttpGet("{orderId}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        public async Task<ActionResult<OrderDto>> GetOrderById(Guid orderId)
        {
            var orderDto = await _orderService.GetOrderByIdAsync(orderId);
            if (orderDto == null)
            {
                return NotFound($"Замовлення з ID {orderId} не знайдено.");
            }

        
             try
            {
                var userId = GetUserId();
                if (orderDto.UserId != userId && !User.IsInRole("Admin"))
                {
                    _logger.LogWarning("Користувач {UserId} намагався отримати доступ до замовлення {OrderId} без дозволу.", userId, orderId);
                    return Forbid(); // 403 Forbidden
                }
            }
            catch (UnauthorizedAccessException ex)
            {
                _logger.LogError(ex, "Помилка авторизації при отриманні замовлення.");
                return Unauthorized(new { message = ex.Message });
            }


            return Ok(orderDto);
        }

        /// <summary>
        /// Отримує всі замовлення для поточного автентифікованого користувача.
        /// </summary>
        /// <returns>Список DTO замовлень користувача.</returns>
        /// <response code="200">Список замовлень успішно отримано.</response>
        /// <response code="401">Користувач не автентифікований.</response>
        /// <response code="500">Помилка сервера під час отримання замовлень.</response>
        [HttpGet("my-orders")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<ActionResult<IEnumerable<OrderDto>>> GetUserOrders()
        {
            try
            {
                var userId = GetUserId(); // Отримуємо ID поточного користувача
                var orderDtos = await _orderService.GetUserOrdersAsync(userId);
                return Ok(orderDtos);
            }
            catch (UnauthorizedAccessException ex)
            {
                _logger.LogError(ex, "Помилка авторизації при отриманні замовлень користувача.");
                return Unauthorized(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Невідома помилка при отриманні замовлень користувача.");
                return StatusCode(StatusCodes.Status500InternalServerError, "Помилка сервера при отриманні замовлень користувача.");
            }
        }

        /// <summary>
        /// Отримує всі замовлення в системі (доступно лише для адміністраторів).
        /// </summary>
        /// <returns>Список усіх DTO замовлень.</returns>
        /// <response code="200">Список усіх замовлень успішно отримано.</response>
        /// <response code="401">Користувач не автентифікований.</response>
        /// <response code="403">Користувач не має прав адміністратора.</response>
        /// <response code="500">Помилка сервера під час отримання замовлень.</response>
        [HttpGet]
        [Authorize(Roles = "Admin")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        public async Task<ActionResult<IEnumerable<OrderDto>>> GetAllOrders()
        {
            try
            {
                var orderDtos = await _orderService.GetAllOrdersAsync();
                return Ok(orderDtos);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Невідома помилка при отриманні всіх замовлень.");
                return StatusCode(StatusCodes.Status500InternalServerError, "Помилка сервера при отриманні всіх замовлень.");
            }
        }

        /// <summary>
        /// Оновлює статус або адресу доставки замовлення (доступно лише для адміністраторів).
        /// </summary>
        /// <param name="orderId">Ідентифікатор замовлення, яке потрібно оновити.</param>
        /// <param name="orderUpdateDto">Об’єкт передачі даних з оновленими статусом та/або адресою.</param>
        /// <returns>Оновлений DTO замовлення або NotFound, якщо замовлення не знайдено.</returns>
        /// <response code="200">Замовлення успішно оновлено.</response>
        /// <response code="400">Невірні вхідні дані.</response>
        /// <response code="401">Користувач не автентифікований.</response>
        /// <response code="403">Користувач не має прав адміністратора.</response>
        /// <response code="404">Замовлення не знайдено.</response>
        /// <response code="500">Помилка сервера під час оновлення замовлення.</response>
        [HttpPut("{orderId}")]
        [Authorize(Roles = "Admin")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        public async Task<ActionResult<OrderDto>> UpdateOrderStatusAndAddress(Guid orderId, [FromBody] OrderUpdateDto orderUpdateDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var updatedOrderDto = await _orderService.UpdateOrderStatusAndAddressAsync(orderId, orderUpdateDto);
                if (updatedOrderDto == null)
                {
                    return NotFound($"Замовлення з ID {orderId} не знайдено.");
                }
                return Ok(updatedOrderDto);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Помилка сервера при оновленні замовлення з ID: {OrderId}", orderId);
                return StatusCode(StatusCodes.Status500InternalServerError, "Помилка сервера при оновленні замовлення.");
            }
        }

        /// <summary>
        /// Видаляє замовлення за його ідентифікатором (доступно лише для адміністраторів або власника замовлення).
        /// </summary>
        /// <param name="orderId">Ідентифікатор замовлення, яке потрібно видалити.</param>
        /// <returns>NoContent, якщо замовлення успішно видалено; або NotFound, якщо замовлення не знайдено.</returns>
        /// <response code="204">Замовлення успішно видалено.</response>
        /// <response code="400">Помилка в запиті на видалення.</response>
        /// <response code="401">Користувач не автентифікований.</response>
        /// <response code="403">Користувач не має прав на видалення замовлення.</response>
        /// <response code="404">Замовлення не знайдено.</response>
        /// <response code="500">Помилка сервера під час видалення замовлення.</response>
        [HttpDelete("{orderId}")]
        [Authorize(Roles = "Admin")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        public async Task<ActionResult> DeleteOrder(Guid orderId)
        {
            try
            {
                var orderDto = await _orderService.GetOrderByIdAsync(orderId);
                if (orderDto == null) return NotFound();
                var userId = GetUserId();
                if (orderDto.UserId != userId && !User.IsInRole("Admin"))
                {
                    _logger.LogWarning("Користувач {UserId} намагався видалити замовлення {OrderId} без дозволу.", userId, orderId);
                    return Forbid();
                }

                var isDeleted = await _orderService.DeleteOrderAsync(orderId);
                if (!isDeleted)
                {
                    return NotFound($"Замовлення з ID {orderId} не знайдено.");
                }
                _logger.LogInformation("Замовлення з ID {OrderId} видалено контролером.", orderId);
                return NoContent(); // 204 No Content - успішне виконання, немає вмісту для повернення
            }
            catch (InvalidOperationException ex)
            {
                _logger.LogWarning(ex, "Помилка при видаленні замовлення: {Message}", ex.Message);
                return BadRequest(new { message = ex.Message });
            }
            catch (UnauthorizedAccessException ex)
            {
                _logger.LogError(ex, "Помилка авторизації при видаленні замовлення.");
                return Unauthorized(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Невідома помилка при видаленні замовлення з ID: {OrderId}", orderId);
                return StatusCode(StatusCodes.Status500InternalServerError, "Помилка сервера при видаленні замовлення.");
            }
        }

        #endregion
    }
}
