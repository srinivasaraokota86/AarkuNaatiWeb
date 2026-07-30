using ArukuNaati.Server.Data;
using ArukuNaati.Server.Models;
using ArukuNaati.Server.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ArukuNaati.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VillagesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public VillagesController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetVillages()
        {
            return Ok(await _context.Villages.ToListAsync());
        }

        [HttpPost]
        public async Task<IActionResult> CreateVillage([FromBody] Village village)
        {
            if (village == null)
                return BadRequest(new { message = "Invalid village data." });

            // Optional: Check for duplicate village name in the same mandal
            var exists = await _context.Villages
                .AnyAsync(v => v.VillageName == village.VillageName && v.MandalId == village.MandalId);

            if (exists)
                return BadRequest(new { message = "Village already exists in this mandal." });

            _context.Villages.Add(village);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Village created successfully", village });
        }
    }
}