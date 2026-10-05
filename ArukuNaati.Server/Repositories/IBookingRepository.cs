using ArukuNaati.Server.Models;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace ArukuNaati.Server.Repositories
{
    public interface IBookingRepository
    {
        Task<List<Booking>> GetAllAsync(CancellationToken ct = default);
        Task<Booking?> GetByIdAsync(int id, CancellationToken ct = default);
        Task AddAsync(Booking booking, CancellationToken ct = default);
        void Update(Booking booking);
        void Remove(Booking booking);
        Task<bool> ExistsAsync(int id, CancellationToken ct = default);
        Task SaveChangesAsync(CancellationToken ct = default);
    }
}
