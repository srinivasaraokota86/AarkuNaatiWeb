using ArukuNaati.Server.DTOs;
using ArukuNaati.Server.Models;
using ArukuNaati.Server.Repositories;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace ArukuNaati.Server.Services
{
    public class BookingService : IBookingService
    {
        private readonly IBookingRepository _repo;

        public BookingService(IBookingRepository repo) => _repo = repo;

        public async Task<List<BookingDto>> GetAllAsync(CancellationToken ct = default)
        {
            var items = await _repo.GetAllAsync(ct);
            return items.Select(MapToDto).ToList();
        }

        public async Task<BookingDto?> GetByIdAsync(int id, CancellationToken ct = default)
        {
            var b = await _repo.GetByIdAsync(id, ct);
            return b == null ? null : MapToDto(b);
        }

        public async Task<BookingDto> CreateAsync(CreateBookingDto dto, CancellationToken ct = default)
        {
            var entity = new Booking
            {
                FarmerName = dto.FarmerName,
                MobileNumber = dto.MobileNumber,
                FpoOrganization = dto.FpoOrganization,
                AlternateContact = dto.AlternateContact,
                State = dto.State,
                District = dto.District,
                Mandal = dto.Mandal,
                Village = dto.Village,
                SurveyNumber = dto.SurveyNumber,
                LandArea = dto.LandArea,
                ServiceRequired = dto.ServiceRequired,
                Crop = dto.Crop,
                CropStage = dto.CropStage,
                ProblemPurpose = dto.ProblemPurpose,
                PreferredDate = dto.PreferredDate,
                PreferredTime = dto.PreferredTime,
                AdditionalNotes = dto.AdditionalNotes
            };

            await _repo.AddAsync(entity, ct);
            await _repo.SaveChangesAsync(ct);

            return MapToDto(entity);
        }

        public async Task<bool> UpdateAsync(int id, UpdateBookingDto dto, CancellationToken ct = default)
        {
            var existing = await _repo.GetByIdAsync(id, ct);
            if (existing == null) return false;

            existing.FarmerName = dto.FarmerName;
            existing.MobileNumber = dto.MobileNumber;
            existing.FpoOrganization = dto.FpoOrganization;
            existing.AlternateContact = dto.AlternateContact;
            existing.State = dto.State;
            existing.District = dto.District;
            existing.Mandal = dto.Mandal;
            existing.Village = dto.Village;
            existing.SurveyNumber = dto.SurveyNumber;
            existing.LandArea = dto.LandArea;
            existing.ServiceRequired = dto.ServiceRequired;
            existing.Crop = dto.Crop;
            existing.CropStage = dto.CropStage;
            existing.ProblemPurpose = dto.ProblemPurpose;
            existing.PreferredDate = dto.PreferredDate;
            existing.PreferredTime = dto.PreferredTime;
            existing.AdditionalNotes = dto.AdditionalNotes;

            _repo.Update(existing);

            try
            {
                await _repo.SaveChangesAsync(ct);
                return true;
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!await _repo.ExistsAsync(id, ct)) return false;
                throw;
            }
        }

        public async Task<bool> DeleteAsync(int id, CancellationToken ct = default)
        {
            var existing = await _repo.GetByIdAsync(id, ct);
            if (existing == null) return false;

            _repo.Remove(existing);
            await _repo.SaveChangesAsync(ct);
            return true;
        }

        private static BookingDto MapToDto(Booking b) => new BookingDto
        {
            Id = b.Id,
            FarmerName = b.FarmerName,
            MobileNumber = b.MobileNumber,
            FpoOrganization = b.FpoOrganization,
            AlternateContact = b.AlternateContact,
            State = b.State,
            District = b.District,
            Mandal = b.Mandal,
            Village = b.Village,
            SurveyNumber = b.SurveyNumber,
            LandArea = b.LandArea,
            ServiceRequired = b.ServiceRequired,
            Crop = b.Crop,
            CropStage = b.CropStage,
            ProblemPurpose = b.ProblemPurpose,
            PreferredDate = b.PreferredDate,
            PreferredTime = b.PreferredTime,
            AdditionalNotes = b.AdditionalNotes
        };
    }
}
