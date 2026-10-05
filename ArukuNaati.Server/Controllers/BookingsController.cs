using ArukuNaati.Server.DTOs;
using ArukuNaati.Server.Services;
using Microsoft.AspNetCore.Mvc;

namespace ArukuNaati.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookingsController : ControllerBase
    {
        private readonly IBookingService _service;

        public BookingsController(IBookingService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> GetBookings(CancellationToken ct)
        {
            var list = await _service.GetAllAsync(ct);
            return Ok(list);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetBooking(int id, CancellationToken ct)
        {
            var booking = await _service.GetByIdAsync(id, ct);
            return booking == null ? NotFound() : Ok(booking);
        }

        [HttpPost]
        public async Task<IActionResult> CreateBooking([FromBody] CreateBookingDto dto, CancellationToken ct)
        {
            var created = await _service.CreateAsync(dto, ct);
            return CreatedAtAction(nameof(GetBooking), new { id = created.Id }, created);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateBooking(int id, [FromBody] UpdateBookingDto dto, CancellationToken ct)
        {
            if (!await _service.UpdateAsync(id, dto, ct)) return NotFound();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBooking(int id, CancellationToken ct)
        {
            if (!await _service.DeleteAsync(id, ct)) return NotFound();
            return NoContent();
        }
    }
}
