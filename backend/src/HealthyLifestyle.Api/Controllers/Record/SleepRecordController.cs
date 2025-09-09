using HealthyLifestyle.Application.DTOs.Record;
using HealthyLifestyle.Application.Interfaces.Record;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace HealthyLifestyle.Api.Controllers.Record
{
    /// <summary>
    /// Контролер для керування записами сну.
    /// </summary>
    [Route("api/sleep-record")]
    [ApiController]
    public class SleepRecordController : ControllerBase
    {
        private readonly ISleepRecordService _sleepRecordService;

        public SleepRecordController(ISleepRecordService sleepRecordService)
        {
            _sleepRecordService = sleepRecordService;
        }

        /// <summary>
        /// Отримує всі записи сну.
        /// </summary>
        [HttpGet]
        [ProducesResponseType(typeof(IEnumerable<SleepRecordDto>), 200)]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetAllSleepRecords()
        {
            var records = await _sleepRecordService.GetAllSleepRecordsAsync();
            return Ok(records);
        }

        /// <summary>
        /// Отримує запис сну за UserId.
        /// </summary>
        [HttpGet("{id}")]
        [ProducesResponseType(typeof(IEnumerable<SleepRecordDto>), 200)]
        [ProducesResponseType(404)]
        [Authorize]
        public async Task<IActionResult> GetSleepRecordById(Guid id)
        {
            try
            {
                var record = await _sleepRecordService.GetSleepRecordByIdAsync(id);
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
        /// Отримує запис сну за UserId та датою.
        /// </summary>
        [HttpGet("userid/{id}/date/{date}")]
        [ProducesResponseType(typeof(IEnumerable<SleepRecordDto>), 200)]
        [ProducesResponseType(404)]
        [Authorize]
        public async Task<IActionResult> GetSleepRecordByIdAnd(Guid id, DateTime date)
        {
            try
            {
                var record = await _sleepRecordService.GetSleepRecordByIdAndDateAsync(id, date);
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
        /// Створює новий запис сну.
        /// Параметри BedTime та WakeUpTime передаються в форматі "HH:mm"!!
        /// </summary>
        [HttpPost]
        [ProducesResponseType(typeof(SleepRecordDto), 201)]
        [ProducesResponseType(400)]
        [Authorize]
        public async Task<IActionResult> CreateSleepRecord([FromBody] SleepRecordCreateDto createDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                var createdRecord = await _sleepRecordService.CreateSleepRecordAsync(createDto);
                return CreatedAtAction(nameof(GetSleepRecordById), new { id = createdRecord.Id }, createdRecord);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Внутрішня помилка сервера: {ex.Message}");
            }
        }

        /// <summary>
        /// Оновлює запис сну за UserId.
        /// </summary>
        [HttpPut("{id}")]
        [ProducesResponseType(typeof(SleepRecordDto), 200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        [Authorize]
        public async Task<IActionResult> UpdateSleepRecord(Guid id, [FromBody] SleepRecordUpdateDto updateDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                var updatedRecord = await _sleepRecordService.UpdateSleepRecordAsync(id, updateDto);
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
        /// Видаляє запис сну за UserId.
        /// </summary>
        [HttpDelete("{id}")]
        [ProducesResponseType(204)]
        [ProducesResponseType(404)]
        [Authorize]
        public async Task<IActionResult> DeleteSleepRecord(Guid id)
        {
            try
            {
                await _sleepRecordService.DeleteSleepRecordAsync(id);
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
