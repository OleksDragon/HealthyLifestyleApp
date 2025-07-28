using System;
using System.ComponentModel.DataAnnotations;

namespace HealthyLifestyle.Core.Entities
{
    /// <summary>
    /// Представляє запис про сон користувача з основними метриками якості та тривалості сну.
    /// </summary>
    public class SleepRecord : BaseEntity
    {
        /// <summary>
        /// Зовнішній ключ на користувача, до якого відноситься даний запис сну.
        /// </summary>
        [Required]
        public Guid UserId { get; set; }

        /// <summary>
        /// Дата сну (зазвичай дата, коли користувач ліг спати).
        /// </summary>
        [Required]
        public DateTime SleepDate { get; set; }

        /// <summary>
        /// Час, коли користувач ліг спати.
        /// </summary>
        [Required]
        public TimeSpan BedTime { get; set; }

        /// <summary>
        /// Час пробудження користувача.
        /// </summary>
        [Required]
        public TimeSpan WakeUpTime { get; set; } 

        /// <summary>
        /// Загальна кількість хвилин сну.
        /// </summary>
        [Range(0, int.MaxValue)]
        public int TotalSleepMinutes { get; set; }

        /// <summary>
        /// Оцінка якості сну за шкалою від 1 (погано) до 5 (відмінно).
        /// </summary>
        [Range(1, 5)]
        public int SleepQualityScore { get; set; }

        /// <summary>
        /// Додаткова інформація про сни (може бути null).
        /// </summary>
        public string? DreamDetails { get; set; }

        /// <summary>
        /// Прапорець, що показує, чи був використаний розумний будильник.
        /// </summary>
        public bool SmartAlarmUsed { get; set; }

        /// <summary>
        /// Навігаційна властивість для зв'язку з користувачем.
        /// </summary>
        [Required]
        public User User { get; set; } = null!;

        /// <summary>
        /// Конструктор без параметрів, необхідний для EF Core.
        /// </summary>
        public SleepRecord() { }

        /// <summary>
        /// Конструктор для створення нового запису про сон.
        /// </summary>
        /// <param name="userId">Ідентифікатор користувача.</param>
        /// <param name="sleepDate">Дата сну.</param>
        /// <param name="bedTime">Час відходу до сну.</param>
        /// <param name="wakeUpTime">Час пробудження.</param>
        /// <param name="totalSleepMinutes">Загальна тривалість сну в хвилинах.</param>
        /// <param name="sleepQualityScore">Оцінка якості сну (1-5).</param>
        /// <param name="smartAlarmUsed">Прапорець використання розумного будильника.</param>
        /// <param name="dreamDetails">Додаткові деталі про сни (необов'язково).</param>
        public SleepRecord(
            Guid userId,
            DateTime sleepDate,
            TimeSpan bedTime,
            TimeSpan wakeUpTime,
            int totalSleepMinutes,
            int sleepQualityScore,
            bool smartAlarmUsed,
            string? dreamDetails = null)
        {
            UserId = userId;
            SleepDate = sleepDate;
            BedTime = bedTime;
            WakeUpTime = wakeUpTime;
            TotalSleepMinutes = totalSleepMinutes;
            SleepQualityScore = sleepQualityScore;
            SmartAlarmUsed = smartAlarmUsed;
            DreamDetails = dreamDetails;
        }

        /// <summary>
        /// Обчислює тривалість сну на основі часу відходу до сну та часу пробудження.
        /// Якщо сон пройшов через північ, враховується перехід на наступний день.
        /// </summary>
        /// <returns>Загальна тривалість сну в хвилинах.</returns>
        public int CalculateSleepDuration()
        {
            var duration = WakeUpTime - BedTime;

            if (duration < TimeSpan.Zero)
            {
                // Сон пройшов через північ — додаємо 24 години
                duration += TimeSpan.FromHours(24);
            }

            return (int)duration.TotalMinutes;
        }
    }
}