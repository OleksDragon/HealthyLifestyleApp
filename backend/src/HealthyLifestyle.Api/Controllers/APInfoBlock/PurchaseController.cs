using HealthyLifestyle.Application.DTOs.APInfoBlock;
using HealthyLifestyle.Application.Interfaces.APInfoBlock;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace HealthyLifestyle.Api.Controllers.APInfoBlock
{
    /// <summary>
    /// Контролер для керування покупками користувачів.
    /// </summary>
    [Route("api/purchases")]
    [ApiController]
    public class PurchaseController : ControllerBase
    {
        private readonly IPurchaseService _purchaseService;

        public PurchaseController(IPurchaseService purchaseService)
        {
            _purchaseService = purchaseService;
        }

        /// <summary>
        /// Отримує всі покупки.
        /// </summary>
        [HttpGet]
        [ProducesResponseType(typeof(IEnumerable<PurchaseDto>), 200)]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetAllPurchases()
        {
            var purchases = await _purchaseService.GetAllPurchasesAsync();
            return Ok(purchases);
        }

        /// <summary>
        /// Отримує покупки користувача за ID.
        /// </summary>
        [HttpGet("user/{userId}")]
        [ProducesResponseType(typeof(List<PurchaseDto>), 200)]
        [ProducesResponseType(404)]
        [Authorize]
        public async Task<IActionResult> GetPurchasesByUserId(Guid userId)
        {
            try
            {
                var purchases = await _purchaseService.GetPurchasesByUserIdAsync(userId);
                return Ok(purchases);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Внутрішня помилка сервера: {ex.Message}");
            }
        }

        /// <summary>
        /// Створює нову покупку.
        /// </summary>
        [HttpPost]
        [ProducesResponseType(typeof(PurchaseDto), 201)]
        [ProducesResponseType(400)]
        [Authorize]
        public async Task<IActionResult> CreatePurchase([FromBody] PurchaseCreateDto createDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                var createdPurchase = await _purchaseService.CreatePurchaseAsync(createDto);
                return CreatedAtAction(nameof(GetPurchasesByUserId), new { userId = createdPurchase.UserId }, createdPurchase);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Внутрішня помилка сервера: {ex.Message}");
            }
        }

        /// <summary>
        /// Видаляє покупку.
        /// </summary>
        [HttpDelete("{id}")]
        [ProducesResponseType(204)]
        [ProducesResponseType(404)]
        [Authorize]
        public async Task<IActionResult> DeletePurchase(Guid id)
        {
            try
            {
                await _purchaseService.DeletePurchaseAsync(id);
                return NoContent();
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
    }
}