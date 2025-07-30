
using HealthyLifestyle.Application.DTOs.Working;
using HealthyLifestyle.Application.Interfaces;
using HealthyLifestyle.Application.Interfaces.Working;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace HealthyLifestyle.Api.Controllers.Working
{
    [Route("api/fitness-activities")]
    [ApiController]
    [Authorize]
    public class FitnessActivityController : ControllerBase
    {
        private readonly IFitnessActivityService _fitnessActivityService;

        public FitnessActivityController(IFitnessActivityService fitnessActivityService)
        {
            _fitnessActivityService = fitnessActivityService;
        }

        [HttpGet]
        [ProducesResponseType(typeof(IEnumerable<FitnessActivityDto>), 200)]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetAll()
        {
            var activities = await _fitnessActivityService.GetAllAsync();
            return Ok(activities);
        }
        [HttpGet("{id}")]
        [ProducesResponseType(typeof(FitnessActivityDto), 200)]
        [ProducesResponseType(404)]
        public async Task<IActionResult> GetById(Guid id)
        {
            var activity = await _fitnessActivityService.GetByIdAsync(id);
            if (activity == null)
                return NotFound();
            return Ok(activity);
        }

        [HttpGet("user/{userId}")]
        [ProducesResponseType(typeof(IEnumerable<FitnessActivityDto>), 200)]
        public async Task<IActionResult> GetByUserId(Guid userId)
        {
            var activities = await _fitnessActivityService.GetByUserIdAsync(userId);
            return Ok(activities);
        }

        [HttpPost]
        [ProducesResponseType(typeof(FitnessActivityDto), 201)]
        [ProducesResponseType(400)]
        public async Task<IActionResult> Create([FromBody] CreateFitnessActivityDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var created = await _fitnessActivityService.CreateAsync(dto);
            return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
        }

        [HttpPut("{id}")]
        [ProducesResponseType(typeof(FitnessActivityDto), 200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        public async Task<IActionResult> Update(Guid id, [FromBody] UpdateFitnessActivityDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                var updated = await _fitnessActivityService.UpdateAsync(id, dto);
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
        public async Task<IActionResult> Delete(Guid id)
        {
            try
            {
                await _fitnessActivityService.DeleteAsync(id);
                return NoContent();
            }
            catch (KeyNotFoundException)
            {
                return NotFound();
            }
        }

        [HttpDelete("workout/{workoutId}")]
        [ProducesResponseType(204)]
        public async Task<IActionResult> DeleteByWorkoutId(Guid workoutId)
        {
            await _fitnessActivityService.DeleteByWorkoutIdAsync(workoutId);
            return NoContent();
        }
    }
}