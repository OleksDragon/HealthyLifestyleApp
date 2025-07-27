﻿using AutoMapper;
using HealthyLifestyle.Application.DTOs.Shop;
using HealthyLifestyle.Application.DTOs.Working;
using HealthyLifestyle.Application.Interfaces;
using HealthyLifestyle.Core.Entities;
using HealthyLifestyle.Core.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HealthyLifestyle.Application.Services.Working
{
    public class ConsultationService : IConsultationService
    {
        private readonly IConsultationRepository _consultationRepository;
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;
        public ConsultationService(IConsultationRepository consultationRepository, IMapper mapper, IUnitOfWork unitOfWork)
        {
            _consultationRepository = consultationRepository;
            _mapper = mapper;
            _unitOfWork = unitOfWork;
        }

        public async Task<ConsultationDto> CreateConsultationAsync(ConsultationCreateDto consultationCreateDto)
        {
            var consultation = _mapper.Map<Consultation>(consultationCreateDto);
            await _consultationRepository.AddAsync(consultation);
            await _unitOfWork.SaveChangesAsync(); // Зберігаємо зміни
            return _mapper.Map<ConsultationDto>(consultation);
        }

        public async Task DeleteConsultationAsync(Guid id)
        {
            var consultation = await _consultationRepository.GetByIdAsync(id);
            if (consultation == null)
            {
                throw new ArgumentException($"Консультацію з ID {id} не знайдено.");
            }
            _consultationRepository.Delete(consultation);
            await _unitOfWork.SaveChangesAsync(); // Зберігаємо зміни
        }

        public async Task<IEnumerable<ConsultationDto>> GetAllConsultationsAsync()
        {
            var consultations = await _consultationRepository.GetAllAsync();
            return _mapper.Map<IEnumerable<ConsultationDto>>(consultations);
        }

        public async Task<ConsultationDto> GetConsultationByIdAsync(Guid id)
        {
            var consultation = await _consultationRepository.GetByIdAsync(id);
            if (consultation == null)
            {
                throw new KeyNotFoundException($"Консультацію з ID '{id}' не знайдено.");
            }
            return _mapper.Map<ConsultationDto>(consultation);
        }

        public async Task<ConsultationDto> UpdateConsultationAsync(Guid id, ConsultationUpdateDto consultationUpdateDto)
        {
            var consultation = await _consultationRepository.GetByIdAsync(id);
            if (consultation == null)
            {
                throw new ArgumentException($"Консультація з ID {id} не знайдено.");
            }

            _mapper.Map(consultationUpdateDto, consultation);

            _consultationRepository.Update(consultation);
            await _unitOfWork.SaveChangesAsync(); // Зберігаємо зміни
            return _mapper.Map<ConsultationDto>(consultation);
        }

    }
}
