using HealthyLifestyle.Application.Interfaces.Email;
using Microsoft.Extensions.Logging;
using System.Net.Mail;
using System.Net;

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

        public async Task SendEmailAsync(string toEmail, string subject, string message)
        {
            _logger.LogInformation("Отправка email: To={To}, Subject={Subject}, Message={Message}", toEmail, subject, message);

            MailAddress from = new MailAddress("nomyfy@gmail.com", "Nomyfy Team");
            MailAddress to = new MailAddress(toEmail);
            MailMessage m = new MailMessage(from, to);
            m.Subject = subject;
            m.Body = message;
            m.IsBodyHtml = true;
            SmtpClient smtp = new SmtpClient("smtp.gmail.com", 587);
            smtp.Credentials = new NetworkCredential("Nomyfy", "wkzy mlzl mstq kdsy");
            smtp.EnableSsl = true;
            try
            {
                await smtp.SendMailAsync(m);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                throw;
            }
        }
    }
}
