using Microsoft.Extensions.Logging;

namespace HealthyLifestyle.Infrastructure.Services
{
    /// <summary>
    /// Сервіс для мапінгу українських імен спеціалістів до їх зображень.
    /// </summary>
    public class SpecialistNameMappingService
    {
        private readonly ILogger<SpecialistNameMappingService> _logger;

        public SpecialistNameMappingService(ILogger<SpecialistNameMappingService> logger)
        {
            _logger = logger;
        }

        /// <summary>
        /// Мапінг українських імен до англійських імен для зберігання файлів.
        /// </summary>
        private readonly Dictionary<string, string> _ukrainianToEnglishMapping = new()
        {
            ["Маргарита Дронова"] = "Margarita Dronova",
            ["Олексій Соколенко"] = "Oleksiy Sokolenko", 
            ["Антоніна Смила"] = "Antonina Smila",
            ["Олександр Медичний"] = "Oleksandr Medychnyi",
            ["Андрій Кач"] = "Andriy Kach",
            ["Олеся Мамкіна"] = "Olesya Mamkina",
            ["Дмитро Делитанович"] = "Dmytro Delytanovych"
        };

        /// <summary>
        /// Отримує мапінг українських імен спеціалістів до їх зображень.
        /// </summary>
        public Dictionary<string, List<(string fileName, string imageType)>> GetSpecialistImageMapping()
        {
            return new Dictionary<string, List<(string fileName, string imageType)>>
            {
                ["Маргарита Дронова"] = new() { ("card-1.png", "card") },
                ["Олексій Соколенко"] = new() { ("card-4.png", "card") },
                ["Антоніна Смила"] = new() { ("card-5.png", "card") },
                ["Олександр Медичний"] = new() { ("card-3.png", "card") },
                ["Андрій Кач"] = new() { ("card-6.png", "card") },
                ["Олеся Мамкіна"] = new() { ("card-2.png", "card") },
                ["Дмитро Делитанович"] = new() { ("card-6.png", "card") }
            };
        }

        /// <summary>
        /// Конвертує українське ім'я в англійське для зберігання файлів.
        /// </summary>
        public string GetEnglishNameForUkrainian(string ukrainianName)
        {
            return _ukrainianToEnglishMapping.TryGetValue(ukrainianName, out var englishName) 
                ? englishName 
                : ukrainianName; // Fallback to original if not found
        }

        /// <summary>
        /// Конвертує англійське ім'я в українське для відображення.
        /// </summary>
        public string GetUkrainianNameForEnglish(string englishName)
        {
            var reverseMapping = _ukrainianToEnglishMapping.ToDictionary(x => x.Value, x => x.Key);
            return reverseMapping.TryGetValue(englishName, out var ukrainianName) 
                ? ukrainianName 
                : englishName; // Fallback to original if not found
        }

        /// <summary>
        /// Отримує список всіх українських імен спеціалістів.
        /// </summary>
        public List<string> GetAllSpecialistNames()
        {
            return GetSpecialistImageMapping().Keys.ToList();
        }

        /// <summary>
        /// Перевіряє чи існує спеціаліст з таким ім'ям.
        /// </summary>
        public bool IsValidSpecialistName(string specialistName)
        {
            return GetSpecialistImageMapping().ContainsKey(specialistName);
        }

        /// <summary>
        /// Отримує зображення для конкретного спеціаліста.
        /// </summary>
        public List<(string fileName, string imageType)> GetImagesForSpecialist(string specialistName)
        {
            if (GetSpecialistImageMapping().TryGetValue(specialistName, out var images))
            {
                return images;
            }
            return new List<(string fileName, string imageType)>();
        }
    }
}
