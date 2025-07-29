using HealthyLifestyle.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HealthyLifestyle.Core.Interfaces.Working
{
    public interface IFitnessActivityRepository : IRepository<FitnessActivity>
    {
        Task DeleteByWorkoutIdAsync(Guid workoutId);
    }
}
