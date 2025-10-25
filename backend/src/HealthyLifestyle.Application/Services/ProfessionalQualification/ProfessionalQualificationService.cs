using AutoMapper;
using HealthyLifestyle.Application.DTOs.ProfessionalQualification;
using HealthyLifestyle.Application.Interfaces.ProfessionalQualification;
using HealthyLifestyle.Core.Entities;
using HealthyLifestyle.Core.Enums;
using HealthyLifestyle.Core.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace HealthyLifestyle.Application.Services.ProfessionalQualification
{
    /// <summary>
    /// Сервіс для управління професійними кваліфікаціями користувачів, включаючи подання заявок, оновлення статусів і отримання даних.
    /// Реалізує контракт <see cref="IProfessionalQualificationService"/> для забезпечення уніфікованого API.
    /// </summary>
    public class ProfessionalQualificationService : IProfessionalQualificationService
    {
        #region Private Fields

        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly UserManager<User> _userManager;
        private readonly ILogger<ProfessionalQualificationService> _logger;

        #endregion

        #region Constructors

        /// <summary>
        /// Ініціалізує новий екземпляр <see cref="ProfessionalQualificationService"/> з необхідними залежностями.
        /// </summary>
        /// <param name="unitOfWork">Юніт роботи для доступу до репозиторіїв.</param>
        /// <param name="mapper">Екземпляр AutoMapper для мапінгу об'єктів.</param>
        /// <param name="userManager">Менеджер користувачів для роботи з Identity.</param>
        /// <param name="logger">Логер для запису інформації про роботу сервісу.</param>
        /// <exception cref="ArgumentNullException">Виникає, якщо будь-який із параметрів є null.</exception>
        public ProfessionalQualificationService(IUnitOfWork unitOfWork, IMapper mapper, UserManager<User> userManager, ILogger<ProfessionalQualificationService> logger)
        {
            _unitOfWork = unitOfWork ?? throw new ArgumentNullException(nameof(unitOfWork));
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
            _userManager = userManager ?? throw new ArgumentNullException(nameof(userManager));
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
        }

        #endregion

        #region Public Methods

        /// <summary>
        /// Отримує список усіх типів професійних ролей.
        /// </summary>
        /// <returns>Колекція об’єктів <see cref="ProfessionalRoleTypeDto"/> із даними типів ролей.</returns>
        public async Task<IEnumerable<ProfessionalRoleTypeDto>> GetAllProfessionalRoleTypesAsync()
        {
            var repository = _unitOfWork.GetRepository<ProfessionalRoleType>();
            var roleTypes = await repository.GetAllAsync();
            return _mapper.Map<IEnumerable<ProfessionalRoleTypeDto>>(roleTypes);
        }

        /// <summary>
        /// Подання заявки на професійну кваліфікацію для користувача.
        /// </summary>
        /// <param name="userId">Унікальний ідентифікатор користувача.</param>
        /// <param name="createDto">DTO з даними для створення кваліфікації.</param>
        /// <returns>DTO з інформацією про створену кваліфікацію або null, якщо заявка не вдалася.</returns>
        /// <exception cref="ArgumentNullException">Виникає, якщо <paramref name="createDto"/> є null або якщо обов’язкові поля відсутні.</exception>
        public async Task<UserProfessionalQualificationDto?> ApplyForProfessionalQualificationAsync(Guid userId, CreateProfessionalQualificationDto createDto)
        {
            if (createDto == null) throw new ArgumentNullException(nameof(createDto));

            var roleType = await _unitOfWork.GetRepository<ProfessionalRoleType>().GetByIdAsync(createDto.ProfessionalRoleTypeId);
            if (roleType == null)
            {
                return null;
            }

            var existingQualification = await _unitOfWork.GetRepository<UserProfessionalQualification>()
                .AsQueryable()
                .Where(q => q.UserId == userId && q.ProfessionalRoleTypeId == createDto.ProfessionalRoleTypeId &&
                            (q.Status == QualificationStatus.Pending ||
                             q.Status == QualificationStatus.Approved))
                .FirstOrDefaultAsync();

            if (existingQualification != null)
            {
                return null;
            }

            _logger.LogInformation("🔄 [QUALIFICATION] Створення кваліфікації з WorkFormat: {WorkFormat}", 
                createDto.WorkFormat != null ? string.Join(", ", createDto.WorkFormat) : "null");

            var qualification = new UserProfessionalQualification(
                userId: userId,
                professionalRoleTypeId: createDto.ProfessionalRoleTypeId,
                description: createDto.Description ?? throw new ArgumentNullException(nameof(createDto.Description)),
                // certificatesUrl: createDto.CertificatesUrl ?? throw new ArgumentNullException(nameof(createDto.CertificatesUrl)),
                certificatesUrl: "", // Тимчасово встановлюємо порожній рядок
                hourlyRate: createDto.HourlyRate ?? roleType.DefaultHourlyRate,
                workFormat: createDto.WorkFormat
            );

            _logger.LogInformation("🔄 [QUALIFICATION] Кваліфікація створена з WorkFormat: {WorkFormat}", 
                qualification.WorkFormat != null ? string.Join(", ", qualification.WorkFormat) : "null");

            await _unitOfWork.GetRepository<UserProfessionalQualification>().AddAsync(qualification);
            await _unitOfWork.SaveChangesAsync();

            // Додаємо роль до користувача після створення кваліфікації
            var user = await _userManager.FindByIdAsync(userId.ToString());
            if (user != null && roleType != null)
            {
                // Перевіряємо, чи користувач вже має цю роль
                var userRoles = await _userManager.GetRolesAsync(user);
                if (!userRoles.Contains(roleType.Name))
                {
                    await _userManager.AddToRoleAsync(user, roleType.Name);
                }
            }

            var createdQualification = await _unitOfWork.GetRepository<UserProfessionalQualification>()
                .AsQueryable()
                .Include(q => q.ProfessionalRoleType)
                .FirstOrDefaultAsync(q => q.Id == qualification.Id);

            return _mapper.Map<UserProfessionalQualificationDto>(createdQualification);
        }

        /// <summary>
        /// Отримує список усіх кваліфікацій для вказаного користувача.
        /// </summary>
        /// <param name="userId">Унікальний ідентифікатор користувача.</param>
        /// <returns>Колекція об’єктів <see cref="UserProfessionalQualificationDto"/> із даними кваліфікацій.</returns>
        public async Task<IEnumerable<UserProfessionalQualificationDto>> GetUserProfessionalQualificationsAsync(Guid userId)
        {
            var qualifications = await _unitOfWork.GetRepository<UserProfessionalQualification>()
                .AsQueryable()
                .Where(q => q.UserId == userId)
                .Include(q => q.ProfessionalRoleType)
                .Include(q => q.User)
                .Include(q => q.PsychologistDetails)
                .Include(q => q.DietitianDetails)
                .Include(q => q.DoctorDetails)
                .Include(q => q.TrainerDetails)
                .ToListAsync();

            return _mapper.Map<IEnumerable<UserProfessionalQualificationDto>>(qualifications);
        }

        /// <summary>
        /// Отримує список усіх кваліфікацій у системі.
        /// </summary>
        /// <returns>Колекція об’єктів <see cref="UserProfessionalQualificationDto"/> із даними всіх кваліфікацій.</returns>
        public async Task<IEnumerable<UserProfessionalQualificationDto>> GetAllProfessionalQualificationsAsync()
        {
            var qualifications = await _unitOfWork.GetRepository<UserProfessionalQualification>()
                .AsQueryable()
                .Include(q => q.ProfessionalRoleType)
                .Include(q => q.User)
                .Include(q => q.PsychologistDetails)
                .Include(q => q.DietitianDetails)
                .Include(q => q.DoctorDetails)
                .Include(q => q.TrainerDetails)
                .ToListAsync();

            return _mapper.Map<IEnumerable<UserProfessionalQualificationDto>>(qualifications);
        }

        /// <summary>
        /// Оновлює статус професійної кваліфікації.
        /// </summary>
        /// <param name="qualificationId">Унікальний ідентифікатор кваліфікації.</param>
        /// <param name="updateStatusDto">DTO з новим статусом кваліфікації.</param>
        /// <returns>DTO з оновленою інформацією про кваліфікацію або null, якщо оновлення не вдалося.</returns>
        /// <exception cref="ArgumentNullException">Виникає, якщо <paramref name="updateStatusDto"/> є null.</exception>
        public async Task<UserProfessionalQualificationDto?> UpdateProfessionalQualificationStatusAsync(Guid qualificationId, UpdateProfessionalQualificationStatusDto updateStatusDto)
        {
            if (updateStatusDto == null) throw new ArgumentNullException(nameof(updateStatusDto));

            var qualification = await _unitOfWork.GetRepository<UserProfessionalQualification>()
                .AsQueryable()
                .Include(q => q.ProfessionalRoleType)
                .FirstOrDefaultAsync(q => q.Id == qualificationId);

            if (qualification == null)
            {
                return null;
            }

            qualification.UpdateStatus(updateStatusDto.Status);

            _unitOfWork.GetRepository<UserProfessionalQualification>().Update(qualification);
            await _unitOfWork.SaveChangesAsync();

            return _mapper.Map<UserProfessionalQualificationDto>(qualification);
        }

        /// <summary>
        /// Отримує деталі кваліфікації за її ідентифікатором.
        /// </summary>
        /// <param name="qualificationId">Унікальний ідентифікатор кваліфікації.</param>
        /// <returns>DTO з інформацією про кваліфікацію або null, якщо кваліфікація не знайдена.</returns>
        public async Task<UserProfessionalQualificationDto?> GetQualificationByIdAsync(Guid qualificationId)
        {
            var qualification = await _unitOfWork.GetRepository<UserProfessionalQualification>()
                .AsQueryable()
                .Include(upq => upq.ProfessionalRoleType)
                .Include(q => q.User)
                .Include(q => q.PsychologistDetails)
                .Include(q => q.DoctorDetails)
                .Include(q => q.TrainerDetails)
                .Include(q => q.DietitianDetails)
                .FirstOrDefaultAsync(upq => upq.Id == qualificationId);
            return qualification == null ? null : _mapper.Map<UserProfessionalQualificationDto>(qualification);
        }

        /// <summary>
        /// Отримує повні деталі кваліфікації за її ідентифікатором (аналогічно до GetQualificationByIdAsync).
        /// </summary>
        /// <param name="qualificationId">Унікальний ідентифікатор кваліфікації.</param>
        /// <returns>DTO з інформацією про кваліфікацію або null, якщо кваліфікація не знайдена.</returns>
        /// <remarks>Цей метод дублює функціональність GetQualificationByIdAsync; розгляньте об'єднання або чітке розмежування логіки.</remarks>
        public async Task<UserProfessionalQualificationDto?> GetFullQualificationByIdAsync(Guid qualificationId)
        {
            var qualification = await _unitOfWork.GetRepository<UserProfessionalQualification>()
                .AsQueryable()
                .Include(upq => upq.ProfessionalRoleType)
                .Include(q => q.User)
                .Include(q => q.PsychologistDetails)
                .Include(q => q.DoctorDetails)
                .Include(q => q.TrainerDetails)
                .Include(q => q.DietitianDetails)
                .FirstOrDefaultAsync(upq => upq.Id == qualificationId);
            return qualification == null ? null : _mapper.Map<UserProfessionalQualificationDto>(qualification);
        }

        /// <summary>
        /// Оновлює дані професійної кваліфікації.
        /// </summary>
        /// <param name="qualificationId">Унікальний ідентифікатор кваліфікації.</param>
        /// <param name="updateDto">DTO з новими даними кваліфікації.</param>
        /// <returns>DTO з оновленою інформацією про кваліфікацію або null, якщо оновлення не вдалося.</returns>
        /// <exception cref="ArgumentNullException">Виникає, якщо <paramref name="updateDto"/> є null.</exception>
        public async Task<UserProfessionalQualificationDto?> UpdateProfessionalQualificationAsync(Guid qualificationId, UpdateProfessionalQualificationDto updateDto)
        {
            if (updateDto == null) throw new ArgumentNullException(nameof(updateDto));

            var qualification = await _unitOfWork.GetRepository<UserProfessionalQualification>()
                .AsQueryable()
                .Include(q => q.ProfessionalRoleType)
                .FirstOrDefaultAsync(q => q.Id == qualificationId);

            if (qualification == null)
            {
                return null;
            }

            // Оновлюємо поля, якщо вони передані в DTO
            if (updateDto.Description != null)
            {
                qualification.UpdateDescription(updateDto.Description);
            }

            if (updateDto.HourlyRate.HasValue)
            {
                qualification.UpdateHourlyRate(updateDto.HourlyRate.Value);
            }

            if (updateDto.WorkFormat != null)
            {
                _logger.LogInformation("🔄 [QUALIFICATION] Оновлення WorkFormat з '{OldFormat}' на '{NewFormat}'", 
                    qualification.WorkFormat != null ? string.Join(", ", qualification.WorkFormat) : "null",
                    string.Join(", ", updateDto.WorkFormat));
                qualification.SetWorkFormat(updateDto.WorkFormat);
            }

            _unitOfWork.GetRepository<UserProfessionalQualification>().Update(qualification);
            await _unitOfWork.SaveChangesAsync();

            // Повертаємо оновлену кваліфікацію з включеними навігаційними властивостями
            var updatedQualification = await _unitOfWork.GetRepository<UserProfessionalQualification>()
                .AsQueryable()
                .Include(q => q.ProfessionalRoleType)
                .FirstOrDefaultAsync(q => q.Id == qualificationId);

            return _mapper.Map<UserProfessionalQualificationDto>(updatedQualification);
        }

        #endregion
    }
}