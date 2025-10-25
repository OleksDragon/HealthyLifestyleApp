using System;
using System.Collections.Generic;

namespace HealthyLifestyle.Core.Entities
{
    /// <summary>
    /// Сутність, що представляє деталі тренера, включаючи стилі тренувань та додаткову професійну інформацію.
    /// Наслідує RoleSpecificDetail для загальних професійних атрибутів.
    /// </summary>
    public class TrainerDetails : RoleSpecificDetail
    {
        #region Властивості

        /// <summary>
        /// Список стилів тренувань, які використовує тренер (наприклад, йога, силові тренування).
        /// </summary>
        public List<string> TrainingStyle { get; private set; }

        /// <summary>
        /// Список бажаних типів тренувань для клієнтів (наприклад, кардіо, функціональні тренування).
        /// </summary>
        public List<string> PreferredWorkoutStyles { get; private set; }
        #endregion

        #region Конструктори

        /// <summary>
        /// Ініціалізує новий екземпляр деталей тренера з переданими параметрами.
        /// </summary>
        /// <param name="qualificationId">Ідентифікатор професійної кваліфікації.</param>
        /// <param name="trainingStyle">Список стилів тренувань (опціонально).</param>
        /// <param name="preferredWorkoutStyles">Список бажаних типів тренувань (опціонально).</param>
        /// <param name="professionalLicenseNumber">Номер професійної ліцензії (опціонально).</param>
        /// <param name="biography">Біографія тренера (опціонально).</param>
        /// <param name="contactEmail">Контактна електронна пошта (опціонально).</param>
        /// <param name="contactPhone">Контактний номер телефону (опціонально).</param>
        /// <param name="website">Вебсайт тренера (опціонально).</param>
        /// <param name="yearsOfExperience">Роки досвіду (опціонально).</param>
        /// <param name="certifications">Список сертифікатів (опціонально).</param>
        /// <param name="availability">Доступність тренера (опціонально).</param>
        /// <param name="hourlyRate">Погодинна ставка (опціонально).</param>
        /// <param name="clientTestimonials">Відгуки клієнтів (опціонально).</param>
        /// <param name="expertDetailsPictureUrl">URL зображення для детальної сторінки (опціонально).</param>
        /// <param name="cardPictureUrl">URL зображення для картки експерта (опціонально).</param>
        public TrainerDetails(
            Guid qualificationId,
            List<string>? trainingStyle = null,
            List<string>? preferredWorkoutStyles = null,
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
            TrainingStyle = trainingStyle ?? new List<string>();
            PreferredWorkoutStyles = preferredWorkoutStyles ?? new List<string>();
        }

        /// <summary>
        /// Приватний конструктор без параметрів для EF Core.
        /// </summary>
        protected TrainerDetails() : base()
        {
            TrainingStyle = new List<string>();
            PreferredWorkoutStyles = new List<string>();
        }
        #endregion

        #region Методи

        /// <summary>
        /// Оновлює специфічні деталі тренера та викликає методи базового класу для оновлення загальних властивостей.
        /// </summary>
        /// <param name="trainingStyle">Новий список стилів тренувань (опціонально).</param>
        /// <param name="preferredWorkoutStyles">Новий список бажаних типів тренувань (опціонально).</param>
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
        public void UpdateTrainerSpecificDetails(
            List<string>? trainingStyle = null,
            List<string>? preferredWorkoutStyles = null,
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
            // Оновлюємо стилі тренувань ТІЛЬКИ якщо значення передані (не перетираємо при null)
            if (trainingStyle != null)
                TrainingStyle = trainingStyle;

            if (preferredWorkoutStyles != null)
                PreferredWorkoutStyles = preferredWorkoutStyles;

            UpdateProfessionalLicenseNumber(professionalLicenseNumber);
            UpdateBiography(biography ?? Biography);
            UpdateContactEmail(contactEmail);
            UpdateContactPhone(contactPhone);
            UpdateWebsite(website);
            UpdateYearsOfExperience(yearsOfExperience);

            // Оновлюємо сертифікати тільки якщо передані; інакше залишаємо попередні
            if (certifications != null)
                UpdateCertifications(certifications);

            UpdateAvailability(availability);
            if (hourlyRate.HasValue) UpdateHourlyRate(hourlyRate.Value);
            UpdateClientTestimonials(clientTestimonials);

            SetUpdatedAt();
        }
        #endregion
    }
}