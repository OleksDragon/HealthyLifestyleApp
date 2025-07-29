using HealthyLifestyle.Application.DTOs.Working;
using HealthyLifestyle.Application.Interfaces.Working;
using HealthyLifestyle.Application.Services.Working;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace HealthyLifestyle.Api.Controllers.Working
{
    /// <summary>
    /// Controller for managing workouts
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    public class WorkoutController : ControllerBase
    {

        private readonly IWorkoutService _workoutService;

        public WorkoutController(IWorkoutService workoutService)
        {
            _workoutService = workoutService;
        }

        /// <summary>
        /// Retrieves a workout by its ID.
        /// </summary>
        /// <param name="id">The ID of the workout.</param>
        /// <returns>The workout or 404 Not Found if it doesn't exist.</returns>
        [HttpGet("{id}")]
        [ProducesResponseType(typeof(WorkoutDto), 200)]
        [ProducesResponseType(404)]
        [ProducesResponseType(401)] // Unauthorized (if not logged in)
        [Authorize] // <-- Only for authenticated users
        public async Task<IActionResult> GetWorkoutById(Guid id)
        {
            try
            {
                var workout = await _workoutService.GetWorkoutByIdAsync(id);
                return Ok(workout);
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
        /// Retrieves a list of all workouts.
        /// </summary>
        /// <returns>List of workouts.</returns>
        [HttpGet]
        [ProducesResponseType(typeof(IEnumerable<WorkoutDto>), 200)]
        [AllowAnonymous] // <-- Available to everyone (anonymous and authenticated)
        public async Task<IActionResult> GetAllWorkouts()
        {
            var workouts = await _workoutService.GetAllWorkoutsAsync();
            return Ok(workouts);
        }

        /// <summary>
        /// Creates a new workout.
        /// </summary>
        /// <param name="workoutCreateDto">The data for creating the workout.</param>
        /// <returns>The created workout.</returns>
        [HttpPost]
        [ProducesResponseType(typeof(WorkoutDto), 201)]
        [ProducesResponseType(400)]
        [ProducesResponseType(401)] // Unauthorized
        [ProducesResponseType(403)] // Forbidden
        [Authorize(Roles = "Admin")] // <-- Only for users with the "Admin" role
        public async Task<IActionResult> CreateWorkout([FromBody] WorkoutCreateDto workoutCreateDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                var createdWorkout = await _workoutService.CreateWorkoutAsync(workoutCreateDto);
                return CreatedAtAction(nameof(GetWorkoutById), new { id = createdWorkout.Id }, createdWorkout);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Внутрішня помилка сервера: {ex.Message}");
            }
        }

        /// <summary>
        /// Updates an existing workout.
        /// </summary>
        /// <param name="id">The ID of the workout to update.</param>
        /// <param name="workoutUpdateDto">The updated workout data.</param>
        /// <returns>The updated workout or 404 Not Found.</returns>
        [HttpPut("{id}")]
        [ProducesResponseType(typeof(WorkoutDto), 200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        [ProducesResponseType(401)]
        [ProducesResponseType(403)]
        [Authorize(Roles = "Admin")] // <-- Only for users with the "Admin" role
        public async Task<IActionResult> UpdateWorkout(Guid id, [FromBody] WorkoutUpdateDto workoutUpdateDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                var updatedWorkout = await _workoutService.UpdateWorkoutAsync(id, workoutUpdateDto);
                return Ok(updatedWorkout);
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
        /// Deletes a workout by its ID.
        /// </summary>
        /// <param name="id">The ID of the workout to delete.</param>
        /// <returns>204 No Content or 404 Not Found.</returns>
        [HttpDelete("{id}")]
        [ProducesResponseType(204)]
        [ProducesResponseType(404)]
        [ProducesResponseType(401)]
        [ProducesResponseType(403)]
        [Authorize(Roles = "Admin")] // <-- Only for users with the "Admin" role
        public async Task<IActionResult> DeleteWorkout(Guid id)
        {
            try
            {
                await _workoutService.DeleteWorkoutAsync(id);
                return NoContent(); // 204 No Content since no response body
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
