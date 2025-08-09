using HealthyLifestyle.Core.Enums;
using System.ComponentModel.DataAnnotations;

namespace HealthyLifestyle.Application.DTOs.Consultation
{
    /// <summary>
    /// DTO для відображення інформації про консультацію.
    /// </summary>
    public class ConsultationDto
    {
        public Guid Id { get; set; }
        public Guid ClientId { get; set; }
        public Guid ProfessionalId { get; set; }
        public Guid ProfessionalQualificationId { get; set; }
        public DateTime ConsultationDate { get; set; }
        public int DurationMinutes { get; set; }
        public decimal Cost { get; set; }
        public ConsultationStatus Status { get; set; }
        public decimal PlatformCommission { get; set; }
        public string MeetingLink { get; set; } = string.Empty;
        public string? Notes { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }

    /// <summary>
    /// DTO для створення нової консультації.
    /// </summary>
    public class ConsultationCreateDto
    {
        public Guid ClientId { get; set; }
        public Guid ProfessionalId { get; set; }
        public Guid ProfessionalQualificationId { get; set; }
        public DateTime ConsultationDate { get; set; }

        [Range(5, 180, ErrorMessage = "Довжина консультацій повинна бути від 5 до 180 хвилин.")]
        public int DurationMinutes { get; set; }

        [Range(0.01, double.MaxValue, ErrorMessage = "Ціна консультації повинна бути позитивним числом.")]
        public decimal Cost { get; set; }

        [Required(ErrorMessage = "Статус консультації є обов'язковим")]
        public ConsultationStatus Status { get; set; }

        [Range(0.0, 1.0, ErrorMessage = "Комісія платформи повинна бути в діапазоні від 0 до 1.")]
        public decimal PlatformCommission { get; set; }
        public string MeetingLink { get; set; } = string.Empty;
        public string? Notes { get; set; }

    }

    /// <summary>
    /// DTO для оновлення існуючої консультації.
    /// </summary>
    public class ConsultationUpdateDto
    {
        public Guid ClientId { get; set; }
        public Guid ProfessionalId { get; set; }
        public Guid ProfessionalQualificationId { get; set; }
        public DateTime? ConsultationDate { get; set; }

        [Range(5, 180, ErrorMessage = "Довжина консультацій повинна бути від 5 до 180 хвилин.")]
        public int? DurationMinutes { get; set; }

        [Range(0.01, double.MaxValue, ErrorMessage = "Ціна консультації повинна бути позитивним числом.")]
        public decimal? Cost { get; set; }

        [Required(ErrorMessage = "Статус консультації є обов'язковим")]
        public ConsultationStatus? Status { get; set; }

        [Range(0.0, 1.0, ErrorMessage = "Комісія платформи повинна бути в діапазоні від 0 до 1.")]
        public decimal? PlatformCommission { get; set; }
        public string? MeetingLink { get; set; } = string.Empty;
        public string? Notes { get; set; }
    }

}
