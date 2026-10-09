using ArukuNaati.Server.Models;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace ArukuNaati.Server.Repositories
{
    public interface IPilotRepository
    {
        Task<List<Pilot>> GetAllAsync(CancellationToken ct = default);
        Task<Pilot?> GetByIdAsync(int id, CancellationToken ct = default);
        Task AddAsync(Pilot pilot, CancellationToken ct = default);
        void Update(Pilot pilot);
        void Remove(Pilot pilot);
        Task<bool> ExistsAsync(int id, CancellationToken ct = default);
    }
}
