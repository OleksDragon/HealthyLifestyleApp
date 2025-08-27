using Azure.Core;
using HealthyLifestyle.Application.DTOs.Auth;
using HealthyLifestyle.Application.Interfaces.Auth;
using HealthyLifestyle.Application.Interfaces.Email;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Concurrent;
using System.Drawing.Printing;
using System.Drawing;

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
        private static ConcurrentDictionary<string, string> EmailsOneTimeCodes = new ConcurrentDictionary<string, string>();
        private readonly IEmailService _emailService;

        #endregion

        #region Constructor

        /// <summary>
        /// Конструктор із вбудовуванням залежності сервісу автентифікації.
        /// </summary>
        /// <param name="authService">Сервіс автентифікації для обробки логіки реєстрації та входу.</param>
        public AuthController(IAuthService authService, IConfiguration configuration, IEmailService emailService)
        {
            _authService = authService ?? throw new ArgumentNullException(nameof(authService));
            _configuration = configuration;
            _emailService = emailService ?? throw new ArgumentNullException(nameof(emailService));
        }

        #endregion

        #region Public Methods

        /// <summary>
        /// Генерує код підтвердження для реєстрації нового користувача.
        /// </summary>
        /// <param name="email">Пошта, яку треба підтвердити</param>
        [HttpPost("confirmation/{email}")]
        public async Task<IActionResult> CreateConfirmationCode(string email)
        {
            var code = new Random().Next(0, 99999).ToString("D5");
            EmailsOneTimeCodes[email] = code;

            Task.Delay(TimeSpan.FromMinutes(5)).ContinueWith(_ =>
            {
                EmailsOneTimeCodes.TryRemove(email, out var _);
            });

            var html = $@"
                <html>
                    <body>
                        <h1>Код підтвердження</h1>
                        <p>Ваш код підтвердження: <strong>{code}</strong></p>
                        <p>Будь ласка, введіть цей код для завершення реєстрації.</p>
                    </body>
                </html>";

            _emailService.SendEmailAsync(email, "Код підтвердження", html);

            return Ok();
        }

        /// <summary>
        /// Перевіряє код підтвердження для реєстрації нового користувача.
        /// </summary>
        /// <param name="email">Пошта, яку треба підтвердити</param>
        /// <param name="code">Згенерований код</param>
        [HttpPost("confirmation/{email}/{code}")]
        public async Task<IActionResult> ConfirmEmail(string email, string code)
        {
            if (EmailsOneTimeCodes.TryGetValue(email, out var storedCode))
            {
                if (storedCode == code)
                {
                    EmailsOneTimeCodes.TryRemove(email, out _);
                    return Ok();
                }
            }

            return BadRequest();
        }


        /// <summary>
        /// Перевіряє чи існує користувач с заданою поштою.
        /// </summary>
        /// <param name="email">Пошта, яку треба перевірити</param>
        [HttpPost("exist/{email}")]
        public async Task<IActionResult> ExistEmail(string email)
        {
            if (await _authService.UserExistsAsync(email))return Ok();

            return BadRequest();
        }

        /// <summary>
        /// Змінює пароль користувача.
        /// </summary>
        /// <param name="model">Дані для зміни паролю.</param>
        [HttpPost("change/password")]
        public async Task<IActionResult> ChangePassword([FromBody] LoginUserDto model)
        {
            if (await _authService.UserExistsAsync(model.Email))
            {
                if (await _authService.ChangePassword(model.Email, model.Password))
                {
                    return Ok();
                }
            }

            return BadRequest();
        }

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