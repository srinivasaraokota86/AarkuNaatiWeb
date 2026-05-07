using ArukuNaati.Server.Data;
using ArukuNaati.Server.Models;
using Microsoft.AspNetCore.Mvc;

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
            if (await _context.Customers.AnyAsync(c => c.Email == customer.Email))
                return BadRequest("Email already exists.");

            // Generate CustomerID
            customer.CustomerID = "C" + (1000 + _context.Customers.Count() + 1);

            _context.Customers.Add(customer);
            await _context.SaveChangesAsync();

            return Ok(customer);
        }

        // Get All
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var data = await _context.Customers.ToListAsync();
            return Ok(data);
        }
    }

}

