using HealthyLifestyle.Core.Enums;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Http;

namespace HealthyLifestyle.Application.DTOs.Shop
{
    /// <summary>
    /// DTO для відображення інформації про продукт.
    /// </summary>
    public class ProductDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public ProductCategory Category { get; set; }
        public decimal Price { get; set; }
        public string Brand { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string? ImageUrl { get; set; }
        public int StockQuantity { get; set; }
        public decimal PlatformCommissionPercentage { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }

    /// <summary>
    /// DTO для створення нового продукту.
    /// </summary>
    public class ProductCreateDto
    {
        [Required(ErrorMessage = "Назва продукту є обов'язковою.")]
        [StringLength(255, MinimumLength = 2, ErrorMessage = "Назва продукту повинна містити від 2 до 255 символів.")]
        public string Name { get; set; } = string.Empty;

        [Required(ErrorMessage = "Категорія продукту є обов'язковою.")]
        public ProductCategory Category { get; set; }

        [Range(0.01, double.MaxValue, ErrorMessage = "Ціна продукту повинна бути позитивним числом.")]
        public decimal Price { get; set; }

        [Required(ErrorMessage = "Бренд є обов'язковим.")]
        [StringLength(255, MinimumLength = 2, ErrorMessage = "Назва бренду повинна містити від 2 до 255 символів.")]
        public string Brand { get; set; } = string.Empty;

        [Required(ErrorMessage = "Опис продукту є обов'язковим.")]
        [StringLength(1000, MinimumLength = 10, ErrorMessage = "Опис продукту повинен містити від 10 до 1000 символів.")]
        public string Description { get; set; } = string.Empty;

        [AllowedExtensions(new string[] { ".jpg", ".jpeg", ".png", ".gif" }, ErrorMessage = "Дозволені лише файли зображень.")]
        public IFormFile? ImageFile { get; set; }

        [Range(0, int.MaxValue, ErrorMessage = "Кількість на складі не може бути від'ємною.")]
        public int StockQuantity { get; set; }

        [Range(0.0, 1.0, ErrorMessage = "Комісія платформи повинна бути в діапазоні від 0 до 1.")]
        public decimal PlatformCommissionPercentage { get; set; }
    }

    /// <summary>
    /// DTO для оновлення існуючого продукту.
    /// Використовує nullable типи для опціональних оновлень.
    /// </summary>
    public class ProductUpdateDto
    {
        [StringLength(255, MinimumLength = 2, ErrorMessage = "Назва продукту повинна містити від 2 до 255 символів.")]
        public string? Name { get; set; }

        public ProductCategory? Category { get; set; }

        [Range(0.01, double.MaxValue, ErrorMessage = "Ціна продукту повинна бути позитивним числом.")]
        public decimal? Price { get; set; }

        [StringLength(255, MinimumLength = 2, ErrorMessage = "Назва бренду повинна містити від 2 до 255 символів.")]
        public string? Brand { get; set; }

        [StringLength(1000, MinimumLength = 10, ErrorMessage = "Опис продукту повинен містити від 10 до 1000 символів.")]
        public string? Description { get; set; }

        [AllowedExtensions(new string[] { ".jpg", ".jpeg", ".png", ".gif" }, ErrorMessage = "Дозволені лише файли зображень.")]
        public IFormFile? ImageFile { get; set; }

        public string? ImageUrl { get; set; }

        [Range(0, int.MaxValue, ErrorMessage = "Кількість на складі не може бути від'ємною.")]
        public int? StockQuantity { get; set; }

        [Range(0.0, 1.0, ErrorMessage = "Комісія платформи повинна бути в діапазоні від 0 до 1.")]
        public decimal? PlatformCommissionPercentage { get; set; }
    }

    /// <summary>
    /// Кастомний атрибут валідації для перевірки розширення файлу.
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

