using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ArukuNaati.Server.Data;
using ArukuNaati.Server.Models;

namespace ArukuNaati.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProcurementsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ProcurementsController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Procurements
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Procurement>>> GetProcurements()
        {
            return await _context.Procurements.ToListAsync();
        }

        // GET: api/Procurements/P1001
        [HttpGet("{id}")]
        public async Task<ActionResult<Procurement>> GetProcurement(string id)
        {
            var procurement = await _context.Procurements.FindAsync(id);

            if (procurement == null)
                return NotFound();

            return procurement;
        }

        // GET: api/Procurements/last-procurement/Laxman
        [HttpGet("last-procurement/{farmerName}")]
        public async Task<IActionResult> GetLastProcurement(string farmerName)
        {
            var procurement = await _context.Procurements
                .Where(p => p.FarmerName == farmerName)
                .OrderByDescending(p => p.ProcurementDate)
                .FirstOrDefaultAsync();

            if (procurement == null)
                return NotFound("Farmer not found");

            return Ok(procurement);
        }

        // POST: api/Procurements
        [HttpPost]
        public async Task<ActionResult<Procurement>> PostProcurement(Procurement procurement)
        {
            procurement.CreatedDate = DateTime.Now;
            procurement.IsActive = true;

            _context.Procurements.Add(procurement);
            await _context.SaveChangesAsync();

            return CreatedAtAction(
                nameof(GetProcurement),
                new { id = procurement.ProcurementId },
                procurement);
        }

        // PUT: api/Procurements/P1001
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProcurement(string id, Procurement procurement)
        {
            if (id != procurement.ProcurementId)
                return BadRequest();

            _context.Entry(procurement).State = EntityState.Modified;

            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE: api/Procurements/P1001
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProcurement(string id)
        {
            var procurement = await _context.Procurements.FindAsync(id);

            if (procurement == null)
                return NotFound();

            _context.Procurements.Remove(procurement);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}