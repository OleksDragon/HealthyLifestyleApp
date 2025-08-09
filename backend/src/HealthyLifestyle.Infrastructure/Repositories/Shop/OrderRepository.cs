using HealthyLifestyle.Core.Entities;
using HealthyLifestyle.Core.Interfaces.Shop;
using HealthyLifestyle.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace HealthyLifestyle.Infrastructure.Repositories.Shop
{
    public class OrderRepository : Repository<Order>, IOrderRepository
    {
        // В конструкторе вызываем базовый конструктор Repository
        public OrderRepository(ApplicationDbContext dbContext) : base(dbContext)
        {
        }

        // Реализация метода из IOrderRepository для получения заказа с элементами и продуктами
        public async Task<Order?> GetOrderByIdWithItemsAsync(Guid orderId)
        {
            return await _dbSet
                .Include(o => o.OrderItems)
                    .ThenInclude(oi => oi.Product)
                .FirstOrDefaultAsync(o => o.Id == orderId);
        }

        // Реализация метода для получения заказов пользователя с элементами и продуктами
        public async Task<IEnumerable<Order>> GetUserOrdersAsync(Guid userId)
        {
            return await _dbSet
                .Include(o => o.OrderItems)
                    .ThenInclude(oi => oi.Product)
                .Where(o => o.UserId == userId)
                .ToListAsync();
        }

        // Реализация метода для получения всех заказов с пользователями и элементами/продуктами
        public async Task<IEnumerable<Order>> GetAllOrdersWithUsersAndItemsAsync()
        {
            return await _dbSet
                .Include(o => o.OrderItems)
                    .ThenInclude(oi => oi.Product)
                .Include(o => o.User)
                .ToListAsync();
        }
    }
}
