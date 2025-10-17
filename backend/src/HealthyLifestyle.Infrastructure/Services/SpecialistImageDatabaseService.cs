using HealthyLifestyle.Infrastructure.Data;
using HealthyLifestyle.Infrastructure.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace HealthyLifestyle.Infrastructure.Services
{
    /// <summary>
    /// Сервіс для збереження URL зображень спеціалістів в базу даних.
    /// </summary>
    public class SpecialistImageDatabaseService : ISpecialistImageDatabaseService
    {
        private readonly ApplicationDbContext _context;
        private readonly ILogger<SpecialistImageDatabaseService> _logger;

        public SpecialistImageDatabaseService(
            ApplicationDbContext context,
            ILogger<SpecialistImageDatabaseService> logger)
        {
            _context = context;
            _logger = logger;
        }

        /// <summary>
        /// Зберігає URL зображення в базу даних для відповідного спеціаліста.
        /// </summary>
        public async Task<bool> SaveImageUrlToDatabase(Guid specialistId, string imageUrl, string imageType)
        {
            try
            {
                // Find specialist details by ID
                var trainer = await _context.TrainerDetails.FirstOrDefaultAsync(s => s.Id == specialistId);
                var psychologist = await _context.PsychologistDetails.FirstOrDefaultAsync(s => s.Id == specialistId);
                var doctor = await _context.DoctorDetails.FirstOrDefaultAsync(s => s.Id == specialistId);
                var dietitian = await _context.DietitianDetails.FirstOrDefaultAsync(s => s.Id == specialistId);

                if (trainer == null && psychologist == null && doctor == null && dietitian == null)
                {
                    _logger.LogWarning("Спеціаліст не знайдений з ID: {SpecialistId}", specialistId);
                    return false;
                }

                // Update the appropriate details entity
                if (trainer != null)
                {
                    trainer.UpdateCardPictureUrl(imageUrl);
                    _logger.LogInformation("Оновлено CardPictureUrl для TrainerDetails з ID: {SpecialistId}", specialistId);
                }
                else if (doctor != null)
                {
                    doctor.UpdateCardPictureUrl(imageUrl);
                    _logger.LogInformation("Оновлено CardPictureUrl для DoctorDetails з ID: {SpecialistId}", specialistId);
                }
                else if (dietitian != null)
                {
                    dietitian.UpdateCardPictureUrl(imageUrl);
                    _logger.LogInformation("Оновлено CardPictureUrl для DietitianDetails з ID: {SpecialistId}", specialistId);
                }
                else if (psychologist != null)
                {
                    psychologist.UpdateCardPictureUrl(imageUrl);
                    _logger.LogInformation("Оновлено CardPictureUrl для PsychologistDetails з ID: {SpecialistId}", specialistId);
                }

                // Save changes to database
                await _context.SaveChangesAsync();
                _logger.LogInformation("URL зображення збережено в БД для спеціаліста з ID: {SpecialistId}: {ImageUrl}", specialistId, imageUrl);
                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Помилка збереження URL зображення в БД для спеціаліста з ID: {SpecialistId}", specialistId);
                return false;
            }
        }

        /// <summary>
        /// Отримує тип сутності для спеціаліста.
        /// </summary>
        public async Task<string?> GetEntityTypeForSpecialist(Guid specialistId)
        {
            try
            {
                // Find specialist details by ID
                var trainer = await _context.TrainerDetails.FirstOrDefaultAsync(s => s.Id == specialistId);
                var psychologist = await _context.PsychologistDetails.FirstOrDefaultAsync(s => s.Id == specialistId);
                var doctor = await _context.DoctorDetails.FirstOrDefaultAsync(s => s.Id == specialistId);
                var dietitian = await _context.DietitianDetails.FirstOrDefaultAsync(s => s.Id == specialistId);

                if (trainer != null) return "TrainerDetails";
                if (doctor != null) return "DoctorDetails";
                if (dietitian != null) return "DietitianDetails";
                if (psychologist != null) return "PsychologistDetails";

                return null;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Помилка отримання типу сутності для спеціаліста з ID: {SpecialistId}", specialistId);
                return null;
            }
        }
    }
}