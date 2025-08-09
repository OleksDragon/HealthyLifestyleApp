using AutoMapper;
using HealthyLifestyle.Application.DTOs.Group;
using HealthyLifestyle.Application.Interfaces.Group;
using HealthyLifestyle.Core.Entities;
using HealthyLifestyle.Core.Interfaces;
using HealthyLifestyle.Core.Interfaces.GroupIR;

namespace HealthyLifestyle.Application.Services.GroupS
{
    public class GroupService : IGroupService
    {
        private readonly IGroupRepository _groupRepository;
        private readonly IGroupMembershipRepository _groupMembershipRepository;
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;
        public GroupService(IGroupRepository groupRepository, IGroupMembershipRepository groupMembershipRepository, IMapper mapper, IUnitOfWork unitOfWork)
        {
            _groupRepository = groupRepository;
            _groupMembershipRepository = groupMembershipRepository;
            _mapper = mapper;
            _unitOfWork = unitOfWork;
        }

        public async Task<GroupDto> CreateGroupAsync(GroupCreateDto groupCreateDto)
        {
            var group = _mapper.Map<Group>(groupCreateDto);

            var groupMemberships = groupCreateDto.GroupMembers.Select(memberDto => new GroupMembership
            {
                Group = group,
                UserId = memberDto.UserId,
                JoinDate = memberDto.JoinDate,
                Role = memberDto.Role
            }).ToList();

            group.GroupMemberships = groupMemberships;

            await _groupRepository.AddAsync(group);
            await _unitOfWork.SaveChangesAsync(); // Зберігаємо зміни

            return _mapper.Map<GroupDto>(group);
        }

        public async Task DeleteGroupAsync(Guid id)
        {
            var group = await _groupRepository.GetByIdAsync(id);
            if (group == null)
            {
                throw new ArgumentException($"Група з ID {id} не знайдено.");
            }
            await _groupMembershipRepository.DeleteByGroupIdAsync(id);
            _groupRepository.Delete(group);
            await _unitOfWork.SaveChangesAsync(); // Зберігаємо зміни
        }

        public async Task<IEnumerable<GroupDto>> GetAllGroupsAsync()
        {
            var groups = await _groupRepository.GetAllGroupsWithMembershipsAsync();
            return _mapper.Map<IEnumerable<GroupDto>>(groups);
        }

        public async Task<GroupDto> GetGroupByIdAsync(Guid id)
        {
            var group = await _groupRepository.GetGroupByIdWithMembersAsync(id);
            if (group == null)
            {
                throw new KeyNotFoundException($"Група з ID '{id}' не знайдено.");
            }
            return _mapper.Map<GroupDto>(group);
        }

        public async Task<GroupDto> UpdateGroupAsync(Guid id, GroupUpdateDto groupUpdateDto)
        {
            var updGroup = _mapper.Map<Group>(groupUpdateDto);
            var group = await _groupRepository.GetGroupByIdWithMembersAsync(id);
            if (group != null)
            {
                updGroup.Name = groupUpdateDto.Name ?? group.Name;
                updGroup.Description = groupUpdateDto.Description ?? group.Description;
                updGroup.CreatorId = group.CreatorId;
                updGroup.CreationDate = group.CreationDate;
                await _groupMembershipRepository.DeleteByGroupIdAsync(id);
                _groupRepository.Delete(group);
                await _unitOfWork.SaveChangesAsync();
            }

            typeof(BaseEntity).GetProperty("Id")?.SetValue(updGroup, id);

            if (groupUpdateDto.GroupMembers != null)
            {
                var groupMemberships = groupUpdateDto.GroupMembers.Select(memberDto => new GroupMembership
                {
                    Group = updGroup,
                    UserId = memberDto.UserId,
                    JoinDate = memberDto.JoinDate,
                    Role = memberDto.Role
                }).ToList();

                updGroup.GroupMemberships = groupMemberships;
            }

            await _groupRepository.AddAsync(updGroup);
            await _unitOfWork.SaveChangesAsync();

            return _mapper.Map<GroupDto>(updGroup);
        }

    }
}
