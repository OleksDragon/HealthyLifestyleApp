using AutoMapper;
using HealthyLifestyle.Application.DTOs.Shop;
using HealthyLifestyle.Core.Entities;
using HealthyLifestyle.Core.Interfaces.Shop;
using HealthyLifestyle.Core.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using HealthyLifestyle.Application.Interfaces.Calendar;
using HealthyLifestyle.Application.DTOs.Calendar;
using HealthyLifestyle.Core.Interfaces.Calendar;
using Microsoft.AspNetCore.Identity;
using HealthyLifestyle.Core.Interfaces.WorkoutR;

namespace HealthyLifestyle.Application.Services.Calendar
{
    public class CalendarService : ICalendarService
    {
        private readonly ICalendarRepository _calendarRepository;
        private readonly IWorkoutRepository _workoutRepository;
        private readonly UserManager<User> _userManager;
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;

        public CalendarService(UserManager<User> userManager, IWorkoutRepository workoutRepository, ICalendarRepository calendarRepository, IMapper mapper, IUnitOfWork unitOfWork)
        {
            _userManager = userManager;
            _workoutRepository = workoutRepository;
            _calendarRepository = calendarRepository;
            _mapper = mapper;
            _unitOfWork = unitOfWork;
        }

        public async Task<CalendarEventDto> CreateCalendarEventAsync(CalendarEventCreateDto calendarCreateDto)
        {
            var calendar = _mapper.Map<CalendarEvent>(calendarCreateDto);

            var parts = calendar.MeetingParticipants.ToList();
            var convParts = new List<User>();
            for (int i = 0; i < calendar.MeetingParticipants?.Count(); i++)
            {
                var user = await _userManager.FindByIdAsync(parts[i].Id.ToString());
                if (user != null)
                {
                    convParts.Add(user);
                }
            }
            calendar.MeetingParticipants = convParts;

            if (calendar.Workout != null)
            {
                var workout = await _workoutRepository.GetByIdAsync(calendar.Workout.Id);
                if (workout != null)
                {
                    calendar.Workout = workout;
                }
            }

            await _calendarRepository.AddAsync(calendar);
            await _unitOfWork.SaveChangesAsync();
            return _mapper.Map<CalendarEventDto>(calendar);
        }

        public async Task DeleteCalendarEventAsync(Guid id)
        {
            var calendar = await _calendarRepository.GetByIdAsync(id);
            if (calendar == null)
            {
                throw new ArgumentException($"Подія з ID {id} не знайдена.");
            }
            _calendarRepository.Delete(calendar);
            await _unitOfWork.SaveChangesAsync();
        }

        public async Task<IEnumerable<CalendarEventDto>> GetAllCalendarEventsByUserIdInDateRangeAsync(Guid userId, DateTime start, DateTime end)
        {
            var calendars = await _calendarRepository.GetAllCalendarEventsByUserIdInDateRangeAsync(userId, start, end);
            return _mapper.Map<IEnumerable<CalendarEventDto>>(calendars);
        }

        public async Task<CalendarEventDto> GetCalendarEventByIdAsync(Guid id)
        {
            var calendar = await _calendarRepository.GetEventWithParticipantsAsync(id);
            if (calendar == null)
            {
                throw new KeyNotFoundException($"Подія з ID '{id}' не знайдена.");
            }
            return _mapper.Map<CalendarEventDto>(calendar);
        }

        public async Task<CalendarEventDto> UpdateCalendarEventAsync(Guid id, CalendarEventUpdateDto calendarUpdateDto)
        {
            var calendar = await _calendarRepository.GetEventWithParticipantsAsync(id);
            if (calendar == null)
            {
                throw new ArgumentException($"Подія з ID {id} не знайдено.");
            }

            _mapper.Map(calendarUpdateDto, calendar);

            var parts = calendar.MeetingParticipants.ToList();
            var convParts = new List<User>();
            for (int i = 0; i < calendar.MeetingParticipants?.Count(); i++)
            {
                var user = await _userManager.FindByIdAsync(parts[i].Id.ToString());
                if (user != null)
                {
                    convParts.Add(user);
                }
            }
            calendar.MeetingParticipants = convParts;

            if (calendarUpdateDto.WorkoutId != null)
            {
                var workout = await _workoutRepository.GetByIdAsync(calendarUpdateDto.WorkoutId.Value);
                if (workout != null)
                {
                    calendar.Workout = workout;
                }
            }

            _calendarRepository.Update(calendar);
            await _unitOfWork.SaveChangesAsync();
            return _mapper.Map<CalendarEventDto>(calendar);
        }
    }
}
