using HealthyLifestyle.Core.Entities;
using HealthyLifestyle.Core.Interfaces;
using HealthyLifestyle.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace HealthyLifestyle.Infrastructure.Repositories
{
    /// <summary>
    /// Реалізація репозиторію користувачів через Entity Framework.
    /// </summary>
    public class UserRepository : IUserRepository
    {
        private readonly ApplicationDbContext _context;

        public UserRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<User?> GetByIdAsync(Guid id)
        {
            return await _context.Users
                .Include(u => u.MealEntries)
                .Include(u => u.DietPlans)
                .FirstOrDefaultAsync(u => u.Id == id);
        }

        public async Task<IEnumerable<User>> GetAllAsync()
        {
            return await _context.Users
                .OrderBy(u => u.FullName)
                .ToListAsync();
        }

        public async Task AddAsync(User user)
        {
            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(User user)
        {
            _context.Users.Update(user);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(Guid id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user != null)
            {
                _context.Users.Remove(user);
                await _context.SaveChangesAsync();
            }
        }
    }
}
