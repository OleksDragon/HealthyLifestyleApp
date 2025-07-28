using HealthyLifestyle.Application.DTOs.Notification;
using HealthyLifestyle.Application.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace HealthyLifestyle.Api.Controllers.Notification
{
    /// <summary>
    /// Контролер для керування сповіщеннями користувачів.
    /// </summary>
    [Route("api/notifications")]
    [ApiController]
    public class NotificationController : ControllerBase
    {
        private readonly INotificationService _notificationService;

        /// <summary>
        /// Ініціалізує новий екземпляр <see cref="NotificationController"/>.
        /// </summary>
        /// <param name="notificationService">Сервіс для обробки сповіщень.</param>
        public NotificationController(INotificationService notificationService)
        {
            _notificationService = notificationService;
        }

        /// <summary>
        /// Отримує всі сповіщення користувача.
        /// </summary>
        /// <param name="userId">Ідентифікатор користувача.</param>
        [HttpGet("user/{userId}")]
        [ProducesResponseType(typeof(IEnumerable<NotificationDto>), 200)]
        [Authorize]
        public async Task<IActionResult> GetUserNotifications(Guid userId)
        {
            var notifications = await _notificationService.GetNotificationsByUserIdAsync(userId);
            return Ok(notifications);
        }

        /// <summary>
        /// Отримує сповіщення за його ідентифікатором.
        /// </summary>
        /// <param name="id">Ідентифікатор сповіщення.</param>
        [HttpGet("{id}")]
        [ProducesResponseType(typeof(NotificationDto), 200)]
        [ProducesResponseType(404)]
        [ProducesResponseType(401)]
        [Authorize]
        public async Task<IActionResult> GetNotificationById(Guid id)
        {
            try
            {
                var notification = await _notificationService.GetNotificationByIdAsync(id);
                return Ok(notification);
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
        /// Створює нове сповіщення.
        /// </summary>
        /// <param name="dto">Дані для створення сповіщення.</param>
        [HttpPost]
        [ProducesResponseType(typeof(NotificationDto), 201)]
        [ProducesResponseType(400)]
        [ProducesResponseType(401)]
        [ProducesResponseType(403)]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> CreateNotification([FromBody] CreateNotificationDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                var created = await _notificationService.CreateNotificationAsync(dto);
                return CreatedAtAction(nameof(GetNotificationById), new { id = created.Id }, created);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Внутрішня помилка сервера: {ex.Message}");
            }
        }

        /// <summary>
        /// Оновлює сповіщення.
        /// </summary>
        /// <param name="id">Ідентифікатор сповіщення.</param>
        /// <param name="dto">Дані для оновлення сповіщення.</param>
        [HttpPut("{id}")]
        [ProducesResponseType(typeof(NotificationDto), 200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        [ProducesResponseType(401)]
        [ProducesResponseType(403)]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UpdateNotification(Guid id, [FromBody] UpdateNotificationDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                // Передаємо тільки нове повідомлення, ігноруємо інші поля UpdateNotificationDto
                await _notificationService.UpdateMessageAsync(id, dto.Message);

                // Якщо потрібно, можна отримати оновлене повідомлення назад і повернути його.
                var updated = await _notificationService.GetNotificationByIdAsync(id);

                return Ok(updated);
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
        /// Видаляє сповіщення.
        /// </summary>
        /// <param name="id">Ідентифікатор сповіщення.</param>
        [HttpDelete("{id}")]
        [ProducesResponseType(204)]
        [ProducesResponseType(404)]
        [ProducesResponseType(401)]
        [ProducesResponseType(403)]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteNotification(Guid id)
        {
            try
            {
                await _notificationService.DeleteNotificationAsync(id);
                return NoContent();
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
        /// Позначає сповіщення як прочитане.
        /// </summary>
        [HttpPatch("{id}/read")]
        [ProducesResponseType(204)]
        [ProducesResponseType(401)]
        [Authorize]
        public async Task<IActionResult> MarkAsRead(Guid id)
        {
            await _notificationService.MarkAsReadAsync(id);
            return NoContent();
        }

        /// <summary>
        /// Позначає сповіщення як непрочитане.
        /// </summary>
        [HttpPatch("{id}/unread")]
        [ProducesResponseType(204)]
        [ProducesResponseType(401)]
        [Authorize]
        public async Task<IActionResult> MarkAsUnread(Guid id)
        {
            await _notificationService.MarkAsUnreadAsync(id);
            return NoContent();
        }
    }
}
