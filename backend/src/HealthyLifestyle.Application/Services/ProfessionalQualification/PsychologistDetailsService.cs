using AutoMapper;
using HealthyLifestyle.Application.DTOs.ProfessionalQualification;
using HealthyLifestyle.Application.Interfaces.ProfessionalQualification;
using HealthyLifestyle.Core.Entities;
using HealthyLifestyle.Core.Enums;
using HealthyLifestyle.Core.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace HealthyLifestyle.Application.Services.ProfessionalQualification
{
    /// <summary>
    /// Сервіс для управління деталями профілів психологів, що реалізує логіку створення, оновлення, видалення та отримання даних.
    /// Реалізує контракт <see cref="IPsychologistDetailsService"/> для забезпечення уніфікованого API.
    /// </summary>
    public class PsychologistDetailsService : IPsychologistDetailsService
    {
        #region Private Fields

        /// <summary>
        /// Юніт роботи для доступу до репозиторіїв.
        /// </summary>
        private readonly IUnitOfWork _unitOfWork;

        /// <summary>
        /// Екземпляр AutoMapper для мапінгу об’єктів.
        /// </summary>
        private readonly IMapper _mapper;

        #endregion

        #region Constructors

        /// <summary>
        /// Ініціалізує новий екземпляр <see cref="PsychologistDetailsService"/> з необхідними залежностями.
        /// </summary>
        /// <param name="unitOfWork">Юніт роботи для доступу до репозиторіїв.</param>
        /// <param name="mapper">Екземпляр AutoMapper для мапінгу об’єктів.</param>
        /// <exception cref="ArgumentNullException">Виникає, якщо <paramref name="unitOfWork"/> або <paramref name="mapper"/> є null.</exception>
        public PsychologistDetailsService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork ?? throw new ArgumentNullException(nameof(unitOfWork));
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
        }

        #endregion

        #region Public Methods

        /// <summary>
        /// Отримує деталі профілю психолога за ідентифікатором кваліфікації.
        /// </summary>
        /// <param name="qualificationId">Унікальний ідентифікатор кваліфікації.</param>
        /// <returns>DTO з деталями профілю або null, якщо деталі не знайдені.</returns>
        public async Task<PsychologistDetailsDto?> GetPsychologistDetailsByQualificationIdAsync(Guid qualificationId)
        {
            var psychologistDetailsRepo = _unitOfWork.GetRepository<PsychologistDetails>();
            var psychologistDetails = await psychologistDetailsRepo
                .AsQueryable()
                .Include(pd => pd.UserProfessionalQualification!)
                    .ThenInclude(upq => upq.ProfessionalRoleType)
                .Where(pd => pd.Id == qualificationId &&
                             pd.UserProfessionalQualification != null &&
                             pd.UserProfessionalQualification.ProfessionalRoleType!.Name == RoleNames.Psychologist)
                .FirstOrDefaultAsync();

            return psychologistDetails == null ? null : _mapper.Map<PsychologistDetailsDto>(psychologistDetails);
        }

        /// <summary>
        /// Створює нові деталі профілю психолога.
        /// </summary>
        /// <param name="qualificationId">Ідентифікатор кваліфікації.</param>
        /// <param name="createDto">DTO з даними для створення.</param>
        /// <returns>DTO з створеними деталями або null, якщо створення не вдалося.</returns>
        /// <exception cref="ArgumentNullException">Виникає, якщо <paramref name="createDto"/> є null.</exception>
        public async Task<PsychologistDetailsDto?> CreatePsychologistDetailsAsync(Guid qualificationId, PsychologistDetailsDto createDto)
        {
            if (createDto == null) throw new ArgumentNullException(nameof(createDto));

            var existing = await _unitOfWork.GetRepository<PsychologistDetails>().GetByIdAsync(qualificationId);
            if (existing != null) return null; // Деталі профілю психолога вже існують

            var qualification = await _unitOfWork.GetRepository<UserProfessionalQualification>()
                .AsQueryable()
                .Include(upq => upq.ProfessionalRoleType)
                .FirstOrDefaultAsync(upq => upq.Id == qualificationId);

            // Перевіряємо, чи існує кваліфікація та чи належить вона до ролі психолога
            if (qualification == null || qualification.ProfessionalRoleType?.Name != RoleNames.Psychologist)
            {
                return null;
            }

            // Надання значень за замовчуванням для списків, якщо DTO повертає null
            var specializationsList = createDto.Specializations ?? new List<string>();
            var therapyApproachesList = createDto.TherapyApproaches ?? new List<string>();

            if (string.IsNullOrEmpty(createDto.ProfessionalLicenseNumber))
            {
                throw new ArgumentNullException(nameof(createDto.ProfessionalLicenseNumber), "ProfessionalLicenseNumber не може бути null або порожнім при створенні.");
            }

            // Створення нової сутності PsychologistDetails
            var psychologistDetails = new PsychologistDetails(
                qualificationId: qualificationId,
                specializations: specializationsList,
                therapyApproaches: therapyApproachesList,
                professionalLicenseNumber: createDto.ProfessionalLicenseNumber,
                biography: createDto.Biography,
                contactEmail: createDto.ContactEmail,
                contactPhone: createDto.ContactPhone,
                website: createDto.Website,
                yearsOfExperience: createDto.YearsOfExperience,
                certifications: createDto.Certifications,
                availability: createDto.Availability,
                clientTestimonials: createDto.ClientTestimonials,
                expertDetailsPictureUrl: createDto.ExpertDetailsPictureUrl,
                cardPictureUrl: createDto.CardPictureUrl
            );

            await _unitOfWork.GetRepository<PsychologistDetails>().AddAsync(psychologistDetails);

            // Прив'язка PsychologistDetails до UserProfessionalQualification
            qualification.SetPsychologistDetailsId(psychologistDetails.Id);
            _unitOfWork.GetRepository<UserProfessionalQualification>().Update(qualification);
            await _unitOfWork.SaveChangesAsync();

            // Отримання щойно створених деталей для мапінгу у DTO, включаючи пов'язані сутності
            var createdDetails = await _unitOfWork.GetRepository<PsychologistDetails>()
                .AsQueryable()
                .Include(pd => pd.UserProfessionalQualification!)
                    .ThenInclude(upq => upq.ProfessionalRoleType)
                .FirstOrDefaultAsync(pd => pd.Id == qualificationId);

            return createdDetails == null ? null : _mapper.Map<PsychologistDetailsDto>(createdDetails);
        }

        /// <summary>
        /// Оновлює існуючі деталі профілю психолога.
        /// </summary>
        /// <param name="qualificationId">Ідентифікатор кваліфікації.</param>
        /// <param name="updateDto">DTO з новими даними.</param>
        /// <returns>DTO з оновленими деталями або null, якщо оновлення не вдалося.</returns>
        /// <exception cref="ArgumentNullException">Виникає, якщо <paramref name="updateDto"/> є null.</exception>
        public async Task<PsychologistDetailsDto?> UpdatePsychologistDetailsAsync(Guid qualificationId, PsychologistDetailsDto updateDto)
        {
            if (updateDto == null) throw new ArgumentNullException(nameof(updateDto));

            var qualification = await _unitOfWork.GetRepository<UserProfessionalQualification>()
                .AsQueryable()
                .Include(upq => upq.ProfessionalRoleType)
                .FirstOrDefaultAsync(upq => upq.Id == qualificationId);

            // Перевіряємо, чи існує кваліфікація та чи належить вона до ролі психолога
            if (qualification == null || qualification.ProfessionalRoleType?.Name != RoleNames.Psychologist)
            {
                return null;
            }

            var psychologistDetails = await _unitOfWork.GetRepository<PsychologistDetails>()
                .GetByIdAsync(qualificationId);

            if (psychologistDetails == null)
            {
                return null; // Деталі психолога не знайдено
            }

            // Оновлення специфічних деталей психолога.
            psychologistDetails.UpdatePsychologistSpecificDetails(
                specializations: updateDto.Specializations,
                therapyApproaches: updateDto.TherapyApproaches,
                professionalLicenseNumber: updateDto.ProfessionalLicenseNumber
            );

            psychologistDetails.UpdatePsychologistSpecificDetails(
                biography: updateDto.Biography,
                contactEmail: updateDto.ContactEmail,
                contactPhone: updateDto.ContactPhone,
                website: updateDto.Website,
                yearsOfExperience: updateDto.YearsOfExperience,
                certifications: updateDto.Certifications,
                availability: updateDto.Availability,
                clientTestimonials: updateDto.ClientTestimonials
            );

            // Оновлення зображень
            if (updateDto.ExpertDetailsPictureUrl != null)
                psychologistDetails.UpdateExpertDetailsPictureUrl(updateDto.ExpertDetailsPictureUrl);
            if (updateDto.CardPictureUrl != null)
                psychologistDetails.UpdateCardPictureUrl(updateDto.CardPictureUrl);

            _unitOfWork.GetRepository<PsychologistDetails>().Update(psychologistDetails);
            await _unitOfWork.SaveChangesAsync();

            return _mapper.Map<PsychologistDetailsDto>(psychologistDetails);
        }

        /// <summary>
        /// Видаляє деталі профілю психолога.
        /// </summary>
        /// <param name="qualificationId">Ідентифікатор кваліфікації.</param>
        /// <returns><c>true</c>, якщо видалення успішне; інакше <c>false</c>.</returns>
        public async Task<bool> DeletePsychologistDetailsAsync(Guid qualificationId)
        {
            var qualification = await _unitOfWork.GetRepository<UserProfessionalQualification>()
                .AsQueryable()
                .Include(upq => upq.ProfessionalRoleType)
                .FirstOrDefaultAsync(upq => upq.Id == qualificationId);

            // Перевіряємо, чи існує кваліфікація та чи належить вона до ролі психолога
            if (qualification == null || qualification.ProfessionalRoleType?.Name != RoleNames.Psychologist)
            {
                return false;
            }

            var psychologistDetails = await _unitOfWork.GetRepository<PsychologistDetails>()
                .GetByIdAsync(qualificationId);

            if (psychologistDetails == null)
            {
                return false; // Деталі психолога не знайдено
            }

            _unitOfWork.GetRepository<PsychologistDetails>().Delete(psychologistDetails);

            // Відв'язуємо деталі психолога від кваліфікації
            qualification.SetPsychologistDetailsId(null);
            _unitOfWork.GetRepository<UserProfessionalQualification>().Update(qualification);

            return await _unitOfWork.SaveChangesAsync() > 0;
        }

        #endregion
    }
}