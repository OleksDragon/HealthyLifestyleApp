using AutoMapper;
using HealthyLifestyle.Application.DTOs.Working;
using HealthyLifestyle.Application.Interfaces;
using HealthyLifestyle.Core.Entities;
using HealthyLifestyle.Core.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HealthyLifestyle.Application.Services.Working
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
            var group = await _groupRepository.GetGroupByIdWithMembersAsync(id);
            if (group == null)
            {
                throw new ArgumentException($"Група з ID {id} не знайдено.");
            }

            if (!string.IsNullOrEmpty(groupUpdateDto.Name))
                group.Name = groupUpdateDto.Name;

            if (!string.IsNullOrEmpty(groupUpdateDto.Description))
                group.Description = groupUpdateDto.Description;

            var newMembers = groupUpdateDto.GroupMembers ?? new List<GroupMemberCreateDto>();

            var toRemove = group.GroupMemberships
                .Where(existing => !newMembers.Any(m => m.UserId == existing.UserId))
                .ToList();

            foreach (var member in toRemove)
            {
                group.GroupMemberships.Remove(member);
            }

            foreach (var memberDto in newMembers)
            {
                var existing = group.GroupMemberships.FirstOrDefault(m => m.UserId == memberDto.UserId);
                if (existing == null)
                {
                    group.GroupMemberships.Add(new GroupMembership
                    {
                        GroupId = group.Id,
                        UserId = memberDto.UserId,
                        JoinDate = memberDto.JoinDate,
                        Role = memberDto.Role
                    });
                }
                else
                {
                    existing.JoinDate = memberDto.JoinDate;
                    existing.Role = memberDto.Role;
                }
            }

            _groupRepository.Update(group);
            await _unitOfWork.SaveChangesAsync();
            return _mapper.Map<GroupDto>(group);
        }
    }
}
