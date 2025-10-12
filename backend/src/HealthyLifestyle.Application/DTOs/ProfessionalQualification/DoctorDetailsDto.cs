using System.ComponentModel.DataAnnotations;

namespace HealthyLifestyle.Application.DTOs.ProfessionalQualification
{
    /// <summary>
    /// DTO для представлення деталей профілю лікаря.
    /// Використовується для передачі даних про лікаря між шарами додатку.
    /// Усі поля, крім QualificationId, є nullable, щоб дозволити часткове оновлення.
    /// </summary>
    public class DoctorDetailsDto
    {
        #region Властивості

        /// <summary>
        /// Унікальний ідентифікатор кваліфікації, пов’язаної з лікарем.
        /// </summary>
        [Required(ErrorMessage = "Ідентифікатор кваліфікації є обов'язковим.")]
        public Guid QualificationId { get; set; }

        /// <summary>
        /// Біографія або короткий опис лікаря.
        /// Максимальна довжина — 1000 символів.
        /// </summary>
        [StringLength(1000, ErrorMessage = "Біографія не може перевищувати 1000 символів.")]
        public string? Biography { get; set; }

        /// <summary>
        /// Контактна адреса електронної пошти лікаря.
        /// </summary>
        [EmailAddress(ErrorMessage = "Некоректний формат адреси електронної пошти.")]
        [StringLength(100, ErrorMessage = "Адреса електронної пошти не може перевищувати 100 символів.")]
        public string? ContactEmail { get; set; }

        /// <summary>
        /// Контактний номер телефону лікаря.
        /// </summary>
        [Phone(ErrorMessage = "Некоректний формат номера телефону.")]
        [StringLength(20, ErrorMessage = "Номер телефону не може перевищувати 20 символів.")]
        public string? ContactPhone { get; set; }

        /// <summary>
        /// URL-адреса вебсайту або портфоліо лікаря.
        /// </summary>
        [Url(ErrorMessage = "Некоректний формат URL вебсайту.")]
        [StringLength(500, ErrorMessage = "URL вебсайту не може перевищувати 500 символів.")]
        public string? Website { get; set; }

        /// <summary>
        /// Список спеціалізацій лікаря (наприклад, «Кардіолог», «Невролог»).
        /// </summary>
        public List<string>? Specializations { get; set; }

        /// <summary>
        /// Кількість років досвіду лікаря.
        /// Діапазон допустимих значень: від 0 до 100 років.
        /// </summary>
        [Range(0, 100, ErrorMessage = "Роки досвіду мають бути в діапазоні від 0 до 100.")]
        public int? YearsOfExperience { get; set; }

        /// <summary>
        /// Список сертифікатів або ліцензій лікаря.
        /// </summary>
        public List<string>? Certifications { get; set; }

        /// <summary>
        /// Інформація про доступність лікаря (наприклад, графік роботи).
        /// Максимальна довжина — 500 символів.
        /// </summary>
        [StringLength(500, ErrorMessage = "Інформація про доступність не може перевищувати 500 символів.")]
        public string? Availability { get; set; }

        /// <summary>
        /// Відгуки клієнтів про лікаря.
        /// Максимальна довжина — 500 символів.
        /// </summary>
        [StringLength(500, ErrorMessage = "Відгуки клієнтів не можуть перевищувати 500 символів.")]
        public string? ClientTestimonials { get; set; }

        /// <summary>
        /// Інформація про клінічну приналежність лікаря (наприклад, назва клініки).
        /// Максимальна довжина — 500 символів.
        /// </summary>
        [StringLength(500, ErrorMessage = "Клінічна приналежність не може перевищувати 500 символів.")]
        public string? ClinicAffiliation { get; set; }

        /// <summary>
        /// Номер професійної ліцензії лікаря.
        /// Максимальна довжина — 50 символів.
        /// </summary>
        [StringLength(50, ErrorMessage = "Номер професійної ліцензії не може перевищувати 50 символів.")]
        public string? ProfessionalLicenseNumber { get; set; }

        /// <summary>
        /// URL зображення для детальної сторінки експерта (опціонально).
        /// Максимальна довжина — 500 символів; має відповідати формату URL.
        /// </summary>
        [Url(ErrorMessage = "Невірний формат URL для зображення детальної сторінки експерта.")]
        [StringLength(500, ErrorMessage = "URL зображення детальної сторінки експерта не може перевищувати 500 символів.")]
        public string? ExpertDetailsPictureUrl { get; set; }

        /// <summary>
        /// URL зображення для картки експерта (прев'ю у списках) (опціонально).
        /// Максимальна довжина — 500 символів; має відповідати формату URL.
        /// </summary>
        [Url(ErrorMessage = "Невірний формат URL для зображення картки експерта.")]
        [StringLength(500, ErrorMessage = "URL зображення картки експерта не може перевищувати 500 символів.")]
        public string? CardPictureUrl { get; set; }
        #endregion
    }
}