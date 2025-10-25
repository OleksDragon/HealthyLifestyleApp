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
        /// - <see cref="BadRequest(object)"/> якщо ідентифікатор недійсний.
        /// - <see cref="NotFound(object)"/> якщо деталі або кваліфікація не знайдені.
        /// - <see cref="StatusCode(StatusCodes.Status403Forbidden, object)"/> якщо доступ заборонено.
        /// </returns>
        [HttpGet]
        [AllowAnonymous] // Дозволяє доступ для схвалених профілів
        [ProducesResponseType(typeof(PsychologistDetailsDto), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        public async Task<IActionResult> GetPsychologistDetails(Guid qualificationId)
        {
            if (qualificationId == Guid.Empty)
            {
                return BadRequest("Ідентифікатор кваліфікації не може бути порожнім.");
            }

            var psychologistDetails = await _psychologistDetailsService.GetPsychologistDetailsByQualificationIdAsync(qualificationId);
            if (psychologistDetails == null)
            {
                return NotFound($"Деталі психолога для кваліфікації ID {qualificationId} не знайдено.");
            }

            var qualification = await _professionalQualificationService.GetQualificationByIdAsync(qualificationId);
            if (qualification == null)
            {
                return NotFound($"Кваліфікація з ID {qualificationId} не знайдена.");
            }

            if (qualification.QualificationStatus != QualificationStatus.Approved)
            {
                var userIdString = User.FindFirstValue(ClaimTypes.NameIdentifier);
                if (string.IsNullOrEmpty(userIdString) || !Guid.TryParse(userIdString, out var currentUserId))
                {
                    return StatusCode(StatusCodes.Status403Forbidden, new { message = "У вас немає прав доступу до неопублікованого профілю психолога." });
                }

                if (qualification.UserId != currentUserId && !User.IsInRole(RoleNames.Admin))
                {
                    return StatusCode(StatusCodes.Status403Forbidden, new { message = "У вас немає прав доступу до неопублікованого профілю психолога, якщо ви не є його власником або адміністратором." });
                }
            }

            return Ok(psychologistDetails);
        }

        /// <summary>
        /// Створює нові деталі психолога для існуючої професійної кваліфікації.
        /// </summary>
        /// <param name="qualificationId">Ідентифікатор професійної кваліфікації. Не може бути Guid.Empty.</param>
        /// <param name="request">DTO з даними для створення деталей психолога. Не може бути null.</param>
        /// <returns>
        /// - <see cref="CreatedAtAction"/> з <see cref="PsychologistDetailsDto"/> при успішному створенні.
        /// - <see cref="BadRequest(object)"/> при невалідних даних або ідентифікаторі.
        /// - <see cref="Conflict(object)"/> якщо деталі вже існують.
        /// - <see cref="StatusCode(StatusCodes.Status403Forbidden, object)"/> при недостатніх правах.
        /// - <see cref="NotFound(object)"/> якщо кваліфікація не знайдена.
        /// - <see cref="Unauthorized(object)"/> при відсутності автентифікації.
        /// </returns>
        [HttpPost]
        [ProducesResponseType(typeof(PsychologistDetailsDto), StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status409Conflict)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
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

            var userIdString = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrEmpty(userIdString) || !Guid.TryParse(userIdString, out var currentUserId))
            {
                return Unauthorized("Недійсний ідентифікатор користувача в токені.");
            }

            var targetQualification = await GetTargetQualification(qualificationId, currentUserId);
            if (targetQualification == null)
            {
                return StatusCode(StatusCodes.Status403Forbidden, new { message = "Ви можете створювати деталі лише для власної кваліфікації психолога." });
            }

            var createdDetails = await _psychologistDetailsService.CreatePsychologistDetailsAsync(qualificationId, request);
            if (createdDetails == null)
            {
                return Conflict($"Деталі психолога для кваліфікації ID {qualificationId} вже існують.");
            }

            return CreatedAtAction(nameof(GetPsychologistDetails), new { qualificationId = createdDetails.QualificationId }, createdDetails);
        }

        /// <summary>
        /// Оновлює існуючі деталі психолога.
        /// </summary>
        /// <param name="qualificationId">Ідентифікатор професійної кваліфікації. Не може бути Guid.Empty.</param>
        /// <param name="request">DTO з оновленими даними для деталей психолога. Не може бути null.</param>
        /// <returns>
        /// - <see cref="Ok(object)"/> з <see cref="PsychologistDetailsDto"/> при успішному оновленні.
        /// - <see cref="BadRequest(object)"/> при невалідних даних або ідентифікаторі.
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

            var userIdString = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrEmpty(userIdString) || !Guid.TryParse(userIdString, out var currentUserId))
            {
                return Unauthorized("Недійсний ідентифікатор користувача в токені.");
            }

            var targetQualification = await GetTargetQualification(qualificationId, currentUserId);
            if (targetQualification == null)
            {
                return StatusCode(StatusCodes.Status403Forbidden, new { message = "Ви можете оновлювати деталі лише для власної кваліфікації психолога." });
            }

            var updatedDetails = await _psychologistDetailsService.UpdatePsychologistDetailsAsync(qualificationId, request);
            if (updatedDetails == null)
            {
                return NotFound($"Деталі психолога для кваліфікації ID {qualificationId} не знайдено або оновлення не вдалося.");
            }

            return Ok(updatedDetails);
        }

        /// <summary>
        /// Видаляє деталі психолога за ідентифікатором професійної кваліфікації.
        /// </summary>
        /// <param name="qualificationId">Ідентифікатор професійної кваліфікації. Не може бути Guid.Empty.</param>
        /// <returns>
        /// - <see cref="NoContent"/> у випадку успіху.
        /// - <see cref="BadRequest(object)"/> якщо ідентифікатор недійсний.
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

            var userIdString = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrEmpty(userIdString) || !Guid.TryParse(userIdString, out var currentUserId))
            {
                return Unauthorized("Недійсний ідентифікатор користувача в токені.");
            }

            UserProfessionalQualificationDto? targetQualification;

            if (User.IsInRole(RoleNames.Admin))
            {
                targetQualification = await _professionalQualificationService.GetQualificationByIdAsync(qualificationId);
                if (targetQualification == null || targetQualification.ProfessionalRoleType?.Name != RoleNames.Psychologist)
                {
                    return NotFound($"Кваліфікація ID {qualificationId} не знайдена або не є кваліфікацією психолога.");
                }
            }
            else if (User.IsInRole(RoleNames.Psychologist))
            {
                var userQualifications = await _professionalQualificationService.GetUserProfessionalQualificationsAsync(currentUserId);
                targetQualification = userQualifications?.FirstOrDefault(q => q.Id == qualificationId && q.ProfessionalRoleType?.Name == RoleNames.Psychologist);

                if (targetQualification == null)
                {
                    return StatusCode(StatusCodes.Status403Forbidden, new { message = "Ви можете видаляти деталі лише для власної кваліфікації психолога." });
                }
            }
            else
            {
                return StatusCode(StatusCodes.Status403Forbidden, new { message = "У вас немає прав для видалення деталей психолога." });
            }

            var isDeleted = await _psychologistDetailsService.DeletePsychologistDetailsAsync(qualificationId);
            if (!isDeleted)
            {
                return NotFound($"Деталі психолога для кваліфікації ID {qualificationId} не знайдено або видалення не вдалося.");
            }

            return NoContent();
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
            var qualification = await _professionalQualificationService.GetQualificationByIdAsync(qualificationId);

            if (qualification == null || qualification.ProfessionalRoleType?.Name != RoleNames.Psychologist)
            {
                return null;
            }

            // Allow if user is admin, has psychologist role, OR owns the qualification
            if (User.IsInRole(RoleNames.Admin) ||
                User.IsInRole(RoleNames.Psychologist) ||
                qualification.UserId == currentUserId)
            {
                return qualification;
            }

            return null;
        }

        #endregion
    }
}


        /// <summary>

        /// Оновлює існуючі деталі психолога.

        /// </summary>

        /// <param name="qualificationId">Ідентифікатор професійної кваліфікації. Не може бути Guid.Empty.</param>

        /// <param name="request">DTO з оновленими даними для деталей психолога. Не може бути null.</param>

        /// <returns>

        /// - <see cref="Ok(object)"/> з <see cref="PsychologistDetailsDto"/> при успішному оновленні.

        /// - <see cref="BadRequest(object)"/> при невалідних даних або ідентифікаторі.

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



            var userIdString = User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (string.IsNullOrEmpty(userIdString) || !Guid.TryParse(userIdString, out var currentUserId))

            {

                return Unauthorized("Недійсний ідентифікатор користувача в токені.");

            }



            var targetQualification = await GetTargetQualification(qualificationId, currentUserId);

            if (targetQualification == null)

            {

                return StatusCode(StatusCodes.Status403Forbidden, new { message = "Ви можете оновлювати деталі лише для власної кваліфікації психолога." });

            }



            var updatedDetails = await _psychologistDetailsService.UpdatePsychologistDetailsAsync(qualificationId, request);

            if (updatedDetails == null)

            {

                return NotFound($"Деталі психолога для кваліфікації ID {qualificationId} не знайдено або оновлення не вдалося.");

            }



            return Ok(updatedDetails);

        }



        /// <summary>

        /// Видаляє деталі психолога за ідентифікатором професійної кваліфікації.

        /// </summary>

        /// <param name="qualificationId">Ідентифікатор професійної кваліфікації. Не може бути Guid.Empty.</param>

        /// <returns>

        /// - <see cref="NoContent"/> у випадку успіху.

        /// - <see cref="BadRequest(object)"/> якщо ідентифікатор недійсний.

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



            var userIdString = User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (string.IsNullOrEmpty(userIdString) || !Guid.TryParse(userIdString, out var currentUserId))

            {

                return Unauthorized("Недійсний ідентифікатор користувача в токені.");

            }



            UserProfessionalQualificationDto? targetQualification;



            if (User.IsInRole(RoleNames.Admin))

            {

                targetQualification = await _professionalQualificationService.GetQualificationByIdAsync(qualificationId);

                if (targetQualification == null || targetQualification.ProfessionalRoleType?.Name != RoleNames.Psychologist)

                {

                    return NotFound($"Кваліфікація ID {qualificationId} не знайдена або не є кваліфікацією психолога.");

                }

            }

            else if (User.IsInRole(RoleNames.Psychologist))

            {

                var userQualifications = await _professionalQualificationService.GetUserProfessionalQualificationsAsync(currentUserId);

                targetQualification = userQualifications?.FirstOrDefault(q => q.Id == qualificationId && q.ProfessionalRoleType?.Name == RoleNames.Psychologist);



                if (targetQualification == null)

                {

                    return StatusCode(StatusCodes.Status403Forbidden, new { message = "Ви можете видаляти деталі лише для власної кваліфікації психолога." });

                }

            }

            else

            {

                return StatusCode(StatusCodes.Status403Forbidden, new { message = "У вас немає прав для видалення деталей психолога." });

            }



            var isDeleted = await _psychologistDetailsService.DeletePsychologistDetailsAsync(qualificationId);

            if (!isDeleted)

            {

                return NotFound($"Деталі психолога для кваліфікації ID {qualificationId} не знайдено або видалення не вдалося.");

            }



            return NoContent();

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

            if (User.IsInRole(RoleNames.Admin))

            {

                var targetQualification = await _professionalQualificationService.GetQualificationByIdAsync(qualificationId);

                if (targetQualification == null || targetQualification.ProfessionalRoleType?.Name != RoleNames.Psychologist)

                {

                    return null;

                }

                return targetQualification;

            }

            else if (User.IsInRole(RoleNames.Psychologist))

            {

                var userQualifications = await _professionalQualificationService.GetUserProfessionalQualificationsAsync(currentUserId);

                var targetQualification = userQualifications?.FirstOrDefault(q => q.Id == qualificationId && q.ProfessionalRoleType?.Name == RoleNames.Psychologist);

                return targetQualification;

            }

            return null;

        }



        #endregion

    }

}
