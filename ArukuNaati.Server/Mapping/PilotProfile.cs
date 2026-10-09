using AutoMapper;
using ArukuNaati.Server.DTOs;
using ArukuNaati.Server.Models;

namespace ArukuNaati.Server.Mapping
{
    public class PilotProfile : Profile
    {
        public PilotProfile()
        {
            CreateMap<Pilot, PilotDto>().ReverseMap();
            CreateMap<CreatePilotDto, Pilot>();
            CreateMap<UpdatePilotDto, Pilot>();
        }
    }
}
