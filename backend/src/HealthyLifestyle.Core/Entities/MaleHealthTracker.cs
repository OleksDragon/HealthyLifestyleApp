using HealthyLifestyle.Core.Enums;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HealthyLifestyle.Core.Entities
{
    /// <summary>
    /// Трекер чоловічого здоров'я.
    /// Зберігає індивідуальні дані користувача, пов'язані з рівнем тестостерону, енергією та нотатками.
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
        /// Рівень тестостерона користувача (якщо вимірювався).
        /// Може бути null, якщо користувач не вносив дані.
        /// </summary>
        public double? TestosteroneLevel { get; set; }

        /// <summary>
        /// Оцінка рівня енергії користувача за шкалою від 1 до 10.
        /// Може бути null, якщо дані не вказано.
        /// </summary>
        public int? EnergyLevelScore { get; set; }

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

        /// <summary>
        /// Параметризатор за замовчуванням, необхідний для Entity Framework Core.
        /// </summary>
        public MaleHealthTracker() : base()
        {
        }

        /// <summary>
        /// Ініціалізує новий екземпляр трекера мужского здоровья для заданого користувача.
        /// </summary>
        /// <param name="userId">Ідентифікатор користувача.</param>
        /// <exception cref="ArgumentException">Виникає, якщо ідентифікатор користувача є порожнім.</exception>
        public MaleHealthTracker(Guid userId) : this()
        {
            if (userId == Guid.Empty)
                throw new ArgumentException("Ідентифікатор користувача не може бути порожнім.", nameof(userId));

            UserId = userId;
            SetUpdatedAt();
        }

        #endregion

        #region Методи

        /// <summary>
        /// Оновлює дані трекера з новими значеннями (опціонально).
        /// </summary>
        /// <param name="testosteroneLevel">Новий рівень тестостерона (опціонально).</param>
        /// <param name="energyLevelScore">Нова оцінка рівня енергії (опціонально).</param>
        /// <param name="notes">Нові примітки (опціонально).</param>
        /// <exception cref="ArgumentException">Виникає, якщо передані недійсні значення (наприклад, оцінка енергії поза діапазоном 1-10).</exception>
        public void UpdateTracker(double? testosteroneLevel = null, int? energyLevelScore = null, string? notes = null)
        {
            if (energyLevelScore.HasValue && (energyLevelScore.Value < 1 || energyLevelScore.Value > 10))
                throw new ArgumentException("Оцінка рівня енергії повинна бути в діапазоні від 1 до 10.", nameof(energyLevelScore));
            if (testosteroneLevel.HasValue && testosteroneLevel.Value < 0)
                throw new ArgumentException("Рівень тестостерона не може бути від’ємним.", nameof(testosteroneLevel));

            if (testosteroneLevel.HasValue) TestosteroneLevel = testosteroneLevel.Value;
            if (energyLevelScore.HasValue) EnergyLevelScore = energyLevelScore.Value;
            if (notes != null) Notes = notes;
            SetUpdatedAt();
        }

        #endregion
    }
}