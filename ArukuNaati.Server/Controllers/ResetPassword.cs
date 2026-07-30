using ArukuNaati.Server.Data;
using ArukuNaati.Server.DTOs;
using ArukuNaati.Server.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

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

    [HttpPost("reset-password")]
    public IActionResult ResetPassword(
        [FromBody] ResetPasswordDto dto)
    {
        var user = _context.Users
            .FirstOrDefault(u => u.ResetToken == dto.Token);

        if (user == null)
            return BadRequest("Invalid token");

        if (user.ResetTokenExpiry < DateTime.UtcNow)
            return BadRequest("Token expired");

        user.Password = dto.Password;

        user.ResetToken = null;
        user.ResetTokenExpiry = null;

        _context.SaveChanges();

        return Ok("Password reset successful");
    }
}