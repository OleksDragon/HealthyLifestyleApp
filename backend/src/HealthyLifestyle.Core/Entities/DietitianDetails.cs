﻿using System;
using System.Collections.Generic;

namespace HealthyLifestyle.Core.Entities
{
    /// <summary>
    /// Сутність, що представляє деталі дієтолога, включаючи спеціалізації та підхід до харчування.
    /// Наслідує RoleSpecificDetail для загальних професійних атрибутів.
    /// </summary>
    public class DietitianDetails : RoleSpecificDetail
    {
        #region Властивості

        /// <summary>
        /// Список спеціалізацій дієтолога (наприклад, спортивне харчування, веганська дієта).
        /// </summary>
        public List<string> Specializations { get; private set; }

        /// <summary>
        /// Підхід до харчування, який використовує дієтолог (опціонально).
        /// </summary>
        public string? NutritionalApproach { get; private set; }
        #endregion

        #region Конструктори

        /// <summary>
        /// Ініціалізує новий екземпляр деталей дієтолога з переданими параметрами.
        /// </summary>
        /// <param name="qualificationId">Ідентифікатор професійної кваліфікації.</param>
        /// <param name="biography">Біографія дієтолога (опціонально).</param>
        /// <param name="yearsOfExperience">Роки досвіду (опціонально).</param>
        /// <param name="certifications">Список сертифікатів (опціонально).</param>
        /// <param name="professionalLicenseNumber">Номер професійної ліцензії (опціонально).</param>
        /// <param name="availability">Доступність дієтолога (опціонально).</param>
        /// <param name="hourlyRate">Погодинна ставка (опціонально).</param>
        /// <param name="contactEmail">Контактна електронна пошта (опціонально).</param>
        /// <param name="contactPhone">Контактний номер телефону (опціонально).</param>
        /// <param name="website">Вебсайт дієтолога (опціонально).</param>
        /// <param name="clientTestimonials">Відгуки клієнтів (опціонально).</param>
        /// <param name="specializations">Список спеціалізацій (опціонально).</param>
        /// <param name="nutritionalApproach">Підхід до харчування (опціонально).</param>
        public DietitianDetails(
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
            string? nutritionalApproach = null)
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
                   clientTestimonials)
        {
            Specializations = specializations ?? new List<string>();
            NutritionalApproach = nutritionalApproach;
        }

        /// <summary>
        /// Приватний конструктор без параметрів для EF Core.
        /// </summary>
        protected DietitianDetails() : base()
        {
            Specializations = new List<string>();
            NutritionalApproach = string.Empty;
        }
        #endregion

        #region Методи

        /// <summary>
        /// Оновлює специфічні деталі дієтолога та викликає методи базового класу для оновлення загальних властивостей.
        /// </summary>
        /// <param name="specializations">Новий список спеціалізацій (опціонально).</param>
        /// <param name="nutritionalApproach">Новий підхід до харчування (опціонально).</param>
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
        public void UpdateDietitianSpecificDetails(
            List<string>? specializations = null,
            string? nutritionalApproach = null,
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
            NutritionalApproach = nutritionalApproach ?? NutritionalApproach;

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