using HealthyLifestyle.Application.DTOs.ProfessionalQualification;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using HealthyLifestyle.Core.Enums;
using HealthyLifestyle.Application.Interfaces.ProfessionalQualification;

namespace HealthyLifestyle.Api.Controllers.ProfessionalQualification
{
    /// <summary>
    /// API-контролер для управління деталями докторів.
    /// Надає методи для отримання, створення, оновлення та видалення деталей докторів.
    /// </summary>
    [ApiController]
    [Route("api/professional-qualification/{qualificationId}/doctor-details")]
    [Authorize] // Застосовуємо авторизацію на рівні контролера для всіх дій
    public class DoctorDetailsController : ControllerBase
    {
        #region Private Fields

        private readonly IDoctorDetailsService _doctorDetailsService;
        private readonly IProfessionalQualificationService _professionalQualificationService;

        #endregion

        #region Constructor

        /// <summary>
        /// Ініціалізує новий екземпляр класу <see cref="DoctorDetailsController"/>.
        /// </summary>
        /// <param name="doctorDetailsService">Сервіс для управління деталями доктора.</param>
        /// <param name="professionalQualificationService">Сервіс для перевірки професійних кваліфікацій.</param>
        /// <exception cref="ArgumentNullException">Виникає, якщо переданий сервіс є null.</exception>
        public DoctorDetailsController(
            IDoctorDetailsService doctorDetailsService,
            IProfessionalQualificationService professionalQualificationService)
        {
            _doctorDetailsService = doctorDetailsService ?? throw new ArgumentNullException(nameof(doctorDetailsService));
            _professionalQualificationService = professionalQualificationService ?? throw new ArgumentNullException(nameof(professionalQualificationService));
        }

        #endregion

        #region Public Methods

        /// <summary>
        /// Отримує деталі доктора за ідентифікатором професійної кваліфікації.
        /// Доступно для анонімних користувачів для схвалених профілів, а також для адміністраторів або власника профілю.
        /// </summary>
        /// <param name="qualificationId">Ідентифікатор професійної кваліфікації.</param>
        /// <returns>
        /// - <see cref="Ok(object)"/> з <see cref="DoctorDetailsDto"/> при успішному отриманні.
        /// - <see cref="NotFound(object)"/> якщо деталі або кваліфікація не знайдені.
        /// - <see cref="StatusCode(StatusCodes.Status403Forbidden, object)"/> якщо доступ заборонено.
        /// </returns>
        [HttpGet]
        [AllowAnonymous] // Публічний доступ для схвалених профілів
        [ProducesResponseType(typeof(DoctorDetailsDto), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        public async Task<IActionResult> GetDoctorDetails(Guid qualificationId)
        {
            var doctorDetails = await _doctorDetailsService.GetDoctorDetailsByQualificationIdAsync(qualificationId);
            if (doctorDetails == null)
            {
                return NotFound("Деталі доктора не знайдені.");
            }

            var qualification = await _professionalQualificationService.GetQualificationByIdAsync(qualificationId);
            if (qualification == null)
            {
                return NotFound("Кваліфікація не знайдена.");
            }

            var userIdString = User.FindFirstValue(ClaimTypes.NameIdentifier);
            Guid currentUserId = Guid.Empty; // Ініціалізація для анонімних користувачів

            // Розпарсинг ID користувача, якщо автентифікований
            if (!string.IsNullOrEmpty(userIdString))
            {
                Guid.TryParse(userIdString, out currentUserId);
            }

            // Логіка авторизації:
            // - Схвалені профілі доступні публічно.
            // - Несхвалені профілі доступні тільки власнику або адміністратору.
            if (qualification.QualificationStatus != QualificationStatus.Approved)
            {
                var targetQualification = await GetTargetQualification(qualificationId, currentUserId);
                if (targetQualification == null)
                {
                    return StatusCode(StatusCodes.Status403Forbidden, new { message = "У вас немає прав для перегляду цих деталей доктора (профіль не схвалений або ви не є власником/адміністратором)." });
                }
            }

            return Ok(doctorDetails);
        }

        /// <summary>
        /// Створює нові деталі доктора для існуючої професійної кваліфікації.
        /// </summary>
        /// <param name="qualificationId">Ідентифікатор професійної кваліфікації.</param>
        /// <param name="request">DTO з даними для створення деталей доктора.</param>
        /// <returns>
        /// - <see cref="CreatedAtAction"/> з <see cref="DoctorDetailsDto"/> при успішному створенні.
        /// - <see cref="BadRequest(object)"/> при невалідних даних.
        /// - <see cref="Conflict(object)"/> якщо деталі вже існують.
        /// - <see cref="StatusCode(StatusCodes.Status403Forbidden, object)"/> при недостатніх правах.
        /// - <see cref="NotFound(object)"/> якщо кваліфікація не знайдена.
        /// </returns>
        [HttpPost]
        [ProducesResponseType(typeof(DoctorDetailsDto), StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status409Conflict)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> CreateDoctorDetails(Guid qualificationId, [FromBody] DoctorDetailsDto request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var userIdString = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (!Guid.TryParse(userIdString, out var currentUserId))
            {
                return Unauthorized("Невірний ідентифікатор користувача в токені.");
            }

            var qualification = await _professionalQualificationService.GetQualificationByIdAsync(qualificationId);
            if (qualification == null)
            {
                return NotFound("Кваліфікація не знайдена.");
            }

            // Перевірка прав: власник або адміністратор
            var targetQualification = await GetTargetQualification(qualificationId, currentUserId);
            if (targetQualification == null)
            {
                return StatusCode(StatusCodes.Status403Forbidden, new { message = "У вас немає прав на створення деталей для цієї кваліфікації: ви не власник або не адміністратор." });
            }

            var createdDetails = await _doctorDetailsService.CreateDoctorDetailsAsync(qualificationId, request);
            if (createdDetails == null)
            {
                return Conflict("Деталі доктора для цієї кваліфікації вже існують або не можуть бути створені.");
            }

            return CreatedAtAction(nameof(GetDoctorDetails), new { qualificationId = createdDetails.QualificationId }, createdDetails);
        }

        /// <summary>
        /// Оновлює існуючі деталі доктора.
        /// </summary>
        /// <param name="qualificationId">Ідентифікатор професійної кваліфікації.</param>
        /// <param name="request">DTO з оновленими даними для деталей доктора.</param>
        /// <returns>
        /// - <see cref="Ok(object)"/> з <see cref="DoctorDetailsDto"/> при успішному оновленні.
        /// - <see cref="BadRequest(object)"/> при невалідних даних.
        /// - <see cref="NotFound(object)"/> якщо деталі не знайдені.
        /// - <see cref="StatusCode(StatusCodes.Status403Forbidden, object)"/> при недостатніх правах.
        /// </returns>
        [HttpPut]
        [ProducesResponseType(typeof(DoctorDetailsDto), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        public async Task<IActionResult> UpdateDoctorDetails(Guid qualificationId, [FromBody] DoctorDetailsDto request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var userIdString = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (!Guid.TryParse(userIdString, out var currentUserId))
            {
                return Unauthorized("Невірний ідентифікатор користувача в токені.");
            }

            var qualification = await _professionalQualificationService.GetQualificationByIdAsync(qualificationId);
            if (qualification == null)
            {
                return NotFound("Кваліфікація не знайдена.");
            }

            // Перевірка прав: власник або адміністратор
            var targetQualification = await GetTargetQualification(qualificationId, currentUserId);
            if (targetQualification == null)
            {
                return StatusCode(StatusCodes.Status403Forbidden, new { message = "У вас немає прав на оновлення деталей для цієї кваліфікації: ви не власник або не адміністратор." });
            }

            var updatedDetails = await _doctorDetailsService.UpdateDoctorDetailsAsync(qualificationId, request);
            if (updatedDetails == null)
            {
                return NotFound("Деталі доктора не знайдені або оновлення не вдалося.");
            }

            return Ok(updatedDetails);
        }

        /// <summary>
        /// Видаляє деталі доктора за ідентифікатором професійної кваліфікації.
        /// </summary>
        /// <param name="qualificationId">Ідентифікатор професійної кваліфікації.</param>
        /// <returns>
        /// - <see cref="NoContent"/> у випадку успіху.
        /// - <see cref="NotFound(object)"/> якщо деталі не знайдені.
        /// - <see cref="StatusCode(StatusCodes.Status403Forbidden, object)"/> при недостатніх правах.
        /// </returns>
        [HttpDelete]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        public async Task<IActionResult> DeleteDoctorDetails(Guid qualificationId)
        {
            var userIdString = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (!Guid.TryParse(userIdString, out var currentUserId))
            {
                return Unauthorized("Невірний ідентифікатор користувача в токені.");
            }

            var qualification = await _professionalQualificationService.GetQualificationByIdAsync(qualificationId);
            if (qualification == null)
            {
                return NotFound("Кваліфікація не знайдена.");
            }

            // Перевірка прав: власник або адміністратор
            var targetQualification = await GetTargetQualification(qualificationId, currentUserId);
            if (targetQualification == null)
            {
                return StatusCode(StatusCodes.Status403Forbidden, new { message = "У вас немає прав на видалення деталей для цієї кваліфікації: ви не власник або не адміністратор." });
            }

            var isDeleted = await _doctorDetailsService.DeleteDoctorDetailsAsync(qualificationId);
            if (!isDeleted)
            {
                return NotFound("Деталі доктора не знайдені або видалення не вдалося.");
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
            var targetQualification = await _professionalQualificationService.GetQualificationByIdAsync(qualificationId);
            
            if (targetQualification == null || targetQualification.ProfessionalRoleType?.Name != RoleNames.Doctor)
            {
                return null;
            }
            
            // Адмін може керувати будь-якою кваліфікацією доктора
            if (User.IsInRole(RoleNames.Admin))
            {
                return targetQualification;
            }
            
            // Користувач з роллю доктора може керувати своїми кваліфікаціями
            if (User.IsInRole(RoleNames.Doctor) && targetQualification.UserId == currentUserId)
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

        #endregion
    }
}