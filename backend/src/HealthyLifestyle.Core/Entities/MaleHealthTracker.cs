using HealthyLifestyle.Core.Enums;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HealthyLifestyle.Core.Entities
{
    /// <summary>
    /// Трекер чоловічого здоров'я.
    /// Зберігає індивідуальні дані користувача, пов'язані з гормонами та нотатками.
    /// Успадкований від базового класу <see cref="BaseEntity"/>.
    /// </summary>
    public class MaleHealthTracker : BaseEntity
    {
        #region Властивості

        /// <summary>
        /// Первинний ключ. Також є зовнішнім ключем до таблиці Users.
        /// </summary>
        [Key]
        [ForeignKey(RoleNames.User)]
        public Guid UserId { get; set; }

        /// <summary>
        /// Дата останнього оновлення або запису даних трекера.
        /// Автоматично встановлюється при створенні або оновленні.
        /// </summary>
        public DateTime RecordDate { get; set; }

        /// <summary>
        /// Рівень загального тестостерону користувача (якщо вимірювався).
        /// </summary>
        public double? TestosteroneLevel { get; set; }

        /// <summary>
        /// Рівень вільного тестостерону користувача (якщо вимірювався).
        /// </summary>
        public double? FreeTestosterone { get; set; }

        /// <summary>
        /// Рівень ЛГ (лютеїнізуючого гормону).
        /// </summary>
        public double? LH { get; set; }

        /// <summary>
        /// Рівень пролактину.
        /// </summary>
        public double? Prolactin { get; set; }

        /// <summary>
        /// Рівень естрадіолу.
        /// </summary>
        public double? Estradiol { get; set; }

        /// <summary>
        /// Рівень ФСГ (фолікулостимулюючого гормону).
        /// </summary>
        public double? FSH { get; set; }

        /// <summary>
        /// Додаткові примітки користувача.
        /// Може бути null.
        /// </summary>
        public string? Notes { get; set; }

        #endregion

        #region Навігаційні властивості

        /// <summary>
        /// Навигационное свойство для связи с пользователем, которому принадлежит трекер.
        /// </summary>
        [ForeignKey("UserId")]
        public virtual User User { get; set; } = null!;

        #endregion

        #region Конструктори

        public MaleHealthTracker() : base()
        {
        }

        public MaleHealthTracker(Guid userId) : this()
        {
            if (userId == Guid.Empty)
                throw new ArgumentException("Ідентифікатор користувача не може бути порожнім.", nameof(userId));

            UserId = userId;
        }

        #endregion

        #region Методи

        /// <summary>
        /// Оновлює дані трекера з новими значеннями (опціонально).
        /// </summary>
        public void UpdateTracker(
            double? testosteroneLevel = null,
            double? freeTestosterone = null,
            double? lh = null,
            double? prolactin = null,
            double? estradiol = null,
            double? fsh = null,
            string? notes = null)
        {
            if (testosteroneLevel.HasValue && testosteroneLevel.Value < 0)
                throw new ArgumentException("Рівень тестостерона не може бути від’ємним.", nameof(testosteroneLevel));
            if (freeTestosterone.HasValue && freeTestosterone.Value < 0)
                throw new ArgumentException("Рівень вільного тестостерона не може бути від’ємним.", nameof(freeTestosterone));
            if (lh.HasValue && lh.Value < 0)
                throw new ArgumentException("Рівень ЛГ не може бути від’ємним.", nameof(lh));
            if (prolactin.HasValue && prolactin.Value < 0)
                throw new ArgumentException("Рівень пролактину не може бути від’ємним.", nameof(prolactin));
            if (estradiol.HasValue && estradiol.Value < 0)
                throw new ArgumentException("Рівень естрадіолу не може бути від’ємним.", nameof(estradiol));
            if (fsh.HasValue && fsh.Value < 0)
                throw new ArgumentException("Рівень ФСГ не може бути від’ємним.", nameof(fsh));

            if (testosteroneLevel.HasValue) TestosteroneLevel = testosteroneLevel.Value;
            if (freeTestosterone.HasValue) FreeTestosterone = freeTestosterone.Value;
            if (lh.HasValue) LH = lh.Value;
            if (prolactin.HasValue) Prolactin = prolactin.Value;
            if (estradiol.HasValue) Estradiol = estradiol.Value;
            if (fsh.HasValue) FSH = fsh.Value;
            if (notes != null) Notes = notes;

            SetUpdatedAt();
        }

        #endregion
    }
}
