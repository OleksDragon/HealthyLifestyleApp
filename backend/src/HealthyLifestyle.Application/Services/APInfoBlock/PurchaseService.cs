using AutoMapper;
using HealthyLifestyle.Application.DTOs.APInfoBlock;
using HealthyLifestyle.Application.Interfaces.APInfoBlock;
using HealthyLifestyle.Core.Entities;
using HealthyLifestyle.Core.Interfaces;
using HealthyLifestyle.Core.Interfaces.APInfoBlock;

namespace HealthyLifestyle.Application.Services.APInfoBlock
{
    public class PurchaseService : IPurchaseService
    {
        private readonly IPurchaseRepository _purchaseRepository;
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;

        public PurchaseService(
            IPurchaseRepository purchaseRepository,
            IMapper mapper,
            IUnitOfWork unitOfWork)
        {
            _purchaseRepository = purchaseRepository;
            _mapper = mapper;
            _unitOfWork = unitOfWork;
        }

        public async Task<PurchaseDto> CreatePurchaseAsync(PurchaseCreateDto createDto)
        {
            var purchase = _mapper.Map<Purchase>(createDto);

            await _purchaseRepository.AddAsync(purchase);
            await _unitOfWork.SaveChangesAsync();

            return _mapper.Map<PurchaseDto>(purchase);
        }

        public async Task DeletePurchaseAsync(Guid id)
        {
            var purchase = await _purchaseRepository.GetByIdAsync(id);
            if (purchase == null)
            {
                throw new ArgumentException($"Покупка з ID {id} не знайдено.");
            }

            _purchaseRepository.Delete(purchase);
            await _unitOfWork.SaveChangesAsync();
        }

        public async Task<IEnumerable<PurchaseDto>> GetAllPurchasesAsync()
        {
            var purchases = await _purchaseRepository.GetAllAsync();
            return _mapper.Map<IEnumerable<PurchaseDto>>(purchases);
        }

        public async Task<List<PurchaseDto>> GetPurchasesByUserIdAsync(Guid id)
        {
            var purchases = await _purchaseRepository.GetPurchasesByUserIdAsync(id);

            // Повертаємо пустий список
            return _mapper.Map<List<PurchaseDto>>(purchases ?? new List<Purchase>());
        }
    }
}