using ArukuNaati.Server.Data;
using ArukuNaati.Server.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


namespace ArukuNaati.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class IntegrationSettingsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public IntegrationSettingsController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/IntegrationSettings
        [HttpGet]
        public async Task<ActionResult<IEnumerable<IntegrationSettings>>> GetAll()
        {
            return await _context.IntegrationSettings.ToListAsync();
        }

        // GET: api/IntegrationSettings/1
        [HttpGet("{id}")]
        public async Task<ActionResult<IntegrationSettings>> GetById(int id)
        {
            var setting = await _context.IntegrationSettings.FindAsync(id);

            if (setting == null)
            {
                return NotFound();
            }

            return setting;
        }

        // POST: api/IntegrationSettings
        [HttpPost]
        public async Task<ActionResult<IntegrationSettings>> Post(IntegrationSettings setting)
        {
            _context.IntegrationSettings.Add(setting);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetById), new { id = setting.Id }, setting);
        }

        // PUT: api/IntegrationSettings/1
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, IntegrationSettings setting)
        {
            if (id != setting.Id)
            {
                return BadRequest();
            }

            _context.Entry(setting).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.IntegrationSettings.Any(x => x.Id == id))
                {
                    return NotFound();
                }

                throw;
            }

            return NoContent();
        }

        // DELETE: api/IntegrationSettings/1
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var setting = await _context.IntegrationSettings.FindAsync(id);

            if (setting == null)
            {
                return NotFound();
            }

            _context.IntegrationSettings.Remove(setting);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}