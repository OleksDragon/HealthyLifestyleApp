using HealthyLifestyle.Application.DTOs.Calendar;
using HealthyLifestyle.Application.Interfaces.Calendar;
using HealthyLifestyle.Application.Interfaces.Shop;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace HealthyLifestyle.Api.Controllers.Calendar
{
    [Route("api/[controller]")]
    [ApiController]
    public class CalendarController : ControllerBase
    {
        private readonly ICalendarService _calendarService;

        public CalendarController(ICalendarService calendarService)
        {
            _calendarService = calendarService;
        }

        /// <summary>
        /// Отримує подію за її ідентифікатором.
        /// </summary>
        /// <param name="id">Ідентифікатор події.</param>
        /// <returns>Подія або 404 Not Found, якщо її не існує.</returns>
        [HttpGet("{id}")]
        [ProducesResponseType(typeof(CalendarEventDto), 200)]
        [ProducesResponseType(404)]
        [ProducesResponseType(401)]
        [Authorize]
        public async Task<IActionResult> GetCalendarEventById(Guid id)
        {
            try
            {
                var сhallenge = await _calendarService.GetCalendarEventByIdAsync(id);
                return Ok(сhallenge);
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
        /// Отримує список усіх подій за ідентефікатором користувача в залданих часових рамках.
        /// </summary>
        /// <param name="id">Ідентифікатор користувача.</param>
        /// <param name="start">Дата початку пошуку.</param>
        /// <param name="end">Дата кінця пошуку.</param>
        /// <returns>Список подій.</returns>
        [HttpGet("user/{id}/{start}/{end}")]
        [ProducesResponseType(typeof(IEnumerable<CalendarEventDto>), 200)]
        [ProducesResponseType(404)]
        [ProducesResponseType(401)]
        [Authorize]
        public async Task<IActionResult> GetAllCalendarEventsByUserIdInDateRange(Guid id, DateTime start, DateTime end)
        {
            var сhallenges = await _calendarService.GetAllCalendarEventsByUserIdInDateRangeAsync(id, start, end);
            return Ok(сhallenges);
        }

        /// <summary>
        /// Створює нову подію.
        /// </summary>
        /// <param name="calendarEventCreateDto">Дані для створення події.</param>
        /// <returns>Створений челендж.</returns>
        [HttpPost]
        [ProducesResponseType(typeof(CalendarEventDto), 201)]
        [ProducesResponseType(400)]
        [ProducesResponseType(401)]
        [ProducesResponseType(403)]
        [Authorize]
        public async Task<IActionResult> CreateCalendarEvent([FromBody] CalendarEventCreateDto calendarEventCreateDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                var createdCalendarEvent = await _calendarService.CreateCalendarEventAsync(calendarEventCreateDto);
                return CreatedAtAction(nameof(GetCalendarEventById), new { id = createdCalendarEvent.Id }, createdCalendarEvent);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Внутрішня помилка сервера: {ex.Message}");
            }
        }

        /// <summary>
        /// Оновлює існуючу подію.
        /// </summary>
        /// <param name="id">Ідентифікатор події, яку потрібно оновити.</param>
        /// <param name="calendarEventUpdateDto">Оновлені дані події.</param>
        /// <returns>Оновлена подія або 404 Not Found.</returns>
        [HttpPut("{id}")]
        [ProducesResponseType(typeof(CalendarEventDto), 200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        [ProducesResponseType(401)]
        [ProducesResponseType(403)]
        [Authorize]
        public async Task<IActionResult> UpdateCalendarEvent(Guid id, [FromBody] CalendarEventUpdateDto calendarEventUpdateDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                var updatedCalendarEvent = await _calendarService.UpdateCalendarEventAsync(id, calendarEventUpdateDto);
                return Ok(updatedCalendarEvent);
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
        /// Видаляє подію за її ідентифікатором.
        /// </summary>
        /// <param name="id">Ідентифікатор події, яку потрібно видалити.</param>
        /// <returns>204 No Content або 404 Not Found.</returns>
        [HttpDelete("{id}")]
        [ProducesResponseType(204)]
        [ProducesResponseType(404)]
        [ProducesResponseType(401)]
        [ProducesResponseType(403)]
        [Authorize]
        public async Task<IActionResult> DeleteCalendarEvent(Guid id)
        {
            try
            {
                await _calendarService.DeleteCalendarEventAsync(id);
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
