using HealthyLifestyle.Application.DTOs.ProfessionalQualification;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using HealthyLifestyle.Core.Enums;
using HealthyLifestyle.Application.Interfaces.ProfessionalQualification;

namespace HealthyLifestyle.Api.Controllers.ProfessionalQualification
{
    /// <summary>
    /// API-контролер для управління деталями тренерів.
    /// Надає методи для отримання, створення, оновлення та видалення деталей тренера.
    /// </summary>
    [ApiController]
    [Route("api/professional-qualification/{qualificationId}/trainer-details")]
    [Authorize] // Застосовуємо авторизацію на рівні контролера для всіх дій
    public class TrainerDetailsController : ControllerBase
    {
        #region Private Fields

        private readonly ITrainerDetailsService _trainerDetailsService;
        private readonly IProfessionalQualificationService _professionalQualificationService;

        #endregion

        #region Constructor

        /// <summary>
        /// Ініціалізує новий екземпляр класу <see cref="TrainerDetailsController"/>.
        /// </summary>
        /// <param name="trainerDetailsService">Сервіс для управління деталями тренера. Не може бути null.</param>
        /// <param name="professionalQualificationService">Сервіс для перевірки професійних кваліфікацій. Не може бути null.</param>
        /// <exception cref="ArgumentNullException">Виникає, якщо будь-який із параметрів є null.</exception>
        public TrainerDetailsController(
            ITrainerDetailsService trainerDetailsService,
            IProfessionalQualificationService professionalQualificationService)
        {
            _trainerDetailsService = trainerDetailsService ?? throw new ArgumentNullException(nameof(trainerDetailsService));
            _professionalQualificationService = professionalQualificationService ?? throw new ArgumentNullException(nameof(professionalQualificationService));
        }

        #endregion

        #region Public Methods

        /// <summary>
        /// Отримує деталі тренера за ідентифікатором професійної кваліфікації.
        /// Доступно для анонімних користувачів для схвалених профілів, а також для адміністраторів або власника профілю.
        /// </summary>
        /// <param name="qualificationId">Ідентифікатор професійної кваліфікації. Не може бути Guid.Empty.</param>
        /// <returns>
        /// - <see cref="Ok(object)"/> з <see cref="TrainerDetailsDto"/> при успішному отриманні.
        /// - <see cref="BadRequest(object)"/> якщо ідентифікатор недійсний.
        /// - <see cref="NotFound(object)"/> якщо деталі або кваліфікація не знайдені.
        /// - <see cref="StatusCode(StatusCodes.Status403Forbidden, object)"/> якщо доступ заборонено.
        /// </returns>
        [HttpGet]
        [AllowAnonymous] // Дозволяє доступ для схвалених профілів
        [ProducesResponseType(typeof(TrainerDetailsDto), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        public async Task<IActionResult> GetTrainerDetails(Guid qualificationId)
        {
            if (qualificationId == Guid.Empty)
            {
                return BadRequest("Ідентифікатор кваліфікації не може бути порожнім.");
            }

            var trainerDetails = await _trainerDetailsService.GetTrainerDetailsByQualificationIdAsync(qualificationId);
            if (trainerDetails == null)
            {
                return NotFound($"Деталі тренера для кваліфікації ID {qualificationId} не знайдені.");
            }

            var qualification = await _professionalQualificationService.GetQualificationByIdAsync(qualificationId);
            if (qualification == null)
            {
                return NotFound($"Кваліфікація з ID {qualificationId} не знайдена.");
            }

            var userIdString = User.FindFirstValue(ClaimTypes.NameIdentifier);
            Guid currentUserId = Guid.Empty; // Ініціалізація для анонімних користувачів

            if (!string.IsNullOrEmpty(userIdString))
            {
                Guid.TryParse(userIdString, out currentUserId);
            }

            if (qualification.QualificationStatus != QualificationStatus.Approved)
            {
                if (currentUserId == Guid.Empty || qualification.UserId != currentUserId && !User.IsInRole(RoleNames.Admin))
                {
                    return StatusCode(StatusCodes.Status403Forbidden, new { message = "У вас немає прав для перегляду цих деталей тренера (профіль не схвалений або ви не є власником/адміністратором)." });
                }
            }

            return Ok(trainerDetails);
        }

        /// <summary>
        /// Створює нові деталі тренера для існуючої професійної кваліфікації.
        /// </summary>
        /// <param name="qualificationId">Ідентифікатор професійної кваліфікації. Не може бути Guid.Empty.</param>
        /// <param name="createDto">DTO з даними для створення деталей тренера. Не може бути null.</param>
        /// <returns>
        /// - <see cref="CreatedAtAction"/> з <see cref="TrainerDetailsDto"/> при успішному створенні.
        /// - <see cref="BadRequest(object)"/> при невалідних даних або ідентифікаторі.
        /// - <see cref="Conflict(object)"/> якщо деталі вже існують.
        /// - <see cref="StatusCode(StatusCodes.Status403Forbidden, object)"/> при недостатніх правах.
        /// - <see cref="NotFound(object)"/> якщо кваліфікація не знайдена.
        /// - <see cref="Unauthorized(object)"/> при відсутності автентифікації.
        /// </returns>
        [HttpPost]
        [ProducesResponseType(typeof(TrainerDetailsDto), StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status409Conflict)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<IActionResult> CreateTrainerDetails(Guid qualificationId, [FromBody] TrainerDetailsDto createDto)
        {
            if (qualificationId == Guid.Empty)
            {
                return BadRequest("Ідентифікатор кваліфікації не може бути порожнім.");
            }

            if (createDto == null)
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

            var qualification = await _professionalQualificationService.GetQualificationByIdAsync(qualificationId);
            if (qualification == null)
            {
                return NotFound("Кваліфікація не знайдена.");
            }

            if (qualification.UserId != currentUserId && !User.IsInRole(RoleNames.Admin))
            {
                return StatusCode(StatusCodes.Status403Forbidden, new { message = "У вас немає прав на створення деталей для цієї кваліфікації: ви не власник або не адміністратор." });
            }

            if (qualification.ProfessionalRoleType?.Name != RoleNames.Trainer)
            {
                return BadRequest("Кваліфікація не відповідає ролі тренера.");
            }

            var createdTrainerDetails = await _trainerDetailsService.CreateTrainerDetailsAsync(qualificationId, createDto);
            if (createdTrainerDetails == null)
            {
                return Conflict($"Деталі тренера для кваліфікації ID {qualificationId} вже існують або не можуть бути створені.");
            }

            return CreatedAtAction(nameof(GetTrainerDetails), new { qualificationId = createdTrainerDetails.QualificationId }, createdTrainerDetails);
        }

        /// <summary>
        /// Оновлює існуючі деталі тренера.
        /// </summary>
        /// <param name="qualificationId">Ідентифікатор професійної кваліфікації. Не може бути Guid.Empty.</param>
        /// <param name="updateDto">DTO з оновленими даними для деталей тренера. Не може бути null.</param>
        /// <returns>
        /// - <see cref="Ok(object)"/> з <see cref="TrainerDetailsDto"/> при успішному оновленні.
        /// - <see cref="BadRequest(object)"/> при невалідних даних або ідентифікаторі.
        /// - <see cref="NotFound(object)"/> якщо деталі не знайдені.
        /// - <see cref="StatusCode(StatusCodes.Status403Forbidden, object)"/> при недостатніх правах.
        /// - <see cref="Unauthorized(object)"/> при відсутності автентифікації.
        /// </returns>
        [HttpPut]
        [ProducesResponseType(typeof(TrainerDetailsDto), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<IActionResult> UpdateTrainerDetails(Guid qualificationId, [FromBody] TrainerDetailsDto updateDto)
        {
            if (qualificationId == Guid.Empty)
            {
                return BadRequest("Ідентифікатор кваліфікації не може бути порожнім.");
            }

            if (updateDto == null)
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

            var qualification = await _professionalQualificationService.GetQualificationByIdAsync(qualificationId);
            if (qualification == null)
            {
                return NotFound("Кваліфікація не знайдена.");
            }

            if (qualification.UserId != currentUserId && !User.IsInRole(RoleNames.Admin))
            {
                return StatusCode(StatusCodes.Status403Forbidden, new { message = "У вас немає прав на оновлення деталей для цієї кваліфікації: ви не власник або не адміністратор." });
            }

            if (qualification.ProfessionalRoleType?.Name != RoleNames.Trainer)
            {
                return BadRequest("Кваліфікація не відповідає ролі тренера.");
            }

            var updatedTrainerDetails = await _trainerDetailsService.UpdateTrainerDetailsAsync(qualificationId, updateDto);
            if (updatedTrainerDetails == null)
            {
                return NotFound($"Деталі тренера для кваліфікації ID {qualificationId} не знайдені або оновлення не вдалося.");
            }

            return Ok(updatedTrainerDetails);
        }

        /// <summary>
        /// Видаляє деталі тренера за ідентифікатором професійної кваліфікації.
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
        public async Task<IActionResult> DeleteTrainerDetails(Guid qualificationId)
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

            var qualification = await _professionalQualificationService.GetQualificationByIdAsync(qualificationId);
            if (qualification == null)
            {
                return NotFound("Кваліфікація не знайдена.");
            }

            if (qualification.UserId != currentUserId && !User.IsInRole(RoleNames.Admin))
            {
                return StatusCode(StatusCodes.Status403Forbidden, new { message = "У вас немає прав на видалення деталей для цієї кваліфікації: ви не власник або не адміністратор." });
            }

            if (qualification.ProfessionalRoleType?.Name != RoleNames.Trainer)
            {
                return BadRequest("Кваліфікація не відповідає ролі тренера.");
            }

            var isDeleted = await _trainerDetailsService.DeleteTrainerDetailsAsync(qualificationId);
            if (!isDeleted)
            {
                return NotFound($"Деталі тренера для кваліфікації ID {qualificationId} не знайдені або видалення не вдалося.");
            }

            return NoContent();
        }

        #endregion
    }
}