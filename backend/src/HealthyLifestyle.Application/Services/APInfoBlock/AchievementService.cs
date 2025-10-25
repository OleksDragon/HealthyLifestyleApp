using AutoMapper;
using HealthyLifestyle.Application.DTOs.APInfoBlock;
using HealthyLifestyle.Application.Interfaces.APInfoBlock;
using HealthyLifestyle.Core.Entities;
using HealthyLifestyle.Core.Interfaces;
using HealthyLifestyle.Core.Interfaces.APInfoBlock;

namespace HealthyLifestyle.Application.Services.APInfoBlock
{
    public class AchievementService : IAchievementService
    {
        private readonly IAchievementRepository _achievementRepository;
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;

        public AchievementService(
            IAchievementRepository achievementRepository,
            IMapper mapper,
            IUnitOfWork unitOfWork)
        {
            _achievementRepository = achievementRepository;
            _mapper = mapper;
            _unitOfWork = unitOfWork;
        }

        public async Task<AchievementDto> CreateAchievementAsync(AchievementCreateDto createDto)
        {
            var achievement = _mapper.Map<Achievement>(createDto);

            await _achievementRepository.AddAsync(achievement);
            await _unitOfWork.SaveChangesAsync();

            return _mapper.Map<AchievementDto>(achievement);
        }

        public async Task DeleteAchievementAsync(Guid id)
        {
            var achievement = await _achievementRepository.GetByIdAsync(id);
            if (achievement == null)
            {
                throw new ArgumentException($"Досягнення з ID {id} не знайдено.");
            }

            _achievementRepository.Delete(achievement);
            await _unitOfWork.SaveChangesAsync();
        }

        public async Task<IEnumerable<AchievementDto>> GetAllAchievementsAsync()
        {
            var achievements = await _achievementRepository.GetAllAsync();
            return _mapper.Map<IEnumerable<AchievementDto>>(achievements);
        }

        public async Task<List<AchievementDto>> GetAchievementsByUserIdAsync(Guid id)
        {
            var achievements = await _achievementRepository.GetAchievementsByUserIdAsync(id);

            // Повертаємо пустий список
            return _mapper.Map<List<AchievementDto>>(achievements ?? new List<Achievement>());
        }
    }
}