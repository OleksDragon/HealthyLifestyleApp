using HealthyLifestyle.Core.Entities;
using System.ComponentModel.DataAnnotations;

namespace HealthyLifestyle.Application.DTOs.HealthTracker
{
    /// <summary>
    /// DTO для відображення інформації про трекер жіночого здоров’я.
    /// </summary>
    public class FemaleHealthTrackerDto
    {
        public Guid Id { get; set; }

        public Guid UserId { get; set; }

        public DateTime RecordDate { get; set; }

        public int CycleDay { get; set; }

        public bool IsFertile { get; set; }

        public List<string> PmsSymptoms { get; set; } = new();

        public string? MoodNotes { get; set; }

        public BleedingLevel? BleedingLevel { get; set; }

        public DateTime CreatedAt { get; set; }

        public DateTime UpdatedAt { get; set; }
    }

    /// <summary>
    /// DTO для створення нового запису трекера жіночого здоров’я.
    /// </summary>
    public class FemaleHealthTrackerCreateDto
    {
        [Required(ErrorMessage = "Ідентифікатор користувача є обов’язковим.")]
        public Guid UserId { get; set; }

        public DateTime RecordDate { get; set; }

        [Range(1, 31, ErrorMessage = "День циклу має бути в межах від 1 до 31.")]
        public int CycleDay { get; set; }

        public bool IsFertile { get; set; }

        public List<string> PmsSymptoms { get; set; } = new();

        public string? MoodNotes { get; set; }

        public BleedingLevel? BleedingLevel { get; set; }
    }

    /// <summary>
    /// DTO для оновлення запису трекера жіночого здоров’я. Всі поля є опціональними.
    /// </summary>
    public class FemaleHealthTrackerUpdateDto
    {
        public DateTime RecordDate { get; set; }

        [Range(1, 31, ErrorMessage = "День циклу має бути в межах від 1 до 31.")]
        public int? CycleDay { get; set; }

        public bool? IsFertile { get; set; }

        public List<string>? PmsSymptoms { get; set; }

        public string? MoodNotes { get; set; }

        public BleedingLevel? BleedingLevel { get; set; }
    }
}
