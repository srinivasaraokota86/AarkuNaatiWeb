using ArukuNaati.Server.Data;
using Microsoft.AspNetCore.Mvc;
using ArukuNaati.Server.Models;
using Microsoft.EntityFrameworkCore;
using ArukuNaati.Server.DTOs;


namespace ArukuNaati.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class UsersController : ControllerBase
    {
        private readonly AppDbContext _context;

        public UsersController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost("login")]
        public IActionResult Login(LoginDto login)
        {
            var user = _context.Users.FirstOrDefault(x =>
                x.UserName == login.UserName &&
                x.Password == login.Password);

            if (user == null)
            {
                return Unauthorized(new
                {
                    message = "Invalid Username or Password"
                });
            }

            return Ok(new
            {
                userId = user.UserId,
                userName = user.UserName,
                email = user.Email,
                message = "Login Successful"
            });
        }
        [HttpGet]
        public async Task<IActionResult> GetUsers()
        {
            return Ok(await _context.Users.ToListAsync());
        }

    }
}
