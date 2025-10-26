using HealthyLifestyle.Application.DTOs.ProfessionalQualification;
using HealthyLifestyle.Application.Interfaces.ProfessionalQualification;
using HealthyLifestyle.Core.Enums;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace HealthyLifestyle.Api.Controllers.ProfessionalQualification
{
    /// <summary>
    /// API-контролер для управління деталями психологів.
    /// Надає методи для отримання, створення, оновлення та видалення деталей психолога.
    /// </summary>
    [ApiController]
    [Route("api/professional-qualification/{qualificationId}/psychologist-details")]
    [Authorize] // Застосовуємо авторизацію на рівні контролера для всіх дій
    public class PsychologistDetailsController : ControllerBase
    {
        #region Private Fields

        private readonly IPsychologistDetailsService _psychologistDetailsService;
        private readonly IProfessionalQualificationService _professionalQualificationService;

        #endregion

        #region Constructor

        /// <summary>
        /// Ініціалізує новий екземпляр класу <see cref="PsychologistDetailsController"/>.
        /// </summary>
        /// <param name="psychologistDetailsService">Сервіс для управління деталями психолога. Не може бути null.</param>
        /// <param name="professionalQualificationService">Сервіс для перевірки професійних кваліфікацій. Не може бути null.</param>
        /// <exception cref="ArgumentNullException">Виникає, якщо будь-який із параметрів є null.</exception>
        public PsychologistDetailsController(
            IPsychologistDetailsService psychologistDetailsService,
            IProfessionalQualificationService professionalQualificationService)
        {
            _psychologistDetailsService = psychologistDetailsService ?? throw new ArgumentNullException(nameof(psychologistDetailsService));
            _professionalQualificationService = professionalQualificationService ?? throw new ArgumentNullException(nameof(professionalQualificationService));
        }

        #endregion

        #region Public Methods

        /// <summary>
        /// Отримує деталі психолога за ідентифікатором професійної кваліфікації.
        /// Доступно для анонімних користувачів для схвалених профілів, а також для адміністраторів або власника профілю.
        /// </summary>
        /// <param name="qualificationId">Ідентифікатор професійної кваліфікації. Не може бути Guid.Empty.</param>
        /// <returns>
        /// - <see cref="Ok(object)"/> з <see cref="PsychologistDetailsDto"/> при успішному отриманні.
        /// - <see cref="NotFound(object)"/> якщо деталі не знайдені.
        /// - <see cref="BadRequest(object)"/> при невалідних параметрах.
        /// - <see cref="StatusCode(StatusCodes.Status403Forbidden, object)"/> при недостатніх правах.
        /// - <see cref="Unauthorized(object)"/> при відсутності автентифікації.
        /// </returns>
        [HttpGet]
        [ProducesResponseType(typeof(PsychologistDetailsDto), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<IActionResult> GetPsychologistDetails(Guid qualificationId)
        {
            if (qualificationId == Guid.Empty)
            {
                return BadRequest("Ідентифікатор кваліфікації не може бути порожнім.");
            }

            try
            {
                var currentUserId = GetCurrentUserId();
                if (currentUserId == null)
                {
                    return Unauthorized("Ідентифікатор користувача відсутній або недійсний.");
                }

                var targetQualification = await GetTargetQualification(qualificationId, currentUserId.Value);
                if (targetQualification == null)
                {
                    return StatusCode(StatusCodes.Status403Forbidden, "Доступ до цієї кваліфікації заборонено.");
                }

                var details = await _psychologistDetailsService.GetPsychologistDetailsByQualificationIdAsync(qualificationId);
                if (details == null)
                {
                    return NotFound("Деталі психолога не знайдені.");
                }

                return Ok(details);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Внутрішня помилка сервера: {ex.Message}");
            }
        }

        /// <summary>
        /// Створює нові деталі психолога для вказаної кваліфікації.
        /// Доступно тільки для адміністраторів або власника кваліфікації.
        /// </summary>
        /// <param name="qualificationId">Ідентифікатор професійної кваліфікації. Не може бути Guid.Empty.</param>
        /// <param name="request">DTO з даними для створення деталей психолога. Не може бути null.</param>
        /// <returns>
        /// - <see cref="CreatedAtAction(string, object, object)"/> з <see cref="PsychologistDetailsDto"/> при успішному створенні.
        /// - <see cref="BadRequest(object)"/> при невалідних даних.
        /// - <see cref="StatusCode(StatusCodes.Status403Forbidden, object)"/> при недостатніх правах.
        /// - <see cref="Unauthorized(object)"/> при відсутності автентифікації.
        /// </returns>
        [HttpPost]
        [ProducesResponseType(typeof(PsychologistDetailsDto), StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<IActionResult> CreatePsychologistDetails(Guid qualificationId, [FromBody] PsychologistDetailsDto request)
        {
            if (qualificationId == Guid.Empty)
            {
                return BadRequest("Ідентифікатор кваліфікації не може бути порожнім.");
            }

            if (request == null)
            {
                return BadRequest("Дані запиту не можуть бути null.");
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var currentUserId = GetCurrentUserId();
                if (currentUserId == null)
                {
                    return Unauthorized("Ідентифікатор користувача відсутній або недійсний.");
                }

                var targetQualification = await GetTargetQualification(qualificationId, currentUserId.Value);
                if (targetQualification == null)
                {
                    return StatusCode(StatusCodes.Status403Forbidden, "Доступ до цієї кваліфікації заборонено.");
                }

                request.QualificationId = qualificationId;
                var createdDetails = await _psychologistDetailsService.CreatePsychologistDetailsAsync(qualificationId, request);

                return CreatedAtAction(
                    nameof(GetPsychologistDetails),
                    new { qualificationId },
                    createdDetails);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Внутрішня помилка сервера: {ex.Message}");
            }
        }

        /// <summary>
        /// Оновлює існуючі деталі психолога для вказаної кваліфікації.
        /// Доступно тільки для адміністраторів або власника кваліфікації.
        /// </summary>
        /// <param name="qualificationId">Ідентифікатор професійної кваліфікації. Не може бути Guid.Empty.</param>
        /// <param name="request">DTO з оновленими даними деталей психолога. Не може бути null.</param>
        /// <returns>
        /// - <see cref="Ok(object)"/> з <see cref="PsychologistDetailsDto"/> при успішному оновленні.
        /// - <see cref="BadRequest(object)"/> при невалідних даних.
        /// - <see cref="NotFound(object)"/> якщо деталі не знайдені.
        /// - <see cref="StatusCode(StatusCodes.Status403Forbidden, object)"/> при недостатніх правах.
        /// - <see cref="Unauthorized(object)"/> при відсутності автентифікації.
        /// </returns>
        [HttpPut]
        [ProducesResponseType(typeof(PsychologistDetailsDto), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<IActionResult> UpdatePsychologistDetails(Guid qualificationId, [FromBody] PsychologistDetailsDto request)
        {
            if (qualificationId == Guid.Empty)
            {
                return BadRequest("Ідентифікатор кваліфікації не може бути порожнім.");
            }

            if (request == null)
            {
                return BadRequest("Дані запиту не можуть бути null.");
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var currentUserId = GetCurrentUserId();
                if (currentUserId == null)
                {
                    return Unauthorized("Ідентифікатор користувача відсутній або недійсний.");
                }

                var targetQualification = await GetTargetQualification(qualificationId, currentUserId.Value);
                if (targetQualification == null)
                {
                    return StatusCode(StatusCodes.Status403Forbidden, "Доступ до цієї кваліфікації заборонено.");
                }

                request.QualificationId = qualificationId;
                var updatedDetails = await _psychologistDetailsService.UpdatePsychologistDetailsAsync(qualificationId, request);
                if (updatedDetails == null)
                {
                    return NotFound("Деталі психолога не знайдені для оновлення.");
                }

                return Ok(updatedDetails);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Внутрішня помилка сервера: {ex.Message}");
            }
        }

        /// <summary>
        /// Видаляє деталі психолога для вказаної кваліфікації.
        /// Доступно тільки для адміністраторів або власника кваліфікації.
        /// </summary>
        /// <param name="qualificationId">Ідентифікатор професійної кваліфікації. Не може бути Guid.Empty.</param>
        /// <returns>
        /// - <see cref="NoContent()"/> при успішному видаленні.
        /// - <see cref="BadRequest(object)"/> при невалідних параметрах.
        /// - <see cref="NotFound(object)"/> якщо деталі не знайдені.
        /// - <see cref="StatusCode(StatusCodes.Status403Forbidden, object)"/> при недостатніх правах.
        /// - <see cref="Unauthorized(object)"/> при відсутності автентифікації.
        /// </returns>
        [HttpDelete]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<IActionResult> DeletePsychologistDetails(Guid qualificationId)
        {
            if (qualificationId == Guid.Empty)
            {
                return BadRequest("Ідентифікатор кваліфікації не може бути порожнім.");
            }

            try
            {
                var currentUserId = GetCurrentUserId();
                if (currentUserId == null)
                {
                    return Unauthorized("Ідентифікатор користувача відсутній або недійсний.");
                }

                var targetQualification = await GetTargetQualification(qualificationId, currentUserId.Value);
                if (targetQualification == null)
                {
                    return StatusCode(StatusCodes.Status403Forbidden, "Доступ до цієї кваліфікації заборонено.");
                }

                var success = await _psychologistDetailsService.DeletePsychologistDetailsAsync(qualificationId);
                if (!success)
                {
                    return NotFound("Деталі психолога не знайдені для видалення.");
                }

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Внутрішня помилка сервера: {ex.Message}");
            }
        }

        #endregion

        #region Private Methods

        /// <summary>
        /// Отримує цільову кваліфікацію для поточного користувача.
        /// </summary>
        /// <param name="qualificationId">Ідентифікатор кваліфікації.</param>
        /// <param name="currentUserId">Ідентифікатор поточного користувача.</param>
        /// <returns>Цільову кваліфікацію або null, якщо доступ заборонено.</returns>
        private async Task<UserProfessionalQualificationDto?> GetTargetQualification(Guid qualificationId, Guid currentUserId)
        {
            var targetQualification = await _professionalQualificationService.GetQualificationByIdAsync(qualificationId);
            
            if (targetQualification == null || targetQualification.ProfessionalRoleType?.Name != RoleNames.Psychologist)
            {
                return null;
            }
            
            // Адмін може керувати будь-якою кваліфікацією психолога
            if (User.IsInRole(RoleNames.Admin))
            {
                return targetQualification;
            }
            
            // Користувач з роллю психолога може керувати своїми кваліфікаціями
            if (User.IsInRole(RoleNames.Psychologist) && targetQualification.UserId == currentUserId)
            {
                return targetQualification;
            }
            
            // Звичайний користувач може керувати своїми кваліфікаціями (поки чекає схвалення)
            if (User.IsInRole(RoleNames.User) && targetQualification.UserId == currentUserId)
            {
                return targetQualification;
            }
            
            return null;
        }

        /// <summary>
        /// Отримує ідентифікатор поточного користувача з токена.
        /// </summary>
        /// <returns>Ідентифікатор користувача або null, якщо не вдалося отримати.</returns>
        private Guid? GetCurrentUserId()
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
            if (userIdClaim != null && Guid.TryParse(userIdClaim.Value, out var userId))
            {
                return userId;
            }
            return null;
        }

        #endregion
    }
}