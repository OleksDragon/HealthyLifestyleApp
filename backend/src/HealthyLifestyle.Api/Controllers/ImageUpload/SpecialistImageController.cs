using HealthyLifestyle.Application.DTOs.ImageUpload;
using HealthyLifestyle.Application.Services.ImageUpload;
using HealthyLifestyle.Application.Interfaces.ImageUpload;
using HealthyLifestyle.Application.Interfaces.ObjectStorage;
using HealthyLifestyle.Application.Services.ObjectStorage;
using HealthyLifestyle.Infrastructure.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;
using System.Net.Sockets;

namespace HealthyLifestyle.Api.Controllers.ImageUpload
{
    /// <summary>
    /// Контролер для завантаження зображень спеціалістів.
    /// </summary>
    [ApiController]
    [Route("api/[controller]")]
    public class SpecialistImageController : ControllerBase
    {
        private readonly SpecialistImageService _specialistImageService;
        private readonly ISpecialistImageDatabaseService _databaseService;
        private readonly ILogger<SpecialistImageController> _logger;

        public SpecialistImageController(
            SpecialistImageService specialistImageService,
            ISpecialistImageDatabaseService databaseService,
            ILogger<SpecialistImageController> logger)
        {
            _specialistImageService = specialistImageService;
            _databaseService = databaseService;
            _logger = logger;
        }

        /// <summary>
        /// Завантажує зображення спеціаліста.
        /// </summary>
        /// <param name="file">Файл зображення.</param>
        /// <param name="specialistName">Ім'я спеціаліста.</param>
        /// <param name="imageType">Тип зображення (card, big-card, etc.).</param>
        /// <returns>URL завантаженого зображення.</returns>
        [HttpPost("upload")]
        [Authorize]
        [ProducesResponseType(typeof(SpecialistImageUploadResponseDto), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> UploadSpecialistImage(
            IFormFile file,
            [FromForm] string specialistName,
            [FromForm] string imageType = "card")
        {
            try
            {
                if (file == null || file.Length == 0)
                {
                    return BadRequest(new { message = "Файл не може бути порожнім" });
                }

                if (string.IsNullOrWhiteSpace(specialistName))
                {
                    return BadRequest(new { message = "Ім'я спеціаліста є обов'язковим" });
                }

                var result = await _specialistImageService.UploadSpecialistImageAsync(file, specialistName, imageType);
                return Ok(result);
            }
            catch (ArgumentException ex)
            {
                _logger.LogWarning(ex, "Невірні параметри для завантаження зображення");
                return BadRequest(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Помилка завантаження зображення спеціаліста");
                return StatusCode(500, new { message = "Внутрішня помилка сервера" });
            }
        }

        /// <summary>
        /// Завантажує кілька зображень спеціалістів.
        /// </summary>
        /// <param name="files">Список файлів.</param>
        /// <param name="specialistImages">JSON з даними про зображення.</param>
        /// <returns>Результат масового завантаження.</returns>
        [HttpPost("upload-multiple")]
        [Authorize]
        [ProducesResponseType(typeof(BulkSpecialistImageUploadResponseDto), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> UploadMultipleSpecialistImages(
            List<IFormFile> files,
            [FromForm] string specialistImages)
        {
            try
            {
                if (files == null || !files.Any())
                {
                    return BadRequest(new { message = "Список файлів не може бути порожнім" });
                }

                List<SpecialistImageUploadDto> specialistImagesList;
                try
                {
                    specialistImagesList = System.Text.Json.JsonSerializer.Deserialize<List<SpecialistImageUploadDto>>(specialistImages) 
                        ?? new List<SpecialistImageUploadDto>();
                }
                catch (JsonException)
                {
                    return BadRequest(new { message = "Невірний формат JSON для даних спеціалістів" });
                }

                if (files.Count != specialistImagesList.Count)
                {
                    return BadRequest(new { message = "Кількість файлів не відповідає кількості записів про спеціалістів" });
                }

                var result = await _specialistImageService.UploadMultipleSpecialistImagesAsync(files, specialistImagesList);
                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Помилка масового завантаження зображень спеціалістів");
                return StatusCode(500, new { message = "Внутрішня помилка сервера" });
            }
        }

        /// <summary>
        /// Завантажує зображення з локальної папки frontend.
        /// </summary>
        /// <param name="frontendImagePath">Шлях до зображення в frontend.</param>
        /// <param name="specialistName">Ім'я спеціаліста.</param>
        /// <param name="imageType">Тип зображення.</param>
        /// <returns>URL завантаженого зображення.</returns>
        [HttpPost("upload-from-frontend")]
        [Authorize]
        [ProducesResponseType(typeof(SpecialistImageUploadResponseDto), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> UploadFromFrontendPath(
            [FromForm] string frontendImagePath,
            [FromForm] string specialistName,
            [FromForm] string imageType = "card")
        {
            try
            {
                if (string.IsNullOrWhiteSpace(frontendImagePath))
                {
                    return BadRequest(new { message = "Шлях до файлу є обов'язковим" });
                }

                if (string.IsNullOrWhiteSpace(specialistName))
                {
                    return BadRequest(new { message = "Ім'я спеціаліста є обов'язковим" });
                }

                var result = await _specialistImageService.UploadFromFrontendPathAsync(frontendImagePath, specialistName, imageType);
                return Ok(result);
            }
            catch (FileNotFoundException ex)
            {
                _logger.LogWarning(ex, "Файл не знайдено: {FilePath}", frontendImagePath);
                return NotFound(new { message = ex.Message });
            }
            catch (ArgumentException ex)
            {
                _logger.LogWarning(ex, "Невірні параметри для завантаження зображення");
                return BadRequest(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Помилка завантаження зображення з frontend");
                return StatusCode(500, new { message = "Внутрішня помилка сервера" });
            }
        }

        /// <summary>
        /// Завантажує всі зображення спеціалістів з frontend папки.
        /// </summary>
        /// <param name="frontendAssetsPath">Шлях до папки assets у frontend.</param>
        /// <returns>Результат масового завантаження.</returns>
        [HttpPost("upload-all-from-frontend")]
        [Authorize]
        [ProducesResponseType(typeof(BulkSpecialistImageUploadResponseDto), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> UploadAllSpecialistImagesFromFrontend(
            [FromForm] string frontendAssetsPath)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(frontendAssetsPath))
                {
                    return BadRequest(new { message = "Шлях до папки assets є обов'язковим" });
                }

                var result = await _specialistImageService.UploadAllSpecialistImagesFromFrontendAsync(frontendAssetsPath);
                return Ok(result);
            }
            catch (DirectoryNotFoundException ex)
            {
                _logger.LogWarning(ex, "Папка не знайдена: {DirectoryPath}", frontendAssetsPath);
                return NotFound(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Помилка масового завантаження зображень з frontend");
                return StatusCode(500, new { message = "Внутрішня помилка сервера" });
            }
        }

        /// <summary>
        /// Завантажує зображення спеціалістів зі стандартної папки Assets (автоматичний режим).
        /// </summary>
        /// <returns>Результат масового завантаження.</returns>
        [HttpPost("upload-all-auto")]
        [Authorize]
        [ProducesResponseType(typeof(BulkSpecialistImageUploadResponseDto), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> UploadAllSpecialistImagesAuto()
        {
            try
            {
                // Автоматичне визначення шляху до Assets папки
                var currentDirectory = Directory.GetCurrentDirectory();
                string assetsPath;
                
                // Перевіряємо чи запущено в Docker контейнері
                if (IsRunningInDocker())
                {
                    // В Docker контейнері Assets папка має бути скопійована в /app/Assets
                    assetsPath = "/app/Assets";
                }
                else
                {
                    // Локальний запуск - шукаємо Assets папку відносно поточного каталогу
                    assetsPath = Path.Combine(currentDirectory, "..", "..", "..", "Assets");
                    assetsPath = Path.GetFullPath(assetsPath);
                }
                
                if (!Directory.Exists(assetsPath))
                {
                    return BadRequest(new { message = $"Папка Assets не знайдена: {assetsPath}" });
                }

                var result = await _specialistImageService.UploadAllSpecialistImagesFromAssetsAsync(assetsPath);
                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Помилка автоматичного завантаження зображень спеціалістів");
                return StatusCode(500, new { message = "Внутрішня помилка сервера" });
            }
        }

        /// <summary>
        /// Завантажує зображення спеціаліста та зберігає URL в базу даних.
        /// </summary>
        /// <param name="file">Файл зображення.</param>
        /// <param name="specialistName">Ім'я спеціаліста (українською, наприклад: "Маргарита Дронова").</param>
        /// <param name="imageType">Тип зображення (card, big-card, etc.).</param>
        /// <returns>URL завантаженого зображення та статус збереження в БД.</returns>
        [HttpPost("upload-and-save")]
        [Authorize]
        [ProducesResponseType(typeof(SpecialistImageUploadResponseDto), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> UploadAndSaveToDatabase(
            IFormFile file,
            [FromForm] string specialistName,
            [FromForm] string imageType = "card")
        {
            try
            {
                if (file == null || file.Length == 0)
                {
                    return BadRequest(new { message = "Файл не може бути порожнім" });
                }

                if (string.IsNullOrWhiteSpace(specialistName))
                {
                    return BadRequest(new { message = "Ім'я спеціаліста є обов'язковим" });
                }

                // Upload the image
                var result = await _specialistImageService.UploadSpecialistImageAsync(file, specialistName, imageType);
                
                // For name-based uploads, we need to find the specialist ID first
                // This is a limitation - we should use the ID-based endpoint instead
                result.SavedToDatabase = false;
                result.DatabaseEntityType = null;
                result.Message = "Зображення завантажено. Для збереження в БД використовуйте endpoint з ID спеціаліста.";

                return Ok(result);
            }
            catch (ArgumentException ex)
            {
                _logger.LogWarning(ex, "Невірні параметри для завантаження зображення");
                return BadRequest(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Помилка завантаження зображення спеціаліста");
                return StatusCode(500, new { message = "Внутрішня помилка сервера" });
            }
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
        /// Завантажує зображення спеціаліста за українським ім'ям та зберігає URL в базу даних.
        /// </summary>
        /// <param name="file">Файл зображення.</param>
        /// <param name="specialistName">Українське ім'я спеціаліста (наприклад: "Маргарита Дронова").</param>
        /// <param name="imageType">Тип зображення (за замовчуванням: "card").</param>
        /// <returns>Результат завантаження з інформацією про збереження в БД.</returns>
        [HttpPost("upload-by-ukrainian-name")]
        [Authorize]
        [ProducesResponseType(typeof(SpecialistImageUploadResponseDto), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> UploadByUkrainianName(
            IFormFile file,
            [FromForm] string specialistName,
            [FromForm] string imageType = "card")
        {
            try
            {
                if (file == null || file.Length == 0)
                {
                    return BadRequest(new { message = "Файл не може бути порожнім" });
                }

                if (string.IsNullOrWhiteSpace(specialistName))
                {
                    return BadRequest(new { message = "Ім'я спеціаліста є обов'язковим" });
                }

                // Validate Ukrainian specialist name
                var validNames = new[]
                {
                    "Маргарита Дронова", "Олексій Соколенко", "Антоніна Смила",
                    "Олександр Медичний", "Андрій Кач", "Олеся Мамкіна", "Дмитро Делитанович"
                };

                if (!validNames.Contains(specialistName))
                {
                    return BadRequest(new { 
                        message = $"Невірне ім'я спеціаліста. Дозволені: {string.Join(", ", validNames)}" 
                    });
                }

                // Upload the image
                var result = await _specialistImageService.UploadSpecialistImageAsync(file, specialistName, imageType);
                
                // For name-based uploads, we need to find the specialist ID first
                // This is a limitation - we should use the ID-based endpoint instead
                result.SavedToDatabase = false;
                result.DatabaseEntityType = null;
                result.Message = $"Зображення завантажено для {specialistName}. Для збереження в БД використовуйте endpoint з ID спеціаліста.";

                return Ok(result);
            }
            catch (ArgumentException ex)
            {
                _logger.LogWarning(ex, "Невірні параметри для завантаження зображення");
                return BadRequest(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Помилка завантаження зображення спеціаліста");
                return StatusCode(500, new { message = "Внутрішня помилка сервера" });
            }
        }

        /// <summary>
        /// Конвертує українське ім'я в англійське для зберігання.
        /// </summary>
        private string ConvertUkrainianToEnglish(string ukrainianName)
        {
            var mapping = new Dictionary<string, string>
            {
                ["Маргарита Дронова"] = "Margarita Dronova",
                ["Олексій Соколенко"] = "Oleksiy Sokolenko",
                ["Антоніна Смила"] = "Antonina Smila",
                ["Олександр Медичний"] = "Oleksandr Medychnyi",
                ["Андрій Кач"] = "Andriy Kach",
                ["Олеся Мамкіна"] = "Olesya Mamkina",
                ["Дмитро Делитанович"] = "Dmytro Delytanovych"
            };

            return mapping.TryGetValue(ukrainianName, out var englishName) ? englishName : ukrainianName;
        }

        /// <summary>
        /// Завантажує зображення спеціаліста за ID та зберігає URL в базу даних.
        /// </summary>
        /// <param name="file">Файл зображення.</param>
        /// <param name="specialistId">ID спеціаліста.</param>
        /// <param name="imageType">Тип зображення (за замовчуванням: "card").</param>
        /// <returns>Результат завантаження з інформацією про збереження в БД.</returns>
        [HttpPost("upload-by-id")]
        [Authorize]
        [ProducesResponseType(typeof(SpecialistImageUploadResponseDto), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> UploadById(
            IFormFile file,
            [FromForm] Guid specialistId,
            [FromForm] string imageType = "card")
        {
            try
            {
                if (file == null || file.Length == 0)
                {
                    return BadRequest(new { message = "Файл не може бути порожнім" });
                }

                if (specialistId == Guid.Empty)
                {
                    return BadRequest(new { message = "ID спеціаліста є обов'язковим" });
                }

                // Upload the image
                var result = await _specialistImageService.UploadSpecialistImageByIdAsync(file, specialistId, imageType);
                
                // Save URL to database
                var savedToDatabase = await _databaseService.SaveImageUrlToDatabase(specialistId, result.ImageUrl, imageType);
                var entityType = savedToDatabase ? await _databaseService.GetEntityTypeForSpecialist(specialistId) : null;
                
                // Update response with database save status
                result.SavedToDatabase = savedToDatabase;
                result.DatabaseEntityType = entityType;
                
                if (savedToDatabase)
                {
                    result.Message = $"Зображення успішно завантажено та збережено в базу даних для спеціаліста з ID: {specialistId}";
                }
                else
                {
                    result.Message = $"Зображення завантажено, але не вдалося зберегти в базу даних для спеціаліста з ID: {specialistId}";
                }

                return Ok(result);
            }
            catch (ArgumentException ex)
            {
                _logger.LogWarning(ex, "Невірні параметри для завантаження зображення");
                return BadRequest(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Помилка завантаження зображення спеціаліста");
                return StatusCode(500, new { message = "Внутрішня помилка сервера" });
            }
        }

        /// <summary>
        /// Проксі endpoint для отримання зображень з MinIO.
        /// </summary>
        /// <param name="imagePath">Шлях до зображення в MinIO (наприклад: images/images/specialistsImages/andriy_kach_card.png).</param>
        /// <returns>Файл зображення з MinIO.</returns>
        [HttpGet("proxy/{*imagePath}")]
        [ProducesResponseType(typeof(FileResult), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetImage(string imagePath)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(imagePath))
                {
                    return BadRequest(new { message = "Шлях до зображення є обов'язковим" });
                }

                // Decode URL-encoded path
                var decodedPath = Uri.UnescapeDataString(imagePath);
                _logger.LogInformation("🖼️ [IMAGE_PROXY] Отримано запит на зображення: {OriginalPath} -> {DecodedPath}", imagePath, decodedPath);

                // Get the MinIO service from DI
                var objectStorageService = HttpContext.RequestServices.GetRequiredService<IObjectStorageService>();
                _logger.LogInformation("🖼️ [IMAGE_PROXY] Отримано сервіс MinIO, починаємо завантаження файлу");
                
                // Try to get file stream from MinIO
                Stream fileStream;
                try
                {
                    fileStream = await objectStorageService.GetFileAsync(decodedPath);
                    _logger.LogInformation("🖼️ [IMAGE_PROXY] Файл успішно завантажено з MinIO, розмір: {Size} байт", fileStream.Length);
                }
                catch (FileNotFoundException)
                {
                    // Try alternative path if original path failed
                    var alternativePath = decodedPath;
                    if (decodedPath.StartsWith("images/specialistsImages/"))
                    {
                        alternativePath = decodedPath.Replace("images/specialistsImages/", "images/images/specialistsImages/");
                        _logger.LogInformation("🖼️ [IMAGE_PROXY] Спробуємо альтернативний шлях: {AlternativePath}", alternativePath);
                        fileStream = await objectStorageService.GetFileAsync(alternativePath);
                        _logger.LogInformation("🖼️ [IMAGE_PROXY] Файл знайдено за альтернативним шляхом, розмір: {Size} байт", fileStream.Length);
                    }
                    else
                    {
                        throw; // Re-throw if no alternative path
                    }
                }
                
                // Determine content type based on file extension
                var contentType = GetContentTypeFromPath(decodedPath);
                _logger.LogInformation("🖼️ [IMAGE_PROXY] Визначено тип контенту: {ContentType}", contentType);
                
                // Return file with appropriate content type
                _logger.LogInformation("🖼️ [IMAGE_PROXY] Успішно повертаємо файл клієнту");
                return File(fileStream, contentType);
            }
            catch (FileNotFoundException)
            {
                _logger.LogWarning("🖼️ [IMAGE_PROXY] Зображення не знайдено: {ImagePath}", imagePath);
                return NotFound(new { message = "Зображення не знайдено" });
            }
            catch (OperationCanceledException)
            {
                _logger.LogWarning("🖼️ [IMAGE_PROXY] Операція скасована клієнтом для зображення: {ImagePath}", imagePath);
                return StatusCode(499, new { message = "Запит скасовано клієнтом" });
            }
            catch (IOException ex) when (ex.InnerException is SocketException socketEx && socketEx.SocketErrorCode == SocketError.OperationAborted)
            {
                _logger.LogWarning("🖼️ [IMAGE_PROXY] З'єднання перервано клієнтом для зображення: {ImagePath}", imagePath);
                return StatusCode(499, new { message = "З'єднання перервано клієнтом" });
            }
            catch (IOException ex) when (ex.Message.Contains("Operation canceled"))
            {
                _logger.LogWarning("🖼️ [IMAGE_PROXY] Операція скасована для зображення: {ImagePath}, помилка: {Error}", imagePath, ex.Message);
                return StatusCode(499, new { message = "Операція скасована" });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "🖼️ [IMAGE_PROXY] Помилка отримання зображення: {ImagePath}", imagePath);
                return StatusCode(500, new { message = "Внутрішня помилка сервера" });
            }
        }

        /// <summary>
        /// Перевіряє чи існує файл в MinIO.
        /// </summary>
        /// <param name="filePath">Шлях до файлу.</param>
        /// <returns>Результат перевірки.</returns>
        [HttpGet("debug/file-exists")]
        [ProducesResponseType(typeof(object), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> CheckFileExists([FromQuery] string filePath)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(filePath))
                {
                    return BadRequest(new { message = "Шлях до файлу є обов'язковим" });
                }

                var objectStorageService = HttpContext.RequestServices.GetRequiredService<IObjectStorageService>();
                
                // Cast to MinioService to access FileExistsAsync
                if (objectStorageService is MinioService minioService)
                {
                    var exists = await minioService.FileExistsAsync(filePath);
                    return Ok(new { 
                        filePath = filePath,
                        exists = exists 
                    });
                }
                else
                {
                    return BadRequest(new { message = "MinIO service not available" });
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Помилка перевірки існування файлу: {FilePath}", filePath);
                return StatusCode(500, new { message = "Внутрішня помилка сервера" });
            }
        }

        /// <summary>
        /// Визначає MIME тип файлу за розширенням.
        /// </summary>
        /// <param name="filePath">Шлях до файлу.</param>
        /// <returns>MIME тип файлу.</returns>
        private string GetContentTypeFromPath(string filePath)
        {
            var extension = Path.GetExtension(filePath).ToLowerInvariant();
            
            return extension switch
            {
                ".png" => "image/png",
                ".jpg" or ".jpeg" => "image/jpeg",
                ".gif" => "image/gif",
                ".webp" => "image/webp",
                ".svg" => "image/svg+xml",
                ".bmp" => "image/bmp",
                _ => "application/octet-stream"
            };
        }

    }
}
