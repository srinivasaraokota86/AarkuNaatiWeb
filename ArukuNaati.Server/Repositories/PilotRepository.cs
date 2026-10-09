using ArukuNaati.Server.Data;
using ArukuNaati.Server.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace ArukuNaati.Server.Repositories
{
    public class PilotRepository : IPilotRepository
    {
        private readonly AppDbContext _db;

        public PilotRepository(AppDbContext db) => _db = db;

        public Task<List<Pilot>> GetAllAsync(CancellationToken ct = default)
            => _db.Pilots.ToListAsync(ct);

        public Task<Pilot?> GetByIdAsync(int id, CancellationToken ct = default)
            => _db.Pilots.FirstOrDefaultAsync(p => p.Id == id, ct);

        public Task AddAsync(Pilot pilot, CancellationToken ct = default)
        {
            _db.Pilots.Add(pilot);
            return Task.CompletedTask;
        }

        public void Update(Pilot pilot) => _db.Entry(pilot).State = EntityState.Modified;

        public void Remove(Pilot pilot) => _db.Pilots.Remove(pilot);

        public Task<bool> ExistsAsync(int id, CancellationToken ct = default)
            => _db.Pilots.AnyAsync(p => p.Id == id, ct);
    }
}
