using ArukuNaati.Server.DTOs;


namespace ArukuNaati.Server.Services
{
    public interface IBookingService
    {
        Task<List<BookingDto>> GetAllAsync(CancellationToken ct = default);
        Task<BookingDto?> GetByIdAsync(int id, CancellationToken ct = default);
        Task<BookingDto> CreateAsync(CreateBookingDto dto, CancellationToken ct = default);
        Task<bool> UpdateAsync(int id, UpdateBookingDto dto, CancellationToken ct = default);
        Task<bool> DeleteAsync(int id, CancellationToken ct = default);
    }
}
