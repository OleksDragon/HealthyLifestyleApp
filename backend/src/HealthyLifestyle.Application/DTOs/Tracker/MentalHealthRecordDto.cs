using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HealthyLifestyle.Application.DTOs.Tracker
{
    /// <summary>
    /// DTO для відображення запису ментального здоров’я.
    /// </summary>
    public class MentalHealthRecordDto
    {
        public Guid Id { get; set; }

        public Guid UserId { get; set; }

        public DateTime RecordDate { get; set; }

        public int MeditationDurationMinutes { get; set; }

        public int BreathingPracticeDurationMinutes { get; set; }

        public int StressLevelScore { get; set; }

        public int AnxietyLevelScore { get; set; }

        public string? Notes { get; set; }

        public DateTime CreatedAt { get; set; }

        public DateTime UpdatedAt { get; set; }
    }

    /// <summary>
    /// DTO для створення нового запису ментального здоров’я.
    /// </summary>
    public class MentalHealthRecordCreateDto
    {
        [Required(ErrorMessage = "Ідентифікатор користувача є обов’язковим.")]
        public Guid UserId { get; set; }

        [Range(0, int.MaxValue, ErrorMessage = "Тривалість медитації не може бути від’ємною.")]
        public int MeditationDurationMinutes { get; set; }

        [Range(0, int.MaxValue, ErrorMessage = "Тривалість дихальних практик не може бути від’ємною.")]
        public int BreathingPracticeDurationMinutes { get; set; }

        [Range(1, 10, ErrorMessage = "Рівень стресу має бути в межах від 1 до 10.")]
        public int StressLevelScore { get; set; }

        [Range(1, 10, ErrorMessage = "Рівень тривожності має бути в межах від 1 до 10.")]
        public int AnxietyLevelScore { get; set; }

        public string? Notes { get; set; }
    }

    /// <summary>
    /// DTO для оновлення запису ментального здоров’я. Всі поля є опціональними.
    /// </summary>
    public class MentalHealthRecordUpdateDto
    {
        [Range(0, int.MaxValue, ErrorMessage = "Тривалість медитації не може бути від’ємною.")]
        public int? MeditationDurationMinutes { get; set; }

        [Range(0, int.MaxValue, ErrorMessage = "Тривалість дихальних практик не може бути від’ємною.")]
        public int? BreathingPracticeDurationMinutes { get; set; }

        [Range(1, 10, ErrorMessage = "Рівень стресу має бути в межах від 1 до 10.")]
        public int? StressLevelScore { get; set; }

        [Range(1, 10, ErrorMessage = "Рівень тривожності має бути в межах від 1 до 10.")]
        public int? AnxietyLevelScore { get; set; }

        public string? Notes { get; set; }
    }
}
