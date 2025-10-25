using System;

namespace HealthyLifestyle.Application.DTOs.WeightTracker
{
    /// <summary>
    /// DTO для відображення запису ваги на графіку.
    /// </summary>
    public class WeightLogDto
    {
        public double Weight { get; set; }
        public DateTime DateLogged { get; set; }
    }
}