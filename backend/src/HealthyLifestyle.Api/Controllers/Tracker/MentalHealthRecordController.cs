using HealthyLifestyle.Application.DTOs.Tracker;
using HealthyLifestyle.Application.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace HealthyLifestyle.Api.Controllers.Tracker
{
    /// <summary>
    /// Контролер для керування записами ментального здоров’я.
    /// </summary>
    [Route("api/mental-health-record")]
    [ApiController]
    public class MentalHealthRecordController : ControllerBase
    {
        private readonly IMentalHealthRecordService _mentalHealthRecordService;

        public MentalHealthRecordController(IMentalHealthRecordService mentalHealthRecordService)
        {
            _mentalHealthRecordService = mentalHealthRecordService;
        }

        /// <summary>
        /// Отримує всі записи ментального здоров’я.
        /// </summary>
        [HttpGet]
        [ProducesResponseType(typeof(IEnumerable<MentalHealthRecordDto>), 200)]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetAllMentalHealthRecords()
        {
            var records = await _mentalHealthRecordService.GetAllMentalHealthRecordsAsync();
            return Ok(records);
        }

        /// <summary>
        /// Отримує запис ментального здоров’я за ID.
        /// </summary>
        [HttpGet("{id}")]
        [ProducesResponseType(typeof(MentalHealthRecordDto), 200)]
        [ProducesResponseType(404)]
        [Authorize]
        public async Task<IActionResult> GetMentalHealthRecordById(Guid id)
        {
            try
            {
                var record = await _mentalHealthRecordService.GetMentalHealthRecordByIdAsync(id);
                return Ok(record);
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
        /// Створює новий запис ментального здоров’я.
        /// </summary>
        [HttpPost]
        [ProducesResponseType(typeof(MentalHealthRecordDto), 201)]
        [ProducesResponseType(400)]
        [Authorize]
        public async Task<IActionResult> CreateMentalHealthRecord([FromBody] MentalHealthRecordCreateDto createDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                var createdRecord = await _mentalHealthRecordService.CreateMentalHealthRecordAsync(createDto);
                return CreatedAtAction(nameof(GetMentalHealthRecordById), new { id = createdRecord.Id }, createdRecord);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Внутрішня помилка сервера: {ex.Message}");
            }
        }

        /// <summary>
        /// Оновлює запис ментального здоров’я.
        /// </summary>
        [HttpPut("{id}")]
        [ProducesResponseType(typeof(MentalHealthRecordDto), 200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        [Authorize]
        public async Task<IActionResult> UpdateMentalHealthRecord(Guid id, [FromBody] MentalHealthRecordUpdateDto updateDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                var updatedRecord = await _mentalHealthRecordService.UpdateMentalHealthRecordAsync(id, updateDto);
                return Ok(updatedRecord);
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
        /// Видаляє запис ментального здоров’я.
        /// </summary>
        [HttpDelete("{id}")]
        [ProducesResponseType(204)]
        [ProducesResponseType(404)]
        [Authorize]
        public async Task<IActionResult> DeleteMentalHealthRecord(Guid id)
        {
            try
            {
                await _mentalHealthRecordService.DeleteMentalHealthRecordAsync(id);
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
