using Microsoft.AspNetCore.Mvc;
using ArukuNaati.Server.Models;
using ArukuNaati.Server.Data;

namespace ArukuNaati.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _context;

        public AuthController(AppDbContext context)
        {
            _context = context;
        }

        // REGISTER API
        [HttpPost("register")]
        public IActionResult Register(RegisterRequest model)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(new
                    {
                        message = "Invalid data"
                    });
                }

                // Email validation
                var existingUser = _context.Users
                    .FirstOrDefault(x => x.Email == model.Email);

                if (existingUser != null)
                {
                    return BadRequest(new
                    {
                        message = "Email already exists"
                    });
                }

                // Save new user
                User user = new User
                {
                    Name = model.Name,
                    Email = model.Email,
                    Password = model.Password
                };

                _context.Users.Add(user);
                _context.SaveChanges();

                return Ok(new
                {
                    message = "Registration Successful"
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new
                {
                    message = ex.Message
                });
            }
        }

        // LOGIN API
        [HttpPost("login")]
        public IActionResult Login(LoginRequest model)
        {
            try
            {
                var user = _context.Users
                    .FirstOrDefault(x =>
                        x.Email == model.Email &&
                        x.Password == model.Password);

                if (user == null)
                {
                    return BadRequest(new
                    {
                        message = "Invalid Email or Password"
                    });
                }

                return Ok(new
                {
                    message = "Login Successful",
                    user = user
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new
                {
                    message = ex.Message
                });
            }
        }
    }
}