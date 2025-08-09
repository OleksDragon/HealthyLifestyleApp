namespace HealthyLifestyle.Application.DTOs.Auth
{
    /// <summary>
    /// DTO для відповіді при успішній автентифікації користувача.
    /// Містить основну інформацію про користувача та JWT-токен.
    /// Використовується для передачі даних від сервера до клієнта після входу.
    /// </summary>
    public class AuthResponseDto
    {
        /// <summary>
        /// Ідентифікатор користувача у форматі рядка (Guid.ToString()).
        /// </summary>
        public string UserId { get; set; } = string.Empty;

        /// <summary>
        /// Повне ім’я користувача.
        /// </summary>
        public string FullName { get; set; } = string.Empty;

        /// <summary>
        /// Електронна пошта користувача.
        /// </summary>
        public string Email { get; set; } = string.Empty;

        /// <summary>
        /// JWT-токен для автентифікації та авторизації.
        /// </summary>
        public string Token { get; set; } = string.Empty;

        /// <summary>
        /// Дата і час закінчення строку дії JWT-токена.
        /// </summary>
        public DateTime Expiration { get; set; }
    }
}