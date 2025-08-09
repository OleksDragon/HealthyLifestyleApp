using AutoMapper;
using HealthyLifestyle.Application.DTOs.User;
using HealthyLifestyle.Application.Interfaces.User;
using HealthyLifestyle.Core.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace HealthyLifestyle.Application.Services.UserS
{
    /// <summary>
    /// Сервіс для управління профілями користувачів, включаючи отримання, оновлення та видалення профілів.
    /// Реалізує контракт <see cref="IUserService"/> для забезпечення уніфікованого API.
    /// </summary>
    public class UserService : IUserService
    {
        private readonly UserManager<User> _userManager;
        private readonly IMapper _mapper;

        /// <summary>
        /// Ініціалізує новий екземпляр <see cref="UserService"/> з необхідними залежностями.
        /// </summary>
        /// <param name="userManager">Менеджер користувачів для роботи з Identity.</param>
        /// <param name="mapper">Екземпляр AutoMapper для мапінгу об’єктів.</param>
        /// <exception cref="ArgumentNullException">Виникає, якщо <paramref name="userManager"/> або <paramref name="mapper"/> є null.</exception>
        public UserService(UserManager<User> userManager, IMapper mapper)
        {
            _userManager = userManager ?? throw new ArgumentNullException(nameof(userManager));
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
        }

        /// <summary>
        /// Отримує профіль користувача за його унікальним ідентифікатором.
        /// </summary>
        /// <param name="userId">Унікальний ідентифікатор користувача (Guid).</param>
        /// <returns>Об’єкт <see cref="UserDto"/> із даними профілю або null, якщо користувач не знайдений.</returns>
        public async Task<UserDto?> GetUserProfileAsync(Guid userId)
        {
            var user = await _userManager.FindByIdAsync(userId.ToString());
            return user == null ? null : _mapper.Map<UserDto>(user);
        }

        /// <summary>
        /// Оновлює профіль користувача на основі наданих даних.
        /// </summary>
        /// <param name="userId">Унікальний ідентифікатор користувача (Guid).</param>
        /// <param name="updateDto">DTO з новими даними для оновлення профілю.</param>
        /// <returns>Об’єкт <see cref="UserDto"/> з оновленими даними або null, якщо оновлення не вдалося.</returns>
        /// <exception cref="ArgumentNullException">Виникає, якщо <paramref name="updateDto"/> є null.</exception>
        public async Task<UserDto?> UpdateUserProfileAsync(Guid userId, UpdateUserDto updateDto)
        {
            if (updateDto == null) throw new ArgumentNullException(nameof(updateDto));

            var user = await _userManager.FindByIdAsync(userId.ToString());
            if (user == null) return null;

            // Оновлення профілю через метод сутності для контролю логіки
            user.UpdateProfile(
                fullName: updateDto.FullName,
                dateOfBirth: updateDto.DateOfBirth,
                gender: updateDto.Gender,
                weight: updateDto.Weight,
                height: updateDto.Height,
                profilePictureUrl: updateDto.ProfilePictureUrl,
                bio: updateDto.Bio
            );

            var result = await _userManager.UpdateAsync(user);
            return result.Succeeded ? _mapper.Map<UserDto>(user) : null;
        }

        /// <summary>
        /// Видаляє профіль користувача за його унікальним ідентифікатором.
        /// </summary>
        /// <param name="userId">Унікальний ідентифікатор користувача (Guid).</param>
        /// <returns><c>true</c>, якщо видалення успішне; інакше <c>false</c>.</returns>
        public async Task<bool> DeleteUserAsync(Guid userId)
        {
            var user = await _userManager.FindByIdAsync(userId.ToString());
            if (user == null) return false;

            var result = await _userManager.DeleteAsync(user);
            return result.Succeeded;
        }

        /// <summary>
        /// Отримує список усіх користувачів у системі.
        /// </summary>
        /// <returns>Колекція об’єктів <see cref="UserDto"/> із даними профілів.</returns>
        public async Task<IEnumerable<UserDto>> GetAllUsersAsync()
        {
            var users = await _userManager.Users.OrderBy(u => u.Email).ToListAsync();
            return _mapper.Map<IEnumerable<UserDto>>(users);
        }
    }
}