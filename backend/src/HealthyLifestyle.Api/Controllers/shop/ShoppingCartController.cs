using HealthyLifestyle.Application.DTOs.Shop;
using HealthyLifestyle.Application.Interfaces.Shop;
using HealthyLifestyle.Application.Services.Shop;
using HealthyLifestyle.Infrastructure.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace HealthyLifestyle.Api.Controllers.shop
{
    [Route("api/[controller]")]
    [ApiController]
    public class ShoppingCartController : ControllerBase
    {
        private readonly IShopCartService _shopCartService;

        public ShoppingCartController(IShopCartService shopCartService)
        {
            _shopCartService = shopCartService;
        }

        #region Публічні методи API

        /// <summary>
        /// Отримує корзину користувача
        /// </summary>
        /// <response code="200">Корзина знайдена.</response>
        /// <response code="400">Невірні вхідні дані запиту.</response>
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [Authorize]
        public async Task<ActionResult<ShoppingCartDto>> GetCartByUserId()
        {
            var userId = GetUserIdFromClaims();
            if (userId != null)
            {
                var cart = await _shopCartService.GetCartByUserIdAsync(userId.Value);

                if (cart == null)
                {
                    return NotFound();
                }

                return Ok(cart);
            }
            return StatusCode(StatusCodes.Status400BadRequest);
        }

        /// <summary>
        /// Додає продукт до корзини
        /// </summary>
        /// <param name="shoppingCartItemDto">Продукт, шо додається до корзини.</param>
        /// <response code="200">Продукт успішно доданий до корзини.</response>
        /// <response code="400">Невірні вхідні дані запиту.</response>
        [HttpPut("add")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [Authorize]
        public async Task<ActionResult> AddProductToCart([FromBody] ShoppingCartItemDto shoppingCartItemDto)
        {
            var userId = GetUserIdFromClaims();
            if (userId == null)
            {
                return StatusCode(StatusCodes.Status400BadRequest);
            }

            await _shopCartService.AddProductAsync(userId.Value, shoppingCartItemDto);

            return StatusCode(StatusCodes.Status200OK);
        }

        /// <summary>
        /// Видаляє продукт з корзини
        /// </summary>
        /// <param name="removeProductDto">Продукт, що видаляється з корзини.</param>
        /// <response code="200">Продукт успішно видалений з корзини.</response>
        /// <response code="400">Невірні вхідні дані запиту, або корзини не існує.</response>
        [HttpPut("remove")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [Authorize]
        public async Task<ActionResult> RemoveProductFromCart([FromBody] RemoveProductDto removeProductDto)
        {
            var userId = GetUserIdFromClaims();
            if (userId != null)
            {
                await _shopCartService.DeleteProductAsync(userId.Value, removeProductDto.ProductId);

                return StatusCode(StatusCodes.Status200OK);
            }
            return StatusCode(StatusCodes.Status400BadRequest);
        }

        /// <summary>
        /// Змінює кількість певного продукту
        /// </summary>
        /// <param name="shoppingCartItemDto">Продукт, кількість якого змінюється.</param>
        /// <response code="200">Продукт успішно видалений з корзини.</response>
        /// <response code="400">Невірні вхідні дані запиту, або корзини не існує.</response>
        [HttpPut("amount")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [Authorize]
        public async Task<ActionResult> ChangeProductAmountInCart([FromBody] ShoppingCartItemDto shoppingCartItemDto)
        {
            var userId = GetUserIdFromClaims();
            if (userId != null)
            {
                await _shopCartService.ChangeProductAmountAsync(userId.Value, shoppingCartItemDto.ProductId, shoppingCartItemDto.Quantity);

                return StatusCode(StatusCodes.Status200OK);
            }
            return StatusCode(StatusCodes.Status400BadRequest);
        }

        /// <summary>
        /// Очищує корзину
        /// </summary>
        /// <response code="200">Корзина успішно очищена.</response>
        /// <response code="400">Невірні вхідні дані запиту, або корзини не існує.</response>
        [HttpPut("clear")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [Authorize]
        public async Task<ActionResult> ClearCart()
        {
            var userId = GetUserIdFromClaims();
            if (userId != null)
            {
                await _shopCartService.ClearCartAsync(userId.Value);

                return StatusCode(StatusCodes.Status200OK);
            }
            return StatusCode(StatusCodes.Status400BadRequest);
        }

        #endregion

        private Guid? GetUserIdFromClaims()
        {
            var userIdString = User.FindFirstValue(ClaimTypes.NameIdentifier);
            return Guid.TryParse(userIdString, out var userId) ? userId : null;
        }
    }
}
