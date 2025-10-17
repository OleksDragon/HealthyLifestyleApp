using HealthyLifestyle.Infrastructure.Data;
using HealthyLifestyle.Infrastructure.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace HealthyLifestyle.Infrastructure.Services
{
    /// <summary>
    /// Сервіс для збереження URL зображень спеціалістів в базу даних після завантаження в MinIO.
    /// </summary>
    public class SpecialistImageStartupDatabaseService
    {
        private readonly ApplicationDbContext _context;
        private readonly ISpecialistImageDatabaseService _databaseService;
        private readonly ILogger<SpecialistImageStartupDatabaseService> _logger;

        // Мапінг українських імен до англійських
        private readonly Dictionary<string, string> _ukrainianToEnglishNames = new()
        {
            ["Маргарита Дронова"] = "Margarita Dronova",
            ["Олексій Соколенко"] = "Oleksiy Sokolenko",
            ["Антоніна Смила"] = "Antonina Smila",
            ["Олександр Медичний"] = "Oleksandr Medychnyi",
            ["Андрій Кач"] = "Andriy Kach",
            ["Олеся Мамкіна"] = "Olesya Mamkina",
            ["Дмитро Делитанович"] = "Dmytro Delytanovych"
        };

        public SpecialistImageStartupDatabaseService(
            ApplicationDbContext context,
            ISpecialistImageDatabaseService databaseService,
            ILogger<SpecialistImageStartupDatabaseService> logger)
        {
            _context = context;
            _databaseService = databaseService;
            _logger = logger;
        }

        /// <summary>
        /// Зберігає URL зображення в базу даних для спеціаліста за ім'ям.
        /// </summary>
        public async Task<bool> SaveImageUrlToDatabaseByName(string specialistName, string imageUrl, string imageType)
        {
            try
            {
                // Find specialist by name in the database
                var specialistId = await FindSpecialistIdByName(specialistName);
                if (specialistId == null)
                {
                    _logger.LogWarning("Спеціаліст не знайдений в базі даних: {SpecialistName}", specialistName);
                    return false;
                }

                // Save image URL to database using the found ID
                var saved = await _databaseService.SaveImageUrlToDatabase(specialistId.Value, imageUrl, imageType);
                if (saved)
                {
                    _logger.LogInformation("URL зображення збережено в БД для {SpecialistName} (ID: {SpecialistId}): {ImageUrl}", 
                        specialistName, specialistId, imageUrl);
                }
                else
                {
                    _logger.LogWarning("Не вдалося зберегти URL зображення в БД для {SpecialistName}", specialistName);
                }

                return saved;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Помилка збереження URL зображення в БД для {SpecialistName}", specialistName);
                return false;
            }
        }

        /// <summary>
        /// Знаходить ID спеціаліста за ім'ям в базі даних.
        /// </summary>
        private async Task<Guid?> FindSpecialistIdByName(string specialistName)
        {
            try
            {
                // Спробувати знайти за вказаним іменем
                var user = await _context.Users
                    .FirstOrDefaultAsync(u => u.FullName == specialistName);

                // Якщо не знайдено і це українське ім'я, спробувати англійське
                if (user == null && _ukrainianToEnglishNames.ContainsKey(specialistName))
                {
                    var englishName = _ukrainianToEnglishNames[specialistName];
                    user = await _context.Users
                        .FirstOrDefaultAsync(u => u.FullName == englishName);
                }
                
                // Якщо не знайдено і це англійське ім'я, спробувати українське
                if (user == null)
                {
                    var ukrainianName = _ukrainianToEnglishNames
                        .FirstOrDefault(kvp => kvp.Value == specialistName).Key;
                    if (ukrainianName != null)
                    {
                        user = await _context.Users
                            .FirstOrDefaultAsync(u => u.FullName == ukrainianName);
                    }
                }

                if (user == null)
                {
                    _logger.LogWarning("Користувач не знайдений за ім'ям: {SpecialistName}", specialistName);
                    return null;
                }

                // Find user's professional qualification with all details
                var qualification = await _context.UserProfessionalQualifications
                    .Include(q => q.TrainerDetails)
                    .Include(q => q.DoctorDetails)
                    .Include(q => q.DietitianDetails)
                    .Include(q => q.PsychologistDetails)
                    .FirstOrDefaultAsync(q => q.UserId == user.Id);

                if (qualification == null)
                {
                    _logger.LogWarning("Професійна кваліфікація не знайдена для користувача: {SpecialistName}", specialistName);
                    return null;
                }

                // Return the ID of the specialist detail entity
                if (qualification.TrainerDetails != null)
                    return qualification.TrainerDetails.Id;
                if (qualification.DoctorDetails != null)
                    return qualification.DoctorDetails.Id;
                if (qualification.DietitianDetails != null)
                    return qualification.DietitianDetails.Id;
                if (qualification.PsychologistDetails != null)
                    return qualification.PsychologistDetails.Id;

                _logger.LogWarning("Деталі спеціаліста не знайдені для користувача: {SpecialistName}", specialistName);
                return null;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Помилка пошуку спеціаліста за ім'ям: {SpecialistName}", specialistName);
                return null;
            }
        }

        /// <summary>
        /// Зберігає URL зображень для всіх спеціалістів після завантаження в MinIO.
        /// </summary>
        public async Task SaveAllSpecialistImageUrlsAsync()
        {
            try
            {
                var specialistImageMapping = new Dictionary<string, List<(string fileName, string imageType)>>
                {
                    ["Margarita Dronova"] = new() { ("card-1.png", "card") },
                    ["Oleksiy Sokolenko"] = new() { ("card-4.png", "card") },
                    ["Antonina Smila"] = new() { ("card-5.png", "card") },
                    ["Oleksandr Medychnyi"] = new() { ("card-3.png", "card") },
                    ["Andriy Kach"] = new() { ("card-6.png", "card") },
                    ["Olesya Mamkina"] = new() { ("card-2.png", "card") },
                    ["Dmytro Delytanovych"] = new() { ("card-6.png", "card") }
                };

                foreach (var specialist in specialistImageMapping)
                {
                    foreach (var (fileName, imageType) in specialist.Value)
                    {
                        try
                        {
                            // Generate the MinIO URL for the image
                            var cleanSpecialistName = specialist.Key.Replace(" ", "_").Replace("'", "").Replace("-", "_").ToLowerInvariant();
                            var fileExtension = Path.GetExtension(fileName);
                            var minioUrl = $"specialistsImages/{cleanSpecialistName}_{imageType}{fileExtension}";

                            // Save to database
                            var saved = await SaveImageUrlToDatabaseByName(specialist.Key, minioUrl, imageType);
                            
                            _logger.LogInformation("Зображення збережено в БД: {Specialist} - {File} - {Url} - DB: {SavedToDb}", 
                                specialist.Key, fileName, minioUrl, saved ? "Yes" : "No");
                        }
                        catch (Exception ex)
                        {
                            _logger.LogError(ex, "Помилка збереження зображення {File} для {Specialist} в БД", fileName, specialist.Key);
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Помилка збереження URL зображень спеціалістів в БД");
            }
        }

        /// <summary>
        /// Зберігає URL зображень для спеціалістів використовуючи українські імена.
        /// </summary>
        public async Task SaveAllSpecialistImageUrlsWithUkrainianNamesAsync()
        {
            try
            {
                var ukrainianSpecialistImageMapping = new Dictionary<string, List<(string fileName, string imageType)>>
                {
                    ["Маргарита Дронова"] = new() { ("card-1.png", "card") },
                    ["Олексій Соколенко"] = new() { ("card-4.png", "card") },
                    ["Антоніна Смила"] = new() { ("card-5.png", "card") },
                    ["Олександр Медичний"] = new() { ("card-3.png", "card") },
                    ["Андрій Кач"] = new() { ("card-6.png", "card") },
                    ["Олеся Мамкіна"] = new() { ("card-2.png", "card") },
                    ["Дмитро Делитанович"] = new() { ("card-6.png", "card") }
                };

                foreach (var specialist in ukrainianSpecialistImageMapping)
                {
                    foreach (var (fileName, imageType) in specialist.Value)
                    {
                        try
                        {
                            // Отримати англійське ім'я для генерації URL
                            var englishName = _ukrainianToEnglishNames.GetValueOrDefault(specialist.Key, specialist.Key);
                            
                            // Generate the MinIO URL using English name
                            var cleanSpecialistName = englishName.Replace(" ", "_").Replace("'", "").Replace("-", "_").ToLowerInvariant();
                            var fileExtension = Path.GetExtension(fileName);
                            var minioUrl = $"images/specialistsImages/{cleanSpecialistName}_{imageType}{fileExtension}";

                            // Save to database using Ukrainian name (will be converted in FindSpecialistIdByName)
                            var saved = await SaveImageUrlToDatabaseByName(specialist.Key, minioUrl, imageType);
                            
                            _logger.LogInformation("Зображення збережено в БД: {Specialist} (UA) - {File} - {Url} - DB: {SavedToDb}", 
                                specialist.Key, fileName, minioUrl, saved ? "Yes" : "No");
                        }
                        catch (Exception ex)
                        {
                            _logger.LogError(ex, "Помилка збереження зображення {File} для {Specialist} в БД", fileName, specialist.Key);
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Помилка збереження URL зображень спеціалістів в БД (українські імена)");
            }
        }
    }
}
