using HealthyLifestyle.Core.Enums;
using System;
using System.Collections.Generic;
using System.Linq;

namespace HealthyLifestyle.Core.Entities
{
    /// <summary>
    /// Сутність, що представляє професійну кваліфікацію користувача.
    /// Містить інформацію про роль, сертифікати, погодинну ставку та статус кваліфікації.
    /// </summary>
    public class UserProfessionalQualification : BaseEntity
    {
        #region Властивості

        /// <summary>
        /// Ідентифікатор користувача, якому належить кваліфікація.
        /// </summary>
        public Guid UserId { get; private set; }

        /// <summary>
        /// Ідентифікатор типу професійної ролі.
        /// </summary>
        public Guid ProfessionalRoleTypeId { get; private set; }

        /// <summary>
        /// Опис кваліфікації (наприклад, досвід, спеціалізації).
        /// </summary>
        public string Description { get; private set; } = string.Empty;

        /// <summary>
        /// Формати роботи спеціаліста (наприклад, онлайн, офлайн, корекції плану тощо).
        /// </summary>
        public List<string> WorkFormat { get; private set; } = new List<string>();

        /// <summary>
        /// URL-адреса сертифікатів (опціонально).
        /// </summary>
        public string? CertificatesUrl { get; private set; }

        /// <summary>
        /// Погодинна ставка за послуги (опціонально).
        /// </summary>
        public decimal? HourlyRate { get; private set; }

        /// <summary>
        /// Статус кваліфікації (наприклад, очікування, схвалено).
        /// </summary>
        public QualificationStatus Status { get; private set; }

        /// <summary>
        /// Дата подання заявки на кваліфікацію.
        /// </summary>
        public DateTime ApplicationDate { get; private set; }

        /// <summary>
        /// Дата схвалення кваліфікації (опціонально).
        /// </summary>
        public DateTime? ApprovalDate { get; private set; }

        /// <summary>
        /// Ідентифікатор деталей лікаря (опціонально).
        /// </summary>
        public Guid? DoctorDetailsId { get; private set; }

        /// <summary>
        /// Ідентифікатор деталей дієтолога (опціонально).
        /// </summary>
        public Guid? DietitianDetailsId { get; private set; }

        /// <summary>
        /// Ідентифікатор деталей психолога (опціонально).
        /// </summary>
        public Guid? PsychologistDetailsId { get; private set; }

        /// <summary>
        /// Ідентифікатор деталей тренера (опціонально).
        /// </summary>
        public Guid? TrainerDetailsId { get; private set; }

        /// <summary>
        /// Навігаційна властивість для пов’язаного користувача.
        /// </summary>
        public User? User { get; set; }

        /// <summary>
        /// Навігаційна властивість для типу професійної ролі.
        /// </summary>
        public ProfessionalRoleType? ProfessionalRoleType { get; set; }

        /// <summary>
        /// Навігаційна властивість для деталей психолога.
        /// </summary>
        public PsychologistDetails? PsychologistDetails { get; set; }

        /// <summary>
        /// Навігаційна властивість для деталей дієтолога.
        /// </summary>
        public DietitianDetails? DietitianDetails { get; set; }

        /// <summary>
        /// Навігаційна властивість для деталей тренера.
        /// </summary>
        public TrainerDetails? TrainerDetails { get; set; }

        /// <summary>
        /// Навігаційна властивість для деталей лікаря.
        /// </summary>
        public DoctorDetails? DoctorDetails { get; set; }
        #endregion

        #region Конструктори

        /// <summary>
        /// Ініціалізує новий екземпляр кваліфікації користувача.
        /// </summary>
        /// <param name="userId">Ідентифікатор користувача.</param>
        /// <param name="professionalRoleTypeId">Ідентифікатор типу професійної ролі.</param>
        /// <param name="description">Опис кваліфікації.</param>
        /// <param name="certificatesUrl">URL-адреса сертифікатів (опціонально).</param>
        /// <param name="hourlyRate">Погодинна ставка (опціонально).</param>
        /// <param name="workFormat">Формати роботи спеціаліста (опціонально).</param>
        public UserProfessionalQualification(
            Guid userId,
            Guid professionalRoleTypeId,
            string description,
            string? certificatesUrl,
            decimal? hourlyRate,
            List<string>? workFormat = null)
            : base(Guid.NewGuid())
        {
            UserId = userId;
            ProfessionalRoleTypeId = professionalRoleTypeId;
            Description = description;
            CertificatesUrl = certificatesUrl;
            HourlyRate = hourlyRate;
            WorkFormat = workFormat ?? new List<string>();
            Status = QualificationStatus.Pending;
            ApplicationDate = DateTime.UtcNow;
        }

        /// <summary>
        /// Приватний конструктор для EF Core.
        /// </summary>
        /// <param name="userId">Ідентифікатор користувача.</param>
        protected UserProfessionalQualification(Guid userId) : base()
        {
            UserId = userId;
        }
        #endregion

        #region Методи оновлення

        /// <summary>
        /// Встановлює формати роботи спеціаліста.
        /// </summary>
        /// <param name="formats">Колекція форматів роботи.</param>
        public void SetWorkFormat(IEnumerable<string>? formats)
        {
            WorkFormat = formats?.ToList() ?? new List<string>();
            SetUpdatedAt();
        }

        /// <summary>
        /// Оновлює статус кваліфікації та дату схвалення, якщо статус схвалено.
        /// </summary>
        /// <param name="newStatus">Новий статус кваліфікації.</param>
        public void UpdateStatus(QualificationStatus newStatus)
        {
            Status = newStatus;
            if (newStatus == QualificationStatus.Approved)
            {
                ApprovalDate = DateTime.UtcNow;
            }
            SetUpdatedAt();
        }

        /// <summary>
        /// Оновлює погодинну ставку.
        /// </summary>
        /// <param name="newRate">Нова погодинна ставка.</param>
        /// <exception cref="ArgumentOutOfRangeException">Якщо ставка від'ємна.</exception>
        public void UpdateHourlyRate(decimal newRate)
        {
            if (newRate < 0) throw new ArgumentOutOfRangeException(nameof(newRate), "Погодинна ставка не може бути від'ємною.");
            HourlyRate = newRate;
            SetUpdatedAt();
        }

        /// <summary>
        /// Оновлює опис кваліфікації.
        /// </summary>
        /// <param name="newDescription">Новий опис.</param>
        /// <exception cref="ArgumentNullException">Якщо опис є null.</exception>
        public void UpdateDescription(string newDescription)
        {
            Description = newDescription ?? throw new ArgumentNullException(nameof(newDescription));
            SetUpdatedAt();
        }

        /// <summary>
        /// Оновлює URL-адресу сертифікатів.
        /// </summary>
        /// <param name="newUrl">Нова URL-адреса сертифікатів.</param>
        public void UpdateCertificatesUrl(string? newUrl)
        {
            CertificatesUrl = newUrl;
            SetUpdatedAt();
        }

        /// <summary>
        /// Встановлює ідентифікатор деталей лікаря.
        /// </summary>
        /// <param name="doctorDetailsId">Ідентифікатор деталей лікаря.</param>
        public void SetDoctorDetailsId(Guid? doctorDetailsId)
        {
            DoctorDetailsId = doctorDetailsId;
            SetUpdatedAt();
        }

        /// <summary>
        /// Встановлює ідентифікатор деталей дієтолога.
        /// </summary>
        /// <param name="dietitianDetailsId">Ідентифікатор деталей дієтолога.</param>
        public void SetDietitianDetailsId(Guid? dietitianDetailsId)
        {
            DietitianDetailsId = dietitianDetailsId;
            SetUpdatedAt();
        }

        /// <summary>
        /// Встановлює ідентифікатор деталей психолога.
        /// </summary>
        /// <param name="psychologistDetailsId">Ідентифікатор деталей психолога.</param>
        public void SetPsychologistDetailsId(Guid? psychologistDetailsId)
        {
            PsychologistDetailsId = psychologistDetailsId;
            SetUpdatedAt();
        }

        /// <summary>
        /// Встановлює ідентифікатор деталей тренера.
        /// </summary>
        /// <param name="trainerDetailsId">Ідентифікатор деталей тренера.</param>
        public void SetTrainerDetailsId(Guid? trainerDetailsId)
        {
            TrainerDetailsId = trainerDetailsId;
            SetUpdatedAt();
        }
        #endregion
    }
}