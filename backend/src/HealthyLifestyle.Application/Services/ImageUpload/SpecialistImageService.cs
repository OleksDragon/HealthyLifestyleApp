using HealthyLifestyle.Application.DTOs.ImageUpload;
using HealthyLifestyle.Application.Interfaces.ObjectStorage;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;

namespace HealthyLifestyle.Application.Services.ImageUpload
{
    /// <summary>
    /// Сервіс для завантаження зображень спеціалістів.
    /// </summary>
    public class SpecialistImageService
    {
        private readonly IObjectStorageService _objectStorageService;
        private readonly ILogger<SpecialistImageService> _logger;

        public SpecialistImageService(
            IObjectStorageService objectStorageService,
            ILogger<SpecialistImageService> logger)
        {
            _objectStorageService = objectStorageService;
            _logger = logger;
        }

        /// <summary>
        /// Завантажує зображення спеціаліста.
        /// </summary>
        /// <param name="file">Файл зображення.</param>
        /// <param name="specialistName">Ім'я спеціаліста.</param>
        /// <param name="imageType">Тип зображення.</param>
        /// <returns>URL завантаженого зображення.</returns>
        public async Task<SpecialistImageUploadResponseDto> UploadSpecialistImageAsync(
            IFormFile file, 
            string specialistName, 
            string imageType)
        {
            try
            {
                if (file == null || file.Length == 0)
                {
                    throw new ArgumentException("Файл не може бути порожнім");
                }

                // Валідація типу файлу
                if (!IsValidImageFile(file))
                {
                    throw new ArgumentException("Непідтримуваний тип файлу. Дозволені: PNG, JPG, JPEG");
                }

                // Генерація унікального імені файлу
                var fileName = GenerateFileName(specialistName, imageType, Path.GetExtension(file.FileName));
                
                // Завантаження файлу
                using var stream = file.OpenReadStream();
                var contentType = file.ContentType;
                var imageUrl = await _objectStorageService.UploadFileAsync(stream, fileName, contentType);

                _logger.LogInformation($"Зображення спеціаліста '{specialistName}' успішно завантажено: {imageUrl}");

                return new SpecialistImageUploadResponseDto
                {
                    ImageUrl = imageUrl,
                    SpecialistName = specialistName,
                    ImageType = imageType,
                    Message = "Зображення успішно завантажено"
                };
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Помилка завантаження зображення для спеціаліста '{specialistName}'");
                throw;
            }
        }

        /// <summary>
        /// Завантажує кілька зображень спеціалістів.
        /// </summary>
        /// <param name="files">Список файлів.</param>
        /// <param name="specialistImages">Список даних про зображення.</param>
        /// <returns>Результат масового завантаження.</returns>
        public async Task<BulkSpecialistImageUploadResponseDto> UploadMultipleSpecialistImagesAsync(
            List<IFormFile> files, 
            List<SpecialistImageUploadDto> specialistImages)
        {
            var response = new BulkSpecialistImageUploadResponseDto();
            response.TotalProcessed = files.Count;

            for (int i = 0; i < files.Count && i < specialistImages.Count; i++)
            {
                try
                {
                    var result = await UploadSpecialistImageAsync(
                        files[i], 
                        specialistImages[i].SpecialistName, 
                        specialistImages[i].ImageType);
                    
                    response.SuccessfulUploads.Add(result);
                    response.SuccessCount++;
                }
                catch (Exception ex)
                {
                    var errorMessage = $"Помилка завантаження зображення для '{specialistImages[i].SpecialistName}': {ex.Message}";
                    response.Errors.Add(errorMessage);
                    response.ErrorCount++;
                    _logger.LogError(ex, errorMessage);
                }
            }

            return response;
        }

        /// <summary>
        /// Завантажує зображення з локальної папки frontend.
        /// </summary>
        /// <param name="frontendImagePath">Шлях до зображення в frontend.</param>
        /// <param name="specialistName">Ім'я спеціаліста.</param>
        /// <param name="imageType">Тип зображення.</param>
        /// <returns>URL завантаженого зображення.</returns>
        public async Task<SpecialistImageUploadResponseDto> UploadFromFrontendPathAsync(
            string frontendImagePath, 
            string specialistName, 
            string imageType)
        {
            try
            {
                if (!File.Exists(frontendImagePath))
                {
                    throw new FileNotFoundException($"Файл не знайдено: {frontendImagePath}");
                }

                var fileInfo = new FileInfo(frontendImagePath);
                var fileName = GenerateFileName(specialistName, imageType, fileInfo.Extension);
                
                using var stream = File.OpenRead(frontendImagePath);
                var contentType = GetContentType(fileInfo.Extension);
                var imageUrl = await _objectStorageService.UploadFileAsync(stream, fileName, contentType);

                _logger.LogInformation($"Зображення з frontend успішно завантажено: {imageUrl}");

                return new SpecialistImageUploadResponseDto
                {
                    ImageUrl = imageUrl,
                    SpecialistName = specialistName,
                    ImageType = imageType,
                    Message = "Зображення з frontend успішно завантажено"
                };
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Помилка завантаження зображення з frontend: {frontendImagePath}");
                throw;
            }
        }

        /// <summary>
        /// Завантажує зображення з локальної папки Assets.
        /// </summary>
        /// <param name="assetsImagePath">Шлях до зображення в Assets.</param>
        /// <param name="specialistName">Ім'я спеціаліста.</param>
        /// <param name="imageType">Тип зображення.</param>
        /// <returns>URL завантаженого зображення.</returns>
        public async Task<SpecialistImageUploadResponseDto> UploadFromAssetsPathAsync(
            string assetsImagePath, 
            string specialistName, 
            string imageType)
        {
            try
            {
                if (!File.Exists(assetsImagePath))
                {
                    throw new FileNotFoundException($"Файл не знайдено: {assetsImagePath}");
                }

                var fileInfo = new FileInfo(assetsImagePath);
                var fileName = GenerateFileName(specialistName, imageType, fileInfo.Extension);
                
                using var stream = File.OpenRead(assetsImagePath);
                var contentType = GetContentType(fileInfo.Extension);
                var imageUrl = await _objectStorageService.UploadFileAsync(stream, fileName, contentType);

                _logger.LogInformation($"Зображення з Assets успішно завантажено: {imageUrl}");

                return new SpecialistImageUploadResponseDto
                {
                    ImageUrl = imageUrl,
                    SpecialistName = specialistName,
                    ImageType = imageType,
                    Message = "Зображення з Assets успішно завантажено"
                };
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Помилка завантаження зображення з Assets: {assetsImagePath}");
                throw;
            }
        }

        /// <summary>
        /// Завантажує всі зображення спеціалістів з frontend папки.
        /// </summary>
        /// <param name="frontendAssetsPath">Шлях до папки assets у frontend.</param>
        /// <returns>Результат масового завантаження.</returns>
        public async Task<BulkSpecialistImageUploadResponseDto> UploadAllSpecialistImagesFromFrontendAsync(string frontendAssetsPath)
        {
            var response = new BulkSpecialistImageUploadResponseDto();
            var specialistsImgPath = Path.Combine(frontendAssetsPath, "specialists-img");
            
            if (!Directory.Exists(specialistsImgPath))
            {
                response.Errors.Add($"Папка не знайдена: {specialistsImgPath}");
                return response;
            }

            // Мапінг спеціалістів до їх зображень (українські імена)
            var specialistImageMapping = new Dictionary<string, List<(string fileName, string imageType)>>
            {
                ["Маргарита Дронова"] = new() { ("card-1.png", "card") },
                ["Олексій Соколенко"] = new() { ("card-4.png", "card") },
                ["Антоніна Смила"] = new() { ("card-5.png", "card") },
                ["Олександр Медичний"] = new() { ("card-3.png", "card") },
                ["Андрій Кач"] = new() { ("card-6.png", "card") },
                ["Олеся Мамкіна"] = new() { ("card-2.png", "card") },
                ["Дмитро Делитанович"] = new() { ("card-6.png", "card") }
            };

            foreach (var specialist in specialistImageMapping)
            {
                foreach (var (fileName, imageType) in specialist.Value)
                {
                    try
                    {
                        var filePath = Path.Combine(specialistsImgPath, fileName);
                        var result = await UploadFromFrontendPathAsync(filePath, specialist.Key, imageType);
                        response.SuccessfulUploads.Add(result);
                        response.SuccessCount++;
                    }
                    catch (Exception ex)
                    {
                        var errorMessage = $"Помилка завантаження зображення '{fileName}' для '{specialist.Key}': {ex.Message}";
                        response.Errors.Add(errorMessage);
                        response.ErrorCount++;
                        _logger.LogError(ex, errorMessage);
                    }
                }
            }

            response.TotalProcessed = specialistImageMapping.Values.Sum(x => x.Count);
            return response;
        }

        /// <summary>
        /// Завантажує всі зображення спеціалістів з Assets папки.
        /// </summary>
        /// <param name="assetsPath">Шлях до папки Assets.</param>
        /// <returns>Результат масового завантаження.</returns>
        public async Task<BulkSpecialistImageUploadResponseDto> UploadAllSpecialistImagesFromAssetsAsync(string assetsPath)
        {
            var response = new BulkSpecialistImageUploadResponseDto();
            var specialistsImgPath = Path.Combine(assetsPath, "specialists-img");
            
            if (!Directory.Exists(specialistsImgPath))
            {
                response.Errors.Add($"Папка не знайдена: {specialistsImgPath}");
                return response;
            }

            // Мапінг спеціалістів до їх зображень (українські імена)
            var specialistImageMapping = new Dictionary<string, List<(string fileName, string imageType)>>
            {
                ["Маргарита Дронова"] = new() { ("card-1.png", "card") },
                ["Олексій Соколенко"] = new() { ("card-4.png", "card") },
                ["Антоніна Смила"] = new() { ("card-5.png", "card") },
                ["Олександр Медичний"] = new() { ("card-3.png", "card") },
                ["Андрій Кач"] = new() { ("card-6.png", "card") },
                ["Олеся Мамкіна"] = new() { ("card-2.png", "card") },
                ["Дмитро Делитанович"] = new() { ("card-6.png", "card") }
            };

            foreach (var specialist in specialistImageMapping)
            {
                foreach (var (fileName, imageType) in specialist.Value)
                {
                    try
                    {
                        var filePath = Path.Combine(specialistsImgPath, fileName);
                        var result = await UploadFromAssetsPathAsync(filePath, specialist.Key, imageType);
                        response.SuccessfulUploads.Add(result);
                        response.SuccessCount++;
                    }
                    catch (Exception ex)
                    {
                        var errorMessage = $"Помилка завантаження зображення '{fileName}' для '{specialist.Key}': {ex.Message}";
                        response.Errors.Add(errorMessage);
                        response.ErrorCount++;
                        _logger.LogError(ex, errorMessage);
                    }
                }
            }

            response.TotalProcessed = specialistImageMapping.Values.Sum(x => x.Count);
            return response;
        }

        #region Private Methods

        /// <summary>
        /// Перевіряє чи є файл валідним зображенням.
        /// </summary>
        private bool IsValidImageFile(IFormFile file)
        {
            var allowedExtensions = new[] { ".png", ".jpg", ".jpeg" };
            var allowedContentTypes = new[] { "image/png", "image/jpeg", "image/jpg" };

            var extension = Path.GetExtension(file.FileName).ToLowerInvariant();
            var contentType = file.ContentType.ToLowerInvariant();

            return allowedExtensions.Contains(extension) && allowedContentTypes.Contains(contentType);
        }

        /// <summary>
        /// Генерує унікальне ім'я файлу.
        /// </summary>
        private string GenerateFileName(string specialistName, string imageType, string extension)
        {
            // Конвертуємо українські імена в англійські для зберігання файлів
            var englishName = ConvertUkrainianToEnglish(specialistName);
            var cleanSpecialistName = englishName.Replace(" ", "_").Replace("'", "").Replace("-", "_").ToLowerInvariant();
            return $"images/specialistsImages/{cleanSpecialistName}_{imageType}{extension}";
        }

        /// <summary>
        /// Конвертує українське ім'я в англійське для зберігання файлів.
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


        /// <summary>
        /// Завантажує зображення спеціаліста за ID.
        /// </summary>
        /// <param name="file">Файл зображення.</param>
        /// <param name="specialistId">ID спеціаліста.</param>
        /// <param name="imageType">Тип зображення (за замовчуванням: "card").</param>
        /// <returns>Результат завантаження зображення.</returns>
        public async Task<SpecialistImageUploadResponseDto> UploadSpecialistImageByIdAsync(IFormFile file, Guid specialistId, string imageType = "card")
        {
            try
            {
                // Validate file
                if (!IsValidImageFile(file))
                {
                    throw new ArgumentException("Невірний формат файлу. Дозволені формати: JPG, JPEG, PNG, GIF");
                }

                // Generate unique filename using specialist ID
                var fileName = GenerateFileNameById(specialistId, imageType, Path.GetExtension(file.FileName));
                
                // Upload file
                using var stream = file.OpenReadStream();
                var contentType = file.ContentType;
                var imageUrl = await _objectStorageService.UploadFileAsync(stream, fileName, contentType);

                _logger.LogInformation($"Зображення спеціаліста з ID '{specialistId}' успішно завантажено: {imageUrl}");

                return new SpecialistImageUploadResponseDto
                {
                    ImageUrl = imageUrl,
                    SpecialistName = specialistId.ToString(), // Use ID as identifier
                    ImageType = imageType,
                    Message = "Зображення успішно завантажено"
                };
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Помилка завантаження зображення для спеціаліста з ID: {SpecialistId}", specialistId);
                throw;
            }
        }

        /// <summary>
        /// Генерує ім'я файлу для зображення спеціаліста за ID.
        /// </summary>
        private string GenerateFileNameById(Guid specialistId, string imageType, string extension)
        {
            // Use specialist ID for filename generation
            var cleanId = specialistId.ToString("N"); // Remove hyphens
            //return $"specialistsIma/{cleanId}_{imageType}{extension}";
            return $"images/specialistsImages/{cleanId}_{imageType}{extension}";
        }

        #endregion
    }
}
