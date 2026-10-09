using ArukuNaati.Server.DTOs;
using ArukuNaati.Server.Models;
using ArukuNaati.Server.Repositories;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace ArukuNaati.Server.Services
{
    public class PilotService : IPilotService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public PilotService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<List<PilotDto>> GetAllAsync(CancellationToken ct = default)
        {
            var items = await _unitOfWork.Pilots.GetAllAsync(ct);
            return items.Select(p => _mapper.Map<PilotDto>(p)).ToList();
        }

        public async Task<PilotDto?> GetByIdAsync(int id, CancellationToken ct = default)
        {
            var p = await _unitOfWork.Pilots.GetByIdAsync(id, ct);
            return p == null ? null : _mapper.Map<PilotDto>(p);
        }

        public async Task<PilotDto> CreateAsync(CreatePilotDto dto, CancellationToken ct = default)
        {
            var entity = _mapper.Map<Pilot>(dto);
            await _unitOfWork.Pilots.AddAsync(entity, ct);
            await _unitOfWork.SaveChangesAsync(ct);
            return _mapper.Map<PilotDto>(entity);
        }

        public async Task<bool> UpdateAsync(int id, UpdatePilotDto dto, CancellationToken ct = default)
        {
            var existing = await _unitOfWork.Pilots.GetByIdAsync(id, ct);
            if (existing == null) return false;

            _mapper.Map(dto, existing);
            _unitOfWork.Pilots.Update(existing);

            try
            {
                await _unitOfWork.SaveChangesAsync(ct);
                return true;
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!await _unitOfWork.Pilots.ExistsAsync(id, ct)) return false;
                throw;
            }
        }

        public async Task<bool> DeleteAsync(int id, CancellationToken ct = default)
        {
            var existing = await _unitOfWork.Pilots.GetByIdAsync(id, ct);
            if (existing == null) return false;

            _unitOfWork.Pilots.Remove(existing);
            await _unitOfWork.SaveChangesAsync(ct);
            return true;
        }
    }
}
