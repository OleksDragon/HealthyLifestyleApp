using HealthyLifestyle.Core.Entities;
using HealthyLifestyle.Core.Interfaces;
using HealthyLifestyle.Core.Interfaces.Challenge;
using HealthyLifestyle.Core.Interfaces.MealTracker;
using HealthyLifestyle.Core.Interfaces.SubscriptionIR;
using HealthyLifestyle.Infrastructure.Data;
using HealthyLifestyle.Infrastructure.Repositories;
using HealthyLifestyle.Infrastructure.Repositories.Challenge;
using HealthyLifestyle.Infrastructure.Repositories.SubscriptionR;

namespace HealthyLifestyle.Infrastructure.UnitOfWork
{
    /// <summary>
    /// Реалізація патерну Unit of Work.
    /// Керує життєвим циклом <see cref="ApplicationDbContext"/> та репозиторіями.
    /// Забезпечує атомарність транзакцій при роботі з декількома репозиторіями.
    /// </summary>
    public class UnitOfWork : IUnitOfWork, IDisposable
    {
        private readonly ApplicationDbContext _dbContext;

        private IChallengeRepository? _challengeRepository;
        private IRecipeRepository? _recipeRepository;
        private IChallengeParticipantRepository? _challengeParticipantRepository;

        /// <summary>
        /// Репозиторій для керування учасниками сімейних підписок.
        /// </summary>
        private IFamilySubscriptionRepository? _familySubscriptionRepository;

        /// <summary>
        /// Словник для зберігання створених репозиторіїв за типом сутності.
        /// </summary>
        private readonly Dictionary<Type, object> _repositories;

        /// <summary>
        /// Ініціалізує новий екземпляр <see cref="UnitOfWork"/>.
        /// </summary>
        /// <param name="dbContext">Екземпляр <see cref="ApplicationDbContext"/>.</param>
        public UnitOfWork(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext ?? throw new ArgumentNullException(nameof(dbContext));
            _repositories = new Dictionary<Type, object>();
        }

        /// <summary>
        /// Отримує репозиторій для вказаного типу сутності.
        /// При першому зверненні створюється новий репозиторій та кешується.
        /// </summary>
        /// <typeparam name="TEntity">Тип сутності, що наслідує <see cref="BaseEntity"/>.</typeparam>
        /// <returns>Екземпляр <see cref="IRepository{TEntity}"/> для вказаного типу.</returns>
        public IRepository<TEntity> GetRepository<TEntity>() where TEntity : BaseEntity
        {
            var entityType = typeof(TEntity);

            if (_repositories.ContainsKey(entityType))
            {
                return (IRepository<TEntity>)_repositories[entityType];
            }

            var repository = new Repository<TEntity>(_dbContext);
            _repositories.Add(entityType, repository);

            return repository;
        }

        public IChallengeRepository Challenges =>
            _challengeRepository ??= new ChallengeRepository(_dbContext);

        public IChallengeParticipantRepository ChallengeParticipants =>
            _challengeParticipantRepository ??= new ChallengeParticipantRepository(_dbContext);

        public IRecipeRepository Recipes =>
            _recipeRepository ??= new RecipeRepository(_dbContext);

        /// <summary>
        /// Доступ до репозиторію сімейних підписок (Family Plan).
        /// </summary>
        public IFamilySubscriptionRepository FamilySubscriptions =>
        _familySubscriptionRepository ??= new FamilySubscriptionRepository(_dbContext);

        /// <summary>
        /// Асинхронно зберігає всі зміни в контексті бази даних.
        /// </summary>
        /// <returns>Кількість зачеплених рядків у базі даних.</returns>
        public async Task<int> SaveChangesAsync()
        {
            return await _dbContext.SaveChangesAsync();
        }

        /// <summary>
        /// Звільняє ресурси, що використовуються Unit of Work та контекстом бази даних.
        /// </summary>
        public void Dispose()
        {
            _dbContext.Dispose();
            GC.SuppressFinalize(this);
        }
    }
}