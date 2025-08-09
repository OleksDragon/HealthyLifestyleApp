using System.ComponentModel.DataAnnotations;

namespace HealthyLifestyle.Application.DTOs.Workout
{
    public class FitnessActivityDto
    {
        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        public Guid? WorkoutId { get; set; }
        public string ActivityType { get; set; } = string.Empty;
        public int DurationMinutes { get; set; }
        public int CaloriesBurned { get; set; }
        public DateTime ActivityDate { get; set; }
        public string? Notes { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
    }

    public class CreateFitnessActivityDto
    {
        [Required]
        public Guid UserId { get; set; }

        public Guid? WorkoutId { get; set; }

        [Required]
        [StringLength(100)]
        public string ActivityType { get; set; } = string.Empty;

        [Range(1, 1440)]
        public int DurationMinutes { get; set; }

        [Range(0, 10000)]
        public int CaloriesBurned { get; set; }

        [Required]
        public DateTime ActivityDate { get; set; }

        [StringLength(500)]
        public string? Notes { get; set; }
    }

    public class UpdateFitnessActivityDto
    {
        [StringLength(100)]
        public string? ActivityType { get; set; }

        [Range(1, 1440)]
        public int? DurationMinutes { get; set; }

        [Range(0, 10000)]
        public int? CaloriesBurned { get; set; }

        public DateTime? ActivityDate { get; set; }

        [StringLength(500)]
        public string? Notes { get; set; }
    }
}