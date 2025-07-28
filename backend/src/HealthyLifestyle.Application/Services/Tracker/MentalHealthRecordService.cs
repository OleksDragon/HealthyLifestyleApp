using AutoMapper;
using HealthyLifestyle.Application.DTOs.Tracker;
using HealthyLifestyle.Application.Interfaces;
using HealthyLifestyle.Core.Entities;
using HealthyLifestyle.Core.Interfaces;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace HealthyLifestyle.Application.Services.Tracker
{
    public class MentalHealthRecordService : IMentalHealthRecordService
    {
        private readonly IMentalHealthRecordRepository _mentalHealthRecordRepository;
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;

        public MentalHealthRecordService(
            IMentalHealthRecordRepository mentalHealthRecordRepository,
            IMapper mapper,
            IUnitOfWork unitOfWork)
        {
            _mentalHealthRecordRepository = mentalHealthRecordRepository;
            _mapper = mapper;
            _unitOfWork = unitOfWork;
        }

        public async Task<MentalHealthRecordDto> CreateMentalHealthRecordAsync(MentalHealthRecordCreateDto createDto)
        {
            var mentalHealthRecord = _mapper.Map<MentalHealthRecord>(createDto);

            await _mentalHealthRecordRepository.AddAsync(mentalHealthRecord);
            await _unitOfWork.SaveChangesAsync();

            return _mapper.Map<MentalHealthRecordDto>(mentalHealthRecord);
        }

        public async Task DeleteMentalHealthRecordAsync(Guid id)
        {
            var mentalHealthRecord = await _mentalHealthRecordRepository.GetMentalHealthRecordByUserIdAsync(id);
            if (mentalHealthRecord == null)
            {
                throw new ArgumentException($"Запис ментального здоров'я з ID {id} не знайдено.");
            }

            _mentalHealthRecordRepository.Delete(mentalHealthRecord);
            await _unitOfWork.SaveChangesAsync();
        }

        public async Task<IEnumerable<MentalHealthRecordDto>> GetAllMentalHealthRecordsAsync()
        {
            var mentalHealthRecord = await _mentalHealthRecordRepository.GetAllAsync();
            return _mapper.Map<IEnumerable<MentalHealthRecordDto>>(mentalHealthRecord);
        }

        public async Task<MentalHealthRecordDto> GetMentalHealthRecordByIdAsync(Guid id)
        {
            var mentalHealthRecord = await _mentalHealthRecordRepository.GetMentalHealthRecordByUserIdAsync(id);
            if (mentalHealthRecord == null)
            {
                throw new KeyNotFoundException($"Запис ментального здоров'я з ID '{id}' не знайдено.");
            }

            return _mapper.Map<MentalHealthRecordDto>(mentalHealthRecord);
        }

        public async Task<MentalHealthRecordDto> UpdateMentalHealthRecordAsync(Guid id, MentalHealthRecordUpdateDto updateDto)
        {
            var mentalHealthRecord = await _mentalHealthRecordRepository.GetMentalHealthRecordByUserIdAsync(id);
            if (mentalHealthRecord == null)
            {
                throw new ArgumentException($"Запис ментального здоров'я з ID {id} не знайдено.");
            }

            _mapper.Map(updateDto, mentalHealthRecord);
            _mentalHealthRecordRepository.Update(mentalHealthRecord);
            await _unitOfWork.SaveChangesAsync();

            return _mapper.Map<MentalHealthRecordDto>(mentalHealthRecord);
        }
    }
}
