using ArukuNaati.Server.Data;
using ArukuNaati.Server.Models;
using ArukuNaati.Server.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ArukuNaati.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DistrictsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public DistrictsController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetDistricts()
        {
            return Ok(await _context.Districts.ToListAsync());
        }

        [HttpPost]
        public async Task<IActionResult> CreateDistrict([FromBody] District district)
        {
            if (district == null)
                return BadRequest(new { message = "Invalid district data." });

            var exists = await _context.Districts
                .AnyAsync(d =>
                    d.DistrictName == district.DistrictName &&
                    d.StateId == district.StateId);

            if (exists)
                return BadRequest(new
                {
                    message = "District already exists in this state."
                });

            _context.Districts.Add(district);
            await _context.SaveChangesAsync();

            return Ok(new
            {
                message = "District created successfully",
                district
            });
        }
    }
}