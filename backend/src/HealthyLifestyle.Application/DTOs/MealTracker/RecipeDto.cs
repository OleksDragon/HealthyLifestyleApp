using Microsoft.AspNetCore.Http;
using System.ComponentModel.DataAnnotations;

namespace HealthyLifestyle.Application.DTOs
{
    /// <summary>
    /// DTO для відображення рецепту.
    /// </summary>
    public class RecipeDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public int Kkal { get; set; }
        public int Protein { get; set; }
        public int Fat { get; set; }
        public int Carbs { get; set; }
        public string Time { get; set; } = string.Empty;
        public string? ImageUrl { get; set; }
        public string? VideoUrl { get; set; }
        public IEnumerable<IngredientDto> Ingredients { get; set; } = new List<IngredientDto>();
        public IEnumerable<string> Steps { get; set; } = new List<string>();
    }

    /// <summary>
    /// DTO для інгредієнтів рецепту.
    /// </summary>
    public class IngredientDto
    {
        [Required(ErrorMessage = "Назва інгредієнта є обов'язковою.")]
        public string Name { get; set; } = string.Empty;

        [Required(ErrorMessage = "Кількість інгредієнта є обов'язковою.")]
        public string Amount { get; set; } = string.Empty;
    }

    /// <summary>
    /// DTO для створення нового рецепту.
    /// </summary>
    public class CreateRecipeDto
    {
        [Required(ErrorMessage = "Назва рецепту є обов'язковою.")]
        public string Name { get; set; } = string.Empty;

        [Required(ErrorMessage = "Опис рецепту є обов'язковим.")]
        public string Description { get; set; } = string.Empty;

        [Range(0, int.MaxValue)]
        public int Kkal { get; set; }

        [Range(0, int.MaxValue)]
        public int Protein { get; set; }

        [Range(0, int.MaxValue)]
        public int Fat { get; set; }

        [Range(0, int.MaxValue)]
        public int Carbs { get; set; }

        [Required]
        public string Time { get; set; } = string.Empty;

        public IFormFile? ImageFile { get; set; }
        public string? VideoUrl { get; set; }

        public List<string> Ingredients { get; set; } = new();
        public List<string> Steps { get; set; } = new();
    }

    /// <summary>
    /// DTO для оновлення рецепту (всі поля необов'язкові).
    /// </summary>
    public class UpdateRecipeDto
    {
        [StringLength(255, MinimumLength = 2, ErrorMessage = "Назва рецепту повинна містити від 2 до 255 символів.")]
        public string? Name { get; set; }

        [StringLength(2000, MinimumLength = 10, ErrorMessage = "Опис рецепту повинен містити від 10 до 2000 символів.")]
        public string? Description { get; set; }

        [Range(0, int.MaxValue, ErrorMessage = "Ккал повинні бути невід'ємним числом.")]
        public int? Kkal { get; set; }

        [Range(0, int.MaxValue, ErrorMessage = "Білки повинні бути невід'ємним числом.")]
        public int? Protein { get; set; }

        [Range(0, int.MaxValue, ErrorMessage = "Жири повинні бути невід'ємним числом.")]
        public int? Fat { get; set; }

        [Range(0, int.MaxValue, ErrorMessage = "Вуглеводи повинні бути невід'ємним числом.")]
        public int? Carbs { get; set; }

        public string? Time { get; set; }
        
        [AllowedExtensions(new string[] { ".jpg", ".jpeg", ".png", ".gif" }, ErrorMessage = "Дозволені лише файли зображень.")]
        public IFormFile? ImageFile { get; set; }
        public string? ImageUrl { get; set; }
        public string? VideoUrl { get; set; }
        public List<string>? Ingredients { get; set; }
        public List<string>? Steps { get; set; }
    }

    /// <summary>
    /// Атрибут валідації дозволених розширень файлів.
    /// </summary>
    public class AllowedExtensionsAttribute : ValidationAttribute
    {
        private readonly string[] _extensions;

        public AllowedExtensionsAttribute(string[] extensions)
        {
            _extensions = extensions;
        }

        protected override ValidationResult? IsValid(object? value, ValidationContext validationContext)
        {
            var file = value as IFormFile;
            if (file != null)
            {
                var extension = Path.GetExtension(file.FileName).ToLowerInvariant();
                if (!string.IsNullOrEmpty(extension) && !_extensions.Contains(extension))
                {
                    return new ValidationResult(GetErrorMessage());
                }
            }
            return ValidationResult.Success;
        }

        public string GetErrorMessage()
        {
            return $"Дозволені лише файли з розширенням: {string.Join(", ", _extensions)}.";
        }
    }
}
