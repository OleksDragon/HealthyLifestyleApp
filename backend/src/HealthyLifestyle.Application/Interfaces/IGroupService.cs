using HealthyLifestyle.Application.DTOs.Working;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HealthyLifestyle.Application.Interfaces
{
    public interface IGroupService
    {
        /// <summary>
        /// Отримує список всіх груп.
        /// </summary>
        /// <returns>Список груп.</returns>
        Task<IEnumerable<GroupDto>> GetAllGroupsAsync();

        /// <summary>
        /// Отримує групу за її ідентифікатором.
        /// </summary>
        /// <param name="id">Ідентифікатор групи.</param>
        /// <returns>Група з вказаним ідентифікатором.</returns>
        Task<GroupDto> GetGroupByIdAsync(Guid id);

        /// <summary>
        /// Створює нову групу.
        /// </summary>
        /// <param name="groupCreateDto">Дані для створення нової групи.</param>
        /// <returns>Створена група.</returns>
        Task<GroupDto> CreateGroupAsync(GroupCreateDto groupCreateDto);

        /// <summary>
        /// Оновлює існуючу групу.
        /// </summary>
        /// <param name="id">Ідентифікатор групи, яку потрібно оновити.</param>
        /// <param name="consultationUpdateDto">Дані для оновлення групи.</param>
        /// <returns>Оновлена група.</returns>
        Task<GroupDto> UpdateGroupAsync(Guid id, GroupUpdateDto groupUpdateDto);

        /// <summary>
        /// Видаляє групу за її ідентифікатором.
        /// </summary>
        /// <param name="id">Ідентифікатор групи, яку потрібно видалити.</param>
        Task DeleteGroupAsync(Guid id);
    }
}
