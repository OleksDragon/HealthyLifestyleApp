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
    /// Сервіс для управління деталями профілів тренерів, що реалізує логіку створення, оновлення, видалення та отримання даних.
    /// Реалізує контракт <see cref="ITrainerDetailsService"/> для забезпечення уніфікованого API.
    /// </summary>
    public class TrainerDetailsService : ITrainerDetailsService
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
        /// Ініціалізує новий екземпляр <see cref="TrainerDetailsService"/> з необхідними залежностями.
        /// </summary>
        /// <param name="unitOfWork">Юніт роботи для доступу до репозиторіїв.</param>
        /// <param name="mapper">Екземпляр AutoMapper для мапінгу об’єктів.</param>
        /// <exception cref="ArgumentNullException">Виникає, якщо <paramref name="unitOfWork"/> або <paramref name="mapper"/> є null.</exception>
        public TrainerDetailsService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork ?? throw new ArgumentNullException(nameof(unitOfWork));
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
        }

        #endregion

        #region Public Methods

        /// <summary>
        /// Отримує деталі профілю тренера за ідентифікатором кваліфікації.
        /// </summary>
        /// <param name="qualificationId">Унікальний ідентифікатор кваліфікації.</param>
        /// <returns>DTO з деталями профілю або null, якщо деталі не знайдені.</returns>
        public async Task<TrainerDetailsDto?> GetTrainerDetailsByQualificationIdAsync(Guid qualificationId)
        {
            var trainerDetailsRepo = _unitOfWork.GetRepository<TrainerDetails>();
            var trainerDetails = await trainerDetailsRepo
                .AsQueryable()
                .Include(td => td.UserProfessionalQualification!)
                    .ThenInclude(upq => upq.ProfessionalRoleType)
                .Where(td => td.Id == qualificationId &&
                             td.UserProfessionalQualification != null &&
                             td.UserProfessionalQualification.ProfessionalRoleType!.Name == RoleNames.Trainer)
                .FirstOrDefaultAsync();

            return trainerDetails == null ? null : _mapper.Map<TrainerDetailsDto>(trainerDetails);
        }

        /// <summary>
        /// Створює нові деталі профілю тренера.
        /// </summary>
        /// <param name="qualificationId">Ідентифікатор кваліфікації.</param>
        /// <param name="createDto">DTO з даними для створення.</param>
        /// <returns>DTO з створеними деталями або null, якщо створення не вдалося.</returns>
        /// <exception cref="ArgumentNullException">Виникає, якщо <paramref name="createDto"/> є null.</exception>
        public async Task<TrainerDetailsDto?> CreateTrainerDetailsAsync(Guid qualificationId, TrainerDetailsDto createDto)
        {
            if (createDto == null) throw new ArgumentNullException(nameof(createDto));

            var existing = await _unitOfWork.GetRepository<TrainerDetails>().GetByIdAsync(qualificationId);
            if (existing != null) return null;

            var qualification = await _unitOfWork.GetRepository<UserProfessionalQualification>()
                .AsQueryable()
                .Include(upq => upq.ProfessionalRoleType)
                .FirstOrDefaultAsync(upq => upq.Id == qualificationId);

            if (qualification == null || qualification.ProfessionalRoleType?.Name != RoleNames.Trainer)
            {
                return null;
            }

            var trainingStyleList = createDto.TrainingStyle ?? new List<string>();
            var preferredWorkoutStylesList = createDto.PreferredWorkoutStyles ?? new List<string>();

            var trainerDetails = new TrainerDetails(
                qualificationId: qualificationId,
                trainingStyle: trainingStyleList,
                biography: createDto.Biography,
                contactEmail: createDto.ContactEmail,
                contactPhone: createDto.ContactPhone,
                website: createDto.Website,
                yearsOfExperience: createDto.YearsOfExperience,
                certifications: createDto.Certifications,
                availability: createDto.Availability,
                clientTestimonials: createDto.ClientTestimonials,
                preferredWorkoutStyles: preferredWorkoutStylesList,
                expertDetailsPictureUrl: createDto.ExpertDetailsPictureUrl,
                cardPictureUrl: createDto.CardPictureUrl
            );

            await _unitOfWork.GetRepository<TrainerDetails>().AddAsync(trainerDetails);
            qualification.SetTrainerDetailsId(trainerDetails.Id);
            _unitOfWork.GetRepository<UserProfessionalQualification>().Update(qualification);
            await _unitOfWork.SaveChangesAsync();

            var createdDetails = await _unitOfWork.GetRepository<TrainerDetails>()
                .AsQueryable()
                .Include(td => td.UserProfessionalQualification!)
                    .ThenInclude(upq => upq.ProfessionalRoleType)
                .FirstOrDefaultAsync(td => td.Id == qualificationId);

            return createdDetails == null ? null : _mapper.Map<TrainerDetailsDto>(createdDetails);
        }

        /// <summary>
        /// Оновлює існуючі деталі профілю тренера.
        /// </summary>
        /// <param name="qualificationId">Ідентифікатор кваліфікації.</param>
        /// <param name="updateDto">DTO з новими даними.</param>
        /// <returns>DTO з оновленими деталями або null, якщо оновлення не вдалося.</returns>
        /// <exception cref="ArgumentNullException">Виникає, якщо <paramref name="updateDto"/> є null.</exception>
        public async Task<TrainerDetailsDto?> UpdateTrainerDetailsAsync(Guid qualificationId, TrainerDetailsDto updateDto)
        {
            if (updateDto == null) throw new ArgumentNullException(nameof(updateDto));

            var qualification = await _unitOfWork.GetRepository<UserProfessionalQualification>()
                .AsQueryable()
                .Include(upq => upq.ProfessionalRoleType)
                .FirstOrDefaultAsync(upq => upq.Id == qualificationId);

            if (qualification == null || qualification.ProfessionalRoleType?.Name != RoleNames.Trainer)
            {
                return null;
            }

            var trainerDetails = await _unitOfWork.GetRepository<TrainerDetails>()
                .GetByIdAsync(qualificationId);

            if (trainerDetails == null)
            {
                return null;
            }

            // Формуємо значення, які справді змінюються; передаємо null, якщо не оновлюємо це поле
            var trainingStyleList = updateDto.TrainingStyle; // null => не чіпаємо
            var preferredWorkoutStylesList = updateDto.PreferredWorkoutStyles; // null => не чіпаємо

            trainerDetails.UpdateTrainerSpecificDetails(
                trainingStyle: trainingStyleList,
                preferredWorkoutStyles: preferredWorkoutStylesList,
                biography: updateDto.Biography,
                contactEmail: updateDto.ContactEmail,
                contactPhone: updateDto.ContactPhone,
                website: updateDto.Website,
                yearsOfExperience: updateDto.YearsOfExperience,
                certifications: updateDto.Certifications,
                availability: updateDto.Availability,
                hourlyRate: updateDto.HourlyRate,
                clientTestimonials: updateDto.ClientTestimonials
            );

            // Оновлення зображень
            if (updateDto.ExpertDetailsPictureUrl != null)
                trainerDetails.UpdateExpertDetailsPictureUrl(updateDto.ExpertDetailsPictureUrl);
            if (updateDto.CardPictureUrl != null)
                trainerDetails.UpdateCardPictureUrl(updateDto.CardPictureUrl);

            _unitOfWork.GetRepository<TrainerDetails>().Update(trainerDetails);
            await _unitOfWork.SaveChangesAsync();

            return _mapper.Map<TrainerDetailsDto>(trainerDetails);
        }

        /// <summary>
        /// Видаляє деталі профілю тренера.
        /// </summary>
        /// <param name="qualificationId">Ідентифікатор кваліфікації.</param>
        /// <returns><c>true</c>, якщо видалення успішне; інакше <c>false</c>.</returns>
        public async Task<bool> DeleteTrainerDetailsAsync(Guid qualificationId)
        {
            var qualification = await _unitOfWork.GetRepository<UserProfessionalQualification>()
                .AsQueryable()
                .Include(upq => upq.ProfessionalRoleType)
                .FirstOrDefaultAsync(upq => upq.Id == qualificationId);

            if (qualification == null || qualification.ProfessionalRoleType?.Name != RoleNames.Trainer)
            {
                return false;
            }

            var trainerDetails = await _unitOfWork.GetRepository<TrainerDetails>()
                .GetByIdAsync(qualificationId);

            if (trainerDetails == null)
            {
                return false;
            }

            _unitOfWork.GetRepository<TrainerDetails>().Delete(trainerDetails);
            qualification.SetTrainerDetailsId(null);
            _unitOfWork.GetRepository<UserProfessionalQualification>().Update(qualification);
            return await _unitOfWork.SaveChangesAsync() > 0;
        }

        #endregion
    }
}