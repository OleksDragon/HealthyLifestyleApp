using AutoMapper;
using HealthyLifestyle.Application.DTOs.Tracker;
using HealthyLifestyle.Application.Interfaces;
using HealthyLifestyle.Core.Entities;
using HealthyLifestyle.Core.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HealthyLifestyle.Application.Services.Tracker
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
