using HealthyLifestyle.Core.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HealthyLifestyle.Application.DTOs.Working
{
    public class ChallengeDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public Guid CreatorId { get; set; }
        public ChallengeType Type { get; set; }
        public ICollection<ChallengeParticipationDto> Participations { get; set; } = new List<ChallengeParticipationDto>();
    }

    public class ChallengeParticipationDto
    {
        public Guid UserId { get; set; }
        public Guid ChallengeId { get; set; }

        [Range(0.0, 1.0, ErrorMessage = "Прогрес виконання повинен бути від 0 до 1")]
        public double Progress { get; set; }
        public ParticipationStatus Status { get; set; }
        public DateTime JoinDate { get; set; }
    }

    public class ChallengeCreateParticipationDto
    {
        public Guid UserId { get; set; }

        [Range(0.0, 1.0, ErrorMessage = "Прогрес виконання повинен бути від 0 до 1")]
        public double Progress { get; set; }
        public ParticipationStatus Status { get; set; }
        public DateTime JoinDate { get; set; }
    }

    public class ChallengeCreateDto
    {
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public Guid CreatorId { get; set; }
        public ChallengeType Type { get; set; }
        public ICollection<ChallengeCreateParticipationDto> Participations { get; set; } = new List<ChallengeCreateParticipationDto>();
    }

    public class ChallengeUpdateDto
    {
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public ChallengeType? Type { get; set; }
        public ICollection<ChallengeCreateParticipationDto>? Participations { get; set; } = new List<ChallengeCreateParticipationDto>();
    }
}
