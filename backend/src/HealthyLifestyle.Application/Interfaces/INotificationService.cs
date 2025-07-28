using HealthyLifestyle.Application.DTOs.Notification;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HealthyLifestyle.Application.Interfaces
{
    public interface INotificationService
    {
        /// <summary>
        /// Отримує повідомлення за його ідентифікатором.
        /// </summary>
        /// <param name="id">Ідентифікатор повідомлення.</param>
        /// <returns>Об'єкт NotificationDto, якщо повідомлення знайдено; інакше null.</returns>
        Task<NotificationDto?> GetNotificationByIdAsync(Guid id);

        /// <summary>
        /// Отримує всі повідомлення для заданого користувача.
        /// </summary>
        /// <param name="userId">Ідентифікатор користувача.</param>
        /// <returns>Колекція повідомлень.</returns>
        Task<IEnumerable<NotificationDto>> GetNotificationsByUserIdAsync(Guid userId);

        /// <summary>
        /// Створює нове повідомлення.
        /// </summary>
        /// <param name="notificationCreateDto">Дані для створення повідомлення.</param>
        /// <returns>Щойно створене повідомлення.</returns>
        Task<NotificationDto> CreateNotificationAsync(CreateNotificationDto notificationCreateDto);

        /// <summary>
        /// Позначає повідомлення як прочитане.
        /// </summary>
        /// <param name="id">Ідентифікатор повідомлення.</param>
        Task MarkAsReadAsync(Guid id);

        /// <summary>
        /// Позначає повідомлення як непрочитане.
        /// </summary>
        /// <param name="id">Ідентифікатор повідомлення.</param>
        Task MarkAsUnreadAsync(Guid id);

        /// <summary>
        /// Оновлює текст повідомлення.
        /// </summary>
        /// <param name="id">Ідентифікатор повідомлення.</param>
        /// <param name="newMessage">Новий текст повідомлення.</param>
        Task UpdateMessageAsync(Guid id, string newMessage);

        /// <summary>
        /// Видаляє повідомлення.
        /// </summary>
        /// <param name="id">Ідентифікатор повідомлення.</param>
        Task DeleteNotificationAsync(Guid id);
    }

}
