using System.ComponentModel.DataAnnotations;

namespace HealthyLifestyle.Application.DTOs.ProfessionalQualification
{
    /// <summary>
    /// DTO для створення та оновлення деталей профілю дієтолога.
    /// Містить усі поля, які можуть бути відправлені клієнтом або повернуті з сервера,
    /// включаючи загальні деталі професіонала, успадковані від RoleSpecificDetail.
    /// Усі поля, крім QualificationId, є nullable для підтримки часткового оновлення.
    /// </summary>
    public class DietitianDetailsDto
    {
        #region Властивості

        /// <summary>
        /// Унікальний ідентифікатор пов’язаної кваліфікації користувача (UserProfessionalQualification.Id).
        /// Обов’язкове поле для прив’язки деталей до конкретної кваліфікації.
        /// </summary>
        [Required(ErrorMessage = "Ідентифікатор кваліфікації є обов'язковим.")]
        public Guid QualificationId { get; set; }

        /// <summary>
        /// Список дієтичних спеціалізацій або областей експертизи дієтолога (наприклад, спортивне харчування, веганська дієта).
        /// </summary>
        public List<string>? Specializations { get; set; }

        /// <summary>
        /// Список сертифікатів або ліцензій дієтолога.
        /// </summary>
        public List<string>? Certifications { get; set; }

        /// <summary>
        /// Підхід дієтолога до харчування (наприклад, кето, рослинна дієта).
        /// Максимальна довжина — 500 символів.
        /// </summary>
        [StringLength(500, ErrorMessage = "Підхід до харчування не може перевищувати 500 символів.")]
        public string? NutritionalApproach { get; set; }

        /// <summary>
        /// Інформація про доступність дієтолога (наприклад, графік роботи).
        /// Максимальна довжина — 500 символів.
        /// </summary>
        [StringLength(500, ErrorMessage = "Інформація про доступність не може перевищувати 500 символів.")]
        public string? Availability { get; set; }

        /// <summary>
        /// Біографія або короткий опис дієтолога.
        /// Максимальна довжина — 1000 символів.
        /// </summary>
        [StringLength(1000, ErrorMessage = "Біографія не може перевищувати 1000 символів.")]
        public string? Biography { get; set; }

        /// <summary>
        /// Кількість років досвіду дієтолога.
        /// Діапазон допустимих значень: від 0 до 100 років.
        /// </summary>
        [Range(0, 100, ErrorMessage = "Роки досвіду мають бути в діапазоні від 0 до 100.")]
        public int? YearsOfExperience { get; set; }

        /// <summary>
        /// Контактна адреса електронної пошти дієтолога.
        /// </summary>
        [EmailAddress(ErrorMessage = "Некоректний формат адреси електронної пошти.")]
        [StringLength(100, ErrorMessage = "Адреса електронної пошти не може перевищувати 100 символів.")]
        public string? ContactEmail { get; set; }

        /// <summary>
        /// Контактний номер телефону дієтолога.
        /// </summary>
        [Phone(ErrorMessage = "Некоректний формат номера телефону.")]
        [StringLength(20, ErrorMessage = "Номер телефону не може перевищувати 20 символів.")]
        public string? ContactPhone { get; set; }

        /// <summary>
        /// URL-адреса вебсайту або портфоліо дієтолога.
        /// </summary>
        [Url(ErrorMessage = "Некоректний формат URL вебсайту.")]
        [StringLength(500, ErrorMessage = "URL вебсайту не може перевищувати 500 символів.")]
        public string? Website { get; set; }

        /// <summary>
        /// Відгуки клієнтів про дієтолога.
        /// Максимальна довжина — 500 символів.
        /// </summary>
        [StringLength(500, ErrorMessage = "Відгуки клієнтів не можуть перевищувати 500 символів.")]
        public string? ClientTestimonials { get; set; }

        /// <summary>
        /// Номер професійної ліцензії дієтолога.
        /// Максимальна довжина — 50 символів.
        /// </summary>
        [StringLength(50, ErrorMessage = "Номер професійної ліцензії не може перевищувати 50 символів.")]
        public string? ProfessionalLicenseNumber { get; set; }

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