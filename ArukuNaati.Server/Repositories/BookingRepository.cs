using ArukuNaati.Server.Data;
using ArukuNaati.Server.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace ArukuNaati.Server.Repositories
{
    public class BookingRepository : IBookingRepository
    {
        private readonly AppDbContext _db;

        public BookingRepository(AppDbContext db) => _db = db;

        public Task<List<Booking>> GetAllAsync(CancellationToken ct = default)
            => _db.Bookings.ToListAsync(ct);

        public Task<Booking?> GetByIdAsync(int id, CancellationToken ct = default)
            => _db.Bookings.FirstOrDefaultAsync(b => b.Id == id, ct);

        public Task AddAsync(Booking booking, CancellationToken ct = default)
        {
            _db.Bookings.Add(booking);
            return Task.CompletedTask;
        }

        public void Update(Booking booking) => _db.Entry(booking).State = EntityState.Modified;

        public void Remove(Booking booking) => _db.Bookings.Remove(booking);

        public Task<bool> ExistsAsync(int id, CancellationToken ct = default)
            => _db.Bookings.AnyAsync(b => b.Id == id, ct);

        // SaveChanges handled by UnitOfWork
    }
}
