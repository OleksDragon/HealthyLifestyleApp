using AutoMapper;
using HealthyLifestyle.Application.DTOs.Working;
using HealthyLifestyle.Application.Interfaces;
using HealthyLifestyle.Core.Entities;
using HealthyLifestyle.Core.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
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
            var updChallenge = _mapper.Map<SocialChallenge>(challengeUpdateDto);
            var challenge = await _challengeRepository.GetChallengeByIdWithParticipantsAsync(id);
            if (challenge == null)
            {
                throw new ArgumentException($"Челендж з ID {id} не знайдено.");
            }
            else
            {
                updChallenge.CreatorId = challenge.CreatorId;
                updChallenge.StartDate = challengeUpdateDto.StartDate ?? challenge.StartDate;
                updChallenge.EndDate = challengeUpdateDto.EndDate ?? challenge.EndDate;
                updChallenge.Type = challengeUpdateDto.Type ?? challenge.Type;
                await _chalengeParticipantRepository.DeleteByChallengeIdAsync(id);
                _challengeRepository.Delete(challenge);
                await _unitOfWork.SaveChangesAsync();
            }

            typeof(BaseEntity).GetProperty("Id")?.SetValue(updChallenge, id);

            if (challengeUpdateDto.Participations != null)
            {
                updChallenge.Participations = challengeUpdateDto.Participations.Select(partDto => new UserChallengeParticipation
                {
                    Challenge = updChallenge,
                    UserId = partDto.UserId,
                    JoinDate = partDto.JoinDate,
                    Progress = partDto.Progress,
                    Status = partDto.Status
                }).ToList();
            }

            await _challengeRepository.AddAsync(updChallenge);
            await _unitOfWork.SaveChangesAsync();
            return _mapper.Map<ChallengeDto>(updChallenge);
        }
    }
}
