using HealthyLifestyle.Core.Entities;
using HealthyLifestyle.Core.Enums;
using System;

namespace HealthyLifestyle.Application.DTOs.DietPlan
{
    /// <summary>
    /// Diet plan data transfer object
    /// </summary>
    public class DietPlanDto
    {
        public Guid Id { get; set; }
        public Guid ClientId { get; set; }
        public Guid? DietitianId { get; set; }
        public string Name { get; set; } = string.Empty;
        public string? Description { get; set; }
        public DietType DietType { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
    }

    /// <summary>
    /// DTO for creating diet plans
    /// </summary>
    public class CreateDietPlanDto
    {
        public Guid ClientId { get; set; }
        public Guid? DietitianId { get; set; }
        public required string Name { get; set; }
        public string? Description { get; set; }
        public DietType DietType { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
    }

    /// <summary>
    /// DTO for updating diet plans
    /// </summary>
    public class UpdateDietPlanDto
    {
        public string? Name { get; set; }
        public string? Description { get; set; }
        public DietType? DietType { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
    }
}