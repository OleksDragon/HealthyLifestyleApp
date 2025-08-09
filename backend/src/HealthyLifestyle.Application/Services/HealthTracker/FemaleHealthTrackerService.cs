using AutoMapper;
using HealthyLifestyle.Application.DTOs.HealthTracker;
using HealthyLifestyle.Application.Interfaces.HealthTracker;
using HealthyLifestyle.Core.Entities;
using HealthyLifestyle.Core.Interfaces;
using HealthyLifestyle.Core.Interfaces.HealthTracker;

namespace HealthyLifestyle.Application.Services.HealthTracker
{
    public class FemaleHealthTrackerService : IFemaleHealthTrackerService
    {
        private readonly IFemaleHealthTrackerRepository _femaleHealthTrackerRepository;
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;

        public FemaleHealthTrackerService(
            IFemaleHealthTrackerRepository femaleHealthTrackerRepository,
            IMapper mapper,
            IUnitOfWork unitOfWork)
        {
            _femaleHealthTrackerRepository = femaleHealthTrackerRepository;
            _mapper = mapper;
            _unitOfWork = unitOfWork;
        }

        public async Task<FemaleHealthTrackerDto> CreateFemaleHealthTrackerAsync(FemaleHealthTrackerCreateDto femaleHealthTrackerCreateDto)
        {
            var femaleHealthTracker = _mapper.Map<FemaleHealthTracker>(femaleHealthTrackerCreateDto);

            await _femaleHealthTrackerRepository.AddAsync(femaleHealthTracker);
            await _unitOfWork.SaveChangesAsync();

            return _mapper.Map<FemaleHealthTrackerDto>(femaleHealthTracker);
        }

        public async Task DeleteFemaleHealthTrackerAsync(Guid id)
        {
            var femaleHealthTracker = await _femaleHealthTrackerRepository.GetByIdAsync(id);
            if (femaleHealthTracker == null)
            {
                throw new ArgumentException($"Трекер жіночого здоров'я з ID {id} не знайдено.");
            }

            _femaleHealthTrackerRepository.Delete(femaleHealthTracker);
            await _unitOfWork.SaveChangesAsync();
        }

        public async Task<IEnumerable<FemaleHealthTrackerDto>> GetAllFemaleHealthTrackerAsync()
        {
            var femaleHealthTracker = await _femaleHealthTrackerRepository.GetAllAsync();
            return _mapper.Map<IEnumerable<FemaleHealthTrackerDto>>(femaleHealthTracker);
        }

        public async Task<FemaleHealthTrackerDto> GetFemaleHealthTrackerByIdAsync(Guid id)
        {
            var femaleHealthTracker = await _femaleHealthTrackerRepository.GetByIdAsync(id);
            if (femaleHealthTracker == null)
            {
                throw new KeyNotFoundException($"Трекер жіночого здоров'я з ID '{id}' не знайдено.");
            }
            return _mapper.Map<FemaleHealthTrackerDto>(femaleHealthTracker);
        }

        public async Task<FemaleHealthTrackerDto> UpdateFemaleHealthTrackerAsync(Guid id, FemaleHealthTrackerUpdateDto updateDto)
        {
            var femaleHealthTracker = await _femaleHealthTrackerRepository.GetByIdAsync(id);
            if (femaleHealthTracker == null)
            {
                throw new ArgumentException($"Трекер жіночого здоров'я з ID {id} не знайдено.");
            }

            _mapper.Map(updateDto, femaleHealthTracker);
            _femaleHealthTrackerRepository.Update(femaleHealthTracker);
            await _unitOfWork.SaveChangesAsync();

            return _mapper.Map<FemaleHealthTrackerDto>(femaleHealthTracker);
        }
    }
}
