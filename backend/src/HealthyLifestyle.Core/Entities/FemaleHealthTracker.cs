using System;
using System.Collections.Generic;

namespace HealthyLifestyle.Core.Entities
{
    /// <summary>
    /// Клас, що представляє трекер жіночого здоров’я, успадкований від BaseEntity.
    /// Використовується для відстеження циклу, симптомів та настрою користувачки.
    /// </summary>
    public class FemaleHealthTracker : BaseEntity
    {
        #region Властивості

        /// <summary>
        /// Ідентифікатор користувача (зовнішній ключ та первинний ключ для зв’язку один-до-одного).
        /// </summary>
        public Guid UserId { get; set; }

        /// <summary>
        /// Користувачка, пов’язана з трекером (обов’язково).
        /// </summary>
        public required User User { get; set; }

        /// <summary>
        /// Дата останнього запису.
        /// </summary>
        public DateTime RecordDate { get; set; }

        /// <summary>
        /// Дата початку одного з циклів, використовується для календаря
        /// </summary>
        public DateTime EntryDate { get; set; }

        /// <summary>
        /// Довжина циклу
        /// </summary>
        public int CycleDay { get; set; }

        /// <summary>
        /// Довжина менструації
        /// </summary>
        public int MenstDay { get; set; }

        /// <summary>
        /// Позначає, чи є період фертильності.
        /// </summary>
        public bool IsFertile { get; set; }

        /// <summary>
        /// Список симптомів ПМС.
        /// </summary>
        public List<string> PmsSymptoms { get; set; } = new List<string>();

        /// <summary>
        /// Нотатки про настрій (опціонально).
        /// </summary>
        public string? MoodNotes { get; set; }

        /// <summary>
        /// Рівень кровотечі (опціонально).
        /// </summary>
        public BleedingLevel? BleedingLevel { get; set; }

        #endregion

        #region Конструктори

        /// <summary>
        /// Параметризатор за замовчуванням для використання EF Core.
        /// </summary>
        protected FemaleHealthTracker() : base()
        {
            PmsSymptoms = new List<string>();
        }

        /// <summary>
        /// Параметризатор з початковими даними для створення нового трекера.
        /// </summary>
        /// <param name="userId">Ідентифікатор користувача.</param>
        /// <param name="recordDate">Дата запису.</param>
        /// <param name="cycleDay">День циклу.</param>
        /// <param name="isFertile">Познака фертильності.</param>
        /// <param name="moodNotes">Нотатки про настрій (опціонально).</param>
        /// <param name="bleedingLevel">Рівень кровотечі (опціонально).</param>
        public FemaleHealthTracker(
            Guid userId,
            DateTime recordDate,
            int cycleDay,
            bool isFertile,
            string? moodNotes = null,
            BleedingLevel? bleedingLevel = null)
            : this()
        {
            if (userId == Guid.Empty)
                throw new ArgumentException("Ідентифікатор користувача не може бути порожнім.", nameof(userId));

            UserId = userId;
            RecordDate = recordDate;
            CycleDay = cycleDay;
            IsFertile = isFertile;
            MoodNotes = moodNotes;
            BleedingLevel = bleedingLevel;
        }

        #endregion
    }

    /// <summary>
    /// Перелік рівнів кровотечі.
    /// </summary>
    public enum BleedingLevel
    {
        None,
        Light,
        Medium,
        Heavy
    }
}