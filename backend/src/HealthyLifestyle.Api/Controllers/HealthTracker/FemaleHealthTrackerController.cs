using HealthyLifestyle.Application.DTOs.HealthTracker;
using HealthyLifestyle.Application.Interfaces.HealthTracker;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace HealthyLifestyle.Api.Controllers.HealthTracker
{
    /// <summary>
    /// Контролер для керування жіночим трекером здоров’я.
    /// </summary>
    [Route("api/female-health-tracker")]
    [ApiController]
    public class FemaleHealthTrackerController : ControllerBase
    {
        private readonly IFemaleHealthTrackerService _femaleHealthTrackerService;

        /// <summary>
        /// Ініціалізує новий екземпляр <see cref="FemaleHealthTrackerController"/>.
        /// </summary>
        /// <param name="femaleHealthTracker">Сервіс для обробки операцій, пов’язаних із жіночим трекером.</param>
        /// <exception cref="ArgumentNullException">Викидається, якщо <paramref name="femaleHealthTracker"/> є null.</exception>
        public FemaleHealthTrackerController(IFemaleHealthTrackerService femaleHealthTracker)
        {
            _femaleHealthTrackerService = femaleHealthTracker;
        }

        /// <summary>
        /// Отримує всі записи жіночого трекера.
        /// </summary>
        [HttpGet]
        [ProducesResponseType(typeof(IEnumerable<FemaleHealthTrackerDto>), 200)]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetAllFemaleHealthTracke()
        {
            var femaleHealthTracker = await _femaleHealthTrackerService.GetAllFemaleHealthTrackerAsync();
            return Ok(femaleHealthTracker);
        }

        /// <summary>
        /// Отримує один запис жіночого трекера за ідентифікатором.
        /// </summary>
        /// /// <param name="id">Ідентифікатор жіночого трекера.</param>
        /// <returns>Консультація або 404 Not Found, якщо її не існує.</returns>
        [HttpGet("{id}")]
        [ProducesResponseType(typeof(FemaleHealthTrackerDto), 200)]
        [ProducesResponseType(404)]
        [ProducesResponseType(401)] // Unauthorized (якщо не зареєстрований)
        [Authorize] // <-- Тільки для зареєстрованих користувачів
        public async Task<IActionResult> GetFemaleHealthTrackeById(Guid id)
        {
            try
            {
                var femaleHealthTracker = await _femaleHealthTrackerService.GetFemaleHealthTrackerByIdAsync(id);
                return Ok(femaleHealthTracker);
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
        /// Створює новий запис жіночого трекера.
        /// </summary>
        /// <param name="femaleHealthTrackerCreateDto">Дані для створення жіночого трекера.</param>
        /// <returns>Створений жіночого трекер здоров'я.</returns>
        [HttpPost]
        [ProducesResponseType(typeof(FemaleHealthTrackerDto), 201)]
        [ProducesResponseType(400)]
        [ProducesResponseType(401)] // Unauthorized
        [ProducesResponseType(403)] // Forbidden
        [Authorize]
        public async Task<IActionResult> CreateFemaleHealthTracke([FromBody] FemaleHealthTrackerCreateDto femaleHealthTrackerCreateDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                var createFemaleHealthTracker = await _femaleHealthTrackerService.CreateFemaleHealthTrackerAsync(femaleHealthTrackerCreateDto);
                return CreatedAtAction(nameof(GetFemaleHealthTrackeById), new { id = createFemaleHealthTracker.Id }, createFemaleHealthTracker);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Внутрішня помилка сервера: {ex.Message}");
            }
        }

        /// <summary>
        /// Оновлює запис жіночого трекера.
        /// </summary>
        [HttpPut("{id}")]
        [ProducesResponseType(typeof(FemaleHealthTrackerDto), 200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        [ProducesResponseType(401)]
        [ProducesResponseType(403)]
        [Authorize]
        public async Task<IActionResult> UpdateFemaleHealthTracke(Guid id, [FromBody] FemaleHealthTrackerUpdateDto femaleHealthTrackerCreateDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                var updatedFemaleHealthTracker = await _femaleHealthTrackerService.UpdateFemaleHealthTrackerAsync(id, femaleHealthTrackerCreateDto);
                return Ok(updatedFemaleHealthTracker);
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
        }

        /// <summary>
        /// Видаляє запис жіночого трекера.
        /// </summary>
        [HttpDelete("{id}")]
        [ProducesResponseType(204)]
        [ProducesResponseType(404)]
        [ProducesResponseType(401)]
        [ProducesResponseType(403)]
        [Authorize]
        public async Task<IActionResult> DeleteFemaleHealthTracke(Guid id)
        {
            try
            {
                await _femaleHealthTrackerService.DeleteFemaleHealthTrackerAsync(id);
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
