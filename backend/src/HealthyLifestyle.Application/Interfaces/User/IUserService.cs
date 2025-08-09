using HealthyLifestyle.Application.DTOs.User;

namespace HealthyLifestyle.Application.Interfaces.User
{
    /// <summary>
    /// Інтерфейс сервісу для управління профілями користувачів.
    /// Надає методи для отримання, оновлення та видалення профілів, а також отримання списку всіх користувачів.
    /// </summary>
    public interface IUserService
    {
        /// <summary>
        /// Отримує профіль користувача за його унікальним ідентифікатором.
        /// </summary>
        /// <param name="userId">Унікальний ідентифікатор користувача (GUID).</param>
        /// <returns>
        /// Об’єкт <see cref="UserDto"/>, що містить дані профілю користувача, або <c>null</c>, якщо користувач не знайдений.
        /// </returns>
        Task<UserDto?> GetUserProfileAsync(Guid userId);

        /// <summary>
        /// Оновлює профіль користувача на основі наданих даних.
        /// </summary>
        /// <param name="userId">Унікальний ідентифікатор користувача (GUID).</param>
        /// <param name="updateDto">Об’єкт <see cref="UpdateUserDto"/> із новими даними для оновлення профілю.</param>
        /// <returns>
        /// Об’єкт <see cref="UserDto"/> з оновленими даними профілю або <c>null</c>, якщо оновлення не вдалося або користувач не знайдений.
        /// </returns>
        /// <exception cref="ArgumentNullException">Виникає, якщо <paramref name="updateDto"/> є <c>null</c>.</exception>
        Task<UserDto?> UpdateUserProfileAsync(Guid userId, UpdateUserDto updateDto);

        /// <summary>
        /// Видаляє профіль користувача за його унікальним ідентифікатором.
        /// </summary>
        /// <param name="userId">Унікальний ідентифікатор користувача (GUID).</param>
        /// <returns>
        /// <c>true</c>, якщо користувач успішно видалений; інакше <c>false</c>.
        /// </returns>
        Task<bool> DeleteUserAsync(Guid userId);

        /// <summary>
        /// Отримує список усіх профілів користувачів.
        /// </summary>
        /// <returns>Колекція об’єктів <see cref="UserDto"/>, що містять дані всіх користувачів.</returns>
        Task<IEnumerable<UserDto>> GetAllUsersAsync();
    }
}