using System;

namespace HealthyLifestyle.Core.Enums
{
    public static class RoleNames
    {
        public const string Admin = "Admin";         // Назва ролі адміністратора
        public const string User = "User";          // Назва ролі звичайного користувача
        public const string Dietitian = "Dietitian"; // Назва ролі дієтолога
        public const string Doctor = "Doctor";       // Назва ролі лікаря
        public const string Psychologist = "Psychologist"; // Назва ролі психолога
        public const string Trainer = "Trainer";     // Назва ролі тренера
    }

    // Типи підписок на платформі
    public enum SubscriptionType
    {
        Basic,     // Базовий тариф
        Premium,   // Преміум тариф
        Family     // Сімейний тариф
    }

    // Статуси підписки
    public enum SubscriptionStatus
    {
        Active,    // Активна
        Expired,   // Термін дії закінчився
        Canceled   // Скасована
    }

    // Типи тренувань
    public enum WorkoutType
    {
        Yoga,      // Йога
        Strength,  // Силове тренування
        Cardio,    // Кардіо
        Pilates    // Пілатес
    }

    // Рівні складності тренувань
    public enum Difficulty
    {
        Beginner,        // Початківець
        Intermediate,    // Середній рівень
        Advanced         // Просунутий рівень
    }

    // Статуси заявок на професійну кваліфікацію
    public enum QualificationStatus
    {                    
        Pending,  // Очікує розгляду
        Approved, // Затверджено
        Rejected, // Відхилено
        Revoked   // Анульовано
    }

    // Статуси консультацій
    public enum ConsultationStatus
    {
        Scheduled,  // Заплановано
        Completed,  // Завершено
        Canceled    // Скасовано
    }

    // Типи прийомів їжі
    public enum MealType
    {
        Breakfast, // Сніданок
        Lunch,     // Обід
        Dinner,    // Вечеря
        Snack      // Перекус
    }

    // Категорії товарів у магазині
    public enum ProductCategory
    {
        SportsNutrition, // Спортивне харчування
        Other,           // Інше
        Gadgets,         // Гаджети
        Apparel          // Спортивний одяг
    }

    // Статуси замовлень
    public enum OrderStatus
    {
        Pending,    // В обробці
        Shipped,    // Відправлено
        Delivered,  // Доставлено
        Cancelled    // Скасовано
    }

    // Типи соціальних челенджів
    public enum ChallengeType
    {
        Competition,     // Змагання
        GroupChallenge,  // Груповий челендж
        PersonalGoal     // Особиста ціль
    }

    // Статуси участі у челенджах
    public enum ParticipationStatus
    {
        InProgress,    // В процесі
        Completed,     // Завершено
        Failed,        // Не вдалося
        Withdrawn      // Відмова від участі
    }

    // Ролі учасників у групах
    public enum GroupRole
    {
        Member,      // Учасник
        Moderator,   // Модератор
        Admin        // Адміністратор групи
    }

    // Рівні кровотечі (для трекера жіночого здоров'я)
    public enum BleedingLevel
    {
        Light,       // Легка
        Medium,      // Помірна
        Heavy       // Сильна
    }

    // Стать користувача
    public enum Gender
    {
        Male = 0,    // Чоловіча
        Female = 1,  // Жіноча
        Other = 2    // Інша / Не вказано
    }

    // Типи сповіщень у системі
    public enum NotificationType
    {
        Reminder,        // Нагадування
        Achievement,     // Досягнення
        NewContent,      // Новий контент
        System,          // Системні сповіщення
        Message          // Повідомлення від користувача/підтримки
    }

    // Фактори, що можуть впливати на психічний стан користувача.
    public enum MentalHealthFactor
    {
        Sports,
        Coffee,
        Alcohol,
        Sex,
        Meditation,
        Antidepressants,
        Other
    }

    public enum AchievementType
    {
        Training,       // Звичайне тренування
        Marathon,       // Марафон
        WeightLoss,     // Втрата ваги
        MonthlyGoal     // Щомісячна ціль
    }

    // Статус покупки.
    public enum PurchaseStatus
    {
        Pending,    // В обробці
        Shipped,    // Відправлено
        Delivered,  // Доставлено
        Cancelled,  // Скасовано
        Active,     // Активна (для підписок/курсів)
        Expired,    // Термін дії закінчився
        Completed   // Завершено
    }

    // Тип продукту.
    public enum ProductType
    {
        Subscription,   // Підписка
        Clothing,       // Одяг
        Equipment,      // Спорядження / гаджети
        Course,         // Тренувальний курс
        Nutrition,      // Харчування / спортивні напої
        Other           // Інше
    }

    // іконки (UI представлення, src/components/elements/Profile/data-card/DataCard.js).
    public enum AP_Icon
    {
        smile,          // (іконка смайлик)         Виконані тренування, курси, преміум і тд. 
        progress,       // (іконка колесу прогресу) В процесі (підготовка товару до доставки, якась обробка тощо)
        truck,          // (іконка вантажівки)      Доставка товару (товар вже їде)
        drop            // (іконка краплі)          Втрата ваги
    }

    public enum TaskType
    {
        Workout,
        Eating,
        Doctor
    }
}