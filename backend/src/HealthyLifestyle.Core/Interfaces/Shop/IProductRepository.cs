using HealthyLifestyle.Core.Entities;

namespace HealthyLifestyle.Core.Interfaces.Shop
{
    /// <summary>
    /// Спеціалізований інтерфейс репозиторію для сутності Product.
    /// Розширює загальний IRepository, надаючи специфічні операції для продуктів.
    /// </summary>
    public interface IProductRepository : IRepository<Product>
    {
        // Приклад: Якщо вам знадобиться специфічний для Product метод,
        // який не є загальним CRUD, ви можете додати його сюди.
        // Наприклад:
        // Task<IReadOnlyList<Product>> GetProductsByPriceRangeAsync(decimal minPrice, decimal maxPrice);
        // Task<Product?> GetProductByNameAsync(string productName);
    }
}
