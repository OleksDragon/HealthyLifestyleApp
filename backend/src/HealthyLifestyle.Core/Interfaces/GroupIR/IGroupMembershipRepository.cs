using HealthyLifestyle.Core.Entities;

namespace HealthyLifestyle.Core.Interfaces.GroupIR
{
    public interface IGroupMembershipRepository : IRepository<GroupMembership>
    {
        Task DeleteByGroupIdAsync(Guid groupId);
    }
}
