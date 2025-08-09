using HealthyLifestyle.Core.Enums;
using System.ComponentModel.DataAnnotations;

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

        [Url(ErrorMessage = "Недійсний формат URL зображення.")]
        public string? ImageUrl { get; set; }

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

        [Url(ErrorMessage = "Недійсний формат URL зображення.")]
        public string? ImageUrl { get; set; }

        [Range(0, int.MaxValue, ErrorMessage = "Кількість на складі не може бути від'ємною.")]
        public int? StockQuantity { get; set; }

        [Range(0.0, 1.0, ErrorMessage = "Комісія платформи повинна бути в діапазоні від 0 до 1.")]
        public decimal? PlatformCommissionPercentage { get; set; }
    }
}

