using HealthyLifestyle.Application.DTOs.Shop;
using HealthyLifestyle.Core.Entities;

namespace HealthyLifestyle.Application.Interfaces.Shop
{
    public interface IProductService
    {
        /// <summary>
        /// Отримує інформацію про продукт за його ідентифікатором.
        /// </summary>
        /// <param name="id">Ідентифікатор продукту.</param>
        /// <returns>Об'єкт ProductDto, якщо продукт знайдено; інакше null.</returns>
        Task<ProductDto> GetProductByIdAsync(Guid id);

        /// <summary>
        /// Отримує інформацію про продукт за його ідентифікатором.
        /// </summary>
        /// <param name="id">Ідентифікатор продукту.</param>
        /// <returns>Об'єкт Product, якщо продукт знайдено; інакше null.</returns>
        Task<Product> GetProductFromDBByIdAsync(Guid id);

        /// <summary>
        /// Отримує список усіх продуктів.
        /// </summary>
        /// <returns>Колекція об'єктів ProductDto.</returns>
        Task<IEnumerable<ProductDto>> GetAllProductsAsync();

        /// <summary>
        /// Створює новий продукт.
        /// </summary>
        /// <param name="productCreateDto">Об'єкт ProductCreateDto, що містить дані для створення продукту.</param>
        /// <returns>Об'єкт ProductDto щойно створеного продукту.</returns>
        Task<ProductDto> CreateProductAsync(ProductCreateDto productCreateDto);

        /// <summary>
        /// Оновлює існуючий продукт.
        /// </summary>
        /// <param name="id">Ідентифікатор продукту, який потрібно оновити.</param>
        /// <param name="productUpdateDto">Об'єкт ProductUpdateDto, що містить оновлені дані продукту.</param>
        /// <returns>Об'єкт ProductDto оновленого продукту.</returns>
        Task<ProductDto> UpdateProductAsync(Guid id, ProductUpdateDto productUpdateDto);

        /// <summary>
        /// Видаляє продукт за його ідентифікатором.
        /// </summary>
        /// <param name="id">Ідентифікатор продукту, який потрібно видалити.</param>
        Task DeleteProductAsync(Guid id);
    }
}
