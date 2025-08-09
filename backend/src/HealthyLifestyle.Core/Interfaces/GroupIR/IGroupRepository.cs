using HealthyLifestyle.Core.Entities;

namespace HealthyLifestyle.Core.Interfaces.GroupIR
{
    /// <summary>
    /// Спеціалізований інтерфейс репозиторію для сутності Group.
    /// Розширює загальний IRepository, надаючи специфічні операції для групи.
    /// </summary>
    public interface IGroupRepository : IRepository<Group>
    {
        // Приклад: Якщо вам знадобиться специфічний для Consultation метод,
        // який не є загальним CRUD, ви можете додати його сюди.

        /// <summary>
        /// Асинхронно отримує групу за його унікальним ідентифікатором разом із учасниками групи.
        /// </summary>
        /// <param name="orderId">Унікальний ідентифікатор групи.</param>
        /// <returns>Об’єкт групи з учасниками, якщо знайдено; інакше null.</returns>
        Task<Group?> GetGroupByIdWithMembersAsync(Guid groupId);

        /// <summary>
        /// Асинхронно отримує всі групи в системі разом із даними користувачів.
        /// </summary>
        /// <returns>Колекція всіх груп із пов’язаними даними.</returns>
        Task<IEnumerable<Group>> GetAllGroupsWithMembershipsAsync();
    }
}
