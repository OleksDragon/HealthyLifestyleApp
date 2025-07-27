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


// ������� ������ ��� ���-����������
var builder = WebApplication.CreateBuilder(args);

// ��������� ����������� � �������
builder.Services.AddLogging(configure => configure.AddConsole());

// ��������� .env ����
Env.Load("../../.env"); 


// --- ����������� �������� � DI ���������� ---

// 1. ��������� DbContext � ������������ � SQL Server
builder.Services.AddDbContext<ApplicationDbContext>(options =>
{
    var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
    if (string.IsNullOrEmpty(connectionString))
    {
        throw new InvalidOperationException("Connection string 'DefaultConnection' is not configured.");
    }
    options.UseSqlServer(connectionString);
});

// 2. ������������ Identity � ��������� User � Role<Guid>
builder.Services.AddIdentity<User, IdentityRole<Guid>>(options =>
{
    // ��������� �������� �������
    options.Password.RequireDigit = true; // ��������� ������� ���� �� ����� ����� � ������ (0-9)
    options.Password.RequiredLength = 8; // ����������� ����� ������ � 8 ��������
    options.Password.RequireNonAlphanumeric = false; // �� ��������� ������� ����������� �������� (��������, !, @, #)
    options.Password.RequireUppercase = true; // ��������� ������� ���� �� ����� ��������� ����� (A-Z)
    options.Password.RequireLowercase = true; // ��������� ������� ���� �� ����� �������� ����� (a-z)
    options.Password.RequiredUniqueChars = 1; // ����������� ���������� ���������� �������� � ������ (1 ��������, ��� ��� ����������� �� ���������� ��������)

    // ��������� ���������� ��������
    options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(5); // ����� ���������� �������� � 5 ����� ����� ���������� ������ ��������� ������� �����
    options.Lockout.MaxFailedAccessAttempts = 5; // ������������ ���������� ��������� ������� ����� ����� ����������� � 5
    options.Lockout.AllowedForNewUsers = true; // ��������� ���������� ��� ����� ������������� (���� false, ����� ������������ �� �����������)

    // ��������� ������������� ��� �����
    options.SignIn.RequireConfirmedAccount = false; // �� ��������� ������������� �������� ��� ����� (��������, ����� email ��� �������)
    options.SignIn.RequireConfirmedEmail = false; // �� ��������� ������������� email ��� �����
    options.SignIn.RequireConfirmedPhoneNumber = false; // �� ��������� ������������� ����� �������� ��� �����

    // ����������� �� ��� ������������
    options.User.AllowedUserNameCharacters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-._@+";
    options.User.RequireUniqueEmail = true;
})
    .AddEntityFrameworkStores<ApplicationDbContext>()
    .AddDefaultTokenProviders();

// 3. ��������� �������������� JWT Bearer
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

// 4. ����������� AutoMapper
builder.Services.AddAutoMapper(typeof(MappingProfile).Assembly);

// 5. ����������� �������� ����������
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
builder.Services.AddScoped<IGroupService, GroupService>();

// 6. ����������� ����������� � Unit of Work
builder.Services.AddScoped(typeof(IRepository<>), typeof(Repository<>));
builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();
builder.Services.AddScoped<IProductRepository, ProductRepository>();
builder.Services.AddScoped<IOrderRepository, OrderRepository>();
builder.Services.AddScoped<IConsultationRepository, ConsultationRepository>();
builder.Services.AddScoped<IMaleHealthTrackerRepository, MaleHealthTrackerRepository>();
builder.Services.AddScoped<IGroupRepository, GroupRepository>();
builder.Services.AddScoped<IGroupMembershipRepository, GroupMembershipRepository>();

// 7. ������������ CORS
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
            builder.WithOrigins("http://localhost:3000") // URL ���������
                   .AllowAnyHeader()
                   .AllowAnyMethod()
                   .AllowCredentials();
        });
    }
});

// 8. ���������� ������������ � ��������� JSON ������������
builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
        options.JsonSerializerOptions.PropertyNameCaseInsensitive = true;
        options.JsonSerializerOptions.PropertyNamingPolicy = null;
    });

// 9. ��������� Swagger
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

// --- ������� � ����������� �������� ��������� �������� ---

var app = builder.Build();

// �������� ������ ����� ������ ����������
var logger = app.Services.GetRequiredService<ILogger<Program>>();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
else
{
    app.UseHttpsRedirection(); // � ���������� HTTPS-�������� ����� �������
}
app.UseCors(builder.Environment.IsDevelopment() ? "AllowAllOrigins" : "AllowSpecificOrigin");
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

// --- Seed ������ ��� ������ ���������� ---
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

            // ��������� ��������
            await dbContext.Database.MigrateAsync();
            logger.LogInformation("Migrations applied successfully.");

            // ���������� ���������� �������
            await ApplicationDbContextSeed.SeedDefaultUserAndRolesAsync(userManager, roleManager, dbContext);
            logger.LogInformation("Database seeded successfully.");
        }
        catch (Exception ex)
        {
            var loggerForSeed = services.GetRequiredService<ILogger<Program>>();
            loggerForSeed.LogError(ex, "An error occurred while seeding the database.");
            throw; // ������������� ���������� ��� �������
        }
    }
}

app.Run();