using AutoMapper;
using HealthyLifestyle.Application.DTOs.MealTracker;
using HealthyLifestyle.Application.Interfaces;
using HealthyLifestyle.Core.Entities;
using HealthyLifestyle.Core.Interfaces;


namespace HealthyLifestyle.Application.Services
{
    public class MealService : IMealService
    {
        private readonly IMealRepository _repository;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public MealService(IMealRepository repository, IUnitOfWork unitOfWork, IMapper mapper)
        {
            _repository = repository;
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }
        public async Task<IEnumerable<MealDto>> GetAllAsync()
        {
            var meals = await _repository.GetAllAsync();
            return _mapper.Map<IEnumerable<MealDto>>(meals);
        }
        public async Task<MealDto?> GetByIdAsync(Guid id)
        {
            var meal = await _repository.GetByIdAsync(id);
            return _mapper.Map<MealDto>(meal);
        }

        public async Task<IEnumerable<MealDto>> GetByUserIdAsync(Guid userId)
        {
            var meals = await _repository.GetByUserIdAsync(userId);
            return _mapper.Map<IEnumerable<MealDto>>(meals);
        }

        public async Task<IEnumerable<MealDto>> GetByUserAndDateAsync(Guid userId, DateTime date)
        {
            var meals = await _repository.GetByUserAndDateAsync(userId, date);
            return _mapper.Map<IEnumerable<MealDto>>(meals);
        }

        public async Task<MealDto> CreateAsync(CreateMealDto dto)
        {
            var meal = _mapper.Map<MealEntry>(dto);
            await _repository.AddAsync(meal);
            await _unitOfWork.SaveChangesAsync();
            return _mapper.Map<MealDto>(meal);
        }

        public async Task<MealDto> UpdateAsync(Guid id, UpdateMealDto dto)
        {
            var meal = await _repository.GetByIdAsync(id);
            if (meal == null)
                throw new KeyNotFoundException($"Meal with ID '{id}' not found.");

            _mapper.Map(dto, meal);
            meal.SetUpdatedAt();
            _repository.Update(meal);
            await _unitOfWork.SaveChangesAsync();
            return _mapper.Map<MealDto>(meal);
        }

        public async Task DeleteAsync(Guid id)
        {
            var meal = await _repository.GetByIdAsync(id);
            if (meal == null)
                throw new KeyNotFoundException($"Meal with ID '{id}' not found.");

            _repository.Delete(meal);
            await _unitOfWork.SaveChangesAsync();
        }
    }
}