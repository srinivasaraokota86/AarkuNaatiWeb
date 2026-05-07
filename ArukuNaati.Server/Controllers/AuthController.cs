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

            [HttpPost("register")]
            public IActionResult Register([FromBody] User user)
            {
                if (!ModelState.IsValid)
                    return BadRequest("Invalid data");

                _context.Users.Add(user);
                _context.SaveChanges();

                return Ok(new { message = "User saved to SQL Server", user });
            }
        }
    }

