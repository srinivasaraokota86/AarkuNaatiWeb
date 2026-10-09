using ArukuNaati.Server.DTOs;
using ArukuNaati.Server.Models;
using ArukuNaati.Server.Repositories;
using Microsoft.EntityFrameworkCore;
using AutoMapper;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;               

namespace ArukuNaati.Server.Services
{
    public class BookingService : IBookingService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public BookingService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<List<BookingDto>> GetAllAsync(CancellationToken ct = default)
        {
            var items = await _unitOfWork.Bookings.GetAllAsync(ct);
            return items.Select(b => _mapper.Map<BookingDto>(b)).ToList();
        }

        public async Task<BookingDto?> GetByIdAsync(int id, CancellationToken ct = default)
        {
            var b = await _unitOfWork.Bookings.GetByIdAsync(id, ct);
            return b == null ? null : _mapper.Map<BookingDto>(b);
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

            await _unitOfWork.Bookings.AddAsync(entity, ct);
            await _unitOfWork.SaveChangesAsync(ct);

            return _mapper.Map<BookingDto>(entity);
        }

        public async Task<bool> UpdateAsync(int id, UpdateBookingDto dto, CancellationToken ct = default)
        {
            var existing = await _unitOfWork.Bookings.GetByIdAsync(id, ct);
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

            _unitOfWork.Bookings.Update(existing);

            try
            {
                await _unitOfWork.SaveChangesAsync(ct);
                return true;
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!await _unitOfWork.Bookings.ExistsAsync(id, ct)) return false;
                throw;
            }
        }

        public async Task<bool> DeleteAsync(int id, CancellationToken ct = default)
        {
            var existing = await _unitOfWork.Bookings.GetByIdAsync(id, ct);
            if (existing == null) return false;
            _unitOfWork.Bookings.Remove(existing);
            await _unitOfWork.SaveChangesAsync(ct);
            return true;
        }
    }
}
