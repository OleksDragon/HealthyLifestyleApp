using HealthyLifestyle.Application.DTOs.User;
using HealthyLifestyle.Application.Interfaces.User;
using HealthyLifestyle.Core.Enums;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace HealthyLifestyle.Api.Controllers.User
{
    /// <summary>
    /// API-контролер для управління профілем поточного аутентифікованого користувача.
    /// Надає методи для перегляду, оновлення та видалення профілю.
    /// </summary>
    [ApiController]
    [Route("api/[controller]")]
    [Authorize] // Вимагає автентифікації для всіх дій за замовчуванням
    public class UserController : ControllerBase
    {
        #region Private Fields

        private readonly IUserService _userService;

        #endregion

        #region Constructor

        /// <summary>
        /// Ініціалізує новий екземпляр класу <see cref="UserController"/>.
        /// </summary>
        /// <param name="userService">Сервіс для управління профілями користувачів. Не може бути null.</param>
        /// <exception cref="ArgumentNullException">Виникає, якщо переданий сервіс є null.</exception>
        public UserController(IUserService userService)
        {
            _userService = userService ?? throw new ArgumentNullException(nameof(userService));
        }

        #endregion

        #region Public Methods

        /// <summary>
        /// Отримує профіль поточного користувача.
        /// </summary>
        /// <returns>
        /// - <see cref="Ok(object)"/> з <see cref="UserDto"/> при успішному отриманні профілю.
        /// - <see cref="Unauthorized(object)"/> якщо ідентифікатор користувача відсутній або недійсний.
        /// - <see cref="NotFound(object)"/> якщо профіль не знайдено.
        /// </returns>
        [HttpGet("profile")]
        [ProducesResponseType(typeof(UserDto), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetUserProfile()
        {
            var userId = GetUserIdFromClaims();
            if (userId == null)
                return Unauthorized("Ідентифікатор користувача відсутній або недійсний.");

            var userDto = await _userService.GetUserProfileAsync(userId.Value);
            if (userDto == null)
                return NotFound("Профіль користувача не знайдений.");

            return Ok(userDto);
        }

        /// <summary>
        /// Оновлює профіль поточного користувача.
        /// </summary>
        /// <param name="request">DTO з оновленими даними профілю. Не може бути null.</param>
        /// <returns>
        /// - <see cref="Ok(object)"/> з <see cref="UserDto"/> при успішному оновленні.
        /// - <see cref="BadRequest(object)"/> при невалідних даних.
        /// - <see cref="Unauthorized(object)"/> якщо ідентифікатор користувача відсутній або недійсний.
        /// </returns>
        [HttpPut("profile")]
        [Consumes("multipart/form-data")]
        [Produces("application/json")]
        [ProducesResponseType(typeof(UserDto), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<IActionResult> UpdateUserProfile([FromForm] UpdateUserDto request)
        {
            if (request == null)
            {
                return BadRequest("Дані запиту не можуть бути null.");
            }

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var userId = GetUserIdFromClaims();
            if (userId == null)
                return Unauthorized("Ідентифікатор користувача відсутній або недійсний.");

            var updatedUser = await _userService.UpdateUserProfileAsync(userId.Value, request);
            if (updatedUser == null)
                return BadRequest("Не вдалося оновити профіль або користувач не знайдений.");

            return Ok(updatedUser);
        }

        /// <summary>
        /// Видаляє профіль поточного користувача.
        /// </summary>
        /// <returns>
        /// - <see cref="NoContent"/> у випадку успіху.
        /// - <see cref="Unauthorized(object)"/> якщо ідентифікатор користувача відсутній або недійсний.
        /// - <see cref="NotFound(object)"/> якщо користувач не знайдений або видалення не вдалося.
        /// </returns>
        [HttpDelete("profile")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> DeleteUserProfile()
        {
            var userId = GetUserIdFromClaims();
            if (userId == null)
                return Unauthorized("Ідентифікатор користувача відсутній або недійсний.");

            var isDeleted = await _userService.DeleteUserAsync(userId.Value);
            if (!isDeleted)
                return NotFound("Користувач не знайдений або видалення не вдалося.");

            return NoContent();
        }

        /// <summary>
        /// Отримує список усіх користувачів.
        /// </summary>
        /// <returns>
        /// - <see cref="Ok(object)"/> з <see cref="IEnumerable{UserDto}"/> при успішному отриманні.
        /// - <see cref="StatusCode(StatusCodes.Status401Unauthorized)"/> якщо користувач не аутентифікований.
        /// - <see cref="StatusCode(StatusCodes.Status403Forbidden)"/> якщо користувач не є адміністратором.
        /// - <see cref="StatusCode(StatusCodes.Status500InternalServerError)"/> у випадку внутрішньої помилки.
        /// </returns>
        [HttpGet]
        [Authorize]
        [ProducesResponseType(typeof(IEnumerable<UserDto>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetAllUsers()
        {
            try
            {
                var users = await _userService.GetAllUsersAsync();
                return Ok(users);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Внутрішня помилка сервера: {ex.Message}");
            }
        }

        /// <summary>
        /// Отримує список усіх користувачів (тільки для адміністраторів).
        /// </summary>
        /// <param name="name">Містит частинку ім'я користувача</param>
        /// <returns>
        /// - <see cref="Ok(object)"/> з <see cref="IEnumerable{UserDto}"/> при успішному отриманні.
        /// - <see cref="StatusCode(StatusCodes.Status401Unauthorized)"/> якщо користувач не аутентифікований.
        /// - <see cref="StatusCode(StatusCodes.Status403Forbidden)"/> якщо користувач не є адміністратором.
        /// - <see cref="StatusCode(StatusCodes.Status500InternalServerError)"/> у випадку внутрішньої помилки.
        /// </returns>
        [HttpGet("name/{name}")]
        [Authorize]
        [ProducesResponseType(typeof(IEnumerable<UserDto>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetAllUsersByName(String name)
        {
            try
            {
                var users = (await _userService.GetAllUsersAsync()).Where(u => u.FullName.ToUpper().Contains(name.ToUpper()));
                return Ok(users);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Внутрішня помилка сервера: {ex.Message}");
            }
        }

        #endregion

        #region Private Methods

        /// <summary>
        /// Вспоміжний метод для отримання UserId з claims токена.
        /// Повертає null, якщо userId відсутній або недійсний.
        /// </summary>
        /// <returns>Ідентифікатор користувача або null.</returns>
        private Guid? GetUserIdFromClaims()
        {
            var userIdString = User.FindFirstValue(ClaimTypes.NameIdentifier);
            return Guid.TryParse(userIdString, out var userId) ? userId : null;
        }

        #endregion
    }
}