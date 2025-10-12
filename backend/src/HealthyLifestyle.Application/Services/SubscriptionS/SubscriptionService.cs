using AutoMapper;
using HealthyLifestyle.Application.DTOs.Subscription;
using HealthyLifestyle.Application.Interfaces.Subscription;
using HealthyLifestyle.Core.Entities;
using HealthyLifestyle.Core.Enums;
using HealthyLifestyle.Core.Interfaces;
using HealthyLifestyle.Core.Interfaces.SubscriptionIR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace HealthyLifestyle.Application.Services.SubscriptionS
{
    public class SubscriptionService : ISubscriptionService
    {
        private readonly ISubscriptionRepository _subscriptionRepository;
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;
        private readonly UserManager<User> _userManager;

        public SubscriptionService(
            ISubscriptionRepository subscriptionRepository,
            IMapper mapper,
            IUnitOfWork unitOfWork,
            UserManager<User> userManager)
        {
            _subscriptionRepository = subscriptionRepository;
            _mapper = mapper;
            _unitOfWork = unitOfWork;
            _userManager = userManager;
        }

        #region --- Base Subscriptions ---

        public async Task<SubscriptionDto> CreateSubscriptionAsync(SubscriptionCreateDto createDto)
        {
            // Перевіряємо, чи користувач вже має активну власну підписку
            var activeSubscriptions = await _subscriptionRepository.GetActiveSubscriptionsByUserIdAsync(createDto.UserId);

            if (activeSubscriptions.Any())
            {
                throw new InvalidOperationException("Користувач вже має активну підписку, діждіться терміну дії підписки або скасуйте її!");
            }

            // Перевіряємо, чи користувач є членом активної сімейної підписки
            var familyRepo = _unitOfWork.FamilySubscriptions;
            var activeFamilyMembership = await familyRepo.GetActiveFamilyMembershipByUserIdAsync(createDto.UserId);

            if (activeFamilyMembership != null)
            {
                throw new InvalidOperationException("Користувач є членом активної сімейної підписки. Спочатку потрібно вийти з сімейної підписки або дочекатися її закінчення!");
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
            var subscription = await _subscriptionRepository.GetAllWithMembersAsync();
            return _mapper.Map<IEnumerable<SubscriptionDto>>(subscription);
        }

        public async Task<List<SubscriptionDto>> GetSubscriptionsByUserIdAsync(Guid id)
        {
            var subscription = await _subscriptionRepository.GetSubscriptionsByUserIdWithMembersAsync(id);
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

            // Перевіряємо, чи користувач не є членом активної сімейної підписки
            var familyRepo = _unitOfWork.FamilySubscriptions;
            var activeFamilyMembership = await familyRepo.GetActiveFamilyMembershipByUserIdAsync(subscription.UserId);

            if (activeFamilyMembership != null)
            {
                throw new InvalidOperationException("Користувач є членом активної сімейної підписки. Спочатку потрібно вийти з сімейної підписки!");
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
            var subscription = await _subscriptionRepository.GetByIdAsync(id)
                ?? throw new KeyNotFoundException($"Підписку з ID {id} не знайдено.");

            // Якщо вже не активна — не можна позначати ще раз
            if (subscription.Status != SubscriptionStatus.Active)
                throw new InvalidOperationException("Підписка не є активною, тому не може бути позначена як прострочена.");

            // Якщо термін ще не вийшов — також не можна
            if (subscription.EndDate > DateTime.UtcNow)
                throw new InvalidOperationException("Термін дії підписки ще не минув.");

            // Позначаємо як прострочену через метод доменної моделі
            subscription.MarkAsExpired();

            _subscriptionRepository.Update(subscription);
            await _unitOfWork.SaveChangesAsync();
        }

        public async Task<SubscriptionDto?> CheckAndUpdateSubscriptionStatusAsync(Guid userId)
        {
            // Спочатку перевіряємо, чи користувач має власну активну підписку
            var activeSubscriptions = await _subscriptionRepository.GetActiveSubscriptionsByUserIdWithMembersAsync(userId);

            if (activeSubscriptions.Any())
            {
                var subscription = activeSubscriptions.First();

                // Якщо термін дії минув — позначаємо як Expired
                if (subscription.EndDate <= DateTime.UtcNow)
                {
                    subscription.MarkAsExpired();
                    _subscriptionRepository.Update(subscription);
                    await _unitOfWork.SaveChangesAsync();
                    return null;
                }

                return _mapper.Map<SubscriptionDto>(subscription);
            }

            // Якщо немає власної підписки — перевіряємо, чи користувач є членом сімейної
            var familyRepo = _unitOfWork.FamilySubscriptions;

            var memberRecord = await familyRepo.GetActiveFamilyMembershipByUserIdAsync(userId);

            if (memberRecord?.Subscription != null)
            {
                var subscription = memberRecord.Subscription;

                if (subscription.EndDate <= DateTime.UtcNow)
                {
                    subscription.MarkAsExpired();
                    _subscriptionRepository.Update(subscription);
                    await _unitOfWork.SaveChangesAsync();
                    return null;
                }

                var dto = _mapper.Map<SubscriptionDto>(subscription);
                dto.IsFamilyMember = true;
                return dto;
            }

            // Якщо користувач ніде не знайдений
            return null;
        }


        #endregion

        #region --- Family Subscription ---

        public async Task<SubscriptionDto> CreateFamilySubscriptionAsync(FamilySubscriptionCreateDto createDto)
        {
            var familyRepo = _unitOfWork.FamilySubscriptions;

            // Перевіряємо, чи вже є активна сімейна підписка у власника
            var activeSubscriptions = await _subscriptionRepository.GetActiveSubscriptionsByUserIdAsync(createDto.OwnerId);
            if (activeSubscriptions.Any(s => s.Type == SubscriptionType.Family))
            {
                throw new InvalidOperationException("Користувач вже має активну сімейну підписку!");
            }

            // Створюємо ОДНУ підписку типу Family для власника
            var familySubscription = _mapper.Map<Subscription>(createDto);
            familySubscription.Id = Guid.NewGuid();

            await _subscriptionRepository.AddAsync(familySubscription);
            await _unitOfWork.SaveChangesAsync();

            // Додаємо членів сім'ї до цієї підписки
            var foundMembers = new List<FamilySubscriptionMember>();
            var notFoundEmails = new List<string>();

            foreach (var email in createDto.MemberEmails.Distinct().Take(3))
            {
                var user = await _userManager.Users
                    .FirstOrDefaultAsync(u => u.Email != null && u.Email.ToLower() == email.ToLower());

                if (user != null)
                {
                    // Перевіряємо, чи користувач вже не має активної підписки
                    var userActiveSubscriptions = await _subscriptionRepository.GetActiveSubscriptionsByUserIdAsync(user.Id);
                    if (userActiveSubscriptions.Any())
                    {
                        notFoundEmails.Add($"{email} (вже має активну підписку)");
                        continue;
                    }

                    // Додаткова перевірка: чи користувач вже не є членом іншої сімейної підписки
                    var existingFamilyMembership = await familyRepo.GetActiveFamilyMembershipByUserIdAsync(user.Id);
                    if (existingFamilyMembership != null)
                    {
                        notFoundEmails.Add($"{email} (вже є членом іншої сімейної підписки)");
                        continue;
                    }

                    foundMembers.Add(new FamilySubscriptionMember
                    {
                        SubscriptionId = familySubscription.Id,
                        MemberId = user.Id,
                        AddedAt = DateTime.UtcNow
                    });
                }
                else
                {
                    notFoundEmails.Add(email);
                }
            }

            if (foundMembers.Any())
            {
                await familyRepo.AddMembersAsync(foundMembers);
                await _unitOfWork.SaveChangesAsync();
            }

            // Завантажуємо повну інформацію про підписку з членами
            var updatedFamilySubscription = await _subscriptionRepository
                .GetByIdWithMembersAsync(familySubscription.Id);

            var dto = _mapper.Map<SubscriptionDto>(updatedFamilySubscription);
            dto.NotFoundEmails = notFoundEmails.Any() ? notFoundEmails : null;

            return dto;
        }

        public async Task<FamilySubscriptionUpdateResultDto> UpdateFamilyMembersAsync(Guid subscriptionId, List<string> memberEmails)
        {
            var familyRepo = _unitOfWork.FamilySubscriptions;

            // Отримуємо поточну підписку
            var subscription = await _subscriptionRepository.GetByIdWithMembersAsync(subscriptionId);
            if (subscription == null)
                throw new KeyNotFoundException($"Підписку з ID {subscriptionId} не знайдено.");

            // Отримуємо поточних членів
            var currentMembers = await familyRepo.GetMembersBySubscriptionIdAsync(subscriptionId);

            // Видаляємо всіх поточних членів (крім власника)
            foreach (var member in currentMembers)
            {
                familyRepo.Delete(member);
            }

            // Додаємо нових членів
            var foundMembers = new List<FamilySubscriptionMember>();
            var notFoundEmails = new List<string>();

            foreach (var email in memberEmails.Distinct().Take(3))
            {
                var user = await _userManager.Users
                    .FirstOrDefaultAsync(u => u.Email != null && u.Email.ToLower() == email.ToLower());

                if (user != null)
                {
                    // Перевірка, чи користувач не є власником
                    if (user.Id == subscription.UserId)
                    {
                        notFoundEmails.Add($"{email} (це власник підписки)");
                        continue;
                    }

                    // Перевірка наявності інших активних підписок
                    var userActiveSubscriptions = await _subscriptionRepository.GetActiveSubscriptionsByUserIdAsync(user.Id);
                    if (userActiveSubscriptions.Any())
                    {
                        notFoundEmails.Add($"{email} (вже має активну підписку)");
                        continue;
                    }

                    // Перевірка участі в інших сімейних підписках
                    var existingFamilyMembership = await familyRepo.GetActiveFamilyMembershipByUserIdAsync(user.Id);
                    if (existingFamilyMembership != null)
                    {
                        notFoundEmails.Add($"{email} (вже є членом іншої сімейної підписки)");
                        continue;
                    }

                    foundMembers.Add(new FamilySubscriptionMember
                    {
                        SubscriptionId = subscriptionId,
                        MemberId = user.Id,
                        AddedAt = DateTime.UtcNow
                    });
                }
                else
                {
                    notFoundEmails.Add(email);
                }
            }

            if (foundMembers.Any())
            {
                await familyRepo.AddMembersAsync(foundMembers);
            }

            await _unitOfWork.SaveChangesAsync();

            return new FamilySubscriptionUpdateResultDto
            {
                UpdatedMembers = foundMembers.Count,
                NotFoundEmails = notFoundEmails
            };
        }

        public class FamilySubscriptionUpdateResultDto
        {
            public int UpdatedMembers { get; set; }
            public List<string> NotFoundEmails { get; set; } = new();
        }

        public async Task<List<FamilySubscriptionMemberDto>> GetFamilyMembersAsync(Guid ownerId)
        {
            var familyRepo = _unitOfWork.FamilySubscriptions;
            var members = await familyRepo.GetMembersByOwnerIdAsync(ownerId);
            return _mapper.Map<List<FamilySubscriptionMemberDto>>(members);
        }

        public async Task RemoveFamilyMemberAsync(Guid ownerId, string memberEmail)
        {
            var familyRepo = _unitOfWork.FamilySubscriptions;

            // Знаходимо користувача за email
            var user = await _userManager.Users
                .FirstOrDefaultAsync(u => u.Email != null && u.Email.ToLower() == memberEmail.ToLower());

            if (user == null)
                throw new KeyNotFoundException($"Користувача з email '{memberEmail}' не знайдено.");

            // Шукаємо запис FamilySubscriptionMember
            var member = await familyRepo.GetMemberAsync(ownerId, user.Id);

            if (member == null)
                throw new KeyNotFoundException($"Користувача '{memberEmail}' не знайдено серед членів сімейної підписки.");

            // Видаляємо запис
            familyRepo.Delete(member);
            await _unitOfWork.SaveChangesAsync();
        }

        #endregion
    }
}
