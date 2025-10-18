using DotNetEnv;
using HealthyLifestyle.Api.Middleware;
using HealthyLifestyle.Application.Interfaces;
using HealthyLifestyle.Application.Interfaces.APInfoBlock;
using HealthyLifestyle.Application.Interfaces.Auth;
using HealthyLifestyle.Application.Interfaces.Calendar;
using HealthyLifestyle.Application.Interfaces.Challenge;
using HealthyLifestyle.Application.Interfaces.Consultation;
using HealthyLifestyle.Application.Interfaces.Email;
using HealthyLifestyle.Application.Interfaces.Group;
using HealthyLifestyle.Application.Interfaces.HealthTracker;
using HealthyLifestyle.Application.Interfaces.Location;
using HealthyLifestyle.Application.Interfaces.Notification;
using HealthyLifestyle.Application.Interfaces.ObjectStorage;
using HealthyLifestyle.Application.Interfaces.ProfessionalQualification;
using HealthyLifestyle.Application.Interfaces.Record;
using HealthyLifestyle.Application.Interfaces.Shop;
using HealthyLifestyle.Application.Interfaces.Subscription;
using HealthyLifestyle.Application.Interfaces.User;
using HealthyLifestyle.Application.Interfaces.Workout;
using HealthyLifestyle.Application.Mappings;
using HealthyLifestyle.Application.Services;
using HealthyLifestyle.Application.Services.APInfoBlock;
using HealthyLifestyle.Application.Services.Auth;
using HealthyLifestyle.Application.Services.Calendar;
using HealthyLifestyle.Application.Services.Challenge;
using HealthyLifestyle.Application.Services.ConsultationS;
using HealthyLifestyle.Application.Services.Email;
using HealthyLifestyle.Application.Services.GroupS;
using HealthyLifestyle.Application.Services.HealthTracker;
using HealthyLifestyle.Application.Services.Location;
using HealthyLifestyle.Application.Services.ObjectStorage;
using HealthyLifestyle.Application.Services.Payments;
using HealthyLifestyle.Application.Services.ProfessionalQualification;
using HealthyLifestyle.Application.Services.Record;
using HealthyLifestyle.Application.Services.Shop;
using HealthyLifestyle.Application.Services.SubscriptionS;
using HealthyLifestyle.Application.Services.UserS;
using HealthyLifestyle.Application.Services.WorkoutS;
using HealthyLifestyle.BackgroundServices;
using HealthyLifestyle.Core.Entities;
using HealthyLifestyle.Core.Interfaces;
using HealthyLifestyle.Core.Interfaces.APInfoBlock;
using HealthyLifestyle.Core.Interfaces.Calendar;
using HealthyLifestyle.Core.Interfaces.Challenge;
using HealthyLifestyle.Core.Interfaces.ConsultationIR;
using HealthyLifestyle.Core.Interfaces.GroupIR;
using HealthyLifestyle.Core.Interfaces.HealthTracker;
using HealthyLifestyle.Core.Interfaces.NotificationIR;
using HealthyLifestyle.Core.Interfaces.Record;
using HealthyLifestyle.Core.Interfaces.Shop;
using HealthyLifestyle.Core.Interfaces.SubscriptionIR;
using HealthyLifestyle.Core.Interfaces.WorkoutR;
using HealthyLifestyle.Infrastructure.Data;
using HealthyLifestyle.Infrastructure.Repositories;
using HealthyLifestyle.Infrastructure.Repositories.APInfoBlock;
using HealthyLifestyle.Infrastructure.Repositories.Calendar;
using HealthyLifestyle.Infrastructure.Repositories.Challenge;
using HealthyLifestyle.Infrastructure.Repositories.ConsultationR;
using HealthyLifestyle.Infrastructure.Repositories.GroupR;
using HealthyLifestyle.Infrastructure.Repositories.HealthTracker;
using HealthyLifestyle.Infrastructure.Repositories.NotificationR;
using HealthyLifestyle.Infrastructure.Repositories.Record;
using HealthyLifestyle.Infrastructure.Repositories.Shop;
using HealthyLifestyle.Infrastructure.Repositories.SubscriptionR;
using HealthyLifestyle.Infrastructure.Repositories.WorkoutR;
using HealthyLifestyle.Infrastructure.UnitOfWork;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using StackExchange.Redis;
using System.Text;
using System.Text.Json.Serialization;
using YourProject.Application.Services;


// Створюємо білдер для веб-програми
var builder = WebApplication.CreateBuilder(args);

// Додаємо логування в консоль
builder.Services.AddLogging(configure => configure.AddConsole());

// Завантажуємо .env файл
Env.Load("../../.env");

// --- Реєстрація сервісів у DI контейнері ---

// 1. Налаштування DbContext із підключенням до SQL Server
builder.Services.AddDbContext<ApplicationDbContext>(options =>
{
    var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
    if (string.IsNullOrEmpty(connectionString))
    {
        throw new InvalidOperationException("Connection string 'DefaultConnection' is not configured.");
    }
    options.UseSqlServer(connectionString);
});

// 2. Конфігурація Identity з кастомним User та Role<Guid>
builder.Services.AddIdentity<User, IdentityRole<Guid>>(options =>
{
    // Налаштування політики паролів
    options.Password.RequireDigit = true; // Потрібна наявність хоча б однієї цифри у паролі (0-9)
    options.Password.RequiredLength = 8; // Мінімальна довжина пароля - 8 символів
    options.Password.RequireNonAlphanumeric = false; // Не потрібна наявність спеціальних символів (наприклад, !, @, #)
    options.Password.RequireUppercase = true; // Потрібна наявність хоча б однієї великої літери (A-Z)
    options.Password.RequireLowercase = true; // Потрібна наявність хоча б однієї малої літери (a-z)
    options.Password.RequiredUniqueChars = 1; // Мінімальна кількість унікальних символів у паролі (1 означає, що немає обмежень на повторення символів)

    // Налаштування блокування облікового запису
    options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(5); // Час блокування облікового запису - 5 хвилин після перевищення ліміту невдалих спроб входу
    options.Lockout.MaxFailedAccessAttempts = 5; // Максимальна кількість невдалих спроб входу перед блокуванням – 5
    options.Lockout.AllowedForNewUsers = true; // Дозволити блокування нових користувачів (якщо false, нові користувачі не блокуються)

    // Установки підтвердження під час входу
    options.SignIn.RequireConfirmedAccount = false; // Не потрібно підтвердження облікового запису для входу (наприклад, через email або телефон)
    options.SignIn.RequireConfirmedEmail = false; // Не потрібний підтверджений email для входу
    options.SignIn.RequireConfirmedPhoneNumber = false; // Не потрібний підтверджений номер телефону для входу

    // Обмеження на ім'я користувача
    options.User.AllowedUserNameCharacters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-._@+";
    options.User.RequireUniqueEmail = true;
})
    .AddEntityFrameworkStores<ApplicationDbContext>()
    .AddDefaultTokenProviders();

// 3. Налаштування автентифікації JWT Bearer
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.SaveToken = true;
    options.RequireHttpsMetadata = builder.Environment.IsDevelopment() ? false : true;

    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidAudience = builder.Configuration["Jwt:Audience"],
        ValidIssuer = builder.Configuration["Jwt:Issuer"],
        IssuerSigningKey = new SymmetricSecurityKey(
            Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]
                ?? throw new InvalidOperationException("JWT Secret Key not configured.")))
    };
});

// 4. Реєстрація AutoMapper
builder.Services.AddAutoMapper(typeof(MappingProfile).Assembly);

// 4.1 Реєстрація HttpClientFactory
builder.Services.AddHttpClient();

// 5. Реєстрація сервісів програми
builder.Services.AddSingleton<IConfiguration>(builder.Configuration);
builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IProfessionalQualificationService, ProfessionalQualificationService>();
builder.Services.AddScoped<ITrainerDetailsService, TrainerDetailsService>();
builder.Services.AddScoped<IDietitianDetailsService, DietitianDetailsService>();
builder.Services.AddScoped<IDoctorDetailsService, DoctorDetailsService>();
builder.Services.AddScoped<IPsychologistDetailsService, PsychologistDetailsService>();
builder.Services.AddScoped<IProductService, ProductService>();
builder.Services.AddScoped<IOrderService, OrderService>();
builder.Services.AddScoped<IEmailService, EmailService>();
builder.Services.AddScoped<IConsultationService, ConsultationService>();
builder.Services.AddScoped<IGroupService, GroupService>();
builder.Services.AddScoped<IChallengeService, ChallengeService>();
builder.Services.AddScoped<IChallengeParticipantService, ChallengeParticipantService>();
builder.Services.AddScoped<IMaleHealthTrackerService, MaleHealthTrackerService>();
builder.Services.AddScoped<IFemaleHealthTrackerService, FemaleHealthTrackerService>();
builder.Services.AddScoped<IMentalHealthRecordService, MentalHealthRecordService>();
builder.Services.AddScoped<ISleepRecordService, SleepRecordService>();
builder.Services.AddScoped<IMaleHealthTrackerService, MaleHealthTrackerService>();
builder.Services.AddScoped<IFemaleHealthTrackerService, FemaleHealthTrackerService>();
builder.Services.AddScoped<IGroupService, GroupService>();
builder.Services.AddScoped<IChallengeService, ChallengeService>();
builder.Services.AddScoped<INotificationService, NotificationService>();
builder.Services.AddScoped<IMealService, MealService>();
builder.Services.AddScoped<IDietPlanService, DietPlanService>();
builder.Services.AddScoped<IWorkoutService, WorkoutService>();
builder.Services.AddScoped<ISubscriptionService, SubscriptionService>();
builder.Services.AddScoped<IFitnessActivityService, FitnessActivityService>();
builder.Services.AddScoped<ICalendarService, CalendarService>();
builder.Services.AddScoped<ILocationService, LocationService>();
Console.WriteLine("Используется MinIO.");
builder.Services.AddSingleton<IObjectStorageService, MinioService>();
builder.Services.AddScoped<IAchievementService, AchievementService>();
builder.Services.AddScoped<IPurchaseService, PurchaseService>();
builder.Services.AddScoped<IPaymentService, PaymentService>();

// 6. Реєстрація репозиторію та Unit of Work
builder.Services.AddScoped(typeof(IRepository<>), typeof(Repository<>));
builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();
builder.Services.AddScoped<IProductRepository, ProductRepository>();
builder.Services.AddScoped<IOrderRepository, OrderRepository>();
builder.Services.AddScoped<IConsultationRepository, ConsultationRepository>();
builder.Services.AddScoped<IGroupRepository, GroupRepository>();
builder.Services.AddScoped<IGroupMembershipRepository, GroupMembershipRepository>();
builder.Services.AddScoped<IChallengeRepository, ChallengeRepository>();
builder.Services.AddScoped<IChallengeParticipantRepository, ChallengeParticipantRepository>();
builder.Services.AddScoped<IMaleHealthTrackerRepository, MaleHealthTrackerRepository>();
builder.Services.AddScoped<IFemaleHealthTrackerRepository, FemaleHealthTrackerRepository>();
builder.Services.AddScoped<IMentalHealthRecordRepository, MentalHealthRecordRepository>();
builder.Services.AddScoped<ISleepRecordRepository, SleepRecordRepository>();
builder.Services.AddScoped<INotificationRepository, NotificationRepository>();
builder.Services.AddScoped<IMealRepository, MealRepository>();
builder.Services.AddScoped<IDietPlanRepository, DietPlanRepository>();
builder.Services.AddScoped<IWorkoutRepository, WorkoutRepository>();
builder.Services.AddScoped<IFitnessActivityRepository, FitnessActivityRepository>();
builder.Services.AddScoped<ISubscriptionRepository, SubscriptionRepository>();
builder.Services.AddScoped<IFamilySubscriptionRepository, FamilySubscriptionRepository>();
builder.Services.AddScoped<ICalendarRepository, CalendarRepository>();
builder.Services.Configure<MinioSettings>(builder.Configuration.GetSection("MinIO"));
builder.Services.AddScoped<IAchievementRepository, AchievementRepository>();
builder.Services.AddScoped<IPurchaseRepository, PurchaseRepository>();

// 7. Конфігурація CORS
builder.Services.AddCors(options =>
{
    if (builder.Environment.IsDevelopment())
    {
        options.AddPolicy("AllowAllOrigins", builder =>
        {
            builder.AllowAnyOrigin()
                   .AllowAnyHeader()
                   .AllowAnyMethod();
        });
    }
    else
    {
        options.AddPolicy("AllowSpecificOrigin", builder =>
        {
            builder.WithOrigins("http://localhost:3000") // URL фронтенда
                   .AllowAnyHeader()
                   .AllowAnyMethod()
                   .AllowCredentials();
        });
    }
});

// 8. Configuring Redis Distributed Cache
// We get the connection period to Redis from the configuration
var redisConnectionString = builder.Configuration.GetValue<string>("Redis:ConnectionString") ?? "localhost:6379";

if (string.IsNullOrEmpty(redisConnectionString))
{
    Console.WriteLine("Warning: Redis ConnectionString is not configured. Distributed caching might not work.");
    throw new InvalidOperationException("Redis ConnectionString 'Redis:ConnectionString' is required but not configured. Application cannot start without it.");
}
else
{
    // Register IDistributedCache using StackExchangeRedisCache
    builder.Services.AddStackExchangeRedisCache(options =>
    {
        options.Configuration = redisConnectionString;
        options.InstanceName = "HealthyLifestyle:"; // Prefix for all keys in Redis
    });

    Console.WriteLine($"Redis connected using: {redisConnectionString}");
}

// Настройки Dynamic Rendering
builder.Services.Configure<DynamicRenderingOptions>(
    builder.Configuration.GetSection("DynamicRendering"));


// 9. Додавання контролерів та налаштування JSON серіалізації
builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
        options.JsonSerializerOptions.PropertyNameCaseInsensitive = true;
        options.JsonSerializerOptions.PropertyNamingPolicy = null;
    });

// 10. Додаємо Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new Microsoft.OpenApi.Models.OpenApiInfo
    {
        Title = "HealthyLifestyle.Api",
        Version = "v1"
    });

    c.AddSecurityDefinition("Bearer", new Microsoft.OpenApi.Models.OpenApiSecurityScheme
    {
        Description = @"JWT Authorization header using the Bearer scheme.  
                        Enter 'Bearer' [space] and then your token. Example: 'Bearer 12345abcdef'",
        Name = "Authorization",
        In = Microsoft.OpenApi.Models.ParameterLocation.Header,
        Type = Microsoft.OpenApi.Models.SecuritySchemeType.Http,
        Scheme = "bearer",
        BearerFormat = "JWT"
    });

    c.AddSecurityRequirement(new Microsoft.OpenApi.Models.OpenApiSecurityRequirement
    {
        {
            new Microsoft.OpenApi.Models.OpenApiSecurityScheme
            {
                Reference = new Microsoft.OpenApi.Models.OpenApiReference
                {
                    Type = Microsoft.OpenApi.Models.ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            new string[] {}
        }
    });
});

// Регеструємо фоновий сервіс
builder.Services.AddHostedService<SendNotificationService>();

// --- Створюємо та налаштовуємо конвеєр обробки запитів ---

var app = builder.Build();

// Отримуємо логер після складання програми
var logger = app.Services.GetRequiredService<ILogger<Program>>();

// --- Подключаем middleware ---
app.UseMiddleware<DynamicRenderingMiddleware>();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
else
{
    app.UseHttpsRedirection(); // У продакшені HTTPS-редирект буде включено
}
app.UseCors(builder.Environment.IsDevelopment() ? "AllowAllOrigins" : "AllowSpecificOrigin");
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

// --- Seed даних при старті програми ---
if (app.Environment.IsDevelopment())
{
    using (var scope = app.Services.CreateScope())
    {
        var services = scope.ServiceProvider;
        try
        {
            var userManager = services.GetRequiredService<UserManager<User>>();
            var roleManager = services.GetRequiredService<RoleManager<IdentityRole<Guid>>>();
            var dbContext = services.GetRequiredService<ApplicationDbContext>();

            logger.LogInformation("Waiting for 15 seconds before applying migrations...");
            await Task.Delay(TimeSpan.FromSeconds(15));
            logger.LogInformation("Attempting to apply migrations...");

            // Застосовуємо міграції
            await dbContext.Database.MigrateAsync();
            logger.LogInformation("Migrations applied successfully.");

            // Заповнення початковими даними
            await ApplicationDbContextSeed.SeedDefaultUserAndRolesAsync(userManager, roleManager, dbContext);

            await ApplicationDbContextSeed.SeedChallengesAsync(dbContext, userManager);

            logger.LogInformation("Database seeded successfully.");
        }
        catch (Exception ex)
        {
            var loggerForSeed = services.GetRequiredService<ILogger<Program>>();
            loggerForSeed.LogError(ex, "An error occurred while seeding the database.");
            throw; // Перекидаємо виняток для налагодження
        }
    }
}

app.Run();