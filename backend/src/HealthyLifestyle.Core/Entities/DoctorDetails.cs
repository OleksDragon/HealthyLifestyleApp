using System;
using System.Collections.Generic;

namespace HealthyLifestyle.Core.Entities
{
    /// <summary>
    /// Сутність, що представляє деталі лікаря, включаючи спеціалізації та приналежність до клініки.
    /// Наслідує RoleSpecificDetail для загальних професійних атрибутів.
    /// </summary>
    public class DoctorDetails : RoleSpecificDetail
    {
        #region Властивості

        /// <summary>
        /// Список спеціалізацій лікаря (наприклад, кардіологія, неврологія).
        /// </summary>
        public List<string> Specializations { get; private set; }

        /// <summary>
        /// Назва клініки, з якою пов’язаний лікар (опціонально).
        /// </summary>
        public string? ClinicAffiliation { get; private set; }
        #endregion

        #region Конструктори

        /// <summary>
        /// Ініціалізує новий екземпляр деталей лікаря з переданими параметрами.
        /// </summary>
        /// <param name="qualificationId">Ідентифікатор професійної кваліфікації.</param>
        /// <param name="biography">Біографія лікаря (опціонально).</param>
        /// <param name="yearsOfExperience">Роки досвіду (опціонально).</param>
        /// <param name="certifications">Список сертифікатів (опціонально).</param>
        /// <param name="professionalLicenseNumber">Номер професійної ліцензії (опціонально).</param>
        /// <param name="availability">Доступність лікаря (опціонально).</param>
        /// <param name="hourlyRate">Погодинна ставка (опціонально).</param>
        /// <param name="contactEmail">Контактна електронна пошта (опціонально).</param>
        /// <param name="contactPhone">Контактний номер телефону (опціонально).</param>
        /// <param name="website">Вебсайт лікаря (опціонально).</param>
        /// <param name="clientTestimonials">Відгуки клієнтів (опціонально).</param>
        /// <param name="specializations">Список спеціалізацій (опціонально).</param>
        /// <param name="clinicAffiliation">Назва клініки (опціонально).</param>
        /// <param name="expertDetailsPictureUrl">URL зображення для детальної сторінки (опціонально).</param>
        /// <param name="cardPictureUrl">URL зображення для картки експерта (опціонально).</param>
        public DoctorDetails(
            Guid qualificationId,
            string? biography = null,
            int? yearsOfExperience = null,
            List<string>? certifications = null,
            string? professionalLicenseNumber = null,
            string? availability = null,
            decimal? hourlyRate = null,
            string? contactEmail = null,
            string? contactPhone = null,
            string? website = null,
            string? clientTestimonials = null,
            List<string>? specializations = null,
            string? clinicAffiliation = null,
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
            ClinicAffiliation = clinicAffiliation;
        }

        /// <summary>
        /// Приватний конструктор без параметрів для EF Core.
        /// </summary>
        protected DoctorDetails() : base()
        {
            Specializations = new List<string>();
            ClinicAffiliation = string.Empty;
        }
        #endregion

        #region Методи

        /// <summary>
        /// Оновлює специфічні деталі лікаря та викликає методи базового класу для оновлення загальних властивостей.
        /// </summary>
        /// <param name="specializations">Новий список спеціалізацій (опціонально).</param>
        /// <param name="clinicAffiliation">Нова назва клініки (опціонально).</param>
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
        public void UpdateDoctorSpecificDetails(
            List<string>? specializations = null,
            string? clinicAffiliation = null,
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
            ClinicAffiliation = clinicAffiliation ?? ClinicAffiliation;

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