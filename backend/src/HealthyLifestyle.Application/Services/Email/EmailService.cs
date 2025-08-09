using HealthyLifestyle.Application.Interfaces.Email;
using Microsoft.Extensions.Logging;

namespace HealthyLifestyle.Application.Services.Email
{
    // Нам потрібно буде інтегрувати реальний сервіс відправки пошти
    // Для початку використовуэмо заглушку.
    public class EmailService : IEmailService
    {
        private readonly ILogger<EmailService> _logger;

        public EmailService(ILogger<EmailService> logger)
        {
            _logger = logger;
        }

        public Task SendEmailAsync(string toEmail, string subject, string message)
        {
            _logger.LogInformation("Отправка email: To={To}, Subject={Subject}, Message={Message}", toEmail, subject, message);
            // Тут буде код для реального відправлення email (например, через SmtpClient, SendGrid API и т.д.)
            // У продакшені ми не використовуватимемо console.writeline.
            // Console.WriteLine($"Sending email to: {toEmail}");
            // Console.WriteLine($"Subject: {subject}");
            // Console.WriteLine($"Body: {message}");
            return Task.CompletedTask;
        }
    }
}
