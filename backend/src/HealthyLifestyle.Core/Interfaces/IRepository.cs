using HealthyLifestyle.Core.Entities;
using System.Linq.Expressions;

namespace HealthyLifestyle.Core.Interfaces
{
    /// <summary>
    /// Універсальний інтерфейс репозиторію для базових операцій CRUD.
    /// </summary>
    /// <typeparam name="TEntity">Тип сутності.</typeparam>
    public interface IRepository<TEntity> where TEntity : BaseEntity
    {
        /// <summary>
        /// Асинхронно отримує сутність за її унікальним ідентифікатором.
        /// </summary>
        /// <param name="id">Ідентифікатор сутності.</param>
        /// <returns>Сутність або null, якщо не знайдено.</returns>
        Task<TEntity?> GetByIdAsync(Guid id);

        /// <summary>
        /// Асинхронно повертає всі сутності даного типу.
        /// </summary>
        /// <returns>Колекція всіх сутностей.</returns>
        Task<IEnumerable<TEntity>> GetAllAsync();

        /// <summary>
        /// Асинхронно додає нову сутність до репозиторію.
        /// </summary>
        /// <param name="entity">Сутність для додавання.</param>
        Task AddAsync(TEntity entity);

        /// <summary>
        /// Оновлює існуючу сутність.
        /// </summary>
        /// <param name="entity">Сутність для оновлення.</param>
        void Update(TEntity entity);

        /// <summary>
        /// Видаляє вказану сутність.
        /// </summary>
        /// <param name="entity">Сутність для видалення.</param>
        void Delete(TEntity entity);

        /// <summary>
        /// Повертає IQueryable для створення складних LINQ-запитів.
        /// Використовується для кастомної фільтрації/сортування без негайного виконання запиту.
        /// </summary>
        /// <returns>IQueryable для поточного набору сутностей.</returns>
        IQueryable<TEntity> AsQueryable();

        /// <summary>
        /// Асинхронно отримує колекцію сутностей, що задовольняють заданому предикату (умові).
        /// </summary>
        /// <param name="predicate">Вираз предиката для фільтрації.</param>
        /// <returns>Колекція відфільтрованих сутностей.</returns>
        Task<IEnumerable<TEntity>> FindAsync(Expression<Func<TEntity, bool>> predicate);
    }
}