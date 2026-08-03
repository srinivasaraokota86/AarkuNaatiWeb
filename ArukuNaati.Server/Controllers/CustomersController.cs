using ArukuNaati.Server.Data;
using ArukuNaati.Server.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


namespace ArukuNaati.Server.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class CustomersController : ControllerBase
    {
        private readonly AppDbContext _context;

        public CustomersController(AppDbContext context)
        {
            _context = context;
        }

        // Create Customer
        [HttpPost]
        public async Task<IActionResult> CreateCustomer(Customer customer)
        {
            // Email duplicate check
            if (await _context.Customers.AnyAsync(c => c.Email == customer.Email)) // Fixes CS1061
                return BadRequest(new
                {
                    message = "Email already exists"
                });

            // Generate CustomerID
            customer.CustomerId = "C" + (1000 + _context.Customers.Count() + 1);

            _context.Customers.Add(customer);
            await _context.SaveChangesAsync();

            return Ok(new
            {
                message = "Customer saved successfully"
            });
        }

        // Get All
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var data = await _context.Customers.ToListAsync();
            return Ok(data);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutCustomer(
    string id,
    Customer customer)

        {
            if (id != customer.CustomerId)
            {
                return BadRequest();
            }

            _context.Entry(customer).State =
                EntityState.Modified;

                await _context.SaveChangesAsync();
            return Ok(new
            {
                message = "Customer Updated Successfully"
            });

        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCustomer(
    string id
)
        {
            var customer =
                await _context.Customers.FindAsync(id);

            if (customer == null)
            {
                return NotFound();
            }

            _context.Customers.Remove(customer);

            await _context.SaveChangesAsync();

            return Ok(new
            {
                message = "Customer Deleted Successfully"
            });

        }
    }

}

