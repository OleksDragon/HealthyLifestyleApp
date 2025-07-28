using HealthyLifestyle.Application.DTOs.Tracker;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HealthyLifestyle.Application.Interfaces
{
    public interface IFemaleHealthTrackerService
    {
        /// <summary>
        /// Отримує список усіх записів жіночого трекера здоров’я.
        /// </summary>
        /// <returns>Список записів жіночого трекера здоров’я.</returns>
        Task<IEnumerable<FemaleHealthTrackerDto>> GetAllFemaleHealthTrackerAsync();

        /// <summary>
        /// Отримує запис жіночого трекера за ідентифікатором.
        /// </summary>
        /// <param name="id">Ідентифікатор запису UserId.</param>
        /// <returns>Запис чоловічого трекера.</returns>
        Task<FemaleHealthTrackerDto> GetFemaleHealthTrackerByIdAsync(Guid id);

        /// <summary>
        /// Створює новий запис жіночого трекера.
        /// </summary>
        /// <param name="createDto">Дані для створення запису.</param>
        /// <returns>Створений запис.</returns>
        Task<FemaleHealthTrackerDto> CreateFemaleHealthTrackerAsync(FemaleHealthTrackerCreateDto createDto);

        /// <summary>
        /// Оновлює існуючий запис жіночого трекера.
        /// </summary>
        /// <param name="id">Ідентифікатор запису UserId.</param>
        /// <param name="updateDto">Оновлені дані.</param>
        /// <returns>Оновлений запис.</returns>
        Task<FemaleHealthTrackerDto> UpdateFemaleHealthTrackerAsync(Guid id, FemaleHealthTrackerUpdateDto updateDto);

        /// <summary>
        /// Видаляє запис жіночого трекера.
        /// </summary>
        /// <param name="id">Ідентифікатор запису для видалення UserId.</param>
        Task DeleteFemaleHealthTrackerAsync(Guid id);
    }
}
