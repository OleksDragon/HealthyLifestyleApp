using System.ComponentModel.DataAnnotations;
using HealthyLifestyle.Application.DTOs.User;
using HealthyLifestyle.Core.Entities;
using HealthyLifestyle.Core.Enums;

namespace HealthyLifestyle.Application.DTOs.ProfessionalQualification
{
    /// <summary>
    /// DTO для передачі інформації про професійну кваліфікацію користувача.
    /// Використовується для передачі даних між шарами додатку з валідацією полів.
    /// </summary>
    public class UserProfessionalQualificationDto
    {
        #region Властивості

        /// <summary>
        /// Унікальний ідентифікатор кваліфікації.
        /// </summary>
        [Required(ErrorMessage = "Ідентифікатор кваліфікації є обов'язковим.")]
        public Guid Id { get; set; }

        /// <summary>
        /// Унікальний ідентифікатор користувача, якому належить кваліфікація.
        /// </summary>
        [Required(ErrorMessage = "Ідентифікатор користувача є обов'язковим.")]
        public Guid UserId { get; set; }
        public UserDto? User { get; set; }
        /// <summary>
        /// Тип професійної ролі (наприклад, тренер, дієтолог тощо).
        /// Не може бути null.
        /// </summary>
        [Required(ErrorMessage = "Тип професійної ролі є обов'язковим.")]
        public ProfessionalRoleTypeDto ProfessionalRoleType { get; set; } = null!;
        /// <summary>
        /// Навігаційна властивість для деталей психолога.
        /// </summary>
        /// [JsonIgnore]
        public PsychologistDetailsDto? PsychologistDetails { get; set; }

        /// <summary>
        /// Навігаційна властивість для деталей дієтолога.
        /// </summary>
        public DietitianDetailsDto? DietitianDetails { get; set; }

        /// <summary>
        /// Навігаційна властивість для деталей тренера.
        /// </summary>
        public TrainerDetailsDto? TrainerDetails { get; set; }

        /// <summary>
        /// Навігаційна властивість для деталей лікаря.
        /// </summary>
        public DoctorDetailsDto? DoctorDetails { get; set; }
        /// <summary>
        /// Почасова ставка за послуги (може бути null, якщо не вказано).
        /// Повинна бути невід'ємною, якщо вказана.
        /// </summary>
        [Range(0, double.MaxValue, ErrorMessage = "Почасова ставка не може бути від'ємною.")]
        public decimal? HourlyRate { get; set; }

        /// <summary>
        /// Опис кваліфікації (може бути null).
        /// Якщо вказано, довжина не повинна перевищувати 1000 символів.
        /// </summary>
        [StringLength(1000, ErrorMessage = "Опис кваліфікації не може перевищувати 1000 символів.")]
        public string? Description { get; set; }

        /// <summary>
        /// Формати роботи спеціаліста (наприклад, онлайн, офлайн, корекції плану тощо).
        /// </summary>
        public List<string>? WorkFormat { get; set; }

        /// <summary>
        /// URL посилання на сертифікати (може бути null).
        /// Якщо вказано, має бути валідною URL-адресою.
        /// </summary>
        [Url(ErrorMessage = "URL сертифікатів має бути валідною адресою.")]
        [StringLength(500, ErrorMessage = "URL сертифікатів не може перевищувати 500 символів.")]
        public string? CertificatesUrl { get; set; }

        /// <summary>
        /// Поточний статус кваліфікації (наприклад, Pending, Approved, Rejected).
        /// </summary>
        [Required(ErrorMessage = "Статус кваліфікації є обов'язковим.")]
        public QualificationStatus QualificationStatus { get; set; }

        /// <summary>
        /// Дата подання заявки на кваліфікацію.
        /// </summary>
        [Required(ErrorMessage = "Дата подання заявки є обов'язковою.")]
        public DateTime ApplicationDate { get; set; }

        /// <summary>
        /// Дата затвердження кваліфікації (може бути null, якщо ще не затверджено).
        /// </summary>
        public DateTime? ApprovalDate { get; set; }
        #endregion
    }
}