using System;
using System.ComponentModel.DataAnnotations;

namespace HealthyLifestyle.Application.DTOs.WeightTracker
{
    /// <summary>
    /// DTO для фіксації або оновлення ваги. Дозволяє вказати дату запису.
    /// </summary>
    public class WeightLogRequestDto
    {
        [Required(ErrorMessage = "Вага є обов'язковим полем.")]
        [Range(0.1, 500.0, ErrorMessage = "Вага повинна бути від 0.1 до 500.0 кг.")]
        public double Weight { get; set; }

        /// <summary>
        /// Дата, за яку робиться запис. Якщо не вказано, використовується поточна дата.
        /// </summary>
        public DateTime? Date { get; set; }
    }
}