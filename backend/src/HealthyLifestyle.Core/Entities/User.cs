using HealthyLifestyle.Core.Enums;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace HealthyLifestyle.Core.Entities
{
    /// <summary>
    /// Клас, який представляє користувача системи, успадкований від IdentityUser з використанням Guid як типу ключа.
    /// </summary>
    public class User : IdentityUser<Guid>
    {
        #region Властивості

        /// <summary>
        /// Повне ім'я користувача.
        /// </summary>
        public string FullName { get; set; } = string.Empty;

        /// <summary>
        /// Дата народження користувача.
        /// </summary>
        public DateTime? DateOfBirth { get; set; }

        /// <summary>
        /// Стать користувача (чоловіча, жіноча або інше).
        /// </summary>
        public Gender? Gender { get; set; }

        /// <summary>
        /// Вага користувача в кілограмах.
        /// </summary>
        public double Weight { get; set; } = 0;

        /// <summary>
        /// Зріст користувача в сантиметрах.
        /// </summary>
        public double Height { get; set; } = 0;

        /// <summary>
        /// URL зображення профілю користувача (опціонально).
        /// </summary>
        public string? ProfilePictureUrl { get; set; }

        /// <summary>
        /// Короткий опис або біографія користувача (опціонально).
        /// </summary>
        public string? Bio { get; set; }

        /// <summary>
        /// Дата та час створення запису користувача.
        /// Ініціалізується автоматично при створенні.
        /// </summary>
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        /// <summary>
        /// Дата та час останнього оновлення запису користувача.
        /// Ініціалізується автоматично при створенні.
        /// </summary>
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

        /// <summary>
        /// Номер телефону користувача
        /// </summary>
        public string? Phone { get; set; }

        /// <summary>
        /// Країна проживання
        /// </summary>
        [StringLength(100)]
        public string? Country { get; set; }

        /// <summary>
        /// Місто проживання
        /// </summary>
        [StringLength(100)]
        public string? City { get; set; }

        /// <summary>
        /// Вулиця проживання
        /// </summary>
        [StringLength(200)]
        public string? Street { get; set; }

       
        #endregion

        #region Навігаційні властивості

        /// <summary>
        /// Панель здоров'я, пов'язана з користувачем (опціонально).
        /// </summary>
        public virtual HealthDashboard? HealthDashboard { get; set; }

        /// <summary>
        /// Колекція підписок користувача.
        /// </summary>
        public virtual ICollection<Subscription> Subscriptions { get; set; } = new List<Subscription>();

        /// <summary>
        /// Колекція фізичних активностей користувача.
        /// </summary>
        public virtual ICollection<FitnessActivity> FitnessActivities { get; set; } = new List<FitnessActivity>();

        /// <summary>
        /// Колекція консультацій, де користувач виступає клієнтом.
        /// </summary>
        public virtual ICollection<Consultation> ConsultationsAsClient { get; set; } = new List<Consultation>();

        /// <summary>
        /// Колекція консультацій, де користувач виступає професіоналом.
        /// </summary>
        public virtual ICollection<Consultation> ConsultationsAsProfessional { get; set; } = new List<Consultation>();

        /// <summary>
        /// Колекція записів про харчування користувача.
        /// </summary>
        public virtual ICollection<MealEntry> MealEntries { get; set; } = new List<MealEntry>();

        /// <summary>
        /// Колекція планів харчування, пов'язаних з користувачем.
        /// </summary>
        public virtual ICollection<DietPlan> DietPlans { get; set; } = new List<DietPlan>();

        /// <summary>
        /// Колекція замовлень користувача.
        /// </summary>
        public virtual ICollection<Order> Orders { get; set; } = new List<Order>();

        /// <summary>
        /// Колекція соціальних викликів, створених користувачем.
        /// </summary>
        public virtual ICollection<SocialChallenge> CreatedChallenges { get; set; } = new List<SocialChallenge>();

        /// <summary>
        /// Колекція участей користувача в соціальних викликах.
        /// </summary>
        public virtual ICollection<UserChallengeParticipation> ChallengeParticipations { get; set; } = new List<UserChallengeParticipation>();

        /// <summary>
        /// Колекція груп, створених користувачем.
        /// </summary>
        public virtual ICollection<Group> CreatedGroups { get; set; } = new List<Group>();

        /// <summary>
        /// Колекція членств користувача в групах.
        /// </summary>
        public virtual ICollection<GroupMembership> GroupMemberships { get; set; } = new List<GroupMembership>();

        /// <summary>
        /// Колекція записів про психічне здоров'я користувача.
        /// </summary>
        public virtual ICollection<MentalHealthRecord> MentalHealthRecords { get; set; } = new List<MentalHealthRecord>();

        /// <summary>
        /// Колекція записів про сон користувача.
        /// </summary>
        public virtual ICollection<SleepRecord> SleepRecords { get; set; } = new List<SleepRecord>();

        /// <summary>
        /// Колекція сповіщень, пов'язаних з користувачем.
        /// </summary>
        public virtual ICollection<Notification> Notifications { get; set; } = new List<Notification>();

        /// <summary>
        /// Колекція професійних кваліфікацій користувача.
        /// </summary>
        public virtual ICollection<UserProfessionalQualification> ProfessionalQualifications { get; set; } = new List<UserProfessionalQualification>();

        /// <summary>
        /// Трекер здоров'я для жінок (опціонально).
        /// </summary>
        public virtual FemaleHealthTracker? FemaleHealthTracker { get; set; }

        /// <summary>
        /// Трекер здоров'я для чоловіків (опціонально).
        /// </summary>
        public virtual MaleHealthTracker? MaleHealthTracker { get; set; }

        #endregion

        #region Конструктори

        /// <summary>
        /// Параметризатор без параметрів для використання ORM (наприклад, Entity Framework).
        /// </summary>
        public User()
        {
        }

        /// <summary>
        /// Конструктор для створення нового користувача з базовими даними.
        /// </summary>
        /// <param name="email">Електронна пошта користувача.</param>
        /// <param name="fullName">Повне ім'я користувача.</param>
        /// <param name="dateOfBirth">Дата народження.</param>
        /// <param name="gender">Стать користувача.</param>
        /// <param name="weight">Вага в кілограмах.</param>
        /// <param name="height">Зріст в сантиметрах.</param>
        /// <param name="userType">Тип користувача (за замовчуванням User).</param>
        public User(string email, string fullName, DateTime dateOfBirth, Gender gender,
               double weight, double height, string? phone = null, string? country = null,
               string? city = null, string? street = null)
        {
            Id = Guid.NewGuid();
            Email = email;
            UserName = email;
            FullName = fullName;
            DateOfBirth = dateOfBirth;
            Gender = gender;
            Weight = weight;
            Height = height;
            Phone = phone;
            Country = country;
            City = city;
            Street = street;
            CreatedAt = DateTime.UtcNow;
            UpdatedAt = DateTime.UtcNow;
        }

        #endregion

        #region Методи

        /// <summary>
        /// Оновлює профіль користувача з новими даними (опціонально).
        /// </summary>
        /// <param name="fullName">Нове повне ім'я (опціонально).</param>
        /// <param name="dateOfBirth">Нова дата народження (опціонально).</param>
        /// <param name="gender">Нова стать (опціонально).</param>
        /// <param name="weight">Нова вага (опціонально).</param>
        /// <param name="height">Новий зріст (опціонально).</param>
        /// <param name="profilePictureUrl">Новий URL зображення профілю (опціонально).</param>
        /// <param name="bio">Нова біографія (опціонально).</param>
        public void UpdateProfile(string? fullName = null, DateTime? dateOfBirth = null,
                             Gender? gender = null, double? weight = null, double? height = null,
                             string? profilePictureUrl = null, string? bio = null,
                             string? phone = null, string? country = null,
                             string? city = null, string? street = null)
        {
            if (fullName != null) FullName = fullName;
            if (dateOfBirth != null) DateOfBirth = dateOfBirth.Value;
            if (gender != null) Gender = gender.Value;
            if (weight != null) Weight = weight.Value;
            if (height != null) Height = height.Value;
            if (profilePictureUrl != null) ProfilePictureUrl = profilePictureUrl;
            if (bio != null) Bio = bio;
            if (phone != null) Phone = phone;
            if (country != null) Country = country;
            if (city != null) City = city;
            if (street != null) Street = street;

            UpdatedAt = DateTime.UtcNow;
        }

        #endregion
    }
}