using HealthyLifestyle.Application.DTOs.HealthTracker;
using HealthyLifestyle.Application.Interfaces.HealthTracker;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace HealthyLifestyle.Api.Controllers.HealthTracker
{
    /// <summary>
    /// Контролер для керування чоловічим трекером здоров’я.
    /// </summary>
    [Route("api/male-health-tracker")]
    [ApiController]
    public class MaleHealthTrackerController : ControllerBase
    {
        private readonly IMaleHealthTrackerService _maleHealthTrackerService;

        /// <summary>
        /// Ініціалізує новий екземпляр <see cref="MaleHealthTrackerController"/>.
        /// </summary>
        /// <param name="maleHealthTracker">Сервіс для обробки операцій, пов’язаних із чоловічим трекером.</param>
        /// <exception cref="ArgumentNullException">Викидається, якщо <paramref name="maleHealthTracker"/> є null.</exception>
        public MaleHealthTrackerController(IMaleHealthTrackerService maleHealthTracker)
        {
            _maleHealthTrackerService = maleHealthTracker;
        }

        /// <summary>
        /// Отримує всі записи чоловічого трекера.
        /// </summary>
        [HttpGet]
        [ProducesResponseType(typeof(IEnumerable<MaleHealthTrackerDto>), 200)]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetAllMaleHealthTracke()
        {
            var maleHealthTracker = await _maleHealthTrackerService.GetAllMaleHealthTrackerAsync();
            return Ok(maleHealthTracker);
        }

        /// <summary>
        /// Отримує один запис чоловічого трекера за ідентифікатором.
        /// </summary>
        /// /// <param name="id">Ідентифікатор чоловічого трекера.</param>
        /// <returns>Консультація або 404 Not Found, якщо її не існує.</returns>
        [HttpGet("{id}")]
        [ProducesResponseType(typeof(MaleHealthTrackerDto), 200)]
        [ProducesResponseType(404)]
        [ProducesResponseType(401)] // Unauthorized (якщо не зареєстрований)
        [Authorize] // <-- Тільки для зареєстрованих користувачів
        public async Task<IActionResult> GetMaleHealthTrackeById(Guid id)
        {
            try
            {
                var maleHealthTracker = await _maleHealthTrackerService.GetMaleHealthTrackerByIdAsync(id);
                return Ok(maleHealthTracker);
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
        /// Створює новий запис чоловічого трекера.
        /// </summary>
        /// <param name="maleHealthTrackerCreateDto">Дані для створення чоловічого трекера.</param>
        /// <returns>Створений чоловічий трекер здоров'я.</returns>
        [HttpPost]
        [ProducesResponseType(typeof(MaleHealthTrackerDto), 201)]
        [ProducesResponseType(400)]
        [ProducesResponseType(401)] // Unauthorized
        [ProducesResponseType(403)] // Forbidden
        [Authorize]
        public async Task<IActionResult> CreateMaleHealthTracke([FromBody] MaleHealthTrackerCreateDto maleHealthTrackerCreateDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                var createMaleHealthTracker = await _maleHealthTrackerService.CreateMaleHealthTrackerAsync(maleHealthTrackerCreateDto);
                return CreatedAtAction(nameof(GetMaleHealthTrackeById), new { id = createMaleHealthTracker.Id }, createMaleHealthTracker);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Внутрішня помилка сервера: {ex.Message}");
            }
        }

        /// <summary>
        /// Оновлює запис чоловічого трекера.
        /// </summary>
        [HttpPut("{id}")]
        [ProducesResponseType(typeof(MaleHealthTrackerDto), 200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        [ProducesResponseType(401)]
        [ProducesResponseType(403)]
        [Authorize]
        public async Task<IActionResult> UpdateMaleHealthTracke(Guid id, [FromBody] MaleHealthTrackerUpdateDto maleHealthTrackerCreateDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                var updatedMaleHealthTracker = await _maleHealthTrackerService.UpdateMaleHealthTrackerAsync(id, maleHealthTrackerCreateDto);
                return Ok(updatedMaleHealthTracker);
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
        }

        /// <summary>
        /// Видаляє запис чоловічого трекера.
        /// </summary>
        [HttpDelete("{id}")]
        [ProducesResponseType(204)]
        [ProducesResponseType(404)]
        [ProducesResponseType(401)]
        [ProducesResponseType(403)]
        [Authorize]
        public async Task<IActionResult> DeleteMaleHealthTracke(Guid id)
        {
            try
            {
                await _maleHealthTrackerService.DeleteMaleHealthTrackerAsync(id);
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
