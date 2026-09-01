using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ArukuNaati.Server.Data;
using ArukuNaati.Server.Models;

namespace ArukuNaati.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WeighmentController : ControllerBase
    {
        private readonly AppDbContext _context;

        public WeighmentController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Weighment>>> Get()
        {
            return await _context.Weighments.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Weighment>> Get(int id)
        {
            var weighment = await _context.Weighments.FindAsync(id);

            if (weighment == null)
                return NotFound();

            return weighment;
        }

        [HttpPost]
        public async Task<ActionResult<Weighment>> Post(Weighment weighment)
        {
            _context.Weighments.Add(weighment);

            await _context.SaveChangesAsync();

            return Ok(weighment);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, Weighment weighment)
        {
            if (id != weighment.WeighmentId)
                return BadRequest();

            _context.Entry(weighment).State = EntityState.Modified;

            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var weighment = await _context.Weighments.FindAsync(id);

            if (weighment == null)
                return NotFound();

            _context.Weighments.Remove(weighment);

            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}