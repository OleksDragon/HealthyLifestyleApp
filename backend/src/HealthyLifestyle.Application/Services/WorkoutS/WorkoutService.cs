using AutoMapper;
using HealthyLifestyle.Application.DTOs.Workout;
using HealthyLifestyle.Application.Interfaces.Workout;
using HealthyLifestyle.Core.Entities;
using HealthyLifestyle.Core.Interfaces;
using HealthyLifestyle.Core.Interfaces.WorkoutR;

namespace HealthyLifestyle.Application.Services.WorkoutS
{
    public class WorkoutService : IWorkoutService
    {
        private readonly IWorkoutRepository _workoutRepository;
        private readonly IFitnessActivityRepository _fitnessActivityRepository;
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;
        public WorkoutService(IWorkoutRepository workoutRepository, IFitnessActivityRepository fitnessActivityRepository, IMapper mapper, IUnitOfWork unitOfWork)
        {
            _workoutRepository = workoutRepository;
            _fitnessActivityRepository = fitnessActivityRepository;
            _mapper = mapper;
            _unitOfWork = unitOfWork;
        }

        public async Task<WorkoutDto> CreateWorkoutAsync(WorkoutCreateDto workoutCreateDto)
        {
            var workout = _mapper.Map<Workout>(workoutCreateDto);

            var fitnessActivities = workoutCreateDto.FitnessActivities.Select(activityDto => new FitnessActivity
            {
                Workout = workout,
                UserId = activityDto.UserId,
                ActivityType = activityDto.ActivityType,
                ActivityDate = activityDto.ActivityDate,
                DurationMinutes = activityDto.DurationMinutes,
                CaloriesBurned = activityDto.CaloriesBurned,
                Notes = activityDto.Notes
            }).ToList();

            workout.FitnessActivities = fitnessActivities;

            await _workoutRepository.AddAsync(workout);
            await _unitOfWork.SaveChangesAsync();

            return _mapper.Map<WorkoutDto>(workout);
        }

        public async Task DeleteWorkoutAsync(Guid id)
        {
            var workout = await _workoutRepository.GetByIdAsync(id);
            if (workout == null)
            {
                throw new ArgumentException($"Тренування з ID {id} не знайдено.");
            }
            await _fitnessActivityRepository.DeleteByWorkoutIdAsync(id);
            _workoutRepository.Delete(workout);
            await _unitOfWork.SaveChangesAsync();
        }

        public async Task<IEnumerable<WorkoutDto>> GetAllWorkoutsAsync()
        {
            var workouts = await _workoutRepository.GetAllWorkoutsWithActivitiesAsync();
            return _mapper.Map<IEnumerable<WorkoutDto>>(workouts);
        }

        public async Task<WorkoutDto> GetWorkoutByIdAsync(Guid id)
        {
            var workout = await _workoutRepository.GetWorkoutByIdWithActivitiesAsync(id);
            if (workout == null)
            {
                throw new KeyNotFoundException($"Тренування з ID '{id}' не знайдено.");
            }
            return _mapper.Map<WorkoutDto>(workout);
        }

        public async Task<WorkoutDto> UpdateWorkoutAsync(Guid id, WorkoutUpdateDto workoutUpdateDto)
        {
            var updWorkout = _mapper.Map<Workout>(workoutUpdateDto);
            var workout = await _workoutRepository.GetWorkoutByIdWithActivitiesAsync(id);
            if (workout != null)
            {
                updWorkout.Name = workoutUpdateDto.Name ?? workout.Name;
                updWorkout.Description = workoutUpdateDto.Description ?? workout.Description;
                updWorkout.Type = workoutUpdateDto.Type ?? workout.Type;
                updWorkout.AnimationUrl = workoutUpdateDto.AnimationUrl ?? workout.AnimationUrl;
                updWorkout.DifficultyLevel = workoutUpdateDto.DifficultyLevel ?? workout.DifficultyLevel;
                await _fitnessActivityRepository.DeleteByWorkoutIdAsync(id);
                _workoutRepository.Delete(workout);
                await _unitOfWork.SaveChangesAsync();
            }

            typeof(BaseEntity).GetProperty("Id")?.SetValue(updWorkout, id);

            if (workoutUpdateDto.FitnessActivities != null)
            {
                var fitnessActivities = workoutUpdateDto.FitnessActivities.Select(activityDto => new FitnessActivity
                {
                    Workout = workout,
                    UserId = activityDto.UserId,
                    ActivityType = activityDto.ActivityType,
                    ActivityDate = activityDto.ActivityDate,
                    DurationMinutes = activityDto.DurationMinutes,
                    CaloriesBurned = activityDto.CaloriesBurned,
                    Notes = activityDto.Notes
                }).ToList();

                updWorkout.FitnessActivities = fitnessActivities;
            }

            await _workoutRepository.AddAsync(updWorkout);
            await _unitOfWork.SaveChangesAsync();

            return _mapper.Map<WorkoutDto>(updWorkout);
        }
    }
}
