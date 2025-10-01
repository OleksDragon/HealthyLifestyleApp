using System.ComponentModel.DataAnnotations;

namespace HealthyLifestyle.Application.DTOs.HealthTracker
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

        public double? FreeTestosterone { get; set; }

        public double? LH { get; set; }

        public double? Prolactin { get; set; }

        public double? Estradiol { get; set; }

        public double? FSH { get; set; }

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

        [Range(0, double.MaxValue, ErrorMessage = "Рівень вільного тестостерона не може бути від’ємним.")]
        public double? FreeTestosterone { get; set; }

        [Range(0, double.MaxValue, ErrorMessage = "Рівень ЛГ не може бути від’ємним.")]
        public double? LH { get; set; }

        [Range(0, double.MaxValue, ErrorMessage = "Рівень пролактину не може бути від’ємним.")]
        public double? Prolactin { get; set; }

        [Range(0, double.MaxValue, ErrorMessage = "Рівень естрадіолу не може бути від’ємним.")]
        public double? Estradiol { get; set; }

        [Range(0, double.MaxValue, ErrorMessage = "Рівень ФСГ не може бути від’ємним.")]
        public double? FSH { get; set; }

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

        [Range(0, double.MaxValue, ErrorMessage = "Рівень вільного тестостерона не може бути від’ємним.")]
        public double? FreeTestosterone { get; set; }

        [Range(0, double.MaxValue, ErrorMessage = "Рівень ЛГ не може бути від’ємним.")]
        public double? LH { get; set; }

        [Range(0, double.MaxValue, ErrorMessage = "Рівень пролактину не може бути від’ємним.")]
        public double? Prolactin { get; set; }

        [Range(0, double.MaxValue, ErrorMessage = "Рівень естрадіолу не може бути від’ємним.")]
        public double? Estradiol { get; set; }

        [Range(0, double.MaxValue, ErrorMessage = "Рівень ФСГ не може бути від’ємним.")]
        public double? FSH { get; set; }

        public string? Notes { get; set; }
    }
}
