using HealthyLifestyle.Core.Entities;

namespace HealthyLifestyle.Core.Interfaces.ConsultationIR
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
