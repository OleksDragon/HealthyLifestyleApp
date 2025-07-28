using DotNetEnv;
using HealthyLifestyle.Application.Interfaces;
using HealthyLifestyle.Application.Mappings;
using HealthyLifestyle.Application.Services;
using HealthyLifestyle.Application.Services.Shop;
using HealthyLifestyle.Application.Services.Tracker;
using HealthyLifestyle.Application.Services.Working;
using HealthyLifestyle.Core.Entities;
using HealthyLifestyle.Core.Interfaces;
using HealthyLifestyle.Infrastructure.Data;
using HealthyLifestyle.Infrastructure.Repositories;
using HealthyLifestyle.Infrastructure.UnitOfWork;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
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

// 5. Реєстрація сервісів програми
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
builder.Services.AddScoped<IMaleHealthTrackerService, MaleHealthTrackerService>();
builder.Services.AddScoped<IFemaleHealthTrackerService, FemaleHealthTrackerService>();

builder.Services.AddScoped<IGroupService, GroupService>();
builder.Services.AddScoped<IChallengeService, ChallengeService>();

builder.Services.AddScoped<INotificationService, NotificationService>();


// 6. Реєстрація репозиторію та Unit of Work
builder.Services.AddScoped(typeof(IRepository<>), typeof(Repository<>));
builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();
builder.Services.AddScoped<IProductRepository, ProductRepository>();
builder.Services.AddScoped<IOrderRepository, OrderRepository>();
builder.Services.AddScoped<IConsultationRepository, ConsultationRepository>();
builder.Services.AddScoped<IMaleHealthTrackerRepository, MaleHealthTrackerRepository>();
builder.Services.AddScoped<IFemaleHealthTrackerRepository, FemaleHealthTrackerRepository>();
builder.Services.AddScoped<IGroupRepository, GroupRepository>();
builder.Services.AddScoped<IGroupMembershipRepository, GroupMembershipRepository>();

builder.Services.AddScoped<IChallengeRepository, ChallengeRepository>();
builder.Services.AddScoped<IChallengeParticipantRepository, ChallengeParticipantRepository>();


builder.Services.AddScoped<IFemaleHealthTrackerRepository, FemaleHealthTrackerRepository>();
builder.Services.AddScoped<INotificationRepository, NotificationRepository>();


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

// 8. Додавання контролерів та налаштування JSON серіалізації
builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
        options.JsonSerializerOptions.PropertyNameCaseInsensitive = true;
        options.JsonSerializerOptions.PropertyNamingPolicy = null;
    });

// 9. Додаємо Swagger
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

// --- Створюємо та налаштовуємо конвеєр обробки запитів ---

var app = builder.Build();

// Отримуємо логер після складання програми
var logger = app.Services.GetRequiredService<ILogger<Program>>();

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

            logger.LogInformation("Waiting for 5 seconds before applying migrations...");
            await Task.Delay(TimeSpan.FromSeconds(5));
            logger.LogInformation("Attempting to apply migrations...");

            // Застосовуємо міграції
            await dbContext.Database.MigrateAsync();
            logger.LogInformation("Migrations applied successfully.");

            // Заповнення початковими даними
            await ApplicationDbContextSeed.SeedDefaultUserAndRolesAsync(userManager, roleManager, dbContext);
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