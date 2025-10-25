using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace HealthyLifestyle.Core.Entities
{
    /// <summary>
    /// Абстрактна базова сутність для зберігання специфічних деталей професійних ролей.
    /// Містить загальні атрибути, такі як біографія, досвід, сертифікати та контактна інформація.
    /// </summary>
    public abstract class RoleSpecificDetail : BaseEntity
    {
        #region Властивості

        /// <summary>
        /// Біографія професіонала.
        /// </summary>
        public string Biography { get; protected set; } = string.Empty;

        /// <summary>
        /// Кількість років професійного досвіду (опціонально).
        /// </summary>
        public int? YearsOfExperience { get; protected set; }

        /// <summary>
        /// Список сертифікатів професіонала.
        /// </summary>
        public List<string> Certifications { get; protected set; } = new List<string>();

        /// <summary>
        /// Номер професійної ліцензії (опціонально).
        /// </summary>
        public string? ProfessionalLicenseNumber { get; protected set; }

        /// <summary>
        /// Інформація про доступність професіонала (опціонально).
        /// </summary>
        public string? Availability { get; protected set; }

        /// <summary>
        /// Погодинна ставка за послуги (опціонально).
        /// </summary>
        public decimal? HourlyRate { get; protected set; }

        /// <summary>
        /// Контактна електронна пошта (опціонально).
        /// </summary>
        public string? ContactEmail { get; protected set; }

        /// <summary>
        /// Контактний номер телефону (опціонально).
        /// </summary>
        public string? ContactPhone { get; protected set; }

        /// <summary>
        /// Вебсайт професіонала (опціонально).
        /// </summary>
        public string? Website { get; protected set; }

        /// <summary>
        /// Відгуки клієнтів про професіонала (опціонально).
        /// </summary>
        public string? ClientTestimonials { get; protected set; }

        /// <summary>
        /// URL зображення для детальної сторінки експерта (опціонально).
        /// Максимальна довжина — 500 символів; має відповідати формату URL.
        /// </summary>
       
        public string? ExpertDetailsPictureUrl { get; protected set; }

        /// <summary>
        /// URL зображення для картки експерта (прев'ю у списках) (опціонально).
        /// Максимальна довжина — 500 символів; має відповідати формату URL.
        /// </summary>
        public string? CardPictureUrl { get; protected set; }

        /// <summary>
        /// Навігаційна властивість до пов'язаної професійної кваліфікації користувача.
        /// </summary>
        public UserProfessionalQualification? UserProfessionalQualification { get; set; }
        #endregion

        #region Конструктори

        /// <summary>
        /// Ініціалізує новий екземпляр специфічних деталей ролі з переданими параметрами.
        /// </summary>
        /// <param name="id">Ідентифікатор сутності.</param>
        /// <param name="biography">Біографія (опціонально).</param>
        /// <param name="yearsOfExperience">Кількість років досвіду (опціонально).</param>
        /// <param name="certifications">Список сертифікатів (опціонально).</param>
        /// <param name="professionalLicenseNumber">Номер професійної ліцензії (опціонально).</param>
        /// <param name="availability">Доступність (опціонально).</param>
        /// <param name="hourlyRate">Погодинна ставка (опціонально).</param>
        /// <param name="contactEmail">Контактна електронна пошта (опціонально).</param>
        /// <param name="contactPhone">Контактний номер телефону (опціонально).</param>
        /// <param name="website">Вебсайт (опціонально).</param>
        /// <param name="clientTestimonials">Відгуки клієнтів (опціонально).</param>
        /// <param name="expertDetailsPictureUrl">URL зображення для детальної сторінки (опціонально).</param>
        /// <param name="cardPictureUrl">URL зображення для картки експерта (опціонально).</param>
        protected RoleSpecificDetail(
            Guid id,
            string? biography,
            int? yearsOfExperience,
            List<string>? certifications,
            string? professionalLicenseNumber,
            string? availability,
            decimal? hourlyRate,
            string? contactEmail,
            string? contactPhone,
            string? website,
            string? clientTestimonials,
            string? expertDetailsPictureUrl = null,
            string? cardPictureUrl = null)
            : base(id)
        {
            Biography = biography ?? string.Empty;
            YearsOfExperience = yearsOfExperience;
            Certifications = certifications ?? new List<string>();
            ProfessionalLicenseNumber = professionalLicenseNumber;
            Availability = availability;
            HourlyRate = hourlyRate;
            ContactEmail = contactEmail;
            ContactPhone = contactPhone;
            Website = website;
            ClientTestimonials = clientTestimonials;
            ExpertDetailsPictureUrl = expertDetailsPictureUrl;
            CardPictureUrl = cardPictureUrl;
        }

        /// <summary>
        /// Конструктор без параметрів для EF Core.
        /// </summary>
        protected RoleSpecificDetail() : base()
        {
            Certifications = new List<string>();
        }
        #endregion

        #region Методи оновлення

        /// <summary>
        /// Оновлює біографію професіонала.
        /// </summary>
        /// <param name="biography">Нова біографія.</param>
        public void UpdateBiography(string biography)
        {
            Biography = biography;
            SetUpdatedAt();
        }

        /// <summary>
        /// Оновлює кількість років професійного досвіду.
        /// </summary>
        /// <param name="years">Нова кількість років досвіду (опціонально).</param>
        public void UpdateYearsOfExperience(int? years)
        {
            YearsOfExperience = years;
            SetUpdatedAt();
        }

        /// <summary>
        /// Оновлює список сертифікатів.
        /// </summary>
        /// <param name="certifications">Новий список сертифікатів.</param>
        public void UpdateCertifications(List<string> certifications)
        {
            Certifications = certifications ?? new List<string>();
            SetUpdatedAt();
        }

        /// <summary>
        /// Оновлює номер професійної ліцензії.
        /// </summary>
        /// <param name="licenseNumber">Новий номер ліцензії (опціонально).</param>
        public void UpdateProfessionalLicenseNumber(string? licenseNumber)
        {
            ProfessionalLicenseNumber = licenseNumber;
            SetUpdatedAt();
        }

        /// <summary>
        /// Оновлює інформацію про доступність.
        /// </summary>
        /// <param name="availability">Нова інформація про доступність (опціонально).</param>
        public void UpdateAvailability(string? availability)
        {
            Availability = availability;
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
        /// Оновлює контактну електронну пошту.
        /// </summary>
        /// <param name="email">Нова електронна пошта (опціонально).</param>
        public void UpdateContactEmail(string? email)
        {
            ContactEmail = email;
            SetUpdatedAt();
        }

        /// <summary>
        /// Оновлює контактний номер телефону.
        /// </summary>
        /// <param name="phone">Новий номер телефону (опціонально).</param>
        public void UpdateContactPhone(string? phone)
        {
            ContactPhone = phone;
            SetUpdatedAt();
        }

        /// <summary>
        /// Оновлює вебсайт професіонала.
        /// </summary>
        /// <param name="websiteUrl">Нова URL-адреса вебсайту (опціонально).</param>
        public void UpdateWebsite(string? websiteUrl)
        {
            Website = websiteUrl;
            SetUpdatedAt();
        }

        /// <summary>
        /// Оновлює відгуки клієнтів.
        /// </summary>
        /// <param name="testimonials">Нові відгуки клієнтів (опціонально).</param>
        public void UpdateClientTestimonials(string? testimonials)
        {
            ClientTestimonials = testimonials;
            SetUpdatedAt();
        }

        /// <summary>
        /// Оновлює URL зображення для детальної сторінки експерта.
        /// </summary>
        /// <param name="expertDetailsPictureUrl">Новий URL зображення.</param>
        public void UpdateExpertDetailsPictureUrl(string? expertDetailsPictureUrl)
        {
            ExpertDetailsPictureUrl = expertDetailsPictureUrl;
            SetUpdatedAt();
        }

        /// <summary>
        /// Оновлює URL зображення для картки експерта.
        /// </summary>
        /// <param name="cardPictureUrl">Новий URL зображення.</param>
        public void UpdateCardPictureUrl(string? cardPictureUrl)
        {
            CardPictureUrl = cardPictureUrl;
            SetUpdatedAt();
        }

        /// <summary>
        /// Оновлює всі зображення професіонала.
        /// </summary>
        /// <param name="expertDetailsPictureUrl">Новий URL для детальної сторінки.</param>
        /// <param name="cardPictureUrl">Новий URL для картки.</param>
        public void UpdateProfileImages(
            string? expertDetailsPictureUrl = null,
            string? cardPictureUrl = null)
        {
            if (expertDetailsPictureUrl != null)
                ExpertDetailsPictureUrl = expertDetailsPictureUrl;
            
            if (cardPictureUrl != null)
                CardPictureUrl = cardPictureUrl;

            SetUpdatedAt();
        }

        #endregion
    }
}