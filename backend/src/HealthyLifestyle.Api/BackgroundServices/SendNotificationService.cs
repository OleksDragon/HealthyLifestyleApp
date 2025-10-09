using HealthyLifestyle.Application.Interfaces.Calendar;
using HealthyLifestyle.Application.Interfaces.Email;
using HealthyLifestyle.Application.Interfaces.User;

namespace HealthyLifestyle.BackgroundServices
{
    // Сервіс, що відправляє повідомлення щодо подій у календарі
    public class SendNotificationService : BackgroundService
    {
        private readonly IEmailService _emailService;
        private readonly IUserService _userService;
        private readonly ICalendarService _calendarService;
        private readonly ILogger<SendNotificationService> _logger;
        private readonly IServiceProvider _serviceProvider;

        public SendNotificationService(IEmailService emailService, IUserService userService, ICalendarService calendarService, ILogger<SendNotificationService> logger, IServiceProvider serviceProvider)
        {
            _emailService = emailService;
            _userService = userService;
            _logger = logger;
            _serviceProvider = serviceProvider;
            _calendarService = calendarService;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            _logger.LogInformation("Background service started!");
            while (!stoppingToken.IsCancellationRequested)
            {
                try
                {
                    // Не чекаємо закінчення, бігає у фоні, щоб якомога точніше кожну хвилину перевіряти
                    Task.Run(() => CheckAndSendNotification());

                    // Кожну хвилину перевіряється чи треба надіслати повідомлення комусь з користувачів
                    await Task.Delay(TimeSpan.FromMinutes(1), stoppingToken);
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex.Message);
                }
            }
            _logger.LogInformation("Background service stoped!");
        }

        private async Task CheckAndSendNotification()
        {
            using (var scope = _serviceProvider.CreateScope())
            {
                var futureEvents = await _calendarService.GetAllCalendarEventsToRemindAsync();

                foreach (var calendarEvent in futureEvents)
                {
                    var author = await _userService.GetUserProfileAsync(calendarEvent.AuthorId);
                    if (author == null)
                    {
                        continue;
                    }
                    var participants = calendarEvent.MettingParticipants.ToList();
                    participants.Add(author);
                    foreach (var participant in participants)
                    {
                        string emailHtml = @$"
<!DOCTYPE html>
<html lang='en'>
<head>
    <meta charset='UTF-8'>
    <meta name='viewport' content='width=device-width, initial-scale=1.0'>
    <title>Workout Reminder</title>
    <style>
        body {{
            font-family: Arial, sans-serif;
            background-color: #f4f4f9;
            margin: 0;
            padding: 0;
        }}
        .email-container {{
            max-width: 500px;
            margin: 20px auto;
            background: #ffffff;
            border-radius: 10px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            overflow: hidden;
            text-align: center;
        }}
        .header {{
            background-color: #007BFF;
            color: white;
            padding: 20px;
            font-size: 20px;
            font-weight: bold;
        }}
        .content {{
            padding: 25px;
            color: #333;
            font-size: 16px;
        }}
        .time {{
            font-size: 18px;
            font-weight: bold;
            margin: 15px 0;
        }}
        .footer {{
            background: #f4f4f9;
            color: #777;
            font-size: 12px;
            padding: 10px;
        }}
    </style>
</head>
<body>
    <div class='email-container'>
        <div class='header'>{calendarEvent.Title}</div>
        <div class='content'>
            <p>{participant.FullName}</p>
            <div class='time'>{calendarEvent.StartTime.ToShortDateString()} &nbsp; {calendarEvent.StartTime.ToShortTimeString()}</div>
        </div>
        <div class='footer'>
            <p>Nomyfy</p>
        </div>
    </div>
</body>
</html>";

                        Task.Run(() => _emailService.SendEmailAsync(participant.Email, "Calendar event", emailHtml));
                    }
                }
            }
        }
    }
}
