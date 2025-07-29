using AutoMapper;
using HealthyLifestyle.Application.DTOs.DietPlan;
using HealthyLifestyle.Application.Interfaces;
using HealthyLifestyle.Core.Entities;
using HealthyLifestyle.Core.Interfaces;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace HealthyLifestyle.Application.Services
{
    /// <summary>
    /// Service implementation for diet plan operations
    /// </summary>
    public class DietPlanService : IDietPlanService
    {
        private readonly IDietPlanRepository _repository;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public DietPlanService(
            IDietPlanRepository repository,
            IUnitOfWork unitOfWork,
            IMapper mapper)
        {
            _repository = repository;
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<IEnumerable<DietPlanDto>> GetAllAsync()
        {
            var dietPlans = await _repository.GetAllAsync();
            return _mapper.Map<IEnumerable<DietPlanDto>>(dietPlans);
        }

        public async Task<DietPlanDto?> GetByIdAsync(Guid id)
        {
            var dietPlan = await _repository.GetByIdAsync(id);
            return _mapper.Map<DietPlanDto>(dietPlan);
        }

        public async Task<IEnumerable<DietPlanDto>> GetByClientIdAsync(Guid clientId)
        {
            var dietPlans = await _repository.GetByClientIdAsync(clientId);
            return _mapper.Map<IEnumerable<DietPlanDto>>(dietPlans);
        }

        public async Task<DietPlanDto> CreateAsync(CreateDietPlanDto dto)
        {
            var dietPlan = _mapper.Map<DietPlan>(dto);
            await _repository.AddAsync(dietPlan);
            await _unitOfWork.SaveChangesAsync();
            return _mapper.Map<DietPlanDto>(dietPlan);
        }

        public async Task<DietPlanDto> UpdateAsync(Guid id, UpdateDietPlanDto dto)
        {
            var dietPlan = await _repository.GetByIdAsync(id);
            if (dietPlan == null)
                throw new KeyNotFoundException($"Diet plan with ID '{id}' not found.");

            _mapper.Map(dto, dietPlan);
            dietPlan.SetUpdatedAt();
            _repository.Update(dietPlan);
            await _unitOfWork.SaveChangesAsync();
            return _mapper.Map<DietPlanDto>(dietPlan);
        }

        public async Task DeleteAsync(Guid id)
        {
            var dietPlan = await _repository.GetByIdAsync(id);
            if (dietPlan == null)
                throw new KeyNotFoundException($"Diet plan with ID '{id}' not found.");

            _repository.Delete(dietPlan);
            await _unitOfWork.SaveChangesAsync();
        }
    }
}