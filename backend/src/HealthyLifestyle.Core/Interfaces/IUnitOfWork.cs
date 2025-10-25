using HealthyLifestyle.Core.Entities;
using HealthyLifestyle.Core.Interfaces.Challenge;
using HealthyLifestyle.Core.Interfaces.MealTracker;

namespace HealthyLifestyle.Core.Interfaces
{
    /// <summary>
    /// Інтерфейс "Одиниці роботи" (Unit of Work).
    /// Відповідає за керування транзакціями та координацію змін у кількох репозиторіях.
    /// </summary>
    public interface IUnitOfWork : IDisposable
    {
        /// <summary>
        /// Отримує репозиторій для вказаного типу сутності.
        /// Використовується для роботи з CRUD-операціями над конкретними сутностями.
        /// </summary>
        /// <typeparam name="TEntity">Тип сутності (повинен наслідувати BaseEntity).</typeparam>
        /// <returns>Репозиторій для вказаної сутності.</returns>
        IRepository<TEntity> GetRepository<TEntity>() where TEntity : BaseEntity;

        /// <summary>
        /// Асинхронно зберігає всі зміни, зроблені в контексті поточної одиниці роботи.
        /// Зазвичай викликає SaveChangesAsync у DbContext.
        /// </summary>
        /// <returns>Кількість змінених записів у базі даних.</returns>
        Task<int> SaveChangesAsync();

        IChallengeRepository Challenges { get; }
        IChallengeParticipantRepository ChallengeParticipants { get; }
        IRecipeRepository Recipes { get; }
    }
}