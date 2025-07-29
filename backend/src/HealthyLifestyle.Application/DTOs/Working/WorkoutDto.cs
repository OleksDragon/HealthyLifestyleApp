using HealthyLifestyle.Core.Entities;
using HealthyLifestyle.Core.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HealthyLifestyle.Application.DTOs.Working
{
    public class WorkoutDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public WorkoutType Type { get; set; }
        public string Description { get; set; } = string.Empty;
        public string? AnimationUrl { get; set; }
        public Difficulty DifficultyLevel { get; set; }
        public ICollection<FitnessActivityItemDto> FitnessActivities { get; set; } = new List<FitnessActivityItemDto>();
    }

    public class FitnessActivityItemDto
    {
        public Guid UserId { get; set; }
        public Guid? WorkoutId { get; set; }
        public string ActivityType { get; set; } = string.Empty;
        public int DurationMinutes { get; set; }
        public int CaloriesBurned { get; set; }
        public DateTime ActivityDate { get; set; }
        public string? Notes { get; set; }
    }

    public class FitnessActivityItemCreateDto
    {
        public Guid UserId { get; set; }
        public string ActivityType { get; set; } = string.Empty;
        public int DurationMinutes { get; set; }
        public int CaloriesBurned { get; set; }
        public DateTime ActivityDate { get; set; }
        public string? Notes { get; set; }
    }

    public class WorkoutCreateDto
    {
        public string Name { get; set; } = string.Empty;
        public WorkoutType Type { get; set; }
        public string Description { get; set; } = string.Empty;
        public string? AnimationUrl { get; set; }
        public Difficulty DifficultyLevel { get; set; }
        public ICollection<FitnessActivityItemCreateDto> FitnessActivities { get; set; } = new List<FitnessActivityItemCreateDto>();
    }

    public class WorkoutUpdateDto
    {
        public string? Name { get; set; } = string.Empty;
        public WorkoutType? Type { get; set; }
        public string? Description { get; set; } = string.Empty;
        public string? AnimationUrl { get; set; }
        public Difficulty? DifficultyLevel { get; set; }
        public ICollection<FitnessActivityItemCreateDto>? FitnessActivities { get; set; } = new List<FitnessActivityItemCreateDto>();
    }
}
