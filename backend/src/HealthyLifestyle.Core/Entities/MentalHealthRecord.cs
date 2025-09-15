using HealthyLifestyle.Core.Enums;
using System;
using System.Collections.Generic;

namespace HealthyLifestyle.Core.Entities
{
    /// <summary>
    /// Запис про ментальне здоров'я користувача.
    /// Містить дані про медитацію, дихальні практики, рівні стресу/тривожності та додаткові фактори.
    /// Успадкований від базового класу <see cref="BaseEntity"/>.
    /// </summary>
    public class MentalHealthRecord : BaseEntity
    {
        #region Властивості

        /// <summary>
        /// Ідентифікатор користувача, якому належить запис.
        /// </summary>
        public Guid UserId { get; set; }

        /// <summary>
        /// Дата створення або останнього оновлення запису.
        /// </summary>
        public DateTime RecordDate { get; set; }

        /// <summary>
        /// Тривалість медитації (у хвилинах).
        /// </summary>
        public int MeditationDurationMinutes { get; set; }

        /// <summary>
        /// Тривалість дихальних практик (у хвилинах).
        /// </summary>
        public int BreathingPracticeDurationMinutes { get; set; }

        /// <summary>
        /// Рівень стресу за шкалою від 1 до 10.
        /// </summary>
        public int StressLevelScore { get; set; }

        /// <summary>
        /// Рівень тривожності за шкалою від 1 до 10.
        /// </summary>
        public int AnxietyLevelScore { get; set; }

        /// <summary>
        /// Почуття користувача (наприклад, радість, смуток, злість).
        /// </summary>
        public string? Feeling { get; set; }

        /// <summary>
        /// Причина виникнення цього почуття.
        /// </summary>
        public string? Cause { get; set; }

        /// <summary>
        /// Фактори, які могли вплинути на почуття.
        /// </summary>
        public List<MentalHealthFactor> Factors { get; set; } = new();

        /// <summary>
        /// Додаткові примітки користувача (опціонально).
        /// </summary>
        public string? Notes { get; set; }

        #endregion

        #region Навігаційні властивості

        /// <summary>
        /// Навігаційне властивість для зв'язку з користувачем, якому належить запис.
        /// </summary>
        public virtual User User { get; set; } = null!;

        #endregion

        #region Конструктори

        public MentalHealthRecord() : base()
        {
        }

        public MentalHealthRecord(
            Guid userId,
            DateTime recordDate,
            int meditationDurationMinutes,
            int breathingPracticeDurationMinutes,
            int stressLevelScore,
            int anxietyLevelScore,
            string? feeling = null,
            string? cause = null,
            List<MentalHealthFactor>? factors = null,
            string? notes = null
        ) : this()
        {
            if (userId == Guid.Empty)
                throw new ArgumentException("Ідентифікатор користувача не може бути порожнім.", nameof(userId));
            if (meditationDurationMinutes < 0)
                throw new ArgumentException("Тривалість медитації не може бути від’ємною.", nameof(meditationDurationMinutes));
            if (breathingPracticeDurationMinutes < 0)
                throw new ArgumentException("Тривалість дихальних практик не може бути від’ємною.", nameof(breathingPracticeDurationMinutes));
            if (stressLevelScore < 1 || stressLevelScore > 10)
                throw new ArgumentException("Рівень стресу повинен бути в діапазоні від 1 до 10.", nameof(stressLevelScore));
            if (anxietyLevelScore < 1 || anxietyLevelScore > 10)
                throw new ArgumentException("Рівень тривожності повинен бути в діапазоні від 1 до 10.", nameof(anxietyLevelScore));

            UserId = userId;
            RecordDate = recordDate;
            MeditationDurationMinutes = meditationDurationMinutes;
            BreathingPracticeDurationMinutes = breathingPracticeDurationMinutes;
            StressLevelScore = stressLevelScore;
            AnxietyLevelScore = anxietyLevelScore;
            Feeling = feeling;
            Cause = cause;
            Factors = factors ?? new List<MentalHealthFactor>();
            Notes = notes;
        }

        #endregion

        #region Методи

        public void UpdateRecord(
            DateTime? recordDate = null,
            int? meditationDurationMinutes = null,
            int? breathingPracticeDurationMinutes = null,
            int? stressLevelScore = null,
            int? anxietyLevelScore = null,
            string? feeling = null,
            string? cause = null,
            List<MentalHealthFactor>? factors = null,
            string? notes = null)
        {
            if (meditationDurationMinutes.HasValue && meditationDurationMinutes.Value < 0)
                throw new ArgumentException("Тривалість медитації не може бути від’ємною.", nameof(meditationDurationMinutes));
            if (breathingPracticeDurationMinutes.HasValue && breathingPracticeDurationMinutes.Value < 0)
                throw new ArgumentException("Тривалість дихальних практик не може бути від’ємною.", nameof(breathingPracticeDurationMinutes));
            if (stressLevelScore.HasValue && (stressLevelScore.Value < 1 || stressLevelScore.Value > 10))
                throw new ArgumentException("Рівень стресу повинен бути в діапазоні від 1 до 10.", nameof(stressLevelScore));
            if (anxietyLevelScore.HasValue && (anxietyLevelScore.Value < 1 || anxietyLevelScore.Value > 10))
                throw new ArgumentException("Рівень тривожності повинен бути в діапазоні від 1 до 10.", nameof(anxietyLevelScore));

            if (recordDate.HasValue) RecordDate = recordDate.Value;
            if (meditationDurationMinutes.HasValue) MeditationDurationMinutes = meditationDurationMinutes.Value;
            if (breathingPracticeDurationMinutes.HasValue) BreathingPracticeDurationMinutes = breathingPracticeDurationMinutes.Value;
            if (stressLevelScore.HasValue) StressLevelScore = stressLevelScore.Value;
            if (anxietyLevelScore.HasValue) AnxietyLevelScore = anxietyLevelScore.Value;
            if (feeling != null) Feeling = feeling;
            if (cause != null) Cause = cause;
            if (factors != null) Factors = factors;
            if (notes != null) Notes = notes;

            SetUpdatedAt();
        }

        public int CalculateTotalRelaxationDuration()
        {
            return MeditationDurationMinutes + BreathingPracticeDurationMinutes;
        }

        #endregion
    }
}
