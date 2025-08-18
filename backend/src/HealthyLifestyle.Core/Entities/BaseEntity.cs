using System;

namespace HealthyLifestyle.Core.Entities
{
    /// <summary>
    /// Абстрактна базова сутність для всіх сутностей у системі.
    /// Містить загальні властивості, такі як ідентифікатор та дати створення/оновлення.
    /// </summary>
    public abstract class BaseEntity
    {
        #region Властивості

        /// <summary>
        /// Унікальний ідентифікатор сутності.
        /// </summary>
        public Guid Id { get; set; }

        /// <summary>
        /// Дата створення сутності (у форматі UTC).
        /// </summary>
        public DateTime CreatedAt { get; protected set; }

        /// <summary>
        /// Дата останнього оновлення сутності (у форматі UTC, опціонально).
        /// </summary>
        public DateTime? UpdatedAt { get; protected set; }
        #endregion

        #region Конструктори

        /// <summary>
        /// Конструктор без параметрів для EF Core.
        /// Автоматично генерує новий Guid для ідентифікатора та встановлює дату створення.
        /// </summary>
        protected BaseEntity()
        {
            Id = Guid.NewGuid();
            CreatedAt = DateTime.UtcNow;
        }

        /// <summary>
        /// Конструктор із заданим ідентифікатором.
        /// </summary>
        /// <param name="id">Унікальний ідентифікатор сутності.</param>
        /// <exception cref="ArgumentException">Якщо передано порожній Guid.</exception>
        protected BaseEntity(Guid id)
        {
            if (id == Guid.Empty)
            {
                throw new ArgumentException("Id не може бути порожнім Guid.", nameof(id));
            }
            Id = id;
            CreatedAt = DateTime.UtcNow;
        }
        #endregion

        #region Методи

        /// <summary>
        /// Встановлює дату останнього оновлення сутності на поточний час (UTC).
        /// </summary>
        public void SetUpdatedAt()
        {
            UpdatedAt = DateTime.UtcNow;
        }
        #endregion
    }
}