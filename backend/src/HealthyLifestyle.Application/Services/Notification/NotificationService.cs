using AutoMapper;
using HealthyLifestyle.Application.DTOs.Notification;
using HealthyLifestyle.Application.Interfaces.Notification;
using HealthyLifestyle.Core.Entities;
using HealthyLifestyle.Core.Interfaces;
using HealthyLifestyle.Core.Interfaces.NotificationIR;

namespace YourProject.Application.Services
{
    public class NotificationService : INotificationService
    {
        private readonly INotificationRepository _notificationRepository;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public NotificationService(INotificationRepository notificationRepository, IUnitOfWork unitOfWork, IMapper mapper)
        {
            _notificationRepository = notificationRepository;
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<NotificationDto?> GetNotificationByIdAsync(Guid id)
        {
            var notification = await _notificationRepository.GetByIdAsync(id);
            return notification is null ? null : _mapper.Map<NotificationDto>(notification);
        }

        public async Task<IEnumerable<NotificationDto>> GetNotificationsByUserIdAsync(Guid userId)
        {
            var notifications = await _notificationRepository.GetByUserIdAsync(userId);
            return _mapper.Map<IEnumerable<NotificationDto>>(notifications);
        }

        public async Task<NotificationDto> CreateNotificationAsync(CreateNotificationDto notificationCreateDto)
        {
            try
            {
                var notification = _mapper.Map<Notification>(notificationCreateDto);
                notification.CreatedAt = DateTime.UtcNow;
                notification.IsRead = false;

                await _notificationRepository.AddAsync(notification);
                await _unitOfWork.SaveChangesAsync();

                return _mapper.Map<NotificationDto>(notification);
            }
            catch (Exception ex)
            {
                // Тут можна використати логування або кинути внутрішню помилку у response
                throw new Exception("Помилка при створенні сповіщення", ex);
            }
        }
    

        public async Task MarkAsReadAsync(Guid id)
        {
            var notification = await _notificationRepository.GetByIdAsync(id);
            if (notification is null)
                throw new KeyNotFoundException($"Notification with ID '{id}' not found.");

            notification.IsRead = true;
            _notificationRepository.Update(notification);
            await _unitOfWork.SaveChangesAsync();
        }

        public async Task MarkAsUnreadAsync(Guid id)
        {
            var notification = await _notificationRepository.GetByIdAsync(id);
            if (notification is null)
                throw new KeyNotFoundException($"Notification with ID '{id}' not found.");

            notification.IsRead = false;
            _notificationRepository.Update(notification);
            await _unitOfWork.SaveChangesAsync();
        }

        public async Task UpdateMessageAsync(Guid id, string newMessage)
        {
            var notification = await _notificationRepository.GetByIdAsync(id);
            if (notification is null)
                throw new KeyNotFoundException($"Notification with ID '{id}' not found.");

            notification.Message = newMessage;
            _notificationRepository.Update(notification);
            await _unitOfWork.SaveChangesAsync();
        }

        public async Task DeleteNotificationAsync(Guid id)
        {
            var notification = await _notificationRepository.GetByIdAsync(id);
            if (notification is null)
                throw new KeyNotFoundException($"Notification with ID '{id}' not found.");

            _notificationRepository.Delete(notification);
            await _unitOfWork.SaveChangesAsync();
        }
    }
}
