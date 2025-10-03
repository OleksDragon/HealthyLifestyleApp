using HealthyLifestyle.Core.Enums;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HealthyLifestyle.Core.Entities
{
    /// <summary>
    /// Досягнення користувача (наприклад, завершений челендж, рекорд у спорті тощо).
    /// </summary>
    public class Achievement : BaseEntity
    {
        #region Властивості

        /// <summary>
        /// Назва досягнення.
        /// </summary>
        [Required, MaxLength(200)]
        public string Title { get; set; } = string.Empty;

        /// <summary>
        /// Короткий опис досягнення.
        /// </summary>
        [MaxLength(1000)]
        public string? Description { get; set; }

        /// <summary>
        /// Дата та час отримання досягнення.
        /// </summary>
        public DateTime AchievedDate { get; set; } = DateTime.UtcNow;

        /// <summary>
        /// Ідентифікатор користувача, який отримав досягнення.
        /// </summary>
        [ForeignKey(nameof(User))]
        public Guid UserId { get; set; }

        /// <summary>
        /// Тип досягнення.
        /// </summary>
        public AchievementType Type { get; set; }

        /// <summary>
        /// Іконка, яка відображається в UI.
        /// </summary>
        public AP_Icon Icon { get; set; }

        /// <summary>
        /// Тривалість у хвилинах (наприклад, для тренування).
        /// </summary>
        public int? Duration { get; set; }

        /// <summary>
        /// Кількість спалених калорій.
        /// </summary>
        public int? Calories { get; set; }

        /// <summary>
        /// Значення (дистанція, вага тощо).
        /// </summary>
        public decimal? Value { get; set; }

        #endregion

        #region Навігаційні властивості

        /// <summary>
        /// Користувач, який отримав досягнення.
        /// </summary>
        public virtual User User { get; set; } = null!;

        #endregion

        #region Конструктори

        public Achievement() : base() 
        { 
        }

        public Achievement(Guid userId, string title, AchievementType type, AP_Icon icon, string? description = null) : this()
        {
            if (userId == Guid.Empty)
                throw new ArgumentException("Ідентифікатор користувача не може бути порожнім.", nameof(userId));

            UserId = userId;
            Title = title;
            Type = type;
            Icon = icon;
            Description = description;
            AchievedDate = DateTime.UtcNow;
        }

        #endregion
    }
}
