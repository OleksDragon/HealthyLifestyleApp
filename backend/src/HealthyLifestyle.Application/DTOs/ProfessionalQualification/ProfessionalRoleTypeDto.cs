using System.ComponentModel.DataAnnotations;

namespace HealthyLifestyle.Application.DTOs.ProfessionalQualification
{
    /// <summary>
    /// DTO для представлення типу професійної ролі (наприклад, Тренер, Дієтолог).
    /// Використовується для передачі даних про типи ролей між шарами додатку.
    /// </summary>
    public class ProfessionalRoleTypeDto
    {
        #region Властивості

        /// <summary>
        /// Унікальний ідентифікатор типу професійної ролі.
        /// </summary>
        [Required(ErrorMessage = "Ідентифікатор типу професійної ролі є обов'язковим.")]
        public Guid Id { get; set; }

        /// <summary>
        /// Назва ролі з переліку ProfessionalRoleName.
        /// Може бути null, якщо не вказано, але якщо вказано, довжина не повинна перевищувати 100 символів.
        /// </summary>
        [StringLength(100, ErrorMessage = "Назва ролі не може перевищувати 100 символів.")]
        public string? Name { get; set; }

        /// <summary>
        /// Почасова ставка за замовчуванням для даної професійної ролі.
        /// Повинна бути невід'ємною, якщо вказана.
        /// </summary>
        [Range(0, double.MaxValue, ErrorMessage = "Почасова ставка не може бути від'ємною.")]
        public decimal? DefaultHourlyRate { get; set; }
        #endregion
    }
}