using System.ComponentModel.DataAnnotations;
using HealthyLifestyle.Core.Enums;

namespace HealthyLifestyle.Application.DTOs.User
{
    /// <summary>
    /// DTO для оновлення інформації про користувача.
    /// Усі поля є nullable, щоб дозволити користувачу оновлювати лише обрані дані.
    /// Використовується для передачі змін до профілю між шарами додатку.
    /// </summary>
    public class UpdateUserDto
    {
        /// <summary>
        /// Повне ім’я користувача.
        /// Максимальна довжина — 256 символів.
        /// </summary>
        [StringLength(256, MinimumLength = 1, ErrorMessage = "Повне ім’я має містити від 1 до 256 символів.")]
        public string? FullName { get; set; }

        /// <summary>
        /// Дата народження користувача.
        /// Формат дати; значення не може бути пізніше поточної дати.
        /// </summary>
        [DataType(DataType.Date)]
        [CustomValidation(typeof(UpdateUserDto), nameof(ValidateDateOfBirth))]
        public DateTime? DateOfBirth { get; set; }

        /// <summary>
        /// Пол користувача.
        /// </summary>
        public Gender? Gender { get; set; }

        /// <summary>
        /// Вага користувача в кілограмах.
        /// Діапазон допустимих значень: від 1 до 350 кг.
        /// </summary>
        [Range(1.0, 350.0, ErrorMessage = "Вага має бути в діапазоні від 1 до 350 кг.")]
        public double? Weight { get; set; }

        /// <summary>
        /// Зріст користувача в сантиметрах.
        /// Діапазон допустимих значень: від 1 до 250 см.
        /// </summary>
        [Range(1.0, 250.0, ErrorMessage = "Зріст має бути в діапазоні від 1 до 250 см.")]
        public double? Height { get; set; }

        /// <summary>
        /// URL зображення профілю користувача.
        /// Максимальна довжина — 500 символів; має відповідати формату URL.
        /// </summary>
        [StringLength(500, MinimumLength = 1, ErrorMessage = "URL зображення профілю має містити від 1 до 500 символів.")]
        [Url(ErrorMessage = "Невірний формат URL для зображення профілю.")]
        public string? ProfilePictureUrl { get; set; }

        /// <summary>
        /// Коротка біографія користувача.
        /// Максимальна довжина — 1000 символів.
        /// </summary>
        [StringLength(1000, MinimumLength = 1, ErrorMessage = "Біографія має містити від 1 до 1000 символів.")]
        public string? Bio { get; set; }

        /// <summary>
        /// Номер телефону користувача.
        /// Максимальна довжина — 20 символів; має відповідати формату телефонного номера.
        /// </summary>
        [Phone(ErrorMessage = "Невірний формат номера телефону.")]
        [StringLength(20, MinimumLength = 1, ErrorMessage = "Номер телефону має містити від 1 до 20 символів.")]
        public string? Phone { get; set; }

        /// <summary>
        /// Країна проживання користувача.
        /// Максимальна довжина — 100 символів.
        /// </summary>
        [StringLength(100, MinimumLength = 1, ErrorMessage = "Назва країни має містити від 1 до 100 символів.")]
        public string? Country { get; set; }

        /// <summary>
        /// Місто проживання користувача.
        /// Максимальна довжина — 100 символів.
        /// </summary>
        [StringLength(100, MinimumLength = 1, ErrorMessage = "Назва міста має містити від 1 до 100 символів.")]
        public string? City { get; set; }

        /// <summary>
        /// Вулиця проживання користувача.
        /// Максимальна довжина — 200 символів.
        /// </summary>
        [StringLength(200, MinimumLength = 1, ErrorMessage = "Назва вулиці має містити від 1 до 200 символів.")]
        public string? Street { get; set; }

        /// <summary>
        /// Перевіряє, чи дата народження не пізніше поточної дати.
        /// </summary>
        /// <param name="dateOfBirth">Дата народження для перевірки.</param>
        /// <param name="context">Контекст валідації.</param>
        /// <returns>Результат валідації.</returns>
        public static ValidationResult? ValidateDateOfBirth(DateTime? dateOfBirth, ValidationContext context)
        {
            if (dateOfBirth.HasValue && dateOfBirth.Value > DateTime.UtcNow)
            {
                return new ValidationResult("Дата народження не може бути пізніше поточної дати.", new[] { nameof(DateOfBirth) });
            }
            return ValidationResult.Success;
        }
    }
}