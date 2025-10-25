using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HealthyLifestyle.Core.Entities
{
    public class ShoppingCart : BaseEntity
    {
        #region Властивості

        /// <summary>
        /// Ідентифікатор клієнта, якому належить корзина.
        /// </summary>
        public Guid UserId { get; set; }

        /// <summary>
        /// Список товарів, що знаходяться у корзині.
        /// </summary>
        public virtual ICollection<ShoppingCartItem> CartItems { get; set; } = new List<ShoppingCartItem>();

        #endregion

        #region Навігаційні властивості

        public virtual User User { get; set; } = null!;

        #endregion
    }
}
