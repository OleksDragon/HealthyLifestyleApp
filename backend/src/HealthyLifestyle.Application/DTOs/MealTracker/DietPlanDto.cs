using HealthyLifestyle.Core.Entities;
using HealthyLifestyle.Core.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace HealthyLifestyle.Application.DTOs.DietPlan
{
    /// <summary>
    /// Data Transfer Object for Diet Plan information
    /// </summary>
    public class DietPlanDto
    {
        #region Properties

        /// <summary>
        /// Unique identifier of the diet plan
        /// </summary>
        public Guid Id { get; set; }

        /// <summary>
        /// Identifier of the client user
        /// Required field for binding to a specific client
        /// </summary>
        [Required(ErrorMessage = "Client ID is required.")]
        public Guid ClientId { get; set; }

        /// <summary>
        /// Identifier of the dietitian user (optional)
        /// </summary>
        public Guid? DietitianId { get; set; }

        /// <summary>
        /// Name of the diet plan
        /// Maximum length - 100 characters
        /// </summary>
        [Required(ErrorMessage = "Diet plan name is required.")]
        [StringLength(100, ErrorMessage = "Diet plan name cannot exceed 100 characters.")]
        public string Name { get; set; } = string.Empty;

        /// <summary>
        /// Description of the diet plan
        /// Maximum length - 1000 characters
        /// </summary>
        [StringLength(1000, ErrorMessage = "Description cannot exceed 1000 characters.")]
        public string? Description { get; set; }

        /// <summary>
        /// Type of diet (Standard, Keto, Paleo, etc.)
        /// Required field
        /// </summary>
        [Required(ErrorMessage = "Diet type is required.")]
        public DietType DietType { get; set; }

        /// <summary>
        /// Start date of the diet plan
        /// Must be before EndDate
        /// </summary>
        [Required(ErrorMessage = "Start date is required.")]
        public DateTime StartDate { get; set; }

        /// <summary>
        /// End date of the diet plan
        /// Must be after StartDate
        /// </summary>
        [Required(ErrorMessage = "End date is required.")]
        [ValidateEndDateAfterStartDate]
        public DateTime EndDate { get; set; }

        /// <summary>
        /// Date when the diet plan was created
        /// </summary>
        public DateTime CreatedAt { get; set; }

        /// <summary>
        /// Date when the diet plan was last updated
        /// </summary>
        public DateTime? UpdatedAt { get; set; }

        #endregion
    }

    /// <summary>
    /// Data Transfer Object for creating a new Diet Plan
    /// </summary>
    public class CreateDietPlanDto
    {
        #region Properties

        [Required(ErrorMessage = "Client ID is required.")]
        public Guid ClientId { get; set; }

        public Guid? DietitianId { get; set; }

        [Required(ErrorMessage = "Diet plan name is required.")]
        [StringLength(100, ErrorMessage = "Diet plan name cannot exceed 100 characters.")]
        public string Name { get; set; } = string.Empty;

        [StringLength(1000, ErrorMessage = "Description cannot exceed 1000 characters.")]
        public string? Description { get; set; }

        [Required(ErrorMessage = "Diet type is required.")]
        public DietType DietType { get; set; }

        [Required(ErrorMessage = "Start date is required.")]
        public DateTime StartDate { get; set; }

        [Required(ErrorMessage = "End date is required.")]
        [ValidateEndDateAfterStartDate]
        public DateTime EndDate { get; set; }

        #endregion
    }

    /// <summary>
    /// Data Transfer Object for updating an existing Diet Plan
    /// </summary>
    public class UpdateDietPlanDto
    {
        #region Properties

        [StringLength(100, ErrorMessage = "Diet plan name cannot exceed 100 characters.")]
        public string? Name { get; set; }

        [StringLength(1000, ErrorMessage = "Description cannot exceed 1000 characters.")]
        public string? Description { get; set; }

        public DietType? DietType { get; set; }

        public DateTime? StartDate { get; set; }

        [ValidateEndDateAfterStartDate]
        public DateTime? EndDate { get; set; }

        #endregion
    }

    public class ValidateEndDateAfterStartDateAttribute : ValidationAttribute
    {
        protected override ValidationResult? IsValid(object? value, ValidationContext validationContext)
        {
            if (validationContext.ObjectInstance is not CreateDietPlanDto model)
            {
                return ValidationResult.Success;
            }

            if (model.EndDate <= model.StartDate)
            {
                return new ValidationResult("End date must be after start date.");
            }

            return ValidationResult.Success;
        }
    }
}