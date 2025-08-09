using AutoMapper;
using HealthyLifestyle.Application.Interfaces.ProfessionalQualification;
using HealthyLifestyle.Core.Entities;
using HealthyLifestyle.Core.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace HealthyLifestyle.Application.Services.ProfessionalQualification
{
    /// <summary>
    /// Абстрактний базовий клас для сервісів управління деталями профілів ролей.
    /// Забезпечує спільну логіку для роботи з репозиторіями, мапінгом та валідацією.
    /// </summary>
    /// <typeparam name="TEntity">Тип сутності деталей ролі (наприклад, DietitianDetails).</typeparam>
    /// <typeparam name="TDto">Тип DTO для мапінгу (наприклад, DietitianDetailsDto).</typeparam>
    public abstract class RoleDetailsService<TEntity, TDto> : IRoleDetailsService<TDto>
        where TEntity : RoleSpecificDetail
        where TDto : class
    {
        #region Private Fields

        protected readonly IUnitOfWork _unitOfWork;
        protected readonly IMapper _mapper;

        #endregion

        #region Constructors

        /// <summary>
        /// Ініціалізує новий екземпляр <see cref="RoleDetailsService{TEntity, TDto}"/> з необхідними залежностями.
        /// </summary>
        /// <param name="unitOfWork">Екземпляр <see cref="IUnitOfWork"/> для роботи з репозиторіями.</param>
        /// <param name="mapper">Екземпляр <see cref="IMapper"/> для мапінгу об’єктів.</param>
        /// <exception cref="ArgumentNullException">Виникає, якщо <paramref name="unitOfWork"/> або <paramref name="mapper"/> є null.</exception>
        protected RoleDetailsService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork ?? throw new ArgumentNullException(nameof(unitOfWork));
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
        }

        #endregion

        #region Methods

        /// <summary>
        /// Отримує деталі профілю за ідентифікатором кваліфікації.
        /// </summary>
        /// <param name="qualificationId">Унікальний ідентифікатор кваліфікації.</param>
        /// <param name="roleName">Назва ролі для валідації.</param>
        /// <returns>DTO з деталями профілю або null, якщо деталі не знайдені.</returns>
        public async Task<TDto?> GetDetailsByQualificationIdAsync(Guid qualificationId, string roleName)
        {
            var repo = _unitOfWork.GetRepository<TEntity>();
            var details = await repo.AsQueryable()
                .Include(d => d.UserProfessionalQualification!)
                    .ThenInclude(upq => upq.ProfessionalRoleType)
                .Where(d => d.Id == qualificationId &&
                            d.UserProfessionalQualification != null &&
                            d.UserProfessionalQualification.ProfessionalRoleType!.Name == roleName)
                .FirstOrDefaultAsync();

            return details == null ? null : _mapper.Map<TDto>(details);
        }

        /// <summary>
        /// Створює нові деталі профілю.
        /// </summary>
        /// <param name="qualificationId">Ідентифікатор кваліфікації.</param>
        /// <param name="dto">DTO з даними для створення.</param>
        /// <param name="roleName">Назва ролі для валідації.</param>
        /// <returns>DTO з створеними деталями або null, якщо створення не вдалося.</returns>
        public async Task<TDto?> CreateDetailsAsync(Guid qualificationId, TDto dto, string roleName)
        {
            if (dto == null) throw new ArgumentNullException(nameof(dto));

            var existingDetails = await _unitOfWork.GetRepository<TEntity>().GetByIdAsync(qualificationId);
            if (existingDetails != null) return null;

            var qualification = await _unitOfWork.GetRepository<UserProfessionalQualification>()
                .AsQueryable()
                .Include(upq => upq.ProfessionalRoleType)
                .FirstOrDefaultAsync(upq => upq.Id == qualificationId);

            if (qualification == null || qualification.ProfessionalRoleType?.Name != roleName) return null;

            var newEntity = CreateEntityInstance(qualificationId, dto);
            await _unitOfWork.GetRepository<TEntity>().AddAsync(newEntity);
            await _unitOfWork.SaveChangesAsync();

            var createdDetails = await _unitOfWork.GetRepository<TEntity>()
                .AsQueryable()
                .Include(d => d.UserProfessionalQualification!)
                .ThenInclude(upq => upq.ProfessionalRoleType)
                .FirstOrDefaultAsync(d => d.Id == qualificationId);

            return createdDetails == null ? null : _mapper.Map<TDto>(createdDetails);
        }

        /// <summary>
        /// Оновлює існуючі деталі профілю.
        /// </summary>
        /// <param name="qualificationId">Ідентифікатор кваліфікації.</param>
        /// <param name="dto">DTO з новими даними.</param>
        /// <param roleName="roleName">Назва ролі для валідації.</param>
        /// <returns>DTO з оновленими деталями або null, якщо оновлення не вдалося.</returns>
        public async Task<TDto?> UpdateDetailsAsync(Guid qualificationId, TDto dto, string roleName)
        {
            if (dto == null) throw new ArgumentNullException(nameof(dto));

            var details = await _unitOfWork.GetRepository<TEntity>()
                .AsQueryable()
                .Include(d => d.UserProfessionalQualification!)
                .ThenInclude(upq => upq.ProfessionalRoleType)
                .FirstOrDefaultAsync(d => d.Id == qualificationId);

            if (details == null || details.UserProfessionalQualification?.ProfessionalRoleType?.Name != roleName) return null;

            UpdateEntityDetails(details, dto);
            _unitOfWork.GetRepository<TEntity>().Update(details);
            await _unitOfWork.SaveChangesAsync();

            return _mapper.Map<TDto>(details);
        }

        /// <summary>
        /// Видаляє деталі профілю.
        /// </summary>
        /// <param name="qualificationId">Ідентифікатор кваліфікації.</param>
        /// <param roleName="roleName">Назва ролі для валідації.</param>
        /// <returns>true, якщо видалення успішне; інакше false.</returns>
        public async Task<bool> DeleteDetailsAsync(Guid qualificationId, string roleName)
        {
            var details = await _unitOfWork.GetRepository<TEntity>()
                .AsQueryable()
                .Include(d => d.UserProfessionalQualification!)
                .ThenInclude(upq => upq.ProfessionalRoleType)
                .FirstOrDefaultAsync(d => d.Id == qualificationId);

            if (details == null || details.UserProfessionalQualification?.ProfessionalRoleType?.Name != roleName) return false;

            _unitOfWork.GetRepository<TEntity>().Delete(details);
            return await _unitOfWork.SaveChangesAsync() > 0;
        }

        /// <summary>
        /// Абстрактний метод для створення екземпляра сутності на основі DTO.
        /// </summary>
        /// <param name="qualificationId">Ідентифікатор кваліфікації.</param>
        /// <param name="dto">DTO з даними.</param>
        /// <returns>Новий екземпляр сутності.</returns>
        protected abstract TEntity CreateEntityInstance(Guid qualificationId, TDto dto);

        /// <summary>
        /// Абстрактний метод для оновлення деталей сутності на основі DTO.
        /// </summary>
        /// <param name="entity">Екземпляр сутності для оновлення.</param>
        /// <param name="dto">DTO з новими даними.</param>
        protected abstract void UpdateEntityDetails(TEntity entity, TDto dto);

        #endregion
    }
}