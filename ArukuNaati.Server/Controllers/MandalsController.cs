using ArukuNaati.Server.Data;
using ArukuNaati.Server.Models;
using ArukuNaati.Server.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ArukuNaati.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MandalsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public MandalsController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetMandals()
        {
            return Ok(await _context.Mandals.ToListAsync());
        }

        [HttpPost]
        public async Task<IActionResult> CreateMandal([FromBody] Mandal mandal)
        {
            if (mandal == null)
                return BadRequest(new { message = "Invalid mandal data." });

            var exists = await _context.Mandals
                .AnyAsync(m =>
                    m.MandalName == mandal.MandalName &&
                    m.DistrictId == mandal.DistrictId);

            if (exists)
                return BadRequest(new
                {
                    message = "Mandal already exists in this district."
                });

            _context.Mandals.Add(mandal);
            await _context.SaveChangesAsync();

            return Ok(new
            {
                message = "Mandal created successfully",
                mandal
            });
        }
    }
}