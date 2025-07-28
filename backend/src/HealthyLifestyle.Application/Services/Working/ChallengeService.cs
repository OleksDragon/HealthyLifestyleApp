using AutoMapper;
using HealthyLifestyle.Application.DTOs.Working;
using HealthyLifestyle.Application.Interfaces;
using HealthyLifestyle.Core.Entities;
using HealthyLifestyle.Core.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HealthyLifestyle.Application.Services.Working
{
    public class ChallengeService : IChallengeService
    {
        private readonly IChallengeRepository _challengeRepository;
        private readonly IChallengeParticipantRepository _chalengeParticipantRepository;
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;
        public ChallengeService(IChallengeRepository challengeRepository, IChallengeParticipantRepository chalengeParticipantRepository, IMapper mapper, IUnitOfWork unitOfWork)
        {
            _challengeRepository = challengeRepository;
            _chalengeParticipantRepository = chalengeParticipantRepository;
            _mapper = mapper;
            _unitOfWork = unitOfWork;
        }

        public async Task<ChallengeDto> CreateChallengeAsync(ChallengeCreateDto challengeCreateDto)
        {
            var challenge = _mapper.Map<SocialChallenge>(challengeCreateDto);

            var challengeParticipants = challengeCreateDto.Participations.Select(partDto => new UserChallengeParticipation
            {
                Challenge = challenge,
                UserId = partDto.UserId,
                JoinDate = partDto.JoinDate,
                Progress = partDto.Progress,
                Status = partDto.Status
            }).ToList();

            challenge.Participations = challengeParticipants;

            await _challengeRepository.AddAsync(challenge);
            await _unitOfWork.SaveChangesAsync(); // Зберігаємо зміни

            return _mapper.Map<ChallengeDto>(challenge);
        }

        public async Task DeleteChallengeAsync(Guid id)
        {
            var challenge = await _challengeRepository.GetByIdAsync(id);
            if (challenge == null)
            {
                throw new ArgumentException($"Челендж з ID {id} не знайдено.");
            }
            await _chalengeParticipantRepository.DeleteByChallengeIdAsync(id);
            _challengeRepository.Delete(challenge);
            await _unitOfWork.SaveChangesAsync(); // Зберігаємо зміни
        }

        public async Task<IEnumerable<ChallengeDto>> GetAllChallengesAsync()
        {
            var challenges = await _challengeRepository.GetAllChallengesWithParticipantsAsync();
            return _mapper.Map<IEnumerable<ChallengeDto>>(challenges);
        }

        public async Task<ChallengeDto> GetChallengeByIdAsync(Guid id)
        {
            var challenge = await _challengeRepository.GetChallengeByIdWithParticipantsAsync(id);
            if (challenge == null)
            {
                throw new KeyNotFoundException($"Челендж з ID '{id}' не знайдено.");
            }
            return _mapper.Map<ChallengeDto>(challenge);
        }

        public async Task<ChallengeDto> UpdateChallengeAsync(Guid id, ChallengeUpdateDto challengeUpdateDto)
        {
            var challenge = await _challengeRepository.GetChallengeByIdWithParticipantsAsync(id);
            if (challenge == null)
            {
                throw new ArgumentException($"Челендж з ID {id} не знайдено.");
            }

            if (!string.IsNullOrEmpty(challengeUpdateDto.Name))
                challenge.Name = challengeUpdateDto.Name;

            if (!string.IsNullOrEmpty(challengeUpdateDto.Description))
                challenge.Description = challengeUpdateDto.Description;

            var newParticipants = challengeUpdateDto.Participations ?? new List<ChallengeCreateParticipationDto>();

            var toRemove = challenge.Participations
                .Where(existing => !newParticipants.Any(m => m.UserId == existing.UserId))
                .ToList();

            foreach (var member in toRemove)
            {
                challenge.Participations.Remove(member);
            }

            foreach (var partDto in newParticipants)
            {
                var existing = challenge.Participations.FirstOrDefault(m => m.UserId == partDto.UserId);
                if (existing == null)
                {
                    challenge.Participations.Add(new UserChallengeParticipation
                    {
                        ChallengeId = challenge.Id,
                        UserId = partDto.UserId,
                        JoinDate = partDto.JoinDate,
                        Progress = partDto.Progress,
                        Status = partDto.Status
                    });
                }
                else
                {
                    existing.Progress = partDto.Progress;
                    existing.Status = partDto.Status;
                }
            }

            _challengeRepository.Update(challenge);
            await _unitOfWork.SaveChangesAsync();
            return _mapper.Map<ChallengeDto>(challenge);
        }
    }
}
