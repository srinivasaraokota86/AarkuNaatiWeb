using ArukuNaati.Server.Models;

namespace ArukuNaati.Server.DTOs
{
    public class FarmerRegistrationDto
    {
        public Farmers Farmer { get; set; }

        public FarmerAddress Address { get; set; }

        //public FarmerLand Land { get; set; }

        //public FarmerCrop Crop { get; set; }
    }
}