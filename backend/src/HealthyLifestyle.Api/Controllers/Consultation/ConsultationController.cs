using HealthyLifestyle.Application.DTOs.Consultation;
using HealthyLifestyle.Application.DTOs.Shop;
using HealthyLifestyle.Application.Interfaces.Consultation;
using HealthyLifestyle.Application.Services.Shop;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace HealthyLifestyle.Api.Controllers.Consultation
{
    /// <summary>
    /// Контролер для керування консультаціями в додатку HealthyLifestyle.
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    public class ConsultationController : ControllerBase
    {
        private readonly IConsultationService _consultationService;

        /// <summary>
        /// Ініціалізує новий екземпляр класу <see cref="ConsultationController"/>.
        /// </summary>
        /// <param name="consultationService">Сервіс для обробки операцій, пов’язаних із консультаціями.</param>
        /// <exception cref="ArgumentNullException">Викидається, якщо <paramref name="productService"/> є null.</exception>
        public ConsultationController(IConsultationService consultationService)
        {
            _consultationService = consultationService;
        }

        /// <summary>
        /// Отримує консультацію за її ідентифікатором.
        /// </summary>
        /// <param name="id">Ідентифікатор консультації.</param>
        /// <returns>Консультація або 404 Not Found, якщо її не існує.</returns>
        [HttpGet("{id}")]
        [ProducesResponseType(typeof(ConsultationDto), 200)]
        [ProducesResponseType(404)]
        [ProducesResponseType(401)] // Unauthorized (якщо не зареєстрований)
        [Authorize] // <-- Тільки для зареєстрованих користувачів
        public async Task<IActionResult> GetConsultationById(Guid id)
        {
            try
            {
                var consultation = await _consultationService.GetConsultationByIdAsync(id);
                return Ok(consultation);
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
        /// Отримує список усіх консультацій.
        /// </summary>
        /// <returns>Список консультацій.</returns>
        [HttpGet]
        [ProducesResponseType(typeof(IEnumerable<ConsultationDto>), 200)]
        [AllowAnonymous] // <-- Доступно всім (анонімним і зареєстрованим)
        public async Task<IActionResult> GetAllConsultation()
        {
            var consultations = await _consultationService.GetAllConsultationsAsync();
            return Ok(consultations);
        }

        /// <summary>
        /// Створює нову консультацію.
        /// </summary>
        /// <param name="consultationCreateDto">Дані для створення консультації.</param>
        /// <returns>Створена консультація.</returns>
        [HttpPost]
        [ProducesResponseType(typeof(ConsultationDto), 201)]
        [ProducesResponseType(400)]
        [ProducesResponseType(401)] // Unauthorized
        [ProducesResponseType(403)] // Forbidden
        [Authorize(Roles = "Admin")] // <-- Тільки для користувачів з роллю "Admin"
        public async Task<IActionResult> CreateConsultation([FromBody] ConsultationCreateDto consultationCreateDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                var createdConsultation = await _consultationService.CreateConsultationAsync(consultationCreateDto);
                return CreatedAtAction(nameof(GetConsultationById), new { id = createdConsultation.Id }, createdConsultation);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Внутрішня помилка сервера: {ex.Message}");
            }
        }

        /// <summary>
        /// Оновлює існуючу консультацію.
        /// </summary>
        /// <param name="id">Ідентифікатор консультації, яку потрібно оновити.</param>
        /// <param name="consultationUpdateDto">Оновлені дані консультації.</param>
        /// <returns>Оновлена консультація або 404 Not Found.</returns>
        [HttpPut("{id}")]
        [ProducesResponseType(typeof(ConsultationDto), 200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        [ProducesResponseType(401)]
        [ProducesResponseType(403)]
        [Authorize(Roles = "Admin")] // <-- Тільки для користувачів з роллю "Admin"
        public async Task<IActionResult> UpdateConsultation(Guid id, [FromBody] ConsultationUpdateDto consultationUpdateDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                var updatedConsultation = await _consultationService.UpdateConsultationAsync(id, consultationUpdateDto);
                return Ok(updatedConsultation);
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
        /// Видаляє консультацію за її ідентифікатором.
        /// </summary>
        /// <param name="id">Ідентифікатор консультації, яку потрібно видалити.</param>
        /// <returns>204 No Content або 404 Not Found.</returns>
        [HttpDelete("{id}")]
        [ProducesResponseType(204)]
        [ProducesResponseType(404)]
        [ProducesResponseType(401)]
        [ProducesResponseType(403)]
        [Authorize(Roles = "Admin")] // <-- Тільки для користувачів з роллю "Admin"
        public async Task<IActionResult> DeleteConsultation(Guid id)
        {
            try
            {
                await _consultationService.DeleteConsultationAsync(id);
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
