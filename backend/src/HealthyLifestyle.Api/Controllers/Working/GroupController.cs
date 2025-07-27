using HealthyLifestyle.Application.DTOs.Working;
using HealthyLifestyle.Application.Interfaces;
using HealthyLifestyle.Application.Services.Working;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace HealthyLifestyle.Api.Controllers.Working
{
    [Route("api/[controller]")]
    [ApiController]
    public class GroupController : ControllerBase
    {
        private readonly IGroupService _groupService;

        /// <summary>
        /// Ініціалізує новий екземпляр класу <see cref="GroupController"/>.
        /// </summary>
        /// <param name="groupService">Сервіс для обробки операцій, пов’язаних з групами.</param>
        /// <exception cref="ArgumentNullException">Викидається, якщо <paramref name="productService"/> є null.</exception>
        public GroupController(IGroupService groupService)
        {
            _groupService = groupService;
        }

        /// <summary>
        /// Отримує групу за її ідентифікатором.
        /// </summary>
        /// <param name="id">Ідентифікатор групи.</param>
        /// <returns>Група або 404 Not Found, якщо її не існує.</returns>
        [HttpGet("{id}")]
        [ProducesResponseType(typeof(GroupDto), 200)]
        [ProducesResponseType(404)]
        [ProducesResponseType(401)] // Unauthorized (якщо не зареєстрований)
        [Authorize] // <-- Тільки для зареєстрованих користувачів
        public async Task<IActionResult> GetGroupById(Guid id)
        {
            try
            {
                var group = await _groupService.GetGroupByIdAsync(id);
                return Ok(group);
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
        /// Отримує список усіх груп.
        /// </summary>
        /// <returns>Список груп.</returns>
        [HttpGet]
        [ProducesResponseType(typeof(IEnumerable<GroupDto>), 200)]
        [AllowAnonymous] // <-- Доступно всім (анонімним і зареєстрованим)
        public async Task<IActionResult> GetAllGroup()
        {
            var groups = await _groupService.GetAllGroupsAsync();
            return Ok(groups);
        }

        /// <summary>
        /// Створює нову групу.
        /// </summary>
        /// <param name="groupCreateDto">Дані для створення групи.</param>
        /// <returns>Створена група.</returns>
        [HttpPost]
        [ProducesResponseType(typeof(GroupDto), 201)]
        [ProducesResponseType(400)]
        [ProducesResponseType(401)] // Unauthorized
        [ProducesResponseType(403)] // Forbidden
        [Authorize(Roles = "Admin")] // <-- Тільки для користувачів з роллю "Admin"
        public async Task<IActionResult> CreateGroup([FromBody] GroupCreateDto groupCreateDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                var createdGroup = await _groupService.CreateGroupAsync(groupCreateDto);
                return CreatedAtAction(nameof(GetGroupById), new { id = createdGroup.Id }, createdGroup);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Внутрішня помилка сервера: {ex.Message}");
            }
        }

        /// <summary>
        /// Оновлює існуючу групу.
        /// </summary>
        /// <param name="id">Ідентифікатор групи, яку потрібно оновити.</param>
        /// <param name="groupUpdateDto">Оновлені дані групи.</param>
        /// <returns>Оновлена група або 404 Not Found.</returns>
        [HttpPut("{id}")]
        [ProducesResponseType(typeof(GroupDto), 200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        [ProducesResponseType(401)]
        [ProducesResponseType(403)]
        [Authorize(Roles = "Admin")] // <-- Тільки для користувачів з роллю "Admin"
        public async Task<IActionResult> UpdateGroup(Guid id, [FromBody] GroupUpdateDto groupUpdateDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                var updatedGroup = await _groupService.UpdateGroupAsync(id, groupUpdateDto);
                return Ok(updatedGroup);
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
        /// Видаляє групу за її ідентифікатором.
        /// </summary>
        /// <param name="id">Ідентифікатор групи, яку потрібно видалити.</param>
        /// <returns>204 No Content або 404 Not Found.</returns>
        [HttpDelete("{id}")]
        [ProducesResponseType(204)]
        [ProducesResponseType(404)]
        [ProducesResponseType(401)]
        [ProducesResponseType(403)]
        [Authorize(Roles = "Admin")] // <-- Тільки для користувачів з роллю "Admin"
        public async Task<IActionResult> DeleteGroup(Guid id)
        {
            try
            {
                await _groupService.DeleteGroupAsync(id);
                return NoContent(); // 204 No Content, оскільки немає тіла відповіді
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
    }
}
