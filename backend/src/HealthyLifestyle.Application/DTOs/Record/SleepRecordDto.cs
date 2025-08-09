using System.ComponentModel.DataAnnotations;

namespace HealthyLifestyle.Application.DTOs.Record
{
    /// <summary>
    /// DTO для перегляду запису про сон.
    /// </summary>
    public class SleepRecordDto
    {
        public Guid Id { get; set; }

        public Guid UserId { get; set; }

        public DateTime SleepDate { get; set; }

        public TimeSpan BedTime { get; set; }

        public TimeSpan WakeUpTime { get; set; }

        public int TotalSleepMinutes { get; set; }

        public int SleepQualityScore { get; set; }

        public string? DreamDetails { get; set; }

        public bool SmartAlarmUsed { get; set; }

        public DateTime CreatedAt { get; set; }

        public DateTime UpdatedAt { get; set; }
    }

    /// <summary>
    /// DTO для створення нового запису про сон.
    /// TotalSleepMinutes не передається, він буде обчислений автоматично.
    /// </summary>
    public class SleepRecordCreateDto
    {
        [Required]
        public Guid UserId { get; set; }

        [Required]
        public DateTime SleepDate { get; set; }

        [Required]
        public TimeSpan BedTime { get; set; }

        [Required]
        public TimeSpan WakeUpTime { get; set; }

        [Range(1, 5, ErrorMessage = "Оцінка якості сну повинна бути в межах від 1 до 5.")]
        public int SleepQualityScore { get; set; }

        public string? DreamDetails { get; set; }

        public bool SmartAlarmUsed { get; set; }
    }

    /// <summary>
    /// DTO для оновлення запису про сон.
    /// TotalSleepMinutes обчислюється автоматично.
    /// </summary>
    public class SleepRecordUpdateDto
    {
        [Required]
        public DateTime SleepDate { get; set; }

        [Required]
        public TimeSpan BedTime { get; set; }

        [Required]
        public TimeSpan WakeUpTime { get; set; }

        [Range(1, 5, ErrorMessage = "Оцінка якості сну повинна бути в межах від 1 до 5.")]
        public int SleepQualityScore { get; set; }

        public string? DreamDetails { get; set; }

        public bool SmartAlarmUsed { get; set; }
    }
}
