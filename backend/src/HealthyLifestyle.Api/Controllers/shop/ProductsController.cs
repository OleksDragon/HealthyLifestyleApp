using AutoMapper;
using HealthyLifestyle.Application.DTOs.Shop;
using HealthyLifestyle.Application.Interfaces.Shop;
using HealthyLifestyle.Core.Entities;
using HealthyLifestyle.Infrastructure.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace HealthyLifestyle.Api.Controllers.Shop
{
    /// <summary>
    /// Контролер для керування продуктами в додатку HealthyLifestyle.
    /// </summary>
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : ControllerBase
    {
        private readonly IProductService _productService;
        // Не дуже гарно, але найшвидше
        private readonly ApplicationDbContext _dbContext;

        /// <summary>
        /// Ініціалізує новий екземпляр класу <see cref="ProductsController"/>.
        /// </summary>
        /// <param name="productService">Сервіс для обробки операцій, пов’язаних із продуктами.</param>
        /// <exception cref="ArgumentNullException">Викидається, якщо <paramref name="productService"/> є null.</exception>
        public ProductsController(IProductService productService, ApplicationDbContext dbContext)
        {
            _productService = productService;
            _dbContext = dbContext;
        }

        #region Публічні методи API

        /// <summary>
        /// Отримує продукт за його унікальним ідентифікатором.
        /// </summary>
        /// <param name="id">Унікальний ідентифікатор продукту.</param>
        /// <returns>DTO продукту, якщо знайдено; інакше 404 Not Found.</returns>
        /// <response code="200">Продукт успішно отримано.</response>
        /// <response code="401">Користувач не автентифікований.</response>
        /// <response code="404">Продукт із вказаним ID не знайдено.</response>
        /// <response code="500">Помилка сервера під час отримання продукту.</response>
        [HttpGet("{id}")]
        [ProducesResponseType(typeof(ProductDto), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [Authorize]
        public async Task<IActionResult> GetProductById(Guid id)
        {
            try
            {
                var product = await _productService.GetProductByIdAsync(id);
                return Ok(product);
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Внутрішня помилка сервера: {ex.Message}");
            }
        }

        /// <summary>
        /// Отримує список усіх продуктів у системі.
        /// </summary>
        /// <returns>Список DTO продуктів.</returns>
        /// <response code="200">Список продуктів успішно отримано.</response>
        /// <response code="500">Помилка сервера під час отримання продуктів.</response>
        [HttpGet]
        [ProducesResponseType(typeof(IEnumerable<ProductDto>), StatusCodes.Status200OK)]
        [AllowAnonymous]
        public async Task<IActionResult> GetAllProducts()
        {
            var products = await _productService.GetAllProductsAsync();
            return Ok(products);
        }

        /// <summary>
        /// Створює новий продукт у системі.
        /// </summary>
        /// <param name="productCreateDto">Об’єкт передачі даних із деталями створення продукту.</param>
        /// <returns>Створений DTO продукту.</returns>
        /// <response code="201">Продукт успішно створено, повертається DTO продукту.</response>
        /// <response code="400">Невірні вхідні дані запиту.</response>
        /// <response code="401">Користувач не автентифікований.</response>
        /// <response code="403">Користувач не має прав адміністратора.</response>
        /// <response code="500">Помилка сервера під час створення продукту.</response>
        [HttpPost]
        [ProducesResponseType(typeof(ProductDto), StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> CreateProduct([FromForm] ProductCreateDto productCreateDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                var createdProduct = await _productService.CreateProductAsync(productCreateDto);
                return CreatedAtAction(nameof(GetProductById), new { id = createdProduct.Id }, createdProduct);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Внутрішня помилка сервера: {ex.Message}");
            }
        }

        /// <summary>
        /// Оновлює існуючий продукт за його ідентифікатором.
        /// </summary>
        /// <param name="id">Унікальний ідентифікатор продукту, який потрібно оновити.</param>
        /// <param name="productUpdateDto">Об’єкт передачі даних з оновленими даними продукту.</param>
        /// <returns>Оновлений DTO продукту або 404 Not Found, якщо продукт не знайдено.</returns>
        /// <response code="200">Продукт успішно оновлено.</response>
        /// <response code="400">Невірні вхідні дані.</response>
        /// <response code="401">Користувач не автентифікований.</response>
        /// <response code="403">Користувач не має прав адміністратора.</response>
        /// <response code="404">Продукт із вказаним ID не знайдено.</response>
        /// <response code="500">Помилка сервера під час оновлення продукту.</response>
        [HttpPut("{id}")]
        [ProducesResponseType(typeof(ProductDto), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UpdateProduct(Guid id, [FromForm] ProductUpdateDto productUpdateDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                var updatedProduct = await _productService.UpdateProductAsync(id, productUpdateDto);
                return Ok(updatedProduct);
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Внутрішня помилка сервера: {ex.Message}");
            }
        }

        /// <summary>
        /// Видаляє продукт за його ідентифікатором.
        /// </summary>
        /// <param name="id">Унікальний ідентифікатор продукту, який потрібно видалити.</param>
        /// <returns>204 No Content, якщо продукт успішно видалено, або 404 Not Found, якщо продукт не знайдено.</returns>
        /// <response code="204">Продукт успішно видалено.</response>
        /// <response code="401">Користувач не автентифікований.</response>
        /// <response code="403">Користувач не має прав адміністратора.</response>
        /// <response code="404">Продукт із вказаним ID не знайдено.</response>
        /// <response code="500">Помилка сервера під час видалення продукту.</response>
        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteProduct(Guid id)
        {
            try
            {
                await _productService.DeleteProductAsync(id);
                return NoContent(); // 204 No Content, оскільки немає тіла відповіді
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Внутрішня помилка сервера: {ex.Message}");
            }
        }

        /// <summary>
        /// Додає продукт до улюблених
        /// </summary>
        [HttpPost("favorites/{id}")]
        [ProducesResponseType(201)]
        [ProducesResponseType(400)]
        [Authorize]
        public async Task<IActionResult> AddFavorite(Guid id)
        {
            try
            {
                var product = await _productService.GetProductFromDBByIdAsync(id);
                var userId = GetUserIdFromClaims();
                if (userId == null)
                    return Unauthorized("Ідентифікатор користувача відсутній або недійсний.");

                var user = await _dbContext.Users
                           .Include(u => u.FavoriteProducts)
                           .FirstOrDefaultAsync(u => u.Id == userId);
                if (user == null)
                    return Unauthorized("Ідентифікатор користувача відсутній або недійсний.");

                if (user.FavoriteProducts.Any(p => p.Id == id))
                {
                    return Ok();
                }

                user.FavoriteProducts.Add(product);
                await _dbContext.SaveChangesAsync();

                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Внутрішня помилка сервера: {ex.Message}");
            }
        }

        /// <summary>
        /// Видаляє продукт з улюблених
        /// </summary>
        [HttpDelete("favorites/{id}")]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        [Authorize]
        public async Task<IActionResult> RemoveFavorite(Guid id)
        {
            try
            {
                var product = await _productService.GetProductFromDBByIdAsync(id);
                var userId = GetUserIdFromClaims();
                if (userId == null)
                    return Unauthorized("Ідентифікатор користувача відсутній або недійсний.");

                var user = await _dbContext.Users
                           .Include(u => u.FavoriteProducts)
                           .FirstOrDefaultAsync(u => u.Id == userId);
                if (user == null)
                    return Unauthorized("Ідентифікатор користувача відсутній або недійсний.");

                if (user.FavoriteProducts.All(p => p.Id != id))
                {
                    return NoContent();
                }

                user.FavoriteProducts.Remove(product);
                await _dbContext.SaveChangesAsync();

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Внутрішня помилка сервера: {ex.Message}");
            }
        }

        /// <summary>
        /// отримує улюблені продукти
        /// </summary>
        [HttpGet("favorites")]
        [ProducesResponseType(typeof(IEnumerable<Guid>), StatusCodes.Status200OK)]
        [ProducesResponseType(400)]
        [Authorize]
        public async Task<IActionResult> GetFavorites()
        {
            try
            {
                var userId = GetUserIdFromClaims();
                if (userId == null)
                    return Unauthorized("Ідентифікатор користувача відсутній або недійсний.");

                var user = await _dbContext.Users
                           .Include(u => u.FavoriteProducts)
                           .FirstOrDefaultAsync(u => u.Id == userId);
                if (user == null)
                    return Unauthorized("Ідентифікатор користувача відсутній або недійсний.");

                return Ok(user.FavoriteProducts.Select(p => p.Id));
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Внутрішня помилка сервера: {ex.Message}");
            }
        }

        #endregion

        private Guid? GetUserIdFromClaims()
        {
            var userIdString = User.FindFirstValue(ClaimTypes.NameIdentifier);
            return Guid.TryParse(userIdString, out var userId) ? userId : null;
        }
    }
}
