using AutoMapper;
using HealthyLifestyle.Application.DTOs.ProfessionalQualification;
using HealthyLifestyle.Application.Interfaces.ProfessionalQualification;
using HealthyLifestyle.Core.Entities;
using HealthyLifestyle.Core.Enums;
using HealthyLifestyle.Core.Interfaces;

namespace HealthyLifestyle.Application.Services.ProfessionalQualification
{
    /// <summary>
    /// Сервіс для управління деталями профілів дієтологів, що реалізує логіку створення, оновлення, видалення та отримання даних.
    /// Спадкується від <see cref="RoleDetailsService{TEntity, TDto}"/> і реалізує контракт <see cref="IDietitianDetailsService"/>.
    /// </summary>
    public class DietitianDetailsService : RoleDetailsService<DietitianDetails, DietitianDetailsDto>, IDietitianDetailsService
    {
        #region Constructors

        /// <summary>
        /// Ініціалізує новий екземпляр <see cref="DietitianDetailsService"/> з необхідними залежностями.
        /// </summary>
        /// <param name="unitOfWork">Юніт роботи для доступу до репозиторіїв.</param>
        /// <param name="mapper">Екземпляр AutoMapper для мапінгу об’єктів.</param>
        /// <exception cref="ArgumentNullException">Виникає, якщо <paramref name="unitOfWork"/> або <paramref name="mapper"/> є null.</exception>
        public DietitianDetailsService(IUnitOfWork unitOfWork, IMapper mapper) : base(unitOfWork, mapper)
        {
        }

        #endregion

        #region Protected Methods

        /// <summary>
        /// Створює новий екземпляр сутності <see cref="DietitianDetails"/> на основі DTO.
        /// </summary>
        /// <param name="qualificationId">Унікальний ідентифікатор кваліфікації.</param>
        /// <param name="dto">DTO з даними для створення профілю дієтолога.</param>
        /// <returns>Новий екземпляр <see cref="DietitianDetails"/>.</returns>
        /// <exception cref="ArgumentNullException">Виникає, якщо <paramref name="dto"/> є null.</exception>
        protected override DietitianDetails CreateEntityInstance(Guid qualificationId, DietitianDetailsDto dto)
        {
            if (dto == null) throw new ArgumentNullException(nameof(dto));

            return new DietitianDetails(
                qualificationId: qualificationId,
                specializations: dto.Specializations,
                nutritionalApproach: dto.NutritionalApproach,
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
        }

        /// <summary>
        /// Оновлює деталі існуючого екземпляра <see cref="DietitianDetails"/> на основі DTO.
        /// </summary>
        /// <param name="entity">Екземпляр сутності для оновлення.</param>
        /// <param name="dto">DTO з новими даними для оновлення профілю.</param>
        /// <exception cref="ArgumentNullException">Виникає, якщо <paramref name="entity"/> або <paramref name="dto"/> є null.</exception>
        protected override void UpdateEntityDetails(DietitianDetails entity, DietitianDetailsDto dto)
        {
            if (entity == null) throw new ArgumentNullException(nameof(entity));
            if (dto == null) throw new ArgumentNullException(nameof(dto));

            entity.UpdateDietitianSpecificDetails(
                specializations: dto.Specializations,
                nutritionalApproach: dto.NutritionalApproach,
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
        }

        #endregion

        #region Public Methods

        /// <summary>
        /// Отримує деталі профілю дієтолога за ідентифікатором кваліфікації.
        /// </summary>
        /// <param name="qualificationId">Унікальний ідентифікатор кваліфікації.</param>
        /// <returns>DTO з деталями профілю або null, якщо деталі не знайдені.</returns>
        public async Task<DietitianDetailsDto?> GetDietitianDetailsByQualificationIdAsync(Guid qualificationId)
        {
            return await GetDetailsByQualificationIdAsync(qualificationId, RoleNames.Dietitian);
        }

        /// <summary>
        /// Створює нові деталі профілю дієтолога.
        /// </summary>
        /// <param name="qualificationId">Ідентифікатор кваліфікації.</param>
        /// <param name="dto">DTO з даними для створення.</param>
        /// <returns>DTO з створеними деталями або null, якщо створення не вдалося.</returns>
        /// <exception cref="ArgumentNullException">Виникає, якщо <paramref name="dto"/> є null.</exception>
        public async Task<DietitianDetailsDto?> CreateDietitianDetailsAsync(Guid qualificationId, DietitianDetailsDto dto)
        {
            if (dto == null) throw new ArgumentNullException(nameof(dto));
            return await CreateDetailsAsync(qualificationId, dto, RoleNames.Dietitian);
        }

        /// <summary>
        /// Оновлює існуючі деталі профілю дієтолога.
        /// </summary>
        /// <param name="qualificationId">Ідентифікатор кваліфікації.</param>
        /// <param name="dto">DTO з новими даними.</param>
        /// <returns>DTO з оновленими деталями або null, якщо оновлення не вдалося.</returns>
        /// <exception cref="ArgumentNullException">Виникає, якщо <paramref name="dto"/> є null.</exception>
        public async Task<DietitianDetailsDto?> UpdateDietitianDetailsAsync(Guid qualificationId, DietitianDetailsDto dto)
        {
            if (dto == null) throw new ArgumentNullException(nameof(dto));
            return await UpdateDetailsAsync(qualificationId, dto, RoleNames.Dietitian);
        }

        /// <summary>
        /// Видаляє деталі профілю дієтолога.
        /// </summary>
        /// <param name="qualificationId">Ідентифікатор кваліфікації.</param>
        /// <returns><c>true</c>, якщо видалення успішне; інакше <c>false</c>.</returns>
        public async Task<bool> DeleteDietitianDetailsAsync(Guid qualificationId)
        {
            return await DeleteDetailsAsync(qualificationId, RoleNames.Dietitian);
        }

        #endregion
    }
}