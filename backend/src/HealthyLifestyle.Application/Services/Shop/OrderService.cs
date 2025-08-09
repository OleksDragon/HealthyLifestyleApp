using AutoMapper;
using HealthyLifestyle.Application.DTOs.Shop;
using HealthyLifestyle.Application.Interfaces.Email;
using HealthyLifestyle.Application.Interfaces.Shop;
using HealthyLifestyle.Core.Entities;
using HealthyLifestyle.Core.Enums;
using HealthyLifestyle.Core.Interfaces;
using HealthyLifestyle.Core.Interfaces.Shop;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace HealthyLifestyle.Application.Services.Shop
{
    /// <summary>
    /// Служба для керування замовленнями.
    /// </summary>
    public class OrderService : IOrderService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IOrderRepository _orderRepository;
        private readonly UserManager<User> _userManager;
        private readonly IEmailService _emailService;
        private readonly IMapper _mapper;
        private readonly ILogger<OrderService> _logger;

        private const string ADMIN_EMAIL = "admin@example.com";

        #region Конструктор

        /// <summary>
        /// Ініціалізує новий екземпляр класу <see cref="OrderService"/>.
        /// </summary>
        /// <param name="unitOfWork">Одиниця роботи для взаємодії з репозиторіями.</param>
        /// <param name="orderRepository">Репозиторій для роботи із замовленнями.</param>
        /// <param name="userManager">Менеджер користувачів для управління користувацькими даними.</param>
        /// <param name="emailService">Служба для відправлення електронних листів.</param>
        /// <param name="mapper">Мапер для перетворення об’єктів.</param>
        /// <param name="logger">Логер для запису дій та помилок.</param>
        /// <exception cref="ArgumentNullException">Викидається, якщо будь-який із параметрів є null.</exception>
        public OrderService(IUnitOfWork unitOfWork,
                           IOrderRepository orderRepository,
                           UserManager<User> userManager,
                           IEmailService emailService,
                           IMapper mapper,
                           ILogger<OrderService> logger)
        {
            _unitOfWork = unitOfWork ?? throw new ArgumentNullException(nameof(unitOfWork));
            _orderRepository = orderRepository ?? throw new ArgumentNullException(nameof(orderRepository));
            _userManager = userManager ?? throw new ArgumentNullException(nameof(userManager));
            _emailService = emailService ?? throw new ArgumentNullException(nameof(emailService));
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
        }

        #endregion

        #region Публічні методи

        /// <summary>
        /// Асинхронно створює нове замовлення для вказаного користувача.
        /// </summary>
        /// <param name="userId">Унікальний ідентифікатор користувача, який створює замовлення.</param>
        /// <param name="orderCreateDto">Об’єкт передачі даних із деталями створення замовлення.</param>
        /// <returns>DTO створеного замовлення.</returns>
        /// <exception cref="ArgumentNullException">Викидається, якщо <paramref name="orderCreateDto"/> є null.</exception>
        /// <exception cref="ArgumentException">Викидається, якщо замовлення не містить позицій або продукт не знайдено чи недостатньо на складі.</exception>
        public async Task<OrderDto> CreateOrderAsync(Guid userId, OrderCreateDto orderCreateDto)
        {
            if (orderCreateDto == null)
                throw new ArgumentNullException(nameof(orderCreateDto));
            if (!orderCreateDto.Items.Any())
                throw new ArgumentException("Замовлення має містити хоча б одну позицію.", nameof(orderCreateDto.Items));

            var productRepository = _unitOfWork.GetRepository<Product>();

            var order = new Order(userId, orderCreateDto.ShippingAddress);
            var orderItems = new List<OrderItem>();

            var productIds = orderCreateDto.Items.Select(item => item.ProductId).Distinct().ToList();
            var products = await productRepository.AsQueryable()
                                                    .Where(p => productIds.Contains(p.Id))
                                                    .ToDictionaryAsync(p => p.Id);

            foreach (var itemDto in orderCreateDto.Items)
            {
                if (!products.TryGetValue(itemDto.ProductId, out var product) || product == null)
                {
                    _logger.LogWarning("Спроба замовити неіснуючий продукт із ID: {ProductId}", itemDto.ProductId);
                    throw new ArgumentException($"Продукт з ID {itemDto.ProductId} не знайдено.");
                }

                if (product.StockQuantity < itemDto.Quantity)
                {
                    _logger.LogWarning("Недостатньо товару '{ProductName}' (ID: {ProductId}). Доступно: {Available}, Замовлено: {Requested}",
                                   product.Name, itemDto.ProductId, product.StockQuantity, itemDto.Quantity);
                    throw new ArgumentException($"Недостатньо товару '{product.Name}' на складі.");
                }

                var orderItem = new OrderItem(order.Id, itemDto.ProductId, itemDto.Quantity, product.Price);
                orderItems.Add(orderItem);

                product.StockQuantity -= itemDto.Quantity;
                productRepository.Update(product);
            }

            order.OrderItems = orderItems;
            order.CalculateTotalAmount();

            await _orderRepository.AddAsync(order);
            await _unitOfWork.SaveChangesAsync();

            await NotifyAdminAboutNewOrder(order);

            return _mapper.Map<OrderDto>(order);
        }

        /// <summary>
        /// Асинхронно отримує замовлення за його унікальним ідентифікатором.
        /// </summary>
        /// <param name="orderId">Унікальний ідентифікатор замовлення.</param>
        /// <returns>DTO замовлення, якщо знайдено; інакше null.</returns>
        public async Task<OrderDto?> GetOrderByIdAsync(Guid orderId)
        {
            var productRepository = _unitOfWork.GetRepository<Product>();

            var order = await _orderRepository.GetOrderByIdWithItemsAsync(orderId);

            if (order == null) return null;

            var orderDto = _mapper.Map<OrderDto>(order);

            await PopulateOrderDetailsAsync(new List<OrderDto> { orderDto }, productRepository);

            return orderDto;
        }

        /// <summary>
        /// Асинхронно отримує всі замовлення для вказаного користувача.
        /// </summary>
        /// <param name="userId">Унікальний ідентифікатор користувача.</param>
        /// <returns>Колекція DTO замовлень користувача.</returns>
        public async Task<IEnumerable<OrderDto>> GetUserOrdersAsync(Guid userId)
        {
            var productRepository = _unitOfWork.GetRepository<Product>();

            var orders = await _orderRepository.GetUserOrdersAsync(userId);

            var orderDtos = _mapper.Map<IEnumerable<OrderDto>>(orders).ToList();

            await PopulateOrderDetailsAsync(orderDtos, productRepository);

            return orderDtos;
        }

        /// <summary>
        /// Асинхронно отримує всі замовлення в системі.
        /// </summary>
        /// <returns>Колекція DTO всіх замовлень.</returns>
        public async Task<IEnumerable<OrderDto>> GetAllOrdersAsync()
        {
            var productRepository = _unitOfWork.GetRepository<Product>();

            var orders = await _orderRepository.GetAllOrdersWithUsersAndItemsAsync();

            var orderDtos = _mapper.Map<IEnumerable<OrderDto>>(orders).ToList();

            await PopulateOrderDetailsAsync(orderDtos, productRepository);

            return orderDtos;
        }

        /// <summary>
        /// Асинхронно оновлює статус або адресу доставки замовлення.
        /// </summary>
        /// <param name="orderId">Унікальний ідентифікатор замовлення, яке потрібно оновити.</param>
        /// <param name="orderUpdateDto">Об’єкт передачі даних з оновленими статусом або адресою.</param>
        /// <returns>Оновлений DTO замовлення, якщо оновлення успішне; інакше null.</returns>
        /// <exception cref="ArgumentNullException">Викидається, якщо <paramref name="orderUpdateDto"/> є null.</exception>
        public async Task<OrderDto?> UpdateOrderStatusAndAddressAsync(Guid orderId, OrderUpdateDto orderUpdateDto)
        {
            if (orderUpdateDto == null)
                throw new ArgumentNullException(nameof(orderUpdateDto));

            var order = await _orderRepository.GetOrderByIdWithItemsAsync(orderId);

            if (order == null)
            {
                _logger.LogWarning("Спроба оновити неіснуюче замовлення з ID: {OrderId}", orderId);
                return null;
            }

            if (orderUpdateDto.Status.HasValue && order.Status != orderUpdateDto.Status.Value)
            {
                var oldStatus = order.Status;
                order.UpdateStatus(orderUpdateDto.Status.Value);
                _logger.LogInformation("Статус замовлення #{OrderId} змінено з {OldStatus} на {NewStatus}.", order.Id, oldStatus, orderUpdateDto.Status.Value);

                var user = await _userManager.FindByIdAsync(order.UserId.ToString());
                if (user != null && user.Email != null)
                {
                    await NotifyUserAboutOrderStatusChange(order, user.Email, orderUpdateDto.Status.Value);
                }
                else
                {
                    _logger.LogWarning("Не вдалося відправити повідомлення про зміну статусу замовлення #{OrderId}. Користувач не знайдений або Email відсутній.", order.Id);
                }
            }

            if (!string.IsNullOrWhiteSpace(orderUpdateDto.ShippingAddress) && order.ShippingAddress != orderUpdateDto.ShippingAddress)
            {
                order.UpdateShippingAddress(orderUpdateDto.ShippingAddress);
                _logger.LogInformation("Адреса доставки замовлення #{OrderId} змінена на '{NewAddress}'.", order.Id, orderUpdateDto.ShippingAddress);
            }

            _orderRepository.Update(order);
            await _unitOfWork.SaveChangesAsync();

            var orderDto = _mapper.Map<OrderDto>(order);
            var productRepository = _unitOfWork.GetRepository<Product>();
            await PopulateOrderDetailsAsync(new List<OrderDto> { orderDto }, productRepository);

            return orderDto;
        }

        /// <summary>
        /// Асинхронно видаляє замовлення за його унікальним ідентифікатором.
        /// </summary>
        /// <param name="orderId">Унікальний ідентифікатор замовлення, яке потрібно видалити.</param>
        /// <returns>True, якщо замовлення успішно видалено; інакше false.</returns>
        /// <exception cref="InvalidOperationException">Викидається, якщо замовлення має статус, який не дозволяє видалення.</exception>
        public async Task<bool> DeleteOrderAsync(Guid orderId)
        {
            var order = await _orderRepository.GetOrderByIdWithItemsAsync(orderId);

            if (order == null)
            {
                _logger.LogWarning("Спроба видалити неіснуюче замовлення з ID: {OrderId}", orderId);
                return false;
            }

            if (order.Status == OrderStatus.Shipped || order.Status == OrderStatus.Delivered)
            {
                _logger.LogWarning("Спроба видалити замовлення {OrderId} зі статусом {Status}, що не дозволено без спеціальної обробки повернень.", orderId, order.Status);
                throw new InvalidOperationException($"Замовлення зі статусом '{order.Status}' не може бути видалено без оформлення повернення.");
            }

            var productRepository = _unitOfWork.GetRepository<Product>();

            // Повертаємо товар на склад
            foreach (var item in order.OrderItems)
            {
                if (item.Product != null)
                {
                    item.Product.StockQuantity += item.Quantity;
                    productRepository.Update(item.Product);
                    _logger.LogInformation("Повернуто {Quantity} од. товару '{ProductName}' (ID: {ProductId}) на склад. Новий запас: {NewStock}",
                                           item.Quantity, item.Product.Name, item.ProductId, item.Product.StockQuantity);
                }
                else
                {
                    _logger.LogWarning("Продукт для елемента замовлення {OrderItemId} не знайдено при видаленні замовлення {OrderId}.", item.Id, orderId);
                }
            }

            // Видаляємо саме замовлення
            _orderRepository.Delete(order);
            await _unitOfWork.SaveChangesAsync();

            _logger.LogInformation("Замовлення з ID {OrderId} успішно видалено, товар повернено на склад.", orderId);
            return true;
        }

        #endregion

        #region Приватні методи

        /// <summary>
        /// Заповнює додаткові деталі для списку DTO замовлень, такі як назви продуктів і електронну пошту користувача.
        /// </summary>
        /// <param name="orderDtos">Список DTO замовлень для заповнення.</param>
        /// <param name="productRepository">Репозиторій для отримання даних про продукти.</param>
        /// <returns>Задача, що представляє асинхронну операцію заповнення даних.</returns>
        private async Task PopulateOrderDetailsAsync(List<OrderDto> orderDtos, IRepository<Product> productRepository)
        {
            var allProductIds = orderDtos.SelectMany(o => o.OrderItems!)
                                         .Select(item => item.ProductId)
                                         .Distinct()
                                         .ToList();
            var products = await productRepository.AsQueryable()
                                                  .Where(p => allProductIds.Contains(p.Id))
                                                  .ToDictionaryAsync(p => p.Id);

            var allUserIds = orderDtos.Select(o => o.UserId).Distinct().ToList();
            var users = new Dictionary<Guid, User>();
            foreach (var userId in allUserIds)
            {
                var user = await _userManager.FindByIdAsync(userId.ToString());
                if (user != null)
                {
                    users.Add(userId, user);
                }
            }

            foreach (var orderDto in orderDtos)
            {
                if (orderDto.OrderItems != null)
                {
                    foreach (var itemDto in orderDto.OrderItems)
                    {
                        if (products.TryGetValue(itemDto.ProductId, out var product) && product != null)
                        {
                            itemDto.ProductName = product.Name;
                        }
                        else
                        {
                            _logger.LogWarning("Продукт с ID {ProductId} для элемента заказа {OrderItemId} не найден при постобработке DTO.", itemDto.ProductId, itemDto.Id);
                            itemDto.ProductName = "Неизвестный продукт";
                        }
                    }
                }

                if (users.TryGetValue(orderDto.UserId, out var user) && user != null)
                {
                    orderDto.UserEmail = user.Email ?? string.Empty;
                }
                else
                {
                    _logger.LogWarning("Пользователь с ID {UserId} для заказа {OrderId} не найден при постобработке DTO.", orderDto.UserId, orderDto.Id);
                    orderDto.UserEmail = string.Empty;
                }
            }
        }

        /// <summary>
        /// Надсилає повідомлення адміністратору про нове замовлення.
        /// </summary>
        /// <param name="order">Замовлення, про яке потрібно повідомити.</param>
        /// <returns>Задача, що представляє асинхронну операцію відправлення повідомлення.</returns>
        private async Task NotifyAdminAboutNewOrder(Order order)
        {
            var user = await _userManager.FindByIdAsync(order.UserId.ToString());
            var userEmail = user?.Email ?? "Невідомий користувач";

            var subject = $"Нове замовлення #{order.Id.ToString().Substring(0, 8)}";

            var productRepository = _unitOfWork.GetRepository<Product>();
            var productNames = new Dictionary<Guid, string>();
            foreach (var item in order.OrderItems)
            {
                if (!productNames.ContainsKey(item.ProductId))
                {
                    var product = await productRepository.GetByIdAsync(item.ProductId);
                    productNames[item.ProductId] = product?.Name ?? "Невідомий продукт";
                }
            }

            var orderItemsDetails = string.Join("\n", order.OrderItems.Select(item =>
            {
                var productName = productNames.TryGetValue(item.ProductId, out var name) ? name : "Невідомий продукт";
                return $"- {productName} (ID: {item.ProductId}) - {item.Quantity} шт. x {item.PriceAtPurchase:C}";
            }));

            var message = $"Отримано нове замовлення від користувача {userEmail} (ID: {order.UserId}).\n" +
                          $"Загальна сума: {order.TotalAmount:C}\n" +
                          $"Адреса доставки: {order.ShippingAddress}\n" +
                          $"Статус: {order.Status}\n\n" +
                          "Деталі замовлення:\n" +
                          orderItemsDetails +
                          $"\n\nПереглянути замовлення: [Посилання на адмін-панель/замовлення]";

            try
            {
                await _emailService.SendEmailAsync(ADMIN_EMAIL, subject, message);
                _logger.LogInformation("Повідомлення про нове замовлення #{OrderId} надіслано адміністратору {AdminEmail}.", order.Id, ADMIN_EMAIL);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Помилка при надсиланні повідомлення адміністратору про нове замовлення #{OrderId}.", order.Id);
            }
        }

        /// <summary>
        /// Надсилає повідомлення користувачу про зміну статусу замовлення.
        /// </summary>
        /// <param name="order">Замовлення, статус якого змінено.</param>
        /// <param name="userEmail">Електронна пошта користувача.</param>
        /// <param name="newStatus">Новий статус замовлення.</param>
        /// <returns>Задача, що представляє асинхронну операцію відправлення повідомлення.</returns>
        private async Task NotifyUserAboutOrderStatusChange(Order order, string userEmail, OrderStatus newStatus)
        {
            var subject = $"Зміна статусу вашого замовлення #{order.Id.ToString().Substring(0, 8)}";
            var message = $"Шановний користувач,\n\n" +
                          $"Статус вашого замовлення #{order.Id.ToString().Substring(0, 8)} змінено на: {newStatus}.\n" +
                          $"Загальна сума: {order.TotalAmount:C}\n" +
                          $"Адреса доставки: {order.ShippingAddress}\n\n" +
                          "З повагою,\nВаша команда HealthyLifestyle";
            try
            {
                if (!string.IsNullOrEmpty(userEmail))
                {
                    await _emailService.SendEmailAsync(userEmail, subject, message);
                    _logger.LogInformation("Повідомлення про зміну статусу замовлення #{OrderId} надіслано користувачу {UserEmail}.", order.Id, userEmail);
                }
                else
                {
                    _logger.LogWarning("Не вдалося відправити повідомлення користувачу про зміну статусу замовлення #{OrderId} через відсутність email.", order.Id);
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Помилка при надсиланні повідомлення користувачу про зміну статусу замовлення #{OrderId}.", order.Id);
            }
        }

        #endregion
    }
}
