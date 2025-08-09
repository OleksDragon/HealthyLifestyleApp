using AutoMapper;
using HealthyLifestyle.Core.Entities;
using HealthyLifestyle.Core.Interfaces;
using HealthyLifestyle.Application.DTOs.Workout;
using HealthyLifestyle.Application.Interfaces.Workout;
using HealthyLifestyle.Core.Interfaces.WorkoutR;


namespace HealthyLifestyle.Application.Services.WorkoutS
{
    public class FitnessActivityService : IFitnessActivityService
    {
        private readonly IFitnessActivityRepository _repository;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public FitnessActivityService(
            IFitnessActivityRepository repository,
            IUnitOfWork unitOfWork,
            IMapper mapper)
        {
            _repository = repository;
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }
        public async Task<IEnumerable<FitnessActivityDto>> GetAllAsync()
        {
            var activities = await _repository.GetAllAsync();
            return _mapper.Map<IEnumerable<FitnessActivityDto>>(activities);
        }
        public async Task<FitnessActivityDto?> GetByIdAsync(Guid id)
        {
            var activity = await _repository.GetByIdAsync(id);
            return _mapper.Map<FitnessActivityDto>(activity);
        }

        public async Task<IEnumerable<FitnessActivityDto>> GetByUserIdAsync(Guid userId)
        {
            var activities = await _repository.GetByUserIdAsync(userId);
            return _mapper.Map<IEnumerable<FitnessActivityDto>>(activities);
        }

        public async Task<FitnessActivityDto> CreateAsync(CreateFitnessActivityDto dto)
        {
            var activity = _mapper.Map<FitnessActivity>(dto);
            await _repository.AddAsync(activity);
            await _unitOfWork.SaveChangesAsync();
            return _mapper.Map<FitnessActivityDto>(activity);
        }

        public async Task<FitnessActivityDto> UpdateAsync(Guid id, UpdateFitnessActivityDto dto)
        {
            var activity = await _repository.GetByIdAsync(id);
            if (activity == null)
                throw new KeyNotFoundException($"Activity with ID '{id}' not found.");

            _mapper.Map(dto, activity);
            activity.SetUpdatedAt();
            _repository.Update(activity);
            await _unitOfWork.SaveChangesAsync();
            return _mapper.Map<FitnessActivityDto>(activity);
        }

        public async Task DeleteAsync(Guid id)
        {
            var activity = await _repository.GetByIdAsync(id);
            if (activity == null)
                throw new KeyNotFoundException($"Activity with ID '{id}' not found.");

            _repository.Delete(activity);
            await _unitOfWork.SaveChangesAsync();
        }

        public async Task DeleteByWorkoutIdAsync(Guid workoutId)
        {
            await _repository.DeleteByWorkoutIdAsync(workoutId);
            await _unitOfWork.SaveChangesAsync();
        }
    }
}