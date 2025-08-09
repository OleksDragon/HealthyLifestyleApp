using System.ComponentModel.DataAnnotations;
using HealthyLifestyle.Core.Enums;

namespace HealthyLifestyle.Application.DTOs.User
{
    /// <summary>
    /// DTO для передачі повної інформації про користувача.
    /// Використовується для передачі даних між шарами додатку.
    /// </summary>
    public class UserDto
    {
        /// <summary>
        /// Унікальний ідентифікатор користувача.
        /// </summary>
        [Required]
        public Guid Id { get; set; }

        /// <summary>
        /// Повне ім’я користувача.
        /// </summary>
        [Required]
        [StringLength(100, MinimumLength = 1, ErrorMessage = "Повне ім’я має містити від 1 до 100 символів.")]
        public string FullName { get; set; } = string.Empty;

        /// <summary>
        /// Електронна пошта користувача.
        /// </summary>
        [Required]
        [EmailAddress(ErrorMessage = "Невірний формат електронної пошти.")]
        [StringLength(255, ErrorMessage = "Електронна пошта не може перевищувати 255 символів.")]
        public string Email { get; set; } = string.Empty;

        /// <summary>
        /// Дата народження користувача.
        /// </summary>
        [Required]
        public DateTime DateOfBirth { get; set; }

        /// <summary>
        /// Пол користувача.
        /// </summary>
        [Required]
        public Gender Gender { get; set; }

        /// <summary>
        /// Вага користувача в кілограмах.
        /// </summary>
        [Range(0.1, 500.0, ErrorMessage = "Вага має бути в межах від 0.1 до 500 кг.")]
        public double Weight { get; set; }

        /// <summary>
        /// Зріст користувача в сантиметрах.
        /// </summary>
        [Range(30.0, 250.0, ErrorMessage = "Зріст має бути в межах від 30 до 250 см.")]
        public double Height { get; set; }

        /// <summary>
        /// URL зображення профілю (може бути null).
        /// </summary>
        [Url(ErrorMessage = "Невірний формат URL для зображення профілю.")]
        public string? ProfilePictureUrl { get; set; }

        /// <summary>
        /// Коротка біографія користувача (може бути null).
        /// </summary>
        [StringLength(1000, ErrorMessage = "Біографія не може перевищувати 1000 символів.")]
        public string? Bio { get; set; }

        /// <summary>
        /// Дата створення облікового запису.
        /// </summary>
        [Required]
        public DateTime CreatedAt { get; set; }

        /// <summary>
        /// Дата останнього оновлення даних користувача.
        /// </summary>
        [Required]
        public DateTime UpdatedAt { get; set; }
    }
}