using HealthyLifestyle.Application.DTOs.ProfessionalQualification;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using HealthyLifestyle.Core.Enums;
using HealthyLifestyle.Application.Interfaces.ProfessionalQualification;

namespace HealthyLifestyle.Api.Controllers.ProfessionalQualification
{
    /// <summary>
    /// API-контролер для роботи з професійними кваліфікаціями користувачів.
    /// Надає методи для отримання типів ролей, подачі заявок, перегляду та управління кваліфікаціями.
    /// </summary>
    [ApiController]
    [Route("api/[controller]")]
    //[Authorize] // Вимагає автентифікації для всіх дій за замовчуванням
    public class ProfessionalQualificationController : ControllerBase
    {
        #region Private Fields

        private readonly IProfessionalQualificationService _qualificationService;

        #endregion

        #region Constructor

        /// <summary>
        /// Ініціалізує новий екземпляр класу <see cref="ProfessionalQualificationController"/>.
        /// </summary>
        /// <param name="qualificationService">Сервіс для управління професійними кваліфікаціями.</param>
        /// <exception cref="ArgumentNullException">Виникає, якщо переданий сервіс є null.</exception>
        public ProfessionalQualificationController(IProfessionalQualificationService qualificationService)
        {
            _qualificationService = qualificationService ?? throw new ArgumentNullException(nameof(qualificationService));
        }

        #endregion

        #region Public Methods

        /// <summary>
        /// Отримує список усіх доступних типів професійних ролей.
        /// Доступно для всіх, включаючи анонімних користувачів.
        /// </summary>
        /// <returns>
        /// - <see cref="Ok(object)"/> з переліком типів ролей.
        /// </returns>
        [HttpGet("types")]
        [AllowAnonymous]
        [ProducesResponseType(typeof(IEnumerable<ProfessionalRoleTypeDto>), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetAllRoleTypes()
        {
            var roleTypes = await _qualificationService.GetAllProfessionalRoleTypesAsync();
            return Ok(roleTypes);
        }

        /// <summary>
        /// Подає заявку на нову професійну кваліфікацію.
        /// Доступно для користувачів з ролями User, Trainer, Dietitian, Doctor, Psychologist.
        /// </summary>
        /// <param name="request">Дані заявки на кваліфікацію.</param>
        /// <returns>
        /// - <see cref="Ok(object)"/> з результатом подачі заявки при успіху.
        /// - <see cref="BadRequest(object)"/> при невалідних даних або помилках.
        /// - <see cref="Unauthorized(object)"/> при відсутності автентифікації.
        /// </returns>
        [HttpPost("apply")]
        [Authorize(Roles = $"{RoleNames.User},{RoleNames.Dietitian},{RoleNames.Doctor},{RoleNames.Psychologist},{RoleNames.Trainer}")]
        [ProducesResponseType(typeof(ProfessionalQualificationDto), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<IActionResult> ApplyForQualification([FromBody] CreateProfessionalQualificationDto request)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var userIdString = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (!Guid.TryParse(userIdString, out var userId))
                return Unauthorized("Невірний ідентифікатор користувача в токені.");

            var result = await _qualificationService.ApplyForProfessionalQualificationAsync(userId, request);

            if (result == null)
                return BadRequest("Не вдалося подати заявку: перевірте тип ролі або існуючі заявки.");

            return Ok(result);
        }

        /// <summary>
        /// Отримує список професійних кваліфікацій поточного користувача.
        /// </summary>
        /// <returns>
        /// - <see cref="Ok(object)"/> з переліком кваліфікацій користувача.
        /// - <see cref="Unauthorized(object)"/> при відсутності автентифікації.
        /// </returns>
        [HttpGet("my-qualifications")]
        [ProducesResponseType(typeof(IEnumerable<ProfessionalQualificationDto>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<IActionResult> GetMyQualifications()
        {
            var userIdString = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (!Guid.TryParse(userIdString, out var userId))
                return Unauthorized("Невірний ідентифікатор користувача в токені.");

            var qualifications = await _qualificationService.GetUserProfessionalQualificationsAsync(userId);
            return Ok(qualifications);
        }

        /// <summary>
        /// Отримує всі професійні кваліфікації (тільки для адміністратора).
        /// </summary>
        /// <returns>
        /// - <see cref="Ok(object)"/> з переліком усіх кваліфікацій.
        /// - <see cref="StatusCode(StatusCodes.Status403Forbidden, object)"/> при недостатніх правах.
        /// </returns>
        [HttpGet("all")]
        [AllowAnonymous]
        [ProducesResponseType(typeof(IEnumerable<ProfessionalQualificationDto>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        public async Task<IActionResult> GetAllQualifications()
        {
            var qualifications = await _qualificationService.GetAllProfessionalQualificationsAsync();
            return Ok(qualifications);
        }

        [HttpGet("{qualificationId}")]
        [AllowAnonymous]
        [ProducesResponseType(typeof(UserProfessionalQualificationDto), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetQualificationById(Guid qualificationId)
        {
            var qualification = await _qualificationService.GetQualificationByIdAsync(qualificationId);

            if (qualification == null)
            {
                return NotFound($"Qualification with ID '{qualificationId}' not found.");
            }

            return Ok(qualification);
        }
        /// <summary>
        /// Оновлює статус професійної кваліфікації (тільки для адміністратора).
        /// </summary>
        /// <param name="qualificationId">Ідентифікатор кваліфікації.</param>
        /// <param name="request">DTO з новим статусом.</param>
        /// <returns>
        /// - <see cref="Ok(object)"/> з оновленими даними кваліфікації при успіху.
        /// - <see cref="BadRequest(object)"/> при невалідних даних.
        /// - <see cref="NotFound(object)"/> якщо кваліфікація не знайдена.
        /// - <see cref="StatusCode(StatusCodes.Status403Forbidden, object)"/> при недостатніх правах.
        /// </returns>
        [HttpPut("{qualificationId}/status")]
        [Authorize(Roles = RoleNames.Admin)]
        [ProducesResponseType(typeof(ProfessionalQualificationDto), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        public async Task<IActionResult> UpdateQualificationStatus(Guid qualificationId, [FromBody] UpdateProfessionalQualificationStatusDto request)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var result = await _qualificationService.UpdateProfessionalQualificationStatusAsync(qualificationId, request);

            if (result == null)
                return NotFound("Кваліфікація не знайдена або оновлення не вдалося.");

            return Ok(result);
        }

        #endregion
    }
}