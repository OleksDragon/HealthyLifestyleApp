using HealthyLifestyle.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HealthyLifestyle.Core.Interfaces.Working
{
    /// <summary>
    /// Спеціалізований інтерфейс репозиторію для сутності Consultation.
    /// Розширює загальний IRepository, надаючи специфічні операції для консультації.
    /// </summary>
    public interface IConsultationRepository : IRepository<Consultation>
    {
        // Приклад: Якщо вам знадобиться специфічний для Consultation метод,
        // який не є загальним CRUD, ви можете додати його сюди.
    }
}
