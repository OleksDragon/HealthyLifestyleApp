using System.ComponentModel.DataAnnotations;

namespace HealthyLifestyle.Application.DTOs.ProfessionalQualification
{
    /// <summary>
    /// DTO для оновлення професійної кваліфікації.
    /// Використовується для передачі даних від клієнта до сервера при оновленні кваліфікації.
    /// </summary>
    public class UpdateProfessionalQualificationDto
    {
        #region Властивості

        /// <summary>
        /// Оновлений опис або мотивація для кваліфікації.
        /// Максимальна довжина — 1000 символів.
        /// </summary>
        [StringLength(1000, ErrorMessage = "Опис не може перевищувати 1000 символів.")]
        public string? Description { get; set; }

        /// <summary>
        /// Оновлена погодинна ставка за послуги.
        /// Може бути null, якщо використовується ставка за замовчуванням.
        /// Якщо вказано, значення має бути невід'ємним.
        /// </summary>
        [Range(0, double.MaxValue, ErrorMessage = "Погодинна ставка не може бути від'ємною.")]
        public decimal? HourlyRate { get; set; }

        /// <summary>
        /// Оновлені формати роботи спеціаліста (наприклад, онлайн, офлайн, корекції плану тощо).
        /// </summary>
        public List<string>? WorkFormat { get; set; }

        #endregion
    }
}
