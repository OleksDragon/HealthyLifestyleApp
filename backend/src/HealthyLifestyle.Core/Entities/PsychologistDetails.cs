using System;
using System.Collections.Generic;

namespace HealthyLifestyle.Core.Entities
{
    /// <summary>
    /// Сутність, що представляє деталі психолога, включаючи спеціалізації та терапевтичні підходи.
    /// Наслідує RoleSpecificDetail для загальних професійних атрибутів.
    /// </summary>
    public class PsychologistDetails : RoleSpecificDetail
    {
        #region Властивості

        /// <summary>
        /// Список спеціалізацій психолога (наприклад, когнітивно-поведінкова терапія, сімейна психологія).
        /// </summary>
        public List<string> Specializations { get; private set; }

        /// <summary>
        /// Список терапевтичних підходів, які використовує психолог (наприклад, гештальт-терапія, психоаналіз).
        /// </summary>
        public List<string> TherapyApproaches { get; private set; }
        #endregion

        #region Конструктори

        /// <summary>
        /// Ініціалізує новий екземпляр деталей психолога з переданими параметрами.
        /// </summary>
        /// <param name="qualificationId">Ідентифікатор професійної кваліфікації.</param>
        /// <param name="specializations">Список спеціалізацій (опціонально).</param>
        /// <param name="therapyApproaches">Список терапевтичних підходів (опціонально).</param>
        /// <param name="professionalLicenseNumber">Номер професійної ліцензії (опціонально).</param>
        /// <param name="biography">Біографія психолога (опціонально).</param>
        /// <param name="contactEmail">Контактна електронна пошта (опціонально).</param>
        /// <param name="contactPhone">Контактний номер телефону (опціонально).</param>
        /// <param name="website">Вебсайт психолога (опціонально).</param>
        /// <param name="yearsOfExperience">Роки досвіду (опціонально).</param>
        /// <param name="certifications">Список сертифікатів (опціонально).</param>
        /// <param name="availability">Доступність психолога (опціонально).</param>
        /// <param name="hourlyRate">Погодинна ставка (опціонально).</param>
        /// <param name="clientTestimonials">Відгуки клієнтів (опціонально).</param>
        /// <param name="expertDetailsPictureUrl">URL зображення для детальної сторінки (опціонально).</param>
        /// <param name="cardPictureUrl">URL зображення для картки експерта (опціонально).</param>
        public PsychologistDetails(
            Guid qualificationId,
            List<string>? specializations = null,
            List<string>? therapyApproaches = null,
            string? professionalLicenseNumber = null,
            string? biography = null,
            string? contactEmail = null,
            string? contactPhone = null,
            string? website = null,
            int? yearsOfExperience = null,
            List<string>? certifications = null,
            string? availability = null,
            decimal? hourlyRate = null,
            string? clientTestimonials = null,
            string? expertDetailsPictureUrl = null,
            string? cardPictureUrl = null)
            : base(qualificationId,
                   biography,
                   yearsOfExperience,
                   certifications,
                   professionalLicenseNumber,
                   availability,
                   hourlyRate ?? 0m,
                   contactEmail,
                   contactPhone,
                   website,
                   clientTestimonials,
                   expertDetailsPictureUrl,
                   cardPictureUrl)
        {
            Specializations = specializations ?? new List<string>();
            TherapyApproaches = therapyApproaches ?? new List<string>();
        }

        /// <summary>
        /// Приватний конструктор без параметрів для EF Core.
        /// </summary>
        protected PsychologistDetails() : base()
        {
            Specializations = new List<string>();
            TherapyApproaches = new List<string>();
        }
        #endregion

        #region Методи

        /// <summary>
        /// Оновлює специфічні деталі психолога та викликає методи базового класу для оновлення загальних властивостей.
        /// </summary>
        /// <param name="specializations">Новий список спеціалізацій (опціонально).</param>
        /// <param name="therapyApproaches">Новий список терапевтичних підходів (опціонально).</param>
        /// <param name="professionalLicenseNumber">Новий номер професійної ліцензії (опціонально).</param>
        /// <param name="biography">Нова біографія (опціонально).</param>
        /// <param name="contactEmail">Нова контактна електронна пошта (опціонально).</param>
        /// <param name="contactPhone">Новий контактний номер телефону (опціонально).</param>
        /// <param name="website">Новий вебсайт (опціонально).</param>
        /// <param name="yearsOfExperience">Нова кількість років досвіду (опціонально).</param>
        /// <param name="certifications">Новий список сертифікатів (опціонально).</param>
        /// <param name="availability">Нова доступність (опціонально).</param>
        /// <param name="hourlyRate">Нова погодинна ставка (опціонально).</param>
        /// <param name="clientTestimonials">Нові відгуки клієнтів (опціонально).</param>
        public void UpdatePsychologistSpecificDetails(
            List<string>? specializations = null,
            List<string>? therapyApproaches = null,
            string? professionalLicenseNumber = null,
            string? biography = null,
            string? contactEmail = null,
            string? contactPhone = null,
            string? website = null,
            int? yearsOfExperience = null,
            List<string>? certifications = null,
            string? availability = null,
            decimal? hourlyRate = null,
            string? clientTestimonials = null)
        {
            Specializations = specializations ?? Specializations;
            TherapyApproaches = therapyApproaches ?? TherapyApproaches;

            UpdateProfessionalLicenseNumber(professionalLicenseNumber);
            UpdateBiography(biography ?? Biography);
            UpdateContactEmail(contactEmail);
            UpdateContactPhone(contactPhone);
            UpdateWebsite(website);
            UpdateYearsOfExperience(yearsOfExperience);
            UpdateCertifications(certifications ?? Certifications);
            UpdateAvailability(availability);
            if (hourlyRate.HasValue) UpdateHourlyRate(hourlyRate.Value);
            UpdateClientTestimonials(clientTestimonials);

            SetUpdatedAt();
        }
        #endregion
    }
}