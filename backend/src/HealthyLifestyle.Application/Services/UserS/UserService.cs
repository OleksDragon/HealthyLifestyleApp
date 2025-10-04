using AutoMapper;
using HealthyLifestyle.Application.DTOs.User;
using HealthyLifestyle.Application.Interfaces.ObjectStorage;
using HealthyLifestyle.Application.Interfaces.User;
using HealthyLifestyle.Core.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Globalization;

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
        private readonly IObjectStorageService _objectStorageService;

        /// <summary>
        /// Ініціалізує новий екземпляр <see cref="UserService"/> з необхідними залежностями.
        /// </summary>
        /// <param name="userManager">Менеджер користувачів для роботи з Identity.</param>
        /// <param name="mapper">Екземпляр AutoMapper для мапінгу об’єктів.</param>
        /// <exception cref="ArgumentNullException">Виникає, якщо <paramref name="userManager"/> або <paramref name="mapper"/> є null.</exception>
        public UserService(UserManager<User> userManager, IMapper mapper, IObjectStorageService objectStorageService)
        {
            _userManager = userManager ?? throw new ArgumentNullException(nameof(userManager));
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
            _objectStorageService = objectStorageService ?? throw new ArgumentNullException(nameof(objectStorageService));

        }

        /// <summary>
        /// Отримує профіль користувача за його унікальним ідентифікатором.
        /// </summary>
        /// <param name="userId">Унікальний ідентифікатор користувача (Guid).</param>
        /// <returns>Об’єкт <see cref="UserDto"/> із даними профілю або null, якщо користувач не знайдений.</returns>
        //public async Task<UserDto?> GetUserProfileAsync(Guid userId)
        //{
        //    var user = await _userManager.FindByIdAsync(userId.ToString());
        //    return user == null ? null : _mapper.Map<UserDto>(user);
        //}
        public async Task<UserDto?> GetUserProfileAsync(Guid userId)
        {
            var user = await _userManager.FindByIdAsync(userId.ToString());
            if (user == null) return null;

            var userDto = _mapper.Map<UserDto>(user);

            if (!string.IsNullOrEmpty(user.ProfilePictureUrl))
            {
                // Якщо ти зберігаєш objectName у БД
                userDto.ProfilePictureUrl = await _objectStorageService.GetPresignedUrlAsync(user.ProfilePictureUrl, 3600);
            }

            return userDto;
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

            //double? weightValue = null;
            //if (!string.IsNullOrEmpty(updateDto.Weight) && double.TryParse(updateDto.Weight, out double w))
            //{
            //    weightValue = w;
            //}

            //double? heightValue = null;
            //if (!string.IsNullOrEmpty(updateDto.Height) && double.TryParse(updateDto.Height, out double h))
            //{
            //    heightValue = h;
            //}

            double? weightValue = null;
            if (!string.IsNullOrEmpty(updateDto.Weight) &&
                double.TryParse(updateDto.Weight, NumberStyles.Any, CultureInfo.InvariantCulture, out double w))
            {
                weightValue = w;
            }

            double? heightValue = null;
            if (!string.IsNullOrEmpty(updateDto.Height) &&
                double.TryParse(updateDto.Height, NumberStyles.Any, CultureInfo.InvariantCulture, out double h))
            {
                heightValue = h;
            }


            // Робота з зображенням профілю
            if (updateDto.ProfilePictureFile != null)
            {
                // Якщо вже є старе зображення — видаляємо
                if (!string.IsNullOrEmpty(user.ProfilePictureUrl))
                {
                    await _objectStorageService.DeleteFileAsync(user.ProfilePictureUrl);
                }

                //var fileName = $"{userId}_{Guid.NewGuid()}{Path.GetExtension(updateDto.ProfilePictureFile.FileName)}";

                // Завантажуємо нове
                //user.ProfilePictureUrl = await _objectStorageService.UploadFileAsync(
                //    updateDto.ProfilePictureFile.OpenReadStream(),
                //    fileName,
                //    updateDto.ProfilePictureFile.ContentType
                //);

                var fileName = $"{userId}_{Guid.NewGuid()}{Path.GetExtension(updateDto.ProfilePictureFile.FileName)}";

                await _objectStorageService.UploadFileAsync(updateDto.ProfilePictureFile.OpenReadStream(), fileName, updateDto.ProfilePictureFile.ContentType);
                user.ProfilePictureUrl = fileName;

            }
            else if (updateDto.ProfilePictureUrl == "")
            {
                // Сигнал видалити існуюче зображення
                if (!string.IsNullOrEmpty(user.ProfilePictureUrl))
                {
                    await _objectStorageService.DeleteFileAsync(user.ProfilePictureUrl);
                    user.ProfilePictureUrl = null;
                }
            }
            else if (!string.IsNullOrEmpty(updateDto.ProfilePictureUrl))
            {
                // Якщо передано прямий URL (наприклад, із Google OAuth)
                user.ProfilePictureUrl = updateDto.ProfilePictureUrl;
            }

            user.UpdateProfile(
                fullName: updateDto.FullName,
                dateOfBirth: updateDto.DateOfBirth,
                gender: updateDto.Gender,
                weight: weightValue,
                height: heightValue,
                profilePictureUrl: user.ProfilePictureUrl,
                bio: updateDto.Bio,
                phone: updateDto.Phone,
                country: updateDto.Country,
                city: updateDto.City,
                street: updateDto.Street
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

            // Якщо у користувача є зображення, видаляємо його зі сховища
            if (!string.IsNullOrEmpty(user.ProfilePictureUrl))
            {
                await _objectStorageService.DeleteFileAsync(user.ProfilePictureUrl);
            }

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