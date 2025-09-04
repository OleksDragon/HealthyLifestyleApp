using HealthyLifestyle.Core.Entities;
using HealthyLifestyle.Core.Enums;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace HealthyLifestyle.Infrastructure.Data
{
    /// <summary>
    /// Статичний клас для ініціалізації бази даних стандартними користувачами, ролями та типами професійних ролей.
    /// </summary>
    public static class ApplicationDbContextSeed
    {
        /// <summary>
        /// Ініціалізує базу даних стандартними користувачами, ролями та деталями професіоналів.
        /// </summary>
        public static async Task SeedDefaultUserAndRolesAsync(
            UserManager<User> userManager,
            RoleManager<IdentityRole<Guid>> roleManager,
            ApplicationDbContext context)
        {
            ArgumentNullException.ThrowIfNull(userManager);
            ArgumentNullException.ThrowIfNull(roleManager);
            ArgumentNullException.ThrowIfNull(context);

            #region Створення стандартних ролей Identity
            string[] identityRoleNames =
            {
                RoleNames.Admin,
                RoleNames.User,
                RoleNames.Psychologist,
                RoleNames.Dietitian,
                RoleNames.Trainer,
                RoleNames.Doctor
            };

            foreach (var roleName in identityRoleNames)
            {
                if (!await roleManager.RoleExistsAsync(roleName))
                {
                    await roleManager.CreateAsync(new IdentityRole<Guid>(roleName));
                }
            }
            #endregion

            #region Створення типів професійних ролей
            await CreateProfessionalRoleTypeAsync(context, RoleNames.Psychologist, "Ліцензований психолог", 80.00m);
            await CreateProfessionalRoleTypeAsync(context, RoleNames.Dietitian, "Сертифікований дієтолог", 75.00m);
            await CreateProfessionalRoleTypeAsync(context, RoleNames.Trainer, "Персональний фітнес-тренер", 60.00m);
            await CreateProfessionalRoleTypeAsync(context, RoleNames.Doctor, "Ліцензований лікар", 100.00m);
            #endregion

            #region Створення користувачів та призначення ролей/деталей
            await CreateUserWithRoleAndDetailsAsync(userManager, roleManager, "admin@example.com", "AdminPassword123!", RoleNames.Admin,
    fullName: "Адмін Користувач",
    biography: "Головний адміністратор платформи.",
    phone: "+380501234567",
    country: "Україна",
    city: "Київ",
    street: "вул. Хрещатик 1");

            await CreateUserWithRoleAndDetailsAsync(userManager, roleManager, "user@example.com", "UserPassword123!", RoleNames.User,
                fullName: "Звичайний Користувач",
                biography: "Звичайний користувач платформи.",
                phone: "+380671234567",
                country: "Україна",
                city: "Львів",
                street: "вул. Свободи 15");

            await CreatePsychologistAsync(userManager, roleManager, context);
            await CreateDietitianAsync(userManager, roleManager, context);
            await CreateTrainerAsync(userManager, roleManager, context);
            await CreateDoctorAsync(userManager, roleManager, context);

            await CreateTrainer1Async(userManager, roleManager, context);
            await CreateTrainer2Async(userManager, roleManager, context);
            await CreateTrainer3Async(userManager, roleManager, context);
            #endregion

            await context.SaveChangesAsync();
        }

        /// <summary>
        /// Створює тип професійної ролі, якщо він ще не існує.
        /// </summary>
        private static async Task CreateProfessionalRoleTypeAsync(
            ApplicationDbContext context, string name, string description, decimal defaultHourlyRate)
        {
            if (!await context.ProfessionalRoleTypes.AnyAsync(prt => prt.Name == name))
            {
                await context.ProfessionalRoleTypes.AddAsync(new ProfessionalRoleType(name, description, defaultHourlyRate));
            }
        }

        /// <summary>
        /// Створює користувача Identity та призначає йому роль.
        /// </summary>
        private static async Task CreateUserWithRoleAndDetailsAsync(
    UserManager<User> userManager,
    RoleManager<IdentityRole<Guid>> roleManager,
    string email,
    string password,
    string roleName,
    string? fullName = null,
    string? biography = null,
    string? phone = null,
    string? country = null,
    string? city = null,
    string? street = null)
{
    ArgumentNullException.ThrowIfNull(userManager);
    ArgumentNullException.ThrowIfNull(roleManager);
    ArgumentNullException.ThrowIfNull(email);
    ArgumentNullException.ThrowIfNull(password);
    ArgumentNullException.ThrowIfNull(roleName);

    if (await userManager.FindByEmailAsync(email) == null)
    {
        // Generate random data for new fields if not provided
        var random = new Random();
        var user = new User
        {
            UserName = email,
            Email = email,
            EmailConfirmed = true,
            FullName = fullName ?? string.Empty,
            Bio = biography,
            Phone = phone ?? GenerateRandomPhone(random),
            Country = country ?? GenerateRandomCountry(random),
            City = city ?? GenerateRandomCity(random),
            Street = street ?? GenerateRandomStreet(random),
            CreatedAt = DateTime.UtcNow
        };

        var result = await userManager.CreateAsync(user, password);
        if (result.Succeeded && await roleManager.RoleExistsAsync(roleName))
        {
            await userManager.AddToRoleAsync(user, roleName);
        }
        else if (!result.Succeeded)
        {
            Console.WriteLine(
                $"Помилка створення користувача {email}: " +
                $"{string.Join(", ", result.Errors.Select(e => e.Description))}");
        }
    }
}

// Helper methods for generating random data
private static string GenerateRandomPhone(Random random)
{
    return $"+380{random.Next(10, 100)}{random.Next(100, 1000)}{random.Next(1000, 10000)}";
}

private static string GenerateRandomCountry(Random random)
{
    string[] countries = { "Україна", "Польща", "Німеччина", "США", "Велика Британія", "Канада", "Франція", "Італія" };
    return countries[random.Next(countries.Length)];
}

private static string GenerateRandomCity(Random random)
{
    string[] cities = { 
        "Київ", "Львів", "Одеса", "Харків", "Дніпро", "Запоріжжя", "Варшава", 
        "Берлін", "Лондон", "Нью-Йорк", "Торонто", "Париж", "Рим", "Мадрид"
    };
    return cities[random.Next(cities.Length)];
}

private static string GenerateRandomStreet(Random random)
{
    string[] streetNames = {
        "вул. Центральна", "вул. Героїв України", "вул. Шевченка", "вул. Франка", 
        "вул. Лесі Українки", "вул. Бандери", "вул. Незалежності", "вул. Свободи",
        "вул. Мазепи", "вул. Сахарова", "вул. Грушевського", "вул. Липова",
        "вул. Дубова", "вул. Яблунева", "вул. Вишнева"
    };
    
    string[] streetTypes = { "вулиця", "проспект", "бульвар", "провулок" };
    string[] prefixes = { "вул. ", "пр. ", "бульв. ", "пров. " };
    
    return $"{prefixes[random.Next(prefixes.Length)]}{streetNames[random.Next(streetNames.Length)]} {random.Next(1, 200)}";
}
        #region Створення професіоналів
        /// <summary>
        /// Створює користувача-психолога, його кваліфікацію та деталі, якщо вони ще не існують.
        /// </summary>
        private static async Task CreatePsychologistAsync(
            UserManager<User> userManager,
            RoleManager<IdentityRole<Guid>> roleManager,
            ApplicationDbContext context)
        {
            var email = "psychologist@example.com";
            await CreateUserWithRoleAndDetailsAsync(userManager, roleManager, email, "Psychologist123!", RoleNames.Psychologist,
                fullName: "Д-р Анна Фройд", biography: "Досвідчений психолог із 10-річним стажем.",
                phone: "+380501112233",
    country: "Австрія",
    city: "Відень",
    street: "вул. Фройда 5");

            var user = await userManager.FindByEmailAsync(email);
            if (user == null) return;

            var psychologistRoleType = await context.ProfessionalRoleTypes.FirstOrDefaultAsync(prt => prt.Name == RoleNames.Psychologist);
            if (psychologistRoleType == null) return;

            var qualification = await context.UserProfessionalQualifications
                .FirstOrDefaultAsync(upq => upq.UserId == user.Id && upq.ProfessionalRoleTypeId == psychologistRoleType.Id);

            if (qualification == null)
            {
                qualification = new UserProfessionalQualification(
                    userId: user.Id,
                    professionalRoleTypeId: psychologistRoleType.Id,
                    description: "Сертифікований психолог із досвідом у когнітивно-поведінковій терапії.",
                    certificatesUrl: "https://example.com/psychologist-certs.pdf",
                    hourlyRate: psychologistRoleType.DefaultHourlyRate ?? 0m
                );
                qualification.UpdateStatus(QualificationStatus.Approved);
                context.UserProfessionalQualifications.Add(qualification);
            }
            else if (qualification.HourlyRate != psychologistRoleType.DefaultHourlyRate || qualification.Status != QualificationStatus.Approved)
            {
                qualification.UpdateHourlyRate(psychologistRoleType.DefaultHourlyRate ?? 0m);
                qualification.UpdateStatus(QualificationStatus.Approved);
            }

            if (context.PsychologistDetails.Local.All(pd => pd.Id != qualification.Id))
            {
                var existingDetails = await context.PsychologistDetails.FindAsync(qualification.Id);
                if (existingDetails == null)
                {
                    var details = new PsychologistDetails(
                        qualificationId: qualification.Id,
                        specializations: new List<string> { "Когнітивно-поведінкова терапія", "Психоаналіз", "Сімейна терапія" },
                        therapyApproaches: new List<string> { "Когнітивно-поведінкова терапія", "Гештальт-терапія" },
                        professionalLicenseNumber: "PSY-12345",
                        biography: user.Bio,
                        contactEmail: user.Email,
                        contactPhone: "+1234567890",
                        website: "https://drfreud.com",
                        yearsOfExperience: 10,
                        certifications: new List<string> { "Сертифікат CBT", "Сертифікат Гештальт-терапії" },
                        availability: "Пн-Пт, 9:00-17:00",
                        clientTestimonials: "Відмінний спеціаліст, дуже допоміг!"
                    );
                    context.PsychologistDetails.Add(details);
                }
            }
        }

        /// <summary>
        /// Створює користувача-дієтолога, його кваліфікацію та деталі, якщо вони ще не існують.
        /// </summary>
        private static async Task CreateDietitianAsync(
            UserManager<User> userManager, RoleManager<IdentityRole<Guid>> roleManager, ApplicationDbContext context)
        {
            var email = "dietitian@example.com";
            await CreateUserWithRoleAndDetailsAsync(userManager, roleManager, email, "Dietitian123!", RoleNames.Dietitian,
                fullName: "Д-р Олена Павлівна", biography: "Досвідчений дієтолог із 8-річним стажем.",
                phone: "+380502223344",
                country: "Україна",
                city: "Київ",
                street: "пр. Перемоги 25");

            var user = await userManager.FindByEmailAsync(email);
            if (user == null) return;

            var dietitianRoleType = await context.ProfessionalRoleTypes.FirstOrDefaultAsync(prt => prt.Name == RoleNames.Dietitian);
            if (dietitianRoleType == null || !dietitianRoleType.DefaultHourlyRate.HasValue) return;

            var qualification = await context.UserProfessionalQualifications
                .FirstOrDefaultAsync(upq => upq.UserId == user.Id && upq.ProfessionalRoleTypeId == dietitianRoleType.Id);

            if (qualification == null)
            {
                qualification = new UserProfessionalQualification(
                    userId: user.Id,
                    professionalRoleTypeId: dietitianRoleType.Id,
                    description: "Сертифікований дієтолог, спеціаліст із спортивного харчування.",
                    certificatesUrl: "https://example.com/dietitian-certs.pdf",
                    hourlyRate: dietitianRoleType.DefaultHourlyRate.Value
                );
                qualification.UpdateStatus(QualificationStatus.Approved);
                context.UserProfessionalQualifications.Add(qualification);
            }
            else if (qualification.HourlyRate != dietitianRoleType.DefaultHourlyRate || qualification.Status != QualificationStatus.Approved)
            {
                qualification.UpdateHourlyRate(dietitianRoleType.DefaultHourlyRate.Value);
                qualification.UpdateStatus(QualificationStatus.Approved);
            }

            if (context.DietitianDetails.Local.All(dd => dd.Id != qualification.Id))
            {
                var existingDetails = await context.DietitianDetails.FindAsync(qualification.Id);
                if (existingDetails == null)
                {
                    var details = new DietitianDetails(
                        qualificationId: qualification.Id,
                        specializations: new List<string> { "Спортивне харчування", "Контроль ваги", "Діабет" },
                        nutritionalApproach: "Індивідуальні плани харчування, гнучка дієта",
                        professionalLicenseNumber: "DIET-67890",
                        biography: user.Bio,
                        contactEmail: user.Email,
                        contactPhone: "+0987654321",
                        website: "https://dietitianelena.com",
                        yearsOfExperience: 8,
                        certifications: new List<string> { "Сертифікат із спортивної дієтології" },
                        availability: "Вт, Чт, Сб, 10:00-18:00",
                        clientTestimonials: "Олена допомогла мені досягти моїх цілей у харчуванні!"
                    );
                    context.DietitianDetails.Add(details);
                }
            }
        }

        /// <summary>
        /// Створює користувача-тренера, його кваліфікацію та деталі, якщо вони ще не існують.
        /// </summary>
        private static async Task CreateTrainerAsync(
            UserManager<User> userManager, RoleManager<IdentityRole<Guid>> roleManager, ApplicationDbContext context)
        {
            var email = "trainer@example.com";
            await CreateUserWithRoleAndDetailsAsync(userManager, roleManager, email, "Trainer123!", RoleNames.Trainer,
                fullName: "Пан Іван Сильний", biography: "Професійний фітнес-тренер із 12-річним стажем.",
                phone: "+380503334455",
                country: "Україна",
                city: "Одеса",
                street: "вул. Дерибасівська 10");

            var user = await userManager.FindByEmailAsync(email);
            if (user == null) return;

            var trainerRoleType = await context.ProfessionalRoleTypes.FirstOrDefaultAsync(prt => prt.Name == RoleNames.Trainer);
            if (trainerRoleType == null || !trainerRoleType.DefaultHourlyRate.HasValue) return;

            var qualification = await context.UserProfessionalQualifications
                .FirstOrDefaultAsync(upq => upq.UserId == user.Id && upq.ProfessionalRoleTypeId == trainerRoleType.Id);

            if (qualification == null)
            {
                qualification = new UserProfessionalQualification(
                    userId: user.Id,
                    professionalRoleTypeId: trainerRoleType.Id,
                    description: "Сертифікований тренер із силових тренувань.",
                    certificatesUrl: "https://example.com/trainer-certs.pdf",
                    hourlyRate: trainerRoleType.DefaultHourlyRate.Value
                );
                qualification.UpdateStatus(QualificationStatus.Approved);
                context.UserProfessionalQualifications.Add(qualification);
            }
            else if (qualification.HourlyRate != trainerRoleType.DefaultHourlyRate || qualification.Status != QualificationStatus.Approved)
            {
                qualification.UpdateHourlyRate(trainerRoleType.DefaultHourlyRate.Value);
                qualification.UpdateStatus(QualificationStatus.Approved);
            }

            if (context.TrainerDetails.Local.All(td => td.Id != qualification.Id))
            {
                var existingDetails = await context.TrainerDetails.FindAsync(qualification.Id);
                if (existingDetails == null)
                {
                    var details = new TrainerDetails(
                        qualificationId: qualification.Id,
                        trainingStyle: new List<string> { "Силові тренування", "Функціональний тренінг" },
                        preferredWorkoutStyles: new List<string> { "HIIT", "Кросфіт", "Бодібілдинг" },
                        biography: user.Bio,
                        contactEmail: user.Email,
                        contactPhone: "+1122334455",
                        website: "https://ivanstrong.com",
                        yearsOfExperience: 12,
                        certifications: new List<string> { "Сертифікат CrossFit Level 1, ACE Certified" },
                        availability: "Пн, Ср, Пт, 7:00-11:00 і 16:00-20:00",
                        clientTestimonials: "Іван допоміг мені набрати м’язову масу та покращити витривалість!"
                    );
                    context.TrainerDetails.Add(details);
                }
            }
        }

        /// <summary>
        /// Створює користувача-тренера 1 (Марина Фітнес), його кваліфікацію та деталі, якщо вони ще не існують.
        /// </summary>
        private static async Task CreateTrainer1Async(
            UserManager<User> userManager, RoleManager<IdentityRole<Guid>> roleManager, ApplicationDbContext context)
        {
            var email = "trainer1@example.com";
            await CreateUserWithRoleAndDetailsAsync(userManager, roleManager, email, "Trainer1pass!", RoleNames.Trainer,
                fullName: "Марина Фітнес", biography: "Спеціалістка з йоги та пілатесу, допомагає з гнучкістю.");

            var user = await userManager.FindByEmailAsync(email);
            if (user == null) return;

            var trainerRoleType = await context.ProfessionalRoleTypes.FirstOrDefaultAsync(prt => prt.Name == RoleNames.Trainer);
            if (trainerRoleType == null || !trainerRoleType.DefaultHourlyRate.HasValue) return;

            var qualification = await context.UserProfessionalQualifications
                .FirstOrDefaultAsync(upq => upq.UserId == user.Id && upq.ProfessionalRoleTypeId == trainerRoleType.Id);

            if (qualification == null)
            {
                qualification = new UserProfessionalQualification(
                    userId: user.Id,
                    professionalRoleTypeId: trainerRoleType.Id,
                    description: "Сертифікований інструктор з йоги та пілатесу.",
                    certificatesUrl: "https://example.com/trainer1-certs.pdf",
                    hourlyRate: trainerRoleType.DefaultHourlyRate.Value
                );
                qualification.UpdateStatus(QualificationStatus.Approved);
                context.UserProfessionalQualifications.Add(qualification);
            }
            else if (qualification.HourlyRate != trainerRoleType.DefaultHourlyRate || qualification.Status != QualificationStatus.Approved)
            {
                qualification.UpdateHourlyRate(trainerRoleType.DefaultHourlyRate.Value);
                qualification.UpdateStatus(QualificationStatus.Approved);
            }

            if (context.TrainerDetails.Local.All(td => td.Id != qualification.Id))
            {
                var existingDetails = await context.TrainerDetails.FindAsync(qualification.Id);
                if (existingDetails == null)
                {
                    var details = new TrainerDetails(
                        qualificationId: qualification.Id,
                        trainingStyle: new List<string> { "Йога", "Пілатес", "Розтяжка" },
                        preferredWorkoutStyles: new List<string> { "Хатха-йога", "Він'яса-йога", "Класичний пілатес" },
                        biography: user.Bio,
                        contactEmail: user.Email,
                        contactPhone: "+380501234567",
                        website: "https://marinayoga.com",
                        yearsOfExperience: 7,
                        certifications: new List<string> { "RYT 200 Yoga Alliance", "Stott Pilates Certified" },
                        availability: "Вт, Чт, Сб, 8:00-12:00",
                        clientTestimonials: "Марина допомогла мені знайти внутрішню гармонію та покращити гнучкість!"
                    );
                    context.TrainerDetails.Add(details);
                }
            }
        }

        /// <summary>
        /// Створює користувача-тренера 2 (Олег Кардіо), його кваліфікацію та деталі, якщо вони ще не існують.
        /// </summary>
        private static async Task CreateTrainer2Async(
            UserManager<User> userManager, RoleManager<IdentityRole<Guid>> roleManager, ApplicationDbContext context)
        {
            var email = "trainer2@example.com";
            await CreateUserWithRoleAndDetailsAsync(userManager, roleManager, email, "Trainer2pass!", RoleNames.Trainer,
                fullName: "Олег Кардіо", biography: "Експерт з кардіотренувань та витривалості.");

            var user = await userManager.FindByEmailAsync(email);
            if (user == null) return;

            var trainerRoleType = await context.ProfessionalRoleTypes.FirstOrDefaultAsync(prt => prt.Name == RoleNames.Trainer);
            if (trainerRoleType == null || !trainerRoleType.DefaultHourlyRate.HasValue) return;

            var qualification = await context.UserProfessionalQualifications
                .FirstOrDefaultAsync(upq => upq.UserId == user.Id && upq.ProfessionalRoleTypeId == trainerRoleType.Id);

            if (qualification == null)
            {
                qualification = new UserProfessionalQualification(
                    userId: user.Id,
                    professionalRoleTypeId: trainerRoleType.Id,
                    description: "Сертифікований тренер з функціонального тренінгу та бігу.",
                    certificatesUrl: "https://example.com/trainer2-certs.pdf",
                    hourlyRate: trainerRoleType.DefaultHourlyRate.Value
                );
                qualification.UpdateStatus(QualificationStatus.Approved);
                context.UserProfessionalQualifications.Add(qualification);
            }
            else if (qualification.HourlyRate != trainerRoleType.DefaultHourlyRate || qualification.Status != QualificationStatus.Approved)
            {
                qualification.UpdateHourlyRate(trainerRoleType.DefaultHourlyRate.Value);
                qualification.UpdateStatus(QualificationStatus.Approved);
            }

            if (context.TrainerDetails.Local.All(td => td.Id != qualification.Id))
            {
                var existingDetails = await context.TrainerDetails.FindAsync(qualification.Id);
                if (existingDetails == null)
                {
                    var details = new TrainerDetails(
                        qualificationId: qualification.Id,
                        trainingStyle: new List<string> { "Кардіотренування", "Біг", "Функціональний тренінг" },
                        preferredWorkoutStyles: new List<string> { "Марафонська підготовка", "Кругові тренування" },
                        biography: user.Bio,
                        contactEmail: user.Email,
                        contactPhone: "+380679876543",
                        website: "https://olegcardio.com",
                        yearsOfExperience: 9,
                        certifications: new List<string> { "NASM Certified Personal Trainer", "USA Track & Field Level 1" },
                        availability: "Пн, Ср, Пт, 17:00-21:00",
                        clientTestimonials: "Олег допоміг мені покращити витривалість та підготуватися до марафону!"
                    );
                    context.TrainerDetails.Add(details);
                }
            }
        }

        /// <summary>
        /// Створює користувача-тренера 3 (Катерина Сила), його кваліфікацію та деталі, якщо вони ще не існують.
        /// </summary>
        private static async Task CreateTrainer3Async(
            UserManager<User> userManager, RoleManager<IdentityRole<Guid>> roleManager, ApplicationDbContext context)
        {
            var email = "trainer3@example.com";
            await CreateUserWithRoleAndDetailsAsync(userManager, roleManager, email, "Trainer3pass!", RoleNames.Trainer,
                fullName: "Катерина Сила", biography: "Тренер з важкої атлетики та бодібілдингу, допомагає набрати м'язову масу.");

            var user = await userManager.FindByEmailAsync(email);
            if (user == null) return;

            var trainerRoleType = await context.ProfessionalRoleTypes.FirstOrDefaultAsync(prt => prt.Name == RoleNames.Trainer);
            if (trainerRoleType == null || !trainerRoleType.DefaultHourlyRate.HasValue) return;

            var qualification = await context.UserProfessionalQualifications
                .FirstOrDefaultAsync(upq => upq.UserId == user.Id && upq.ProfessionalRoleTypeId == trainerRoleType.Id);

            if (qualification == null)
            {
                qualification = new UserProfessionalQualification(
                    userId: user.Id,
                    professionalRoleTypeId: trainerRoleType.Id,
                    description: "Сертифікований тренер з важкої атлетики та функціонального бодібілдингу.",
                    certificatesUrl: "https://example.com/trainer3-certs.pdf",
                    hourlyRate: trainerRoleType.DefaultHourlyRate.Value
                );
                qualification.UpdateStatus(QualificationStatus.Approved);
                context.UserProfessionalQualifications.Add(qualification);
            }
            else if (qualification.HourlyRate != trainerRoleType.DefaultHourlyRate || qualification.Status != QualificationStatus.Approved)
            {
                qualification.UpdateHourlyRate(trainerRoleType.DefaultHourlyRate.Value);
                qualification.UpdateStatus(QualificationStatus.Approved);
            }

            if (context.TrainerDetails.Local.All(td => td.Id != qualification.Id))
            {
                var existingDetails = await context.TrainerDetails.FindAsync(qualification.Id);
                if (existingDetails == null)
                {
                    var details = new TrainerDetails(
                        qualificationId: qualification.Id,
                        trainingStyle: new List<string> { "Важка атлетика", "Бодібілдинг", "Силовий пауерліфтинг" },
                        preferredWorkoutStyles: new List<string> { "Спліт-тренування", "Full-body тренування" },
                        biography: user.Bio,
                        contactEmail: user.Email,
                        contactPhone: "+380991112233",
                        website: "https://katerynapower.com",
                        yearsOfExperience: 6,
                        certifications: new List<string> { "ISSA Certified Personal Trainer", "Certified Strength and Conditioning Specialist" },
                        availability: "Вт, Чт, Сб, 15:00-20:00",
                        clientTestimonials: "Катерина допомогла мені значно збільшити силові показники!"
                    );
                    context.TrainerDetails.Add(details);
                }
            }
        }

        /// <summary>
        /// Створює користувача-лікаря, його кваліфікацію та деталі, якщо вони ще не існують.
        /// </summary>
        private static async Task CreateDoctorAsync(
            UserManager<User> userManager, RoleManager<IdentityRole<Guid>> roleManager, ApplicationDbContext context)
        {
            var email = "doctor@example.com";
            await CreateUserWithRoleAndDetailsAsync(userManager, roleManager, email, "Doctor123!", RoleNames.Doctor,
                fullName: "Д-р Олександр Медичний", biography: "Лікар загальної практики із 15-річним стажем.");

            var user = await userManager.FindByEmailAsync(email);
            if (user == null) return;

            var doctorRoleType = await context.ProfessionalRoleTypes.FirstOrDefaultAsync(prt => prt.Name == RoleNames.Doctor);
            if (doctorRoleType == null || !doctorRoleType.DefaultHourlyRate.HasValue) return;

            var qualification = await context.UserProfessionalQualifications
                .FirstOrDefaultAsync(upq => upq.UserId == user.Id && upq.ProfessionalRoleTypeId == doctorRoleType.Id);

            if (qualification == null)
            {
                qualification = new UserProfessionalQualification(
                    userId: user.Id,
                    professionalRoleTypeId: doctorRoleType.Id,
                    description: "Ліцензований лікар, спеціаліст із профілактичної медицини.",
                    certificatesUrl: "https://example.com/doctor-certs.pdf",
                    hourlyRate: doctorRoleType.DefaultHourlyRate.Value
                );
                qualification.UpdateStatus(QualificationStatus.Approved);
                context.UserProfessionalQualifications.Add(qualification);
            }
            else if (qualification.HourlyRate != doctorRoleType.DefaultHourlyRate || qualification.Status != QualificationStatus.Approved)
            {
                qualification.UpdateHourlyRate(doctorRoleType.DefaultHourlyRate.Value);
                qualification.UpdateStatus(QualificationStatus.Approved);
            }

            if (context.DoctorDetails.Local.All(dd => dd.Id != qualification.Id))
            {
                var existingDetails = await context.DoctorDetails.FindAsync(qualification.Id);
                if (existingDetails == null)
                {
                    var details = new DoctorDetails(
                        qualificationId: qualification.Id,
                        specializations: new List<string> { "Загальна практика", "Профілактична медицина", "Внутрішні хвороби" },
                        professionalLicenseNumber: "MED-0001",
                        clinicAffiliation: "Міська лікарня №1",
                        biography: user.Bio,
                        contactEmail: user.Email,
                        contactPhone: "+9988776655",
                        website: "https://dralex.com",
                        yearsOfExperience: 15,
                        certifications: new List<string> { "Ліцензія лікаря, Сертифікат із сімейної медицини" },
                        availability: "Пн, Ср, Пт, 10:00-14:00 (онлайн)",
                        clientTestimonials: "Дуже уважний і кваліфікований доктор!"
                    );
                    context.DoctorDetails.Add(details);
                }
            }
        }
        #endregion
    }
}