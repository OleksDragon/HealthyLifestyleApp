namespace HealthyLifestyle.Application.DTOs.Auth
{
    /// <summary>
    /// DTO, що представляє результат операції реєстрації користувача.
    /// Використовується для передачі результатів реєстрації, включаючи статус, дані автентифікації та помилки.
    /// </summary>
    public class RegistrationResultDto
    {
        /// <summary>
        /// Прапорець успішності операції реєстрації.
        /// true — реєстрація пройшла успішно, false — виникли помилки.
        /// </summary>
        public bool Succeeded { get; set; }

        /// <summary>
        /// Дані автентифікації користувача, що повертаються після успішної реєстрації.
        /// Містить, наприклад, JWT-токен, Id користувача тощо.
        /// </summary>
        public AuthResponseDto? AuthResponse { get; set; }

        /// <summary>
        /// Колекція помилок, що виникли під час реєстрації.
        /// Заповнюється у випадку невдачі.
        /// </summary>
        public IEnumerable<string>? Errors { get; set; }
    }
}