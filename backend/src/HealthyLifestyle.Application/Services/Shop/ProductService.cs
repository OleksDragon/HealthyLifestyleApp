using AutoMapper;
using HealthyLifestyle.Application.DTOs.Shop;
using HealthyLifestyle.Core.Entities;
using HealthyLifestyle.Core.Interfaces;
using Microsoft.Extensions.Caching.Distributed;
using Microsoft.Extensions.Configuration;
using System.Text.Json;
using HealthyLifestyle.Application.Interfaces.Shop;
using HealthyLifestyle.Core.Interfaces.Shop;
using HealthyLifestyle.Application.Interfaces.ObjectStorage;

namespace HealthyLifestyle.Application.Services.Shop
{
    /// <summary>
    /// A product management service that implements the logic for creating, updating, deleting, and retrieving product data.
    /// Uses a product repository, AutoMapper for DTO mapping, Unit of Work for transactions, a cache for optimization
    /// , and configuration for caching settings.
    /// </summary>
    public class ProductService : IProductService
    {
        #region Fields

        private readonly IProductRepository _productRepository;
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IDistributedCache _cache;
        private readonly IConfiguration _configuration;
        private readonly IObjectStorageService _objectStorageService;

        #endregion

        #region Constructors

        /// <summary>
        /// Initializes a new instance of <see cref="ProductService"/> with the necessary dependencies.
        /// </summary>
        /// <param name="productRepository">Repository for working with products.</param>
        /// <param name="mapper">AutoMapper instance for object mapping.</param>
        /// <param name="unitOfWork">Unit of work for transaction management.</param>
        /// <param name="cache">Distributed cache for data storage.</param>
        /// <param name="configuration">Application configuration to get settings.</param>
        /// <exception cref="ArgumentNullException">Occurs if any parameter is null.</exception>
        public ProductService(IProductRepository productRepository, IMapper mapper, IUnitOfWork unitOfWork, IDistributedCache cache, IConfiguration configuration, IObjectStorageService objectStorageService)
        {
            _productRepository = productRepository;
            _mapper = mapper;
            _unitOfWork = unitOfWork;
            _cache = cache;
            _configuration = configuration;
            _objectStorageService = objectStorageService;
        }

        #endregion

        #region Public methods

        /// <summary>
        /// Creates a new product based on data from a DTO.
        /// </summary>
        /// <param name="productCreateDto">DTO with data for product creation.</param>
        /// <returns>DTO of the created product.</returns>
        /// <exception cref="ArgumentNullException">Occurs if <paramref name="productCreateDto"/> is null.</exception>
        public async Task<ProductDto> CreateProductAsync(ProductCreateDto productCreateDto)
        {
            string? imageUrl = null;
            if (productCreateDto.ImageFile != null)
            {
                // Завантажуємо файл у MinIO
                imageUrl = await _objectStorageService.UploadFileAsync(
                    productCreateDto.ImageFile.OpenReadStream(),
                    "products",
                    productCreateDto.ImageFile.ContentType
                );
            }

            var product = _mapper.Map<Product>(productCreateDto);
            product.ImageUrl = imageUrl; // Встановлюємо URL, отриманий від сховища
            await _productRepository.AddAsync(product);
            await _unitOfWork.SaveChangesAsync(); // Save the changes
            await InvalidateProductsCache();
            return _mapper.Map<ProductDto>(product);
        }

        /// <summary>
        /// Deletes a product by its ID.
        /// </summary>
        /// <param name="id">Unique product identifier.</param>
        /// <exception cref="ArgumentException">Occurs if the product is not found.</exception>
        public async Task DeleteProductAsync(Guid id)
        {
            var product = await _productRepository.GetByIdAsync(id);
            if (product == null)
            {
                throw new ArgumentException($"Product with ID  {id}  not found.");
            }

            // Якщо у продукту є зображення, видаляємо його зі сховища
            if (!string.IsNullOrEmpty(product.ImageUrl))
            {
                await _objectStorageService.DeleteFileAsync(product.ImageUrl);
            }
            _productRepository.Delete(product);
            await _unitOfWork.SaveChangesAsync(); // Save the changes
            await InvalidateProductsCache();
        }

        /// <summary>
        /// Gets a list of all products using the cache.
        /// </summary>
        /// <returns>DTO product collection.</returns>
        public async Task<IEnumerable<ProductDto>> GetAllProductsAsync()
        {
            var cacheKey = _configuration.GetValue<string>("CacheSettings:ProductsCacheKey") ?? "Products";

            var cacheExpirationMinutes = _configuration.GetValue<int>("CacheSettings:ProductsCacheExpirationMinutes");

            var cachedProductsJson = await _cache.GetStringAsync(cacheKey);

            if (!string.IsNullOrEmpty(cachedProductsJson))
            {
                Console.WriteLine("Products: Loaded from Redis cache.");
                return JsonSerializer.Deserialize<IEnumerable<ProductDto>>(cachedProductsJson) ?? Enumerable.Empty<ProductDto>();
            }

            var products = await _productRepository.GetAllAsync();

            var productDtos = _mapper.Map<IEnumerable<ProductDto>>(products) ?? Enumerable.Empty<ProductDto>();

            if (productDtos.Any())
            {
                var options = new DistributedCacheEntryOptions
                {
                    AbsoluteExpirationRelativeToNow = TimeSpan.FromMinutes(cacheExpirationMinutes)
                };
                var productsJson = JsonSerializer.Serialize(productDtos);
                await _cache.SetStringAsync(cacheKey, productsJson, options);
                Console.WriteLine("Products: Loaded from DB and cached in Redis.");
            }
            else
            {
                Console.WriteLine("Products: No products found in DB.");
            }

            return productDtos;
        }

        /// <summary>
        /// Gets a product by its ID.
        /// </summary>
        /// <param name="id">Unique product identifier.</param>
        /// <returns>Product DTO.</returns>
        /// <exception cref="KeyNotFoundException">Occurs if the product is not found.</exception>
        public async Task<ProductDto> GetProductByIdAsync(Guid id)
        {
            var product = await _productRepository.GetByIdAsync(id);
            if (product == null)
            {
                throw new KeyNotFoundException($"Product with ID {id} not found.");
            }
            return _mapper.Map<ProductDto>(product);
        }

        /// <summary>
        /// Updates an existing product based on data from a DTO.
        /// </summary>
        /// <param name="id">Unique product identifier.</param>
        /// <param name="productUpdateDto">DTO with new data to update.</param>
        /// <returns>Updated product DTO.</returns>
        /// <exception cref="ArgumentException">Occurs if the product is not found.</exception>
        /// <exception cref="ArgumentNullException">Occurs if <paramref name="productUpdateDto"/> is null.</exception>
        public async Task<ProductDto> UpdateProductAsync(Guid id, ProductUpdateDto productUpdateDto)
        {
            var product = await _productRepository.GetByIdAsync(id);
            if (product == null)
            {
                throw new ArgumentException($"Product with ID {id} not found.");
            }

            // Якщо надано новий файл зображення, завантажуємо його
            if (productUpdateDto.ImageFile != null)
            {
                // Спочатку видаляємо старе зображення, якщо воно є
                if (!string.IsNullOrEmpty(product.ImageUrl))
                {
                    await _objectStorageService.DeleteFileAsync(product.ImageUrl);
                }

                // Завантажуємо нове
                product.ImageUrl = await _objectStorageService.UploadFileAsync(
                    productUpdateDto.ImageFile.OpenReadStream(),
                    "products",
                    productUpdateDto.ImageFile.ContentType
                );
            }
            else if (productUpdateDto.ImageUrl == "")
            {
                // Якщо ImageUrl порожній, це сигнал видалити існуюче зображення
                if (!string.IsNullOrEmpty(product.ImageUrl))
                {
                    await _objectStorageService.DeleteFileAsync(product.ImageUrl);
                    product.ImageUrl = null;
                }
            }

            _mapper.Map(productUpdateDto, product);

            _productRepository.Update(product);
            await _unitOfWork.SaveChangesAsync(); // Save the changes
            return _mapper.Map<ProductDto>(product);
        }

        #endregion

        #region Приватні методи

        /// <summary>
        /// Initiates invalidation of the product cache by removing the corresponding key from the cache.
        /// </summary>
        /// <returns>A task that represents an asynchronous cache purge operation.</returns>
        private async Task InvalidateProductsCache()
        {
            var cacheKey = _configuration.GetValue<string>("CacheSettings:ProductsCacheKey") ?? "Products";
            if (!string.IsNullOrEmpty(cacheKey))
            {
                await _cache.RemoveAsync(cacheKey);
                Console.WriteLine($"Products cache invalidated with key: {cacheKey}");
            }
        }

        #endregion
    }
}
