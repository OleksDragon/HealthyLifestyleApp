using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HealthyLifestyle.Core.Entities
{
    public class ShoppingCartItem : BaseEntity
    {
        #region Властивості

        /// <summary>
        /// Ідентифікатор корзини.
        /// </summary>
        public Guid ShoppingCartId { get; set; }

        /// <summary>
        /// Ідентифікатор продукту в корзині.
        /// </summary>
        public Guid ProductId { get; set; }

        /// <summary>
        /// Кількість одиниць продукту в корзині.
        /// </summary>
        public int Quantity { get; set; }

        #endregion

        #region Навігаційні властивості

        public virtual ShoppingCart ShoppingCart { get; set; } = null!;

        public virtual Product Product { get; set; } = null!;

        #endregion
    }
}
