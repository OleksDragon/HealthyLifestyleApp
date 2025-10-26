using HealthyLifestyle.Application.DTOs.WeightTracker;
using HealthyLifestyle.Application.Interfaces;
using HealthyLifestyle.Application.Interfaces.Weight;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;

namespace HealthyLifestyle.Application.Controllers
{
    [Authorize] 
    [Route("api/[controller]")] 
    [ApiController]
    public class WeightController : ControllerBase
    {
        private readonly IWeightService _weightService;

        public WeightController(IWeightService weightService)
        {
            _weightService = weightService;
        }

        private Guid GetUserIdFromToken()
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (Guid.TryParse(userIdClaim, out Guid userId))
            {
                return userId;
            }
            throw new UnauthorizedAccessException("Користувач не авторизований або Id не знайдено.");
        }

        // POST /api/weight/log
        /// <summary>
        /// Фіксує або оновлює вагу користувача за сьогоднішній день або вказану дату.
        /// </summary>
        [HttpPost("log")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(401)]
        public async Task<IActionResult> LogWeight([FromBody] WeightLogRequestDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                var userId = GetUserIdFromToken();
                await _weightService.LogWeightAsync(userId, dto);

                return Ok(new { message = "Вага успішно зафіксована/оновлена." });
            }
            catch (UnauthorizedAccessException ex)
            {
                return Unauthorized(new { message = ex.Message });
            }
        }

        // GET /api/weight/last-7-days
        /// <summary>
        /// Отримує записи ваги користувача за останні 7 днів.
        /// </summary>
        [HttpGet("last-7-days")]
        [ProducesResponseType(typeof(IEnumerable<WeightLogDto>), 200)]
        [ProducesResponseType(401)]
        public async Task<ActionResult<IEnumerable<WeightLogDto>>> GetLast7Days()
        {
            try
            {
                var userId = GetUserIdFromToken();
                var logs = await _weightService.GetLast7DaysLogsAsync(userId);

                return Ok(logs);
            }
            catch (UnauthorizedAccessException ex)
            {
                return Unauthorized(new { message = ex.Message });
            }
        }

        // GET /api/weight/monthly-logs/{year}/{month}
        /// <summary>
        /// Отримує записи ваги користувача за вказаний місяць та рік.
        /// </summary>
        [HttpGet("monthly-logs/{year}/{month}")]
        [ProducesResponseType(typeof(IEnumerable<WeightLogDto>), 200)]
        [ProducesResponseType(401)]
        [ProducesResponseType(400)]
        public async Task<ActionResult<IEnumerable<WeightLogDto>>> GetMonthlyLogs(int year, int month)
        {
            if (year < 1900 || month < 1 || month > 12)
            {
                return BadRequest(new { message = "Некоректні значення року або місяця." });
            }

            try
            {
                var userId = GetUserIdFromToken();
                var logs = await _weightService.GetMonthlyLogsAsync(userId, year, month);

                return Ok(logs);
            }
            catch (UnauthorizedAccessException ex)
            {
                return Unauthorized(new { message = ex.Message });
            }
        }
    }
}