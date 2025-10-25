using HealthyLifestyle.Core.Enums;
using System.ComponentModel.DataAnnotations;

namespace HealthyLifestyle.Application.DTOs.APInfoBlock
{
    /// <summary>
    /// DTO для відображення досягнення.
    /// </summary>
    public class AchievementDto
    {
        public Guid Id { get; set; }

        public string Title { get; set; } = string.Empty;

        public string? Description { get; set; }

        public DateTime AchievedDate { get; set; }

        public Guid UserId { get; set; }

        public AchievementType Type { get; set; }

        public AP_Icon Icon { get; set; }

        public int? Duration { get; set; }

        public int? Calories { get; set; }

        public decimal? Value { get; set; }

        public DateTime CreatedAt { get; set; }

        public DateTime UpdatedAt { get; set; }

        /// <summary>
        /// Форматована дата для відображення в UI (dd.MM)
        /// </summary>
        public string FormattedDate => AchievedDate.ToString("dd.MM");
    }

    /// <summary>
    /// DTO для створення нового досягнення.
    /// </summary>
    public class AchievementCreateDto
    {
        [Required(ErrorMessage = "Ідентифікатор користувача є обов'язковим.")]
        public Guid UserId { get; set; }

        [Required(ErrorMessage = "Назва досягнення є обов'язковою.")]
        [MaxLength(200, ErrorMessage = "Назва досягнення не може перевищувати 200 символів.")]
        public string Title { get; set; } = string.Empty;

        [MaxLength(1000, ErrorMessage = "Опис досягнення не може перевищувати 1000 символів.")]
        public string? Description { get; set; }

        public DateTime AchievedDate { get; set; } = DateTime.UtcNow;

        [Required(ErrorMessage = "Тип досягнення є обов'язковим.")]
        public AchievementType Type { get; set; }

        [Required(ErrorMessage = "Іконка є обов'язковою.")]
        public AP_Icon Icon { get; set; }

        [Range(0, int.MaxValue, ErrorMessage = "Тривалість не може бути від'ємною.")]
        public int? Duration { get; set; }

        [Range(0, int.MaxValue, ErrorMessage = "Кількість калорій не може бути від'ємною.")]
        public int? Calories { get; set; }

        [Range(0, double.MaxValue, ErrorMessage = "Значення не може бути від'ємним.")]
        public decimal? Value { get; set; }
    }
}