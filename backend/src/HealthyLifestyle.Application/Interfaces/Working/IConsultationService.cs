using HealthyLifestyle.Application.DTOs.Working;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HealthyLifestyle.Application.Interfaces.Working
{
    public interface IConsultationService
    {
        /// <summary>
        /// Отримує список всіх консультацій.
        /// </summary>
        /// <returns>Список консультацій.</returns>
        Task<IEnumerable<ConsultationDto>> GetAllConsultationsAsync();

        /// <summary>
        /// Отримує консультацію за її ідентифікатором.
        /// </summary>
        /// <param name="id">Ідентифікатор консультації.</param>
        /// <returns>Консультація з вказаним ідентифікатором.</returns>
        Task<ConsultationDto> GetConsultationByIdAsync(Guid id);

        /// <summary>
        /// Створює нову консультацію.
        /// </summary>
        /// <param name="consultationCreateDto">Дані для створення нової консультації.</param>
        /// <returns>Створена консультація.</returns>
        Task<ConsultationDto> CreateConsultationAsync(ConsultationCreateDto consultationCreateDto);

        /// <summary>
        /// Оновлює існуючу консультацію.
        /// </summary>
        /// <param name="id">Ідентифікатор консультації, яку потрібно оновити.</param>
        /// <param name="consultationUpdateDto">Дані для оновлення консультації.</param>
        /// <returns>Оновлена консультація.</returns>
        Task<ConsultationDto> UpdateConsultationAsync(Guid id, ConsultationUpdateDto consultationUpdateDto);

        /// <summary>
        /// Видаляє консультацію за її ідентифікатором.
        /// </summary>
        /// <param name="id">Ідентифікатор консультації, яку потрібно видалити.</param>
        Task DeleteConsultationAsync(Guid id);
    }
}
