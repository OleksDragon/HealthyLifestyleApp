using HealthyLifestyle.Core.Entities;

namespace HealthyLifestyle.Core.Interfaces
{
    /// <summary>
    /// Репозиторий для управления пользователями.
    /// </summary>
    public interface IUserRepository
    {
        Task<User?> GetByIdAsync(Guid id);
        Task<IEnumerable<User>> GetAllAsync();
        Task AddAsync(User user);
        Task UpdateAsync(User user);
        Task DeleteAsync(Guid id);
    }
}
