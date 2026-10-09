using System.Threading;
using System.Threading.Tasks;

namespace ArukuNaati.Server.Repositories
{
    public interface IUnitOfWork
    {
        IBookingRepository Bookings { get; }
        IPilotRepository Pilots { get; }
        Task<int> SaveChangesAsync(CancellationToken ct = default);
    }
}
