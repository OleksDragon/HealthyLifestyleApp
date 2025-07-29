using HealthyLifestyle.Core.Entities;
using System;

using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace HealthyLifestyle.Core.Interfaces
{
    public interface IMealRepository : IRepository<MealEntry>
    {
        Task<IEnumerable<MealEntry>> GetByUserIdAsync(Guid userId);
        Task<IEnumerable<MealEntry>> GetByUserAndDateAsync(Guid userId, DateTime date);
    }
}