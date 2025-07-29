
using HealthyLifestyle.Application.DTOs.DietPlan;
using HealthyLifestyle.Application.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace HealthyLifestyle.Api.Controllers.MealTracker
{
    /// <summary>
    /// Controller for managing diet plans
    /// </summary>
    [Route("api/diet-plans")]
    [ApiController]
    [Authorize]
    public class DietPlanController : ControllerBase
    {
        private readonly IDietPlanService _dietPlanService;

        public DietPlanController(IDietPlanService dietPlanService)
        {
            _dietPlanService = dietPlanService;
        }

        /// <summary>
        /// Get all diet plans
        /// </summary>
        [HttpGet]
        [ProducesResponseType(typeof(IEnumerable<DietPlanDto>), 200)]
        public async Task<IActionResult> GetAll()
        {
            var dietPlans = await _dietPlanService.GetAllAsync();
            return Ok(dietPlans);
        }

        /// <summary>
        /// Get diet plan by ID
        /// </summary>
        /// <param name="id">Diet plan ID</param>
        [HttpGet("{id}")]
        [ProducesResponseType(typeof(DietPlanDto), 200)]
        [ProducesResponseType(404)]
        public async Task<IActionResult> GetById(Guid id)
        {
            var dietPlan = await _dietPlanService.GetByIdAsync(id);
            if (dietPlan == null)
                return NotFound();
            return Ok(dietPlan);
        }

        /// <summary>
        /// Get diet plans by client ID
        /// </summary>
        /// <param name="clientId">Client user ID</param>
        [HttpGet("client/{clientId}")]
        [ProducesResponseType(typeof(IEnumerable<DietPlanDto>), 200)]
        public async Task<IActionResult> GetByClientId(Guid clientId)
        {
            var dietPlans = await _dietPlanService.GetByClientIdAsync(clientId);
            return Ok(dietPlans);
        }

        /// <summary>
        /// Create new diet plan
        /// </summary>
        /// <param name="dto">Diet plan data</param>
        [HttpPost]
        [ProducesResponseType(typeof(DietPlanDto), 201)]
        [ProducesResponseType(400)]
        [Authorize(Roles = "Dietitian,Admin")]
        public async Task<IActionResult> Create([FromBody] CreateDietPlanDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var created = await _dietPlanService.CreateAsync(dto);
            return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
        }

        /// <summary>
        /// Update existing diet plan
        /// </summary>
        /// <param name="id">Diet plan ID</param>
        /// <param name="dto">Updated data</param>
        [HttpPut("{id}")]
        [ProducesResponseType(typeof(DietPlanDto), 200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        [Authorize(Roles = "Dietitian,Admin")]
        public async Task<IActionResult> Update(Guid id, [FromBody] UpdateDietPlanDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                var updated = await _dietPlanService.UpdateAsync(id, dto);
                return Ok(updated);
            }
            catch (KeyNotFoundException)
            {
                return NotFound();
            }
        }

        /// <summary>
        /// Delete diet plan
        /// </summary>
        /// <param name="id">Diet plan ID</param>
        [HttpDelete("{id}")]
        [ProducesResponseType(204)]
        [ProducesResponseType(404)]
        [Authorize(Roles = "Dietitian,Admin")]
        public async Task<IActionResult> Delete(Guid id)
        {
            try
            {
                await _dietPlanService.DeleteAsync(id);
                return NoContent();
            }
            catch (KeyNotFoundException)
            {
                return NotFound();
            }
        }
    }
}