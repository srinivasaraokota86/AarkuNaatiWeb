using System.Net;
using System.Net.Mail;

namespace ArukuNaati.Server.Services
{
    public class EmailService
    {
        private readonly IConfiguration _configuration;

        public EmailService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task SendEmailAsync(
            string toEmail,
            string subject,
            string body)
        {
            var fromEmail =
                _configuration["EmailSettings:From"];

            var password =
                _configuration["EmailSettings:Password"];

            using var smtpClient = new SmtpClient("smtp.gmail.com")
            {
                Port = 587,
                Credentials =
                    new NetworkCredential(
                        fromEmail,
                        password),
                EnableSsl = true
            };

            var message = new MailMessage(
                fromEmail,
                toEmail,
                subject,
                body);

            await smtpClient.SendMailAsync(message);
        }
    }
}