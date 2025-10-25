using System.ComponentModel.DataAnnotations;

namespace HealthyLifestyle.Application.DTOs.WeightTracker
{
    /// <summary>
    /// DTO для фіксації нової ваги.
    /// </summary>
    public class WeightEntryDto
    {
        [Required(ErrorMessage = "Вага є обов'язковою.")]
        [Range(1.0, 500.0, ErrorMessage = "Вага має бути в діапазоні від 1 до 500 кг.")]
        public double Weight { get; set; }
    }
}