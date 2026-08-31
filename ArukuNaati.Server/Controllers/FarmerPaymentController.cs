using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ArukuNaati.Server.Data;
using ArukuNaati.Server.Models;

namespace ArukuNaati.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FarmerPaymentController : ControllerBase
    {
        private readonly AppDbContext _context;

        public FarmerPaymentController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/FarmerPayment
        [HttpGet]
        public async Task<ActionResult<IEnumerable<FarmerPayments>>> GetPayments()
        {
            return await _context.FarmerPayments.ToListAsync();
        }

        // GET: api/FarmerPayment/5
        [HttpGet("{id}")]
        public async Task<ActionResult<FarmerPayments>> GetPayment(int id)
        {
            var payment = await _context.FarmerPayments.FindAsync(id);

            if (payment == null)
            {
                return NotFound();
            }

            return payment;
        }

        // POST: api/FarmerPayment
        [HttpPost]
        public async Task<ActionResult<FarmerPayments>> PostPayment(FarmerPayments payment)
        {
            _context.FarmerPayments.Add(payment);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetPayment), new { id = payment.PaymentId }, payment);
        }

        // PUT: api/FarmerPayment/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPayment(int id, FarmerPayments payment)
        {
            if (id != payment.PaymentId)
            {
                return BadRequest();
            }

            _context.Entry(payment).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.FarmerPayments.Any(e => e.PaymentId == id))
                {
                    return NotFound();
                }

                throw;
            }

            return NoContent();
        }

        // DELETE: api/FarmerPayment/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePayment(int id)
        {
            var payment = await _context.FarmerPayments.FindAsync(id);

            if (payment == null)
            {
                return NotFound();
            }

            _context.FarmerPayments.Remove(payment);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}