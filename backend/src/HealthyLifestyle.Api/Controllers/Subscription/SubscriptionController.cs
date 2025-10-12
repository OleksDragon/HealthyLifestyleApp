using HealthyLifestyle.Application.DTOs.Subscription;
using HealthyLifestyle.Application.Interfaces.Subscription;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using static HealthyLifestyle.Application.Services.SubscriptionS.SubscriptionService;

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
        public async Task<IActionResult> GetSubscriptionsByUserId(Guid id)
        {
            try
            {
                var subscription = await _subscriptionService.GetSubscriptionsByUserIdAsync(id);
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
                return CreatedAtAction(nameof(GetSubscriptionsByUserId), new { id = created.Id }, created);
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

        /// <summary>
        /// Перевіряє статус підписки користувача:
        /// якщо закінчилась — автоматично оновлює статус;
        /// якщо активна — повертає її;
        /// якщо немає — повертає повідомлення.
        /// </summary>
        [HttpGet("check/{userId}")]
        [ProducesResponseType(typeof(SubscriptionDto), 200)]
        [ProducesResponseType(204)]
        [Authorize]
        public async Task<IActionResult> CheckUserSubscription(Guid userId)
        {
            try
            {
                var subscription = await _subscriptionService.CheckAndUpdateSubscriptionStatusAsync(userId);

                if (subscription == null)
                    return Ok("Підписка відсутня або термін її дії закінчився.");

                return Ok(subscription);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Помилка при перевірці підписки: {ex.Message}");
            }
        }


        // ==================== Сімейні підписки ====================

        /// <summary>
        /// Створює сімейну підписку та додає членів за email.
        /// </summary>
        [HttpPost("family")]
        [ProducesResponseType(typeof(SubscriptionDto), 201)]
        [ProducesResponseType(400)]
        [Authorize]
        public async Task<IActionResult> CreateFamilySubscription([FromBody] FamilySubscriptionCreateDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                var result = await _subscriptionService.CreateFamilySubscriptionAsync(dto);
                return CreatedAtAction(nameof(GetFamilyMembers), new { ownerId = dto.OwnerId }, result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Помилка при створенні сімейної підписки: {ex.Message}");
            }
        }

        /// <summary>
        /// Отримує членів сімейної підписки.
        /// </summary>
        [HttpGet("family/{ownerId}/members")]
        [ProducesResponseType(typeof(List<FamilySubscriptionMemberDto>), 200)]
        [Authorize]
        public async Task<IActionResult> GetFamilyMembers(Guid ownerId)
        {
            try
            {
                var members = await _subscriptionService.GetFamilyMembersAsync(ownerId);
                return Ok(members);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Помилка при отриманні членів сім'ї: {ex.Message}");
            }
        }

        /// <summary>
        /// Оновлює список сімейних користувачів для підписки
        /// </summary>
        [HttpPatch("{subscriptionId}/family-members")]
        [ProducesResponseType(typeof(FamilySubscriptionUpdateResultDto), 200)]
        [ProducesResponseType(400)]
        [Authorize]
        public async Task<IActionResult> UpdateFamilyMembers(Guid subscriptionId, [FromBody] FamilyMembersUpdateDto updateDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                var result = await _subscriptionService.UpdateFamilyMembersAsync(subscriptionId, updateDto.MemberEmails);
                return Ok(result);
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Помилка при оновленні сімейних користувачів: {ex.Message}");
            }
        }

        public class FamilyMembersUpdateDto
        {
            public List<string> MemberEmails { get; set; } = new();
        }

        /// <summary>
        /// Видаляє члена сімейної підписки за email.
        /// </summary>
        [HttpDelete("family/{ownerId}/members")]
        [ProducesResponseType(204)]
        [ProducesResponseType(404)]
        [Authorize]
        public async Task<IActionResult> RemoveFamilyMember(Guid ownerId, [FromQuery] string email)
        {
            if (string.IsNullOrWhiteSpace(email))
                return BadRequest("Email не може бути порожнім.");

            try
            {
                await _subscriptionService.RemoveFamilyMemberAsync(ownerId, email);
                return NoContent();
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Помилка при видаленні члена сім'ї: {ex.Message}");
            }
        }
    }
}
