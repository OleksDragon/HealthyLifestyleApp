using System.ComponentModel.DataAnnotations;
using HealthyLifestyle.Core.Enums;

namespace HealthyLifestyle.Application.DTOs.Auth
{
    /// <summary>
    /// DTO для реєстрації нового користувача.
    /// Містить дані для створення облікового запису з валідацією.
    /// Використовується для передачі інформації від клієнта до сервера.
    /// </summary>
    public class RegisterUserDto
    {
        /// <summary>
        /// Повне ім’я користувача.
        /// Обов’язкове поле, максимальна довжина — 256 символів.
        /// </summary>
        [Required(ErrorMessage = "Повне ім’я є обов’язковим для заповнення.")]
        [StringLength(256, ErrorMessage = "Повне ім’я не може перевищувати 256 символів.")]
        public string FullName { get; set; } = string.Empty;

        /// <summary>
        /// Електронна пошта користувача.
        /// Обов’язкове поле, перевіряється формат і максимальна довжина.
        /// </summary>
        [Required(ErrorMessage = "Електронна пошта є обов’язковою для заповнення.")]
        [EmailAddress(ErrorMessage = "Невірний формат електронної пошти.")]
        [StringLength(256, ErrorMessage = "Електронна пошта не може перевищувати 256 символів.")]
        public string Email { get; set; } = string.Empty;

        /// <summary>
        /// Дата народження користувача.
        /// Обов’язкове поле.
        /// </summary>
        [Required(ErrorMessage = "Дата народження є обов’язковою.")]
        [DataType(DataType.Date)]
        [CustomValidation(typeof(RegisterUserDto), nameof(ValidateDateOfBirth))]
        public DateTime DateOfBirth { get; set; }

        /// <summary>
        /// Пол користувача.
        /// Обов’язкове поле.
        /// </summary>
        [Required(ErrorMessage = "Пол є обов’язковим.")]
        public Gender Gender { get; set; }

        /// <summary>
        /// Вага користувача в кілограмах.
        /// Обов’язкове поле з перевіркою діапазону.
        /// </summary>
        [Required(ErrorMessage = "Вага є обов’язковою.")]
        [Range(1.0, 300.0, ErrorMessage = "Вага має бути в діапазоні від 1 до 300 кг.")]
        public double Weight { get; set; }

        /// <summary>
        /// Зріст користувача в сантиметрах.
        /// Обов’язкове поле з перевіркою діапазону.
        /// </summary>
        [Required(ErrorMessage = "Зріст є обов’язковим.")]
        [Range(1.0, 250.0, ErrorMessage = "Зріст має бути в діапазоні від 1 до 250 см.")]
        public double Height { get; set; }

        /// <summary>
        /// Пароль користувача.
        /// Обов’язкове поле з обмеженням довжини від 8 до 100 символів.
        /// </summary>
        [Required(ErrorMessage = "Пароль є обов’язковим для заповнення.")]
        [StringLength(100, MinimumLength = 8, ErrorMessage = "Пароль має містити не менше 8 символів.")]
        [DataType(DataType.Password)] // Рекомендує UI приховувати введення
        public string Password { get; set; } = string.Empty;

        /// <summary>
        /// Підтвердження пароля.
        /// Обов’язкове поле, має збігатися з Password.
        /// </summary>
        [Required(ErrorMessage = "Підтвердження пароля є обов’язковим.")]
        [DataType(DataType.Password)]
        [Compare("Password", ErrorMessage = "Пароль і підтвердження пароля не збігаються.")]
        public string ConfirmPassword { get; set; } = string.Empty;

        /// <summary>
        /// Перевіряє, чи дата народження не пізніше поточної дати.
        /// </summary>
        /// <param name="dateOfBirth">Дата народження для перевірки.</param>
        /// <param name="context">Контекст валідації.</param>
        /// <returns>Результат валідації.</returns>
        public static ValidationResult? ValidateDateOfBirth(DateTime dateOfBirth, ValidationContext context)
        {
            if (dateOfBirth > DateTime.UtcNow)
            {
                return new ValidationResult("Дата народження не може бути пізніше поточної дати.", new[] { nameof(DateOfBirth) });
            }
            return ValidationResult.Success;
        }
    }
}