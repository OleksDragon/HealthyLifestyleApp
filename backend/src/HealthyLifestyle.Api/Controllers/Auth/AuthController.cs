using HealthyLifestyle.Application.DTOs.Auth;
using HealthyLifestyle.Application.Interfaces.Auth;
using Microsoft.AspNetCore.Mvc;

namespace HealthyLifestyle.Api.Controllers.Auth
{
    /// <summary>
    /// Контролер для управління автентифікацією користувачів: реєстрація та вхід.
    /// Забезпечує API-енпойнти для створення нового користувача та входу в систему.
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        #region Private Fields

        private readonly IAuthService _authService;
        private readonly IConfiguration _configuration;

        #endregion

        #region Constructor

        /// <summary>
        /// Конструктор із вбудовуванням залежності сервісу автентифікації.
        /// </summary>
        /// <param name="authService">Сервіс автентифікації для обробки логіки реєстрації та входу.</param>
        public AuthController(IAuthService authService, IConfiguration configuration)
        {
            _authService = authService ?? throw new ArgumentNullException(nameof(authService));
            _configuration = configuration;
        }

        #endregion

        #region Public Methods

        /// <summary>
        /// Реєструє нового користувача та повертає JWT-токен.
        /// </summary>
        /// <param name="model">Дані для реєстрації (FullName, Email, Password, ConfirmPassword, DateOfBirth, Gender, Weight, Height).</param>
        /// <returns>
        /// - <see cref="Ok(object)"/> з <see cref="AuthResponseDto"/> при успішній реєстрації.
        /// - <see cref="BadRequest(object)"/> з помилками валідації або реєстрації.
        /// </returns>
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterUserDto model)
        {
            // Перевіряємо валідність моделі за допомогою DataAnnotations
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Виконуємо реєстрацію користувача через сервіс
            var registrationResult = await _authService.RegisterUserAsync(model);

            if (!registrationResult.Succeeded)
            {
                // Повертаємо список помилок, якщо реєстрація не вдалася
                return BadRequest(new { registrationResult.Errors });
            }

            // Регістрація успішна, повертаємо дані автентифікації з JWT
            return Ok(registrationResult.AuthResponse);
        }

        /// <summary>
        /// Виконує автентифікацію користувача та повертає JWT-токен.
        /// </summary>
        /// <param name="model">Дані для входу (Email і Password).</param>
        /// <returns>
        /// - <see cref="Ok(object)"/> з <see cref="AuthResponseDto"/> при успішному вході.
        /// - <see cref="Unauthorized(object)"/> при невдалому вході.
        /// - <see cref="BadRequest(object)"/> при невалідних даних входу.
        /// </returns>
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginUserDto model)
        {
            // Перевіряємо коректність даних входу
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Спроба автентифікації користувача
            var authResponse = await _authService.LoginUserAsync(model);

            if (authResponse == null)
            {
                // Повертаємо 401 Unauthorized при невдалій автентифікації
                return Unauthorized(new { Message = "Невірний логін або пароль." });
            }

            // Повертаємо успішну відповідь з JWT-токеном
            return Ok(authResponse);
        }

        /// <summary>
        /// Виконує автентифікацію користувача та повертає JWT-токен.
        /// </summary>
        /// <param name="dto">Дані для входу (JWT-token від Google).</param>
        /// <returns>
        /// - <see cref="Ok(object)"/> з <see cref="AuthResponseDto"/> при успішному вході.
        /// - <see cref="Unauthorized(object)"/> при невдалому вході.
        /// </returns>
        [HttpPost("login/google")]
        public async Task<IActionResult> LoginWithGoogle([FromBody] ExternalAuthDto dto)
        {
            var token = await _authService.ExchangeCodeForToken(dto.ProviderToken);
            if (token == null)
                return BadRequest(new { Message = "Не вдалося обміняти код на токен" });

            var authResponse = await _authService.LoginWithGoogleAsync(token);
            if (authResponse == null)
                return Unauthorized(new { Message = "Google авторизація не вдалася" });

            return Ok(authResponse);
        }
        /// <summary>
        /// Виконує автентифікацію користувача та повертає JWT-токен.
        /// </summary>
        /// <param name="dto">Дані для входу (Access-token від Facebook).</param>
        /// <returns>
        /// - <see cref="Ok(object)"/> з <see cref="AuthResponseDto"/> при успішному вході.
        /// - <see cref="Unauthorized(object)"/> при невдалому вході.
        /// </returns>
        [HttpPost("login/facebook")]
        public async Task<IActionResult> LoginWithFacebook([FromBody] ExternalAuthDto dto)
        {
            var authResponse = await _authService.LoginWithFacebookAsync(dto.ProviderToken);
            if (authResponse == null)
                return Unauthorized(new { Message = "Facebook авторизація не вдалася" });
            return Ok(authResponse);
        }

        #endregion
    }
}