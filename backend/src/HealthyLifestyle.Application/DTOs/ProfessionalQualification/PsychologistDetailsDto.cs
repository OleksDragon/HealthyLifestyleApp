using System.ComponentModel.DataAnnotations;

namespace HealthyLifestyle.Application.DTOs.ProfessionalQualification
{
    /// <summary>
    /// DTO для створення та оновлення деталей профілю психолога.
    /// Використовується для передачі даних між шарами додатку.
    /// Усі поля, крім QualificationId, є nullable для підтримки часткового оновлення.
    /// </summary>
    public class PsychologistDetailsDto
    {
        #region Властивості

        /// <summary>
        /// Унікальний ідентифікатор професійної кваліфікації, пов’язаної з психологом (UserProfessionalQualification.Id).
        /// Обов’язкове поле для прив’язки деталей до конкретної кваліфікації.
        /// </summary>
        [Required(ErrorMessage = "Ідентифікатор кваліфікації є обов'язковим.")]
        public Guid QualificationId { get; set; }

        /// <summary>
        /// Біографія або короткий опис психолога.
        /// Максимальна довжина — 1000 символів.
        /// </summary>
        [StringLength(1000, ErrorMessage = "Біографія не може перевищувати 1000 символів.")]
        public string? Biography { get; set; }

        /// <summary>
        /// Список спеціалізацій психолога (наприклад, дитяча психологія, сімейне консультування).
        /// </summary>
        public List<string>? Specializations { get; set; }

        /// <summary>
        /// Список терапевтичних підходів, які використовує психолог (наприклад, когнітивно-поведінкова терапія, гештальт-терапія).
        /// </summary>
        public List<string>? TherapyApproaches { get; set; }

        /// <summary>
        /// Номер професійної ліцензії психолога.
        /// Максимальна довжина — 50 символів.
        /// </summary>
        [StringLength(50, ErrorMessage = "Номер професійної ліцензії не може перевищувати 50 символів.")]
        public string? ProfessionalLicenseNumber { get; set; }

        /// <summary>
        /// Контактна адреса електронної пошти психолога.
        /// </summary>
        [EmailAddress(ErrorMessage = "Некоректний формат адреси електронної пошти.")]
        [StringLength(100, ErrorMessage = "Адреса електронної пошти не може перевищувати 100 символів.")]
        public string? ContactEmail { get; set; }

        /// <summary>
        /// Контактний номер телефону психолога.
        /// </summary>
        [Phone(ErrorMessage = "Некоректний формат номера телефону.")]
        [StringLength(20, ErrorMessage = "Номер телефону не може перевищувати 20 символів.")]
        public string? ContactPhone { get; set; }

        /// <summary>
        /// URL-адреса вебсайту або портфоліо психолога.
        /// </summary>
        [Url(ErrorMessage = "Некоректний формат URL вебсайту.")]
        [StringLength(500, ErrorMessage = "URL вебсайту не може перевищувати 500 символів.")]
        public string? Website { get; set; }

        /// <summary>
        /// Кількість років досвіду психолога.
        /// Діапазон допустимих значень: від 0 до 100 років.
        /// </summary>
        [Range(0, 100, ErrorMessage = "Роки досвіду мають бути в діапазоні від 0 до 100.")]
        public int? YearsOfExperience { get; set; }

        /// <summary>
        /// Список сертифікатів або ліцензій психолога.
        /// </summary>
        public List<string>? Certifications { get; set; }

        /// <summary>
        /// Інформація про доступність психолога (наприклад, графік роботи: понеділок-п’ятниця, 9:00-17:00).
        /// Максимальна довжина — 500 символів.
        /// </summary>
        [StringLength(500, ErrorMessage = "Інформація про доступність не може перевищувати 500 символів.")]
        public string? Availability { get; set; }

        /// <summary>
        /// Відгуки клієнтів про психолога.
        /// Максимальна довжина — 500 символів.
        /// </summary>
        [StringLength(500, ErrorMessage = "Відгуки клієнтів не можуть перевищувати 500 символів.")]
        public string? ClientTestimonials { get; set; }

        /// <summary>
        /// URL зображення для детальної сторінки експерта (опціонально).
        /// Максимальна довжина — 500 символів.
        /// </summary>
        [StringLength(500, ErrorMessage = "URL зображення детальної сторінки експерта не може перевищувати 500 символів.")]
        public string? ExpertDetailsPictureUrl { get; set; }

        /// <summary>
        /// URL зображення для картки експерта (прев'ю у списках) (опціонально).
        /// Максимальна довжина — 500 символів.
        /// </summary>
        [StringLength(500, ErrorMessage = "URL зображення картки експерта не може перевищувати 500 символів.")]
        public string? CardPictureUrl { get; set; }
        #endregion
    }
}