using AutoMapper;
using HealthyLifestyle.Application.DTOs.MealTracker;
using HealthyLifestyle.Application.Interfaces;
using HealthyLifestyle.Core.Entities;
using HealthyLifestyle.Core.Enums;
using HealthyLifestyle.Core.Interfaces;
using HealthyLifestyle.Core.Interfaces.MealTracker;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace HealthyLifestyle.Application.Services.MealTracker
{
    /// <summary>
    /// Сервис для управления приёмами пищи.
    /// </summary>
    public class MealService : IMealService
    {
        private readonly IMealRepository _mealRepository;
        private readonly IRecipeRepository _recipeRepository;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly IUserRepository _userRepository;

        public MealService(
            IMealRepository mealRepository,
            IRecipeRepository recipeRepository,
            IUnitOfWork unitOfWork,
            IMapper mapper,
            IUserRepository userRepository)
        {
            _mealRepository = mealRepository;
            _recipeRepository = recipeRepository;
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _userRepository = userRepository;
        }

        public async Task<IEnumerable<MealDto>> GetAllAsync()
        {
            var meals = await _mealRepository.GetAllAsync();
            return _mapper.Map<IEnumerable<MealDto>>(meals);
        }

        public async Task<MealDto?> GetByIdAsync(Guid id)
        {
            var meal = await _mealRepository.GetByIdAsync(id);
            return meal == null ? null : _mapper.Map<MealDto>(meal);
        }

        public async Task<IEnumerable<MealDto>> GetByUserIdAsync(Guid userId)
        {
            var meals = await _mealRepository.GetByUserIdAsync(userId);
            return _mapper.Map<IEnumerable<MealDto>>(meals);
        }

        public async Task<IEnumerable<MealDto>> GetByUserAndDateAsync(Guid userId, DateTime date)
        {
            var meals = await _mealRepository.GetByUserAndDateAsync(userId, date);
            return _mapper.Map<IEnumerable<MealDto>>(meals);
        }

        public async Task<MealDto> CreateAsync(CreateMealDto dto)
        {
            var user = await _userRepository.GetByIdAsync(dto.UserId);
            if (user == null)
                throw new KeyNotFoundException($"Пользователь с ID '{dto.UserId}' не найден.");

            Recipe? recipe = null;
            string foodItemName = dto.FoodItemName;

            if (dto.RecipeId.HasValue)
            {
                recipe = await _recipeRepository.GetByIdAsync(dto.RecipeId.Value);
                if (recipe == null)
                    throw new KeyNotFoundException($"Рецепт с ID '{dto.RecipeId}' не найден.");

                if (string.IsNullOrEmpty(foodItemName))
                {
                    foodItemName = recipe.Name;
                }
            }

            if (string.IsNullOrEmpty(foodItemName))
            {
                foodItemName = "Без названия";
            }

            var meal = new MealEntry(
                userId: dto.UserId,
                user: user,
                foodItemName: foodItemName,
                quantity: dto.Quantity,
                proteinsG: dto.ProteinsG,
                carbsG: dto.CarbsG,
                fatsG: dto.FatsG,
                calories: dto.Calories,
                mealType: dto.MealType,
                entryDate: dto.EntryDate,
                dietPlanId: dto.DietPlanId
            )
            {                 
                RecipeId = dto.RecipeId
            };

            await _mealRepository.AddAsync(meal);
            await _unitOfWork.SaveChangesAsync();

            return _mapper.Map<MealDto>(meal);
        }

        public async Task<MealDto> UpdateAsync(Guid id, UpdateMealDto dto)
        {
            var meal = await _mealRepository.GetByIdAsync(id);
            if (meal == null)
                throw new KeyNotFoundException($"Прием пищи с ID '{id}' не найден.");

            meal.UpdateMealEntry(
                foodItemName: dto.FoodItemName,
                quantity: dto.Quantity,
                proteinsG: dto.ProteinsG,
                carbsG: dto.CarbsG,
                fatsG: dto.FatsG,
                calories: dto.Calories,
                mealType: dto.MealType,
                entryDate: dto.EntryDate,
                dietPlanId: dto.DietPlanId
            );

            _mealRepository.Update(meal);
            await _unitOfWork.SaveChangesAsync();

            return _mapper.Map<MealDto>(meal);
        }

        public async Task DeleteAsync(Guid id)
        {
            var meal = await _mealRepository.GetByIdAsync(id);
            if (meal == null)
                throw new KeyNotFoundException($"Прием пищи с ID '{id}' не найден.");

            _mealRepository.Delete(meal);
            await _unitOfWork.SaveChangesAsync();
        }
    }
}