using HealthyLifestyle.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HealthyLifestyle.Core.Interfaces.Shop
{
    public interface IShopCartRepository : IRepository<ShoppingCart>
    {
        Task<ShoppingCart?> GetShoppingCartByUserIdAsync(Guid userId);
    }
}
