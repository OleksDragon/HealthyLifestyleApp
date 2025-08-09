using System.ComponentModel.DataAnnotations;

namespace HealthyLifestyle.Application.DTOs.Shop
{
    /// <summary>
    /// Об’єкт передачі даних для створення нового замовлення.
    /// </summary>
    public class OrderCreateDto
    {
        #region Властивості

        /// <summary>
        /// Адреса доставки замовлення.
        /// </summary>
        /// <remarks>
        /// Адреса доставки є обов’язковою і не може перевищувати 500 символів.
        /// </remarks>
        [Required(ErrorMessage = "Адреса доставки обов'язкова.")]
        [StringLength(500, ErrorMessage = "Адреса доставки не може перевищувати 500 символів.")]
        public string ShippingAddress { get; set; } = string.Empty;

        /// <summary>
        /// Колекція позицій замовлення.
        /// </summary>
        /// <remarks>
        /// Замовлення має містити хоча б одну позицію.
        /// </remarks>
        [Required(ErrorMessage = "Позиції замовлення є обов'язковими.")]
        [MinLength(1, ErrorMessage = "Замовлення має містити хоча б одну позицію.")]
        public ICollection<OrderItemCreateDto> Items { get; set; } = new List<OrderItemCreateDto>();

        #endregion
    }

    /// <summary>
    /// Об’єкт передачі даних для створення позиції замовлення.
    /// </summary>
    public class OrderItemCreateDto
    {
        #region Властивості

        /// <summary>
        /// Унікальний ідентифікатор продукту в замовленні.
        /// </summary>
        /// <remarks>
        /// Ідентифікатор продукту є обов’язковим для кожної позиції замовлення.
        /// </remarks>
        [Required(ErrorMessage = "Ідентифікатор продукту є обов'язковим.")]
        public Guid ProductId { get; set; }

        /// <summary>
        /// Кількість одиниць продукту в замовленні.
        /// </summary>
        /// <remarks>
        /// Кількість має бути позитивним числом, не меншим за 1.
        /// </remarks>
        [Required(ErrorMessage = "Кількість продукту обов'язково.")]
        [Range(1, int.MaxValue, ErrorMessage = "Кількість має бути позитивним числом.")]
        public int Quantity { get; set; }

        #endregion
    }
}
