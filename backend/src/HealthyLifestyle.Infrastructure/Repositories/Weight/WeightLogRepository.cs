using HealthyLifestyle.Core.Entities;
using HealthyLifestyle.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HealthyLifestyle.Infrastructure.Repositories.Weight
{
    public class WeightLogRepository : IWeightLogRepository
    {
        private readonly ApplicationDbContext _context;

        public WeightLogRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task AddAsync(WeightLog log)
        {
            await _context.WeightLogs.AddAsync(log);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(WeightLog log)
        {
            _context.WeightLogs.Update(log);
            await _context.SaveChangesAsync();
        }

        public async Task<WeightLog?> GetByDateAsync(Guid userId, DateTime date)
        {
            // Порівнюємо лише дату (день, місяць, рік)
            return await _context.WeightLogs
                .Where(l => l.UserId == userId && l.CreatedAt.Date == date.Date)
                .FirstOrDefaultAsync();
        }

        public async Task<WeightLog?> GetLatestAsync(Guid userId)
        {
            return await _context.WeightLogs
                .Where(l => l.UserId == userId)
                .OrderByDescending(l => l.CreatedAt)
                .FirstOrDefaultAsync();
        }

        public async Task<IEnumerable<WeightLog>> GetLast7DaysAsync(Guid userId)
        {
            // Дата початку періоду (8 днів тому, щоб отримати 7 повних днів до сьогодні)
            var startDate = DateTime.UtcNow.Date.AddDays(-7);

            // Отримуємо всі записи, сортуємо, потім групуємо за датою і беремо останній запис за кожен день
            var logs = await _context.WeightLogs
                .Where(l => l.UserId == userId && l.CreatedAt.Date >= startDate)
                .OrderBy(l => l.CreatedAt)
                .ToListAsync();

            // Групуємо в C# для отримання унікального запису за кожен день
            var uniqueDailyLogs = logs
                .GroupBy(l => l.CreatedAt.Date)
                .Select(g => g.OrderByDescending(l => l.CreatedAt).First()) // Беремо останній запис ваги за день
                .OrderBy(l => l.CreatedAt)
                .ToList();

            return uniqueDailyLogs;
        }

        public async Task<IEnumerable<WeightLog>> GetMonthlyLogsAsync(Guid userId, int year, int month)
        {
            var logs = await _context.WeightLogs
                // Фільтруємо за користувачем, роком та місяцем
                .Where(l => l.UserId == userId &&
                            l.CreatedAt.Year == year &&
                            l.CreatedAt.Month == month)
                .OrderBy(l => l.CreatedAt)
                .ToListAsync();

            // Групуємо, щоб отримати лише один (останній) запис за кожен день місяця
            var uniqueDailyLogs = logs
                .GroupBy(l => l.CreatedAt.Date)
                .Select(g => g.OrderByDescending(l => l.CreatedAt).First())
                .OrderBy(l => l.CreatedAt)
                .ToList();

            return uniqueDailyLogs;
        }
    }
}