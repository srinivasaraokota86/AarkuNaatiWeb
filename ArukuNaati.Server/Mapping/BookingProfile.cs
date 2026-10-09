using AutoMapper;
using ArukuNaati.Server.DTOs;
using ArukuNaati.Server.Models;

namespace ArukuNaati.Server.Mapping
{
    public class BookingProfile : Profile
    {
        public BookingProfile()
        {
            CreateMap<Booking, BookingDto>().ReverseMap();
            CreateMap<CreateBookingDto, Booking>();
            CreateMap<UpdateBookingDto, Booking>();
        }
    }
}
