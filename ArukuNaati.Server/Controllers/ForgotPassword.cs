using ArukuNaati.Server.Data;
using ArukuNaati.Server.DTOs;
using ArukuNaati.Server.Services;
using Microsoft.AspNetCore.Mvc;

namespace ArukuNaati.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ForgotPasswordController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly EmailService _emailService;
        private readonly IConfiguration _configuration;

        public ForgotPasswordController(
            AppDbContext context,
            EmailService emailService,
            IConfiguration configuration)
        {
            _context = context;
            _emailService = emailService;
            _configuration = configuration;
        }
        [HttpPost("forgot-password")]
        public async Task<IActionResult> ForgotPassword(
    [FromBody] ForgotPasswordDto dto)
        {
            var user = _context.Users
                .FirstOrDefault(u => u.Email == dto.Email);

            if (user == null)
            {
                return BadRequest("Email not found");
            }

            // Generate token
            var token = Guid.NewGuid().ToString();

            // Save token and expiry
            user.ResetToken = token;
            user.ResetTokenExpiry = DateTime.UtcNow.AddMinutes(30);

            await _context.SaveChangesAsync();

            var frontendUrl = _configuration["Frontend:BaseUrl"];

            string resetLink =
                $"{frontendUrl}/reset-password?token={token}";

            await _emailService.SendEmailAsync(
                dto.Email,
                "Araku Naati Password Reset",
                $"Click the link below to reset your password:\n\n{resetLink}");

            return Ok("Reset link sent successfully");
        }
    }
}