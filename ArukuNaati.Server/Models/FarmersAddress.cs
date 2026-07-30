using System.ComponentModel.DataAnnotations;

namespace ArukuNaati.Server.Models
{
    public class FarmerAddress
    {
        [Key]

        public int AddressId { get; set; }

        public string FarmerId { get; set; }

        public int? VillageId { get; set; }
        //public string VillageName { get; set; }

        public int? MandalId { get; set; }
       // public string MandalName { get; set; }

        public int? DistrictId { get; set; }
       // public string DistrictName { get; set; }

        public int? StateId { get; set; }
        //public string StateName { get; set; }

        public string PinCode { get; set; }

        public string FullAddress { get; set; }
    }
}