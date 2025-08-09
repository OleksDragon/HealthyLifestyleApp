using AutoMapper;
using HealthyLifestyle.Application.DTOs.Auth;
using HealthyLifestyle.Application.Interfaces.Auth;
using HealthyLifestyle.Core.Entities;
using HealthyLifestyle.Core.Enums;
using HealthyLifestyle.Core.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace HealthyLifestyle.Application.Services.Auth
{
    /// <summary>
    /// Сервіс для обробки аутентифікації користувачів, включаючи реєстрацію, вхід і генерацію JWT-токенів.
    /// Реалізує контракт <see cref="IAuthService"/> для забезпечення уніфікованого API.
    /// </summary>
    public class AuthService : IAuthService
    {
        #region Private Fields

        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly IConfiguration _configuration;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        #endregion

        #region Constructors

        /// <summary>
        /// Ініціалізує новий екземпляр <see cref="AuthService"/> з необхідними залежностями.
        /// </summary>
        /// <param name="userManager">Менеджер користувачів для роботи з Identity.</param>
        /// <param name="signInManager">Менеджер входу для аутентифікації.</param>
        /// <param name="configuration">Конфігурація додатку для доступу до JWT-налаштувань.</param>
        /// <param name="unitOfWork">Юніт роботи для доступу до репозиторіїв.</param>
        /// <param name="mapper">Екземпляр AutoMapper для мапінгу об’єктів.</param>
        /// <exception cref="ArgumentNullException">Виникає, якщо будь-який із параметрів є null.</exception>
        public AuthService(
            UserManager<User> userManager,
            SignInManager<User> signInManager,
            IConfiguration configuration,
            IUnitOfWork unitOfWork,
            IMapper mapper)
        {
            _userManager = userManager ?? throw new ArgumentNullException(nameof(userManager));
            _signInManager = signInManager ?? throw new ArgumentNullException(nameof(signInManager));
            _configuration = configuration ?? throw new ArgumentNullException(nameof(configuration));
            _unitOfWork = unitOfWork ?? throw new ArgumentNullException(nameof(unitOfWork));
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
        }

        #endregion

        #region Public Methods

        /// <summary>
        /// Реєструє нового користувача з автоматичним присвоєнням ролі "User".
        /// </summary>
        /// <param name="model">Модель даних для реєстрації користувача.</param>
        /// <returns>Результат реєстрації з токеном або списком помилок.</returns>
        /// <exception cref="ArgumentNullException">Виникає, якщо <paramref name="model"/> є null.</exception>
        public async Task<RegistrationResultDto> RegisterUserAsync(RegisterUserDto model)
        {
            if (model == null) throw new ArgumentNullException(nameof(model));

            // Перевірка наявності користувача з таким Email
            if (await UserExistsAsync(model.Email))
            {
                return new RegistrationResultDto
                {
                    Succeeded = false,
                    Errors = new[] { "Користувач із таким Email уже існує." }
                };
            }

            // Створення нового користувача
            var user = new User
            {
                Email = model.Email,
                UserName = model.Email,
                FullName = model.FullName,
                DateOfBirth = model.DateOfBirth,
                Gender = model.Gender,
                Weight = model.Weight,
                Height = model.Height
            };

            // Реєстрація користувача в Identity
            var result = await _userManager.CreateAsync(user, model.Password);
            if (!result.Succeeded)
            {
                return new RegistrationResultDto
                {
                    Succeeded = false,
                    Errors = result.Errors.Select(e => e.Description).ToList()
                };
            }

            // Присвоєння ролі User
            await _userManager.AddToRoleAsync(user, RoleNames.User);

            // Генерація JWT-токена
            var (token, expiration) = await GenerateJwtTokenAsync(user);

            var authResponse = new AuthResponseDto
            {
                UserId = user.Id.ToString(),
                FullName = user.FullName,
                Email = user.Email ?? string.Empty,
                Token = token,
                Expiration = expiration
            };

            return new RegistrationResultDto
            {
                Succeeded = true,
                AuthResponse = authResponse
            };
        }

        /// <summary>
        /// Виконує аутентифікацію користувача за Email і паролем із видачею JWT-токена.
        /// </summary>
        /// <param name="model">Модель даних для входу.</param>
        /// <returns>DTO з інформацією про аутентифікацію або null, якщо аутентифікація не вдалася.</returns>
        /// <exception cref="ArgumentNullException">Виникає, якщо <paramref name="model"/> є null.</exception>
        public async Task<AuthResponseDto?> LoginUserAsync(LoginUserDto model)
        {
            if (model == null) throw new ArgumentNullException(nameof(model));

            var signInResult = await _signInManager.PasswordSignInAsync(model.Email, model.Password, false, false);
            if (!signInResult.Succeeded)
                return null;

            var user = await _userManager.FindByEmailAsync(model.Email);
            if (user == null)
                return null;

            var (token, expiration) = await GenerateJwtTokenAsync(user);

            return new AuthResponseDto
            {
                UserId = user.Id.ToString(),
                FullName = user.FullName,
                Email = user.Email ?? string.Empty,
                Token = token,
                Expiration = expiration
            };
        }

        /// <summary>
        /// Перевіряє, чи існує користувач із заданим Email.
        /// </summary>
        /// <param name="email">Email для перевірки.</param>
        /// <returns>true, якщо користувач існує; інакше false.</returns>
        public async Task<bool> UserExistsAsync(string email)
        {
            if (string.IsNullOrWhiteSpace(email))
                throw new ArgumentException("Email не може бути порожнім.", nameof(email));

            var user = await _userManager.FindByEmailAsync(email);
            return user != null;
        }

        #endregion

        #region Private Methods

        /// <summary>
        /// Генерує JWT-токен для вказаного користувача.
        /// </summary>
        /// <param name="user">Користувач, для якого генерується токен.</param>
        /// <returns>Кортеж із токеном і датою закінчення дії.</returns>
        /// <exception cref="InvalidOperationException">Виникає, якщо ключ JWT не налаштовано.</exception>
        private async Task<(string Token, DateTime Expiration)> GenerateJwtTokenAsync(User user)
        {
            var roles = await _userManager.GetRolesAsync(user);

            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(JwtRegisteredClaimNames.Email, user.Email ?? string.Empty),
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Name, user.Email ?? string.Empty)
            };

            claims.AddRange(roles.Select(role => new Claim(ClaimTypes.Role, role)));

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(
                _configuration["Jwt:Key"] ?? throw new InvalidOperationException("Ключ JWT не налаштовано.")));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var expiry = DateTime.UtcNow.AddHours(1);

            var token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Audience"],
                claims: claims,
                expires: expiry,
                signingCredentials: creds);

            var tokenString = new JwtSecurityTokenHandler().WriteToken(token);

            return (tokenString, expiry);
        }

        #endregion
    }
}