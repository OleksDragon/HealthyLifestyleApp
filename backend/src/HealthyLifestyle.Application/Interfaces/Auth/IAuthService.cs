using HealthyLifestyle.Application.DTOs.Auth;

namespace HealthyLifestyle.Application.Interfaces.Auth
{
    public interface IAuthService
    {
        /// <summary>
        /// Реєструє нового користувача в системі.
        /// </summary>
        /// <param name="model">DTO з даними для реєстрації користувача.</param>
        /// <returns>RegistrationResultDto, що містить результат операції, AuthResponseDto у випадку успіху та список помилок у випадку невдачі.</returns>
        Task<RegistrationResultDto> RegisterUserAsync(RegisterUserDto model);

        /// <summary>
        /// Аутентифікує користувача в системі.
        /// </summary>
        /// <param name="model">DTO з обліковими даними користувача для входу.</param>
        /// <returns>AuthResponseDto, що містить інформацію про автентифікованого користувача та токен, або null/помилки.</returns>
        Task<AuthResponseDto?> LoginUserAsync(LoginUserDto model);

        /// <summary>
        /// Перевіряє, чи існує користувач з даним email.
        /// </summary>
        /// <param name="email">Email для перевірки.</param>
        /// <returns>True, якщо користувач з таким email існує; інакше false.</returns>
        Task<bool> UserExistsAsync(string email);
    }
}