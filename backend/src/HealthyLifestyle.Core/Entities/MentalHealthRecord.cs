using System;

namespace HealthyLifestyle.Core.Entities
{
    /// <summary>
    /// Запис про ментальне здоров'я користувача.
    /// Містить дані про медитацію, дихальні практики та рівні стресу/тривожності.
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
        /// Додаткові примітки користувача (опціонально).
        /// </summary>
        public string? Notes { get; set; }

        #endregion

        #region Навігаційні властивості

        /// <summary>
        /// Навигационное свойство для связи з пользователем, якому належить запис.
        /// </summary>
        public virtual User User { get; set; } = null!;

        #endregion

        #region Конструктори

        /// <summary>
        /// Параметризатор за замовчуванням, необхідний для Entity Framework Core.
        /// </summary>
        public MentalHealthRecord() : base()
        {
        }

        /// <summary>
        /// Ініціалізує новий екземпляр запису про ментальне здоров’я з базовими даними.
        /// </summary>
        /// <param name="userId">Ідентифікатор користувача.</param>
        /// <param name="recordDate">Дата та час створення запису.</param>
        /// <param name="meditationDurationMinutes">Тривалість медитації (у хвилинах).</param>
        /// <param name="breathingPracticeDurationMinutes">Тривалість дихальних практик (у хвилинах).</param>
        /// <param name="stressLevelScore">Рівень стресу (1-10).</param>
        /// <param name="anxietyLevelScore">Рівень тривожності (1-10).</param>
        /// <param name="notes">Додаткові примітки (опціонально).</param>
        /// <exception cref="ArgumentException">Виникає, якщо передані недійсні дані (наприклад, від’ємні значення або оцінки поза діапазоном 1-10).</exception>
        public MentalHealthRecord(Guid userId, DateTime recordDate, int meditationDurationMinutes, int breathingPracticeDurationMinutes, int stressLevelScore, int anxietyLevelScore, string? notes = null) : this()
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
            Notes = notes;
        }

        #endregion

        #region Методи

        /// <summary>
        /// Оновлює дані запису про ментальне здоров’я з новими значеннями (опціонально).
        /// </summary>
        /// <param name="recordDate">Нова дата запису (опціонально).</param>
        /// <param name="meditationDurationMinutes">Нова тривалість медитації (опціонально).</param>
        /// <param name="breathingPracticeDurationMinutes">Нова тривалість дихальних практик (опціонально).</param>
        /// <param name="stressLevelScore">Новий рівень стресу (опціонально).</param>
        /// <param name="anxietyLevelScore">Новий рівень тривожності (опціонально).</param>
        /// <param name="notes">Нові примітки (опціонально).</param>
        /// <exception cref="ArgumentException">Виникає, якщо передані недійсні дані (наприклад, від’ємні значення або оцінки поза діапазоном 1-10).</exception>
        public void UpdateRecord(
            DateTime? recordDate = null,
            int? meditationDurationMinutes = null,
            int? breathingPracticeDurationMinutes = null,
            int? stressLevelScore = null,
            int? anxietyLevelScore = null,
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
            if (notes != null) Notes = notes;
            SetUpdatedAt();
        }

        /// <summary>
        /// Розраховує загальну тривалість релаксаційних практик (медитація + дихальні вправи).
        /// </summary>
        /// <returns>Загальна тривалість у хвилинах.</returns>
        public int CalculateTotalRelaxationDuration()
        {
            return MeditationDurationMinutes + BreathingPracticeDurationMinutes;
        }

        #endregion
    }
}