
using HealthyLifestyle.Application.DTOs.MealTracker;
using HealthyLifestyle.Application.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace HealthyLifestyle.Api.Controllers
{
    [Route("api/meals")]
    [ApiController]
    [Authorize]
    public class MealController : ControllerBase
    {
        private readonly IMealService _mealService;

        public MealController(IMealService mealService)
        {
            _mealService = mealService;
        }

        [HttpGet]
        [ProducesResponseType(typeof(IEnumerable<MealDto>), 200)]
        [Authorize(Roles = "Admin")] // Typically only admins can get all meals
        public async Task<IActionResult> GetAll()
        {
            var meals = await _mealService.GetAllAsync();
            return Ok(meals);
        }
        [HttpGet("{id}")]
        [ProducesResponseType(typeof(MealDto), 200)]
        [ProducesResponseType(404)]
        public async Task<IActionResult> GetMealById(Guid id)
        {
            var meal = await _mealService.GetByIdAsync(id);
            if (meal == null)
                return NotFound();
            return Ok(meal);
        }

        [HttpGet("user/{userId}")]
        [ProducesResponseType(typeof(IEnumerable<MealDto>), 200)]
        public async Task<IActionResult> GetUserMeals(Guid userId)
        {
            var meals = await _mealService.GetByUserIdAsync(userId);
            return Ok(meals);
        }

        [HttpPost]
        [ProducesResponseType(typeof(MealDto), 201)]
        [ProducesResponseType(400)]
        public async Task<IActionResult> CreateMeal([FromBody] CreateMealDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var created = await _mealService.CreateAsync(dto);
            return CreatedAtAction(nameof(GetMealById), new { id = created.Id }, created);
        }

        [HttpPut("{id}")]
        [ProducesResponseType(typeof(MealDto), 200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        public async Task<IActionResult> UpdateMeal(Guid id, [FromBody] UpdateMealDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                var updated = await _mealService.UpdateAsync(id, dto);
                return Ok(updated);
            }
            catch (KeyNotFoundException)
            {
                return NotFound();
            }
        }

        [HttpDelete("{id}")]
        [ProducesResponseType(204)]
        [ProducesResponseType(404)]
        public async Task<IActionResult> DeleteMeal(Guid id)
        {
            try
            {
                await _mealService.DeleteAsync(id);
                return NoContent();
            }
            catch (KeyNotFoundException)
            {
                return NotFound();
            }
        }

        [HttpGet("user/{userId}/date/{date}")]
        [ProducesResponseType(typeof(IEnumerable<MealDto>), 200)]
        public async Task<IActionResult> GetMealsByDate(Guid userId, DateTime date)
        {
            var meals = await _mealService.GetByUserAndDateAsync(userId, date);
            return Ok(meals);
        }
    }
}