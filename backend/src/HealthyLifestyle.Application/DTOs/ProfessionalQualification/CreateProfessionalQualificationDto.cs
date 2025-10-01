using System.ComponentModel.DataAnnotations;

namespace HealthyLifestyle.Application.DTOs.ProfessionalQualification
{
    /// <summary>
    /// DTO для створення нової заявки на професійну кваліфікацію.
    /// Використовується для передачі даних від клієнта до сервера при подачі заявки.
    /// </summary>
    public class CreateProfessionalQualificationDto
    {
        #region Властивості

        /// <summary>
        /// Унікальний ідентифікатор типу професійної ролі, на яку подається заявка (наприклад, Тренер, Дієтолог).
        /// </summary>
        [Required(ErrorMessage = "Ідентифікатор типу професійної ролі є обов'язковим.")]
        public Guid ProfessionalRoleTypeId { get; set; }

        /// <summary>
        /// Пропонована почасова ставка за послуги.
        /// Може бути null, якщо використовується ставка за замовчуванням.
        /// Якщо вказано, значення має бути невід'ємним.
        /// </summary>
        [Range(0, double.MaxValue, ErrorMessage = "Почасова ставка не може бути від'ємною.")]
        public decimal? HourlyRate { get; set; }

        /// <summary>
        /// Додатковий опис або мотивація для заявки.
        /// Максимальна довжина — 1000 символів.
        /// </summary>
        [StringLength(1000, ErrorMessage = "Опис не може перевищувати 1000 символів.")]
        public string? Description { get; set; }

        /// <summary>
        /// Формати роботи спеціаліста (наприклад, онлайн, офлайн, корекції плану тощо).
        /// </summary>
        public List<string>? WorkFormat { get; set; }

        /// <summary>
        /// URL до підтверджуючих документів або сертифікатів.
        /// Може бути null, але якщо вказано, має бути валідною URL-адресою.
        /// Максимальна довжина — 500 символів.
        /// </summary>
        [Url(ErrorMessage = "URL сертифікатів має бути валідною адресою.")]
        [StringLength(500, ErrorMessage = "URL сертифікатів не може перевищувати 500 символів.")]
        public string? CertificatesUrl { get; set; }
        #endregion
    }
}