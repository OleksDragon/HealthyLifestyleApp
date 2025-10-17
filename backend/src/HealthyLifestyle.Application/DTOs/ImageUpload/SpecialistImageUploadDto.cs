using System.ComponentModel.DataAnnotations;

namespace HealthyLifestyle.Application.DTOs.ImageUpload
{
    /// <summary>
    /// DTO для завантаження зображень спеціалістів.
    /// </summary>
    public class SpecialistImageUploadDto
    {
        /// <summary>
        /// Ім'я спеціаліста.
        /// </summary>
        [Required(ErrorMessage = "Ім'я спеціаліста є обов'язковим")]
        public string SpecialistName { get; set; } = string.Empty;

        /// <summary>
        /// Тип зображення (card, big-card, etc.).
        /// </summary>
        [Required(ErrorMessage = "Тип зображення є обов'язковим")]
        public string ImageType { get; set; } = string.Empty;

        /// <summary>
        /// Розширення файлу.
        /// </summary>
        [Required(ErrorMessage = "Розширення файлу є обов'язковим")]
        public string FileExtension { get; set; } = string.Empty;
    }

    /// <summary>
    /// DTO для відповіді після завантаження зображення.
    /// </summary>
    public class SpecialistImageUploadResponseDto
    {
        /// <summary>
        /// URL завантаженого зображення.
        /// </summary>
        public string ImageUrl { get; set; } = string.Empty;

        /// <summary>
        /// Ім'я спеціаліста.
        /// </summary>
        public string SpecialistName { get; set; } = string.Empty;

        /// <summary>
        /// Тип зображення.
        /// </summary>
        public string ImageType { get; set; } = string.Empty;

        /// <summary>
        /// Повідомлення про успішне завантаження.
        /// </summary>
        public string Message { get; set; } = string.Empty;

        /// <summary>
        /// Чи збережено URL в базу даних.
        /// </summary>
        public bool SavedToDatabase { get; set; }

        /// <summary>
        /// Тип сутності в базі даних (наприклад, "TrainerDetails", "DoctorDetails").
        /// </summary>
        public string? DatabaseEntityType { get; set; }
    }

    /// <summary>
    /// DTO для масового завантаження зображень спеціалістів.
    /// </summary>
    public class BulkSpecialistImageUploadDto
    {
        /// <summary>
        /// Список зображень для завантаження.
        /// </summary>
        [Required(ErrorMessage = "Список зображень є обов'язковим")]
        public List<SpecialistImageUploadDto> Images { get; set; } = new List<SpecialistImageUploadDto>();
    }

    /// <summary>
    /// DTO для відповіді після масового завантаження.
    /// </summary>
    public class BulkSpecialistImageUploadResponseDto
    {
        /// <summary>
        /// Список успішно завантажених зображень.
        /// </summary>
        public List<SpecialistImageUploadResponseDto> SuccessfulUploads { get; set; } = new List<SpecialistImageUploadResponseDto>();

        /// <summary>
        /// Список помилок при завантаженні.
        /// </summary>
        public List<string> Errors { get; set; } = new List<string>();

        /// <summary>
        /// Загальна кількість оброблених файлів.
        /// </summary>
        public int TotalProcessed { get; set; }

        /// <summary>
        /// Кількість успішно завантажених файлів.
        /// </summary>
        public int SuccessCount { get; set; }

        /// <summary>
        /// Кількість помилок.
        /// </summary>
        public int ErrorCount { get; set; }
    }
}
