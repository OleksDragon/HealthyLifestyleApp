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
    public class SocialChallengeController : ControllerBase
    {
        private readonly IChallengeService _challengeService;

        /// <summary>
        /// Ініціалізує новий екземпляр класу <see cref="SocialChallengeController"/>.
        /// </summary>
        /// <param name="challengeService">Сервіс для обробки операцій, пов’язаних з групами.</param>
        /// <exception cref="ArgumentNullException">Викидається, якщо <paramref name="productService"/> є null.</exception>
        public SocialChallengeController(IChallengeService challengeService)
        {
            _challengeService = challengeService;
        }

        /// <summary>
        /// Отримує челендж за його ідентифікатором.
        /// </summary>
        /// <param name="id">Ідентифікатор челенджу.</param>
        /// <returns>Челендж або 404 Not Found, якщо її не існує.</returns>
        [HttpGet("{id}")]
        [ProducesResponseType(typeof(ChallengeDto), 200)]
        [ProducesResponseType(404)]
        [ProducesResponseType(401)] // Unauthorized (якщо не зареєстрований)
        [Authorize] // <-- Тільки для зареєстрованих користувачів
        public async Task<IActionResult> GetChallengeById(Guid id)
        {
            try
            {
                var сhallenge = await _challengeService.GetChallengeByIdAsync(id);
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
        /// Отримує список усіх челенджів.
        /// </summary>
        /// <returns>Список челенджів.</returns>
        [HttpGet]
        [ProducesResponseType(typeof(IEnumerable<ChallengeDto>), 200)]
        [AllowAnonymous] // <-- Доступно всім (анонімним і зареєстрованим)
        public async Task<IActionResult> GetAllChallenge()
        {
            var сhallenges = await _challengeService.GetAllChallengesAsync();
            return Ok(сhallenges);
        }

        /// <summary>
        /// Створює новий челендж.
        /// </summary>
        /// <param name="hallengeCreateDto">Дані для створення челенджу.</param>
        /// <returns>Створений челендж.</returns>
        [HttpPost]
        [ProducesResponseType(typeof(ChallengeDto), 201)]
        [ProducesResponseType(400)]
        [ProducesResponseType(401)] // Unauthorized
        [ProducesResponseType(403)] // Forbidden
        [Authorize(Roles = "Admin")] // <-- Тільки для користувачів з роллю "Admin"
        public async Task<IActionResult> CreateChallenge([FromBody] ChallengeCreateDto сhallengeCreateDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                var createdChallenge = await _challengeService.CreateChallengeAsync(сhallengeCreateDto);
                return CreatedAtAction(nameof(GetChallengeById), new { id = createdChallenge.Id }, createdChallenge);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Внутрішня помилка сервера: {ex.Message}");
            }
        }

        /// <summary>
        /// Оновлює існуючий челендж.
        /// </summary>
        /// <param name="id">Ідентифікатор челенджу, який потрібно оновити.</param>
        /// <param name="hallengeUpdateDto">Оновлені дані челенджу.</param>
        /// <returns>Оновлений челендж або 404 Not Found.</returns>
        [HttpPut("{id}")]
        [ProducesResponseType(typeof(ChallengeDto), 200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        [ProducesResponseType(401)]
        [ProducesResponseType(403)]
        [Authorize(Roles = "Admin")] // <-- Тільки для користувачів з роллю "Admin"
        public async Task<IActionResult> UpdateChallenge(Guid id, [FromBody] ChallengeUpdateDto challengeUpdateDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                var updatedChallenge = await _challengeService.UpdateChallengeAsync(id, challengeUpdateDto);
                return Ok(updatedChallenge);
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
        /// Видаляє челендж за його ідентифікатором.
        /// </summary>
        /// <param name="id">Ідентифікатор челенджу, який потрібно видалити.</param>
        /// <returns>204 No Content або 404 Not Found.</returns>
        [HttpDelete("{id}")]
        [ProducesResponseType(204)]
        [ProducesResponseType(404)]
        [ProducesResponseType(401)]
        [ProducesResponseType(403)]
        [Authorize(Roles = "Admin")] // <-- Тільки для користувачів з роллю "Admin"
        public async Task<IActionResult> DeleteChallenge(Guid id)
        {
            try
            {
                await _challengeService.DeleteChallengeAsync(id);
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
