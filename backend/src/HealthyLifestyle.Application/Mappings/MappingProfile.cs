using AutoMapper;
using HealthyLifestyle.Application.DTOs.Auth;

using HealthyLifestyle.Application.DTOs.DietPlan;

using HealthyLifestyle.Application.DTOs.MealTracker;
using HealthyLifestyle.Application.DTOs.Notification;
using HealthyLifestyle.Application.DTOs.ProfessionalQualification;
using HealthyLifestyle.Application.DTOs.Shop;
using HealthyLifestyle.Application.DTOs.Sub;
using HealthyLifestyle.Application.DTOs.Tracker;
using HealthyLifestyle.Application.DTOs.User;
using HealthyLifestyle.Application.DTOs.Working;
using HealthyLifestyle.Core.Entities;
using HealthyLifestyle.Core.Enums;
using Microsoft.IdentityModel.Tokens;

namespace HealthyLifestyle.Application.Mappings
{
    /// <summary>
    /// Профіль мапінгу для конфігурації AutoMapper, що визначає відображення між DTO та сутностями.
    /// Використовується для автоматизації перетворення даних у додатку.
    /// </summary>
    public class MappingProfile : Profile
    {
        #region Конструктор

        /// <summary>
        /// Ініціалізує новий екземпляр <see cref="MappingProfile"/> і конфігурує мапінги.
        /// </summary>
        public MappingProfile()
        {
            ConfigureAuthAndUserMappings();
            ConfigureProfessionalQualificationMappings();
            ConfigureTrainerDetailsMappings();
            ConfigureDietitianDetailsMappings();
            ConfigureDoctorDetailsMappings();
            ConfigurePsychologistDetailsMappings();
            ConfigureProductMappings();
            ConfigureOrderMappings();
            ConfigureConsultationMappings();
            ConfigureGroupMappings();
            ConfigureChallengeMappings();
            ConfigureMaleHealthTrackerMappings();
            ConfigureFemaleHealthTrackerMappings();
            ConfigureMentalHealthRecordMappings();
            ConfigureNotificationMappings();
            ConfigureSleepRecordMappings();
            ConfigureDietPlanMappings();
            ConfigureMealMappings();
            ConfigureSubscriptionMappings();
        }
        #endregion

        #region Приватні методи конфігурації мапінгів

        /// <summary>
        /// Конфігурує мапінги для авторизації та користувачів.
        /// </summary>
        private void ConfigureAuthAndUserMappings()
        {
            CreateMap<RegisterUserDto, User>()
                .ForMember(dest => dest.UserName, opt => opt.MapFrom(src => src.Email))
                .ForMember(dest => dest.Id, opt => opt.Ignore())
                .ForMember(dest => dest.PasswordHash, opt => opt.Ignore())
                .ForMember(dest => dest.SecurityStamp, opt => opt.Ignore())
                .ForMember(dest => dest.ConcurrencyStamp, opt => opt.Ignore())
                .ForMember(dest => dest.CreatedAt, opt => opt.MapFrom(_ => DateTime.UtcNow));

            CreateMap<User, AuthResponseDto>()
                .ForMember(dest => dest.UserId, opt => opt.MapFrom(src => src.Id.ToString()));

            CreateMap<User, UserDto>();

            CreateMap<UpdateUserDto, User>()
                .ForMember(dest => dest.FullName, opt => opt.Condition(src => src.FullName != null))
                .ForMember(dest => dest.DateOfBirth, opt => opt.Condition(src => src.DateOfBirth.HasValue))
                .ForMember(dest => dest.Gender, opt => opt.Condition(src => src.Gender.HasValue))
                .ForMember(dest => dest.Weight, opt => opt.Condition(src => src.Weight.HasValue))
                .ForMember(dest => dest.Height, opt => opt.Condition(src => src.Height.HasValue))
                .ForMember(dest => dest.ProfilePictureUrl, opt => opt.Condition(src => src.ProfilePictureUrl != null))
                .ForMember(dest => dest.Bio, opt => opt.Condition(src => src.Bio != null))
                .ForMember(dest => dest.Email, opt => opt.Ignore())
                .ForMember(dest => dest.UserName, opt => opt.Ignore())
                .ForMember(dest => dest.PasswordHash, opt => opt.Ignore())
                .ForMember(dest => dest.Id, opt => opt.Ignore())
                .ForMember(dest => dest.CreatedAt, opt => opt.Ignore())
                .ForMember(dest => dest.UpdatedAt, opt => opt.MapFrom(_ => DateTime.UtcNow));
        }

        /// <summary>
        /// Конфігурує мапінги для професійних кваліфікацій.
        /// </summary>
        private void ConfigureProfessionalQualificationMappings()
        {
            CreateMap<ProfessionalRoleType, ProfessionalRoleTypeDto>();

            CreateMap<CreateProfessionalQualificationDto, UserProfessionalQualification>()
                .ForMember(dest => dest.Id, opt => opt.Ignore())
                .ForMember(dest => dest.UserId, opt => opt.Ignore())
                .ForMember(dest => dest.ApplicationDate, opt => opt.MapFrom(_ => DateTime.UtcNow))
                .ForMember(dest => dest.Status, opt => opt.MapFrom(_ => QualificationStatus.Pending))
                .ForMember(dest => dest.ApprovalDate, opt => opt.Ignore())
                .ForMember(dest => dest.ProfessionalRoleType, opt => opt.Ignore())
                .ForMember(dest => dest.User, opt => opt.Ignore())
                .ForMember(dest => dest.HourlyRate, opt => opt.MapFrom(src => src.HourlyRate ?? 0m))
                .ForMember(dest => dest.CreatedAt, opt => opt.MapFrom(_ => DateTime.UtcNow))
                .ForMember(dest => dest.UpdatedAt, opt => opt.Ignore());

            CreateMap<UserProfessionalQualification, UserProfessionalQualificationDto>()
                .ForMember(dest => dest.QualificationStatus, opt => opt.MapFrom(src => src.Status.ToString()));
        }

        /// <summary>
        /// Конфігурує мапінги для деталей тренера.
        /// </summary>
        private void ConfigureTrainerDetailsMappings()
        {
            CreateMap<TrainerDetailsDto, TrainerDetails>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.QualificationId))
                .ForMember(dest => dest.UserProfessionalQualification, opt => opt.Ignore())
                .ForMember(dest => dest.TrainingStyle, opt => opt.MapFrom(src => src.TrainingStyle))
                .ForMember(dest => dest.Biography, opt => opt.Condition(src => src.Biography != null))
                .ForMember(dest => dest.YearsOfExperience, opt => opt.Condition(src => src.YearsOfExperience.HasValue))
                .ForMember(dest => dest.Certifications, opt => opt.Condition(src => src.Certifications != null))
                .ForMember(dest => dest.Availability, opt => opt.Condition(src => src.Availability != null))
                .ForMember(dest => dest.PreferredWorkoutStyles, opt => opt.Condition(src => src.PreferredWorkoutStyles != null))
                .ForMember(dest => dest.ProfessionalLicenseNumber, opt => opt.Condition(src => src.ProfessionalLicenseNumber != null))
                .ForMember(dest => dest.CreatedAt, opt => opt.Ignore())
                .ForMember(dest => dest.UpdatedAt, opt => opt.MapFrom(_ => DateTime.UtcNow));

            CreateMap<TrainerDetails, TrainerDetailsDto>()
                .ForMember(dest => dest.TrainingStyle, opt => opt.MapFrom(src => src.TrainingStyle))
                .ForMember(dest => dest.QualificationId, opt => opt.MapFrom(src => src.Id));
        }

        /// <summary>
        /// Конфігурує мапінги для деталей дієтолога.
        /// </summary>
        private void ConfigureDietitianDetailsMappings()
        {
            CreateMap<DietitianDetailsDto, DietitianDetails>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.QualificationId))
                .ForMember(dest => dest.UserProfessionalQualification, opt => opt.Ignore())
                .ForMember(dest => dest.Specializations, opt => opt.Condition(src => src.Specializations != null))
                .ForMember(dest => dest.Biography, opt => opt.Condition(src => src.Biography != null))
                .ForMember(dest => dest.YearsOfExperience, opt => opt.Condition(src => src.YearsOfExperience.HasValue))
                .ForMember(dest => dest.Certifications, opt => opt.Condition(src => src.Certifications != null))
                .ForMember(dest => dest.NutritionalApproach, opt => opt.Condition(src => src.NutritionalApproach != null))
                .ForMember(dest => dest.ProfessionalLicenseNumber, opt => opt.Condition(src => src.ProfessionalLicenseNumber != null))
                .ForMember(dest => dest.Availability, opt => opt.Condition(src => src.Availability != null))
                .ForMember(dest => dest.CreatedAt, opt => opt.Ignore())
                .ForMember(dest => dest.UpdatedAt, opt => opt.MapFrom(_ => DateTime.UtcNow));

            CreateMap<DietitianDetails, DietitianDetailsDto>()
                .ForMember(dest => dest.QualificationId, opt => opt.MapFrom(src => src.Id));
        }

        /// <summary>
        /// Конфігурує мапінги для деталей лікаря.
        /// </summary>
        private void ConfigureDoctorDetailsMappings()
        {
            CreateMap<DoctorDetailsDto, DoctorDetails>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.QualificationId))
                .ForMember(dest => dest.UserProfessionalQualification, opt => opt.Ignore())
                .ForMember(dest => dest.Specializations, opt => opt.Condition(src => src.Specializations != null))
                .ForMember(dest => dest.Biography, opt => opt.Condition(src => src.Biography != null))
                .ForMember(dest => dest.YearsOfExperience, opt => opt.Condition(src => src.YearsOfExperience.HasValue))
                .ForMember(dest => dest.Certifications, opt => opt.Condition(src => src.Certifications != null))
                .ForMember(dest => dest.ClinicAffiliation, opt => opt.Condition(src => src.ClinicAffiliation != null))
                .ForMember(dest => dest.ProfessionalLicenseNumber, opt => opt.Condition(src => src.ProfessionalLicenseNumber != null))
                .ForMember(dest => dest.Availability, opt => opt.Condition(src => src.Availability != null))
                .ForMember(dest => dest.CreatedAt, opt => opt.Ignore())
                .ForMember(dest => dest.UpdatedAt, opt => opt.MapFrom(_ => DateTime.UtcNow));

            CreateMap<DoctorDetails, DoctorDetailsDto>()
                .ForMember(dest => dest.QualificationId, opt => opt.MapFrom(src => src.Id));
        }

        /// <summary>
        /// Конфігурує мапінги для деталей психолога.
        /// </summary>
        private void ConfigurePsychologistDetailsMappings()
        {
            CreateMap<PsychologistDetailsDto, PsychologistDetails>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.QualificationId))
                .ForMember(dest => dest.UserProfessionalQualification, opt => opt.Ignore())
                .ForMember(dest => dest.TherapyApproaches, opt => opt.Condition(src => src.TherapyApproaches != null))
                .ForMember(dest => dest.ProfessionalLicenseNumber, opt => opt.Condition(src => src.ProfessionalLicenseNumber != null))
                .ForMember(dest => dest.Biography, opt => opt.Condition(src => src.Biography != null))
                .ForMember(dest => dest.ContactEmail, opt => opt.Condition(src => src.ContactEmail != null))
                .ForMember(dest => dest.ContactPhone, opt => opt.Condition(src => src.ContactPhone != null))
                .ForMember(dest => dest.Website, opt => opt.Condition(src => src.Website != null))
                .ForMember(dest => dest.YearsOfExperience, opt => opt.Condition(src => src.YearsOfExperience.HasValue))
                .ForMember(dest => dest.Certifications, opt => opt.Condition(src => src.Certifications != null))
                .ForMember(dest => dest.Availability, opt => opt.Condition(src => src.Availability != null))
                .ForMember(dest => dest.ClientTestimonials, opt => opt.Condition(src => src.ClientTestimonials != null))
                .ForMember(dest => dest.CreatedAt, opt => opt.Ignore())
                .ForMember(dest => dest.UpdatedAt, opt => opt.MapFrom(_ => DateTime.UtcNow));

            CreateMap<PsychologistDetails, PsychologistDetailsDto>()
                .ForMember(dest => dest.QualificationId, opt => opt.MapFrom(src => src.Id));
        }

        /// <summary>
        /// Конфігурує мапінги для сутності Product.
        /// </summary>
        private void ConfigureProductMappings()
        {
            CreateMap<Product, ProductDto>(); // Мапінг з сутності Product на ProductDto

            CreateMap<ProductCreateDto, Product>()
                .ForMember(dest => dest.Id, opt => opt.Ignore()) // Id генерується автоматично
                .ForMember(dest => dest.CreatedAt, opt => opt.MapFrom(_ => DateTime.UtcNow))
                .ForMember(dest => dest.UpdatedAt, opt => opt.Ignore());

            CreateMap<ProductUpdateDto, Product>()
                .ForMember(dest => dest.Id, opt => opt.Ignore()) // Id не оновлюється через DTO
                .ForMember(dest => dest.CreatedAt, opt => opt.Ignore()) // Дата створення не оновлюється
                .ForMember(dest => dest.UpdatedAt, opt => opt.MapFrom(_ => DateTime.UtcNow))
                .ForMember(dest => dest.Name, opt => opt.Condition(src => src.Name != null))
                .ForMember(dest => dest.Category, opt => opt.Condition(src => src.Category.HasValue)) // Для Enum
                .ForMember(dest => dest.Price, opt => opt.Condition(src => src.Price.HasValue))
                .ForMember(dest => dest.Brand, opt => opt.Condition(src => src.Brand != null))
                .ForMember(dest => dest.Description, opt => opt.Condition(src => src.Description != null))
                .ForMember(dest => dest.StockQuantity, opt => opt.Condition(src => src.StockQuantity.HasValue))
                .ForMember(dest => dest.PlatformCommissionPercentage, opt => opt.Condition(src => src.PlatformCommissionPercentage.HasValue))
                .ForMember(dest => dest.ImageUrl, opt => opt.Condition(src => src.ImageUrl != null));
        }

        /// <summary>
        /// Конфігурує мапінги для сутностей замовлень (Order) та елементів замовлень (OrderItem).
        /// </summary>
        private void ConfigureOrderMappings()
        {
            // Мапінг з Order (сутності) в OrderDto (DTO)
            CreateMap<Order, OrderDto>()
                .ForMember(dest => dest.OrderItems, opt => opt.MapFrom(src => src.OrderItems))
                .ForMember(dest => dest.UserEmail, opt => opt.Ignore());

            // Мапінг з OrderItem (сутності) в OrderItemDto (DTO)
            CreateMap<OrderItem, OrderItemDto>()
                .ForMember(dest => dest.ProductName, opt => opt.MapFrom(src => src.Product != null ? src.Product.Name : null));

            // Мапінг з OrderCreateDto (DTO для створення) в Order (сутність)
            CreateMap<OrderCreateDto, Order>()
                .ForMember(dest => dest.OrderItems, opt => opt.Ignore())
                .ForMember(dest => dest.OrderDate, opt => opt.MapFrom(src => DateTime.UtcNow))
                .ForMember(dest => dest.Status, opt => opt.MapFrom(src => OrderStatus.Pending))
                .ForMember(dest => dest.TotalAmount, opt => opt.Ignore())
                .ForMember(dest => dest.CreatedAt, opt => opt.MapFrom(_ => DateTime.UtcNow))
                .ForMember(dest => dest.UpdatedAt, opt => opt.MapFrom(_ => DateTime.UtcNow))
                .ForMember(dest => dest.Id, opt => opt.Ignore());

            // Мапінг для OrderUpdateDto в Order
            CreateMap<OrderUpdateDto, Order>()
                .ForMember(dest => dest.Status, opt => opt.Condition(src => src.Status.HasValue))
                .ForMember(dest => dest.Status, opt => opt.MapFrom(src => src.Status!.Value))

                .ForMember(dest => dest.ShippingAddress, opt => opt.Condition(src => src.ShippingAddress != null))
                .ForMember(dest => dest.ShippingAddress, opt => opt.MapFrom(src => src.ShippingAddress!))
                .ForMember(dest => dest.Id, opt => opt.Ignore())
                .ForMember(dest => dest.UserId, opt => opt.Ignore())
                .ForMember(dest => dest.OrderDate, opt => opt.Ignore())
                .ForMember(dest => dest.TotalAmount, opt => opt.Ignore())
                .ForMember(dest => dest.OrderItems, opt => opt.Ignore())
                .ForMember(dest => dest.CreatedAt, opt => opt.Ignore())
                .ForMember(dest => dest.UpdatedAt, opt => opt.MapFrom(_ => DateTime.UtcNow));
        }

        /// <summary>
        /// Конфігурує мапінги для сутності Consultation.
        /// </summary>
        private void ConfigureConsultationMappings()
        {
            CreateMap<Consultation, ConsultationDto>(); // Мапінг з сутності Consultation на ConsultationDto

            CreateMap<ConsultationCreateDto, Consultation>()
                .ForMember(dest => dest.Id, opt => opt.Ignore()) // Id генерується автоматично
                .ForMember(dest => dest.CreatedAt, opt => opt.MapFrom(_ => DateTime.UtcNow))
                .ForMember(dest => dest.UpdatedAt, opt => opt.Ignore());

            CreateMap<ConsultationUpdateDto, Consultation>()
                .ForMember(dest => dest.Id, opt => opt.Ignore()) // Id не оновлюється через DTO
                .ForMember(dest => dest.CreatedAt, opt => opt.Ignore()) // Дата створення не оновлюється
                .ForMember(dest => dest.UpdatedAt, opt => opt.MapFrom(_ => DateTime.UtcNow))
                .ForMember(dest => dest.ClientId, opt => opt.Ignore())
                .ForMember(dest => dest.ProfessionalId, opt => opt.Ignore())
                .ForMember(dest => dest.ProfessionalQualificationId, opt => opt.Ignore())
                .ForMember(dest => dest.ConsultationDate, opt => opt.Condition(src => src.ConsultationDate != null))
                .ForMember(dest => dest.DurationMinutes, opt => opt.Condition(src => src.DurationMinutes != null))
                .ForMember(dest => dest.Cost, opt => opt.Condition(src => src.Cost != null))
                .ForMember(dest => dest.Status, opt => opt.Condition(src => src.Status.HasValue))
                .ForMember(dest => dest.PlatformCommission, opt => opt.Condition(src => src.PlatformCommission != null))
                .ForMember(dest => dest.MeetingLink, opt => opt.Condition(src => src.MeetingLink != null))
                .ForMember(dest => dest.Notes, opt => opt.Condition(src => src.Notes != null));
        }

        /// <summary>
        /// Конфігурує мапінги для MaleHealthTracker.
        /// </summary>
        private void ConfigureMaleHealthTrackerMappings()
        {
            CreateMap<MaleHealthTracker, MaleHealthTrackerDto>(); // Мапінг з сутності MaleHealthTracker на MaleHealthTrackerDto

            CreateMap<MaleHealthTrackerCreateDto, MaleHealthTracker>()
                .ForMember(dest => dest.Id, opt => opt.Ignore()) // Id генерується автоматично
                .ForMember(dest => dest.CreatedAt, opt => opt.MapFrom(_ => DateTime.UtcNow))
                .ForMember(dest => dest.UpdatedAt, opt => opt.Ignore())
                .ForMember(dest => dest.RecordDate, opt => opt.MapFrom(src => src.RecordDate));

            CreateMap<MaleHealthTrackerUpdateDto, MaleHealthTracker>()
                .ForMember(dest => dest.Id, opt => opt.Ignore()) // Id не оновлюється через DTO
                .ForMember(dest => dest.CreatedAt, opt => opt.Ignore()) // Дата створення не оновлюється
                .ForMember(dest => dest.UpdatedAt, opt => opt.MapFrom(_ => DateTime.UtcNow))
                .ForMember(dest => dest.UserId, opt => opt.Ignore()) // UserId не оновлюється
                .ForMember(dest => dest.RecordDate, opt => opt.MapFrom(src => src.RecordDate))
                .ForMember(dest => dest.TestosteroneLevel, opt => opt.Condition(src => src.TestosteroneLevel.HasValue))
                .ForMember(dest => dest.EnergyLevelScore, opt => opt.Condition(src => src.EnergyLevelScore.HasValue))
                .ForMember(dest => dest.Notes, opt => opt.Condition(src => src.Notes != null));

        }

        private void ConfigureGroupMappings()
        {
            CreateMap<Group, GroupDto>()
                .ForMember(dest => dest.GroupMembers, opt => opt.MapFrom(src => src.GroupMemberships));

            CreateMap<GroupMembership, GroupMemberDto>()
                .ForMember(dest => dest.GroupId, opt => opt.MapFrom(src => src.GroupId))
                .ForMember(dest => dest.UserId, opt => opt.MapFrom(src => src.UserId))
                .ForMember(dest => dest.JoinDate, opt => opt.MapFrom(src => src.JoinDate))
                .ForMember(dest => dest.Role, opt => opt.MapFrom(src => src.Role));

            CreateMap<GroupCreateDto, Group>()
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
                .ForMember(dest => dest.Description, opt => opt.MapFrom(src => src.Description))
                .ForMember(dest => dest.CreatorId, opt => opt.MapFrom(src => src.CreatorId))
                .ForMember(dest => dest.CreationDate, opt => opt.MapFrom(_ => DateTime.UtcNow))
                .ForMember(dest => dest.GroupMemberships, opt => opt.MapFrom(src => src.GroupMembers))
                .ForMember(dest => dest.Creator, opt => opt.Ignore()) // вручну або з контексту
                .ForMember(dest => dest.Id, opt => opt.Ignore());

            CreateMap<GroupUpdateDto, Group>()
                .ForMember(dest => dest.Name, opt => opt.Condition(src => !string.IsNullOrEmpty(src.Name)))
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
                .ForMember(dest => dest.Description, opt => opt.MapFrom(src => src.Description))
                .ForMember(dest => dest.GroupMemberships, opt => opt.MapFrom(src => src.GroupMembers))
                .ForMember(dest => dest.Id, opt => opt.Ignore())
                .ForMember(dest => dest.CreatorId, opt => opt.Ignore())
                .ForMember(dest => dest.Creator, opt => opt.Ignore())
                .ForMember(dest => dest.CreationDate, opt => opt.Ignore());

            CreateMap<GroupMemberDto, GroupMembership>()
                .ForMember(dest => dest.GroupId, opt => opt.MapFrom(src => src.GroupId))
                .ForMember(dest => dest.UserId, opt => opt.MapFrom(src => src.UserId))
                .ForMember(dest => dest.JoinDate, opt => opt.MapFrom(src => src.JoinDate))
                .ForMember(dest => dest.Role, opt => opt.MapFrom(src => src.Role))
                .ForMember(dest => dest.Group, opt => opt.Ignore())
                .ForMember(dest => dest.User, opt => opt.Ignore());

            CreateMap<GroupMemberCreateDto, GroupMembership>()
                .ForMember(dest => dest.UserId, opt => opt.MapFrom(src => src.UserId))
                .ForMember(dest => dest.JoinDate, opt => opt.MapFrom(src => src.JoinDate))
                .ForMember(dest => dest.Role, opt => opt.MapFrom(src => src.Role))
                .ForMember(dest => dest.GroupId, opt => opt.Ignore())
                .ForMember(dest => dest.Group, opt => opt.Ignore())
                .ForMember(dest => dest.User, opt => opt.Ignore());
        }

        private void ConfigureFemaleHealthTrackerMappings()
        {
            CreateMap<FemaleHealthTracker, FemaleHealthTrackerDto>()
                .ForMember(dest => dest.PmsSymptoms, opt => opt.MapFrom(src => src.PmsSymptoms));

            CreateMap<FemaleHealthTrackerCreateDto, FemaleHealthTracker>()
                .ForMember(dest => dest.Id, opt => opt.Ignore()) // Id генерується автоматично
                .ForMember(dest => dest.RecordDate, opt => opt.MapFrom(src => src.RecordDate))
                .ForMember(dest => dest.CreatedAt, opt => opt.MapFrom(_ => DateTime.UtcNow))
                .ForMember(dest => dest.UpdatedAt, opt => opt.Ignore())
                .ForMember(dest => dest.User, opt => opt.Ignore()) // Навігаційне поле
                .ForMember(dest => dest.UserId, opt => opt.MapFrom(src => src.UserId))
                .ForMember(dest => dest.CycleDay, opt => opt.MapFrom(src => src.CycleDay))
                .ForMember(dest => dest.IsFertile, opt => opt.MapFrom(src => src.IsFertile))
                .ForMember(dest => dest.PmsSymptoms, opt => opt.MapFrom(src => src.PmsSymptoms))
                .ForMember(dest => dest.MoodNotes, opt => opt.MapFrom(src => src.MoodNotes))
                .ForMember(dest => dest.BleedingLevel, opt => opt.MapFrom(src => src.BleedingLevel));

            CreateMap<FemaleHealthTrackerUpdateDto, FemaleHealthTracker>()
                .ForMember(dest => dest.Id, opt => opt.Ignore()) // Id не оновлюється
                .ForMember(dest => dest.UserId, opt => opt.Ignore()) // UserId не оновлюється
                .ForMember(dest => dest.RecordDate, opt => opt.MapFrom(src => src.RecordDate))
                .ForMember(dest => dest.CreatedAt, opt => opt.Ignore()) // Дата створення не оновлюється
                .ForMember(dest => dest.UpdatedAt, opt => opt.MapFrom(_ => DateTime.UtcNow))
                .ForMember(dest => dest.CycleDay, opt => opt.Condition(src => src.CycleDay.HasValue))
                .ForMember(dest => dest.IsFertile, opt => opt.Condition(src => src.IsFertile.HasValue))
                .ForMember(dest => dest.PmsSymptoms, opt => opt.Condition(src => src.PmsSymptoms != null))
                .ForMember(dest => dest.MoodNotes, opt => opt.Condition(src => src.MoodNotes != null))
                .ForMember(dest => dest.BleedingLevel, opt => opt.Condition(src => src.BleedingLevel.HasValue)); // Для Enum
        }

        private void ConfigureChallengeMappings()
        {
            CreateMap<SocialChallenge, ChallengeDto>()
                .ForMember(dest => dest.Participations, opt => opt.MapFrom(src => src.Participations));

            CreateMap<UserChallengeParticipation, ChallengeParticipationDto>()
                .ForMember(dest => dest.ChallengeId, opt => opt.MapFrom(src => src.ChallengeId))
                .ForMember(dest => dest.UserId, opt => opt.MapFrom(src => src.UserId))
                .ForMember(dest => dest.JoinDate, opt => opt.MapFrom(src => src.JoinDate))
                .ForMember(dest => dest.Progress, opt => opt.MapFrom(src => src.Progress))
                .ForMember(dest => dest.Status, opt => opt.MapFrom(src => src.Status));

            CreateMap<ChallengeCreateDto, SocialChallenge>()
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
                .ForMember(dest => dest.Description, opt => opt.MapFrom(src => src.Description))
                .ForMember(dest => dest.CreatorId, opt => opt.MapFrom(src => src.CreatorId))
                .ForMember(dest => dest.StartDate, opt => opt.MapFrom(src => src.StartDate))
                .ForMember(dest => dest.EndDate, opt => opt.MapFrom(src => src.EndDate))
                .ForMember(dest => dest.Type, opt => opt.MapFrom(src => src.Type))
                .ForMember(dest => dest.Creator, opt => opt.Ignore())
                .ForMember(dest => dest.Id, opt => opt.Ignore())
                .ForMember(dest => dest.Participations, opt => opt.MapFrom(src => src.Participations));

            CreateMap<ChallengeUpdateDto, SocialChallenge>()
                .ForMember(dest => dest.Name, opt => opt.Condition(src => !string.IsNullOrEmpty(src.Name)))
                .ForMember(dest => dest.Description, opt => opt.Condition(src => !string.IsNullOrEmpty(src.Description)))
                .ForMember(dest => dest.CreatorId, opt => opt.Ignore())
                .ForMember(dest => dest.StartDate, opt => opt.Condition(src => src.StartDate != null))
                .ForMember(dest => dest.EndDate, opt => opt.Condition(src => src.EndDate != null))
                .ForMember(dest => dest.Type, opt => opt.Condition(src => src.Type.HasValue))
                .ForMember(dest => dest.Creator, opt => opt.Ignore())
                .ForMember(dest => dest.Id, opt => opt.Ignore())
                .ForMember(dest => dest.Participations, opt => opt.Condition(src => src.Participations != null));

            CreateMap<ChallengeParticipationDto, UserChallengeParticipation>()
                .ForMember(dest => dest.ChallengeId, opt => opt.MapFrom(src => src.ChallengeId))
                .ForMember(dest => dest.UserId, opt => opt.MapFrom(src => src.UserId))
                .ForMember(dest => dest.JoinDate, opt => opt.MapFrom(src => src.JoinDate))
                .ForMember(dest => dest.Progress, opt => opt.MapFrom(src => src.Progress))
                .ForMember(dest => dest.Status, opt => opt.MapFrom(src => src.Status))
                .ForMember(dest => dest.User, opt => opt.Ignore())
                .ForMember(dest => dest.Challenge, opt => opt.Ignore());

            CreateMap<ChallengeCreateParticipationDto, UserChallengeParticipation>()
                .ForMember(dest => dest.ChallengeId, opt => opt.Ignore())
                .ForMember(dest => dest.UserId, opt => opt.MapFrom(src => src.UserId))
                .ForMember(dest => dest.JoinDate, opt => opt.MapFrom(src => src.JoinDate))
                .ForMember(dest => dest.Progress, opt => opt.MapFrom(src => src.Progress))
                .ForMember(dest => dest.Status, opt => opt.MapFrom(src => src.Status))
                .ForMember(dest => dest.User, opt => opt.Ignore())
                .ForMember(dest => dest.Challenge, opt => opt.Ignore());
        }
        private void ConfigureNotificationMappings()
        {
            // Мапінг з Notification до NotificationDto
            CreateMap<Notification, NotificationDto>();

            // Мапінг з CreateNotificationDto до Notification
            CreateMap<CreateNotificationDto, Notification>()
                .ForMember(dest => dest.Id, opt => opt.Ignore()) // Id генерується автоматично
                .ForMember(dest => dest.CreatedAt, opt => opt.MapFrom(_ => DateTime.UtcNow))
                .ForMember(dest => dest.UpdatedAt, opt => opt.Ignore())
                .ForMember(dest => dest.IsRead, opt => opt.MapFrom(_ => false))
                .ForMember(dest => dest.User, opt => opt.Ignore()); // Не мапимо навігаційну властивість

            // Мапінг з UpdateNotificationDto до Notification
            CreateMap<UpdateNotificationDto, Notification>()
                .ForMember(dest => dest.Id, opt => opt.Ignore())
                .ForMember(dest => dest.CreatedAt, opt => opt.Ignore())
                .ForMember(dest => dest.UserId, opt => opt.Ignore())
                .ForMember(dest => dest.User, opt => opt.Ignore())
                .ForMember(dest => dest.Type, opt => opt.Ignore())
                .ForMember(dest => dest.UpdatedAt, opt => opt.MapFrom(_ => DateTime.UtcNow))
                .ForMember(dest => dest.Message, opt => opt.Condition(src => !string.IsNullOrWhiteSpace(src.Message)));
        }

        private void ConfigureMentalHealthRecordMappings()
        {
            CreateMap<MentalHealthRecord, MentalHealthRecordDto>();

            CreateMap<MentalHealthRecordCreateDto, MentalHealthRecord>()
                .ForMember(dest => dest.Id, opt => opt.Ignore()) // Id генерується автоматично
                .ForMember(dest => dest.CreatedAt, opt => opt.MapFrom(_ => DateTime.UtcNow))
                .ForMember(dest => dest.UpdatedAt, opt => opt.Ignore())
                .ForMember(dest => dest.User, opt => opt.Ignore()) // Навігаційне поле
                .ForMember(dest => dest.UserId, opt => opt.MapFrom(src => src.UserId))
                .ForMember(dest => dest.RecordDate, opt => opt.MapFrom(_ => DateTime.UtcNow))
                .ForMember(dest => dest.MeditationDurationMinutes, opt => opt.MapFrom(src => src.MeditationDurationMinutes))
                .ForMember(dest => dest.BreathingPracticeDurationMinutes, opt => opt.MapFrom(src => src.BreathingPracticeDurationMinutes))
                .ForMember(dest => dest.StressLevelScore, opt => opt.MapFrom(src => src.StressLevelScore))
                .ForMember(dest => dest.AnxietyLevelScore, opt => opt.MapFrom(src => src.AnxietyLevelScore))
                .ForMember(dest => dest.Notes, opt => opt.MapFrom(src => src.Notes));

            CreateMap<MentalHealthRecordUpdateDto, MentalHealthRecord>()
                .ForMember(dest => dest.Id, opt => opt.Ignore()) // Id не оновлюється
                .ForMember(dest => dest.UserId, opt => opt.Ignore()) // UserId не оновлюється
                .ForMember(dest => dest.User, opt => opt.Ignore()) // Навігаційне поле
                .ForMember(dest => dest.RecordDate, opt => opt.MapFrom(src => src.RecordDate))
                .ForMember(dest => dest.CreatedAt, opt => opt.Ignore()) // Не оновлюється
                .ForMember(dest => dest.UpdatedAt, opt => opt.MapFrom(_ => DateTime.UtcNow))
                .ForMember(dest => dest.MeditationDurationMinutes, opt => opt.Condition(src => src.MeditationDurationMinutes.HasValue))
                .ForMember(dest => dest.BreathingPracticeDurationMinutes, opt => opt.Condition(src => src.BreathingPracticeDurationMinutes.HasValue))
                .ForMember(dest => dest.StressLevelScore, opt => opt.Condition(src => src.StressLevelScore.HasValue))
                .ForMember(dest => dest.AnxietyLevelScore, opt => opt.Condition(src => src.AnxietyLevelScore.HasValue))
                .ForMember(dest => dest.Notes, opt => opt.Condition(src => src.Notes != null));
        }
        private void ConfigureSleepRecordMappings()
        {
            CreateMap<SleepRecord, SleepRecordDto>();

            CreateMap<SleepRecordCreateDto, SleepRecord>()
                .ForMember(dest => dest.Id, opt => opt.Ignore()) // генерується автоматично
                .ForMember(dest => dest.CreatedAt, opt => opt.MapFrom(_ => DateTime.UtcNow))
                .ForMember(dest => dest.UpdatedAt, opt => opt.Ignore())
                .ForMember(dest => dest.User, opt => opt.Ignore()) // навігаційне поле
                .ForMember(dest => dest.UserId, opt => opt.MapFrom(src => src.UserId))
                .ForMember(dest => dest.SleepDate, opt => opt.MapFrom(src => src.SleepDate))
                .ForMember(dest => dest.BedTime, opt => opt.MapFrom(src => src.BedTime))
                .ForMember(dest => dest.WakeUpTime, opt => opt.MapFrom(src => src.WakeUpTime))
                .ForMember(dest => dest.TotalSleepMinutes, opt => opt.MapFrom(src =>
                    new SleepRecord
                    {
                        BedTime = src.BedTime,
                        WakeUpTime = src.WakeUpTime
                    }.CalculateSleepDuration()))
                .ForMember(dest => dest.SleepQualityScore, opt => opt.MapFrom(src => src.SleepQualityScore))
                .ForMember(dest => dest.SmartAlarmUsed, opt => opt.MapFrom(src => src.SmartAlarmUsed))
                .ForMember(dest => dest.DreamDetails, opt => opt.MapFrom(src => src.DreamDetails));

            CreateMap<SleepRecordUpdateDto, SleepRecord>()
                .ForMember(dest => dest.Id, opt => opt.Ignore())
                .ForMember(dest => dest.UserId, opt => opt.Ignore())
                .ForMember(dest => dest.User, opt => opt.Ignore())
                .ForMember(dest => dest.CreatedAt, opt => opt.Ignore())
                .ForMember(dest => dest.UpdatedAt, opt => opt.MapFrom(_ => DateTime.UtcNow))
                .ForMember(dest => dest.SleepDate, opt => opt.MapFrom(src => src.SleepDate))
                .ForMember(dest => dest.BedTime, opt => opt.MapFrom(src => src.BedTime))
                .ForMember(dest => dest.WakeUpTime, opt => opt.MapFrom(src => src.WakeUpTime))
                .ForMember(dest => dest.SleepQualityScore, opt => opt.MapFrom(src => src.SleepQualityScore))
                .ForMember(dest => dest.SmartAlarmUsed, opt => opt.MapFrom(src => src.SmartAlarmUsed))
                .ForMember(dest => dest.DreamDetails, opt => opt.Condition(src => src.DreamDetails != null))
                .ForMember(dest => dest.TotalSleepMinutes, opt => opt.MapFrom(src =>
                    new SleepRecord
                    {
                        BedTime = src.BedTime,
                        WakeUpTime = src.WakeUpTime
                    }.CalculateSleepDuration()));
        }

        private void ConfigureMealMappings()
        {
            CreateMap<MealEntry, MealDto>();

            CreateMap<CreateMealDto, MealEntry>()
                .ForMember(dest => dest.Id, opt => opt.Ignore())
                .ForMember(dest => dest.CreatedAt, opt => opt.MapFrom(_ => DateTime.UtcNow))
                .ForMember(dest => dest.UpdatedAt, opt => opt.Ignore())
                .ForMember(dest => dest.User, opt => opt.Ignore())
                .ForMember(dest => dest.DietPlan, opt => opt.Ignore())
                .ForMember(dest => dest.Calories, opt => opt.MapFrom(src =>
                    (int)Math.Round(src.ProteinsG * 4 + src.CarbsG * 4 + src.FatsG * 9)));

            CreateMap<UpdateMealDto, MealEntry>()
                .ForMember(dest => dest.Id, opt => opt.Ignore())
                .ForMember(dest => dest.UserId, opt => opt.Ignore())
                .ForMember(dest => dest.User, opt => opt.Ignore())
                .ForMember(dest => dest.DietPlan, opt => opt.Ignore())
                .ForMember(dest => dest.CreatedAt, opt => opt.Ignore())
                .ForMember(dest => dest.UpdatedAt, opt => opt.MapFrom(_ => DateTime.UtcNow))
                .ForMember(dest => dest.Calories, opt => opt.MapFrom(src =>
                    (int)Math.Round((src.ProteinsG ?? 0) * 4 + (src.CarbsG ?? 0) * 4 + (src.FatsG ?? 0) * 9)))
                .ForAllMembers(opts => opts.Condition((src, dest, srcMember) => srcMember != null));
        }

        private void ConfigureDietPlanMappings()
        {
            // Map from DietPlan to DietPlanDto
            CreateMap<DietPlan, DietPlanDto>();

            // Map from CreateDietPlanDto to DietPlan
            CreateMap<CreateDietPlanDto, DietPlan>()
                .ForMember(dest => dest.Id, opt => opt.Ignore()) // Will be generated automatically
                .ForMember(dest => dest.CreatedAt, opt => opt.MapFrom(_ => DateTime.UtcNow))
                .ForMember(dest => dest.UpdatedAt, opt => opt.Ignore())
                .ForMember(dest => dest.Client, opt => opt.Ignore()) // Navigation property
                .ForMember(dest => dest.Dietitian, opt => opt.Ignore()) // Navigation property
                .ForMember(dest => dest.MealEntries, opt => opt.Ignore()) // Navigation property
                .ForMember(dest => dest.ClientId, opt => opt.MapFrom(src => src.ClientId))
                .ForMember(dest => dest.DietitianId, opt => opt.MapFrom(src => src.DietitianId))
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
                .ForMember(dest => dest.Description, opt => opt.MapFrom(src => src.Description))
                .ForMember(dest => dest.DietType, opt => opt.MapFrom(src => src.DietType))
                .ForMember(dest => dest.StartDate, opt => opt.MapFrom(src => src.StartDate))
                .ForMember(dest => dest.EndDate, opt => opt.MapFrom(src => src.EndDate));

            // Map from UpdateDietPlanDto to DietPlan
            CreateMap<UpdateDietPlanDto, DietPlan>()
                .ForMember(dest => dest.Id, opt => opt.Ignore())
                .ForMember(dest => dest.ClientId, opt => opt.Ignore())
                .ForMember(dest => dest.DietitianId, opt => opt.Ignore())
                .ForMember(dest => dest.Client, opt => opt.Ignore())
                .ForMember(dest => dest.Dietitian, opt => opt.Ignore())
                .ForMember(dest => dest.MealEntries, opt => opt.Ignore())
                .ForMember(dest => dest.CreatedAt, opt => opt.Ignore())
                .ForMember(dest => dest.UpdatedAt, opt => opt.MapFrom(_ => DateTime.UtcNow))
                .ForMember(dest => dest.Name, opt => opt.Condition(src => !string.IsNullOrWhiteSpace(src.Name)))
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
                .ForMember(dest => dest.Description, opt => opt.Condition(src => src.Description != null))
                .ForMember(dest => dest.Description, opt => opt.MapFrom(src => src.Description))
                .ForMember(dest => dest.DietType, opt => opt.Condition(src => src.DietType.HasValue))
                .ForMember(dest => dest.DietType, opt => opt.MapFrom(src => src.DietType))
                .ForMember(dest => dest.StartDate, opt => opt.Condition(src => src.StartDate.HasValue))
                .ForMember(dest => dest.StartDate, opt => opt.MapFrom(src => src.StartDate))
                .ForMember(dest => dest.EndDate, opt => opt.Condition(src => src.EndDate.HasValue))
                .ForMember(dest => dest.EndDate, opt => opt.MapFrom(src => src.EndDate));
        }

        private void ConfigureSubscriptionMappings()
        {
            CreateMap<Subscription, SubscriptionDto>();

            CreateMap<SubscriptionCreateDto, Subscription>()
            .ForMember(dest => dest.Status, opt => opt.MapFrom(_ => SubscriptionStatus.Active))
                .ForMember(dest => dest.UserId, opt => opt.MapFrom(src => src.UserId))
                .ForMember(dest => dest.Type, opt => opt.MapFrom(src => src.Type))
                .ForMember(dest => dest.StartDate, opt => opt.MapFrom(_ => DateTime.UtcNow))
                .ForMember(dest => dest.EndDate, opt => opt.MapFrom(src => src.EndDate))
                .ForMember(dest => dest.Price, opt => opt.MapFrom(src => src.Price));

            CreateMap<SubscriptionUpdateDto, Subscription>()
                .ForMember(dest => dest.Id, opt => opt.Ignore())
                .ForMember(dest => dest.User, opt => opt.Ignore())
                .ForMember(dest => dest.CreatedAt, opt => opt.Ignore())
                .ForMember(dest => dest.UpdatedAt, opt => opt.MapFrom(_ => DateTime.UtcNow))
                .ForMember(dest => dest.UserId, opt => opt.Ignore())
                .ForMember(dest => dest.Type, opt => opt.MapFrom(src => src.Type))
                .ForMember(dest => dest.StartDate, opt => opt.MapFrom(src => src.StartDate))
                .ForMember(dest => dest.EndDate, opt => opt.MapFrom(src => src.EndDate))
                .ForMember(dest => dest.Price, opt => opt.MapFrom(src => src.Price))
                .ForMember(dest => dest.Status, opt => opt.MapFrom(src => src.Status));
        }

        #endregion
    }
}