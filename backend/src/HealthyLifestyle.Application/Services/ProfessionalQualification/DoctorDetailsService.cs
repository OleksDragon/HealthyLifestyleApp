using AutoMapper;
using HealthyLifestyle.Application.DTOs.ProfessionalQualification;
using HealthyLifestyle.Application.Interfaces.ProfessionalQualification;
using HealthyLifestyle.Core.Entities;
using HealthyLifestyle.Core.Enums;
using HealthyLifestyle.Core.Interfaces;

namespace HealthyLifestyle.Application.Services.ProfessionalQualification
{
    /// <summary>
    /// Сервіс для управління деталями профілів лікарів, що реалізує логіку створення, оновлення, видалення та отримання даних.
    /// Спадкується від <see cref="RoleDetailsService{TEntity, TDto}"/> і реалізує контракт <see cref="IDoctorDetailsService"/>.
    /// </summary>
    public class DoctorDetailsService : RoleDetailsService<DoctorDetails, DoctorDetailsDto>, IDoctorDetailsService
    {
        #region Constructors

        /// <summary>
        /// Ініціалізує новий екземпляр <see cref="DoctorDetailsService"/> з необхідними залежностями.
        /// </summary>
        /// <param name="unitOfWork">Юніт роботи для доступу до репозиторіїв.</param>
        /// <param name="mapper">Екземпляр AutoMapper для мапінгу об’єктів.</param>
        /// <exception cref="ArgumentNullException">Виникає, якщо <paramref name="unitOfWork"/> або <paramref name="mapper"/> є null.</exception>
        public DoctorDetailsService(IUnitOfWork unitOfWork, IMapper mapper) : base(unitOfWork, mapper)
        {
        }

        #endregion

        #region Protected Methods

        /// <summary>
        /// Створює новий екземпляр сутності <see cref="DoctorDetails"/> на основі DTO.
        /// </summary>
        /// <param name="qualificationId">Унікальний ідентифікатор кваліфікації.</param>
        /// <param name="dto">DTO з даними для створення профілю лікаря.</param>
        /// <returns>Новий екземпляр <see cref="DoctorDetails"/>.</returns>
        /// <exception cref="ArgumentNullException">Виникає, якщо <paramref name="dto"/> є null.</exception>
        protected override DoctorDetails CreateEntityInstance(Guid qualificationId, DoctorDetailsDto dto)
        {
            if (dto == null) throw new ArgumentNullException(nameof(dto));

            return new DoctorDetails(
                qualificationId: qualificationId,
                specializations: dto.Specializations,
                clinicAffiliation: dto.ClinicAffiliation,
                professionalLicenseNumber: dto.ProfessionalLicenseNumber,
                biography: dto.Biography,
                contactEmail: dto.ContactEmail,
                contactPhone: dto.ContactPhone,
                website: dto.Website,
                yearsOfExperience: dto.YearsOfExperience,
                certifications: dto.Certifications,
                availability: dto.Availability,
                clientTestimonials: dto.ClientTestimonials,
                expertDetailsPictureUrl: dto.ExpertDetailsPictureUrl,
                cardPictureUrl: dto.CardPictureUrl
            );
        }

        /// <summary>
        /// Оновлює деталі існуючого екземпляра <see cref="DoctorDetails"/> на основі DTO.
        /// </summary>
        /// <param name="entity">Екземпляр сутності для оновлення.</param>
        /// <param name="dto">DTO з новими даними для оновлення профілю.</param>
        /// <exception cref="ArgumentNullException">Виникає, якщо <paramref name="entity"/> або <paramref name="dto"/> є null.</exception>
        protected override void UpdateEntityDetails(DoctorDetails entity, DoctorDetailsDto dto)
        {
            if (entity == null) throw new ArgumentNullException(nameof(entity));
            if (dto == null) throw new ArgumentNullException(nameof(dto));

            entity.UpdateDoctorSpecificDetails(
                specializations: dto.Specializations,
                clinicAffiliation: dto.ClinicAffiliation,
                professionalLicenseNumber: dto.ProfessionalLicenseNumber,
                biography: dto.Biography,
                contactEmail: dto.ContactEmail,
                contactPhone: dto.ContactPhone,
                website: dto.Website,
                yearsOfExperience: dto.YearsOfExperience,
                certifications: dto.Certifications,
                availability: dto.Availability,
                clientTestimonials: dto.ClientTestimonials
            );

            // Оновлення зображень
            if (dto.ExpertDetailsPictureUrl != null)
                entity.UpdateExpertDetailsPictureUrl(dto.ExpertDetailsPictureUrl);
            if (dto.CardPictureUrl != null)
                entity.UpdateCardPictureUrl(dto.CardPictureUrl);
        }

        #endregion

        #region Public Methods

        /// <summary>
        /// Отримує деталі профілю лікаря за ідентифікатором кваліфікації.
        /// </summary>
        /// <param name="qualificationId">Унікальний ідентифікатор кваліфікації.</param>
        /// <returns>DTO з деталями профілю або null, якщо деталі не знайдені.</returns>
        public async Task<DoctorDetailsDto?> GetDoctorDetailsByQualificationIdAsync(Guid qualificationId)
        {
            return await GetDetailsByQualificationIdAsync(qualificationId, RoleNames.Doctor);
        }

        /// <summary>
        /// Створює нові деталі профілю лікаря.
        /// </summary>
        /// <param name="qualificationId">Ідентифікатор кваліфікації.</param>
        /// <param name="dto">DTO з даними для створення.</param>
        /// <returns>DTO з створеними деталями або null, якщо створення не вдалося.</returns>
        /// <exception cref="ArgumentNullException">Виникає, якщо <paramref name="dto"/> є null.</exception>
        public async Task<DoctorDetailsDto?> CreateDoctorDetailsAsync(Guid qualificationId, DoctorDetailsDto dto)
        {
            if (dto == null) throw new ArgumentNullException(nameof(dto));
            return await CreateDetailsAsync(qualificationId, dto, RoleNames.Doctor);
        }

        /// <summary>
        /// Оновлює існуючі деталі профілю лікаря.
        /// </summary>
        /// <param name="qualificationId">Ідентифікатор кваліфікації.</param>
        /// <param name="dto">DTO з новими даними.</param>
        /// <returns>DTO з оновленими деталями або null, якщо оновлення не вдалося.</returns>
        /// <exception cref="ArgumentNullException">Виникає, якщо <paramref name="dto"/> є null.</exception>
        public async Task<DoctorDetailsDto?> UpdateDoctorDetailsAsync(Guid qualificationId, DoctorDetailsDto dto)
        {
            if (dto == null) throw new ArgumentNullException(nameof(dto));
            return await UpdateDetailsAsync(qualificationId, dto, RoleNames.Doctor);
        }

        /// <summary>
        /// Видаляє деталі профілю лікаря.
        /// </summary>
        /// <param name="qualificationId">Ідентифікатор кваліфікації.</param>
        /// <returns><c>true</c>, якщо видалення успішне; інакше <c>false</c>.</returns>
        public async Task<bool> DeleteDoctorDetailsAsync(Guid qualificationId)
        {
            return await DeleteDetailsAsync(qualificationId, RoleNames.Doctor);
        }

        #endregion
    }
}