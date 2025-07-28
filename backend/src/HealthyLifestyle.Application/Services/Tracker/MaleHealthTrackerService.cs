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
    public class MaleHealthTrackerService : IMaleHealthTrackerService
    {
        private readonly IMaleHealthTrackerRepository _maleHealthTrackerRepository;
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;

        public MaleHealthTrackerService(
            IMaleHealthTrackerRepository maleHealthTrackerRepository,
            IMapper mapper,
            IUnitOfWork unitOfWork)
        {
            _maleHealthTrackerRepository = maleHealthTrackerRepository;
            _mapper = mapper;
            _unitOfWork = unitOfWork;
        }

        public async Task<IEnumerable<MaleHealthTrackerDto>> GetAllMaleHealthTrackerAsync()
        {
            var maleHealthTracker = await _maleHealthTrackerRepository.GetAllAsync();
            return _mapper.Map<IEnumerable<MaleHealthTrackerDto>>(maleHealthTracker);
        }

        public async Task<MaleHealthTrackerDto> GetMaleHealthTrackerByIdAsync(Guid id)
        {
            var maleHealthTracker = await _maleHealthTrackerRepository.GetByIdAsync(id);
            if (maleHealthTracker == null)
            {
                throw new KeyNotFoundException($"Трекер чоловічого здоров'я з ID '{id}' не знайдено.");
            }
            return _mapper.Map<MaleHealthTrackerDto>(maleHealthTracker);
        }

        public async Task<MaleHealthTrackerDto> CreateMaleHealthTrackerAsync(MaleHealthTrackerCreateDto maleHealthTrackerCreateDto)
        {
            var maleHealthTracker = _mapper.Map<MaleHealthTracker>(maleHealthTrackerCreateDto);
            await _maleHealthTrackerRepository.AddAsync(maleHealthTracker);
            await _unitOfWork.SaveChangesAsync();
            return _mapper.Map<MaleHealthTrackerDto>(maleHealthTracker);
        }

        public async Task<MaleHealthTrackerDto> UpdateMaleHealthTrackerAsync(Guid id, MaleHealthTrackerUpdateDto updateDto)
        {
            var maleHealthTracker = await _maleHealthTrackerRepository.GetByIdAsync(id);
            if (maleHealthTracker == null)
            {
                throw new ArgumentException($"Трекер чоловічого здоров'я з ID {id} не знайдено.");
            }

            _mapper.Map(updateDto, maleHealthTracker);
            _maleHealthTrackerRepository.Update(maleHealthTracker);
            await _unitOfWork.SaveChangesAsync();

            return _mapper.Map<MaleHealthTrackerDto>(maleHealthTracker);
        }

        public async Task DeleteMaleHealthTrackerAsync(Guid id)
        {
            var maleHealthTracker = await _maleHealthTrackerRepository.GetByIdAsync(id);
            if (maleHealthTracker == null)
            {
                throw new ArgumentException($"Трекер чоловічого здоров'я з ID {id} не знайдено.");
            }

            _maleHealthTrackerRepository.Delete(maleHealthTracker);
            await _unitOfWork.SaveChangesAsync();
        }
    }
}
