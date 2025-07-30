using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


using HealthyLifestyle.Application.DTOs.Working;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using HealthyLifestyle.Core.Entities;

namespace HealthyLifestyle.Application.Interfaces.Working
{
    public interface IFitnessActivityService
    {
        Task<IEnumerable<FitnessActivityDto>> GetAllAsync();
        Task<FitnessActivityDto?> GetByIdAsync(Guid id);
        Task<IEnumerable<FitnessActivityDto>> GetByUserIdAsync(Guid userId);
        Task<FitnessActivityDto> CreateAsync(CreateFitnessActivityDto dto);
        Task<FitnessActivityDto> UpdateAsync(Guid id, UpdateFitnessActivityDto dto);
        Task DeleteAsync(Guid id);
        Task DeleteByWorkoutIdAsync(Guid workoutId);
    }
}