using System;
using System.ComponentModel.DataAnnotations;

namespace HealthyLifestyle.Application.DTOs.Tracker
{
    /// <summary>
    /// DTO для відображення інформації про трекер чоловічого здоров’я.
    /// </summary>
    public class MaleHealthTrackerDto
    {
        public Guid Id { get; set; }

        public Guid UserId { get; set; }

        public DateTime RecordDate { get; set; }

        public double? TestosteroneLevel { get; set; }

        public int? EnergyLevelScore { get; set; }

        public string? Notes { get; set; }

        public DateTime CreatedAt { get; set; }

        public DateTime UpdatedAt { get; set; }
    }

    /// <summary>
    /// DTO для створення нового запису трекера чоловічого здоров’я.
    /// </summary>
    public class MaleHealthTrackerCreateDto
    {
        [Required(ErrorMessage = "Ідентифікатор користувача є обов’язковим.")]
        public Guid UserId { get; set; }

        public DateTime RecordDate { get; set; }

        [Range(0, double.MaxValue, ErrorMessage = "Рівень тестостерона не може бути від’ємним.")]
        public double? TestosteroneLevel { get; set; }

        [Range(1, 10, ErrorMessage = "Рівень енергії повинен бути в межах від 1 до 10.")]
        public int? EnergyLevelScore { get; set; }

        public string? Notes { get; set; }
    }

    /// <summary>
    /// DTO для оновлення запису трекера чоловічого здоров’я.
    /// Всі поля є опціональними.
    /// </summary>
    public class MaleHealthTrackerUpdateDto
    {
        public DateTime RecordDate { get; set; }

        [Range(0, double.MaxValue, ErrorMessage = "Рівень тестостерона не може бути від’ємним.")]
        public double? TestosteroneLevel { get; set; }

        [Range(1, 10, ErrorMessage = "Рівень енергії повинен бути в межах від 1 до 10.")]
        public int? EnergyLevelScore { get; set; }

        public string? Notes { get; set; }
    }
}
