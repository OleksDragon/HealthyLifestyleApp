using HealthyLifestyle.Application.DTOs.ImageUpload;
using HealthyLifestyle.Application.Interfaces.ImageUpload;
using HealthyLifestyle.Application.Interfaces.ObjectStorage;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Configuration;

namespace HealthyLifestyle.Application.Services.ImageUpload
{
    /// <summary>
    /// Сервіс для автоматичного завантаження зображень спеціалістів при запуску додатку.
    /// </summary>
    public class SpecialistImageStartupService : ISpecialistImageStartupService
    {
        private readonly IObjectStorageService _objectStorageService;
        private readonly ILogger<SpecialistImageStartupService> _logger;
        private readonly IConfiguration _configuration;

        public SpecialistImageStartupService(
            IObjectStorageService objectStorageService,
            ILogger<SpecialistImageStartupService> logger,
            IConfiguration configuration)
        {
            _objectStorageService = objectStorageService;
            _logger = logger;
            _configuration = configuration;
        }

        /// <summary>
        /// Завантажує всі зображення спеціалістів з Assets папки при запуску додатку.
        /// </summary>
        public async Task InitializeSpecialistImagesAsync()
        {
            try
            {
                _logger.LogInformation("Початок ініціалізації зображень спеціалістів...");

                // Знаходимо шлях до Assets папки
                var assetsPath = FindAssetsPath();
                if (string.IsNullOrEmpty(assetsPath))
                {
                    _logger.LogWarning("Папка Assets не знайдена. Пропускаємо завантаження зображень спеціалістів.");
                    return;
                }

                var specialistsImgPath = Path.Combine(assetsPath, "specialists-img");
                if (!Directory.Exists(specialistsImgPath))
                {
                    _logger.LogWarning("Папка specialists-img не знайдена: {Path}", specialistsImgPath);
                    return;
                }

                // Мапінг спеціалістів до їх зображень (англійські імена для MinIO)
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

                var successCount = 0;
                var errorCount = 0;

                foreach (var specialist in specialistImageMapping)
                {
                    foreach (var (fileName, imageType) in specialist.Value)
                    {
                        try
                        {
                            var filePath = Path.Combine(specialistsImgPath, fileName);
                            if (File.Exists(filePath))
                            {
                                var imageUrl = await UploadSpecialistImageAsync(filePath, specialist.Key, imageType);
                                
                                _logger.LogInformation("Зображення завантажено: {Specialist} - {File} - {Url}", 
                                    specialist.Key, fileName, imageUrl);
                                successCount++;
                            }
                            else
                            {
                                _logger.LogWarning("Файл не знайдено: {FilePath}", filePath);
                                errorCount++;
                            }
                        }
                        catch (Exception ex)
                        {
                            _logger.LogError(ex, "Помилка завантаження зображення {File} для {Specialist}", fileName, specialist.Key);
                            errorCount++;
                        }
                    }
                }

                _logger.LogInformation("Ініціалізація зображень спеціалістів завершена. Успішно: {Success}, Помилок: {Errors}", successCount, errorCount);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Критична помилка під час ініціалізації зображень спеціалістів");
            }
        }

        /// <summary>
        /// Завантажує зображення спеціаліста в MinIO.
        /// </summary>
        private async Task<string> UploadSpecialistImageAsync(string filePath, string specialistName, string imageType)
        {
            var fileInfo = new FileInfo(filePath);
            var fileName = GenerateFileName(specialistName, imageType, fileInfo.Extension);
            
            using var stream = File.OpenRead(filePath);
            var contentType = GetContentType(fileInfo.Extension);
            return await _objectStorageService.UploadFileAsync(stream, fileName, contentType);
        }

        /// <summary>
        /// Знаходить шлях до папки Assets.
        /// </summary>
        private string? FindAssetsPath()
        {
            // Спочатку перевіряємо environment variables
            var envPath = Environment.GetEnvironmentVariable("SPECIALIST_IMAGES_PATH");
            if (!string.IsNullOrEmpty(envPath) && Directory.Exists(envPath))
            {
                _logger.LogInformation("Знайдено шлях з environment variable: {Path}", envPath);
                return envPath;
            }

            // Перевіряємо конфігурацію
            var configPath = _configuration["SpecialistImages:AssetsPath"];
            if (!string.IsNullOrEmpty(configPath) && Directory.Exists(configPath))
            {
                _logger.LogInformation("Знайдено шлях з конфігурації: {Path}", configPath);
                return configPath;
            }

            // Перевіряємо чи запущено в Docker контейнері
            if (IsRunningInDocker())
            {
                // В Docker контейнері Assets папка має бути скопійована в /app/Assets
                var dockerAssetsPath = "/app/Assets";
                if (Directory.Exists(dockerAssetsPath))
                {
                    _logger.LogInformation("✓ Знайдено Assets папку в Docker: {Path}", dockerAssetsPath);
                    return dockerAssetsPath;
                }
            }

            // Список можливих шляхів для пошуку Assets папки
            var possiblePaths = new[]
            {
                // Для Docker/контейнерів - зображення скопійовані в backend
                "/app/Assets",
                "/app/specialists-img",
                "/app/wwwroot/specialists-img",
                
                // Для локальної розробки - зображення в backend проекті
                Path.Combine(Directory.GetCurrentDirectory(), "Assets"),
                Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "specialists-img"),
                Path.Combine(Directory.GetCurrentDirectory(), "specialists-img"),
                
                // Відносно поточної робочої директорії (backend)
                Path.Combine(Directory.GetCurrentDirectory(), "..", "..", "..", "Assets"),
                Path.Combine(Directory.GetCurrentDirectory(), "..", "Assets"),
                
                // Абсолютні шляхи для різних середовищ
                "/app/Assets",
                "/app/../Assets",
                
                // Windows шляхи - конкретний шлях з повідомлення
                @"D:\Diploma\Clone\HealthyLifestyleApp\backend\Assets",
                @"C:\Diploma\Clone\HealthyLifestyleApp\backend\Assets",
                
                // Додаткові варіанти для різних структур проекту
                Path.Combine("D:", "Diploma", "Clone", "HealthyLifestyleApp", "backend", "Assets"),
                Path.Combine("C:", "Diploma", "Clone", "HealthyLifestyleApp", "backend", "Assets")
            };

            _logger.LogInformation("Початок пошуку Assets папки. Поточна директорія: {CurrentDirectory}", Directory.GetCurrentDirectory());
            
            foreach (var path in possiblePaths)
            {
                _logger.LogInformation("Перевіряємо шлях: {Path}", path);
                if (Directory.Exists(path))
                {
                    _logger.LogInformation("✓ Знайдено Assets папку: {Path}", path);
                    return path;
                }
                else
                {
                    _logger.LogDebug("✗ Папка не існує: {Path}", path);
                }
            }

            _logger.LogWarning("Assets папка не знайдена в жодному з можливих шляхів");
            _logger.LogWarning("Перевірені шляхи:");
            foreach (var path in possiblePaths)
            {
                _logger.LogWarning("  - {Path}", path);
            }
            return null;
        }

        /// <summary>
        /// Перевіряє чи запущено в Docker контейнері.
        /// </summary>
        private bool IsRunningInDocker()
        {
            try
            {
                // Перевіряємо наявність файлу .dockerenv
                return System.IO.File.Exists("/.dockerenv");
            }
            catch
            {
                return false;
            }
        }

        /// <summary>
        /// Генерує унікальне ім'я файлу.
        /// </summary>
        private string GenerateFileName(string specialistName, string imageType, string extension)
        {
            // Використовуємо формат: specialist_name_type.extension
            // Приклад: margarita_dronova_card.png
            var cleanSpecialistName = specialistName.Replace(" ", "_").Replace("'", "").Replace("-", "_").ToLowerInvariant();
            return $"images/specialistsImages/{cleanSpecialistName}_{imageType}{extension}";
        }


        /// <summary>
        /// Отримує MIME тип на основі розширення файлу.
        /// </summary>
        private string GetContentType(string extension)
        {
            return extension.ToLowerInvariant() switch
            {
                ".png" => "image/png",
                ".jpg" or ".jpeg" => "image/jpeg",
                _ => "application/octet-stream"
            };
        }


    }
}
