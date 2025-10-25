using System;

namespace HealthyLifestyle.Core.Entities
{
    /// <summary>
    /// Клас, що представляє запис про вагу користувача. Успадковує базові поля від BaseEntity.
    /// </summary>
    public class WeightLog : BaseEntity
    {
        #region Властивості

        /// <summary>
        /// Ідентифікатор користувача, якому належить запис.
        /// </summary>
        public Guid UserId { get; set; }

        /// <summary>
        /// Зафіксована вага (кг).
        /// </summary>
        public double Weight { get; set; }

        /// <summary>
        /// Навігаційна властивість до об'єкта User.
        /// </summary>
        public virtual User User { get; set; } = null!;

        #endregion

        #region Конструктори

        /// <summary>
        /// Конструктор без параметрів для EF Core.
        /// </summary>
        protected WeightLog() : base() { }

        /// <summary>
        /// Конструктор для створення нового запису ваги.
        /// </summary>
        /// <param name="userId">Ідентифікатор користувача.</param>
        /// <param name="weight">Вага в кілограмах.</param>
        public WeightLog(Guid userId, double weight) : base()
        {
            if (userId == Guid.Empty)
                throw new ArgumentException("Ідентифікатор користувача не може бути порожнім.", nameof(userId));
            if (weight <= 0)
                throw new ArgumentException("Вага має бути позитивним числом.", nameof(weight));

            UserId = userId;
            Weight = weight;
            // CreatedAt автоматично встановлюється в BaseEntity
        }

        /// <summary>
        /// КОНСТРУКТОР: Дозволяє явно встановити дату створення запису.
        /// </summary>
        public WeightLog(Guid userId, double weight, DateTime createdAt) : base()
        {
            if (userId == Guid.Empty)
                throw new ArgumentException("Ідентифікатор користувача не може бути порожнім.", nameof(userId));
            if (weight <= 0)
                throw new ArgumentException("Вага має бути позитивним числом.", nameof(weight));

            UserId = userId;
            Weight = weight;
            CreatedAt = createdAt;
        }

        #endregion

        #region Методи

        /// <summary>
        /// Оновлює значення ваги та встановлює час оновлення.
        /// </summary>
        /// <param name="newWeight">Нове значення ваги.</param>
        public void UpdateWeight(double newWeight)
        {
            if (newWeight <= 0)
                throw new ArgumentException("Вага має бути позитивним числом.", nameof(newWeight));

            Weight = newWeight;
            SetUpdatedAt(); 
        }

        #endregion
    }
}