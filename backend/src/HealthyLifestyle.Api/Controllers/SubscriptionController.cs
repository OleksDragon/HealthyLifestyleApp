using HealthyLifestyle.Application.DTOs.Sub;
using HealthyLifestyle.Application.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace HealthyLifestyle.Api.Controllers.Subscription
{
    /// <summary>
    /// Контролер для керування підписками користувачів.
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    public class SubscriptionController : ControllerBase
    {
        private readonly ISubscriptionService _subscriptionService;

        public SubscriptionController(ISubscriptionService subscriptionService)
        {
            _subscriptionService = subscriptionService;
        }

        /// <summary>
        /// Отримує всі підписки.
        /// </summary>
        [HttpGet]
        [ProducesResponseType(typeof(IEnumerable<SubscriptionDto>), 200)]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetAllSubscriptions()
        {
            var subscriptions = await _subscriptionService.GetAllSubscriptionsAsync();
            return Ok(subscriptions);
        }

        /// <summary>
        /// Отримує підписки користувача.
        /// </summary>
        [HttpGet("{id}")]
        [ProducesResponseType(typeof(SubscriptionDto), 200)]
        [ProducesResponseType(404)]
        [Authorize]
        public async Task<IActionResult> GetSubscriptionById(Guid id)
        {
            try
            {
                var subscription = await _subscriptionService.GetSubscriptionsByIdAsync(id);
                return Ok(subscription);
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Внутрішня помилка сервера: {ex.Message}");
            }
        }

        /// <summary>
        /// Створює нову підписку.
        /// </summary>
        [HttpPost]
        [ProducesResponseType(typeof(SubscriptionDto), 201)]
        [ProducesResponseType(400)]
        [Authorize]
        public async Task<IActionResult> CreateSubscription([FromBody] SubscriptionCreateDto createDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                var created = await _subscriptionService.CreateSubscriptionAsync(createDto);
                return CreatedAtAction(nameof(GetSubscriptionById), new { id = created.Id }, created);
            }
            catch (InvalidOperationException ex)
            {
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Внутрішня помилка сервера: {ex.Message}");
            }
        }

        /// <summary>
        /// Оновлює підписку.
        /// </summary>
        [HttpPut("{id}")]
        [ProducesResponseType(typeof(SubscriptionDto), 200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UpdateSubscription(Guid id, [FromBody] SubscriptionUpdateDto updateDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                var updated = await _subscriptionService.UpdateSubscriptionAsync(id, updateDto);
                return Ok(updated);
            }
            catch (InvalidOperationException ex)
            {
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Внутрішня помилка сервера: {ex.Message}");
            }
        }

        /// <summary>
        /// Видаляє підписку.
        /// </summary>
        [HttpDelete("{id}")]
        [ProducesResponseType(204)]
        [ProducesResponseType(404)]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteSubscription(Guid id)
        {
            try
            {
                await _subscriptionService.DeleteSubscriptionAsync(id);
                return NoContent();
            }
            catch (ArgumentException ex)
            {
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Внутрішня помилка сервера: {ex.Message}");
            }
        }

        /// <summary>
        /// Продовжує дію підписки до нової дати (підписка не повинна мати статус active).
        /// </summary>
        [HttpPatch("{id}/renew")]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        [Authorize]
        public async Task<IActionResult> RenewSubscription(Guid id, [FromBody] DateTime newEndDate)
        {
            try
            {
                await _subscriptionService.RenewSubscriptionAsync(id, newEndDate);
                return NoContent();
            }
            catch (InvalidOperationException ex)
            {
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Внутрішня помилка сервера: {ex.Message}");
            }
        }

        /// <summary>
        /// Скасовує активну підписку.
        /// </summary>
        [HttpPatch("{id}/cancel")]
        [ProducesResponseType(204)]
        [ProducesResponseType(404)]
        [Authorize]
        public async Task<IActionResult> CancelSubscription(Guid id)
        {
            try
            {
                await _subscriptionService.CancelSubscriptionAsync(id);
                return NoContent();
            }
            catch (ArgumentException ex)
            {
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Внутрішня помилка сервера: {ex.Message}");
            }
        }

        /// <summary>
        /// Робить активну підписку expired.
        /// </summary>
        [HttpPatch("{id}/expire")]
        [ProducesResponseType(204)]
        [ProducesResponseType(404)]
        [Authorize]
        public async Task<IActionResult> ExpireSubscription(Guid id)
        {
            try
            {
                await _subscriptionService.ExpireSubscriptionAsync(id);
                return NoContent();
            }
            catch (ArgumentException ex)
            {
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Внутрішня помилка сервера: {ex.Message}");
            }
        }

    }
}
