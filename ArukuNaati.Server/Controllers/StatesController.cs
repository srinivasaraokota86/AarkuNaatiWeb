using ArukuNaati.Server.Data;
using ArukuNaati.Server.Models;
using ArukuNaati.Server.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ArukuNaati.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StatesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public StatesController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetStates()
        {
            return Ok(await _context.States.ToListAsync());
        }

        [HttpPost]
        public async Task<IActionResult> CreateState([FromBody] State state)
        {
            if (state == null)
                return BadRequest(new { message = "Invalid state data." });

            var exists = await _context.States
                .AnyAsync(s => s.StateName == state.StateName);

            if (exists)
                return BadRequest(new { message = "State already exists." });

            _context.States.Add(state);
            await _context.SaveChangesAsync();

            return Ok(new
            {
                message = "State created successfully",
                state
            });
        }
    }
}