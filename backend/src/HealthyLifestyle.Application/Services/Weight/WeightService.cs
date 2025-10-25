using HealthyLifestyle.Application.DTOs.WeightTracker;
using HealthyLifestyle.Application.Interfaces;
using HealthyLifestyle.Application.Interfaces.Weight;
using HealthyLifestyle.Core.Entities;
using HealthyLifestyle.Infrastructure.Repositories.Weight;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HealthyLifestyle.Application.Services.Weight
{
    public class WeightService : IWeightService
    {
        private readonly IWeightLogRepository _weightRepository;

        public WeightService(IWeightLogRepository weightRepository)
        {
            _weightRepository = weightRepository;
        }

        public async Task<IEnumerable<WeightLogDto>> GetLast7DaysLogsAsync(Guid userId)
        {
            var logs = await _weightRepository.GetLast7DaysAsync(userId);

            return logs.Select(l => new WeightLogDto
            {
                Weight = l.Weight,
                DateLogged = l.CreatedAt
            }).ToList();
        }

        public async Task LogWeightAsync(Guid userId, WeightLogRequestDto dto)
        {
            var targetDate = dto.Date.HasValue
                ? dto.Date.Value.Date
                : DateTime.UtcNow.Date;

            var existingLog = await _weightRepository.GetByDateAsync(userId, targetDate);

            if (existingLog != null)
            {
                existingLog.UpdateWeight(dto.Weight);
                await _weightRepository.UpdateAsync(existingLog);
            }
            else
            {
                var newLog = new WeightLog(userId, dto.Weight, targetDate.ToUniversalTime());

                await _weightRepository.AddAsync(newLog);
            }
        }

        public async Task<IEnumerable<WeightLogDto>> GetMonthlyLogsAsync(Guid userId, int year, int month)
        {
            if (month < 1 || month > 12)
            {
                throw new ArgumentOutOfRangeException(nameof(month), "Місяць має бути в діапазоні від 1 до 12.");
            }

            var logs = await _weightRepository.GetMonthlyLogsAsync(userId, year, month);

            return logs.Select(l => new WeightLogDto
            {
                Weight = l.Weight,
                DateLogged = l.CreatedAt
            }).ToList();
        }
    }
}