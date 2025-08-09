using HealthyLifestyle.Core.Enums;

namespace HealthyLifestyle.Application.DTOs.Group
{
    public class GroupDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string? Description { get; set; }
        public Guid CreatorId { get; set; }
        public DateTime CreationDate { get; set; }
        public ICollection<GroupMemberDto> GroupMembers { get; set; } = new List<GroupMemberDto>();
    }

    public class GroupMemberDto
    {
        public Guid GroupId { get; set; }
        public Guid UserId { get; set; }
        public DateTime JoinDate { get; set; } = DateTime.UtcNow;
        public GroupRole Role { get; set; } = GroupRole.Member;
    }

    public class GroupMemberCreateDto
    {
        public Guid UserId { get; set; }
        public DateTime JoinDate { get; set; } = DateTime.UtcNow;
        public GroupRole Role { get; set; } = GroupRole.Member;
    }

    public class GroupCreateDto
    {
        public string Name { get; set; } = string.Empty;
        public string? Description { get; set; }
        public Guid CreatorId { get; set; }
        public ICollection<GroupMemberCreateDto> GroupMembers { get; set; } = new List<GroupMemberCreateDto>();
    }

    public class GroupUpdateDto
    {
        public string? Name { get; set; } = string.Empty;
        public string? Description { get; set; }
        public ICollection<GroupMemberCreateDto>? GroupMembers { get; set; } = new List<GroupMemberCreateDto>();
    }
}
