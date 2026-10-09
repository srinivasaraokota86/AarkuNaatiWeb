using ArukuNaati.Server.Data;
using System.Threading;
using System.Threading.Tasks;

namespace ArukuNaati.Server.Repositories
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly AppDbContext _db;
        private IBookingRepository? _bookingRepository;
        private IPilotRepository? _pilotRepository;

        public UnitOfWork(AppDbContext db)
        {
            _db = db;
        }

        public IBookingRepository Bookings => _bookingRepository ??= new BookingRepository(_db);
        public IPilotRepository Pilots => _pilotRepository ??= new PilotRepository(_db);

        public Task<int> SaveChangesAsync(CancellationToken ct = default) => _db.SaveChangesAsync(ct);
    }
}
