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
        /// Аутентифікує користувача через Google.
        /// </summary>
        /// <param name="idToken">ID Token від Google формат: JWT.</param>
        /// <returns>AuthResponseDto, що містить інформацію про автентифікованого користувача та токен, або null/помилки.</returns>
        Task<AuthResponseDto?> LoginWithGoogleAsync(string idToken);

        /// <summary>
        /// Аутентифікує користувача через Facebook.
        /// </summary>
        /// <param name="idToken">Access Token від Facebook формат: рядок.</param>
        /// <returns>AuthResponseDto, що містить інформацію про автентифікованого користувача та токен, або null/помилки.</returns>
        Task<AuthResponseDto?> LoginWithFacebookAsync(string accessToken);


        /// <summary>
        /// Перевіряє, чи існує користувач з даним email.
        /// </summary>
        /// <param name="email">Email для перевірки.</param>
        /// <returns>True, якщо користувач з таким email існує; інакше false.</returns>
        Task<bool> UserExistsAsync(string email);

        /// <summary>
        /// Конвертує код авторизації в токен
        /// </summary>
        /// <param name="code">Код, що буде конвертовано.</param>
        /// <returns>Токен, що був отриманий з коду.</returns>
        Task<string?> ExchangeCodeForToken(string code);

        /// <summary>
        /// Змінює пароль користувача
        /// </summary>
        /// <param name="email">Email користувача.</param>
        /// <param name="password">Новий пароль.</param>
        /// <returns>true, якщо пароль вдало змінено; інакше false.</returns>
        Task<bool> ChangePassword(string email, string password);
    }
}