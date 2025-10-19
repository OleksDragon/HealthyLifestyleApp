using AutoMapper;
using HealthyLifestyle.Application.DTOs.Shop;
using HealthyLifestyle.Application.Interfaces.Shop;
using HealthyLifestyle.Core.Entities;
using HealthyLifestyle.Core.Interfaces;
using HealthyLifestyle.Core.Interfaces.Shop;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HealthyLifestyle.Application.Services.Shop
{
    public class ShopCartService : IShopCartService
    {
        private readonly IShopCartRepository _shopCartRepository;
        private readonly IProductRepository _productRepository;
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;

        public ShopCartService(IShopCartRepository shopCartRepository, IMapper mapper, IUnitOfWork unitOfWork, IProductRepository productRepository)
        {
            _shopCartRepository = shopCartRepository;
            _mapper = mapper;
            _unitOfWork = unitOfWork;
            _productRepository = productRepository;
        }

        public async Task AddProductAsync(Guid userId, ShoppingCartItemDto productDto)
        {
            var shoppingCart = await _shopCartRepository.GetShoppingCartByUserIdAsync(userId);

            if (shoppingCart == null)
            {
                shoppingCart = new ShoppingCart
                {
                    UserId = userId,
                    CartItems = new List<ShoppingCartItem>()
                };

                await _shopCartRepository.AddAsync(shoppingCart);
            }

            var item = shoppingCart.CartItems.FirstOrDefault(ci => ci.ProductId == productDto.ProductId);
            if (item == null)
            {
                var sci = _mapper.Map<ShoppingCartItem>(productDto);
                sci.ShoppingCartId = shoppingCart.Id;
                sci.Id = Guid.Empty;

                shoppingCart.CartItems.Add(sci);
            }

            await _unitOfWork.SaveChangesAsync();
        }

        public async Task ChangeProductAmountAsync(Guid userId, Guid productId, int amount)
        {
            var shoppingCart = await _shopCartRepository.GetShoppingCartByUserIdAsync(userId);

            if (shoppingCart != null)
            {
                var item = shoppingCart.CartItems.FirstOrDefault(ci => ci.ProductId == productId);
                if (item != null)
                {
                    item.Quantity = amount;
                    await _unitOfWork.SaveChangesAsync();
                }
            }
        }

        public async Task ClearCartAsync(Guid userId)
        {
            var shoppingCart = await _shopCartRepository.GetShoppingCartByUserIdAsync(userId);

            if (shoppingCart != null)
            {
                shoppingCart.CartItems.Clear();
                await _unitOfWork.SaveChangesAsync();
            }
        }

        public async Task CreateShopCartAsync(Guid userId)
        {
            var shoppingCart = await _shopCartRepository.GetShoppingCartByUserIdAsync(userId);

            if (shoppingCart == null)
            {
                ShoppingCart sc = new ShoppingCart();
                sc.UserId = userId;

                await _shopCartRepository.AddAsync(sc);
                await _unitOfWork.SaveChangesAsync();
            }
        }

        public async Task DeleteProductAsync(Guid userId, Guid productId)
        {
            var shoppingCart = await _shopCartRepository.GetShoppingCartByUserIdAsync(userId);

            if (shoppingCart != null)
            {
                var item = shoppingCart.CartItems.FirstOrDefault(ci => ci.ProductId == productId);
                if (item != null)
                {
                    shoppingCart.CartItems.Remove(item);
                    await _unitOfWork.SaveChangesAsync();
                }
            }
        }

        public async Task<ShoppingCartDto?> GetCartByUserIdAsync(Guid userId)
        {
            var shoppingCart = await _shopCartRepository.GetShoppingCartByUserIdAsync(userId);

            return _mapper.Map<ShoppingCartDto>(shoppingCart);
        }
    }
}
