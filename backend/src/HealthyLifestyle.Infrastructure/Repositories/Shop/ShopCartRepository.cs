using HealthyLifestyle.Core.Entities;
using HealthyLifestyle.Core.Interfaces.Shop;
using HealthyLifestyle.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HealthyLifestyle.Infrastructure.Repositories.Shop
{
    public class ShopCartRepository : Repository<ShoppingCart>, IShopCartRepository
    {
        public ShopCartRepository(ApplicationDbContext dbContext) : base(dbContext)
        {
        }

        public async Task<ShoppingCart?> GetShoppingCartByUserIdAsync(Guid userId)
        {
            return await _dbSet
                .Include(sc => sc.CartItems)
                    .ThenInclude(ci => ci.Product)
                .Where(sc => sc.UserId == userId)
                .FirstOrDefaultAsync();
        }
    }
}
