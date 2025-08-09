using System.ComponentModel.DataAnnotations;
using HealthyLifestyle.Core.Enums;

namespace HealthyLifestyle.Application.DTOs.ProfessionalQualification
{
    /// <summary>
    /// DTO для представлення професійної кваліфікації користувача.
    /// Використовується для передачі даних про кваліфікацію між шарами додатку.
    /// </summary>
    public class ProfessionalQualificationDto
    {
        #region Властивості

        /// <summary>
        /// Унікальний ідентифікатор кваліфікації.
        /// </summary>
        [Required(ErrorMessage = "Ідентифікатор кваліфікації є обов'язковим.")]
        public Guid Id { get; set; }

        /// <summary>
        /// Ідентифікатор користувача, якому належить кваліфікація.
        /// </summary>
        [Required(ErrorMessage = "Ідентифікатор користувача є обов'язковим.")]
        public Guid UserId { get; set; }

        /// <summary>
        /// Ідентифікатор типу професійної ролі.
        /// </summary>
        [Required(ErrorMessage = "Ідентифікатор типу професійної ролі є обов'язковим.")]
        public Guid ProfessionalRoleTypeId { get; set; }

        /// <summary>
        /// Опис кваліфікації або досвіду користувача.
        /// Може бути null, якщо не вказано, але якщо вказано, довжина не повинна перевищувати 1000 символів.
        /// </summary>
        [StringLength(1000, ErrorMessage = "Опис кваліфікації не може перевищувати 1000 символів.")]
        public string? Description { get; set; }

        /// <summary>
        /// URL сертифікатів або зображень.
        /// Може бути null, якщо не вказано, але якщо вказано, має бути валідною URL-адресою.
        /// </summary>
        [Url(ErrorMessage = "URL сертифікатів має бути валідною адресою.")]
        [StringLength(500, ErrorMessage = "URL сертифікатів не може перевищувати 500 символів.")]
        public string? CertificatesUrl { get; set; }

        /// <summary>
        /// Почасова ставка для цієї кваліфікації.
        /// Повинна бути невід'ємною.
        /// </summary>
        [Range(0, double.MaxValue, ErrorMessage = "Почасова ставка не може бути від'ємною.")]
        public decimal HourlyRate { get; set; }

        /// <summary>
        /// Статус кваліфікації (Pending, Approved, Rejected тощо).
        /// </summary>
        [Required(ErrorMessage = "Статус кваліфікації є обов'язковим.")]
        public QualificationStatus Status { get; set; }

        /// <summary>
        /// Дата подання заявки на кваліфікацію.
        /// </summary>
        [Required(ErrorMessage = "Дата подання заявки є обов'язковою.")]
        public DateTime ApplicationDate { get; set; }

        /// <summary>
        /// Дата затвердження кваліфікації, якщо є.
        /// Може бути null, якщо ще не затверджено.
        /// </summary>
        public DateTime? ApprovalDate { get; set; }
        #endregion
    }
}