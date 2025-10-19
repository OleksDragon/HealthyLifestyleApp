using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HealthyLifestyle.Application.DTOs.Shop
{
    public class ShoppingCartDto
    {
        public Guid Id { get; set; }

        public Guid UserId { get; set; }

        public ICollection<ShoppingCartItemDto> CartItems { get; set; } = new List<ShoppingCartItemDto>();
    }

    public class ShoppingCartItemDto
    {
        public Guid ProductId { get; set; }

        public int Quantity { get; set; }

    }

    public class RemoveProductDto
    {
        public Guid ProductId { get; set; }
    }
}
