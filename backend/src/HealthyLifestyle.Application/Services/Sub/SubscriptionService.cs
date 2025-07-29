using AutoMapper;
using HealthyLifestyle.Application.DTOs.Sub;
using HealthyLifestyle.Application.DTOs.Tracker;
using HealthyLifestyle.Application.Interfaces;
using HealthyLifestyle.Core.Entities;
using HealthyLifestyle.Core.Enums;
using HealthyLifestyle.Core.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HealthyLifestyle.Application.Services.Sub
{
    public class SubscriptionService : ISubscriptionService
    {
        private readonly ISubscriptionRepository _subscriptionRepository;
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;

        public SubscriptionService(
            ISubscriptionRepository subscriptionRepository,
            IMapper mapper,
            IUnitOfWork unitOfWork)
        {
            _subscriptionRepository = subscriptionRepository;
            _mapper = mapper;
            _unitOfWork = unitOfWork;
        }


        public async Task<SubscriptionDto> CreateSubscriptionAsync(SubscriptionCreateDto createDto)
        {
            var activeSubscriptions = await _subscriptionRepository.GetActiveSubscriptionsByUserIdAsync(createDto.UserId);

            if (activeSubscriptions.Any())
            {
                throw new InvalidOperationException("Користувач вже має активну підписку, діждіться терміну дії підписки або скасуйте її!");
            }

            var subscription = _mapper.Map<Subscription>(createDto);

            await _subscriptionRepository.AddAsync(subscription);
            await _unitOfWork.SaveChangesAsync();

            return _mapper.Map<SubscriptionDto>(subscription);
        }

        public async Task DeleteSubscriptionAsync(Guid id)
        {
            var subscription = await _subscriptionRepository.GetByIdAsync(id);
            if (subscription == null)
            {
                throw new ArgumentException($"Запис підписки користувача з ID {id} не знайдено.");
            }

            _subscriptionRepository.Delete(subscription);
            await _unitOfWork.SaveChangesAsync();
        }

        public async Task<IEnumerable<SubscriptionDto>> GetAllSubscriptionsAsync()
        {
            var subscription = await _subscriptionRepository.GetAllAsync();
            return _mapper.Map<IEnumerable<SubscriptionDto>>(subscription);
        }

        public async Task<List<SubscriptionDto>> GetSubscriptionsByIdAsync(Guid id)
        {
            var subscription = await _subscriptionRepository.GetSubscriptionsByUserIdAsync(id);
            if (subscription == null)
            {
                throw new KeyNotFoundException($"Запис підписки користувача з ID '{id}' не знайдено.");
            }

            return _mapper.Map<List<SubscriptionDto>>(subscription);
        }

        public async Task<SubscriptionDto> UpdateSubscriptionAsync(Guid id, SubscriptionUpdateDto updateDto)
        {
            var subscription = await _subscriptionRepository.GetByIdAsync(id);
            if (subscription == null)
            {
                throw new InvalidOperationException($"Запис підписки користувача з ID {id} не знайдено.");
            }

            if(updateDto.Status == SubscriptionStatus.Active)
            {
                var activeSubscriptions = await _subscriptionRepository.GetActiveSubscriptionsByUserIdAsync(subscription.UserId);

                // Відфільтруємо поточну підписку (якщо вона активна)
                var otherActiveSubscriptions = activeSubscriptions
                    .Where(s => s.Id != id)
                    .ToList();

                if (otherActiveSubscriptions.Any())
                {
                    throw new InvalidOperationException(
                        "Користувач вже має активну підписку, діждіться терміну дії підписки або скасуйте її!");
                }
            }

            _mapper.Map(updateDto, subscription);
            _subscriptionRepository.Update(subscription);
            await _unitOfWork.SaveChangesAsync();

            return _mapper.Map<SubscriptionDto>(subscription);
        }

        public async Task RenewSubscriptionAsync(Guid id, DateTime newEndDate)
        {
            var subscription = await _subscriptionRepository.GetByIdAsync(id);
            if (subscription == null)
            {
                throw new InvalidOperationException($"Запис підписки користувача з ID {id} не знайдено.");
            }

            var activeSubscriptions = await _subscriptionRepository.GetActiveSubscriptionsByUserIdAsync(subscription.UserId);

            if (activeSubscriptions.Any())
            {
                throw new InvalidOperationException("Користувач вже має активну підписку, діждіться терміну дії підписки або скасуйте її!");
            }

            subscription.Renew(newEndDate);
            _subscriptionRepository.Update(subscription);
            await _unitOfWork.SaveChangesAsync();
        }

        public async Task CancelSubscriptionAsync(Guid id)
        {
            var subscription = await _subscriptionRepository.GetByIdAsync(id);
            if (subscription == null)
            {
                throw new ArgumentException($"Запис підписки користувача з ID {id} не знайдено.");
            }

            subscription.Cancel();
            _subscriptionRepository.Update(subscription);
            await _unitOfWork.SaveChangesAsync();
        }

        public async Task ExpireSubscriptionAsync(Guid id)
        {
            var subscription = await _subscriptionRepository.GetByIdAsync(id);
            if (subscription == null)
            {
                throw new ArgumentException($"Запис підписки користувача з ID {id} не знайдено.");
            }

            if(subscription.Status == SubscriptionStatus.Active && subscription.GetRemainingDays() < 0)
            {
                subscription.Status = SubscriptionStatus.Expired;
                subscription.SetUpdatedAt();
            } else
            {
                throw new ArgumentException($"Підписка з ID {id} не може бути позначена як прострочена, оскільки дата підписки ще не вийшла або підписка вже має не активниий статус");
            }
                _subscriptionRepository.Update(subscription);
            await _unitOfWork.SaveChangesAsync();
        }
    }
}
