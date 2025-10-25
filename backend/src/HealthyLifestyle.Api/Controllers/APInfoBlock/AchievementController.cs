using HealthyLifestyle.Application.DTOs.APInfoBlock;
using HealthyLifestyle.Application.Interfaces.APInfoBlock;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace HealthyLifestyle.Api.Controllers.APInfoBlock
{
    /// <summary>
    /// Контролер для керування досягненнями користувачів.
    /// </summary>
    [Route("api/achievements")]
    [ApiController]
    public class AchievementController : ControllerBase
    {
        private readonly IAchievementService _achievementService;

        public AchievementController(IAchievementService achievementService)
        {
            _achievementService = achievementService;
        }

        /// <summary>
        /// Отримує всі досягнення.
        /// </summary>
        [HttpGet]
        [ProducesResponseType(typeof(IEnumerable<AchievementDto>), 200)]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetAllAchievements()
        {
            var achievements = await _achievementService.GetAllAchievementsAsync();
            return Ok(achievements);
        }

        /// <summary>
        /// Отримує досягнення користувача за ID.
        /// </summary>
        [HttpGet("user/{userId}")]
        [ProducesResponseType(typeof(List<AchievementDto>), 200)]
        [ProducesResponseType(404)]
        [Authorize]
        public async Task<IActionResult> GetAchievementsByUserId(Guid userId)
        {
            try
            {
                var achievements = await _achievementService.GetAchievementsByUserIdAsync(userId);
                return Ok(achievements);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Внутрішня помилка сервера: {ex.Message}");
            }
        }

        /// <summary>
        /// Створює нове досягнення.
        /// </summary>
        [HttpPost]
        [ProducesResponseType(typeof(AchievementDto), 201)]
        [ProducesResponseType(400)]
        [Authorize]
        public async Task<IActionResult> CreateAchievement([FromBody] AchievementCreateDto createDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                var createdAchievement = await _achievementService.CreateAchievementAsync(createDto);
                return CreatedAtAction(nameof(GetAchievementsByUserId), new { userId = createdAchievement.UserId }, createdAchievement);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Внутрішня помилка сервера: {ex.Message}");
            }
        }

        /// <summary>
        /// Видаляє досягнення.
        /// </summary>
        [HttpDelete("{id}")]
        [ProducesResponseType(204)]
        [ProducesResponseType(404)]
        [Authorize]
        public async Task<IActionResult> DeleteAchievement(Guid id)
        {
            try
            {
                await _achievementService.DeleteAchievementAsync(id);
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
    }
}