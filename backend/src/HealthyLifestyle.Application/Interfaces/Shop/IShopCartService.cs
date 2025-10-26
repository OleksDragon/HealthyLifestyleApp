using HealthyLifestyle.Application.DTOs.Shop;

namespace HealthyLifestyle.Application.Interfaces.Shop
{
    /// <summary>
    /// Інтерфейс для служби керування корзиною користувача в додатку HealthyLifestyle.
    /// </summary>
    public interface IShopCartService
    {
        #region Методи

        /// <summary>
        /// Асинхронно створює пусту корзину для вказаного користувача, якщо до цього її не існувало, інакше нічого не відбувається.
        /// </summary>
        /// <param name="userId">Унікальний ідентифікатор користувача.</param>
        Task CreateShopCartAsync(Guid userId);

        /// <summary>
        /// Асинхронно отримує корзину за унікальним ідентифікатором користувача.
        /// </summary>
        /// <param name="userId">Унікальний ідентифікатор користувача.</param>
        /// <returns>DTO корзини, якщо знайдено; інакше null.</returns>
        Task<ShoppingCartDto?> GetCartByUserIdAsync(Guid userId);

        /// <summary>
        /// Додає продукт до корзини.
        /// </summary>
        /// <param name="userId">Унікальний ідентифікатор користувача.</param>
        /// <param name="productDto">Dto Продукту, що додається.</param>
        Task AddProductAsync(Guid userId, ShoppingCartItemDto productDto);

        /// <summary>
        /// Видаляє продукт з корзини.
        /// </summary>
        /// <param name="userId">Унікальний ідентифікатор користувача.</param>
        /// <param name="productId">Dto Продукту, що треба видалити.</param>
        Task DeleteProductAsync(Guid userId, Guid productId);

        /// <summary>
        /// Очищує корзину.
        /// </summary>
        /// <param name="userId">Унікальний ідентифікатор користувача.</param>
        Task ClearCartAsync(Guid userId);

        /// <summary>
        /// Змінює кількість певного товару.
        /// </summary>
        /// <param name="userId">Унікальний ідентифікатор користувача.</param>
        Task ChangeProductAmountAsync(Guid userId, Guid productId, int amount);

        #endregion
    }
}