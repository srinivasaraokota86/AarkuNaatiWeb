using ArukuNaati.Server.DTOs;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace ArukuNaati.Server.Services
{
    public interface IPilotService
    {
        Task<List<PilotDto>> GetAllAsync(CancellationToken ct = default);
        Task<PilotDto?> GetByIdAsync(int id, CancellationToken ct = default);
        Task<PilotDto> CreateAsync(CreatePilotDto dto, CancellationToken ct = default);
        Task<bool> UpdateAsync(int id, UpdatePilotDto dto, CancellationToken ct = default);
        Task<bool> DeleteAsync(int id, CancellationToken ct = default);
    }
}
