using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using HealthyLifestyle.Core.Entities;

namespace HealthyLifestyle.Infrastructure.Data
{
    /// <summary>
    /// Представляє контекст бази даних для програми HealthyLifestyle, 
    /// розширюючи IdentityDbContext для управління користувачами та ролями.
    /// </summary>
    public class ApplicationDbContext : IdentityDbContext<User, IdentityRole<Guid>, Guid>
    {
        #region Набори даних
        public DbSet<UserProfessionalQualification> UserProfessionalQualifications { get; set; }
        public DbSet<ProfessionalRoleType> ProfessionalRoleTypes { get; set; }
        public DbSet<DietitianDetails> DietitianDetails { get; set; }
        public DbSet<TrainerDetails> TrainerDetails { get; set; }
        public DbSet<DoctorDetails> DoctorDetails { get; set; }
        public DbSet<PsychologistDetails> PsychologistDetails { get; set; }
        public DbSet<Consultation> Consultations { get; set; }
        public DbSet<DietPlan> DietPlans { get; set; }
        public DbSet<MealEntry> MealEntries { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderItem> OrderItems { get; set; }
        public DbSet<ShoppingCart> ShoppingCarts { get; set; }
        public DbSet<ShoppingCartItem> ShoppingCartItems { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Subscription> Subscriptions { get; set; }
        public DbSet<FamilySubscriptionMember> FamilySubscriptionMembers { get; set; }
        public DbSet<Workout> Workouts { get; set; }
        public DbSet<FitnessActivity> FitnessActivities { get; set; }
        public DbSet<Group> Groups { get; set; }
        public DbSet<GroupMembership> GroupMemberships { get; set; }
        public DbSet<SocialChallenge> SocialChallenges { get; set; }
        public DbSet<UserChallengeParticipation> UserChallengeParticipations { get; set; }
        public DbSet<MentalHealthRecord> MentalHealthRecords { get; set; }
        public DbSet<SleepRecord> SleepRecords { get; set; }
        public DbSet<FemaleHealthTracker> FemaleHealthTrackers { get; set; }
        public DbSet<MaleHealthTracker> MaleHealthTrackers { get; set; }
        public DbSet<HealthDashboard> HealthDashboards { get; set; }
        public DbSet<Notification> Notifications { get; set; }
        public DbSet<CalendarEvent> CalendarEvents { get; set; }
        public DbSet<Achievement> Achievements { get; set; }
        public DbSet<Purchase> Purchases { get; set; }

        #endregion

        #region Конструктор
        /// <summary>
        /// Ініціалізує новий екземпляр класу <see cref="ApplicationDbContext"/>.
        /// </summary>
        /// <param name="options">Параметри, які використовуються DbContext.</param>
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {

        }
        #endregion

        #region Конфігурація моделі
        /// <summary>
        /// Налаштовує схему бази даних та зв’язки для сутностей.
        /// </summary>
        /// <param name="modelBuilder">Конструктор моделі для налаштування сутностей.</param>
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<User>().ToTable("AspNetUsers");
            modelBuilder.Entity<IdentityRole<Guid>>().ToTable("AspNetRoles");
            modelBuilder.Entity<IdentityUserRole<Guid>>().ToTable("AspNetUserRoles");
            modelBuilder.Entity<IdentityUserClaim<Guid>>().ToTable("AspNetUserClaims");
            modelBuilder.Entity<IdentityUserLogin<Guid>>().ToTable("AspNetUserLogins");
            modelBuilder.Entity<IdentityRoleClaim<Guid>>().ToTable("AspNetRoleClaims");
            modelBuilder.Entity<IdentityUserToken<Guid>>().ToTable("AspNetUserTokens");

            foreach (var entityType in modelBuilder.Model.GetEntityTypes())
            {
                foreach (var property in entityType.GetProperties())
                {
                    if (property.ClrType == typeof(decimal) || property.ClrType == typeof(decimal?))
                    {
                        property.SetPrecision(18);
                        property.SetScale(2);
                    }
                }
            }

            ConfigureConsultation(modelBuilder);
            ConfigureDietPlan(modelBuilder);
            ConfigureMealEntry(modelBuilder);
            ConfigureProfessionalRoleType(modelBuilder);
            ConfigureUserProfessionalQualification(modelBuilder);
            ConfigureDietitianDetails(modelBuilder);
            ConfigurePsychologistDetails(modelBuilder);
            ConfigureTrainerDetails(modelBuilder);
            ConfigureDoctorDetails(modelBuilder);
            ConfigureProduct(modelBuilder);
            ConfigureOrder(modelBuilder);
            ConfigureOrderItem(modelBuilder);
            ConfigureSubscription(modelBuilder);
            ConfigureFamilySubscriptionMember(modelBuilder);
            ConfigureWorkout(modelBuilder);
            ConfigureFitnessActivity(modelBuilder);
            ConfigureGroup(modelBuilder);
            ConfigureGroupMembership(modelBuilder);
            ConfigureSocialChallenge(modelBuilder);
            ConfigureMentalHealthRecord(modelBuilder);
            ConfigureSleepRecord(modelBuilder);
            ConfigureFemaleHealthTracker(modelBuilder);
            ConfigureMaleHealthTracker(modelBuilder);
            ConfigureHealthDashboard(modelBuilder);
            ConfigureNotification(modelBuilder);
            ConfigureUserChallengeParticipation(modelBuilder);
            ConfigureCalendarEvents(modelBuilder);
            ConfigureAchievement(modelBuilder);
            ConfigurePurchase(modelBuilder);
            ConfigureShoppingCarts(modelBuilder);
            ConfigureShoppingCartItems(modelBuilder);
        }
        #endregion

        #region Утилітарні методи
        /// <summary>
        /// Порівнює два списки рядків на рівність, ігноруючи порядок.
        /// </summary>
        /// <param name="c1">Перший список для порівняння.</param>
        /// <param name="c2">Другий список для порівняння.</param>
        /// <returns>True, якщо списки рівні, інакше false.</returns>
        private static bool AreListsEqual(List<string>? c1, List<string>? c2)
        {
            if (c1 == null) return c2 == null;
            if (c2 == null) return false;
            return c1.OrderBy(x => x).SequenceEqual(c2.OrderBy(x => x));
        }

        /// <summary>
        /// Обчислює хеш-код для списку рядків.
        /// </summary>
        /// <param name="c">Список для обчислення хеш-коду.</param>
        /// <returns>Обчислений хеш-код.</returns>
        private static int ComputeHashCode(List<string>? c)
        {
            if (c == null) return 0;
            return c.Aggregate(0, (a, v) => HashCode.Combine(a, v?.GetHashCode() ?? 0));
        }

        /// <summary>
        /// Створює знімок списку рядків.
        /// </summary>
        /// <param name="c">Список для створення знімка.</param>
        /// <returns>Новий список із тими ж елементами.</returns>
        private static List<string> CreateSnapshot(List<string>? c)
        {
            return c?.ToList() ?? new List<string>();
        }
        #endregion

        #region Конфігурація сутностей
        /// <summary>
        /// Налаштовує сутність Consultation.
        /// </summary>
        /// <param name="modelBuilder">Конструктор моделі для налаштування сутності.</param>
        private void ConfigureConsultation(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Consultation>(entity =>
            {
                entity.Property(c => c.Cost).HasPrecision(18, 2);
                entity.Property(c => c.PlatformCommission).HasPrecision(5, 2);
                entity.HasOne(c => c.ClientUser)
                   .WithMany(u => u.ConsultationsAsClient)
                   .HasForeignKey(c => c.ClientId)
                   .OnDelete(DeleteBehavior.Restrict);
                entity.HasOne(c => c.ProfessionalUser)
                   .WithMany(u => u.ConsultationsAsProfessional)
                   .HasForeignKey(c => c.ProfessionalId)
                   .OnDelete(DeleteBehavior.Restrict);
                entity.HasOne(c => c.ProfessionalQualification)
                   .WithMany()
                   .HasForeignKey(c => c.ProfessionalQualificationId)
                   .OnDelete(DeleteBehavior.Restrict);
            });
        }

        /// <summary>
        /// Налаштовує сутність DietPlan.
        /// </summary>
        /// <param name="modelBuilder">Конструктор моделі для налаштування сутності.</param>
        private void ConfigureDietPlan(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<DietPlan>(entity =>
            {
                entity.HasOne(dp => dp.Client)
                   .WithMany()
                   .HasForeignKey(dp => dp.ClientId)
                   .OnDelete(DeleteBehavior.Restrict);
                entity.HasOne(dp => dp.Dietitian)
                   .WithMany()
                   .HasForeignKey(dp => dp.DietitianId)
                   .OnDelete(DeleteBehavior.SetNull);
            });
        }

        /// <summary>
        /// Налаштовує сутність MealEntry.
        /// </summary>
        /// <param name="modelBuilder">Конструктор моделі для налаштування сутності.</param>
        private void ConfigureMealEntry(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<MealEntry>(entity =>
            {
                entity.Property(m => m.Quantity).HasPrecision(10, 2);
                entity.HasOne(me => me.User)
                   .WithMany(u => u.MealEntries)
                   .HasForeignKey(me => me.UserId)
                   .OnDelete(DeleteBehavior.Cascade);
                entity.HasOne(me => me.DietPlan)
                   .WithMany(dp => dp.MealEntries)
                   .HasForeignKey(me => me.DietPlanId)
                   .OnDelete(DeleteBehavior.SetNull);
                entity.HasOne(me => me.Recipe)
                .WithMany()
                .HasForeignKey(me => me.RecipeId)
                .OnDelete(DeleteBehavior.SetNull);
            });
        }

        /// <summary>
        /// Налаштовує сутність ProfessionalRoleType.
        /// </summary>
        /// <param name="modelBuilder">Конструктор моделі для налаштування сутності.</param>
        private void ConfigureProfessionalRoleType(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ProfessionalRoleType>(entity =>
            {
                entity.Property(prt => prt.DefaultHourlyRate).HasPrecision(10, 2);
                entity.Property(prt => prt.Name).HasConversion<string>();
            });
        }

        /// <summary>
        /// Налаштовує сутність UserProfessionalQualification.
        /// </summary>
        /// <param name="modelBuilder">Конструктор моделі для налаштування сутності.</param>
        private void ConfigureUserProfessionalQualification(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<UserProfessionalQualification>(entity =>
            {
                entity.Property(upq => upq.HourlyRate).HasPrecision(10, 2);
                entity.Property(upq => upq.WorkFormat)
                    .HasConversion(
                        v => v != null ? string.Join(",", v) : string.Empty,
                        v => string.IsNullOrEmpty(v) ? new List<string>() : v.Split(",", StringSplitOptions.RemoveEmptyEntries).ToList(),
                        new Microsoft.EntityFrameworkCore.ChangeTracking.ValueComparer<List<string>>(
                            (c1, c2) => c1.SequenceEqual(c2),
                            c => c.Aggregate(0, (a, v) => HashCode.Combine(a, v != null ? v.GetHashCode() : 0)),
                            c => c.ToList()
                        )
                    );
                entity.HasOne(upq => upq.ProfessionalRoleType)
                   .WithMany(prt => prt.UserProfessionalQualifications)
                   .HasForeignKey(upq => upq.ProfessionalRoleTypeId)
                   .OnDelete(DeleteBehavior.Restrict);
                entity.HasOne(upq => upq.User)
                   .WithMany(u => u.ProfessionalQualifications)
                   .HasForeignKey(upq => upq.UserId)
                   .OnDelete(DeleteBehavior.Cascade);
            });
        }

        /// <summary>
        /// Налаштовує сутність DietitianDetails.
        /// </summary>
        /// <param name="modelBuilder">Конструктор моделі для налаштування сутності.</param>
        private void ConfigureDietitianDetails(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<DietitianDetails>(entity =>
            {
                entity.HasKey(dd => dd.Id);
                entity.Property(dd => dd.HourlyRate).HasPrecision(10, 2);
                entity.Property(dd => dd.Specializations).HasConversion(
                  v => v == null ? string.Empty : string.Join(",", v),
                  v => string.IsNullOrEmpty(v) ? new List<string>() : v.Split(",", StringSplitOptions.RemoveEmptyEntries).ToList(),
                  new ValueComparer<List<string>>(
                    (c1, c2) => AreListsEqual(c1, c2),
                    c => ComputeHashCode(c),
                    c => CreateSnapshot(c)
                  )
                );
                entity.HasOne(dd => dd.UserProfessionalQualification)
                   .WithOne(upq => upq.DietitianDetails)
                   .HasForeignKey<DietitianDetails>(dd => dd.Id)
                   .OnDelete(DeleteBehavior.Cascade);
            });
        }

        /// <summary>
        /// Налаштовує сутність PsychologistDetails.
        /// </summary>
        /// <param name="modelBuilder">Конструктор моделі для налаштування сутності.</param>
        private void ConfigurePsychologistDetails(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<PsychologistDetails>(entity =>
            {
                entity.HasKey(pd => pd.Id);
                entity.Property(pd => pd.Specializations).HasConversion(
                    v => v == null ? string.Empty : string.Join(",", v),
                    v => string.IsNullOrEmpty(v) ? new List<string>() : v.Split(",", StringSplitOptions.RemoveEmptyEntries).ToList(),
                    new ValueComparer<List<string>>(
                        (c1, c2) => AreListsEqual(c1, c2),
                        c => ComputeHashCode(c),
                        c => CreateSnapshot(c))
                    );
                entity.Property(pd => pd.TherapyApproaches).HasConversion(
                  v => v == null ? string.Empty : string.Join(",", v),
                  v => string.IsNullOrEmpty(v) ? new List<string>() : v.Split(",", StringSplitOptions.RemoveEmptyEntries).ToList(),
                  new ValueComparer<List<string>>(
                    (c1, c2) => AreListsEqual(c1, c2),
                    c => ComputeHashCode(c),
                    c => CreateSnapshot(c)
                  )
                );
                entity.HasOne(pd => pd.UserProfessionalQualification)
                   .WithOne(upq => upq.PsychologistDetails)
                   .HasForeignKey<PsychologistDetails>(pd => pd.Id)
                   .OnDelete(DeleteBehavior.Cascade);
            });
        }

        /// <summary>
        /// Налаштовує сутність TrainerDetails.
        /// </summary>
        /// <param name="modelBuilder">Конструктор моделі для налаштування сутності.</param>
        private void ConfigureTrainerDetails(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<TrainerDetails>(entity =>
            {
                entity.HasKey(td => td.Id);
                entity.Property(td => td.HourlyRate).HasPrecision(10, 2);
                entity.Property(td => td.TrainingStyle).HasConversion(
                  v => v == null ? string.Empty : string.Join(",", v),
                  v => string.IsNullOrEmpty(v) ? new List<string>() : v.Split(",", StringSplitOptions.RemoveEmptyEntries).ToList(),
                  new ValueComparer<List<string>>(
                    (c1, c2) => AreListsEqual(c1, c2),
                    c => ComputeHashCode(c),
                    c => CreateSnapshot(c)
                  )
                );
                entity.Property(td => td.PreferredWorkoutStyles).HasConversion(
                  v => v == null ? string.Empty : string.Join(",", v),
                  v => string.IsNullOrEmpty(v) ? new List<string>() : v.Split(",", StringSplitOptions.RemoveEmptyEntries).ToList(),
                  new ValueComparer<List<string>>(
                    (c1, c2) => AreListsEqual(c1, c2),
                    c => ComputeHashCode(c),
                    c => CreateSnapshot(c)
                  )
                );
                entity.HasOne(td => td.UserProfessionalQualification)
                   .WithOne(upq => upq.TrainerDetails)
                   .HasForeignKey<TrainerDetails>(td => td.Id)
                   .OnDelete(DeleteBehavior.Cascade);
            });
        }

        /// <summary>
        /// Налаштовує сутність DoctorDetails.
        /// </summary>
        /// <param name="modelBuilder">Конструктор моделі для налаштування сутності.</param>
        private void ConfigureDoctorDetails(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<DoctorDetails>(entity =>
            {
                entity.HasKey(dd => dd.Id);
                entity.Property(dd => dd.HourlyRate).HasPrecision(10, 2);
                entity.Property(dd => dd.Specializations).HasConversion(
                  v => v == null ? string.Empty : string.Join(",", v),
                  v => string.IsNullOrEmpty(v) ? new List<string>() : v.Split(",", StringSplitOptions.RemoveEmptyEntries).ToList(),
                  new ValueComparer<List<string>>(
                    (c1, c2) => AreListsEqual(c1, c2),
                    c => ComputeHashCode(c),
                    c => CreateSnapshot(c)
                  )
                );
                entity.HasOne(dd => dd.UserProfessionalQualification)
                   .WithOne(upq => upq.DoctorDetails)
                   .HasForeignKey<DoctorDetails>(dd => dd.Id)
                   .OnDelete(DeleteBehavior.Cascade);
            });
        }

        /// <summary>
        /// Налаштовує сутність Product.
        /// </summary>
        /// <param name="modelBuilder">Конструктор моделі для налаштування сутності.</param>
        private void ConfigureProduct(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Product>(entity =>
            {
                entity.Property(p => p.Price).HasPrecision(18, 2);
                entity.Property(p => p.PlatformCommissionPercentage).HasPrecision(5, 2);
                entity.Property(p => p.Category).HasConversion<string>();
            });
        }

        /// <summary>
        /// Налаштовує сутність Order.
        /// </summary>
        /// <param name="modelBuilder">Конструктор моделі для налаштування сутності.</param>
        private void ConfigureOrder(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Order>(entity =>
            {
                entity.Property(o => o.TotalAmount).HasPrecision(18, 2);
                entity.Property(o => o.Status).HasConversion<string>();
                entity.HasOne(o => o.User)
                   .WithMany(u => u.Orders)
                   .HasForeignKey(o => o.UserId)
                   .OnDelete(DeleteBehavior.Cascade);
            });
        }

        /// <summary>
        /// Налаштовує сутність OrderItem.
        /// </summary>
        /// <param name="modelBuilder">Конструктор моделі для налаштування сутності.</param>
        private void ConfigureOrderItem(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<OrderItem>(entity =>
            {
                entity.Property(oi => oi.PriceAtPurchase).HasPrecision(18, 2);
                entity.HasOne(oi => oi.Order)
                   .WithMany(o => o.OrderItems)
                   .HasForeignKey(oi => oi.OrderId)
                   .OnDelete(DeleteBehavior.Cascade);
                entity.HasOne(oi => oi.Product)
                   .WithMany(p => p.OrderItems)
                   .HasForeignKey(oi => oi.ProductId)
                   .OnDelete(DeleteBehavior.Restrict);
            });
        }

        /// <summary>
        /// Налаштовує сутність Subscription.
        /// </summary>
        /// <param name="modelBuilder">Конструктор моделі для налаштування сутності.</param>
        private void ConfigureSubscription(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Subscription>(entity =>
            {
                entity.Property(s => s.Price).HasPrecision(18, 2);
                entity.Property(s => s.Type).HasConversion<string>();
                entity.Property(s => s.Status).HasConversion<string>();

                entity.HasOne(s => s.User)
                    .WithMany(u => u.Subscriptions)
                    .HasForeignKey(s => s.UserId)
                    .OnDelete(DeleteBehavior.Cascade);

                entity.HasMany(s => s.FamilyMembers)
                    .WithOne(fm => fm.Subscription)
                    .HasForeignKey(fm => fm.SubscriptionId)
                    .OnDelete(DeleteBehavior.Cascade);
            });
        }

        private void ConfigureFamilySubscriptionMember(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<FamilySubscriptionMember>(entity =>
            {
                entity.HasKey(fm => new { fm.SubscriptionId, fm.MemberId });

                entity.HasOne(fm => fm.Subscription)
                    .WithMany(s => s.FamilyMembers)
                    .HasForeignKey(fm => fm.SubscriptionId)
                    .OnDelete(DeleteBehavior.Cascade);

                entity.HasOne(fm => fm.Member)
                    .WithMany(u => u.FamilyMemberships)
                    .HasForeignKey(fm => fm.MemberId)
                    .OnDelete(DeleteBehavior.Restrict);
            });
        }

        /// <summary>
        /// Налаштовує сутність Workout.
        /// </summary>
        /// <param name="modelBuilder">Конструктор моделі для налаштування сутності.</param>
        private void ConfigureWorkout(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Workout>(entity =>
            {
                entity.Property(w => w.Type).HasConversion<string>();
                entity.Property(w => w.DifficultyLevel).HasConversion<string>();
            });
        }

        /// <summary>
        /// Налаштовує сутність FitnessActivity.
        /// </summary>
        /// <param name="modelBuilder">Конструктор моделі для налаштування сутності.</param>
        private void ConfigureFitnessActivity(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<FitnessActivity>(entity =>
            {
                entity.HasOne(fa => fa.User)
                   .WithMany(u => u.FitnessActivities)
                   .HasForeignKey(fa => fa.UserId)
                   .OnDelete(DeleteBehavior.Cascade);
                entity.HasOne(fa => fa.Workout)
                   .WithMany(w => w.FitnessActivities)
                   .HasForeignKey(fa => fa.WorkoutId)
                   .OnDelete(DeleteBehavior.SetNull);
            });
        }

        /// <summary>
        /// Налаштовує сутність Group.
        /// </summary>
        /// <param name="modelBuilder">Конструктор моделі для налаштування сутності.</param>
        private void ConfigureGroup(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Group>(entity =>
            {
                entity.HasOne(g => g.Creator)
                   .WithMany(u => u.CreatedGroups)
                   .HasForeignKey(g => g.CreatorId)
                   .OnDelete(DeleteBehavior.Cascade);
            });
        }

        /// <summary>
        /// Налаштовує сутність GroupMembership.
        /// </summary>
        /// <param name="modelBuilder">Конструктор моделі для налаштування сутності.</param>
        private void ConfigureGroupMembership(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<GroupMembership>(entity =>
            {
                entity.HasOne(gm => gm.User)
                   .WithMany(u => u.GroupMemberships)
                   .HasForeignKey(gm => gm.UserId)
                   .OnDelete(DeleteBehavior.Cascade);
                entity.HasOne(gm => gm.Group)
                   .WithMany(g => g.GroupMemberships)
                   .HasForeignKey(gm => gm.GroupId)
                   .OnDelete(DeleteBehavior.Restrict);
                entity.Property(gm => gm.Role).HasConversion<string>();
            });
        }

        /// <summary>
        /// Налаштовує сутність SocialChallenge.
        /// </summary>
        /// <param name="modelBuilder">Конструктор моделі для налаштування сутності.</param>
        private void ConfigureSocialChallenge(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<SocialChallenge>(entity =>
            {
                entity.HasOne(sc => sc.Creator)
                   .WithMany()
                   .HasForeignKey(sc => sc.CreatorId)
                   .OnDelete(DeleteBehavior.Restrict);
                entity.Property(sc => sc.Type).HasConversion<string>();
            });
        }

        /// <summary>
        /// Налаштовує сутність UserChallengeParticipation.
        /// </summary>
        /// <param name="modelBuilder">Конструктор моделі для налаштування сутності.</param>
        private void ConfigureUserChallengeParticipation(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<UserChallengeParticipation>(entity =>
            {
                entity.HasOne(gm => gm.User)
                   .WithMany(u => u.ChallengeParticipations)
                   .HasForeignKey(gm => gm.UserId)
                   .OnDelete(DeleteBehavior.Cascade);
                entity.HasOne(gm => gm.Challenge)
                   .WithMany(g => g.Participations)
                   .HasForeignKey(gm => gm.ChallengeId)
                   .OnDelete(DeleteBehavior.Restrict);
                entity.Property(gm => gm.Status).HasConversion<string>();
            });
        }

        /// <summary>
        /// Налаштовує сутність MentalHealthRecord.
        /// </summary>
        /// <param name="modelBuilder">Конструктор моделі для налаштування сутності.</param>
        private void ConfigureMentalHealthRecord(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<MentalHealthRecord>(entity =>
            {
                entity.HasOne(mhr => mhr.User)
                   .WithMany(u => u.MentalHealthRecords)
                   .HasForeignKey(mhr => mhr.UserId)
                   .OnDelete(DeleteBehavior.Cascade);
            });
        }


        /// <summary>
        /// Налаштовує сутність SleepRecord.
        /// </summary>
        /// <param name="modelBuilder">Конструктор моделі для налаштування сутності.</param>
        private void ConfigureSleepRecord(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<SleepRecord>(entity =>
            {
                entity.HasOne(sr => sr.User)
                   .WithMany(u => u.SleepRecords)
                   .HasForeignKey(sr => sr.UserId)
                   .OnDelete(DeleteBehavior.Cascade);
            });
        }

        /// <summary>
        /// Налаштовує сутність FemaleHealthTracker.
        /// </summary>
        /// <param name="modelBuilder">Конструктор моделі для налаштування сутності.</param>
        private void ConfigureFemaleHealthTracker(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<FemaleHealthTracker>(entity =>
            {
                entity.HasKey(fht => fht.UserId);
                entity.HasOne(fht => fht.User)
                   .WithOne(u => u.FemaleHealthTracker)
                   .HasForeignKey<FemaleHealthTracker>(fht => fht.UserId)
                   .OnDelete(DeleteBehavior.Cascade);
                entity.Property(fht => fht.BleedingLevel).HasConversion<string>();
                entity.Property(fht => fht.PmsSymptoms).HasConversion(
                  v => v == null ? string.Empty : string.Join(",", v),
                  v => string.IsNullOrEmpty(v) ? new List<string>() : v.Split(",", StringSplitOptions.RemoveEmptyEntries).ToList(),
                  new ValueComparer<List<string>>(
                    (c1, c2) => AreListsEqual(c1, c2),
                    c => ComputeHashCode(c),
                    c => CreateSnapshot(c)
                  )
                );
            });
        }

        /// <summary>
        /// Налаштовує сутність MaleHealthTracker.
        /// </summary>
        /// <param name="modelBuilder">Конструктор моделі для налаштування сутності.</param>
        private void ConfigureMaleHealthTracker(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<MaleHealthTracker>(entity =>
            {
                entity.HasKey(mht => mht.UserId);
                entity.HasOne(mht => mht.User)
                   .WithOne(u => u.MaleHealthTracker)
                   .HasForeignKey<MaleHealthTracker>(mht => mht.UserId)
                   .OnDelete(DeleteBehavior.Cascade);
            });
        }

        /// <summary>
        /// Налаштовує сутність HealthDashboard.
        /// </summary>
        /// <param name="modelBuilder">Конструктор моделі для налаштування сутності.</param>
        private void ConfigureHealthDashboard(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<HealthDashboard>(entity =>
            {
                entity.HasKey(hd => hd.UserId);
                entity.HasOne(hd => hd.User)
                   .WithOne(u => u.HealthDashboard)
                   .HasForeignKey<HealthDashboard>(hd => hd.UserId)
                   .OnDelete(DeleteBehavior.Cascade);
            });
        }

        /// <summary>
        /// Налаштовує сутність Notification.
        /// </summary>
        /// <param name="modelBuilder">Конструктор моделі для налаштування сутності.</param>
        private void ConfigureNotification(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Notification>(entity =>
            {
                entity.HasOne(n => n.User)
                   .WithMany(u => u.Notifications)
                   .HasForeignKey(n => n.UserId)
                   .OnDelete(DeleteBehavior.Cascade);
                entity.Property(n => n.Type).HasConversion<string>();
            });
        }

        /// <summary>
        /// Налаштовує спільну конфігурацію для RoleSpecificDetail.
        /// </summary>
        /// <param name="modelBuilder">Конструктор моделі для налаштування сутності.</param>
        private void ConfigureRoleSpecificDetail(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<RoleSpecificDetail>(entity =>
            {
                entity.Property(rsd => rsd.HourlyRate).HasPrecision(10, 2);
            });
        }

        /// <summary>
        /// Налаштовує спільну конфігурацію для CalendarEvent.
        /// </summary>
        /// <param name="modelBuilder">Конструктор моделі для налаштування сутності.</param>
        private void ConfigureCalendarEvents(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<CalendarEvent>(entity =>
            {
                entity.HasOne(ce => ce.Workout)
                    .WithMany()
                    .HasForeignKey("WorkoutId")
                    .OnDelete(DeleteBehavior.SetNull);
                entity.HasMany(ce => ce.MeetingParticipants)
                    .WithMany();
            });
        }

        /// <summary>
        /// Налаштовує спільну конфігурацію для ShoppingCart.
        /// </summary>
        /// <param name="modelBuilder">Конструктор моделі для налаштування сутності.</param>
        private void ConfigureShoppingCarts(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ShoppingCart>(entity =>
            {
                entity.HasOne(sc => sc.User)
                    .WithMany()
                    .HasForeignKey(sc => sc.UserId)
                    .OnDelete(DeleteBehavior.Cascade);

                entity.HasIndex(sc => sc.UserId)
                    .IsUnique();
            });
        }

        /// <summary>
        /// Налаштовує спільну конфігурацію для ShoppingCartItem.
        /// </summary>
        /// <param name="modelBuilder">Конструктор моделі для налаштування сутності.</param>
        private void ConfigureShoppingCartItems(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ShoppingCartItem>(entity =>
            {
                entity.HasOne(oi => oi.ShoppingCart)
                   .WithMany(o => o.CartItems)
                   .HasForeignKey(oi => oi.ShoppingCartId)
                   .OnDelete(DeleteBehavior.Cascade);
                entity.HasOne(oi => oi.Product)
                    .WithMany()
                    .HasForeignKey(oi => oi.ProductId)
                    .OnDelete(DeleteBehavior.Cascade);
            });
        }

        /// <summary>
        /// Додаємо конфігурацію сутності Achievement
        /// </summary>
        /// <param name="modelBuilder">Конструктор моделі для налаштування сутності.</param>
        private void ConfigureAchievement(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Achievement>(entity =>
            {
                entity.Property(a => a.Icon).HasConversion<string>();
                entity.HasOne(a => a.User)
                      .WithMany(u => u.Achievements)
                      .HasForeignKey(a => a.UserId)
                      .OnDelete(DeleteBehavior.Cascade);
            });
        }

        /// <summary>
        /// Додаємо конфігурацію сутності Purchase
        /// </summary>
        /// <param name="modelBuilder">Конструктор моделі для налаштування сутності.</param>
        private void ConfigurePurchase(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Purchase>(entity =>
            {
                entity.Property(p => p.Icon).HasConversion<string>();
                entity.Property(p => p.Amount).HasPrecision(18, 2);
                entity.HasOne(p => p.User)
                      .WithMany(u => u.Purchases)
                      .HasForeignKey(p => p.UserId)
                      .OnDelete(DeleteBehavior.Cascade);
            });
        }

        #endregion
    }
}