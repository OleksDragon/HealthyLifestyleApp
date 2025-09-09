using AutoMapper;
using HealthyLifestyle.Application.DTOs.Record;
using HealthyLifestyle.Application.Interfaces.Record;
using HealthyLifestyle.Core.Entities;
using HealthyLifestyle.Core.Interfaces;
using HealthyLifestyle.Core.Interfaces.Record;

namespace HealthyLifestyle.Application.Services.Record
{
    public class SleepRecordService : ISleepRecordService
    {
        private readonly ISleepRecordRepository _sleepRecordRepository;
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;

        public SleepRecordService(
            ISleepRecordRepository sleepRecordRepository,
            IMapper mapper,
            IUnitOfWork unitOfWork)
        {
            _sleepRecordRepository = sleepRecordRepository;
            _mapper = mapper;
            _unitOfWork = unitOfWork;
        }

        public async Task<SleepRecordDto> CreateSleepRecordAsync(SleepRecordCreateDto createDto)
        {
            var sleepRecord = _mapper.Map<SleepRecord>(createDto);

            await _sleepRecordRepository.AddAsync(sleepRecord);
            await _unitOfWork.SaveChangesAsync();

            return _mapper.Map<SleepRecordDto>(sleepRecord);
        }

        public async Task DeleteSleepRecordAsync(Guid id)
        {
            var sleepRecord = await _sleepRecordRepository.GetByIdAsync(id);
            if (sleepRecord == null)
            {
                throw new ArgumentException($"Запис сну користувача з ID {id} не знайдено.");
            }

            _sleepRecordRepository.Delete(sleepRecord);
            await _unitOfWork.SaveChangesAsync();
        }

        public async Task<IEnumerable<SleepRecordDto>> GetAllSleepRecordsAsync()
        {
            var sleepRecord = await _sleepRecordRepository.GetAllAsync();
            return _mapper.Map<IEnumerable<SleepRecordDto>>(sleepRecord);
        }

        public async Task<List<SleepRecordDto>> GetSleepRecordByIdAndDateAsync(Guid id, DateTime date)
        {
            var sleepRecord = await _sleepRecordRepository.GetSleepRecordByUserIdAndDateAsync(id, date);

            return _mapper.Map<List<SleepRecordDto>>(sleepRecord);
        }

        public async Task<List<SleepRecordDto>> GetSleepRecordByIdAsync(Guid id)
        {
            var sleepRecord = await _sleepRecordRepository.GetSleepRecordByUserIdAsync(id);
            if (sleepRecord == null)
            {
                throw new KeyNotFoundException($"Запис сну користувача з ID '{id}' не знайдено.");
            }

            return _mapper.Map<List<SleepRecordDto>>(sleepRecord);
        }

        public async Task<SleepRecordDto> UpdateSleepRecordAsync(Guid id, SleepRecordUpdateDto updateDto)
        {
            var sleepRecord = await _sleepRecordRepository.GetByIdAsync(id);
            if (sleepRecord == null)
            {
                throw new ArgumentException($"Запис сну користувача з ID {id} не знайдено.");
            }

            _mapper.Map(updateDto, sleepRecord);
            _sleepRecordRepository.Update(sleepRecord);
            await _unitOfWork.SaveChangesAsync();

            return _mapper.Map<SleepRecordDto>(sleepRecord);
        }
    }
}
