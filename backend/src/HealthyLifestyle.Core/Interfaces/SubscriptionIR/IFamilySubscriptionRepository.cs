using HealthyLifestyle.Core.Entities;

namespace HealthyLifestyle.Core.Interfaces.SubscriptionIR
{
    public interface IFamilySubscriptionRepository : IRepository<FamilySubscriptionMember>
    {
        /// <summary>
        /// Повертає всіх членів family-підписок, які належать власнику (ownerId = Subscription.UserId).
        /// </summary>
        Task<List<FamilySubscriptionMember>> GetMembersByOwnerIdAsync(Guid ownerId);

        /// <summary>
        /// Повертає конкретного члена по ownerId (власник підписки) та memberId.
        /// </summary>
        Task<FamilySubscriptionMember?> GetMemberAsync(Guid ownerId, Guid memberId);

        /// <summary>
        /// (Опціонально) Повертає всіх членів конкретної підписки.
        /// </summary>
        Task<List<FamilySubscriptionMember>> GetMembersBySubscriptionIdAsync(Guid subscriptionId);
    }
}
